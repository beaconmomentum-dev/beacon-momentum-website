<?php
/**
 * Beacon Momentum - PDF Download Handler
 * Simple, working solution with SendGrid integration
 */

require_once __DIR__ . '/config.php';

// Set headers
header('Content-Type: application/json');
header('Access-Control-Allow-Origin: https://beaconmomentum.com');
header('Access-Control-Allow-Methods: POST, OPTIONS');
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
if (!isset($data['name']) || !isset($data['email']) || !isset($data['pdfSlug'])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Missing required fields: name, email, pdfSlug'
    ]);
    exit();
}

$name = trim($data['name']);
$email = trim($data['email']);
$pdfSlug = trim($data['pdfSlug']);

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid email address'
    ]);
    exit();
}

// Map PDF slugs to files and titles
$pdfMap = [
    'life-transition-roadmap' => [
        'file' => 'life-transition-roadmap.pdf',
        'title' => 'Life Transition Roadmap'
    ],
    'business-blueprint' => [
        'file' => 'business-blueprint.pdf',
        'title' => 'One-Person Business Blueprint'
    ],
    'defi-starter-guide' => [
        'file' => 'defi-starter-guide.pdf',
        'title' => 'DeFi Starter Guide'
    ]
];

if (!isset($pdfMap[$pdfSlug])) {
    http_response_code(400);
    echo json_encode([
        'success' => false,
        'error' => 'Invalid PDF selection'
    ]);
    exit();
}

$pdfInfo = $pdfMap[$pdfSlug];
$pdfUrl = 'https://beaconmomentum.com/downloads/' . $pdfInfo['file'];

// Parse name
$nameParts = explode(' ', $name, 2);
$firstName = $nameParts[0];
$lastName = isset($nameParts[1]) ? $nameParts[1] : '';

// Add to SendGrid
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

// Log SendGrid response
if ($httpCode >= 200 && $httpCode < 300) {
    error_log("SendGrid: Contact added - $email for {$pdfInfo['title']}");
} else {
    error_log("SendGrid Error (HTTP $httpCode): $response");
}

// Always return success with PDF URL
http_response_code(200);
echo json_encode([
    'success' => true,
    'pdfUrl' => $pdfUrl,
    'pdfTitle' => $pdfInfo['title'],
    'message' => 'Your download is starting! Check your email for future updates.'
]);
?>
