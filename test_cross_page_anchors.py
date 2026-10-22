#!/usr/bin/env python3
"""
Enhanced anchor audit that validates cross-page anchor links.
Checks that target anchors actually exist on the destination pages.
"""

import requests
from bs4 import BeautifulSoup
from urllib.parse import urljoin, urlparse
from collections import defaultdict
import sys

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

class AnchorAuditor:
    def __init__(self):
        self.all_routes = []
        for routes in ROUTES.values():
            self.all_routes.extend(routes)
        
        self.page_cache = {}  # Cache fetched pages
        self.same_page_anchors = []
        self.cross_page_anchors = []
        self.broken_same_page = []
        self.broken_cross_page = []
        
    def fetch_page(self, route):
        """Fetch and cache a page"""
        if route in self.page_cache:
            return self.page_cache[route]
        
        url = urljoin(BASE_URL, route)
        try:
            response = requests.get(url, timeout=10)
            if response.status_code == 200:
                soup = BeautifulSoup(response.text, 'html.parser')
                self.page_cache[route] = soup
                return soup
        except Exception as e:
            print(f"❌ Failed to fetch {route}: {e}")
        
        return None
    
    def get_page_anchors(self, soup):
        """Get all anchor IDs on a page"""
        if not soup:
            return set()
        
        anchors = set()
        for element in soup.find_all(id=True):
            anchors.add(element.get('id'))
        
        # Also check for name attributes (older anchor style)
        for element in soup.find_all(attrs={'name': True}):
            anchors.add(element.get('name'))
        
        return anchors
    
    def audit_page_anchors(self, route):
        """Audit all anchor links on a page"""
        soup = self.fetch_page(route)
        if not soup:
            return
        
        # Find all links with anchors
        for link in soup.find_all('a', href=True):
            href = link.get('href')
            
            # Skip external links
            if href.startswith(('http://', 'https://', 'mailto:', 'tel:')):
                if not href.startswith(BASE_URL):
                    continue
                # Convert to relative path
                href = href.replace(BASE_URL, '')
            
            # Check if link has an anchor
            if '#' not in href:
                continue
            
            # Split path and anchor
            if href.startswith('#'):
                # Same-page anchor
                anchor_id = href[1:]
                self.same_page_anchors.append({
                    'source': route,
                    'target': route,
                    'anchor': anchor_id,
                    'href': href
                })
                
                # Check if anchor exists on current page
                page_anchors = self.get_page_anchors(soup)
                if anchor_id and anchor_id not in page_anchors:
                    self.broken_same_page.append({
                        'source': route,
                        'target': route,
                        'anchor': anchor_id,
                        'href': href
                    })
            else:
                # Cross-page anchor
                base_path, anchor_id = href.split('#', 1)
                
                # Normalize path
                if not base_path.startswith('/'):
                    base_path = '/' + base_path
                
                self.cross_page_anchors.append({
                    'source': route,
                    'target': base_path,
                    'anchor': anchor_id,
                    'href': href
                })
                
                # Check if target page exists
                if base_path not in self.all_routes:
                    self.broken_cross_page.append({
                        'source': route,
                        'target': base_path,
                        'anchor': anchor_id,
                        'href': href,
                        'reason': 'Target page not found'
                    })
                    continue
                
                # Fetch target page and check anchor
                target_soup = self.fetch_page(base_path)
                if target_soup:
                    target_anchors = self.get_page_anchors(target_soup)
                    if anchor_id and anchor_id not in target_anchors:
                        self.broken_cross_page.append({
                            'source': route,
                            'target': base_path,
                            'anchor': anchor_id,
                            'href': href,
                            'reason': 'Anchor not found on target page'
                        })
    
    def run_audit(self):
        """Run full anchor audit"""
        print("\n" + "="*70)
        print("DocuSite Cross-Page Anchor Audit - 57 Pages")
        print("="*70 + "\n")
        
        total = 0
        for lang, routes in ROUTES.items():
            print(f"\n--- Auditing {lang.upper()} routes ({len(routes)} pages) ---")
            for route in routes:
                total += 1
                print(f"[{total}/57] Auditing {route}...", end='\r')
                self.audit_page_anchors(route)
        
        print()  # Clear progress line
        self.print_summary()
    
    def print_summary(self):
        """Print audit summary"""
        print("\n" + "="*70)
        print("ANCHOR AUDIT SUMMARY")
        print("="*70)
        
        print(f"\n📊 Statistics:")
        print(f"  • Same-page anchor links: {len(self.same_page_anchors)}")
        print(f"  • Cross-page anchor links: {len(self.cross_page_anchors)}")
        print(f"  • Pages cached: {len(self.page_cache)}")
        
        if self.broken_same_page:
            print(f"\n❌ Broken Same-Page Anchors ({len(self.broken_same_page)}):")
            for item in self.broken_same_page[:10]:
                print(f"  • {item['source']} → {item['href']}")
            if len(self.broken_same_page) > 10:
                print(f"  ... and {len(self.broken_same_page) - 10} more")
        else:
            print("\n✅ All same-page anchors valid")
        
        if self.broken_cross_page:
            print(f"\n❌ Broken Cross-Page Anchors ({len(self.broken_cross_page)}):")
            for item in self.broken_cross_page[:10]:
                print(f"  • {item['source']} → {item['href']}")
                print(f"    Reason: {item['reason']}")
            if len(self.broken_cross_page) > 10:
                print(f"  ... and {len(self.broken_cross_page) - 10} more")
        else:
            print("\n✅ All cross-page anchors valid")
        
        total_broken = len(self.broken_same_page) + len(self.broken_cross_page)
        
        if total_broken == 0:
            print("\n🎉 All anchor links valid across all 57 pages!")
            return 0
        else:
            print(f"\n⚠️  {total_broken} broken anchor links found")
            return 1

def main():
    auditor = AnchorAuditor()
    exit_code = auditor.run_audit()
    sys.exit(exit_code)

if __name__ == "__main__":
    main()
