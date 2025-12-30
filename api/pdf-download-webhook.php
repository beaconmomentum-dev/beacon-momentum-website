<?php
/**
 * PDF Download with GHL Webhook Integration
 * 
 * This script:
 * 1. Receives form submission
 * 2. Triggers GHL webhook to create contact
 * 3. Adds to SendGrid for email marketing
 * 4. Returns PDF download link
 */

require_once __DIR__ . '/config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Get POST data
$input = file_get_contents('php://input');
$data = json_decode($input, true);

// Validate input
if (!isset($data['name']) || !isset($data['email']) || !isset($data['guide'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields: name, email, guide'
    ]);
    exit();
}

$name = trim($data['name']);
$email = trim($data['email']);
$guide = trim($data['guide']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address'
    ]);
    exit();
}

// Map guide to PDF filename
$pdfMap = [
    'Life Transition Roadmap' => 'life-transition-roadmap.pdf',
    'One-Person Business Blueprint' => 'one-person-business-blueprint.pdf',
    'DeFi Starter Guide' => 'defi-starter-guide.pdf'
];

if (!isset($pdfMap[$guide])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid guide selection'
    ]);
    exit();
}

$pdfFilename = $pdfMap[$guide];
$pdfUrl = 'https://beaconmomentum.com/pdfs/' . $pdfFilename;

// Parse name
$nameParts = explode(' ', $name, 2);
$firstName = $nameParts[0];
$lastName = isset($nameParts[1]) ? $nameParts[1] : '';

// STEP 1: Send to GHL Webhook (simulates form submission)
$ghlWebhookData = [
    'type' => 'FormSubmitted',
    'location_id' => GHL_LOCATION_ID,
    'contact' => [
        'email' => $email,
        'first_name' => $firstName,
        'last_name' => $lastName,
        'name' => $name,
        'tags' => ['PDF Download', 'Lead Magnet: ' . $guide],
        'source' => 'Beacon Kit Download'
    ],
    'form_data' => [
        'guide_requested' => $guide,
        'source' => 'Website PDF Download'
    ]
];

// Call local GHL webhook handler
$ghlCh = curl_init('http://localhost:3000/api/ghl/webhook');
curl_setopt($ghlCh, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ghlCh, CURLOPT_POST, true);
curl_setopt($ghlCh, CURLOPT_POSTFIELDS, json_encode($ghlWebhookData));
curl_setopt($ghlCh, CURLOPT_HTTPHEADER, [
    'Content-Type: application/json',
    'X-Internal-Request: true'
]);
curl_setopt($ghlCh, CURLOPT_TIMEOUT, 5);

$ghlResponse = curl_exec($ghlCh);
$ghlHttpCode = curl_getinfo($ghlCh, CURLINFO_HTTP_CODE);
$ghlError = curl_error($ghlCh);
curl_close($ghlCh);

// Log GHL webhook result (but don't fail if it doesn't work)
if ($ghlHttpCode < 200 || $ghlHttpCode >= 300) {
    error_log("GHL Webhook Error (HTTP $ghlHttpCode): $ghlResponse");
}

// STEP 2: Add contact to SendGrid
$sendgridData = [
    'contacts' => [
        [
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName,
            'custom_fields' => [
                'guide_requested' => $guide,
                'download_date' => date('Y-m-d'),
                'source' => 'Beacon Kit Download'
            ]
        ]
    ]
];

$sendgridCh = curl_init('https://api.sendgrid.com/v3/marketing/contacts');
curl_setopt($sendgridCh, CURLOPT_RETURNTRANSFER, true);
curl_setopt($sendgridCh, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($sendgridCh, CURLOPT_POSTFIELDS, json_encode($sendgridData));
curl_setopt($sendgridCh, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . SENDGRID_API_KEY,
    'Content-Type: application/json'
]);

$sendgridResponse = curl_exec($sendgridCh);
$sendgridHttpCode = curl_getinfo($sendgridCh, CURLINFO_HTTP_CODE);
$sendgridError = curl_error($sendgridCh);
curl_close($sendgridCh);

// Check if SendGrid request was successful
if ($sendgridHttpCode < 200 || $sendgridHttpCode >= 300) {
    error_log("SendGrid API Error (HTTP $sendgridHttpCode): $sendgridResponse");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to process request'
    ]);
    exit();
}

// Success! Return PDF URL
http_response_code(200);
echo json_encode([
    'success' => true,
    'pdfUrl' => $pdfUrl,
    'message' => 'Check your email for the download link!'
]);
