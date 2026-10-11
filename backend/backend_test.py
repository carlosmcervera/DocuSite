#!/usr/bin/env python3
"""
DocuSite Backend API Test Suite
Tests all public and admin endpoints with proper validation
"""
import requests
import sys
import os
import time
from datetime import datetime
from dotenv import dotenv_values

# Read configuration from .env files
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

class DocuSiteAPITester:
    def __init__(self):
        self.base_url = BACKEND_URL
        self.admin_token = ADMIN_TOKEN
        self.tests_run = 0
        self.tests_passed = 0
        self.test_lead_ids = []
        
    def log(self, message, color=Colors.BLUE):
        print(f"{color}{message}{Colors.END}")
        
    def test(self, name, method, endpoint, expected_status, data=None, headers=None, params=None):
        """Run a single API test"""
        url = f"{self.base_url}/{endpoint}"
        req_headers = headers or {}
        req_headers.setdefault('Content-Type', 'application/json')
        
        self.tests_run += 1
        self.log(f"\nTest {self.tests_run}: {name}")
        
        try:
            if method == 'GET':
                response = requests.get(url, headers=req_headers, params=params, timeout=10)
            elif method == 'POST':
                response = requests.post(url, json=data, headers=req_headers, timeout=10)
            elif method == 'PATCH':
                response = requests.patch(url, json=data, headers=req_headers, timeout=10)
            elif method == 'DELETE':
                response = requests.delete(url, headers=req_headers, timeout=10)
            else:
                raise ValueError(f"Unsupported method: {method}")
            
            success = response.status_code == expected_status
            
            if success:
                self.tests_passed += 1
                self.log(f"PASSED - Status: {response.status_code}", Colors.GREEN)
                try:
                    return True, response.json()
                except ValueError:
                    return True, {}
            else:
                self.log(f"FAILED - Expected {expected_status}, got {response.status_code}", Colors.RED)
                try:
                    self.log(f"   Response: {response.json()}", Colors.YELLOW)
                except ValueError:
                    self.log(f"   Response: {response.text[:200]}", Colors.YELLOW)
                return False, {}
                
        except Exception as e:
            self.log(f"FAILED - Error: {str(e)}", Colors.RED)
            return False, {}
    
    def run_all_tests(self):
        """Execute all test suites"""
        self.log("=" * 60, Colors.BLUE)
        self.log("DocuSite Backend API Test Suite", Colors.BLUE)
        self.log("=" * 60, Colors.BLUE)
        
        # Test 1: Root endpoint
        self.test("Root endpoint", "GET", "", 200)
        
        # Test 2: Admin auth - invalid token
        self.test("Admin verify - invalid token", "GET", "admin/verify", 401, 
                 headers={"X-Admin-Token": "invalid"})
        
        # Test 3: Admin auth - missing token
        self.test("Admin verify - missing token", "GET", "admin/verify", 401)
        
        # Test 4: Admin auth - valid token
        success, _ = self.test("Admin verify - valid token", "GET", "admin/verify", 200,
                              headers={"X-Admin-Token": self.admin_token})
        
        if not success:
            self.log("\nAdmin authentication failed. Cannot proceed with admin tests.", Colors.RED)
            return False
        
        # Test 5: Create lead - missing consent
        self.test("Create lead - missing consent", "POST", "leads", 422,
                 data={"name": "Test User", "email": "test@example.com", "consent": False})
        
        # Test 6: Create lead - empty name
        self.test("Create lead - empty name", "POST", "leads", 422,
                 data={"name": "  ", "email": "test@example.com", "consent": True})
        
        # Test 7: Create lead - invalid email
        self.test("Create lead - invalid email", "POST", "leads", 422,
                 data={"name": "Test User", "email": "invalid-email", "consent": True})
        
        # Test 8: Create valid lead with free offer
        timestamp = datetime.now().strftime("%H%M%S")
        success, lead1 = self.test("Create lead - free offer", "POST", "leads", 201,
                                   data={
                                       "name": f"TEST_User_{timestamp}",
                                       "email": f"TEST_{timestamp}@example.com",
                                       "company": "TEST_Company",
                                       "consent": True,
                                       "language": "es",
                                       "plan_interest": "free_3_docs",
                                       "utm": {"offer": "free_3_docs", "page": "/es"}
                                   })
        if success and lead1.get('id'):
            self.test_lead_ids.append(lead1['id'])
            self.log(f"   Created lead ID: {lead1['id']}", Colors.GREEN)
        
        # Test 9: Create lead with document interest
        timestamp2 = datetime.now().strftime("%H%M%S") + "2"
        success, lead2 = self.test("Create lead - with document interest", "POST", "leads", 201,
                                   data={
                                       "name": f"TEST_User_{timestamp2}",
                                       "email": f"TEST_{timestamp2}@example.com",
                                       "consent": True,
                                       "language": "en",
                                       "plan_interest": "free_3_docs",
                                       "utm": {"offer": "free_3_docs", "document": "visit", "page": "/en/demo"}
                                   })
        if success and lead2.get('id'):
            self.test_lead_ids.append(lead2['id'])
        
        # Test 10: Create lead with paid plan
        timestamp3 = datetime.now().strftime("%H%M%S") + "3"
        success, lead3 = self.test("Create lead - paid plan", "POST", "leads", 201,
                                   data={
                                       "name": f"TEST_User_{timestamp3}",
                                       "email": f"TEST_{timestamp3}@example.com",
                                       "company": "TEST_Paid_Company",
                                       "role": "Project Manager",
                                       "team_size": "5-10",
                                       "phone": "+34 600 000 000",
                                       "message": "Interested in pack10",
                                       "consent": True,
                                       "language": "es",
                                       "plan_interest": "pack10",
                                       "utm": {"page": "/es/demo"}
                                   })
        if success and lead3.get('id'):
            self.test_lead_ids.append(lead3['id'])
        
        # Test 11: Create lead from contact form (general enquiry)
        timestamp4 = datetime.now().strftime("%H%M%S") + "4"
        success, lead4 = self.test("Create lead - contact form general enquiry", "POST", "leads", 201,
                                   data={
                                       "name": f"TEST_Contact_{timestamp4}",
                                       "email": f"TEST_contact_{timestamp4}@example.com",
                                       "message": "General question about the app",
                                       "consent": True,
                                       "language": "es",
                                       "plan_interest": None,
                                       "utm": {"intent": "contact", "page": "/es/contacto"}
                                   },
                                   headers={"X-Forwarded-For": "192.0.2.4"})
        if success and lead4.get('id'):
            self.test_lead_ids.append(lead4['id'])
            # Verify no offer field in utm
            if lead4.get('utm', {}).get('offer'):
                self.log("   WARNING: Contact form should not have utm.offer", Colors.YELLOW)
            else:
                self.log("   Correct: No utm.offer for contact form", Colors.GREEN)
        
        # Test 12: Create lead from contact with document context
        timestamp5 = datetime.now().strftime("%H%M%S") + "5"
        success, lead5 = self.test("Create lead - contact with document context", "POST", "leads", 201,
                                   data={
                                       "name": f"TEST_Contact_{timestamp5}",
                                       "email": f"TEST_contact_{timestamp5}@example.com",
                                       "message": "Question about visit document",
                                       "consent": True,
                                       "language": "en",
                                       "plan_interest": None,
                                       "utm": {"intent": "contact", "document": "visit", "page": "/en/contact"}
                                   },
                                   headers={"X-Forwarded-For": "192.0.2.5"})
        if success and lead5.get('id'):
            self.test_lead_ids.append(lead5['id'])
            if lead5.get('utm', {}).get('document') == 'visit':
                self.log("   Correct: Document context preserved", Colors.GREEN)
        
        # Test 13: Create lead from contact with plan context
        timestamp6 = datetime.now().strftime("%H%M%S") + "6"
        success, lead6 = self.test("Create lead - contact with plan context", "POST", "leads", 201,
                                   data={
                                       "name": f"TEST_Contact_{timestamp6}",
                                       "email": f"TEST_contact_{timestamp6}@example.com",
                                       "message": "Question about pack10",
                                       "consent": True,
                                       "language": "es",
                                       "plan_interest": "pack10",
                                       "utm": {"intent": "contact", "page": "/es/contacto"}
                                   },
                                   headers={"X-Forwarded-For": "192.0.2.6"})
        if success and lead6.get('id'):
            self.test_lead_ids.append(lead6['id'])
            if lead6.get('plan_interest') == 'pack10':
                self.log("   Correct: Plan context preserved", Colors.GREEN)
            # Verify utm.intent is contact and no offer
            if lead6.get('utm', {}).get('intent') == 'contact':
                self.log("   Correct: utm.intent=contact for contact form", Colors.GREEN)
            if lead6.get('utm', {}).get('offer'):
                self.log("   WARNING: Contact form should not have utm.offer", Colors.YELLOW)
        
        # Test 14: Honeypot - should accept but not store
        success, honeypot = self.test("Create lead - honeypot triggered", "POST", "leads", 201,
                                      data={
                                          "name": "Bot User",
                                          "email": "bot@example.com",
                                          "consent": True,
                                          "website": "http://spam.com"
                                      })
        # Don't add honeypot to test_lead_ids as it shouldn't be stored
        
        # Test 15: Admin stats
        success, stats = self.test("Admin stats", "GET", "admin/stats", 200,
                                   headers={"X-Admin-Token": self.admin_token})
        if success:
            self.log(f"   Total leads: {stats.get('total', 0)}, New: {stats.get('new', 0)}", Colors.GREEN)
        
        # Test 16: List all leads
        success, leads = self.test("Admin list leads", "GET", "admin/leads", 200,
                                   headers={"X-Admin-Token": self.admin_token})
        if success:
            self.log(f"   Retrieved {len(leads)} leads", Colors.GREEN)
        
        # Test 17: Search leads
        self.test("Admin search leads", "GET", "admin/leads", 200,
                 headers={"X-Admin-Token": self.admin_token},
                 params={"search": "TEST_"})
        
        # Test 18: Filter leads by status
        self.test("Admin filter leads by status", "GET", "admin/leads", 200,
                 headers={"X-Admin-Token": self.admin_token},
                 params={"status": "new"})
        
        # Test 19: Get specific lead
        if self.test_lead_ids:
            lead_id = self.test_lead_ids[0]
            success, lead_detail = self.test("Admin get lead detail", "GET", f"admin/leads/{lead_id}", 200,
                                            headers={"X-Admin-Token": self.admin_token})
            if success:
                self.log(f"   Lead name: {lead_detail.get('name')}, Plan: {lead_detail.get('plan_interest')}", Colors.GREEN)
        
        # Test 20: Update lead status
        if self.test_lead_ids:
            lead_id = self.test_lead_ids[0]
            success, updated = self.test("Admin update lead status", "PATCH", f"admin/leads/{lead_id}", 200,
                                        data={"status": "contacted", "notes": "Test note from automated test"},
                                        headers={"X-Admin-Token": self.admin_token})
            if success:
                self.log(f"   Updated status: {updated.get('status')}", Colors.GREEN)
        
        # Test 21: Update lead - invalid status
        if self.test_lead_ids:
            lead_id = self.test_lead_ids[0]
            self.test("Admin update lead - invalid status", "PATCH", f"admin/leads/{lead_id}", 400,
                     data={"status": "invalid_status"},
                     headers={"X-Admin-Token": self.admin_token})
        
        # Test 22: Get non-existent lead
        self.test("Admin get non-existent lead", "GET", "admin/leads/non-existent-id", 404,
                 headers={"X-Admin-Token": self.admin_token})
        
        # Test 23: CSV export
        self.log("\nTest 23: Admin CSV export")
        try:
            response = requests.get(f"{self.base_url}/admin/leads/export",
                                   headers={"X-Admin-Token": self.admin_token},
                                   timeout=10)
            if response.status_code == 200 and 'text/csv' in response.headers.get('Content-Type', ''):
                self.tests_passed += 1
                self.log("PASSED - CSV export successful", Colors.GREEN)
                # Check CSV has required columns
                csv_content = response.text
                if all(col in csv_content for col in ['id', 'name', 'email', 'plan_interest', 'offer', 'document_interest', 'landing_page']):
                    self.log("   CSV contains all required columns", Colors.GREEN)
                else:
                    self.log("   WARNING: CSV missing some required columns", Colors.YELLOW)
            else:
                self.log(f"FAILED - Expected 200 with CSV, got {response.status_code}", Colors.RED)
        except Exception as e:
            self.log(f"FAILED - Error: {str(e)}", Colors.RED)
        self.tests_run += 1
        
        # Test 24: Admin endpoints without auth
        self.test("Admin stats - no auth", "GET", "admin/stats", 401)
        self.test("Admin list leads - no auth", "GET", "admin/leads", 401)
        
        # Test 25: Delete test leads (cleanup)
        self.log("\nCleaning up test leads...", Colors.BLUE)
        for lead_id in self.test_lead_ids:
            success, _ = self.test(f"Delete test lead {lead_id[:8]}", "DELETE", f"admin/leads/{lead_id}", 200,
                                  headers={"X-Admin-Token": self.admin_token})
        
        # Test 26-31: Rate limiting - isolated test with unique IP
        self.log("\n" + "=" * 60, Colors.BLUE)
        self.log("Rate Limiting Test (Isolated)", Colors.BLUE)
        self.log("=" * 60, Colors.BLUE)
        
        rate_test_ip = "192.0.2.100"  # Reserved test IP
        rate_test_ids = []
        
        # Create 5 leads rapidly - should all succeed
        for i in range(5):
            timestamp_rate = datetime.now().strftime("%H%M%S%f")
            success, lead_rate = self.test(f"Rate limit test {i+1}/5 - should succeed", "POST", "leads", 201,
                                          data={
                                              "name": f"TEST_RateLimit_{timestamp_rate}",
                                              "email": f"TEST_rate_{timestamp_rate}@example.com",
                                              "consent": True,
                                              "language": "es",
                                              "plan_interest": "free_3_docs",
                                              "utm": {"offer": "free_3_docs", "page": "/es"}
                                          },
                                          headers={"X-Forwarded-For": rate_test_ip})
            if success and lead_rate.get('id'):
                rate_test_ids.append(lead_rate['id'])
        
        # 6th submission should be rate limited
        timestamp_rate6 = datetime.now().strftime("%H%M%S%f")
        success_6th, _ = self.test("Rate limit test 6/6 - should be blocked (429)", "POST", "leads", 429,
                                   data={
                                       "name": f"TEST_RateLimit_{timestamp_rate6}",
                                       "email": f"TEST_rate_{timestamp_rate6}@example.com",
                                       "consent": True,
                                       "language": "es",
                                       "plan_interest": "free_3_docs",
                                       "utm": {"offer": "free_3_docs", "page": "/es"}
                                   },
                                   headers={"X-Forwarded-For": rate_test_ip})
        
        if success_6th:
            self.log("   Rate limiting working correctly: 5 allowed, 6th blocked", Colors.GREEN)
        else:
            self.log("   WARNING: Rate limiting may not be working as expected", Colors.YELLOW)
        
        # Clean up rate limit test leads
        self.log("\nCleaning up rate limit test leads...", Colors.BLUE)
        for lead_id in rate_test_ids:
            self.test(f"Delete rate test lead {lead_id[:8]}", "DELETE", f"admin/leads/{lead_id}", 200,
                     headers={"X-Admin-Token": self.admin_token})
        
        return True
    
    def print_summary(self):
        """Print test summary"""
        self.log("\n" + "=" * 60, Colors.BLUE)
        self.log("Test Summary", Colors.BLUE)
        self.log("=" * 60, Colors.BLUE)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        if success_rate == 100:
            color = Colors.GREEN
            status = "ALL TESTS PASSED"
        elif success_rate >= 80:
            color = Colors.YELLOW
            status = "MOST TESTS PASSED"
        else:
            color = Colors.RED
            status = "MANY TESTS FAILED"
        
        self.log(f"\n{status}", color)
        self.log(f"Tests Run: {self.tests_run}", Colors.BLUE)
        self.log(f"Tests Passed: {self.tests_passed}", Colors.GREEN)
        self.log(f"Tests Failed: {self.tests_run - self.tests_passed}", Colors.RED)
        self.log(f"Success Rate: {success_rate:.1f}%", color)
        self.log("=" * 60 + "\n", Colors.BLUE)
        
        return 0 if success_rate == 100 else 1

def main():
    """Main test execution"""
    if not BACKEND_URL or not ADMIN_TOKEN:
        print("\nERROR: Missing required environment variables")
        print(f"BACKEND_URL: {'[set]' if BACKEND_URL else '[missing]'}")
        print(f"ADMIN_TOKEN: {'[set]' if ADMIN_TOKEN else '[missing]'}")
        return 1
    
    print(f"\nTesting backend at: {BACKEND_URL}")
    print("Admin token loaded from environment\n")
    
    tester = DocuSiteAPITester()
    tester.run_all_tests()
    return tester.print_summary()

if __name__ == "__main__":
    sys.exit(main())
