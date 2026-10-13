#!/usr/bin/env python3
"""
DocuSite Backend API Test Suite - Enhanced
Tests all endpoints including download-requests endpoint
"""

import requests
import sys
import time
import uuid
from dotenv import dotenv_values

# Load configuration from .env files
backend_env = dotenv_values("/app/backend/.env")
frontend_env = dotenv_values("/app/frontend/.env")

BASE_URL = f"{frontend_env.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')}/api"
ADMIN_TOKEN = backend_env.get('ADMIN_TOKEN')

if not ADMIN_TOKEN:
    print("ERROR: ADMIN_TOKEN not found in backend .env")
    sys.exit(1)

class DocuSiteAPITester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.created_lead_ids = []
        self.session = requests.Session()
        
    def log(self, message):
        print(message)
    
    def test(self, name, method, endpoint, expected_status, headers=None, data=None, params=None):
        """Run a single API test"""
        url = f"{BASE_URL}{endpoint}"
        if method == "POST":
            headers = {**(headers or {}), "X-Forwarded-For": "2001:db8:" + ":".join(uuid.uuid4().hex[i:i+4] for i in range(0,24,4))}
        self.tests_run += 1
        
        print(f"\n[{self.tests_run}] Testing: {name}")
        print(f"    {method} {endpoint}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=headers, timeout=10)
            elif method == 'PATCH':
                response = self.session.patch(url, json=data, headers=headers, timeout=10)
            elif method == 'DELETE':
                response = self.session.delete(url, headers=headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                self.log(f"    PASS - Status: {response.status_code}")
                try:
                    return True, response.json() if response.content else {}
                except ValueError:
                    return True, {}
            else:
                self.tests_failed += 1
                self.log(f"    FAIL - Expected {expected_status}, got {response.status_code}")
                try:
                    error_detail = response.json()
                    self.log(f"    Response: {error_detail}")
                except ValueError:
                    self.log(f"    Response: {response.text[:200]}")
                return False, {}
                
        except requests.RequestException as e:
            self.tests_failed += 1
            self.log(f"    FAIL - Exception: {str(e)}")
            return False, {}
    
    def run_all_tests(self):
        """Execute all test scenarios"""
        self.log("\n" + "="*70)
        self.log("DocuSite Backend API Test Suite - Enhanced")
        self.log("="*70 + "\n")
        
        admin_headers = {"X-Admin-Token": ADMIN_TOKEN}
        
        # Test 1: Root endpoint
        self.test("Root endpoint", "GET", "/", 200)
        
        # DOWNLOAD REQUESTS TESTS
        self.log("\n--- DOWNLOAD REQUESTS TESTS ---")
        
        # Test 2: Valid download request with all fields
        download_data = {
            "email": f"download{int(time.time())}@example.com",
            "document_request": "visit",
            "language": "es",
            "consent": True,
            "marketing_opt_in": True,
            "source_path": "/es/acta-visita-obra",
            "website": ""
        }
        success, response = self.test(
            "Download request - valid with marketing opt-in",
            "POST",
            "/download-requests",
            201,
            data=download_data
        )
        if success:
            if 'id' in response:
                self.created_lead_ids.append(response['id'])
                self.log(f"    Request ID: {response['id']}")
            # Verify response structure
            if not (response.get('status') == 'requested' and 
                   response.get('download_available') == False and 
                   response.get('email_sent') == False):
                self.tests_failed += 1
                self.log(f"    FAIL - Response structure incorrect: {response}")
            else:
                self.log(f"    Response structure correct")
        
        # Test 3: Valid download request without marketing opt-in (should default to false)
        download_data_no_marketing = {
            "email": f"download{int(time.time())}@example.com",
            "document_request": "setting",
            "language": "en",
            "consent": True,
            "source_path": "/en/setting-out-record"
        }
        success, response = self.test(
            "Download request - without marketing opt-in",
            "POST",
            "/download-requests",
            201,
            data=download_data_no_marketing
        )
        if success and 'id' in response:
            self.created_lead_ids.append(response['id'])
        
        # Test 4: Download request - consent=false (should fail)
        no_consent_data = download_data.copy()
        no_consent_data['consent'] = False
        no_consent_data['email'] = f"noconsent{int(time.time())}@example.com"
        self.test(
            "Download request - consent=false (should fail)",
            "POST",
            "/download-requests",
            422,
            data=no_consent_data
        )
        
        # Test 5: Download request - invalid email
        invalid_email_data = download_data.copy()
        invalid_email_data['email'] = "not-an-email"
        self.test(
            "Download request - invalid email",
            "POST",
            "/download-requests",
            422,
            data=invalid_email_data
        )
        
        # Test 6: Download request - invalid document_request enum
        invalid_doc_data = download_data.copy()
        invalid_doc_data['email'] = f"invalid{int(time.time())}@example.com"
        invalid_doc_data['document_request'] = "invalid_document"
        self.test(
            "Download request - invalid document_request",
            "POST",
            "/download-requests",
            422,
            data=invalid_doc_data
        )
        
        # Test 7: Download request - invalid language enum
        invalid_lang_data = download_data.copy()
        invalid_lang_data['email'] = f"invalidlang{int(time.time())}@example.com"
        invalid_lang_data['language'] = "fr"
        self.test(
            "Download request - invalid language",
            "POST",
            "/download-requests",
            422,
            data=invalid_lang_data
        )
        
        # Test 8: Download request - unknown fields (extra="forbid")
        extra_field_data = download_data.copy()
        extra_field_data['email'] = f"extra{int(time.time())}@example.com"
        extra_field_data['unknown_field'] = "should fail"
        self.test(
            "Download request - unknown fields (should fail)",
            "POST",
            "/download-requests",
            422,
            data=extra_field_data
        )
        
        # Test 9: Download request - honeypot filled
        honeypot_data = download_data.copy()
        honeypot_data['email'] = f"bot{int(time.time())}@example.com"
        honeypot_data['website'] = "http://spam.com"
        
        # Get current total before honeypot
        _, stats_before = self.test("Get stats before honeypot", "GET", "/admin/stats", 200, headers=admin_headers)
        total_before = stats_before.get('total', 0)
        
        success, honeypot_response = self.test(
            "Download request - honeypot filled",
            "POST",
            "/download-requests",
            201,
            data=honeypot_data
        )
        
        # Verify honeypot lead was NOT stored
        time.sleep(0.5)
        _, stats_after = self.test("Get stats after honeypot", "GET", "/admin/stats", 200, headers=admin_headers)
        total_after = stats_after.get('total', 0)
        
        self.tests_run += 1
        if total_after == total_before:
            self.tests_passed += 1
            self.log("    PASS - Honeypot working - request NOT stored")
        else:
            self.tests_failed += 1
            self.log(f"    FAIL - Honeypot FAILED - request was stored")
        
        # Test 10: Download request - source_path with query/hash (should be rejected)
        invalid_path_data = download_data.copy()
        invalid_path_data['email'] = f"invalidpath{int(time.time())}@example.com"
        invalid_path_data['source_path'] = "/es/acta-visita-obra?utm=test#section"
        self.test(
            "Download request - source_path with query/hash",
            "POST",
            "/download-requests",
            422,
            data=invalid_path_data
        )
        
        # ADMIN FILTER TESTS FOR DOWNLOAD REQUESTS
        self.log("\n--- ADMIN FILTER TESTS ---")
        
        # Test 11: Filter by lead_type=download_request
        success, download_leads = self.test(
            "Filter leads - lead_type=download_request",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"lead_type": "download_request"}
        )
        if success:
            self.log(f"    Download requests: {len(download_leads)}")
            # Verify all are download_request type
            if not all(lead.get('lead_type') == 'download_request' for lead in download_leads):
                self.tests_failed += 1
                self.log(f"    FAIL - Some leads are not download_request type")
            else:
                self.log(f"    All leads are download_request type")
        
        # Test 12: Filter by lead_type=contact
        success, contact_leads = self.test(
            "Filter leads - lead_type=contact",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"lead_type": "contact"}
        )
        if success:
            self.log(f"    Contact leads: {len(contact_leads)}")
        
        # Test 13: Filter by document_request
        success, visit_leads = self.test(
            "Filter leads - document_request=visit",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"document_request": "visit"}
        )
        if success:
            self.log(f"    Visit document requests: {len(visit_leads)}")
        
        # Test 14: Filter by marketing_opt_in=true
        success, marketing_yes = self.test(
            "Filter leads - marketing_opt_in=true",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"marketing_opt_in": True}
        )
        if success:
            self.log(f"    Marketing opt-in true: {len(marketing_yes)}")
            # Verify all have marketing_opt_in=true
            if not all(lead.get('marketing_opt_in') == True for lead in marketing_yes):
                self.tests_failed += 1
                self.log(f"    FAIL - Some leads don't have marketing_opt_in=true")
            else:
                self.log(f"    All leads have marketing_opt_in=true")
        
        # Test 15: Filter by marketing_opt_in=false
        success, marketing_no = self.test(
            "Filter leads - marketing_opt_in=false",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"marketing_opt_in": False}
        )
        if success:
            self.log(f"    Marketing opt-in false: {len(marketing_no)}")
        
        # Test 16: Combined filters
        success, combined = self.test(
            "Filter leads - combined (download_request + visit + marketing=true)",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={
                "lead_type": "download_request",
                "document_request": "visit",
                "marketing_opt_in": True
            }
        )
        if success:
            self.log(f"    Combined filter results: {len(combined)}")
        
        # VERIFY STORED DATA
        if self.created_lead_ids:
            self.log("\n--- VERIFY STORED DATA ---")
            lead_id = self.created_lead_ids[0]
            success, lead = self.test(
                "Get download request lead details",
                "GET",
                f"/admin/leads/{lead_id}",
                200,
                headers=admin_headers
            )
            if success:
                # Verify required fields
                required_fields = {
                    'lead_type': 'download_request',
                    'source': 'template_request',
                    'consent_version': 'template-request-v1',
                }
                all_correct = True
                for field, expected in required_fields.items():
                    actual = lead.get(field)
                    if actual == expected:
                        self.log(f"    {field}: {actual}")
                    else:
                        self.log(f"    FAIL - {field}: expected '{expected}', got '{actual}'")
                        all_correct = False
                        self.tests_failed += 1
                
                # Verify consent fields exist
                consent_fields = ['consented_at', 'consent_text', 'marketing_consent_text', 'source_path']
                for field in consent_fields:
                    if field in lead and lead[field]:
                        self.log(f"    {field}: present")
                    else:
                        self.log(f"    FAIL - {field}: missing or empty")
                        all_correct = False
                        self.tests_failed += 1
        
        # CSV EXPORT TEST
        self.log("\n--- CSV EXPORT TEST ---")
        
        # Test 17: Export CSV with filters
        try:
            url = f"{BASE_URL}/admin/leads/export"
            response = self.session.get(
                url,
                headers=admin_headers,
                params={"lead_type": "download_request"},
                timeout=10
            )
            self.tests_run += 1
            if response.status_code == 200 and 'text/csv' in response.headers.get('Content-Type', ''):
                self.tests_passed += 1
                self.log(f"\n[{self.tests_run}] Testing: Export CSV with filters")
                self.log(f"    PASS - CSV export successful")
                
                # Verify CSV contains expected columns
                csv_content = response.text
                if not ('consent_version' in csv_content and 'consented_at' in csv_content and 'marketing_opt_in' in csv_content):
                    self.tests_failed += 1
                    self.log(f"    FAIL - CSV missing some consent fields")
                else:
                    self.log(f"    CSV contains consent fields")
            else:
                self.tests_failed += 1
                self.log(f"\n[{self.tests_run}] Testing: Export CSV with filters")
                self.log(f"    FAIL - Expected 200 with CSV, got {response.status_code}")
        except requests.RequestException as e:
            self.tests_failed += 1
            self.tests_run += 1
            self.log(f"\n[{self.tests_run}] Testing: Export CSV with filters")
            self.log(f"    FAIL - Exception: {str(e)}")
        
        # CLEANUP
        if self.created_lead_ids:
            self.log("\n--- CLEANUP: DELETE TEST LEADS ---")
            for lead_id in self.created_lead_ids:
                self.test(
                    f"Delete lead {lead_id[:8]}...",
                    "DELETE",
                    f"/admin/leads/{lead_id}",
                    200,
                    headers=admin_headers
                )
        
        # FINAL REPORT
        return self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        self.log("\n" + "="*70)
        self.log("TEST SUMMARY")
        self.log("="*70)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        self.log(f"\nTotal Tests: {self.tests_run}")
        self.log(f"Passed: {self.tests_passed}")
        self.log(f"Failed: {self.tests_failed}")
        self.log(f"Success Rate: {success_rate:.1f}%")
        
        if self.tests_failed == 0:
            self.log("\nAll tests passed!")
            return 0
        else:
            self.log(f"\n{self.tests_failed} test(s) failed")
            return 1

def main():
    tester = DocuSiteAPITester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
