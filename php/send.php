<?php
/**
 * Kontaktformular-Mailer für monteurzimmer.augsburg-apartments.de
 * Empfängt POST-Anfragen vom Reservierungsformular
 */

header('Content-Type: application/json; charset=utf-8');
header('Access-Control-Allow-Origin: https://www.monteurzimmer.augsburg-apartments.de');
header('Access-Control-Allow-Methods: POST');

// Nur POST erlauben
if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    http_response_code(405);
    echo json_encode(['error' => 'Method not allowed']);
    exit;
}

// Honeypot-Check (Spam-Schutz)
if (!empty($_POST['website'])) {
    // Bot detected
    http_response_code(200);
    echo json_encode(['success' => true]);
    exit;
}

// Rate Limiting (einfach über Session)
session_start();
$now = time();
$lastSubmit = $_SESSION['last_form_submit'] ?? 0;
if ($now - $lastSubmit < 30) {
    http_response_code(429);
    echo json_encode(['error' => 'Too many requests. Please wait.']);
    exit;
}
$_SESSION['last_form_submit'] = $now;

// Felder auslesen und sanitieren
$company  = htmlspecialchars(trim($_POST['company'] ?? ''), ENT_QUOTES, 'UTF-8');
$name     = htmlspecialchars(trim($_POST['name'] ?? ''), ENT_QUOTES, 'UTF-8');
$phone    = htmlspecialchars(trim($_POST['phone'] ?? ''), ENT_QUOTES, 'UTF-8');
$email    = filter_var(trim($_POST['email'] ?? ''), FILTER_SANITIZE_EMAIL);
$roomType = htmlspecialchars(trim($_POST['roomType'] ?? ''), ENT_QUOTES, 'UTF-8');
$roomCount= htmlspecialchars(trim($_POST['roomCount'] ?? ''), ENT_QUOTES, 'UTF-8');
$persons  = htmlspecialchars(trim($_POST['persons'] ?? ''), ENT_QUOTES, 'UTF-8');
$arrival  = htmlspecialchars(trim($_POST['arrival'] ?? ''), ENT_QUOTES, 'UTF-8');
$duration = htmlspecialchars(trim($_POST['duration'] ?? ''), ENT_QUOTES, 'UTF-8');
$message  = htmlspecialchars(trim($_POST['message'] ?? ''), ENT_QUOTES, 'UTF-8');

// Pflichtfelder prüfen
if (empty($name) || empty($phone) || empty($email) || empty($roomType) || empty($roomCount) || empty($persons) || empty($arrival) || empty($duration)) {
    http_response_code(400);
    echo json_encode(['error' => 'Required fields missing']);
    exit;
}

// E-Mail validieren
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid email']);
    exit;
}

// Übersetzung Zimmertyp
$roomTypes = [
    'zimmer'    => 'Monteurzimmer',
    'wohnung'   => 'Monteurwohnung',
    'apartment' => 'Monteurapartment',
    'haus'      => 'Monteurhaus',
];
$roomTypeLabel = $roomTypes[$roomType] ?? $roomType;

// E-Mail zusammenbauen
$to = 'info@augsburg-apartments.de';
$subject = "Neue Anfrage: {$roomTypeLabel} - {$name} ({$persons} Pers.)";

$body = "=== NEUE RESERVIERUNGSANFRAGE ===\n\n";
$body .= "Firma:         {$company}\n";
$body .= "Name:          {$name}\n";
$body .= "Telefon:       {$phone}\n";
$body .= "E-Mail:        {$email}\n\n";
$body .= "--- Buchungsdetails ---\n";
$body .= "Unterkunftsart: {$roomTypeLabel}\n";
$body .= "Anzahl Zimmer:  {$roomCount}\n";
$body .= "Personen:       {$persons}\n";
$body .= "Anreise:        {$arrival}\n";
$body .= "Aufenthalt:     {$duration} Tage\n\n";
if (!empty($message)) {
    $body .= "--- Nachricht ---\n{$message}\n\n";
}
$body .= "--- Gesendet am " . date('d.m.Y H:i') . " ---\n";
$body .= "Quelle: monteurzimmer.augsburg-apartments.de\n";

$headers = [
    "From: noreply@augsburg-apartments.de",
    "Reply-To: {$email}",
    "Content-Type: text/plain; charset=UTF-8",
    "X-Mailer: PHP/" . phpversion(),
];

// Senden
$sent = mail($to, $subject, $body, implode("\r\n", $headers));

if ($sent) {
    // Bestätigungsmail an Absender
    $confirmSubject = "Ihre Anfrage bei Monteurzimmer Augsburg";
    $confirmBody  = "Vielen Dank für Ihre Anfrage, {$name}!\n\n";
    $confirmBody .= "Wir haben Ihre Reservierungsanfrage erhalten und melden uns in Kürze bei Ihnen.\n\n";
    $confirmBody .= "Ihre Anfrage:\n";
    $confirmBody .= "- Art: {$roomTypeLabel}\n";
    $confirmBody .= "- Zimmer: {$roomCount}\n";
    $confirmBody .= "- Personen: {$persons}\n";
    $confirmBody .= "- Anreise: {$arrival}\n";
    $confirmBody .= "- Dauer: {$duration} Tage\n\n";
    $confirmBody .= "Bei Fragen erreichen Sie uns unter:\n";
    $confirmBody .= "Tel: +49 (0) 821 419028-28\n\n";
    $confirmBody .= "Mit freundlichen Grüßen\n";
    $confirmBody .= "Gnann Verwaltung GmbH\n";
    $confirmBody .= "Monteurzimmer Augsburg\n";

    $confirmHeaders = [
        "From: noreply@augsburg-apartments.de",
        "Content-Type: text/plain; charset=UTF-8",
    ];

    mail($email, $confirmSubject, $confirmBody, implode("\r\n", $confirmHeaders));

    echo json_encode(['success' => true]);
} else {
    http_response_code(500);
    echo json_encode(['error' => 'Mail could not be sent']);
}
