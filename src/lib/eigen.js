function normalize(x, y) {
    const len = Math.sqrt(x * x + y * y)
    if (len < 1e-9) return { x: 0, y: 0 }
    return { x: x / len, y: y / len }
  }
  
  function eigenvectorFor(a, b, c, d, lambda) {
    if (Math.abs(b) > 1e-9) return normalize(b, lambda - a)
    if (Math.abs(c) > 1e-9) return normalize(lambda - d, c)
    // diagonal matrix: eigenvalues ARE a and d, along e1/e2 respectively
    return Math.abs(lambda - a) < Math.abs(lambda - d) ? { x: 1, y: 0 } : { x: 0, y: 1 }
  }
  
  export function eigen2(m) {
    const a = m[0][0], b = m[0][1], c = m[1][0], d = m[1][1]
    const trace = a + d
    const det = a * d - b * c
    const disc = trace * trace - 4 * det
  
    if (disc < 0) return { real: false, trace, det }
  
    const sqrtDisc = Math.sqrt(disc)
    const l1 = (trace + sqrtDisc) / 2
    const l2 = (trace - sqrtDisc) / 2
  
    return { real: true, l1, l2, v1: eigenvectorFor(a, b, c, d, l1), v2: eigenvectorFor(a, b, c, d, l2) }
  }