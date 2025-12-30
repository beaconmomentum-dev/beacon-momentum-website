<?php
/**
 * Beacon Momentum - GHL → SendGrid PDF Download Integration
 * 
 * Flow: Website Form → GHL API → SendGrid Email → PDF Download
 * This ensures all leads are captured in GHL CRM first
 */

// Enable CORS
header('Access-Control-Allow-Origin: https://beaconmomentum.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
header('Content-Type: application/json');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Only allow POST requests
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['success' => false, 'error' => 'Method not allowed']);
    exit();
}

// Load configuration
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Configuration file not found'
    ]);
    exit();
}

require_once $configFile;

// Validate required configuration
if (!defined('GHL_API_KEY') || !defined('GHL_LOCATION_ID') || !defined('SENDGRID_API_KEY')) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required configuration'
    ]);
    exit();
}

// Get form data
$input = json_decode(file_get_contents('php://input'), true);
if (!$input) {
    $input = $_POST;
}

$name = isset($input['name']) ? trim($input['name']) : '';
$email = isset($input['email']) ? trim($input['email']) : '';
$guide = isset($input['guide']) ? trim($input['guide']) : '';

// Validate input
if (empty($name) || empty($email) || empty($guide)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Name, email, and guide selection are required'
    ]);
    exit();
}

// Validate email format
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address'
    ]);
    exit();
}

// Map guide names to PDF files
$pdfLinks = [
    'Life Transition Roadmap' => '/downloads/life-transition-roadmap.pdf',
    'One-Person Business Blueprint' => '/downloads/business-blueprint.pdf',
    'DeFi Starter Guide' => '/downloads/defi-starter-guide.pdf'
];

$pdfUrl = isset($pdfLinks[$guide]) ? $pdfLinks[$guide] : null;
if (!$pdfUrl) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid guide selection'
    ]);
    exit();
}

// Split name into first and last
$nameParts = explode(' ', $name, 2);
$firstName = $nameParts[0];
$lastName = isset($nameParts[1]) ? $nameParts[1] : '';

// STEP 1: Add contact to GHL
$ghlData = [
    'email' => $email,
    'firstName' => $firstName,
    'lastName' => $lastName,
    'tags' => ['PDF Download', 'Lead Magnet: ' . $guide],
    'customFields' => [
        [
            'key' => 'guide_requested',
            'value' => $guide
        ],
        [
            'key' => 'source',
            'value' => 'Beacon Kit Download'
        ]
    ]
];

$ghlCh = curl_init('https://services.leadconnectorhq.com/contacts/');
curl_setopt($ghlCh, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ghlCh, CURLOPT_POST, true);
curl_setopt($ghlCh, CURLOPT_POSTFIELDS, json_encode($ghlData));
curl_setopt($ghlCh, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . GHL_API_KEY,
    'Version: 2021-07-28',
    'Content-Type: application/json'
]);

$ghlResponse = curl_exec($ghlCh);
$ghlHttpCode = curl_getinfo($ghlCh, CURLINFO_HTTP_CODE);
$ghlError = curl_error($ghlCh);
curl_close($ghlCh);

// Check if GHL request was successful
if ($ghlHttpCode < 200 || $ghlHttpCode >= 300) {
    error_log("GHL API Error (HTTP $ghlHttpCode): $ghlResponse");
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to add contact to CRM'
    ]);
    exit();
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
                'signup_date' => date('Y-m-d H:i:s'),
                'source' => 'Beacon Kit Download'
            ]
        ]
    ]
];

$sgCh = curl_init('https://api.sendgrid.com/v3/marketing/contacts');
curl_setopt($sgCh, CURLOPT_RETURNTRANSFER, true);
curl_setopt($sgCh, CURLOPT_POST, true);
curl_setopt($sgCh, CURLOPT_POSTFIELDS, json_encode($sendgridData));
curl_setopt($sgCh, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . SENDGRID_API_KEY,
    'Content-Type: application/json'
]);

$sgResponse = curl_exec($sgCh);
$sgHttpCode = curl_getinfo($sgCh, CURLINFO_HTTP_CODE);
curl_close($sgCh);

// Log SendGrid response but don't fail if it errors
if ($sgHttpCode < 200 || $sgHttpCode >= 300) {
    error_log("SendGrid API Error (HTTP $sgHttpCode): $sgResponse");
}

// STEP 3: Return success with PDF download link
echo json_encode([
    'success' => true,
    'message' => 'Thank you! Your guide is downloading now.',
    'pdfUrl' => $pdfUrl,
    'ghlCaptured' => true,
    'sendgridCaptured' => ($sgHttpCode >= 200 && $sgHttpCode < 300)
]);
?>
