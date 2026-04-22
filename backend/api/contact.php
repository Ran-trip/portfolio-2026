<?php
require_once __DIR__ . '/../config.php';
require_once __DIR__ . '/../vendor/autoload.php';

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

if ($_SERVER['REQUEST_METHOD'] !== 'POST') error_response('Méthode non autorisée', 405);

// Rate limiting : 3 messages max toutes les 10 minutes par IP
$ip      = $_SERVER['REMOTE_ADDR'] ?? '0.0.0.0';
$db_rl   = getDB();
$now_rl  = time();
$window  = $now_rl - 600;
$db_rl->exec("DELETE FROM contact_attempts WHERE created_at < $window");
$stmt_rl = $db_rl->prepare("SELECT COUNT(*) FROM contact_attempts WHERE ip = ? AND created_at > ?");
$stmt_rl->execute([$ip, $window]);
if ((int) $stmt_rl->fetchColumn() >= 3) {
    error_response('Trop de messages envoyés. Réessayez dans 10 minutes.', 429);
}

$data = json_decode(file_get_contents('php://input'), true);

if (empty($data['nom']) || empty($data['email']) || empty($data['message'])) {
    error_response('Tous les champs sont requis');
}

if (!filter_var($data['email'], FILTER_VALIDATE_EMAIL)) {
    error_response('Email invalide');
}

$db = getDB();
$stmt = $db->query("SELECT value FROM settings WHERE key = 'email'");
$destinataire = $stmt->fetchColumn();

$mail = new PHPMailer(true);

try {
    $mail->isSMTP();
    $mail->Host       = SMTP_HOST;
    $mail->SMTPAuth   = true;
    $mail->Username   = SMTP_USER;
    $mail->Password   = SMTP_PASSWORD;
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
    $mail->Port       = SMTP_PORT;
    $mail->CharSet    = 'UTF-8';

    $mail->setFrom(SMTP_USER, 'Portfolio Contact');
    $mail->addAddress($destinataire);
    $mail->addReplyTo($data['email'], $data['nom']);

    $mail->Subject = 'Nouveau message de ' . $data['nom'];
    $mail->Body    = "Nom : {$data['nom']}\nEmail : {$data['email']}\n\n{$data['message']}";

    $mail->send();
    $stmt_save = $db_rl->prepare("INSERT INTO contact_attempts (ip, created_at) VALUES (?, ?)");
    $stmt_save->execute([$ip, $now_rl]);
    json_response(['success' => true]);

} catch (Exception $e) {
    error_response('Erreur lors de l\'envoi : ' . $mail->ErrorInfo, 500);
}
