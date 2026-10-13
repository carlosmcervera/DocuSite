from fastapi import FastAPI, APIRouter, HTTPException, Depends, Header, Request, Response
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import io
import csv
import time
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr, StrictBool
from typing import List, Optional, Dict, Literal
import uuid
from datetime import datetime, timezone


ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

ADMIN_TOKEN = os.environ.get('ADMIN_TOKEN', 'DocuSite2026-Admin')

# Create the main app without a prefix
app = FastAPI(title="DocuSite API")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# ----------------------------------------------------------------------------
# Models
# ----------------------------------------------------------------------------

VALID_STATUSES = {"new", "contacted", "won", "lost"}


class Lead(BaseModel):
    model_config = ConfigDict(extra="ignore")

    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    name: str = ""
    email: EmailStr
    company: Optional[str] = None
    role: Optional[str] = None
    team_size: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    language: str = "es"
    consent: bool = False
    lead_type: str = "contact"
    document_request: Optional[str] = None
    marketing_opt_in: bool = False
    consent_version: Optional[str] = None
    consented_at: Optional[datetime] = None
    source_path: Optional[str] = None
    consent_text: Optional[str] = None
    marketing_consent_text: Optional[str] = None
    source: str = "landing"
    plan_interest: Optional[str] = None  # which pricing pack they clicked
    utm: Dict[str, str] = Field(default_factory=dict)
    status: str = "new"
    notes: Optional[str] = None
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))


class LeadCreate(BaseModel):
    name: str = Field(..., min_length=1, max_length=120)
    email: EmailStr
    company: Optional[str] = Field(None, max_length=160)
    role: Optional[str] = Field(None, max_length=80)
    team_size: Optional[str] = Field(None, max_length=40)
    phone: Optional[str] = Field(None, max_length=40)
    message: Optional[str] = Field(None, max_length=3000)
    language: str = "es"
    consent: bool = False
    plan_interest: Optional[str] = Field(None, max_length=60)
    utm: Dict[str, str] = Field(default_factory=dict)
    # Honeypot field — must stay empty. Bots usually fill every input.
    website: Optional[str] = None


class LeadOut(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str
    name: str = ""
    email: str
    company: Optional[str] = None
    role: Optional[str] = None
    team_size: Optional[str] = None
    phone: Optional[str] = None
    message: Optional[str] = None
    language: str = "es"
    consent: bool = False
    lead_type: str = "contact"
    document_request: Optional[str] = None
    marketing_opt_in: bool = False
    consent_version: Optional[str] = None
    consented_at: Optional[datetime] = None
    source_path: Optional[str] = None
    consent_text: Optional[str] = None
    marketing_consent_text: Optional[str] = None
    source: str = "landing"
    plan_interest: Optional[str] = None
    utm: Dict[str, str] = Field(default_factory=dict)
    status: str = "new"
    notes: Optional[str] = None
    created_at: datetime


DocumentKey = Literal["setting", "visit", "photos", "snagging", "completion"]
CONSENT_VERSION = "template-request-v1"
CONSENT_TEXT = {
    "es": "Acepto que DocuSite trate mi correo para gestionar esta solicitud de plantilla.",
    "en": "I agree that DocuSite may process my email to handle this template request.",
}
MARKETING_TEXT = {
    "es": "Opcional: quiero recibir consejos y ofertas de DocuSite por email. Puedo retirar mi permiso cuando quiera.",
    "en": "Optional: I want to receive DocuSite tips and offers by email. I can withdraw my permission at any time.",
}


class DownloadRequestCreate(BaseModel):
    model_config = ConfigDict(extra="forbid")
    email: EmailStr
    document_request: DocumentKey
    language: Literal["es", "en"] = "es"
    consent: StrictBool = False
    marketing_opt_in: StrictBool = False
    source_path: str = Field("/", max_length=300, pattern=r"^/[^?#]*$")
    website: Optional[str] = Field(None, max_length=300)


class DownloadRequestOut(BaseModel):
    id: str
    status: Literal["requested"] = "requested"
    download_available: bool = False
    email_sent: bool = False


class LeadStatusUpdate(BaseModel):
    status: Optional[str] = None
    notes: Optional[str] = None


class StatsOut(BaseModel):
    total: int
    new: int
    contacted: int
    won: int
    lost: int
    last_7_days: int


# ----------------------------------------------------------------------------
# Helpers
# ----------------------------------------------------------------------------

def _parse_dt(value):
    if isinstance(value, str):
        try:
            return datetime.fromisoformat(value)
        except ValueError:
            return datetime.now(timezone.utc)
    return value


def serialize_lead(doc: dict) -> dict:
    """Return a JSON-safe lead dict with datetime converted to datetime object."""
    if not doc:
        return doc
    doc.pop("_id", None)
    if "created_at" in doc:
        doc["created_at"] = _parse_dt(doc["created_at"])
    return doc


# --- Simple in-memory rate limiting for the public lead endpoint ---
_RATE_BUCKET: Dict[str, List[float]] = {}
_RATE_LIMIT = 5          # max submissions
_RATE_WINDOW = 60 * 10   # per 10 minutes, per IP


def _rate_limited(ip: str) -> bool:
    now = time.time()
    bucket = [t for t in _RATE_BUCKET.get(ip, []) if now - t < _RATE_WINDOW]
    if len(bucket) >= _RATE_LIMIT:
        _RATE_BUCKET[ip] = bucket
        return True
    bucket.append(now)
    _RATE_BUCKET[ip] = bucket
    return False


async def require_admin(x_admin_token: Optional[str] = Header(None)):
    if not x_admin_token or x_admin_token != ADMIN_TOKEN:
        raise HTTPException(status_code=401, detail="Invalid or missing admin token")
    return True


# ----------------------------------------------------------------------------
# Public routes
# ----------------------------------------------------------------------------

@api_router.get("/")
async def root():
    return {"message": "DocuSite API online", "status": "ok"}


@api_router.post("/leads", response_model=LeadOut, status_code=201)
async def create_lead(payload: LeadCreate, request: Request):
    # Honeypot: if filled, silently accept but do not store (pretend success for bots)
    if payload.website:
        logger.info("Honeypot triggered — discarding submission")
        fake = Lead(name=payload.name, email=payload.email)
        return LeadOut(**fake.model_dump())

    if not payload.name.strip():
        raise HTTPException(status_code=422, detail="Name is required")
    if not payload.consent:
        raise HTTPException(status_code=422, detail="Consent is required")

    client_ip = request.client.host if request.client else "unknown"
    forwarded = request.headers.get("x-forwarded-for")
    if forwarded:
        client_ip = forwarded.split(",")[0].strip()

    if _rate_limited(client_ip):
        raise HTTPException(status_code=429, detail="Too many submissions. Please try again later.")

    lead = Lead(
        name=payload.name.strip(),
        email=payload.email,
        company=(payload.company or "").strip() or None,
        role=payload.role,
        team_size=payload.team_size,
        phone=(payload.phone or "").strip() or None,
        message=(payload.message or "").strip() or None,
        language=payload.language or "es",
        consent=bool(payload.consent),
        plan_interest=payload.plan_interest,
        utm=payload.utm or {},
    )

    doc = lead.model_dump()
    doc["created_at"] = doc["created_at"].isoformat()
    await db.leads.insert_one(doc)
    logger.info(f"New lead captured: {lead.email} ({lead.company})")
    return LeadOut(**lead.model_dump())


@api_router.post("/download-requests", response_model=DownloadRequestOut, status_code=201)
async def request_template(payload: DownloadRequestCreate, request: Request):
    if not payload.consent:
        raise HTTPException(status_code=422, detail="Processing consent is required")
    if payload.website:
        return DownloadRequestOut(id=str(uuid.uuid4()))
    ip = request.headers.get("x-forwarded-for", request.client.host if request.client else "unknown").split(",")[0].strip()
    if _rate_limited(ip):
        raise HTTPException(status_code=429, detail="Too many submissions. Please try again later.")
    now = datetime.now(timezone.utc)
    lead = Lead(
        email=str(payload.email).lower(), language=payload.language,
        lead_type="download_request", source="template_request",
        document_request=payload.document_request, consent=True,
        marketing_opt_in=payload.marketing_opt_in,
        consent_version=CONSENT_VERSION, consented_at=now,
        consent_text=CONSENT_TEXT[payload.language],
        marketing_consent_text=MARKETING_TEXT[payload.language],
        source_path=payload.source_path,
        utm={"intent": "download_request", "document": payload.document_request, "page": payload.source_path},
    )
    doc = lead.model_dump(mode="json")
    await db.leads.insert_one(doc)
    return DownloadRequestOut(id=lead.id)


# ----------------------------------------------------------------------------
# Admin routes
# ----------------------------------------------------------------------------

@api_router.get("/admin/verify")
async def admin_verify(_: bool = Depends(require_admin)):
    return {"ok": True}


@api_router.get("/admin/stats", response_model=StatsOut)
async def admin_stats(_: bool = Depends(require_admin)):
    leads = await db.leads.find({}, {"_id": 0}).to_list(100000)
    now = datetime.now(timezone.utc)
    counts = {"new": 0, "contacted": 0, "won": 0, "lost": 0}
    last_7 = 0
    for l in leads:
        st = l.get("status", "new")
        if st in counts:
            counts[st] += 1
        created = _parse_dt(l.get("created_at"))
        if created.tzinfo is None:
            created = created.replace(tzinfo=timezone.utc)
        if (now - created).days < 7:
            last_7 += 1
    return StatsOut(
        total=len(leads),
        new=counts["new"],
        contacted=counts["contacted"],
        won=counts["won"],
        lost=counts["lost"],
        last_7_days=last_7,
    )


def lead_query(search=None, status=None, lead_type=None, document_request=None, marketing_opt_in=None):
    query = {}
    if status in VALID_STATUSES:
        query["status"] = status
    if lead_type == "contact":
        query["lead_type"] = {"$ne": "download_request"}
    elif lead_type == "download_request":
        query["lead_type"] = lead_type
    if document_request:
        query["document_request"] = document_request
    if marketing_opt_in is not None:
        query["marketing_opt_in"] = True if marketing_opt_in else {"$ne": True}
    if search and search.strip():
        import re
        value = re.escape(search.strip())
        query["$or"] = [{field: {"$regex": value, "$options": "i"}} for field in ("name", "email", "company")]
    return query


@api_router.get("/admin/leads", response_model=List[LeadOut])
async def list_leads(
    _: bool = Depends(require_admin), search: Optional[str] = None,
    status: Optional[str] = None, limit: int = 500,
    lead_type: Optional[Literal["contact", "download_request"]] = None,
    document_request: Optional[DocumentKey] = None,
    marketing_opt_in: Optional[bool] = None,
):
    query = lead_query(search, status, lead_type, document_request, marketing_opt_in)
    docs = await db.leads.find(query).sort("created_at", -1).to_list(max(1, min(limit, 5000)))
    return [LeadOut(**serialize_lead(d)) for d in docs]


@api_router.get("/admin/leads/export", include_in_schema=False)
async def export_leads(
    _: bool = Depends(require_admin), search: Optional[str] = None, status: Optional[str] = None,
    lead_type: Optional[Literal["contact", "download_request"]] = None,
    document_request: Optional[DocumentKey] = None, marketing_opt_in: Optional[bool] = None,
):
    docs = await db.leads.find(lead_query(search, status, lead_type, document_request, marketing_opt_in)).sort("created_at", -1).to_list(100000)
    output = io.StringIO()
    writer = csv.writer(output)
    writer.writerow([
        "id", "created_at", "name", "email", "company", "role",
        "team_size", "phone", "language", "plan_interest", "status",
        "consent", "message", "notes", "offer", "document_interest", "landing_page",
        "lead_type", "document_request", "marketing_opt_in", "consent_version", "consented_at", "consent_text", "marketing_consent_text",
    ])
    def safe_cell(value):
        if isinstance(value, str) and value.lstrip().startswith(("=", "+", "-", "@", "\t", "\r")):
            return "'" + value
        return value

    for d in docs:
        d = serialize_lead(d)
        writer.writerow([safe_cell(cell) for cell in [
            d.get("id", ""),
            d.get("created_at", ""),
            d.get("name", ""),
            d.get("email", ""),
            d.get("company", ""),
            d.get("role", ""),
            d.get("team_size", ""),
            d.get("phone", ""),
            d.get("language", ""),
            d.get("plan_interest", ""),
            d.get("status", ""),
            d.get("consent", ""),
            (d.get("message") or "").replace("\n", " "),
            (d.get("notes") or "").replace("\n", " "),
            (d.get("utm") or {}).get("offer", ""),
            (d.get("utm") or {}).get("document", ""),
            d.get("source_path") or (d.get("utm") or {}).get("page", ""),
            d.get("lead_type", "contact"), d.get("document_request", ""),
            d.get("marketing_opt_in", False), d.get("consent_version", ""), d.get("consented_at", ""),
            d.get("consent_text", ""), d.get("marketing_consent_text", ""),
        ]])
    csv_bytes = output.getvalue()
    filename = f"docusite-leads-{datetime.now(timezone.utc).strftime('%Y%m%d')}.csv"
    return Response(
        content=csv_bytes,
        media_type="text/csv",
        headers={"Content-Disposition": f"attachment; filename={filename}"},
    )


@api_router.get("/admin/leads/{lead_id}", response_model=LeadOut)
async def get_lead(lead_id: str, _: bool = Depends(require_admin)):
    doc = await db.leads.find_one({"id": lead_id})
    if not doc:
        raise HTTPException(status_code=404, detail="Lead not found")
    return LeadOut(**serialize_lead(doc))


@api_router.patch("/admin/leads/{lead_id}", response_model=LeadOut)
async def update_lead(lead_id: str, payload: LeadStatusUpdate, _: bool = Depends(require_admin)):
    update: dict = {}
    if payload.status is not None:
        if payload.status not in VALID_STATUSES:
            raise HTTPException(status_code=400, detail="Invalid status")
        update["status"] = payload.status
    if payload.notes is not None:
        update["notes"] = payload.notes
    if not update:
        raise HTTPException(status_code=400, detail="Nothing to update")
    result = await db.leads.find_one_and_update(
        {"id": lead_id}, {"$set": update}, return_document=True
    )
    if not result:
        raise HTTPException(status_code=404, detail="Lead not found")
    return LeadOut(**serialize_lead(result))


@api_router.delete("/admin/leads/{lead_id}")
async def delete_lead(lead_id: str, _: bool = Depends(require_admin)):
    result = await db.leads.delete_one({"id": lead_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Lead not found")
    return {"ok": True, "deleted": lead_id}


# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)


@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
