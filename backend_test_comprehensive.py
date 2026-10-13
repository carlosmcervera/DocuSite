#!/usr/bin/env python3
"""
DocuSite Comprehensive Backend Test Suite
Tests all 28 public routes, SEO metadata, admin filters, rate limiting, and edge cases
"""

import requests
import sys
import time
import uuid
import re
from dotenv import dotenv_values
from html.parser import HTMLParser

# Load configuration from .env files
backend_env = dotenv_values("/app/backend/.env")
frontend_env = dotenv_values("/app/frontend/.env")

BASE_URL = frontend_env.get('REACT_APP_BACKEND_URL', 'http://localhost:8001')
API_URL = f"{BASE_URL}/api"
ADMIN_TOKEN = backend_env.get('ADMIN_TOKEN')

if not ADMIN_TOKEN:
    print("ERROR: ADMIN_TOKEN not found in backend .env")
    sys.exit(1)

# All 28 public routes
PUBLIC_ROUTES = [
    "/es", "/en",
    "/es/documentos", "/en/documents",
    "/es/documentos/acta-replanteo", "/en/documents/setting-out-minutes",
    "/es/documentos/acta-visita-obra", "/en/documents/site-visit-minutes",
    "/es/documentos/informe-visita-reportaje-fotografico", "/en/documents/site-visit-report-photo-log",
    "/es/documentos/acta-repasos-checklist", "/en/documents/punch-list-checklist-minutes",
    "/es/documentos/acta-fin-obra", "/en/documents/project-closeout-minutes",
    "/es/como-funciona", "/en/how-it-works",
    "/es/beneficios", "/en/benefits",
    "/es/roi", "/en/roi",
    "/es/casos-de-uso", "/en/use-cases",
    "/es/precios", "/en/pricing",
    "/es/faq", "/en/faq",
    "/es/contacto", "/en/contact"
]

DOCUMENT_ROUTES = [
    "/es/documentos/acta-replanteo", "/en/documents/setting-out-minutes",
    "/es/documentos/acta-visita-obra", "/en/documents/site-visit-minutes",
    "/es/documentos/informe-visita-reportaje-fotografico", "/en/documents/site-visit-report-photo-log",
    "/es/documentos/acta-repasos-checklist", "/en/documents/punch-list-checklist-minutes",
    "/es/documentos/acta-fin-obra", "/en/documents/project-closeout-minutes",
]

class HTMLMetaParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.h1_count = 0
        self.h1_text = []
        self.title = None
        self.description = None
        self.canonical = None
        self.hreflang = []
        self.robots = None
        self.has_faq_schema = False
        self.has_article_schema = False
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        if tag == 'h1':
            self.h1_count += 1
        elif tag == 'title':
            self.in_title = True
        elif tag == 'meta':
            name = attrs_dict.get('name', '').lower()
            prop = attrs_dict.get('property', '').lower()
            content = attrs_dict.get('content', '')
            if name == 'description' or prop == 'og:description':
                self.description = content
            elif name == 'robots':
                self.robots = content
        elif tag == 'link':
            rel = attrs_dict.get('rel', '')
            if rel == 'canonical':
                self.canonical = attrs_dict.get('href', '')
            elif rel == 'alternate':
                hreflang = attrs_dict.get('hreflang', '')
                href = attrs_dict.get('href', '')
                if hreflang and href:
                    self.hreflang.append((hreflang, href))
        elif tag == 'script':
            if attrs_dict.get('type') == 'application/ld+json':
                self.in_schema = True
                self.schema_content = ''
                
    def handle_data(self, data):
        if hasattr(self, 'in_title') and self.in_title:
            self.title = data
        elif hasattr(self, 'in_schema') and self.in_schema:
            self.schema_content += data
            if 'FAQPage' in data:
                self.has_faq_schema = True
            if 'Article' in data:
                self.has_article_schema = True
                
    def handle_endtag(self, tag):
        if tag == 'title' and hasattr(self, 'in_title'):
            self.in_title = False
        elif tag == 'script' and hasattr(self, 'in_schema'):
            self.in_schema = False

class ComprehensiveTester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.created_lead_ids = []
        self.session = requests.Session()
        
    def log(self, message):
        print(message)
    
    def test_api(self, name, method, endpoint, expected_status, headers=None, data=None, params=None):
        """Test API endpoint"""
        url = f"{API_URL}{endpoint}"
        if method == "POST":
            headers = {**(headers or {}), "X-Forwarded-For": "2001:db8:" + ":".join(uuid.uuid4().hex[i:i+4] for i in range(0,24,4))}
        self.tests_run += 1
        
        print(f"\n[{self.tests_run}] Testing: {name}")
        
        try:
            if method == 'GET':
                response = self.session.get(url, headers=headers, params=params, timeout=10)
            elif method == 'POST':
                response = self.session.post(url, json=data, headers=headers, timeout=10)
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
                return False, {}
                
        except requests.RequestException as e:
            self.tests_failed += 1
            self.log(f"    FAIL - Exception: {str(e)}")
            return False, {}
    
    def test_route_seo(self, route):
        """Test a single route for SEO metadata"""
        url = f"{BASE_URL}{route}"
        self.tests_run += 1
        
        try:
            # Test with Accept: text/html
            response = self.session.get(url, headers={'Accept': 'text/html'}, timeout=10)
            if response.status_code != 200:
                self.tests_failed += 1
                self.log(f"    FAIL - Route {route} returned {response.status_code}")
                return False
            
            # Parse HTML
            parser = HTMLMetaParser()
            parser.feed(response.text)
            
            # Check H1 count
            if parser.h1_count != 1:
                self.tests_failed += 1
                self.log(f"    FAIL - Route {route} has {parser.h1_count} H1 tags (expected 1)")
                return False
            
            # Check title
            if not parser.title or 'DocuSite' not in parser.title:
                self.tests_failed += 1
                self.log(f"    FAIL - Route {route} missing or invalid title")
                return False
            
            # Check description
            if not parser.description:
                self.tests_failed += 1
                self.log(f"    FAIL - Route {route} missing description")
                return False
            
            # Check canonical
            if not parser.canonical or route not in parser.canonical:
                self.tests_failed += 1
                self.log(f"    FAIL - Route {route} missing or incorrect canonical")
                return False
            
            # Check hreflang (should have es, en, x-default)
            hreflang_langs = [lang for lang, _ in parser.hreflang]
            if 'es' not in hreflang_langs or 'en' not in hreflang_langs or 'x-default' not in hreflang_langs:
                self.tests_failed += 1
                self.log(f"    FAIL - Route {route} missing hreflang tags (found: {hreflang_langs})")
                return False
            
            self.tests_passed += 1
            self.log(f"    PASS - Route {route} SEO metadata correct")
            return True
            
        except Exception as e:
            self.tests_failed += 1
            self.log(f"    FAIL - Route {route} exception: {str(e)}")
            return False
    
    def run_all_tests(self):
        """Execute all test scenarios"""
        self.log("\n" + "="*70)
        self.log("DocuSite Comprehensive Backend Test Suite")
        self.log("="*70 + "\n")
        
        admin_headers = {"X-Admin-Token": ADMIN_TOKEN}
        
        # TEST 1: All 28 public routes SEO
        self.log("\n--- TESTING ALL 28 PUBLIC ROUTES SEO ---")
        for route in PUBLIC_ROUTES:
            self.test_route_seo(route)
        
        # TEST 2: Special routes
        self.log("\n--- TESTING SPECIAL ROUTES ---")
        
        # Admin route should have noindex
        self.tests_run += 1
        try:
            response = self.session.get(f"{BASE_URL}/admin", headers={'Accept': 'text/html'}, timeout=10)
            parser = HTMLMetaParser()
            parser.feed(response.text)
            if parser.robots and 'noindex' in parser.robots:
                self.tests_passed += 1
                self.log(f"    PASS - /admin has noindex")
            else:
                self.tests_failed += 1
                self.log(f"    FAIL - /admin missing noindex")
        except Exception as e:
            self.tests_failed += 1
            self.log(f"    FAIL - /admin exception: {str(e)}")
        
        # 404 routes should have noindex
        for route in ['/unknown-route', '/en/unknown-route']:
            self.tests_run += 1
            try:
                response = self.session.get(f"{BASE_URL}{route}", headers={'Accept': 'text/html'}, timeout=10)
                parser = HTMLMetaParser()
                parser.feed(response.text)
                if response.status_code == 404 and parser.robots and 'noindex' in parser.robots:
                    self.tests_passed += 1
                    self.log(f"    PASS - {route} returns 404 with noindex")
                else:
                    self.tests_failed += 1
                    self.log(f"    FAIL - {route} incorrect status or missing noindex")
            except Exception as e:
                self.tests_failed += 1
                self.log(f"    FAIL - {route} exception: {str(e)}")
        
        # Legacy demo routes should 301 redirect
        for route in ['/demo', '/es/demo', '/en/demo']:
            self.tests_run += 1
            try:
                response = self.session.get(f"{BASE_URL}{route}", allow_redirects=False, timeout=10)
                if response.status_code == 301:
                    self.tests_passed += 1
                    self.log(f"    PASS - {route} returns 301 redirect")
                else:
                    self.tests_failed += 1
                    self.log(f"    FAIL - {route} expected 301, got {response.status_code}")
            except Exception as e:
                self.tests_failed += 1
                self.log(f"    FAIL - {route} exception: {str(e)}")
        
        # Trailing slash should 301 redirect
        self.tests_run += 1
        try:
            response = self.session.get(f"{BASE_URL}/es/", allow_redirects=False, timeout=10)
            if response.status_code == 301:
                self.tests_passed += 1
                self.log(f"    PASS - Trailing slash redirects 301")
            else:
                self.tests_failed += 1
                self.log(f"    FAIL - Trailing slash expected 301, got {response.status_code}")
        except Exception as e:
            self.tests_failed += 1
            self.log(f"    FAIL - Trailing slash exception: {str(e)}")
        
        # TEST 3: API Tests
        self.log("\n--- API TESTS ---")
        
        # Create test leads for filtering
        timestamp = int(time.time())
        test_leads = []
        
        # Create download request with marketing=true
        download_data = {
            "email": f"test{timestamp}@example.com",
            "document_request": "visit",
            "language": "es",
            "consent": True,
            "marketing_opt_in": True,
            "source_path": "/es/acta-visita-obra",
            "website": ""
        }
        success, response = self.test_api(
            "Create download request with marketing=true",
            "POST",
            "/download-requests",
            201,
            data=download_data
        )
        if success and 'id' in response:
            test_leads.append(response['id'])
        
        # Wait to avoid rate limit
        time.sleep(2)
        
        # Create download request with marketing=false
        download_data2 = {
            "email": f"test{timestamp+1}@example.com",
            "document_request": "completion",
            "language": "en",
            "consent": True,
            "marketing_opt_in": False,
            "source_path": "/en/documents/project-closeout-minutes",
            "website": ""
        }
        success, response = self.test_api(
            "Create download request with marketing=false",
            "POST",
            "/download-requests",
            201,
            data=download_data2
        )
        if success and 'id' in response:
            test_leads.append(response['id'])
        
        # TEST 4: Strict bool validation
        self.log("\n--- STRICT BOOL VALIDATION ---")
        
        # Test string "false" should be rejected
        invalid_bool_data = download_data.copy()
        invalid_bool_data['email'] = f"test{timestamp+2}@example.com"
        invalid_bool_data['consent'] = "false"
        self.test_api(
            "Strict bool - string 'false' rejected",
            "POST",
            "/download-requests",
            422,
            data=invalid_bool_data
        )
        
        # Test string "yes" should be rejected
        invalid_bool_data2 = download_data.copy()
        invalid_bool_data2['email'] = f"test{timestamp+3}@example.com"
        invalid_bool_data2['consent'] = "yes"
        self.test_api(
            "Strict bool - string 'yes' rejected",
            "POST",
            "/download-requests",
            422,
            data=invalid_bool_data2
        )
        
        # Test integer 1 should be rejected
        invalid_bool_data3 = download_data.copy()
        invalid_bool_data3['email'] = f"test{timestamp+4}@example.com"
        invalid_bool_data3['consent'] = 1
        self.test_api(
            "Strict bool - integer 1 rejected",
            "POST",
            "/download-requests",
            422,
            data=invalid_bool_data3
        )
        
        # Test null should be rejected
        invalid_bool_data4 = download_data.copy()
        invalid_bool_data4['email'] = f"test{timestamp+5}@example.com"
        invalid_bool_data4['consent'] = None
        self.test_api(
            "Strict bool - null rejected",
            "POST",
            "/download-requests",
            422,
            data=invalid_bool_data4
        )
        
        # TEST 5: Admin filters
        self.log("\n--- ADMIN FILTERS ---")
        
        # Get all leads
        success, all_leads = self.test_api(
            "Get all leads",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers
        )
        
        # Filter by type
        success, download_leads = self.test_api(
            "Filter by lead_type=download_request",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"lead_type": "download_request"}
        )
        
        # Filter by document
        success, visit_leads = self.test_api(
            "Filter by document_request=visit",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"document_request": "visit"}
        )
        
        # Filter by marketing
        success, marketing_leads = self.test_api(
            "Filter by marketing_opt_in=true",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"marketing_opt_in": True}
        )
        
        # Combined filters
        success, combined_leads = self.test_api(
            "Combined filters (type+doc+marketing)",
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
        
        # TEST 6: CSV Export with same IDs
        self.log("\n--- CSV EXPORT VALIDATION ---")
        
        self.tests_run += 1
        try:
            # Get leads via API
            success, api_leads = self.test_api(
                "Get leads for CSV comparison",
                "GET",
                "/admin/leads",
                200,
                headers=admin_headers,
                params={"lead_type": "download_request"}
            )
            
            # Get CSV export
            csv_response = self.session.get(
                f"{API_URL}/admin/leads/export",
                headers=admin_headers,
                params={"lead_type": "download_request"},
                timeout=10
            )
            
            if csv_response.status_code == 200:
                csv_lines = csv_response.text.strip().split('\n')
                csv_ids = [line.split(',')[0] for line in csv_lines[1:]]  # Skip header
                api_ids = [lead['id'] for lead in api_leads]
                
                if set(csv_ids) == set(api_ids):
                    self.tests_passed += 1
                    self.log(f"    PASS - CSV IDs match API IDs exactly")
                else:
                    self.tests_failed += 1
                    self.log(f"    FAIL - CSV IDs don't match API IDs")
            else:
                self.tests_failed += 1
                self.log(f"    FAIL - CSV export failed with status {csv_response.status_code}")
        except Exception as e:
            self.tests_failed += 1
            self.log(f"    FAIL - CSV export exception: {str(e)}")
        
        # TEST 7: Regex search escape
        self.log("\n--- REGEX SEARCH ESCAPE ---")
        
        # Create lead with special characters in name
        time.sleep(2)
        special_char_lead = {
            "name": "[.*test",
            "email": f"regex{timestamp}@example.com",
            "consent": True,
            "language": "es"
        }
        success, response = self.test_api(
            "Create lead with regex special chars",
            "POST",
            "/leads",
            201,
            data=special_char_lead
        )
        if success and 'id' in response:
            test_leads.append(response['id'])
        
        # Search for the special characters - should not cause 500 or wild matches
        success, search_results = self.test_api(
            "Search with regex special chars '[.*'",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"search": "[.*"}
        )
        
        # TEST 8: CSV formula escape
        self.log("\n--- CSV FORMULA ESCAPE ---")
        
        time.sleep(2)
        formula_lead = {
            "name": "=SUM(A1:A10)",
            "email": f"formula{timestamp}@example.com",
            "consent": True,
            "language": "es"
        }
        success, response = self.test_api(
            "Create lead with formula in name",
            "POST",
            "/leads",
            201,
            data=formula_lead
        )
        if success and 'id' in response:
            test_leads.append(response['id'])
            
            # Export CSV and check if formula is escaped
            self.tests_run += 1
            try:
                csv_response = self.session.get(
                    f"{API_URL}/admin/leads/export",
                    headers=admin_headers,
                    params={"search": "formula"},
                    timeout=10
                )
                
                if csv_response.status_code == 200:
                    csv_content = csv_response.text
                    # Check if formula is escaped with single quote
                    if "'=SUM" in csv_content:
                        self.tests_passed += 1
                        self.log(f"    PASS - CSV formula escaped correctly")
                    else:
                        self.tests_failed += 1
                        self.log(f"    FAIL - CSV formula not escaped")
                else:
                    self.tests_failed += 1
                    self.log(f"    FAIL - CSV export failed")
            except Exception as e:
                self.tests_failed += 1
                self.log(f"    FAIL - CSV formula test exception: {str(e)}")
        
        # TEST 9: Unauthorized admin access
        self.log("\n--- UNAUTHORIZED ACCESS ---")
        
        self.test_api(
            "Unauthorized CSV download",
            "GET",
            "/admin/leads/export",
            401
        )
        
        # CLEANUP
        if test_leads:
            self.log("\n--- CLEANUP TEST LEADS ---")
            for lead_id in test_leads:
                self.test_api(
                    f"Delete lead {lead_id[:8]}...",
                    "DELETE",
                    f"/admin/leads/{lead_id}",
                    200,
                    headers=admin_headers
                )
        
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
    tester = ComprehensiveTester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
