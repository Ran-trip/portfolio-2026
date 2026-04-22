# Portfolio Personnel

Site portfolio personnel avec backoffice d'administration.

## Stack technique

- **Frontend** : React (Vite), Tailwind CSS
- **Backend** : PHP (API REST)
- **Base de données** : SQLite

## Fonctionnalités

- Pages : Accueil, À propos, Projets, Détail projet, Contact, 404
- Backoffice accessible via `/portail-gestion` (protégé par mot de passe)
- Gestion des projets, compétences et paramètres depuis le navigateur
- Upload d'images
- Formulaire de contact par email (SMTP)

## Installation

### Prérequis

- Node.js 20+
- PHP 8+
- Composer

### Backend

```bash
cd backend
composer install
cp .env.example.php .env.php
# Remplir .env.php avec le hash du mot de passe et la config SMTP
php database/init.php
php -S localhost:8000
```

Pour générer un hash de mot de passe :
```bash
php -r "echo password_hash('votre_mot_de_passe', PASSWORD_BCRYPT);"
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

L'application est accessible sur `http://localhost:5173`.

## Structure du projet

```
├── frontend/          # React (Vite)
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── context/
│   │   └── api.js
│   └── package.json
├── backend/           # PHP
│   ├── api/           # Endpoints REST
│   ├── database/      # SQLite + init
│   ├── uploads/       # Images uploadées
│   ├── config.php
│   └── .env.example.php
└── README.md
```

## Backoffice

Accessible via `/portail-gestion`. Permet de modifier :
- Les informations personnelles (nom, bio, liens)
- Le logo et les photos
- Les projets
- Les compétences
- Le mot de passe administrateur
