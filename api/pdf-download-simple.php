<?php
/**
 * Simple PDF Download Handler
 * Sends PDF link immediately and adds to SendGrid
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
        'error' => 'Missing required fields'
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

// Map guide to PDF
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

$pdfUrl = 'https://beaconmomentum.com/pdfs/' . $pdfMap[$guide];

// Parse name
$nameParts = explode(' ', $name, 2);
$firstName = $nameParts[0];
$lastName = isset($nameParts[1]) ? $nameParts[1] : '';

// Add to SendGrid (simple version without custom fields)
$sendgridData = [
    'contacts' => [
        [
            'email' => $email,
            'first_name' => $firstName,
            'last_name' => $lastName
        ]
    ]
];

$ch = curl_init('https://api.sendgrid.com/v3/marketing/contacts');
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_CUSTOMREQUEST, 'PUT');
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($sendgridData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . SENDGRID_API_KEY,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Log but don't fail on SendGrid error
if ($httpCode < 200 || $httpCode >= 300) {
    error_log("SendGrid Error (HTTP $httpCode): $response");
}

// Always return success with PDF URL
http_response_code(200);
echo json_encode([
    'success' => true,
    'pdfUrl' => $pdfUrl,
    'message' => 'Download started!',
    'ghlFormUrl' => 'https://api.leadconnectorhq.com/forms/submit/' . GHL_LOCATION_ID
]);
