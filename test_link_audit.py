#!/usr/bin/env python3
"""
Audit all 57 pages for:
- Broken internal links and anchors
- Missing images, OG cards, fonts
- OG tag validation after language change
- Canonical correctness
"""

import requests
from bs4 import BeautifulSoup
import json
import sys
from urllib.parse import urljoin, urlparse
from collections import defaultdict

BASE_URL = "https://docuobra.preview.emergentagent.com"

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

class LinkAuditor:
    def __init__(self):
        self.issues = []
        self.checked_urls = set()
        self.broken_links = []
        self.broken_anchors = []
        self.missing_images = []
        self.og_issues = []
        self.canonical_issues = []
        self.all_routes = []
        for routes in ROUTES.values():
            self.all_routes.extend(routes)
        
    def log(self, message, color=Colors.RESET):
        print(f"{color}{message}{Colors.RESET}")
    
    def check_url_exists(self, url):
        """Check if URL returns 200"""
        if url in self.checked_urls:
            return True
        
        try:
            response = requests.head(url, timeout=5, allow_redirects=True)
            exists = response.status_code == 200
            self.checked_urls.add(url)
            return exists
        except:
            return False
    
    def audit_page(self, route):
        """Audit a single page"""
        url = urljoin(BASE_URL, route)
        
        try:
            response = requests.get(url, timeout=10)
            if response.status_code != 200:
                self.issues.append(f"{route}: HTTP {response.status_code}")
                return
            
            soup = BeautifulSoup(response.text, 'html.parser')
            page_issues = []
            
            # Check internal links
            for link in soup.find_all('a', href=True):
                href = link.get('href')
                
                # Skip external links, mailto, tel
                if href.startswith(('http://', 'https://', 'mailto:', 'tel:')):
                    if href.startswith(BASE_URL):
                        # Internal absolute link
                        path = href.replace(BASE_URL, '')
                        if '#' in path:
                            base_path, anchor = path.split('#', 1)
                            if base_path and base_path not in self.all_routes:
                                self.broken_links.append(f"{route} → {href} (broken)")
                        elif path and path not in self.all_routes:
                            self.broken_links.append(f"{route} → {href} (broken)")
                    continue
                
                # Check fragment/anchor links
                if href.startswith('#'):
                    anchor_id = href[1:]
                    if anchor_id and not soup.find(id=anchor_id):
                        self.broken_anchors.append(f"{route} → {href} (anchor not found)")
                
                # Check relative internal links
                elif href.startswith('/'):
                    if '#' in href:
                        base_path, anchor = href.split('#', 1)
                        if base_path not in self.all_routes:
                            self.broken_links.append(f"{route} → {href} (broken path)")
                        # Check anchor on target page would require fetching it
                    elif href not in self.all_routes:
                        self.broken_links.append(f"{route} → {href} (broken)")
            
            # Check images
            for img in soup.find_all('img', src=True):
                src = img.get('src')
                if src.startswith('/'):
                    img_url = urljoin(BASE_URL, src)
                    if not self.check_url_exists(img_url):
                        self.missing_images.append(f"{route}: {src}")
            
            # Check OG image
            og_image = soup.find('meta', property='og:image')
            if og_image:
                og_src = og_image.get('content', '')
                if og_src.startswith('/'):
                    og_url = urljoin(BASE_URL, og_src)
                    if not self.check_url_exists(og_url):
                        self.missing_images.append(f"{route}: OG image {og_src}")
            
            # Check OG tags count
            og_titles = soup.find_all('meta', property='og:title')
            if len(og_titles) != 1:
                self.og_issues.append(f"{route}: {len(og_titles)} og:title tags (expected 1)")
            
            og_locale_alternates = soup.find_all('meta', property='og:locale:alternate')
            if len(og_locale_alternates) != 2:
                self.og_issues.append(f"{route}: {len(og_locale_alternates)} og:locale:alternate tags (expected 2)")
            
            # Check canonical
            canonical = soup.find('link', rel='canonical')
            if canonical:
                canonical_href = canonical.get('href', '')
                expected_canonical = urljoin(BASE_URL, route)
                if canonical_href != expected_canonical:
                    self.canonical_issues.append(f"{route}: canonical={canonical_href}, expected={expected_canonical}")
            else:
                self.canonical_issues.append(f"{route}: No canonical link")
                
        except Exception as e:
            self.issues.append(f"{route}: Exception - {str(e)}")
    
    def run_audit(self):
        """Run full audit"""
        self.log("\n" + "="*70, Colors.BLUE)
        self.log("DocuSite Link & Asset Audit - 57 Pages", Colors.BLUE)
        self.log("="*70 + "\n", Colors.BLUE)
        
        total = 0
        for lang, routes in ROUTES.items():
            self.log(f"\n--- Auditing {lang.upper()} routes ({len(routes)} pages) ---", Colors.BLUE)
            for route in routes:
                total += 1
                print(f"[{total}/57] Auditing {route}...", end='\r')
                self.audit_page(route)
        
        print()  # Clear progress line
        self.print_summary()
    
    def print_summary(self):
        """Print audit summary"""
        self.log("\n" + "="*70, Colors.BLUE)
        self.log("LINK & ASSET AUDIT SUMMARY", Colors.BLUE)
        self.log("="*70, Colors.BLUE)
        
        total_issues = len(self.broken_links) + len(self.broken_anchors) + len(self.missing_images) + len(self.og_issues) + len(self.canonical_issues)
        
        if self.broken_links:
            self.log(f"\n❌ Broken Links ({len(self.broken_links)}):", Colors.RED)
            for link in self.broken_links[:10]:
                self.log(f"  • {link}", Colors.YELLOW)
            if len(self.broken_links) > 10:
                self.log(f"  ... and {len(self.broken_links) - 10} more", Colors.YELLOW)
        else:
            self.log("\n✅ No broken links found", Colors.GREEN)
        
        if self.broken_anchors:
            self.log(f"\n❌ Broken Anchors ({len(self.broken_anchors)}):", Colors.RED)
            for anchor in self.broken_anchors[:10]:
                self.log(f"  • {anchor}", Colors.YELLOW)
            if len(self.broken_anchors) > 10:
                self.log(f"  ... and {len(self.broken_anchors) - 10} more", Colors.YELLOW)
        else:
            self.log("\n✅ No broken anchors found", Colors.GREEN)
        
        if self.missing_images:
            self.log(f"\n❌ Missing Images ({len(self.missing_images)}):", Colors.RED)
            for img in self.missing_images[:10]:
                self.log(f"  • {img}", Colors.YELLOW)
            if len(self.missing_images) > 10:
                self.log(f"  ... and {len(self.missing_images) - 10} more", Colors.YELLOW)
        else:
            self.log("\n✅ No missing images found", Colors.GREEN)
        
        if self.og_issues:
            self.log(f"\n❌ OG Tag Issues ({len(self.og_issues)}):", Colors.RED)
            for issue in self.og_issues[:10]:
                self.log(f"  • {issue}", Colors.YELLOW)
            if len(self.og_issues) > 10:
                self.log(f"  ... and {len(self.og_issues) - 10} more", Colors.YELLOW)
        else:
            self.log("\n✅ All OG tags correct", Colors.GREEN)
        
        if self.canonical_issues:
            self.log(f"\n❌ Canonical Issues ({len(self.canonical_issues)}):", Colors.RED)
            for issue in self.canonical_issues[:10]:
                self.log(f"  • {issue}", Colors.YELLOW)
            if len(self.canonical_issues) > 10:
                self.log(f"  ... and {len(self.canonical_issues) - 10} more", Colors.YELLOW)
        else:
            self.log("\n✅ All canonical links correct", Colors.GREEN)
        
        if total_issues == 0:
            self.log("\n🎉 All link and asset checks passed!", Colors.GREEN)
            return 0
        else:
            self.log(f"\n⚠️  {total_issues} total issues found", Colors.RED)
            return 1

def main():
    auditor = LinkAuditor()
    exit_code = auditor.run_audit()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
