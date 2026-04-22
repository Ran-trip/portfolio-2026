<?php
require_once __DIR__ . '/../config.php';

$db = getDB();

$db->exec("
    CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT
    );

    CREATE TABLE IF NOT EXISTS projects (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titre TEXT NOT NULL,
        description TEXT,
        image TEXT,
        tags TEXT,
        github TEXT,
        demo TEXT,
        contexte TEXT,
        fonctionnalites TEXT,
        defis TEXT,
        duree TEXT,
        annee TEXT,
        ordre INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS competences (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nom TEXT NOT NULL,
        categorie TEXT NOT NULL,
        icone TEXT,
        ordre INTEGER DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS tokens (
        token TEXT PRIMARY KEY,
        expires_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS login_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        created_at INTEGER NOT NULL
    );

    CREATE TABLE IF NOT EXISTS contact_attempts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        ip TEXT NOT NULL,
        created_at INTEGER NOT NULL
    );
");

// Données par défaut
$defaults = [
    'nom'   => 'John Doe',
    'titre' => 'Développeur Web Freelance',
    'bio'   => 'Passionné par le développement web, je crée des applications modernes et performantes.',
    'email' => 'contact@example.com',
    'github'   => 'https://github.com',
    'linkedin' => 'https://linkedin.com',
    'logo'     => '',
    'autre_titre' => 'Chef de chantier',
    'autre_texte' => 'Avant de me consacrer au développement web, j\'ai exercé pendant plusieurs années en tant que chef de chantier dans le secteur du BTP.',
    'autre_image' => '',
];

$stmt = $db->prepare("INSERT OR IGNORE INTO settings (key, value) VALUES (?, ?)");
foreach ($defaults as $key => $value) {
    $stmt->execute([$key, $value]);
}

// Compétences par défaut
$competences = [
    ['React', 'frontend', 'FaReact'],
    ['Next.js', 'frontend', 'SiNextdotjs'],
    ['Vue.js', 'frontend', 'FaVuejs'],
    ['HTML', 'frontend', 'FaHtml5'],
    ['CSS', 'frontend', 'FaCss3Alt'],
    ['Node.js', 'backend', 'FaNodeJs'],
    ['PHP', 'backend', 'FaPhp'],
    ['MySQL', 'backend', 'SiMysql'],
    ['Docker', 'backend', 'FaDocker'],
    ['Python', 'backend', 'FaPython'],
];

$stmt = $db->prepare("INSERT OR IGNORE INTO competences (nom, categorie, icone) VALUES (?, ?, ?)");
foreach ($competences as $c) {
    $stmt->execute($c);
}

echo "Base de données initialisée avec succès.\n";
