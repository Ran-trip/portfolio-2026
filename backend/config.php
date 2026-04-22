<?php
define('DB_PATH',      __DIR__ . '/database/portfolio.db');
define('UPLOADS_PATH', __DIR__ . '/uploads/');

$env = __DIR__ . '/.env.php';
if (!file_exists($env)) die(json_encode(['error' => 'Fichier .env.php manquant']));
require_once $env;
define('TOKEN_TTL',      3600 * 8); // 8 heures
define('MAX_ATTEMPTS',   5);        // tentatives max
define('ATTEMPT_WINDOW', 900);      // 15 minutes

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: http://localhost:5173');
header('Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type, Authorization');
header('X-Content-Type-Options: nosniff');
header('X-Frame-Options: DENY');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

function getDB() {
    $db = new PDO('sqlite:' . DB_PATH);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    return $db;
}

function json_response($data, $code = 200) {
    http_response_code($code);
    echo json_encode($data, JSON_UNESCAPED_UNICODE);
    exit();
}

function error_response($message, $code = 400) {
    json_response(['error' => $message], $code);
}

function verify_token() {
    $header = $_SERVER['HTTP_AUTHORIZATION'] ?? '';
    if (!$header) error_response('Non autorisé', 401);

    $db = getDB();
    $now = time();

    // Nettoyer les tokens expirés
    $db->exec("DELETE FROM tokens WHERE expires_at < $now");

    $stmt = $db->prepare("SELECT token FROM tokens WHERE token = ? AND expires_at > ?");
    $stmt->execute([$header, $now]);

    if (!$stmt->fetch()) error_response('Token invalide ou expiré', 401);

    // Renouveler l'expiration à chaque requête
    $expires = $now + TOKEN_TTL;
    $stmt = $db->prepare("UPDATE tokens SET expires_at = ? WHERE token = ?");
    $stmt->execute([$expires, $header]);
}

function check_rate_limit() {
    $ip  = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $db  = getDB();
    $now = time();
    $window = $now - ATTEMPT_WINDOW;

    // Nettoyer les anciennes tentatives
    $db->exec("DELETE FROM login_attempts WHERE created_at < $window");

    $stmt = $db->prepare("SELECT COUNT(*) FROM login_attempts WHERE ip = ? AND created_at > ?");
    $stmt->execute([$ip, $window]);
    $count = (int) $stmt->fetchColumn();

    if ($count >= MAX_ATTEMPTS) {
        $minutes = ceil(ATTEMPT_WINDOW / 60);
        error_response("Trop de tentatives. Réessayez dans $minutes minutes.", 429);
    }
}

function record_attempt() {
    $ip = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
    $db = getDB();
    $stmt = $db->prepare("INSERT INTO login_attempts (ip, created_at) VALUES (?, ?)");
    $stmt->execute([$ip, time()]);
}
