export const topicStrings = {
    'matrix-ops': {
      fr: {
        detNegative: "Le déterminant est négatif : l'orientation du plan est inversée.",
        detPositive: "Le déterminant est l'aire signée du parallélogramme formé par Me₁ et Me₂.",
      },
      en: {
        detNegative: 'The determinant is negative: the plane\u2019s orientation is reversed.',
        detPositive: 'The determinant is the signed area of the parallelogram formed by Me\u2081 and Me\u2082.',
      },
    },
    eigen: {
      fr: {
        noReal: 'Pas de valeurs propres réelles — la transformation comporte une rotation.',
        help: "Les droites en pointillés sont les directions propres : tout vecteur porté par l'une d'elles reste sur la même droite après transformation, seule sa longueur change (facteur λ).",
      },
      en: {
        noReal: 'No real eigenvalues — the transformation includes a rotation.',
        help: 'The dashed lines are the eigen-directions: any vector along one of them stays on the same line after the transformation — only its length changes (factor λ).',
      },
    },
    'transformations-2d': {
      fr: { rotation: 'Rotation θ (°)', scaleX: 'Echelle x', scaleY: 'Echelle y', shear: 'Cisaillement' },
      en: { rotation: 'Rotation θ (°)', scaleX: 'Scale x', scaleY: 'Scale y', shear: 'Shear' },
    },
    'transformations-3d': {
      fr: {
        rotX: 'Rotation X (°)', rotY: 'Rotation Y (°)', rotZ: 'Rotation Z (°)',
        scaleX: 'Echelle x', scaleY: 'Echelle y', scaleZ: 'Echelle z',
        help: "Glisse la souris pour tourner la caméra, molette pour zoomer. Les flèches sont Me₁ (ambre), Me₂ (bleu), Me₃ (vert) ; le fil représente le cube unité transformé.",
      },
      en: {
        rotX: 'Rotation X (°)', rotY: 'Rotation Y (°)', rotZ: 'Rotation Z (°)',
        scaleX: 'Scale x', scaleY: 'Scale y', scaleZ: 'Scale z',
        help: 'Drag to orbit the camera, scroll to zoom. The arrows are Me\u2081 (amber), Me\u2082 (blue), Me\u2083 (green); the wireframe is the transformed unit cube.',
      },
    },
    determinants: {
      fr: {
        intro: "En 2D (voir \u00abOpérations sur les matrices\u00bb), le déterminant est l'aire signée du parallélogramme image. En 3D, c'est le volume signé du parallélépipède formé par les images des trois vecteurs de base.",
        negative: 'Signe négatif : la base image est indirecte (orientation inversée).',
        positive: 'Le volume du parallélépipède vaut |det(M)|.',
      },
      en: {
        intro: 'In 2D (see "Matrix Operations"), the determinant is the signed area of the image parallelogram. In 3D, it\u2019s the signed volume of the parallelepiped formed by the images of the three basis vectors.',
        negative: 'Negative sign: the image basis is indirect (orientation reversed).',
        positive: 'The parallelepiped\u2019s volume equals |det(M)|.',
      },
    },
    signature: {
      fr: { help: 'La courbe tracée est la ligne de niveau Q(x, y) = ±1 : ellipse, hyperbole, ou dégénérée selon les signes de λ₁ et λ₂.' },
      en: { help: 'The curve drawn is the level line Q(x, y) = ±1: ellipse, hyperbola, or degenerate depending on the signs of λ\u2081 and λ\u2082.' },
    },
    'conics-quadrics': {
      fr: { typeLabel: 'Type', help: 'Le type ne dépend que de B² − 4AC : négatif → ellipse, nul → parabole, positif → hyperbole.' },
      en: { typeLabel: 'Type', help: 'The type depends only on B² − 4AC: negative → ellipse, zero → parabola, positive → hyperbola.' },
    },
    'epsilon-n': {
      fr: {
        sequenceLabel: 'Suite', limitLabel: 'Limite L =', nLabel: 'N =', notFound: 'Non trouvé ≤ 500',
        help: "Pour l'ε choisi, N est le plus petit rang à partir duquel tous les termes restent dans la bande [L-ε, L+ε]. Diminue ε pour voir N augmenter.",
        customLabel: 'ou saisis ta propre suite uₙ =', 
        customPlaceholder: 'ex : 1/n, (n+1)/n, sin(n)/n' 
      },
      en: {
        sequenceLabel: 'Sequence', limitLabel: 'Limit L =', nLabel: 'N =', notFound: 'Not found ≤ 500',
        help: 'For the chosen ε, N is the smallest rank beyond which every term stays within the band [L-ε, L+ε]. Lower ε to see N grow.',
        customLabel: 'or enter your own sequence uₙ =', 
        customPlaceholder: 'e.g. 1/n, (n+1)/n, sin(n)/n' 
      },
    },
    'power-series': {
      fr: {
        seriesLabel: 'Série', termsLabel: 'Nombre de termes', radiusLabel: 'Rayon de convergence R =',
        help: "Bleu pointillé : la fonction cible. Ambre : la somme partielle des N premiers termes. La bande grisée marque l'intervalle de convergence (-R, R) — en dehors, la somme partielle n'a aucune raison de s'approcher de la cible, même si le polynôme reste bien défini.",
        customLabel: 'ou saisis ton propre coefficient aₙ =', 
        customPlaceholder: 'ex : 1/n!, 1/(n+1), (-1)^n/n' 
      },
      en: {
        seriesLabel: 'Series', termsLabel: 'Number of terms', radiusLabel: 'Radius of convergence R =',
        help: 'Dashed blue: the target function. Amber: the partial sum of the first N terms. The shaded band marks the interval of convergence (-R, R) — outside it, the partial sum has no reason to approach the target, even though the polynomial itself is still well-defined.',
        customLabel: 'or enter your own coefficient aₙ =', 
        customPlaceholder: 'e.g. 1/n!, 1/(n+1), (-1)^n/n' 
      },
    },
    'function-series': {
      fr: {
        fnLabel: 'Fonction', uniform: 'Convergence uniforme', nonUniform: 'Convergence simple seulement',
        errNote: "sup|fₙ − f| en fonction de n — si la courbe tend vers 0, la convergence est uniforme ; si elle plafonne au-dessus de 0, elle ne l'est pas.",
        customLabel: 'ou saisis ta propre fₙ(x, n) =', customPlaceholder: 'ex : x^n, sin(n*x)/sqrt(n)', domainLabel: 'domaine [a, b]'
      },
      en: {
        fnLabel: 'Function', uniform: 'Uniform convergence', nonUniform: 'Pointwise convergence only',
        errNote: 'sup|fₙ − f| as a function of n — if the curve tends to 0, convergence is uniform; if it plateaus above 0, it isn\u2019t.',
        customLabel: 'or enter your own fₙ(x, n) =', customPlaceholder: 'e.g. x^n, sin(n*x)/sqrt(n)', domainLabel: 'domain [a, b]' 
      },
    },
    'linear-forms': {
      fr: {
        coefficientsLabel: 'Coefficients a, b :',
        pointLabel: 'Point v = (x, y) — déplace-le :',
        help: "La droite en pointillés est le noyau de φ (où φ(v) = 0), toujours perpendiculaire au vecteur (a, b) qui représente φ. Chaque droite parallèle au noyau est une ligne de niveau de φ.",
      },
      en: {
        coefficientsLabel: 'Coefficients a, b:',
        pointLabel: 'Point v = (x, y) — drag it:',
        help: 'The dashed line is the kernel of φ (where φ(v) = 0), always perpendicular to the vector (a, b) that represents φ. Every line parallel to the kernel is a level line of φ.',
      },
    },
    'dot-product-projection': {
      fr: {
        moveLabel: 'Déplace u et v :',
        help: '\u27e8u,v\u27e9 = 0 (u et v orthogonaux) exactement quand la projection s\u2019annule. Le segment vert relie v à sa projection : il est toujours perpendiculaire à u.',
      },
      en: {
        moveLabel: 'Drag u and v:',
        help: '\u27e8u,v\u27e9 = 0 (u and v orthogonal) exactly when the projection vanishes. The green segment connects v to its projection: it is always perpendicular to u.',
      },
    },
    'symmetric-endomorphisms': {
      fr: {
        matrixNote: 'M = [[a, b], [b, c]] — toujours symétrique par construction',
        unexpected: 'Cas imprévu — une matrice symétrique réelle a toujours des valeurs propres réelles.',
        help: "C'est le théorème spectral : pour une matrice symétrique réelle, les valeurs propres sont toujours réelles (pas de cas \u00abpas de solution réelle\u00bb comme pour une matrice quelconque) et les vecteurs propres associés à des valeurs propres distinctes sont toujours orthogonaux — \u27e8v\u2081,v\u2082\u27e9 reste à 0 quels que soient a, b, c.",
      },
      en: {
        matrixNote: 'M = [[a, b], [b, c]] — always symmetric by construction',
        unexpected: 'Unexpected case — a real symmetric matrix always has real eigenvalues.',
        help: 'This is the spectral theorem: for a real symmetric matrix, the eigenvalues are always real (no \u201cno real solution\u201d case like for a general matrix) and eigenvectors for distinct eigenvalues are always orthogonal — \u27e8v\u2081,v\u2082\u27e9 stays at 0 regardless of a, b, c.',
      },
    },
    isometries: {
      fr: {
        notIsometry: "Cette matrice ne préserve pas les longueurs — ce n'est pas une isométrie.",
        rotationOf: 'Rotation',
        angleWord: "d'angle",
        reflectionOf: 'Réflexion',
        axisAt: 'axe à',
        ofHorizontal: "de l'horizontale",
        help2D: "En dimension 2, det = +1 donne toujours une rotation, det = -1 donne toujours une réflexion — il n'y a pas de troisième cas.",
        aroundAxis: "autour de l'axe (flèche)",
        angleLabel: 'angle',
        help3D: 'det = +1 → rotation autour de l\u2019axe indiqué. det = -1 → antirotation : le plan bleu est le plan de réflexion perpendiculaire à l\u2019axe. À 0°, c\u2019est une symétrie centrale ; à 180°, une réflexion pure.',
        subtypeInversion: 'Symétrie rotatoire (θ = 0° — symétrie centrale)',
        subtypeReflection: 'Symétrie orthogonale (réflexion par rapport à un plan)',
        subtypeAntirotation: 'Symétrie rotatoire',
      },
      en: {
        notIsometry: 'This matrix does not preserve lengths — it is not an isometry.',
        rotationOf: 'Rotation',
        angleWord: 'of angle',
        reflectionOf: 'Reflection',
        axisAt: 'axis at',
        ofHorizontal: 'from horizontal',
        help2D: 'In 2D, det = +1 always gives a rotation, det = -1 always gives a reflection — there is no third case.',
        aroundAxis: 'around the axis (arrow)',
        angleLabel: 'angle',
        help3D: 'det = +1 → rotation around the shown axis. det = -1 → antirotation: the blue plane is the reflection plane perpendicular to the axis. At 0\u00b0, it\u2019s central symmetry; at 180\u00b0, a pure reflection.',
        subtypeInversion: 'Rotary symmetry (θ = 0\u00b0 — central symmetry)',
        subtypeReflection: 'Orthogonal symmetry (reflection through a plane)',
        subtypeAntirotation: 'Rotary symmetry',
      },
    },
    'parametric-integrals': {
      fr: {
        integralLabel: 'Intégrale',
        help: "Ci-contre : f(x,t) pour le t actuel — l'aire ambrée est I(t). En dessous : I(t) en fonction de t, calculée numériquement (ambre) contre la formule connue (bleu pointillé, souvent superposée à l'ambre) — la position sur cette courbe pour le t actuel est marquée d'un point.",
        customLabel: 'ou saisis f(x,t) =', customPlaceholder: 'ex : x^t, sin(x+t)', domainLabel: 'domaine en x [a, b]', tRangeLabel: 'plage de t'
      },
      en: {
        integralLabel: 'Integral',
        help: 'Alongside: f(x,t) for the current t — the amber area is I(t). Below: I(t) as a function of t, computed numerically (amber) against the known formula (dashed blue, often overlapping amber) — the current t\u2019s position on that curve is marked with a dot.',
        customLabel: 'ou saisis f(x,t) =', customPlaceholder: 'ex : x^t, sin(x+t)', domainLabel: 'domaine en x [a, b]', tRangeLabel: 'plage de t'
      },
    },
    'multiple-integrals': {
      fr: {
        fnLabel: 'Fonction', subdivLabel: 'Subdivisions par côté (n)',
        riemannLabel: 'Somme de Riemann (n×n) ≈', refLabel: 'Valeur de référence ≈',
        help: "Chaque prisme a pour base une cellule de la grille et pour hauteur |f(milieu de la cellule)| — bleu si f y est négative. Augmente n pour voir la somme de Riemann se rapprocher de la valeur de référence.",
        customLabel: 'ou saisis f(x,y) =', customPlaceholder: 'ex : x^2+y^2, sin(x)*cos(y)', domainLabel: 'domaine [xMin,xMax]×[yMin,yMax]'
      },
      en: {
        fnLabel: 'Function', subdivLabel: 'Subdivisions per side (n)',
        riemannLabel: 'Riemann sum (n\u00d7n) \u2248', refLabel: 'Reference value \u2248',
        help: 'Each prism has a grid cell as its base and |f(cell midpoint)| as its height — blue if f is negative there. Increase n to watch the Riemann sum approach the reference value.',
        customLabel: 'or enter f(x,y) =', customPlaceholder: 'e.g. x^2+y^2, sin(x)*cos(y)', domainLabel: 'domain [xMin,xMax]×[yMin,yMax]'
      },
    },
    'critical-points': {
      fr: {
        fnLabel: 'Fonction',
        notCritical: (mag) => `Pas encore un point critique (\u2016\u2207f\u2016 \u2248 ${mag}) — ajuste x et y jusqu'à annuler la flèche bleue.`,
        help: "Le test des dérivées secondes (signe de D et de fxx) ne classe le point que là où le gradient s'annule — ailleurs, D et fxx décrivent juste la courbure locale, pas la nature d'un extremum.",
        labelMin: 'Minimum local', labelMax: 'Maximum local', labelSaddle: 'Point selle', labelIndeterminate: 'Indéterminé (D \u2248 0)',
        customLabel: 'ou saisis f(x,y) =', customPlaceholder: 'ex : x^2-y^2, x^3-3*x*y^2' 
      },
      en: {
        fnLabel: 'Function',
        notCritical: (mag) => `Not yet a critical point (\u2016\u2207f\u2016 \u2248 ${mag}) — adjust x and y until the blue arrow vanishes.`,
        help: 'The second-derivative test (sign of D and of fxx) only classifies the point where the gradient actually vanishes — elsewhere, D and fxx just describe the local curvature, not the nature of an extremum.',
        labelMin: 'Local minimum', labelMax: 'Local maximum', labelSaddle: 'Saddle point', labelIndeterminate: 'Indeterminate (D \u2248 0)',
        customLabel: 'or enter f(x,y) =', customPlaceholder: 'e.g. x^2-y^2, x^3-3*x*y^2' 
      },
    },
  }