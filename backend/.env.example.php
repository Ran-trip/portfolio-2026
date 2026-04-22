<?php
// Copier ce fichier en .env.php et remplir les valeurs
// Générer un hash : php -r "echo password_hash('votre_mot_de_passe', PASSWORD_BCRYPT);"
define('ADMIN_PASSWORD', 'VOTRE_HASH_BCRYPT_ICI');

// Configuration SMTP
define('SMTP_HOST',     'smtp.gmail.com');
define('SMTP_PORT',     587);
define('SMTP_USER',     'votre.email@gmail.com');
define('SMTP_PASSWORD', 'votre_mot_de_passe_app');
