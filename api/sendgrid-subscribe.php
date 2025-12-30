<?php
/**
 * Beacon Momentum - SendGrid Email Subscription Handler
 * 
 * This file handles free PDF guide downloads and adds subscribers to SendGrid
 */

// Enable CORS for your domain
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

// ============================================
// LOAD SENDGRID API KEY FROM CONFIG FILE
// ============================================
$configFile = __DIR__ . '/config.php';
if (!file_exists($configFile)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Configuration file not found. Please contact support.'
    ]);
    exit();
}

require_once $configFile;

if (!defined('SENDGRID_API_KEY') || empty(SENDGRID_API_KEY)) {
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'SendGrid API key not configured. Please contact support.'
    ]);
    exit();
}

$SENDGRID_API_KEY = SENDGRID_API_KEY;

// SendGrid API endpoint
$SENDGRID_API_URL = 'https://api.sendgrid.com/v3/marketing/contacts';

// Get form data
$input = json_decode(file_get_contents('php://input'), true);

if (!$input) {
    // Try form data if JSON fails
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

// Prepare SendGrid contact data
$contactData = [
    'contacts' => [
        [
            'email' => $email,
            'first_name' => $name,
            'custom_fields' => [
                'guide_requested' => $guide,
                'signup_date' => date('Y-m-d H:i:s'),
                'source' => 'Beacon Kit Download'
            ]
        ]
    ]
];

// Send to SendGrid
$ch = curl_init($SENDGRID_API_URL);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($contactData));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    'Authorization: Bearer ' . $SENDGRID_API_KEY,
    'Content-Type: application/json'
]);

$response = curl_exec($ch);
$httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

// Check if SendGrid request was successful
if ($httpCode >= 200 && $httpCode < 300) {
    // Success - return PDF download link
    $pdfLinks = [
        'Life Transition Roadmap' => '/downloads/life-transition-roadmap.pdf',
        'One-Person Business Blueprint' => '/downloads/business-blueprint.pdf',
        'DeFi Starter Guide' => '/downloads/defi-starter-guide.pdf'
    ];
    
    $pdfUrl = isset($pdfLinks[$guide]) ? $pdfLinks[$guide] : null;
    
    echo json_encode([
        'success' => true,
        'message' => 'Thank you! Your guide is downloading now.',
        'pdfUrl' => $pdfUrl
    ]);
} else {
    // SendGrid error
    http_response_code(500);
    echo json_encode([
        'success' => false,
        'error' => 'Failed to subscribe. Please try again later.'
    ]);
}
?>
