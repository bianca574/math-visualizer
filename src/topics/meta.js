export const topicMeta = {
  'matrix-ops': {
    explanation: {
      fr: "Une matrice 2×2 agit sur le plan en envoyant les vecteurs de base (1,0) et (0,1) vers ses deux colonnes. Le parallélogramme qu'elles forment a pour aire signée exactement det(M) : positive si l'orientation est conservée, négative si elle est inversée.",
      en: "A 2×2 matrix acts on the plane by sending the basis vectors (1,0) and (0,1) to its two columns. The parallelogram they span has signed area exactly det(M): positive if orientation is preserved, negative if it's flipped.",
    },
  },
  eigen: {
    explanation: {
      fr: "Un vecteur propre est une direction que la matrice ne fait que dilater ou contracter (par le facteur λ), sans la faire tourner. Quand le discriminant du polynôme caractéristique est négatif, aucune direction réelle n'a cette propriété : la transformation comporte alors une rotation.",
      en: "An eigenvector is a direction the matrix only stretches or shrinks (by a factor λ) without rotating it. When the characteristic polynomial's discriminant is negative, no real direction has this property — the transformation involves a genuine rotation instead.",
    },
  },
  'transformations-2d': {
    explanation: {
      fr: "Toute transformation linéaire du plan se décompose en rotation, cisaillement et mise à l'échelle, composés dans un ordre précis. Comme la composition matricielle n'est pas commutative, changer l'ordre (échelle puis rotation, ou l'inverse) donne un résultat visuellement différent.",
      en: "Any linear transformation of the plane decomposes into rotation, shear, and scaling, composed in a specific order. Since matrix composition isn't commutative, changing that order (scale-then-rotate vs. the reverse) gives a visually different result.",
    },
  },
  'transformations-3d': {
    explanation: {
      fr: "Même idée qu'en 2D, étendue à trois dimensions : trois rotations (autour de X, Y, Z) et une mise à l'échelle sur trois axes, appliquées à un cube unité. L'ordre de composition compte encore plus en 3D, car les rotations autour d'axes différents ne commutent pas entre elles.",
      en: "Same idea as 2D, extended to three dimensions: three rotations (around X, Y, Z) and scaling along three axes, applied to a unit cube. Composition order matters even more in 3D, since rotations around different axes don't commute with each other.",
    },
  },
  determinants: {
    explanation: {
      fr: "En dimension 3, le déterminant est le volume signé du parallélépipède formé par les images des trois vecteurs de base — la généralisation directe de l'aire signée en 2D. Un signe négatif indique que la base image est indirecte.",
      en: "In three dimensions, the determinant is the signed volume of the parallelepiped formed by the images of the three basis vectors — the direct 3D generalization of signed area. A negative sign means the image basis is indirect (orientation-reversing).",
    },
  },
  signature: {
    explanation: {
      fr: "La signature d'une forme quadratique — le nombre de valeurs propres positives et négatives de sa matrice symétrique associée — détermine si sa ligne de niveau est une ellipse, une hyperbole, ou dégénérée. Elle se lit directement sur les valeurs propres, sans avoir besoin de tracer quoi que ce soit.",
      en: "A quadratic form's signature — the number of positive and negative eigenvalues of its associated symmetric matrix — determines whether its level curve is an ellipse, a hyperbola, or degenerate. It reads directly off the eigenvalues, no plotting required.",
    },
  },
  'gauss-reduction': {
    explanation: {
      fr: "L'algorithme complète le carré en x en premier si le coefficient a est non nul, sinon en y, sinon utilise la substitution x=u+v, y=u−v pour traiter le cas d'un terme croisé pur. Chaque cas correspond à une branche différente de l'algorithme.",
      en: "The algorithm completes the square in x first if the coefficient a is nonzero, otherwise in y, otherwise uses the x=u+v, y=u−v substitution to handle a pure cross-term. Each case is a different branch of the algorithm.",
    },
  },
  'conics-quadrics': {
    explanation: {
      fr: "Le signe de B²−4AC classe entièrement une conique générale : négatif pour une ellipse, nul pour une parabole, positif pour une hyperbole. La courbe est tracée en résolvant l'équation comme un polynôme du second degré en y, à x fixé.",
      en: "The sign of B²−4AC fully classifies a general conic: negative for an ellipse, zero for a parabola, positive for a hyperbola. The curve is drawn by solving the equation as a quadratic in y at each fixed x.",
    },
  },
  'epsilon-n': {
    explanation: {
      fr: "La définition ε-N de la convergence dit : pour tout ε, il existe un rang N tel que tous les termes suivants restent à distance ε de la limite. N est calculé en cherchant le plus petit rang à partir duquel c'est vrai pour tous les termes suivants, pas seulement les prochains.",
      en: "The ε-N definition of convergence says: for every ε, there's some N beyond which every term stays within ε of the limit. N is found by searching for the smallest such rank that holds for all following terms, not just the next few.",
    },
  },
  'power-series': {
    explanation: {
      fr: "À l'intérieur du rayon de convergence, la somme partielle se rapproche de la fonction cible à mesure que le nombre de termes augmente. À l'extérieur, rien ne garantit cette convergence — et pour certaines séries, la somme partielle diverge visiblement.",
      en: "Inside the radius of convergence, the partial sum gets closer to the target function as more terms are added. Outside it, nothing guarantees that — and for some series, the partial sum visibly diverges.",
    },
  },
  'function-series': {
    explanation: {
      fr: "Une suite de fonctions peut converger simplement (en chaque point) sans converger uniformément (le pire écart entre fₙ et la limite ne tend pas vers 0). Le second graphique trace justement cet écart maximal en fonction de n : s'il plafonne au-dessus de 0, la convergence n'est pas uniforme, même si elle semble l'être visuellement.",
      en: "A sequence of functions can converge pointwise (at every single point) without converging uniformly (the worst-case gap between fₙ and the limit doesn't shrink to 0). The second plot tracks exactly that worst-case gap against n — if it plateaus above 0, convergence isn't uniform, even if it visually looks like it is.",
    },
  },
  'linear-forms': {
    explanation: {
      fr: "Une forme linéaire φ(x,y)=ax+by est représentée par le vecteur (a,b) via le produit scalaire. Son noyau — l'ensemble où φ s'annule — est toujours la droite perpendiculaire à ce vecteur, obtenue en le faisant tourner de 90°.",
      en: "A linear form φ(x,y)=ax+by is represented by the vector (a,b) via the dot product. Its kernel — where φ vanishes — is always the line perpendicular to that vector, obtained by rotating it 90°.",
    },
  },
  'dot-product-projection': {
    explanation: {
      fr: "La projection orthogonale de v sur u vaut (⟨v,u⟩/⟨u,u⟩)·u — un multiple scalaire de u. Le segment reliant v à sa projection est toujours perpendiculaire à u, et la projection s'annule exactement quand u et v sont orthogonaux.",
      en: "The orthogonal projection of v onto u equals (⟨v,u⟩/⟨u,u⟩)·u — a scalar multiple of u. The segment connecting v to its projection is always perpendicular to u, and the projection vanishes exactly when u and v are orthogonal.",
    },
  },
  'symmetric-endomorphisms': {
    explanation: {
      fr: "Le théorème spectral garantit que toute matrice symétrique réelle a des valeurs propres réelles, et que les vecteurs propres associés à des valeurs propres distinctes sont orthogonaux entre eux — une propriété qui échoue en général pour une matrice quelconque.",
      en: "The spectral theorem guarantees that a real symmetric matrix always has real eigenvalues, and that eigenvectors for distinct eigenvalues are orthogonal to each other — a property that generally fails for an arbitrary matrix.",
    },
  },
  isometries: {
    explanation: {
      fr: "En 2D, une isométrie linéaire est une rotation (det=+1) ou une réflexion (det=-1), sans troisième cas. En 3D, det=-1 donne une antirotation — combinaison d'une rotation et d'une réflexion par le plan perpendiculaire à son axe — dont la réflexion pure et la symétrie centrale sont deux cas particuliers (angle 180° et 0°).",
      en: "In 2D, a linear isometry is either a rotation (det=+1) or a reflection (det=-1), with no third case. In 3D, det=-1 gives an antirotation — a rotation combined with a reflection through the perpendicular plane — of which pure reflection and central symmetry are special cases (angle 180° and 0°).",
    },
  },
  'parametric-integrals': {
    explanation: {
      fr: "I(t)=∫f(x,t)dx est calculée numériquement par la méthode des trapèzes pour chaque t, puis comparée à sa formule connue. Les deux courbes devraient coïncider presque parfaitement si l'intégration numérique fonctionne correctement.",
      en: "I(t)=∫f(x,t)dx is computed numerically via the trapezoidal rule for each t, then compared against its known closed form. The two curves should nearly perfectly coincide if the numerical integration is working correctly.",
    },
  },
  'multiple-integrals': {
    explanation: {
      fr: "Une somme de Riemann double approxime ∬f(x,y)dA en découpant le domaine en petites cellules et en traitant f comme constante sur chacune — chaque prisme représente un terme de cette somme. Plus la grille est fine, plus la somme se rapproche de la valeur exacte.",
      en: "A double Riemann sum approximates ∬f(x,y)dA by chopping the domain into small cells and treating f as constant on each one — each prism is one term of that sum. Finer grids bring the sum closer to the exact value.",
    },
  },
  'critical-points': {
    explanation: {
      fr: "Un point critique est un point où le gradient s'annule — plus de direction de plus forte pente. Le test des dérivées secondes (signe de D=fxx·fyy−fxy² et de fxx) classe alors le point en minimum, maximum, ou selle, mais uniquement là où le gradient est effectivement nul.",
      en: "A critical point is where the gradient vanishes — no direction of steepest ascent remains. The second-derivative test (sign of D=fxx·fyy−fxy² and of fxx) then classifies the point as a minimum, maximum, or saddle — but only where the gradient is actually zero.",
    },
  },
}