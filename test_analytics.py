#!/usr/bin/env python3
"""
Test Analytics Events API
Validates event tracking, validation, and admin analytics panel
"""
import requests
import sys
from dotenv import dotenv_values

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

def test_analytics():
    """Test analytics events API"""
    log("=" * 60, Colors.BLUE)
    log("Analytics Events Test", Colors.BLUE)
    log("=" * 60, Colors.BLUE)
    
    tests_passed = 0
    tests_total = 0
    
    # Test 1: Valid event - calculator use
    tests_total += 1
    log("\nTest 1: Post valid calculator event", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "calculator_use",
                "section": "pricing",
                "path": "/es",
                "language": "es",
                "value": 10
            },
            timeout=10
        )
        
        if response.status_code == 202:
            log("PASSED - Event recorded", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 202, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 2: Valid event - PDF open
    tests_total += 1
    log("\nTest 2: Post PDF open event", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "pdf_open",
                "section": "hero",
                "path": "/es",
                "language": "es",
                "value": 0
            },
            timeout=10
        )
        
        if response.status_code == 202:
            log("PASSED - Event recorded", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 202, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 3: Valid event - scroll depth
    tests_total += 1
    log("\nTest 3: Post scroll depth event", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "scroll_depth",
                "section": "page",
                "path": "/es",
                "language": "es",
                "value": 75
            },
            timeout=10
        )
        
        if response.status_code == 202:
            log("PASSED - Event recorded", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 202, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 4: Invalid event - unknown name
    tests_total += 1
    log("\nTest 4: Reject invalid event name", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "invalid_event",
                "section": "test",
                "path": "/es",
                "language": "es",
                "value": 0
            },
            timeout=10
        )
        
        if response.status_code == 422:
            log("PASSED - Invalid event rejected", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 422, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 5: Invalid event - malformed path
    tests_total += 1
    log("\nTest 5: Reject malformed path", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "cta_click",
                "section": "hero",
                "path": "no-leading-slash",
                "language": "es",
                "value": 0
            },
            timeout=10
        )
        
        if response.status_code == 422:
            log("PASSED - Malformed path rejected", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 422, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 6: Invalid event - extra fields (should be rejected by extra='forbid')
    tests_total += 1
    log("\nTest 6: Reject event with extra fields", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "cta_click",
                "section": "hero",
                "path": "/es",
                "language": "es",
                "value": 0,
                "user_email": "test@example.com",  # Extra field
                "client_ip": "192.168.1.1"  # Extra field
            },
            timeout=10
        )
        
        if response.status_code == 422:
            log("PASSED - Extra fields rejected", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 422, got {response.status_code}", Colors.RED)
            log(f"   Response: {response.text}", Colors.YELLOW)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 7: Admin path should not be tracked
    tests_total += 1
    log("\nTest 7: Admin path events not recorded", Colors.BLUE)
    try:
        response = requests.post(
            f"{BACKEND_URL}/events",
            json={
                "name": "cta_click",
                "section": "admin",
                "path": "/admin",
                "language": "es",
                "value": 0
            },
            timeout=10
        )
        
        if response.status_code == 202:
            data = response.json()
            if data.get('recorded') == False:
                log("PASSED - Admin events not recorded", Colors.GREEN)
                tests_passed += 1
            else:
                log("FAILED - Admin event was recorded", Colors.RED)
        else:
            log(f"FAILED - Expected 202, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 8: Get analytics summary (admin)
    tests_total += 1
    log("\nTest 8: Get analytics summary", Colors.BLUE)
    try:
        response = requests.get(
            f"{BACKEND_URL}/admin/analytics",
            headers={"X-Admin-Token": ADMIN_TOKEN},
            timeout=10
        )
        
        if response.status_code == 200:
            data = response.json()
            log(f"PASSED - Retrieved {len(data)} event summaries", Colors.GREEN)
            if len(data) > 0:
                log(f"   Sample: {data[0]}", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 200, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
    # Test 9: Analytics without auth
    tests_total += 1
    log("\nTest 9: Analytics requires authentication", Colors.BLUE)
    try:
        response = requests.get(
            f"{BACKEND_URL}/admin/analytics",
            timeout=10
        )
        
        if response.status_code == 401:
            log("PASSED - Unauthorized access rejected", Colors.GREEN)
            tests_passed += 1
        else:
            log(f"FAILED - Expected 401, got {response.status_code}", Colors.RED)
    except Exception as e:
        log(f"FAILED - Error: {str(e)}", Colors.RED)
    
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
    sys.exit(test_analytics())
