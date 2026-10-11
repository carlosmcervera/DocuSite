#!/usr/bin/env python3
"""
Cleanup script to remove all TEST_ leads from the database
"""
import requests
from dotenv import dotenv_values

# Read configuration from .env files
frontend_env = dotenv_values('/app/frontend/.env')
backend_env = dotenv_values('/app/backend/.env')

BACKEND_URL = frontend_env.get('REACT_APP_BACKEND_URL', '').rstrip('/') + '/api'
ADMIN_TOKEN = backend_env.get('ADMIN_TOKEN', '')

def cleanup_test_leads():
    """Find and delete all leads with TEST_ prefix"""
    headers = {"X-Admin-Token": ADMIN_TOKEN}
    
    # Get all leads
    response = requests.get(f"{BACKEND_URL}/admin/leads", headers=headers)
    if response.status_code != 200:
        print(f"Failed to fetch leads: {response.status_code}")
        return
    
    leads = response.json()
    test_leads = [lead for lead in leads if lead.get('name', '').startswith('TEST_') or lead.get('email', '').startswith('TEST_')]
    
    print(f"Found {len(test_leads)} TEST_ leads to clean up")
    
    deleted_count = 0
    for lead in test_leads:
        lead_id = lead.get('id')
        name = lead.get('name', 'Unknown')
        email = lead.get('email', 'Unknown')
        
        delete_response = requests.delete(f"{BACKEND_URL}/admin/leads/{lead_id}", headers=headers)
        if delete_response.status_code == 200:
            deleted_count += 1
            print(f"Deleted: {name} ({email})")
        else:
            print(f"Failed to delete {name}: {delete_response.status_code}")
    
    print(f"\nCleanup complete: {deleted_count}/{len(test_leads)} leads deleted")

if __name__ == "__main__":
    cleanup_test_leads()
