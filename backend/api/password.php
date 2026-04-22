<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error_response('Méthode non autorisée', 405);

verify_token();

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['ancien']) || empty($data['nouveau'])) {
    error_response('Tous les champs sont requis');
}

if (!password_verify($data['ancien'], ADMIN_PASSWORD)) {
    error_response('Ancien mot de passe incorrect', 401);
}

if (strlen($data['nouveau']) < 8) {
    error_response('Le nouveau mot de passe doit faire au moins 8 caractères');
}

$hash = password_hash($data['nouveau'], PASSWORD_BCRYPT);

$env = __DIR__ . '/../.env.php';
$actuel = file_get_contents($env);

// Remplace uniquement la ligne ADMIN_PASSWORD, préserve le reste (SMTP, etc.)
$nouveau = preg_replace(
    "/define\('ADMIN_PASSWORD',\s*'[^']*'\);/",
    "define('ADMIN_PASSWORD', '" . addslashes($hash) . "');",
    $actuel
);

if ($nouveau === null || $nouveau === $actuel) {
    error_response('Impossible de mettre à jour le mot de passe', 500);
}

if (file_put_contents($env, $nouveau) === false) {
    error_response('Impossible de mettre à jour le mot de passe', 500);
}

json_response(['success' => true]);
