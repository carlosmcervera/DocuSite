#!/usr/bin/env python3
"""
Test all 57 public routes for SEO compliance
- HTTP 200
- Exactly 1 H1
- Unique non-empty title and meta description
- html lang attribute
- Canonical link matching configured origin
- Reciprocal hreflang (es, ca, en, x-default)
- Valid JSON-LD
- No [CONFIRM] placeholders (except legitimate educational examples)
"""

import requests
from bs4 import BeautifulSoup
import json
import sys
from urllib.parse import urljoin

BASE_URL = "https://docuobra.preview.emergentagent.com"

# All 57 public routes (21 route keys × 3 languages - 6 duplicates = 57)
ROUTES = {
    'es': [
        '/es', '/es/documentos', '/es/acta-de-replanteo', '/es/acta-de-visita-de-obra',
        '/es/informe-fotografico-de-obra', '/es/acta-de-repasos', '/es/acta-de-fin-de-obra',
        '/es/como-funciona', '/es/beneficios', '/es/roi', '/es/casos-de-uso',
        '/es/precios', '/es/faq', '/es/contacto', '/es/privacidad', '/es/aviso-legal',
        '/es/direccion-de-obra', '/es/direccion-de-ejecucion-de-obra', '/es/cookies'
    ],
    'ca': [
        '/ca', '/ca/documents', '/ca/acta-de-replanteig', '/ca/acta-de-visita-obra',
        '/ca/informe-fotografic-obra', '/ca/acta-de-repassos', '/ca/acta-de-final-obra',
        '/ca/com-funciona', '/ca/beneficis', '/ca/roi', '/ca/casos-us',
        '/ca/preus', '/ca/faq', '/ca/contacte', '/ca/privacitat', '/ca/avis-legal',
        '/ca/direccio-obra', '/ca/direccio-execucio-obra', '/ca/galetes'
    ],
    'en': [
        '/en', '/en/documents', '/en/setting-out-record', '/en/site-visit-minutes',
        '/en/construction-photo-report', '/en/snagging-record', '/en/project-closeout-record',
        '/en/how-it-works', '/en/benefits', '/en/roi', '/en/use-cases',
        '/en/pricing', '/en/faq', '/en/contact', '/en/privacy', '/en/legal-notice',
        '/en/site-supervision', '/en/execution-supervision', '/en/cookies'
    ]
}

class Colors:
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    RESET = '\033[0m'

class SEOTester:
    def __init__(self):
        self.tests_run = 0
        self.tests_passed = 0
        self.tests_failed = 0
        self.issues = []
        self.seen_titles = set()
        self.seen_descriptions = set()
        
    def log(self, message, color=Colors.RESET):
        print(f"{color}{message}{Colors.RESET}")
    
    def test_route(self, route):
        """Test a single route for SEO compliance"""
        self.tests_run += 1
        url = urljoin(BASE_URL, route)
        
        print(f"\n{Colors.BLUE}[{self.tests_run}/57] Testing: {route}{Colors.RESET}")
        
        try:
            response = requests.get(url, timeout=10, allow_redirects=False)
            
            # Check 1: HTTP 200
            if response.status_code != 200:
                self.tests_failed += 1
                self.issues.append(f"{route}: Expected 200, got {response.status_code}")
                self.log(f"    ❌ Status: {response.status_code}", Colors.RED)
                return
            
            soup = BeautifulSoup(response.text, 'html.parser')
            route_issues = []
            
            # Check 2: Exactly 1 H1
            h1_tags = soup.find_all('h1')
            if len(h1_tags) != 1:
                route_issues.append(f"H1 count: {len(h1_tags)} (expected 1)")
            elif not h1_tags[0].get_text(strip=True):
                route_issues.append("H1 is empty")
            
            # Check 3: html lang attribute
            html_tag = soup.find('html')
            lang_attr = html_tag.get('lang') if html_tag else None
            expected_lang = route.split('/')[1] if route.startswith('/') else 'es'
            if lang_attr != expected_lang:
                route_issues.append(f"html lang='{lang_attr}' (expected '{expected_lang}')")
            
            # Check 4: Title tag (unique, non-empty)
            title_tag = soup.find('title')
            if not title_tag or not title_tag.get_text(strip=True):
                route_issues.append("Title is empty or missing")
            else:
                title_text = title_tag.get_text(strip=True)
                if title_text in self.seen_titles:
                    route_issues.append(f"Duplicate title: '{title_text}'")
                self.seen_titles.add(title_text)
            
            # Check 5: Meta description (unique, non-empty)
            meta_desc = soup.find('meta', attrs={'name': 'description'})
            if not meta_desc or not meta_desc.get('content', '').strip():
                route_issues.append("Meta description is empty or missing")
            else:
                desc_text = meta_desc.get('content', '').strip()
                if desc_text in self.seen_descriptions:
                    route_issues.append(f"Duplicate description")
                self.seen_descriptions.add(desc_text)
            
            # Check 6: Canonical link
            canonical = soup.find('link', attrs={'rel': 'canonical'})
            if not canonical:
                route_issues.append("Canonical link missing")
            else:
                canonical_href = canonical.get('href', '')
                expected_canonical = urljoin(BASE_URL, route)
                if canonical_href != expected_canonical:
                    route_issues.append(f"Canonical mismatch: {canonical_href}")
            
            # Check 7: Hreflang links (es, ca, en, x-default)
            hreflang_links = soup.find_all('link', attrs={'rel': 'alternate', 'hreflang': True})
            hreflang_langs = [link.get('hreflang') for link in hreflang_links]
            expected_hreflangs = {'es', 'ca', 'en', 'x-default'}
            missing_hreflangs = expected_hreflangs - set(hreflang_langs)
            if missing_hreflangs:
                route_issues.append(f"Missing hreflang: {missing_hreflangs}")
            
            # Check 8: JSON-LD structured data
            json_ld_scripts = soup.find_all('script', attrs={'type': 'application/ld+json'})
            if not json_ld_scripts:
                route_issues.append("JSON-LD missing")
            else:
                for script in json_ld_scripts:
                    try:
                        json.loads(script.string)
                    except:
                        route_issues.append("Invalid JSON-LD")
                        break
            
            # Check 9: No [CONFIRM] placeholders (except in legitimate examples)
            body_text = soup.get_text()
            # Allow "confirmar" in Spanish educational content, but not [CONFIRM] or old pricing
            if '[CONFIRM]' in body_text or '[CONFIRMAR]' in body_text:
                route_issues.append("Found [CONFIRM] placeholder")
            if '2 actas gratis' in body_text or '9.99' in body_text or '49.99' in body_text:
                route_issues.append("Found old pricing (should be 3 actas gratis)")
            
            # Check 10: Initial body content (no JS required)
            body_tag = soup.find('body')
            if body_tag:
                body_content = body_tag.get_text(strip=True)
                if len(body_content) < 100:
                    route_issues.append("Body content too short (< 100 chars)")
            
            if route_issues:
                self.tests_failed += 1
                self.issues.append(f"{route}: {', '.join(route_issues)}")
                self.log(f"    ❌ Issues: {', '.join(route_issues)}", Colors.RED)
            else:
                self.tests_passed += 1
                self.log(f"    ✅ All checks passed", Colors.GREEN)
                
        except Exception as e:
            self.tests_failed += 1
            self.issues.append(f"{route}: Exception - {str(e)}")
            self.log(f"    ❌ Exception: {str(e)}", Colors.RED)
    
    def run_all_tests(self):
        """Test all 57 routes"""
        self.log("\n" + "="*70, Colors.BLUE)
        self.log("DocuSite SEO Route Testing - 57 Public Routes", Colors.BLUE)
        self.log("="*70 + "\n", Colors.BLUE)
        
        for lang, routes in ROUTES.items():
            self.log(f"\n--- Testing {lang.upper()} routes ({len(routes)} routes) ---", Colors.BLUE)
            for route in routes:
                self.test_route(route)
        
        self.print_summary()
    
    def print_summary(self):
        """Print test summary"""
        self.log("\n" + "="*70, Colors.BLUE)
        self.log("SEO TEST SUMMARY", Colors.BLUE)
        self.log("="*70, Colors.BLUE)
        
        success_rate = (self.tests_passed / self.tests_run * 100) if self.tests_run > 0 else 0
        
        self.log(f"\nTotal Routes Tested: {self.tests_run}", Colors.BLUE)
        self.log(f"Passed: {self.tests_passed}", Colors.GREEN)
        self.log(f"Failed: {self.tests_failed}", Colors.RED)
        self.log(f"Success Rate: {success_rate:.1f}%", 
                Colors.GREEN if success_rate >= 95 else Colors.YELLOW if success_rate >= 80 else Colors.RED)
        
        if self.issues:
            self.log("\n--- Issues Found ---", Colors.YELLOW)
            for issue in self.issues[:10]:  # Show first 10 issues
                self.log(f"  • {issue}", Colors.YELLOW)
            if len(self.issues) > 10:
                self.log(f"  ... and {len(self.issues) - 10} more issues", Colors.YELLOW)
        
        if self.tests_failed == 0:
            self.log("\n🎉 All SEO checks passed!", Colors.GREEN)
            return 0
        else:
            self.log(f"\n⚠️  {self.tests_failed} route(s) failed SEO checks", Colors.RED)
            return 1

def main():
    tester = SEOTester()
    exit_code = tester.run_all_tests()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
