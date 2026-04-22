<?php
require_once __DIR__ . '/../config.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error_response('Méthode non autorisée', 405);

verify_token();

if (empty($_FILES['image'])) error_response('Aucun fichier envoyé');

$file = $_FILES['image'];
$ext  = strtolower(pathinfo($file['name'], PATHINFO_EXTENSION));
$allowedExts  = ['jpg', 'jpeg', 'png', 'webp', 'gif'];
$allowedMimes = ['image/jpeg', 'image/png', 'image/webp', 'image/gif'];

if (!in_array($ext, $allowedExts)) error_response('Format non autorisé');
if ($file['size'] > 5 * 1024 * 1024) error_response('Fichier trop volumineux (max 5Mo)');

$finfo = finfo_open(FILEINFO_MIME_TYPE);
$mime  = finfo_file($finfo, $file['tmp_name']);
finfo_close($finfo);
if (!in_array($mime, $allowedMimes)) error_response('Type de fichier non autorisé');

$nom = uniqid('img_', true) . '.' . $ext;
$destination = UPLOADS_PATH . $nom;

if (!move_uploaded_file($file['tmp_name'], $destination)) {
    error_response('Erreur lors de l\'upload', 500);
}

json_response(['url' => '/backend/uploads/' . $nom]);
