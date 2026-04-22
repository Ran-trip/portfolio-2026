<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error_response('Méthode non autorisée', 405);

$data = json_decode(file_get_contents('php://input'), true);
if (empty($data['password'])) error_response('Mot de passe requis');

check_rate_limit();

if (password_verify($data['password'], ADMIN_PASSWORD)) {
    $token   = bin2hex(random_bytes(32));
    $expires = time() + TOKEN_TTL;

    $db = getDB();
    $stmt = $db->prepare("INSERT INTO tokens (token, expires_at) VALUES (?, ?)");
    $stmt->execute([$token, $expires]);

    json_response(['token' => $token]);
} else {
    record_attempt();
    error_response('Mot de passe incorrect', 401);
}
