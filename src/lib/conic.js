export function classifyConic(A, B, C) {
    const delta = B * B - 4 * A * C
    if (Math.abs(delta) < 1e-6) return 'parabole'
    return delta < 0 ? 'ellipse' : 'hyperbole'
  }
  
  // Samples the conic A x² + Bxy + Cy² + Dx + Ey + F = 0 by solving the
  // quadratic-in-y equation at each x. Returns scattered points, not an
  // ordered path — see the note in the component about why.
  export function conicPoints({ A, B, C, D, E, F }, xMin, xMax, samples = 400) {
    const points = []
    for (let i = 0; i <= samples; i++) {
      const x = xMin + ((xMax - xMin) * i) / samples
      const qa = C
      const qb = B * x + E
      const qc = A * x * x + D * x + F
      if (Math.abs(qa) < 1e-9) {
        if (Math.abs(qb) > 1e-9) points.push({ x, y: -qc / qb })
        continue
      }
      const disc = qb * qb - 4 * qa * qc
      if (disc < 0) continue
      const sq = Math.sqrt(disc)
      points.push({ x, y: (-qb + sq) / (2 * qa) })
      points.push({ x, y: (-qb - sq) / (2 * qa) })
    }
    return points
  }