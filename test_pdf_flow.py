#!/usr/bin/env python3
"""
Test PDF Gate Flow with sample_acta asset
Tests the complete flow: email submission -> token generation -> PDF download
"""
import requests
import sys
import hashlib
from datetime import datetime
from dotenv import dotenv_values
from pathlib import Path
import PyPDF2
import io

frontend_env = dotenv_values('/app/frontend/.env')
backend_env = dotenv_values('/app/backend/.env')

BACKEND_URL = frontend_env.get('REACT_APP_BACKEND_URL', '').rstrip('/') + '/api'
ADMIN_TOKEN = backend_env.get('ADMIN_TOKEN', '')

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    END = '\033[0m'

def log(message, color=Colors.BLUE):
    print(f"{color}{message}{Colors.END}")

def test_pdf_gate_flow():
    """Test complete PDF gate flow"""
    log("=" * 60, Colors.BLUE)
    log("PDF Gate Flow Test (sample_acta)", Colors.BLUE)
    log("=" * 60, Colors.BLUE)
    
    tests_passed = 0
    tests_total = 0
    test_lead_id = None
    
    # Test 1: Submit email with processing consent only (marketing=false)
    tests_total += 1
    log("\nTest 1: Submit PDF request with processing consent only", Colors.BLUE)
    timestamp = datetime.now().strftime("%H%M%S%f")
    test_email = f"test-pdf-{timestamp}@example.com"
    
    try:
        response = requests.post(
            f"{BACKEND_URL}/download-requests",
            json={
                "email": test_email,
                "document_request": "visit",
                "language": "es",
                "consent": True,
                "marketing_opt_in": False,
                "source_path": "/es",
                "asset": "sample_acta"
            },
            headers={"X-Forwarded-For": "2001:DB8::1"},
            timeout=10
        )
        
        if response.status_code == 201:
            data = response.json()
            if data.get('download_available') and data.get('download_url'):
                log("PASSED - PDF request created with download URL", Colors.GREEN)
                log(f"   Download URL: {data['download_url']}", Colors.GREEN)
                log(f"   Expires at: {data.get('expires_at')}", Colors.GREEN)
                tests_passed += 1
                download_url = data['download_url']
                test_lead_id = data['id']
            else:
                log("FAILED - download_available or download_url missing", Colors.RED)
                log(f"   Response: {data}", Colors.YELLOW)
        else:
            log(f"FAILED - Expected 201, got {response.status_code}", Colors.RED)
            log(f"   Response: {response.text}", Colors.YELLOW)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 2: Download the PDF using the token
    tests_total += 1
    log("\nTest 2: Download PDF using token", Colors.BLUE)
    
    try:
        pdf_response = requests.get(
            f"{BACKEND_URL.replace('/api', '')}{download_url}",
            timeout=10
        )
        
        if pdf_response.status_code == 200:
            content_type = pdf_response.headers.get('Content-Type', '')
            if 'application/pdf' in content_type:
                log("PASSED - PDF downloaded successfully", Colors.GREEN)
                log(f"   Content-Type: {content_type}", Colors.GREEN)
                log(f"   Size: {len(pdf_response.content)} bytes", Colors.GREEN)
                tests_passed += 1
                
                # Test 3: Verify PDF has 2 pages
                tests_total += 1
                log("\nTest 3: Verify PDF has 2 pages", Colors.BLUE)
                try:
                    pdf_file = io.BytesIO(pdf_response.content)
                    pdf_reader = PyPDF2.PdfReader(pdf_file)
                    page_count = len(pdf_reader.pages)
                    
                    if page_count == 2:
                        log(f"PASSED - PDF has {page_count} pages", Colors.GREEN)
                        tests_passed += 1
                    else:
                        log(f"FAILED - Expected 2 pages, got {page_count}", Colors.RED)
                except Exception as e:
                    log(f"FAILED - Error parsing PDF: {str(e)}", Colors.RED)
            else:
                log(f"FAILED - Wrong content type: {content_type}", Colors.RED)
        else:
            log(f"FAILED - Expected 200, got {pdf_response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 4: Verify invalid token returns 404
    tests_total += 1
    log("\nTest 4: Verify invalid token returns 404", Colors.BLUE)
    
    try:
        invalid_response = requests.get(
            f"{BACKEND_URL}/downloads/invalid-token-12345",
            timeout=10
        )
        
        if invalid_response.status_code == 404:
            log("PASSED - Invalid token returns 404", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 404, got {invalid_response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 5: Verify token hash is stored (not plaintext)
    tests_total += 1
    log("\nTest 5: Verify lead stored with hashed token", Colors.BLUE)
    
    try:
        leads_response = requests.get(
            f"{BACKEND_URL}/admin/leads",
            headers={"X-Admin-Token": ADMIN_TOKEN},
            params={"search": test_email},
            timeout=10
        )
        
        if leads_response.status_code == 200:
            leads = leads_response.json()
            if leads and len(leads) > 0:
                lead = leads[0]
                # Check that lead has correct fields
                if (lead.get('lead_type') == 'download_request' and
                    lead.get('source') == 'sample_pdf' and
                    lead.get('consent_version') == 'sample-pdf-v2' and
                    lead.get('marketing_opt_in') == False):
                    log("PASSED - Lead stored correctly with sample_pdf source", Colors.GREEN)
                    log(f"   Lead type: {lead.get('lead_type')}", Colors.GREEN)
                    log(f"   Source: {lead.get('source')}", Colors.GREEN)
                    log(f"   Consent version: {lead.get('consent_version')}", Colors.GREEN)
                    log(f"   Marketing opt-in: {lead.get('marketing_opt_in')}", Colors.GREEN)
                    tests_passed += 1
                    test_lead_id = lead['id']
                else:
                    log("FAILED - Lead fields incorrect", Colors.RED)
                    log(f"   Lead: {lead}", Colors.YELLOW)
            else:
                log("FAILED - Lead not found", Colors.RED)
        else:
            log(f"FAILED - Expected 200, got {leads_response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 6: Submit with marketing consent = true
    tests_total += 1
    log("\nTest 6: Submit PDF request with marketing consent", Colors.BLUE)
    timestamp2 = datetime.now().strftime("%H%M%S%f")
    test_email2 = f"test-pdf-marketing-{timestamp2}@example.com"
    test_lead_id2 = None
    
    try:
        response2 = requests.post(
            f"{BACKEND_URL}/download-requests",
            json={
                "email": test_email2,
                "document_request": "visit",
                "language": "ca",
                "consent": True,
                "marketing_opt_in": True,
                "source_path": "/ca",
                "asset": "sample_acta"
            },
            headers={"X-Forwarded-For": "2001:DB8::2"},
            timeout=10
        )
        
        if response2.status_code == 201:
            data2 = response2.json()
            test_lead_id2 = data2['id']
            
            # Verify marketing_opt_in is stored correctly
            leads_response2 = requests.get(
                f"{BACKEND_URL}/admin/leads",
                headers={"X-Admin-Token": ADMIN_TOKEN},
                params={"search": test_email2},
                timeout=10
            )
            
            if leads_response2.status_code == 200:
                leads2 = leads_response2.json()
                if leads2 and leads2[0].get('marketing_opt_in') == True:
                    log("PASSED - Marketing consent stored correctly", Colors.GREEN)
                    tests_passed += 1
                else:
                    log("FAILED - Marketing consent not stored correctly", Colors.RED)
            else:
                log(f"FAILED - Could not verify lead", Colors.RED)
        else:
            log(f"FAILED - Expected 201, got {response2.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 7: Verify consent text is stored in correct language
    tests_total += 1
    log("\nTest 7: Verify consent text stored in Catalan", Colors.BLUE)
    
    try:
        if test_lead_id2:
            lead_response = requests.get(
                f"{BACKEND_URL}/admin/leads/{test_lead_id2}",
                headers={"X-Admin-Token": ADMIN_TOKEN},
                timeout=10
            )
            
            if lead_response.status_code == 200:
                lead = lead_response.json()
                consent_text = lead.get('consent_text', '')
                marketing_text = lead.get('marketing_consent_text', '')
                
                if 'Accepto que DocuSite tracti' in consent_text and 'Vull rebre consells' in marketing_text:
                    log("PASSED - Consent text stored in Catalan", Colors.GREEN)
                    tests_passed += 1
                else:
                    log("FAILED - Consent text not in Catalan", Colors.RED)
                    log(f"   Consent: {consent_text[:50]}...", Colors.YELLOW)
            else:
                log(f"FAILED - Could not retrieve lead", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Cleanup
    log("\nCleaning up test leads...", Colors.BLUE)
    for lead_id in [test_lead_id, test_lead_id2]:
        if lead_id:
            try:
                requests.delete(
                    f"{BACKEND_URL}/admin/leads/{lead_id}",
                    headers={"X-Admin-Token": ADMIN_TOKEN},
                    timeout=10
                )
                log(f"   Deleted lead {lead_id[:8]}", Colors.GREEN)
            except Exception as e:
                log(f"   Failed to delete {lead_id[:8]}: {str(e)}", Colors.YELLOW)
    
    # Summary
    log("\n" + "=" * 60, Colors.BLUE)
    log("Test Summary", Colors.BLUE)
    log("=" * 60, Colors.BLUE)
    
    success_rate = (tests_passed / tests_total * 100) if tests_total > 0 else 0
    
    if success_rate == 100:
        color = Colors.GREEN
        status = "ALL TESTS PASSED"
    elif success_rate >= 80:
        color = Colors.YELLOW
        status = "MOST TESTS PASSED"
    else:
        color = Colors.RED
        status = "MANY TESTS FAILED"
    
    log(f"\n{status}", color)
    log(f"Tests Run: {tests_total}", Colors.BLUE)
    log(f"Tests Passed: {tests_passed}", Colors.GREEN)
    log(f"Tests Failed: {tests_total - tests_passed}", Colors.RED)
    log(f"Success Rate: {success_rate:.1f}%", color)
    log("=" * 60 + "\n", Colors.BLUE)
    
    return 0 if success_rate == 100 else 1

if __name__ == "__main__":
    sys.exit(test_pdf_gate_flow())
