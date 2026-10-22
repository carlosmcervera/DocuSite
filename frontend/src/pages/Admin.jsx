import React, { useState, useEffect, useCallback } from "react";
import { Link } from "react-router-dom";
import {
  Lock,
  LogOut,
  RefreshCw,
  Download,
  Search,
  Users,
  Inbox,
  PhoneCall,
  Trophy,
  XCircle,
  CalendarClock,
  Trash2,
  Loader2,
  ArrowLeft,
  Mail,
  Building2,
  Phone,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerFooter,
} from "@/components/ui/drawer";
import { toast } from "sonner";
import { useLanguage } from "@/i18n/LanguageContext";
import { Logo } from "@/components/landing/Logo";
import { LanguageToggle } from "@/components/landing/LanguageToggle";
import { AnalyticsPanel } from '@/components/AnalyticsPanel';
import { documentKeys } from "@/i18n/routes";
import { documentContent } from "@/i18n/documentContent";
import {
  verifyAdmin,
  fetchStats,
  fetchLeads,
  updateLead,
  deleteLead,
  api,
  adminHeaders,
} from "@/lib/api";

const TOKEN_KEY = "docusite-admin-token";

const DICT = {
  es: {
    loginTitle: "Acceso del equipo",
    loginSub: "Introduce tu token de administrador para ver las solicitudes.",
    tokenLabel: "Token de administrador",
    tokenPlaceholder: "Introduce el token…",
    enter: "Entrar",
    verifying: "Verificando…",
    badToken: "Token incorrecto. Inténtalo de nuevo.",
    backHome: "Volver al inicio",
    title: "Panel de solicitudes",
    logout: "Salir",
    refresh: "Actualizar",
    export: "Exportar CSV",
    searchPlaceholder: "Buscar por nombre, email o empresa…",
    allTypes: "Todos los orígenes", downloads: "Solicitudes de plantilla", contacts: "Consultas", allDocuments: "Todos los documentos", marketingAll: "Todos los permisos", marketingYes: "Ofertas: autorizado", marketingNo: "Ofertas: no autorizado", template: "Plantilla solicitada", marketing: "Permiso comercial", consentDate: "Fecha del consentimiento", consentVersion: "Versión del consentimiento", delivery: "Solicitud guardada. Archivo y envío no disponibles.",
    allStatuses: "Todos los estados",
    kpis: {
      total: "Total",
      new: "Nuevas",
      contacted: "Contactadas",
      won: "Ganadas",
      lost: "Perdidas",
      last7: "Últimos 7 días",
    },
    cols: {
      name: "Nombre",
      email: "Email",
      company: "Empresa",
      role: "Rol",
      lang: "Idioma",
      status: "Estado",
      date: "Fecha",
    },
    empty: "No hay solicitudes todavía.",
    emptyHint: "Cuando alguien rellene el formulario, aparecerá aquí.",
    detail: "Detalle de la solicitud",
    message: "Mensaje",
    notes: "Notas internas",
    notesPlaceholder: "Añade notas de seguimiento…",
    teamSize: "Tamaño de equipo",
    planInterest: "Paquete de interés",
    save: "Guardar cambios",
    saving: "Guardando…",
    saved: "Cambios guardados",
    delete: "Eliminar",
    deleted: "Solicitud eliminada",
    confirmDelete: "¿Eliminar esta solicitud? No se puede deshacer.",
    noMessage: "Sin mensaje",
    exported: "Exportación iniciada",
    exportError: "No se pudo exportar",
    statuses: { new: "Nueva", contacted: "Contactada", won: "Ganada", lost: "Perdida" },
  },
  en: {
    loginTitle: "Team access",
    loginSub: "Enter your admin token to view the leads.",
    tokenLabel: "Admin token",
    tokenPlaceholder: "Enter token…",
    enter: "Enter",
    verifying: "Verifying…",
    badToken: "Invalid token. Please try again.",
    backHome: "Back to home",
    title: "Leads dashboard",
    logout: "Log out",
    refresh: "Refresh",
    export: "Export CSV",
    searchPlaceholder: "Search by name, email or company…",
    allTypes: "All sources", downloads: "Template requests", contacts: "Enquiries", allDocuments: "All documents", marketingAll: "All permissions", marketingYes: "Offers: opted in", marketingNo: "Offers: not opted in", template: "Requested template", marketing: "Marketing permission", consentDate: "Consent date", consentVersion: "Consent version", delivery: "Request saved. File and email delivery unavailable.",
    allStatuses: "All statuses",
    kpis: {
      total: "Total",
      new: "New",
      contacted: "Contacted",
      won: "Won",
      lost: "Lost",
      last7: "Last 7 days",
    },
    cols: {
      name: "Name",
      email: "Email",
      company: "Company",
      role: "Role",
      lang: "Language",
      status: "Status",
      date: "Date",
    },
    empty: "No leads yet.",
    emptyHint: "When someone submits the form, it will show up here.",
    detail: "Lead detail",
    message: "Message",
    notes: "Internal notes",
    notesPlaceholder: "Add follow-up notes…",
    teamSize: "Team size",
    planInterest: "Package interest",
    save: "Save changes",
    saving: "Saving…",
    saved: "Changes saved",
    delete: "Delete",
    deleted: "Lead deleted",
    confirmDelete: "Delete this lead? This cannot be undone.",
    noMessage: "No message",
    exported: "Export started",
    exportError: "Could not export",
    statuses: { new: "New", contacted: "Contacted", won: "Won", lost: "Lost" },
  },
};

DICT.ca={...DICT.es,loginTitle:'Accés de l’equip',loginSub:'Introdueix el teu token d’administrador per veure les sol·licituds.',tokenLabel:'Token d’administrador',tokenPlaceholder:'Introdueix el token…',enter:'Entrar',verifying:'Verificant…',badToken:'Token incorrecte. Torna-ho a provar.',backHome:'Tornar a l’inici',title:'Panell de sol·licituds',logout:'Sortir',refresh:'Actualitzar',export:'Exportar CSV',searchPlaceholder:'Cercar per nom, email o empresa…',allTypes:'Tots els orígens',downloads:'Sol·licituds de documents',contacts:'Consultes',allDocuments:'Tots els documents',marketingAll:'Tots els permisos',marketingYes:'Ofertes: autoritzat',marketingNo:'Ofertes: no autoritzat',template:'Document sol·licitat',marketing:'Permís comercial',consentDate:'Data del consentiment',consentVersion:'Versió del consentiment',delivery:'Sol·licitud històrica. Arxiu i enviament no disponibles.',allStatuses:'Tots els estats',kpis:{total:'Total',new:'Noves',contacted:'Contactades',won:'Guanyades',lost:'Perdudes',last7:'Últims 7 dies'},cols:{name:'Nom',email:'Email',company:'Empresa',role:'Rol',lang:'Idioma',status:'Estat',date:'Data'},empty:'Encara no hi ha sol·licituds.',emptyHint:'Quan algú ompli el formulari, apareixerà aquí.',detail:'Detall de la sol·licitud',message:'Missatge',notes:'Notes internes',notesPlaceholder:'Afegeix notes de seguiment…',teamSize:'Mida de l’equip',planInterest:'Paquet d’interès',save:'Guardar canvis',saving:'Guardant…',saved:'Canvis guardats',delete:'Eliminar',deleted:'Sol·licitud eliminada',confirmDelete:'Eliminar aquesta sol·licitud? No es pot desfer.',noMessage:'Sense missatge',exported:'Exportació iniciada',exportError:'No s’ha pogut exportar',statuses:{new:'Nova',contacted:'Contactada',won:'Guanyada',lost:'Perduda'}};

const STATUS_STYLE = {
  new: "bg-accent/15 text-accent-foreground border-accent/30",
  contacted: "bg-sky-100 text-sky-800 border-sky-200",
  won: "bg-emerald-100 text-emerald-800 border-emerald-200",
  lost: "bg-destructive/10 text-destructive border-destructive/20",
};

function StatusBadge({ status, d }) {
  return (
    <Badge variant="outline" className={`rounded-full border px-2.5 py-0.5 text-[11px] font-medium ${STATUS_STYLE[status] || ""}`}>
      {d.statuses[status] || status}
    </Badge>
  );
}

function LoginGate({ onAuthed }) {
  const { lang } = useLanguage();
  const d = DICT[lang] || DICT.es;
  const [token, setToken] = useState("");
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!token.trim()) return;
    setLoading(true);
    try {
      await verifyAdmin(token.trim());
      localStorage.setItem(TOKEN_KEY, token.trim());
      onAuthed(token.trim());
    } catch (err) {
      toast.error(d.badToken);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-secondary/40 px-4">
      <div className="absolute inset-0 blueprint-grid opacity-60" aria-hidden="true" />
      <div className="relative w-full max-w-md rounded-3xl border border-border bg-card p-8 shadow-md">
        <div className="mb-6 flex items-center justify-between">
          <Logo />
          <LanguageToggle />
        </div>
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-primary text-primary-foreground">
          <Lock className="h-5 w-5" />
        </span>
        <h1 className="mt-5 font-heading text-2xl font-bold text-foreground">{d.loginTitle}</h1>
        <p className="mt-2 text-sm text-muted-foreground">{d.loginSub}</p>

        <form onSubmit={submit} className="mt-6 space-y-4" data-testid="admin-login-form">
          <div>
            <Label htmlFor="admin-token" className="mb-1.5 block text-sm font-medium">
              {d.tokenLabel}
            </Label>
            <Input
              id="admin-token"
              type="password"
              data-testid="admin-token-input"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              placeholder={d.tokenPlaceholder}
              className="rounded-lg"
              autoFocus
            />
          </div>
          <Button
            type="submit"
            data-testid="admin-login-button"
            disabled={loading}
            className="w-full rounded-xl bg-primary py-5 text-base font-semibold text-primary-foreground hover:bg-primary/95"
          >
            {loading ? (
              <span className="inline-flex items-center gap-2">
                <Loader2 className="h-4 w-4 animate-spin" /> {d.verifying}
              </span>
            ) : (
              d.enter
            )}
          </Button>
        </form>

        <Link
          to="/"
          className="mt-6 inline-flex items-center gap-1.5 text-sm text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> {d.backHome}
        </Link>
      </div>
    </div>
  );
}

function Kpi({ icon: Icon, label, value, tone = "default" }) {
  const tones = {
    default: "text-primary bg-primary/5",
    accent: "text-accent-foreground bg-accent/15",
    teal: "text-sky-700 bg-sky-100",
    green: "text-emerald-700 bg-emerald-100",
    red: "text-destructive bg-destructive/10",
  };
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-center justify-between">
        <span className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${tones[tone]}`}>
          <Icon className="h-4 w-4" />
        </span>
      </div>
      <div className="mt-3 font-heading text-2xl font-bold text-foreground">{value}</div>
      <div className="text-xs text-muted-foreground">{label}</div>
    </div>
  );
}

function Dashboard({ token, onLogout }) {
  const { lang, t } = useLanguage();
  const d = DICT[lang] || DICT.es;

  const [stats, setStats] = useState(null);
  const [leads, setLeads] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [documentFilter, setDocumentFilter] = useState("all");
  const [marketingFilter, setMarketingFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selected, setSelected] = useState(null);
  const [editStatus, setEditStatus] = useState("new");
  const [editNotes, setEditNotes] = useState("");
  const [savingDetail, setSavingDetail] = useState(false);
  const [exporting, setExporting] = useState(false);

  const load = useCallback(async () => {
    setLoading(true);
    try {
      const [s, l] = await Promise.all([
        fetchStats(token),
        fetchLeads(token, {
          search,
          status: statusFilter === "all" ? "" : statusFilter,
          lead_type: typeFilter === "all" ? "" : typeFilter,
          document_request: documentFilter === "all" ? "" : documentFilter,
          marketing_opt_in: marketingFilter === "all" ? "" : marketingFilter,
        }),
      ]);
      setStats(s);
      setLeads(l);
    } catch (err) {
      if (err?.response?.status === 401) {
        toast.error(d.badToken);
        onLogout();
      }
    } finally {
      setLoading(false);
    }
  }, [token, search, statusFilter, typeFilter, documentFilter, marketingFilter, onLogout, d.badToken]);

  useEffect(() => {
    const id = setTimeout(load, 250);
    return () => clearTimeout(id);
  }, [load]);

  const openDetail = (lead) => {
    setSelected(lead);
    setEditStatus(lead.status || "new");
    setEditNotes(lead.notes || "");
  };

  const saveDetail = async () => {
    if (!selected) return;
    setSavingDetail(true);
    try {
      const updated = await updateLead(token, selected.id, {
        status: editStatus,
        notes: editNotes,
      });
      setLeads((prev) => prev.map((l) => (l.id === updated.id ? updated : l)));
      setSelected(updated);
      toast.success(d.saved);
      fetchStats(token).then(setStats).catch(() => {});
    } catch (err) {
      toast.error(d.exportError);
    } finally {
      setSavingDetail(false);
    }
  };

  const removeLead = async () => {
    if (!selected) return;
    if (!window.confirm(d.confirmDelete)) return;
    try {
      await deleteLead(token, selected.id);
      setLeads((prev) => prev.filter((l) => l.id !== selected.id));
      setSelected(null);
      toast.success(d.deleted);
      fetchStats(token).then(setStats).catch(() => {});
    } catch (err) {
      toast.error(d.exportError);
    }
  };

  const doExport = async () => {
    setExporting(true);
    try {
      const res = await api.get("/admin/leads/export", {
        ...adminHeaders(token),
        responseType: "blob",
        params: Object.fromEntries(Object.entries({ search, status: statusFilter, lead_type: typeFilter, document_request: documentFilter, marketing_opt_in: marketingFilter }).filter(([,v]) => v && v !== "all")),
      });
      const url = window.URL.createObjectURL(new Blob([res.data]));
      const a = document.createElement("a");
      a.href = url;
      a.download = `docusite-leads-${new Date().toISOString().slice(0, 10)}.csv`;
      document.body.appendChild(a);
      a.click();
      a.remove();
      window.URL.revokeObjectURL(url);
      toast.success(d.exported);
    } catch (err) {
      toast.error(d.exportError);
    } finally {
      setExporting(false);
    }
  };

  const fmtDate = (iso) => {
    try {
      return new Intl.DateTimeFormat(lang === "es" ? "es-ES" : "en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date(iso));
    } catch {
      return iso;
    }
  };

  return (
    <div className="min-h-screen bg-secondary/30">
      {/* Top bar */}
      <header className="sticky top-0 z-30 border-b border-border bg-background/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <div className="flex items-center gap-3">
            <Link to="/">
              <Logo />
            </Link>
            <span className="hidden text-sm font-medium text-muted-foreground sm:inline">
              / {d.title}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <LanguageToggle />
            <Button
              variant="outline"
              size="sm"
              onClick={load}
              data-testid="admin-refresh-button"
              className="rounded-lg"
            >
              <RefreshCw className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">{d.refresh}</span>
            </Button>
            <Button
              variant="ghost"
              size="sm"
              onClick={onLogout}
              data-testid="admin-logout-button"
              className="rounded-lg text-muted-foreground"
            >
              <LogOut className="h-4 w-4 sm:mr-1.5" />
              <span className="hidden sm:inline">{d.logout}</span>
            </Button>
          </div>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 py-6 sm:px-6 sm:py-8">
        {/* KPIs */}
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
          <Kpi icon={Users} label={d.kpis.total} value={stats?.total ?? "—"} />
          <Kpi icon={Inbox} label={d.kpis.new} value={stats?.new ?? "—"} tone="accent" />
          <Kpi icon={PhoneCall} label={d.kpis.contacted} value={stats?.contacted ?? "—"} tone="teal" />
          <Kpi icon={Trophy} label={d.kpis.won} value={stats?.won ?? "—"} tone="green" />
          <Kpi icon={XCircle} label={d.kpis.lost} value={stats?.lost ?? "—"} tone="red" />
          <Kpi icon={CalendarClock} label={d.kpis.last7} value={stats?.last_7_days ?? "—"} />
        </div>

        {/* Toolbar */}
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative w-full sm:max-w-sm">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              data-testid="admin-leads-search-input"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder={d.searchPlaceholder}
              className="rounded-lg pl-9"
            />
          </div>
          <div className="flex items-center gap-2">
            <Select value={statusFilter} onValueChange={setStatusFilter}>
              <SelectTrigger data-testid="admin-status-filter" className="w-[170px] rounded-lg">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{d.allStatuses}</SelectItem>
                <SelectItem value="new">{d.statuses.new}</SelectItem>
                <SelectItem value="contacted">{d.statuses.contacted}</SelectItem>
                <SelectItem value="won">{d.statuses.won}</SelectItem>
                <SelectItem value="lost">{d.statuses.lost}</SelectItem>
              </SelectContent>
            </Select>
            <Button
              onClick={doExport}
              disabled={exporting || leads.length === 0}
              data-testid="admin-export-csv-button"
              className="rounded-lg bg-primary text-primary-foreground hover:bg-primary/95"
            >
              {exporting ? (
                <Loader2 className="h-4 w-4 animate-spin sm:mr-1.5" />
              ) : (
                <Download className="h-4 w-4 sm:mr-1.5" />
              )}
              <span className="hidden sm:inline">{d.export}</span>
            </Button>
          </div>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3" data-testid="admin-template-filters">
          {[{ id: "type", value: typeFilter, set: setTypeFilter, options: [["all",d.allTypes],["download_request",d.downloads],["contact",d.contacts]] }, { id: "document", value: documentFilter, set: setDocumentFilter, options: [["all",d.allDocuments], ...documentKeys.map(key => [key,documentContent[lang][key].name])] }, { id: "marketing", value: marketingFilter, set: setMarketingFilter, options: [["all",d.marketingAll],["true",d.marketingYes],["false",d.marketingNo]] }].map(filter => <Select key={filter.id} value={filter.value} onValueChange={filter.set}><SelectTrigger className="min-h-11" data-testid={`admin-${filter.id}-filter`} aria-label={filter.options[0][1]}><SelectValue /></SelectTrigger><SelectContent>{filter.options.map(([value,label]) => <SelectItem key={value} value={value} data-testid={`admin-${filter.id}-option-${value}`}>{label}</SelectItem>)}</SelectContent></Select>)}
        </div>
        {/* Table */}
        <div className="mt-5 overflow-hidden rounded-2xl border border-border bg-card shadow-sm">
          {loading ? (
            <div className="space-y-2 p-4">
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} className="h-12 w-full rounded-lg" />
              ))}
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center px-6 py-20 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-secondary">
                <Inbox className="h-6 w-6 text-muted-foreground" />
              </span>
              <h3 className="mt-4 font-heading text-lg font-semibold text-foreground">{d.empty}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{d.emptyHint}</p>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <Table data-testid="admin-leads-table">
                <TableHeader>
                  <TableRow className="bg-secondary/50 hover:bg-secondary/50">
                    <TableHead>{d.cols.name}</TableHead>
                    <TableHead className="hidden md:table-cell">{d.cols.email}</TableHead>
                    <TableHead className="hidden lg:table-cell">{d.cols.company}</TableHead>
                    <TableHead className="hidden lg:table-cell">{d.cols.role}</TableHead>
                    <TableHead className="hidden sm:table-cell">{d.cols.lang}</TableHead>
                    <TableHead>{d.cols.status}</TableHead>
                    <TableHead className="hidden sm:table-cell">{d.cols.date}</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {leads.map((lead) => (
                    <TableRow
                      key={lead.id}
                      data-testid={`admin-lead-row-${lead.id}`}
                      onClick={() => openDetail(lead)}
                      className="cursor-pointer hover:bg-muted/60"
                    >
                      <TableCell className="font-medium text-foreground">
                        {lead.name || lead.email}
                        <div data-testid={`admin-lead-type-${lead.id}`} className="mt-1 text-xs text-muted-foreground">{lead.lead_type === "download_request" ? `${d.template}: ${documentContent[lang][lead.document_request]?.name || lead.document_request}` : d.contacts}</div>
                        {lead.lead_type === "download_request" && <div data-testid={`admin-lead-marketing-${lead.id}`} className="mt-1 text-xs">{lead.marketing_opt_in ? d.marketingYes : d.marketingNo}</div>}
                        <div className="text-xs font-normal text-muted-foreground md:hidden">
                          {lead.email}
                        </div>
                      </TableCell>
                      <TableCell className="hidden md:table-cell text-muted-foreground">
                        {lead.email}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {lead.company || "—"}
                      </TableCell>
                      <TableCell className="hidden lg:table-cell text-muted-foreground">
                        {lead.role || "—"}
                      </TableCell>
                      <TableCell className="hidden sm:table-cell">
                        <span className="font-mono-plex text-xs uppercase text-muted-foreground">
                          {lead.language}
                        </span>
                      </TableCell>
                      <TableCell>
                        <StatusBadge status={lead.status} d={d} />
                      </TableCell>
                      <TableCell className="hidden sm:table-cell text-xs text-muted-foreground">
                        {fmtDate(lead.created_at)}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          )}
        </div>
        <AnalyticsPanel token={token}/>
      </main>

      {/* Detail Drawer */}
      <Drawer open={!!selected} onOpenChange={(o) => !o && setSelected(null)}>
        <DrawerContent className="max-h-[92vh]">
          {selected && (
            <div className="mx-auto w-full max-w-2xl overflow-y-auto px-4 pb-4" data-testid="admin-lead-detail">
              <DrawerHeader className="px-0">
                <DrawerTitle className="font-heading text-xl">{selected.name || selected.email}</DrawerTitle>
                <div className="mt-2 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <a href={`mailto:${selected.email}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                    <Mail className="h-4 w-4" /> {selected.email}
                  </a>
                  {selected.company && (
                    <span className="inline-flex items-center gap-1.5">
                      <Building2 className="h-4 w-4" /> {selected.company}
                    </span>
                  )}
                  {selected.phone && (
                    <a href={`tel:${selected.phone}`} className="inline-flex items-center gap-1.5 hover:text-foreground">
                      <Phone className="h-4 w-4" /> {selected.phone}
                    </a>
                  )}
                </div>
              </DrawerHeader>

              {selected.lead_type === "download_request" && <div data-testid="admin-template-details" className="space-y-3 rounded-xl border border-border bg-secondary/40 p-4 text-sm">
                <p data-testid="admin-template-document"><strong>{d.template}:</strong> {documentContent[lang][selected.document_request]?.name || selected.document_request}</p>
                <p data-testid="admin-template-marketing"><strong>{d.marketing}:</strong> {selected.marketing_opt_in ? d.marketingYes : d.marketingNo}</p>
                <p data-testid="admin-template-consent-date">{d.consentDate}: {fmtDate(selected.consented_at)}</p><p data-testid="admin-template-consent-version">{d.consentVersion}: {selected.consent_version}</p>
                <p className="text-xs text-muted-foreground" data-testid="admin-template-consent-text">{selected.consent_text}</p><p className="text-xs text-muted-foreground" data-testid="admin-template-marketing-text">{selected.marketing_consent_text}</p><p data-testid="admin-template-source" className="break-all text-xs">{selected.source_path}</p><p data-testid="admin-template-delivery-status" className="text-xs">{selected.source === 'sample_pdf' ? (lang==='en'?'PDF access granted; email delivery not used.':lang==='ca'?'Accés al PDF concedit; sense enviament per correu.':'Acceso al PDF concedido; sin envío por correo.') : d.delivery}</p>
              </div>}
              <div className="grid grid-cols-2 gap-3 border-y border-border py-4 text-sm sm:grid-cols-4">
                <div>
                  <div className="text-xs text-muted-foreground">{d.cols.role}</div>
                  <div className="mt-0.5 font-medium text-foreground">{selected.role || "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{d.teamSize}</div>
                  <div className="mt-0.5 font-medium text-foreground">{selected.team_size || "—"}</div>
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{d.planInterest}</div>
                  <div data-testid="admin-detail-plan" className="mt-0.5 font-medium text-foreground">{selected.plan_interest === "free_3_docs" ? t.offer.freeLabel : t.pricing.plans.find(p => p.id === selected.plan_interest)?.name || selected.plan_interest || t.offer.contactLabel}</div>
                  {selected.utm?.document && <div data-testid="admin-detail-document" className="mt-2 text-xs text-muted-foreground">{documentContent[lang][selected.utm.document]?.name || selected.utm.document}</div>}
                </div>
                <div>
                  <div className="text-xs text-muted-foreground">{d.cols.date}</div>
                  <div className="mt-0.5 font-medium text-foreground">{fmtDate(selected.created_at)}</div>
                </div>
              </div>

              <div className="py-4">
                <div className="text-xs text-muted-foreground">{d.message}</div>
                <p className="mt-1.5 whitespace-pre-wrap rounded-xl bg-secondary/50 p-3 text-sm text-foreground">
                  {selected.message || d.noMessage}
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <Label className="mb-1.5 block text-sm font-medium">{d.cols.status}</Label>
                  <Select value={editStatus} onValueChange={setEditStatus}>
                    <SelectTrigger data-testid="admin-detail-status-select" className="rounded-lg">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="new">{d.statuses.new}</SelectItem>
                      <SelectItem value="contacted">{d.statuses.contacted}</SelectItem>
                      <SelectItem value="won">{d.statuses.won}</SelectItem>
                      <SelectItem value="lost">{d.statuses.lost}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="mt-4">
                <Label className="mb-1.5 block text-sm font-medium">{d.notes}</Label>
                <Textarea
                  data-testid="admin-detail-notes"
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder={d.notesPlaceholder}
                  rows={3}
                  className="rounded-lg resize-none"
                />
              </div>

              <DrawerFooter className="flex-row justify-between px-0 pt-6">
                <Button
                  variant="outline"
                  onClick={removeLead}
                  data-testid="admin-detail-delete-button"
                  className="rounded-xl border-destructive/30 text-destructive hover:bg-destructive/5"
                >
                  <Trash2 className="mr-1.5 h-4 w-4" /> {d.delete}
                </Button>
                <Button
                  onClick={saveDetail}
                  disabled={savingDetail}
                  data-testid="admin-detail-save-button"
                  className="rounded-xl bg-primary text-primary-foreground hover:bg-primary/95"
                >
                  {savingDetail ? (
                    <span className="inline-flex items-center gap-2">
                      <Loader2 className="h-4 w-4 animate-spin" /> {d.saving}
                    </span>
                  ) : (
                    d.save
                  )}
                </Button>
              </DrawerFooter>
            </div>
          )}
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default function Admin() {
  const [token, setToken] = useState(null);
  const [checking, setChecking] = useState(true);

  useEffect(() => {
    const saved = localStorage.getItem(TOKEN_KEY);
    if (!saved) {
      setChecking(false);
      return;
    }
    verifyAdmin(saved)
      .then(() => setToken(saved))
      .catch(() => localStorage.removeItem(TOKEN_KEY))
      .finally(() => setChecking(false));
  }, []);

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    setToken(null);
  };

  if (checking) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-secondary/40">
        <Loader2 className="h-6 w-6 animate-spin text-primary" />
      </div>
    );
  }

  if (!token) return <LoginGate onAuthed={setToken} />;
  return <Dashboard token={token} onLogout={logout} />;
}
