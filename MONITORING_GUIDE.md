# Beacon Momentum Funnel Monitoring Guide

## Overview

The `monitor_funnel.py` script provides comprehensive health checks for your Module 1 lead capture funnel. It verifies that both pages are live, accessible, and displaying the correct content.

## Quick Start

### Run the Monitor

```bash
cd /home/ubuntu/beacon-momentum-website
python3 monitor_funnel.py
```

### Expected Output (When Everything Works)

```
======================================================================
Beacon Momentum Module 1 Funnel - Health Check
======================================================================

✓ Landing Page: OK
   URL: https://beaconmomentum.com/start-here
   Status Code: 200
   Response Time: 0.14s
   Content Checks:
      ✓ Feeling Lost in a Major Life Transition...
      ✓ GET FREE INSTANT ACCESS...
      ✓ leadForm...

✓ Video Page: OK
   URL: https://beaconmomentum.com/watch-module-1
   Status Code: 200
   Response Time: 0.10s
   Content Checks:
      ✓ Welcome to Module 1...
      ✓ moduleVideo...
      ✓ beacon_momentum_phase1_module1_FINAL_CLEAN.mp4...

✓ Webhook Endpoint: OK
   URL: https://beaconmomentum.com/api/ghl/webhook
   Status Code: 405
   Response Time: 0.13s

======================================================================
✓ ALL CHECKS PASSED
The funnel is live and working correctly!
```

## What the Script Checks

### 1. Landing Page (`/start-here`)
- ✓ Page loads successfully (HTTP 200)
- ✓ Contains hero headline
- ✓ Contains CTA button text
- ✓ Contains form element ID
- ✓ Response time < 10 seconds

### 2. Video Page (`/watch-module-1`)
- ✓ Page loads successfully (HTTP 200)
- ✓ Contains welcome message
- ✓ Contains video player element
- ✓ Contains correct video filename
- ✓ Response time < 10 seconds

### 3. Webhook Endpoint (`/api/ghl/webhook`)
- ✓ Endpoint is accessible
- ✓ Returns 405 (Method Not Allowed) for GET requests (expected behavior)
- ✓ Response time < 10 seconds

## Understanding the Results

### Status Indicators

- **✓ (Green)** - Check passed successfully
- **✗ (Red)** - Check failed, action required

### Common Issues and Solutions

#### Issue: "Page not found (404)"
**Solution:** The page hasn't been deployed yet. Run deployment:
```bash
ssh root@143.198.23.240
cd /var/www/beaconmomentum.com
./update-live-site.sh
```

#### Issue: "Missing expected content"
**Solution:** The old version of the page is still live. Deploy the latest changes:
```bash
ssh root@143.198.23.240
cd /var/www/beaconmomentum.com
git pull origin main
sudo systemctl restart nginx
```

#### Issue: "Server error (500)"
**Solution:** Check server logs:
```bash
ssh root@143.198.23.240
tail -f /var/log/nginx/error.log
```

#### Issue: "Connection failed - server may be down"
**Solution:** Check if the server is running:
```bash
ssh root@143.198.23.240
sudo systemctl status nginx
```

#### Issue: "Request timeout (>10s)"
**Solution:** Server is slow or overloaded. Check server resources:
```bash
ssh root@143.198.23.240
top
df -h
```

## Detailed Report

The script automatically saves a detailed JSON report to `funnel_health_report.json` after each run. This includes:

- Exact timestamps
- Full URLs tested
- Complete response details
- All content checks performed
- Detailed error messages

View the report:
```bash
cat funnel_health_report.json
```

## Automation Options

### Option 1: Run on Schedule (Cron)

Add to crontab to run every hour:
```bash
crontab -e
```

Add this line:
```
0 * * * * cd /home/ubuntu/beacon-momentum-website && python3 monitor_funnel.py >> /var/log/funnel_monitor.log 2>&1
```

### Option 2: Run on Deployment

Add to your deployment script:
```bash
#!/bin/bash
cd /var/www/beaconmomentum.com
git pull origin main
sudo systemctl restart nginx

# Wait for server to restart
sleep 5

# Run health check
python3 monitor_funnel.py
```

### Option 3: Continuous Monitoring

Run in watch mode (checks every 5 minutes):
```bash
watch -n 300 python3 monitor_funnel.py
```

## Integration with Monitoring Services

### Send Alerts via Email

Modify the script to send email on failure:
```python
import smtplib
from email.mime.text import MIMEText

def send_alert(results):
    msg = MIMEText(f"Funnel health check failed: {results}")
    msg['Subject'] = 'Beacon Momentum Funnel Alert'
    msg['From'] = 'monitor@beaconmomentum.com'
    msg['To'] = 'admin@beaconmomentum.com'
    
    s = smtplib.SMTP('localhost')
    s.send_message(msg)
    s.quit()
```

### Integration with Slack/Discord

Use webhooks to send notifications to your team chat.

## Exit Codes

The script returns standard exit codes:
- `0` - All checks passed
- `1` - One or more checks failed

This allows integration with CI/CD pipelines and monitoring systems.

## Troubleshooting

### Script Won't Run

**Error:** `python3: command not found`  
**Solution:** Install Python 3:
```bash
sudo apt-get update
sudo apt-get install python3
```

**Error:** `ModuleNotFoundError: No module named 'requests'`  
**Solution:** Install requests library:
```bash
pip3 install requests
```

### False Positives

If the script reports failures but pages work in browser:
1. Check if content has changed (update CONTENT_CHECKS in script)
2. Verify BASE_URL is correct
3. Check for redirects or authentication

## Best Practices

1. **Run after every deployment** to verify changes went live
2. **Set up automated monitoring** to catch issues quickly
3. **Review the JSON report** for detailed diagnostics
4. **Keep the script updated** as content changes
5. **Monitor response times** to catch performance degradation

## Support

For issues with the monitoring script:
- Check the detailed JSON report
- Review server logs
- Verify network connectivity
- Contact: support@beaconmomentum.com

---

**Last Updated:** December 25, 2024  
**Script Version:** 1.0  
**Maintainer:** Beacon Momentum Dev Team
