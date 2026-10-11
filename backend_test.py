#!/usr/bin/env python3
"""
DocuSite Backend API Test Suite
Tests all endpoints: public lead creation, honeypot, admin auth, CRUD, search, filter, export
"""

import requests
import sys
import time
from datetime import datetime

# Configuration
BASE_URL = "https://docuobra.preview.emergentagent.com/api"
ADMIN_TOKEN = "DocuSite2026-Admin"
WRONG_TOKEN = "WrongToken123"

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

class DocuSiteAPITester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.created_lead_ids = []
        self.session = requests.Session()
        
    def log(self, message, color=Colors.RESET):
        print(f"{color}{message}{Colors.RESET}")
    
    def test(self, name, method, endpoint, expected_status, headers=None, data=None, params=None):
        """Run a single API test"""
        url = f"{BASE_URL}{endpoint}"
        self.tests_run += 1
        
        print(f"\n{Colors.BLUE}[{self.tests_run}] Testing: {name}{Colors.RESET}")
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
                self.log(f"    ✅ PASS - Status: {response.status_code}", Colors.GREEN)
                try:
                    return True, response.json() if response.content else {}
                except:
                    return True, {}
            else:
                self.tests_failed += 1
                self.log(f"    ❌ FAIL - Expected {expected_status}, got {response.status_code}", Colors.RED)
                try:
                    error_detail = response.json()
                    self.log(f"    Response: {error_detail}", Colors.YELLOW)
                except:
                    self.log(f"    Response: {response.text[:200]}", Colors.YELLOW)
                return False, {}
                
        except Exception as e:
            self.tests_failed += 1
            self.log(f"    ❌ FAIL - Exception: {str(e)}", Colors.RED)
            return False, {}
    
    def run_all_tests(self):
        """Execute all test scenarios"""
        self.log("\n" + "="*70, Colors.BLUE)
        self.log("DocuSite Backend API Test Suite", Colors.BLUE)
        self.log("="*70 + "\n", Colors.BLUE)
        
        # Test 1: Root endpoint
        self.test("Root endpoint", "GET", "/", 200)
        
        # Test 2: Create valid lead
        self.log("\n--- PUBLIC LEAD CREATION TESTS ---", Colors.BLUE)
        lead_data = {
            "name": f"Test User {int(time.time())}",
            "email": f"test{int(time.time())}@example.com",
            "company": "Test Company",
            "role": "Arquitecto/a",
            "team_size": "2–5",
            "phone": "+34 600 000 000",
            "message": "This is a test lead submission",
            "language": "es",
            "consent": True,
            "plan_interest": "pack10",
            "utm": {},
            "website": ""  # honeypot empty
        }
        success, response = self.test(
            "Create valid lead",
            "POST",
            "/leads",
            201,
            data=lead_data
        )
        if success and 'id' in response:
            self.created_lead_ids.append(response['id'])
            self.log(f"    Lead ID: {response['id']}", Colors.GREEN)
        
        # Test 3: Honeypot - lead with website field filled (should return 201 but NOT store)
        honeypot_data = lead_data.copy()
        honeypot_data['email'] = f"bot{int(time.time())}@example.com"
        honeypot_data['website'] = "http://spam.com"  # Bot fills this
        
        # Get current total before honeypot
        admin_headers = {"X-Admin-Token": ADMIN_TOKEN}
        _, stats_before = self.test("Get stats before honeypot", "GET", "/admin/stats", 200, headers=admin_headers)
        total_before = stats_before.get('total', 0)
        
        success, honeypot_response = self.test(
            "Honeypot test - website field filled",
            "POST",
            "/leads",
            201,
            data=honeypot_data
        )
        
        # Verify honeypot lead was NOT stored
        time.sleep(0.5)
        _, stats_after = self.test("Get stats after honeypot", "GET", "/admin/stats", 200, headers=admin_headers)
        total_after = stats_after.get('total', 0)
        
        if total_after == total_before:
            self.tests_passed += 1
            self.log("    ✅ Honeypot working - lead NOT stored", Colors.GREEN)
        else:
            self.tests_failed += 1
            self.log(f"    ❌ Honeypot FAILED - lead was stored (before: {total_before}, after: {total_after})", Colors.RED)
        self.tests_run += 1
        
        # Test 4: Invalid lead - missing required fields
        invalid_data = {"name": "Test"}  # missing email and consent
        self.test(
            "Create lead - missing required fields",
            "POST",
            "/leads",
            422,
            data=invalid_data
        )
        
        # Test 5: Invalid email format
        invalid_email_data = lead_data.copy()
        invalid_email_data['email'] = "not-an-email"
        self.test(
            "Create lead - invalid email format",
            "POST",
            "/leads",
            422,
            data=invalid_email_data
        )
        
        # ADMIN AUTHENTICATION TESTS
        self.log("\n--- ADMIN AUTHENTICATION TESTS ---", Colors.BLUE)
        
        # Test 6: Admin verify without token
        self.test(
            "Admin verify - no token",
            "GET",
            "/admin/verify",
            401
        )
        
        # Test 7: Admin verify with wrong token
        wrong_headers = {"X-Admin-Token": WRONG_TOKEN}
        self.test(
            "Admin verify - wrong token",
            "GET",
            "/admin/verify",
            401,
            headers=wrong_headers
        )
        
        # Test 8: Admin verify with correct token
        self.test(
            "Admin verify - correct token",
            "GET",
            "/admin/verify",
            200,
            headers=admin_headers
        )
        
        # ADMIN STATS TESTS
        self.log("\n--- ADMIN STATS TESTS ---", Colors.BLUE)
        
        # Test 9: Get stats without token
        self.test(
            "Get stats - no token",
            "GET",
            "/admin/stats",
            401
        )
        
        # Test 10: Get stats with correct token
        success, stats = self.test(
            "Get stats - with token",
            "GET",
            "/admin/stats",
            200,
            headers=admin_headers
        )
        if success:
            required_fields = ['total', 'new', 'contacted', 'won', 'lost', 'last_7_days']
            missing = [f for f in required_fields if f not in stats]
            if not missing:
                self.log(f"    Stats: {stats}", Colors.GREEN)
            else:
                self.log(f"    ⚠️  Missing fields: {missing}", Colors.YELLOW)
        
        # ADMIN LEADS LIST TESTS
        self.log("\n--- ADMIN LEADS LIST TESTS ---", Colors.BLUE)
        
        # Test 11: List all leads without token
        self.test(
            "List leads - no token",
            "GET",
            "/admin/leads",
            401
        )
        
        # Test 12: List all leads with token
        success, leads = self.test(
            "List all leads - with token",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers
        )
        if success:
            self.log(f"    Total leads: {len(leads)}", Colors.GREEN)
        
        # Test 13: Search leads by name
        if self.created_lead_ids:
            self.test(
                "Search leads - by name",
                "GET",
                "/admin/leads",
                200,
                headers=admin_headers,
                params={"search": "Test User"}
            )
        
        # Test 14: Search leads by email
        self.test(
            "Search leads - by email",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"search": "test"}
        )
        
        # Test 15: Filter leads by status
        self.test(
            "Filter leads - status=new",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"status": "new"}
        )
        
        # Test 16: Filter leads by status=contacted
        self.test(
            "Filter leads - status=contacted",
            "GET",
            "/admin/leads",
            200,
            headers=admin_headers,
            params={"status": "contacted"}
        )
        
        # ADMIN SINGLE LEAD TESTS
        if self.created_lead_ids:
            lead_id = self.created_lead_ids[0]
            self.log("\n--- ADMIN SINGLE LEAD CRUD TESTS ---", Colors.BLUE)
            
            # Test 17: Get single lead without token
            self.test(
                "Get single lead - no token",
                "GET",
                f"/admin/leads/{lead_id}",
                401
            )
            
            # Test 18: Get single lead with token
            success, lead = self.test(
                "Get single lead - with token",
                "GET",
                f"/admin/leads/{lead_id}",
                200,
                headers=admin_headers
            )
            if success:
                self.log(f"    Lead: {lead.get('name')} ({lead.get('email')})", Colors.GREEN)
            
            # Test 19: Update lead status
            update_data = {
                "status": "contacted",
                "notes": "Test note from automated test"
            }
            success, updated = self.test(
                "Update lead - status and notes",
                "PATCH",
                f"/admin/leads/{lead_id}",
                200,
                headers=admin_headers,
                data=update_data
            )
            if success:
                if updated.get('status') == 'contacted':
                    self.log(f"    Status updated to: {updated.get('status')}", Colors.GREEN)
                else:
                    self.log(f"    ⚠️  Status not updated correctly", Colors.YELLOW)
            
            # Test 20: Update lead with invalid status
            invalid_update = {"status": "invalid_status"}
            self.test(
                "Update lead - invalid status",
                "PATCH",
                f"/admin/leads/{lead_id}",
                400,
                headers=admin_headers,
                data=invalid_update
            )
            
            # Test 21: Get non-existent lead
            self.test(
                "Get non-existent lead",
                "GET",
                "/admin/leads/non-existent-id-12345",
                404,
                headers=admin_headers
            )
        
        # ADMIN EXPORT TEST
        self.log("\n--- ADMIN EXPORT TEST ---", Colors.BLUE)
        
        # Test 22: Export CSV without token
        self.test(
            "Export CSV - no token",
            "GET",
            "/admin/leads/export",
            401
        )
        
        # Test 23: Export CSV with token
        try:
            url = f"{BASE_URL}/admin/leads/export"
            response = self.session.get(url, headers=admin_headers, timeout=10)
            self.tests_run += 1
            if response.status_code == 200 and 'text/csv' in response.headers.get('Content-Type', ''):
                self.tests_passed += 1
                self.log(f"\n{Colors.BLUE}[{self.tests_run}] Testing: Export CSV - with token{Colors.RESET}")
                self.log(f"    ✅ PASS - CSV export successful", Colors.GREEN)
                self.log(f"    Content-Type: {response.headers.get('Content-Type')}", Colors.GREEN)
                self.log(f"    Size: {len(response.content)} bytes", Colors.GREEN)
            else:
                self.tests_failed += 1
                self.log(f"\n{Colors.BLUE}[{self.tests_run}] Testing: Export CSV - with token{Colors.RESET}")
                self.log(f"    ❌ FAIL - Expected 200 with CSV, got {response.status_code}", Colors.RED)
        except Exception as e:
            self.tests_failed += 1
            self.tests_run += 1
            self.log(f"\n{Colors.BLUE}[{self.tests_run}] Testing: Export CSV - with token{Colors.RESET}")
            self.log(f"    ❌ FAIL - Exception: {str(e)}", Colors.RED)
        
        # CLEANUP - Delete test leads
        if self.created_lead_ids:
            self.log("\n--- CLEANUP: DELETE TEST LEADS ---", Colors.BLUE)
            for lead_id in self.created_lead_ids:
                success, _ = self.test(
                    f"Delete lead {lead_id}",
                    "DELETE",
                    f"/admin/leads/{lead_id}",
                    200,
                    headers=admin_headers
                )
        
        # Test 24: Delete non-existent lead
        self.test(
            "Delete non-existent lead",
            "DELETE",
            "/admin/leads/non-existent-id-12345",
            404,
            headers=admin_headers
        )
        
        # FINAL REPORT
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        self.log("\n" + "="*70, Colors.BLUE)
        self.log("TEST SUMMARY", Colors.BLUE)
        self.log("="*70, Colors.BLUE)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        self.log(f"\nTotal Tests: {self.tests_run}", Colors.BLUE)
        self.log(f"Passed: {self.tests_passed}", Colors.GREEN)
        self.log(f"Failed: {self.tests_failed}", Colors.RED)
        self.log(f"Success Rate: {success_rate:.1f}%", 
                Colors.GREEN if success_rate >= 90 else Colors.YELLOW if success_rate >= 70 else Colors.RED)
        
        if self.tests_failed == 0:
            self.log("\n🎉 All tests passed!", Colors.GREEN)
            return 0
        else:
            self.log(f"\n⚠️  {self.tests_failed} test(s) failed", Colors.RED)
            return 1

def main():
    tester = DocuSiteAPITester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
