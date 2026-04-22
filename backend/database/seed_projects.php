<?php
require_once __DIR__ . '/../config.php';

$db = getDB();

$projects = [
  [
    'titre'          => 'Application de gestion de tâches',
    'description'    => 'Une application web pour organiser et suivre ses tâches quotidiennes avec système de priorités.',
    'image'          => '',
    'tags'           => json_encode(['React', 'Node.js', 'MySQL']),
    'github'         => 'https://github.com',
    'demo'           => 'https://exemple.com',
    'contexte'       => 'Projet personnel développé pour répondre à un besoin concret d\'organisation. L\'objectif était de créer un outil simple, rapide et agréable à utiliser au quotidien.',
    'fonctionnalites'=> json_encode([
      'Création, modification et suppression de tâches',
      'Système de priorités (haute, moyenne, basse)',
      'Filtrage et recherche en temps réel',
      'Authentification utilisateur avec JWT',
      'Interface responsive mobile et desktop',
    ]),
    'defis'  => 'Le principal défi a été la synchronisation en temps réel entre le frontend et la base de données.',
    'duree'  => '3 semaines',
    'annee'  => '2024',
    'ordre'  => 1,
  ],
  [
    'titre'          => 'Site e-commerce',
    'description'    => 'Boutique en ligne complète avec panier, paiement Stripe et interface d\'administration.',
    'image'          => '',
    'tags'           => json_encode(['Next.js', 'PHP', 'MySQL']),
    'github'         => 'https://github.com',
    'demo'           => 'https://exemple.com',
    'contexte'       => 'Commande client pour une boutique de produits artisanaux. Le client souhaitait une solution complète incluant la gestion des stocks.',
    'fonctionnalites'=> json_encode([
      'Catalogue produits avec filtres et pagination',
      'Panier et tunnel d\'achat complet',
      'Paiement sécurisé via Stripe',
      'Gestion des commandes et stocks en backoffice',
      'Emails transactionnels automatiques',
    ]),
    'defis'  => 'L\'intégration des webhooks Stripe pour la confirmation des paiements.',
    'duree'  => '6 semaines',
    'annee'  => '2024',
    'ordre'  => 2,
  ],
  [
    'titre'          => 'Dashboard analytique',
    'description'    => 'Tableau de bord de visualisation de données en temps réel avec graphiques interactifs.',
    'image'          => '',
    'tags'           => json_encode(['React', 'Python', 'Docker']),
    'github'         => 'https://github.com',
    'demo'           => '',
    'contexte'       => 'Projet réalisé pour une startup souhaitant visualiser ses données métier en temps réel.',
    'fonctionnalites'=> json_encode([
      'Graphiques interactifs (courbes, barres, camemberts)',
      'Mise à jour des données en temps réel via WebSocket',
      'Export des rapports en PDF et CSV',
      'Système de filtres par période et catégorie',
      'Déploiement containerisé avec Docker',
    ]),
    'defis'  => 'La gestion de la performance avec de grands volumes de données.',
    'duree'  => '4 semaines',
    'annee'  => '2023',
    'ordre'  => 3,
  ],
];

$stmt = $db->prepare("INSERT INTO projects (titre, description, image, tags, github, demo, contexte, fonctionnalites, defis, duree, annee, ordre)
    VALUES (:titre, :description, :image, :tags, :github, :demo, :contexte, :fonctionnalites, :defis, :duree, :annee, :ordre)");

foreach ($projects as $p) {
    $stmt->execute($p);
}

echo "Projets insérés avec succès.\n";
