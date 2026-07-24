export const categories = [
    {
      id: 'linear-algebra',
      label: 'Algèbre linéaire',
      topics: [
        { id: 'matrix-ops', label: 'Opérations sur les matrices', status: 'ready' },
        { id: 'determinants', label: 'Déterminants', status: 'ready' },
        { id: 'eigen', label: 'Valeurs et vecteurs propres', status: 'ready' },
        { id: 'formes-lineaires', label: 'Formes linéaires', status: 'planned' },
        { id: 'transformations-2d', label: 'Transformations géométriques 2D', status: 'ready' },
        { id: 'transformations-3d', label: 'Transformations géométriques 3D', status: 'ready' },
      ],
    },
    {
      id: 'euclidean-spaces',
      label: 'Espaces euclidiens',
      topics: [
        { id: 'dot-product-projection', label: 'Produit scalaire et projection', status: 'planned' },
        { id: 'symmetric-endomorphisms', label: 'Endomorphismes symétriques', status: 'planned' },
        { id: 'isometries', label: 'Isométries en dimension 2 et 3', status: 'planned' },
      ],
    },
    {
      id: 'quadratic-forms',
      label: 'Formes quadratiques',
      topics: [
        { id: 'conics-quadrics', label: 'Coniques et quadriques', status: 'ready' },
        { id: 'signature', label: 'Signature', status: 'ready' },
        { id: 'gauss-reduction', label: 'Réduction de Gauss', status: 'ready' },
      ],
    },
    {
      id: 'sequences-series',
      label: 'Suites et séries',
      topics: [
        { id: 'epsilon-n', label: 'Convergence (définition ε-N)', status: 'planned' },
        { id: 'function-series', label: 'Séries de fonctions', status: 'planned' },
        { id: 'power-series', label: 'Séries entières', status: 'planned' },
      ],
    },
    {
      id: 'fourier',
      label: 'Séries de Fourier',
      topics: [
        { id: 'partial-sums', label: 'Sommes partielles interactives', status: 'planned' },
        { id: 'gibbs', label: 'Phénomène de Gibbs', status: 'planned' },
      ],
    },
    {
      id: 'multivariable-analysis',
      label: 'Analyse à plusieurs variables',
      topics: [
        { id: 'parametric-integrals', label: 'Intégrales dépendant d\'un paramètre', status: 'planned' },
        { id: 'multiple-integrals', label: 'Intégrales multiples', status: 'planned' },
        { id: 'critical-points', label: 'Points critiques (plusieurs variables)', status: 'planned' },
      ],
    },
    {
      id: 'odes',
      label: 'Équations différentielles',
      topics: [
        { id: 'direction-fields', label: 'Champ de directions', status: 'planned' },
        { id: 'phase-portraits', label: 'Portraits de phase', status: 'planned' },
        { id: 'solution-curves', label: 'Courbes solutions', status: 'planned' },
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