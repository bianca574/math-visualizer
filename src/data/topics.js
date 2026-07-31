export const categories = [
    {
      id: 'linear-algebra',
      label: 'Algèbre linéaire',
      labelEn: 'Linear algebra',
      topics: [
        { id: 'matrix-ops', label: 'Opérations sur les matrices', labelEn: 'Matrix operations', status: 'ready' },
        { id: 'determinants', label: 'Déterminants', labelEn: 'Determinants', status: 'ready' },
        { id: 'eigen', label: 'Valeurs et vecteurs propres', labelEn: 'Eigenvalues and eigenvectors', status: 'ready' },
        { id: 'linear-forms', label: 'Formes linéaires', labelEn: 'Linear forms', status: 'ready' },
        { id: 'transformations-2d', label: 'Transformations géométriques 2D', labelEn: '2D geometric transformations', status: 'ready' },
        { id: 'transformations-3d', label: 'Transformations géométriques 3D', labelEn: '3D geometric transformations', status: 'ready' },
      ],
    },
    {
      id: 'euclidean-spaces',
      label: 'Espaces euclidiens',
      labelEn: 'Euclidean spaces',
      topics: [
        { id: 'dot-product-projection', label: 'Produit scalaire et projection', labelEn: 'Dot product and projection', status: 'ready' },
        { id: 'symmetric-endomorphisms', label: 'Endomorphismes symétriques', labelEn: 'Symmetric endomorphisms', status: 'ready' },
        { id: 'isometries', label: 'Isométries en dimension 2 et 3', labelEn: 'Isometries in 2D and 3D', status: 'ready' },
      ],
    },
    {
      id: 'quadratic-forms',
      label: 'Formes quadratiques',
      labelEn: 'Quadratic forms',
      topics: [
        { id: 'conics-quadrics', label: 'Coniques et quadriques', labelEn: 'Conics and quadrics', status: 'ready' },
        { id: 'signature', label: 'Signature', labelEn: 'Signature', status: 'ready' },
        { id: 'gauss-reduction', label: 'Réduction de Gauss', labelEn: 'Gauss reduction', status: 'ready' },
      ],
    },
    {
      id: 'sequences-series',
      label: 'Suites et séries',
      labelEn: 'Sequences and series',
      topics: [
        { id: 'epsilon-n', label: 'Convergence (définition ε-N)', labelEn: 'Convergence (ε-N definition)', status: 'ready' },
        { id: 'function-series', label: 'Séries de fonctions', labelEn: 'Function series', status: 'ready' },
        { id: 'power-series', label: 'Séries entières', labelEn: 'Power series', status: 'ready' },
      ],
    },
    {
      id: 'multivariable-analysis',
      label: 'Analyse à plusieurs variables',
      labelEn: 'Multivariable analysis',
      topics: [
        { id: 'parametric-integrals', label: 'Intégrales dépendant d\'un paramètre', labelEn: 'Parameter-dependent integrals', status: 'ready' },
        { id: 'multiple-integrals', label: 'Intégrales multiples', labelEn: 'Multiple integrals', status: 'ready' },
        { id: 'critical-points', label: 'Points critiques (plusieurs variables)', labelEn: 'Critical points (multivariable functions)', status: 'ready' },
      ],
    },
  ]
  
  export function findTopic(topicId) {
    for (const category of categories) {
      const topic = category.topics.find((t) => t.id === topicId)
      if (topic) return { category, topic }
    }
    return null
  }