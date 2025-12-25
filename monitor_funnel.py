#!/usr/bin/env python3
"""
Beacon Momentum Module 1 Funnel Monitoring Script
Checks the health and status of landing page, video page, and webhook endpoint
"""

import requests
import json
from datetime import datetime
from typing import Dict, List, Tuple

# Configuration
BASE_URL = "https://beaconmomentum.com"
PAGES_TO_CHECK = {
    "Landing Page": "/start-here",
    "Video Page": "/watch-module-1",
    "Webhook Endpoint": "/api/ghl/webhook"
}

# Expected content checks
CONTENT_CHECKS = {
    "/start-here": [
        "Feeling Lost in a Major Life Transition",
        "GET FREE INSTANT ACCESS",
        "leadForm"
    ],
    "/watch-module-1": [
        "Welcome to Module 1",
        "moduleVideo",
        "beacon_momentum_phase1_module1_FINAL_CLEAN.mp4"
    ]
}

class Colors:
    """ANSI color codes for terminal output"""
    GREEN = '\033[92m'
    RED = '\033[91m'
    YELLOW = '\033[93m'
    BLUE = '\033[94m'
    BOLD = '\033[1m'
    END = '\033[0m'

def check_page_status(url: str, page_name: str) -> Tuple[bool, Dict]:
    """
    Check if a page is accessible and returns expected content
    
    Returns:
        Tuple of (success: bool, details: dict)
    """
    full_url = f"{BASE_URL}{url}"
    result = {
        "url": full_url,
        "timestamp": datetime.now().isoformat(),
        "status_code": None,
        "response_time": None,
        "content_checks": [],
        "errors": []
    }
    
    try:
        # Make request with timeout
        response = requests.get(full_url, timeout=10, allow_redirects=True)
        result["status_code"] = response.status_code
        result["response_time"] = f"{response.elapsed.total_seconds():.2f}s"
        
        # Check status code
        if response.status_code == 404:
            result["errors"].append("Page not found (404)")
            return False, result
        elif response.status_code == 500:
            result["errors"].append("Server error (500)")
            return False, result
        elif response.status_code >= 400:
            result["errors"].append(f"HTTP error {response.status_code}")
            return False, result
        
        # Check content if page loaded successfully
        if response.status_code == 200 and url in CONTENT_CHECKS:
            content = response.text
            for expected_text in CONTENT_CHECKS[url]:
                if expected_text in content:
                    result["content_checks"].append({
                        "text": expected_text,
                        "found": True
                    })
                else:
                    result["content_checks"].append({
                        "text": expected_text,
                        "found": False
                    })
                    result["errors"].append(f"Missing expected content: {expected_text}")
        
        # Success if status is 200 and no errors
        success = response.status_code == 200 and len(result["errors"]) == 0
        return success, result
        
    except requests.exceptions.Timeout:
        result["errors"].append("Request timeout (>10s)")
        return False, result
    except requests.exceptions.ConnectionError:
        result["errors"].append("Connection failed - server may be down")
        return False, result
    except Exception as e:
        result["errors"].append(f"Unexpected error: {str(e)}")
        return False, result

def check_webhook_endpoint(url: str) -> Tuple[bool, Dict]:
    """
    Check if webhook endpoint is accessible (should return 405 for GET requests)
    
    Returns:
        Tuple of (success: bool, details: dict)
    """
    full_url = f"{BASE_URL}{url}"
    result = {
        "url": full_url,
        "timestamp": datetime.now().isoformat(),
        "status_code": None,
        "response_time": None,
        "errors": []
    }
    
    try:
        # Webhook should reject GET requests (405 Method Not Allowed is expected)
        response = requests.get(full_url, timeout=10)
        result["status_code"] = response.status_code
        result["response_time"] = f"{response.elapsed.total_seconds():.2f}s"
        
        # 405 is actually good - means endpoint exists but requires POST
        if response.status_code == 405:
            return True, result
        elif response.status_code == 404:
            result["errors"].append("Webhook endpoint not found (404)")
            return False, result
        elif response.status_code == 500:
            result["errors"].append("Webhook server error (500)")
            return False, result
        else:
            # Any other response means endpoint is accessible
            return True, result
            
    except Exception as e:
        result["errors"].append(f"Webhook check failed: {str(e)}")
        return False, result

def print_header():
    """Print monitoring script header"""
    print(f"\n{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}Beacon Momentum Module 1 Funnel - Health Check{Colors.END}")
    print(f"{Colors.BOLD}{Colors.BLUE}{'='*70}{Colors.END}\n")
    print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
    print(f"Base URL: {BASE_URL}\n")

def print_result(page_name: str, success: bool, details: Dict):
    """Print formatted result for a single check"""
    status_icon = f"{Colors.GREEN}✓{Colors.END}" if success else f"{Colors.RED}✗{Colors.END}"
    status_text = f"{Colors.GREEN}OK{Colors.END}" if success else f"{Colors.RED}FAILED{Colors.END}"
    
    print(f"{status_icon} {Colors.BOLD}{page_name}{Colors.END}: {status_text}")
    print(f"   URL: {details['url']}")
    
    if details['status_code']:
        status_color = Colors.GREEN if details['status_code'] == 200 else Colors.YELLOW if details['status_code'] == 405 else Colors.RED
        print(f"   Status Code: {status_color}{details['status_code']}{Colors.END}")
    
    if details['response_time']:
        print(f"   Response Time: {details['response_time']}")
    
    # Print content checks if any
    if details.get('content_checks'):
        print(f"   Content Checks:")
        for check in details['content_checks']:
            check_icon = f"{Colors.GREEN}✓{Colors.END}" if check['found'] else f"{Colors.RED}✗{Colors.END}"
            print(f"      {check_icon} {check['text'][:50]}...")
    
    # Print errors if any
    if details.get('errors'):
        print(f"   {Colors.RED}Errors:{Colors.END}")
        for error in details['errors']:
            print(f"      • {error}")
    
    print()

def save_report(results: List[Dict], filename: str = "funnel_health_report.json"):
    """Save detailed results to JSON file"""
    report = {
        "timestamp": datetime.now().isoformat(),
        "base_url": BASE_URL,
        "results": results
    }
    
    with open(filename, 'w') as f:
        json.dump(report, f, indent=2)
    
    print(f"{Colors.BLUE}Detailed report saved to: {filename}{Colors.END}\n")

def main():
    """Main monitoring function"""
    print_header()
    
    results = []
    all_passed = True
    
    # Check each page
    for page_name, url in PAGES_TO_CHECK.items():
        if page_name == "Webhook Endpoint":
            success, details = check_webhook_endpoint(url)
        else:
            success, details = check_page_status(url, page_name)
        
        results.append({
            "page": page_name,
            "success": success,
            "details": details
        })
        
        print_result(page_name, success, details)
        
        if not success:
            all_passed = False
    
    # Print summary
    print(f"{Colors.BOLD}{'='*70}{Colors.END}")
    if all_passed:
        print(f"{Colors.GREEN}{Colors.BOLD}✓ ALL CHECKS PASSED{Colors.END}")
        print(f"{Colors.GREEN}The funnel is live and working correctly!{Colors.END}\n")
    else:
        print(f"{Colors.RED}{Colors.BOLD}✗ SOME CHECKS FAILED{Colors.END}")
        print(f"{Colors.RED}Please review the errors above and fix the issues.{Colors.END}\n")
    
    # Save detailed report
    save_report(results)
    
    # Return exit code (0 = success, 1 = failure)
    return 0 if all_passed else 1

if __name__ == "__main__":
    exit(main())
