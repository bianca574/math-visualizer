# Math Visualizer (Juillet - Septembre 2026)

Plateforme de visualisation interactive pour les licences de math :
algèbre linéaire, espaces euclidiens, formes quadratiques, suites et séries,
et analyse à plusieurs variables. Chaque notion a sa propre visualisation
manipulable plutôt qu'une explication statique.

Démo en ligne : https://math-visualizer-orcin.vercel.app/

## Documentation

- DESIGN : choix d'architecture du projet
- LICENSE : licence du projet

## Aperçu

![Accueil](screenshots/home.png)
![Opérations sur les matrices](screenshots/matrix-ops.png)
![Transformations 3D](screenshots/transformations-3d.png)

## Stack technique

- React + Vite
- Tailwind CSS v4 (thème par variables CSS, sans fichier de config séparé)
- React Router
- three.js (scènes 3D)
- KaTeX (rendu des formules)
- mathjs (analyse sûre des fonctions saisies par l'utilisateur)
- Vitest (tests)
- GitHub Actions (lint, test, build)
- Déployé sur Vercel

## Lancer le projet en local

Prérequis : Node 20+.

```bash
npm install
npm run dev
```

Aucune variable d'environnement n'est nécessaire — l'application est
entièrement côté client, sans backend.

## Tests

```bash
npm run test
```

## Build

```bash
npm run build
```

## Lint

```bash
npm run lint
```
