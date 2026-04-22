<?php
require_once __DIR__ . '/../config.php';

$method = $_SERVER['REQUEST_METHOD'];
$db = getDB();
$id = $_GET['id'] ?? null;

if ($method === 'GET') {
    if ($id) {
        $stmt = $db->prepare("SELECT * FROM projects WHERE id = ?");
        $stmt->execute([$id]);
        $project = $stmt->fetch(PDO::FETCH_ASSOC);
        if (!$project) error_response('Projet introuvable', 404);
        $project['tags'] = json_decode($project['tags'] ?? '[]');
        $project['fonctionnalites'] = json_decode($project['fonctionnalites'] ?? '[]');
        json_response($project);
    }
    $stmt = $db->query("SELECT * FROM projects ORDER BY ordre ASC");
    $projects = $stmt->fetchAll(PDO::FETCH_ASSOC);
    foreach ($projects as &$p) {
        $p['tags'] = json_decode($p['tags'] ?? '[]');
    }
    json_response($projects);
}

if ($method === 'POST') {
    verify_token();
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data || empty($data['titre'])) error_response('Titre requis');

    $stmt = $db->prepare("INSERT INTO projects (titre, description, image, tags, github, demo, contexte, fonctionnalites, defis, duree, annee, ordre)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)");
    $stmt->execute([
        $data['titre'],
        $data['description'] ?? '',
        $data['image'] ?? '',
        json_encode($data['tags'] ?? []),
        $data['github'] ?? '',
        $data['demo'] ?? '',
        $data['contexte'] ?? '',
        json_encode($data['fonctionnalites'] ?? []),
        $data['defis'] ?? '',
        $data['duree'] ?? '',
        $data['annee'] ?? '',
        $data['ordre'] ?? 0,
    ]);
    json_response(['id' => $db->lastInsertId()], 201);
}

if ($method === 'PUT' && $id) {
    verify_token();
    $data = json_decode(file_get_contents('php://input'), true);
    if (!$data) error_response('Données invalides');

    $stmt = $db->prepare("UPDATE projects SET titre=?, description=?, image=?, tags=?, github=?, demo=?, contexte=?, fonctionnalites=?, defis=?, duree=?, annee=?, ordre=? WHERE id=?");
    $stmt->execute([
        $data['titre'],
        $data['description'] ?? '',
        $data['image'] ?? '',
        json_encode($data['tags'] ?? []),
        $data['github'] ?? '',
        $data['demo'] ?? '',
        $data['contexte'] ?? '',
        json_encode($data['fonctionnalites'] ?? []),
        $data['defis'] ?? '',
        $data['duree'] ?? '',
        $data['annee'] ?? '',
        $data['ordre'] ?? 0,
        $id,
    ]);
    json_response(['success' => true]);
}

if ($method === 'DELETE' && $id) {
    verify_token();
    $stmt = $db->prepare("DELETE FROM projects WHERE id = ?");
    $stmt->execute([$id]);
    json_response(['success' => true]);
}

error_response('Méthode non autorisée', 405);
