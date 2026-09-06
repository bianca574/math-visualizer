# Choix d'architecture — Math Visualizer

## Construction en versions

Le projet a été construit en quatre versions, chacune correspondant à une
release :

- **V1 — Fondation** : configuration du projet, structure générale, moteur de
  rendu 2D (`CoordinatePlane`), algèbre linéaire (matrices, déterminants,
  valeurs propres, transformations 2D puis 3D), formes quadratiques,
  convergence des suites.
- **V2 — Sujets** : séries entières, séries de fonctions, formes
  linéaires, produit scalaire et projection, endomorphismes symétriques,
  isométries en 2D et 3D, intégrales dépendant d'un paramètre, intégrales
  multiples, points critiques.
- **V3 — Interface** : mode clair/sombre, bascule FR/EN, saisie
  personnalisée de fonctions/séries/suites/intégrales (mathjs), onglets d'explication par sujet.
- **V4 — Documentation & tests** : README, DESIGN, LICENSE, suite de
  tests Vitest sur `src/lib/`.

## Séparation logique / rendu

`src/lib/` ne contient que des fonctions pures (déterminants, valeurs
propres, classification d'isométries, réduction de Gauss...), sans
dépendance à React ni au DOM. Les composants de rendu sont volontairement
réutilisables plutôt que réécrits par page :

- `CoordinatePlane` / `FunctionPlot` : SVG écrit à la main (pas de
  bibliothèque de graphiques), avec pan/zoom et transformation
  plan-vers-écran centralisée dans `lib/coordinates.js`. Nécessaire car
  aucune bibliothèque de graphiques standard ne gère nativement un tracé
  de vecteur, de ligne de niveau ou de bande de convergence.
- `Scene3D` : encapsule la configuration three.js commune (caméra,
  éclairage, `OrbitControls`, boucle de rendu) ; chaque page 3D fournit
  uniquement une fonction `build(content, THREE)` qui ajoute ses propres
  formes.

## Formes quadratiques : base propre plutôt que traçage numérique

`Signature` ne trace pas la ligne de niveau par une méthode numérique
générique. Comme les vecteurs propres d'une matrice symétrique sont
orthogonaux (théorème spectral), l'équation s'écrit sans terme croisé dans
la base propre (`λ1·u² + λ2·v² = k`) — une ellipse ou une hyperbole s'y
paramètre directement, puis se ramène au plan d'origine par rotation. Pour
les coniques générales (`ConicsQuadrics`), l'équation est résolue comme un
polynôme du second degré en y à x fixé, ce qui fait apparaître les deux
branches d'une hyperbole sans traitement de cas séparé.

## Internationalisation

Les chaînes d'interface (`lib/ui.js`) et les chaînes propres à chaque sujet
(`lib/topicStrings.js`) sont centralisées plutôt que dispersées dans les
composants, avec une clé par sujet correspondant exactement à l'`id` du
sujet dans `data/topics.js`. Cette correspondance stricte de clés a été la
source de plusieurs bugs pendant le développement (clé oubliée, faute de
frappe) — un rappel que la simplicité de cette approche a un coût de
rigueur.

## Saisie personnalisée : mathjs plutôt que `eval`

Les pages permettant de saisir sa propre fonction (suites, séries,
intégrales, points critiques, etc.) utilisent `mathjs.parse().compile()` plutôt
que `eval()`. mathjs ne comprend que la syntaxe mathématique — il est
structurellement incapable d'exécuter du code arbitraire, contrairement à
`eval`.

## Limite connue : le thème clair/sombre et three.js

Le thème repose sur des variables CSS (`--color-amber-accent`, etc.),
redéfinies dans `.theme-light`. Les éléments SVG y répondent automatiquement
(`stroke="var(--color-amber-accent)"`). Les scènes three.js, elles,
reçoivent leurs couleurs sous forme de nombres hexadécimaux figés au
moment de la construction de la scène (`0xe8a33d`) — sans lien vivant avec
les variables CSS. En conséquence, les pages 3D ne changent pas de palette
en mode clair. Corriger cela proprement demanderait que `Scene3D` lise le
thème courant et appelle `scene.background.set(...)` en conséquence — non
fait à ce jour.
