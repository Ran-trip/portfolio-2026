<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();

if ($method === 'GET') {
    $stmt = $db->query("SELECT key, value FROM settings");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    $settings = [];
    foreach ($rows as $row) {
        $settings[$row['key']] = $row['value'];
    }
    json_response($settings);
}

if ($method === 'PUT') {
    verify_token();
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) error_response('Données invalides');

    $stmt = $db->prepare("INSERT OR REPLACE INTO settings (key, value) VALUES (?, ?)");
    foreach ($data as $key => $value) {
        $stmt->execute([$key, $value]);
    }
    json_response(['success' => true]);
}

error_response('Méthode non autorisée', 405);
