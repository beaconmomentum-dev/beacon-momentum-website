#!/usr/bin/env node

/**
 * Beacon 3.1 Platform - Weekly Report Email Sender
 * 
 * This script sends the weekly security summary report via SendGrid.
 * It reads the latest weekly report and emails it to the configured recipients.
 */

const sgMail = require('@sendgrid/mail');
const fs = require('fs');
const path = require('path');

// Load environment variables
require('dotenv').config({ path: path.join(__dirname, '../.env') });

// Configure SendGrid
const SENDGRID_API_KEY = process.env.SENDGRID_API_KEY;
const FROM_EMAIL = 'noreply@beaconmomentum.com';
const FROM_NAME = 'Beacon 3.1 Monitoring System';

// Recipients
const RECIPIENTS = [
    'BobBurr80@gmail.com'  // Project Lead
];

// Get today's date for the report filename
const today = new Date();
const reportDate = today.toISOString().split('T')[0];
const reportPath = `/var/www/beaconmomentum.com/reports/weekly/weekly_summary_${reportDate}.txt`;

// Function to send email
async function sendWeeklyReport() {
    try {
        // Check if SendGrid API key is configured
        if (!SENDGRID_API_KEY) {
            console.error('Error: SENDGRID_API_KEY not found in environment variables');
            process.exit(1);
        }

        // Set API key
        sgMail.setApiKey(SENDGRID_API_KEY);

        // Read the weekly report
        if (!fs.existsSync(reportPath)) {
            console.error(`Error: Weekly report not found at ${reportPath}`);
            process.exit(1);
        }

        const reportContent = fs.readFileSync(reportPath, 'utf8');

        // Extract key metrics from report for email subject
        const healthScoreMatch = reportContent.match(/Platform Health Score: (\d+)\/100/);
        const healthScore = healthScoreMatch ? healthScoreMatch[1] : 'N/A';
        
        const statusMatch = reportContent.match(/Status: (.+)/);
        const status = statusMatch ? statusMatch[1].replace(/[✓⚠️]/g, '').trim() : 'Unknown';

        // Get week range from report
        const weekMatch = reportContent.match(/Week: (.+) to (.+)/);
        const weekRange = weekMatch ? `${weekMatch[1]} to ${weekMatch[2]}` : reportDate;

        // Create email subject
        const subject = `Beacon 3.1 Weekly Security Summary - Health Score: ${healthScore}/100`;

        // Create HTML version of the report
        const htmlContent = `
<!DOCTYPE html>
<html>
<head>
    <style>
        body {
            font-family: 'Courier New', monospace;
            background-color: #f5f5f5;
            padding: 20px;
        }
        .container {
            background-color: white;
            padding: 30px;
            border-radius: 5px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
            max-width: 800px;
            margin: 0 auto;
        }
        .header {
            background-color: #0a5c5c;
            color: white;
            padding: 20px;
            border-radius: 5px 5px 0 0;
            margin: -30px -30px 20px -30px;
        }
        .header h1 {
            margin: 0;
            font-size: 24px;
        }
        .summary-box {
            background-color: #e8f4f4;
            border-left: 4px solid #0a5c5c;
            padding: 15px;
            margin: 20px 0;
        }
        .health-score {
            font-size: 36px;
            font-weight: bold;
            color: ${healthScore >= 90 ? '#28a745' : healthScore >= 75 ? '#ffc107' : '#dc3545'};
        }
        pre {
            background-color: #f8f9fa;
            padding: 15px;
            border-radius: 5px;
            overflow-x: auto;
            font-size: 12px;
            line-height: 1.5;
        }
        .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #ddd;
            color: #666;
            font-size: 12px;
        }
    </style>
</head>
<body>
    <div class="container">
        <div class="header">
            <h1>🔒 Beacon 3.1 Weekly Security Summary</h1>
            <p style="margin: 10px 0 0 0;">Week: ${weekRange}</p>
        </div>
        
        <div class="summary-box">
            <h2 style="margin-top: 0;">Executive Summary</h2>
            <div class="health-score">${healthScore}/100</div>
            <p><strong>Status:</strong> ${status}</p>
        </div>

        <h3>Full Report</h3>
        <pre>${reportContent}</pre>

        <div class="footer">
            <p>This is an automated report from the Beacon 3.1 Monitoring System.</p>
            <p>Reports are generated every Monday at 10:00 AM and stored at: <code>/var/www/beaconmomentum.com/reports/weekly/</code></p>
            <p>For questions or issues, please contact the platform administrator.</p>
        </div>
    </div>
</body>
</html>
        `;

        // Prepare email message
        const msg = {
            to: RECIPIENTS,
            from: {
                email: FROM_EMAIL,
                name: FROM_NAME
            },
            subject: subject,
            text: reportContent,
            html: htmlContent
        };

        // Send email
        console.log(`Sending weekly report to: ${RECIPIENTS.join(', ')}`);
        await sgMail.send(msg);
        console.log('✓ Weekly report email sent successfully');

        // Log the email send event
        const logEntry = `${new Date().toISOString()} - Weekly report emailed to ${RECIPIENTS.length} recipient(s)\n`;
        fs.appendFileSync('/var/www/beaconmomentum.com/logs/monitoring.log', logEntry);

    } catch (error) {
        console.error('Error sending weekly report email:', error);
        
        if (error.response) {
            console.error('SendGrid error response:', error.response.body);
        }
        
        process.exit(1);
    }
}

// Run the email sender
sendWeeklyReport();
