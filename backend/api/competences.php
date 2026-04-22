<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    $stmt = $db->query("SELECT * FROM competences ORDER BY categorie, ordre ASC");
    $rows = $stmt->fetchAll(PDO::FETCH_ASSOC);
    json_response($rows);
}

if ($method === 'POST') {
    verify_token();
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || empty($data['nom']) || empty($data['categorie'])) error_response('Nom et catégorie requis');

    $stmt = $db->prepare("INSERT INTO competences (nom, categorie, icone, ordre) VALUES (?, ?, ?, ?)");
    $stmt->execute([$data['nom'], $data['categorie'], $data['icone'] ?? '', $data['ordre'] ?? 0]);
    json_response(['id' => $db->lastInsertId()], 201);
}

if ($method === 'DELETE' && $id) {
    verify_token();
    $stmt = $db->prepare("DELETE FROM competences WHERE id = ?");
    $stmt->execute([$id]);
    json_response(['success' => true]);
}

error_response('Méthode non autorisée', 405);
