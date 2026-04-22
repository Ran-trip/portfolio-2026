# Portfolio Project

## Objectif
Site portfolio personnel — présentation de projets, compétences et contact.

## Pages
- Accueil
- À propos
- Projets
- Détail projet (une page par projet)
- Contact
- 404

## Stack technique
- React (Vite) — JavaScript uniquement, pas de TypeScript
- Tailwind CSS
- Backend : PHP (API REST)
- Base de données : SQLite

## Architecture
- **Frontend public** : portfolio visible par les visiteurs
- **Backoffice** : page admin accessible via `/portail-gestion`
  - Modification des textes et photos directement depuis le navigateur
  - Protégé par mot de passe
- **Backend PHP** : API REST qui gère le contenu (lecture, modification des textes et images)

## Charte graphique

### Couleurs
- Primaire : #1A1A2E
- Secondaire : #E94560
- Fond : #F5F5F5
- Texte : #333333

### Typographie
- Titres (h1, h2, h3) : Libre Bodoni, serif
- Corps : Roboto, sans-serif
- Taille de base : 16px

### Style général
- Design sobre et professionnel
- Pas d'animations excessives
- Espacements généreux
- Mobile first

## Règles de travail
- Travailler uniquement dans `Bureau/New_project/`
- Avancer par petites étapes, une fonctionnalité à la fois
- Attendre validation avant de passer à l'étape suivante

## Structure du projet

```
New_project/
├── CLAUDE.md
├── frontend/                  # React (Vite)
│   ├── public/
│   │   └── images/            # images statiques
│   ├── src/
│   │   ├── components/        # composants réutilisables (Navbar, Footer, ProjectCard)
│   │   ├── pages/             # une page = un composant
│   │   │   ├── Home.jsx
│   │   │   ├── About.jsx
│   │   │   ├── Projects.jsx
│   │   │   ├── ProjectDetail.jsx
│   │   │   ├── Contact.jsx
│   │   │   ├── Admin.jsx      # backoffice
│   │   │   └── NotFound.jsx   # page 404
│   │   ├── data/              # contenu statique de secours
│   │   ├── styles/            # CSS globaux
│   │   └── App.jsx            # routes principales
│   └── package.json
├── backend/                   # PHP
│   ├── api/                   # endpoints REST
│   ├── uploads/               # images uploadées via le backoffice
│   ├── database/
│   │   └── portfolio.db       # base SQLite
│   └── config.php
└── .gitignore
```
