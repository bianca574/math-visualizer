export const categories = [
    {
      id: 'linear-algebra',
      label: 'Algèbre linéaire',
      topics: [
        { id: 'matrix-ops', label: 'Opérations sur les matrices', status: 'ready' },
        { id: 'determinants', label: 'Déterminants', status: 'planned' },
        { id: 'eigen', label: 'Valeurs et vecteurs propres', status: 'ready' },
        { id: 'transformations-2d', label: 'Transformations géométriques 2D', status: 'ready' },
        { id: 'transformations-3d', label: 'Transformations géométriques 3D', status: 'ready' },
      ],
    },
    {
      id: 'quadratic-forms',
      label: 'Formes quadratiques',
      topics: [
        { id: 'conics-quadrics', label: 'Coniques et quadriques', status: 'planned' },
        { id: 'signature', label: 'Signature', status: 'planned' },
        { id: 'gauss-reduction', label: 'Réduction de Gauss', status: 'planned' },
      ],
    },
    {
      id: 'sequences-series',
      label: 'Suites et séries',
      topics: [
        { id: 'epsilon-n', label: 'Convergence (définition ε-N)', status: 'planned' },
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