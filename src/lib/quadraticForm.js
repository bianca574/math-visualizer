import { eigen2 } from './eigen'

export function classifySignature(a, b, c, lang = 'fr') {
  const { l1, l2 } = eigen2([[a, b], [b, c]])
  const round = (x) => Math.round(x * 1e6) / 1e6
  const s1 = Math.sign(round(l1))
  const s2 = Math.sign(round(l2))
  const positives = [s1, s2].filter((s) => s > 0).length
  const negatives = [s1, s2].filter((s) => s < 0).length

  const labels = {
    fr: { pos: 'définie positive', neg: 'définie négative', mixed: 'indéfinie (signature mixte)', deg: 'dégénérée (au moins une valeur propre nulle)' },
    en: { pos: 'positive definite', neg: 'negative definite', mixed: 'indefinite (mixed signature)', deg: 'degenerate (at least one zero eigenvalue)' },
  }
  const L = labels[lang]

  let label
  if (positives === 2) label = L.pos
  else if (negatives === 2) label = L.neg
  else if (positives === 1 && negatives === 1) label = L.mixed
  else label = L.deg

  return { l1, l2, positives, negatives, label }
}

// Points on the level curve Q(x,y) = ±1, built directly from the eigenbasis
// of the symmetric matrix — no numerical curve-tracing needed, because in
// the eigenbasis the equation is just λ1·u² + λ2·v² = k.
export function levelCurve(a, b, c, samples = 120) {
  const { l1, l2, v1, v2 } = eigen2([[a, b], [b, c]])

  const positive = Math.max(l1, l2) > 1e-9
  const negative = Math.min(l1, l2) < -1e-9
  if (!positive && !negative) return { type: 'degenerate' }

  const k = positive ? 1 : -1
  const toXY = (u, v) => ({ x: u * v1.x + v * v2.x, y: u * v1.y + v * v2.y })

  const bothSameSignAsK = (l1 * k > 0 && l2 * k > 0)
  if (bothSameSignAsK) {
    const points = []
    for (let i = 0; i <= samples; i++) {
      const t = (2 * Math.PI * i) / samples
      const u = Math.sqrt(k / l1) * Math.cos(t)
      const v = Math.sqrt(k / l2) * Math.sin(t)
      points.push(toXY(u, v))
    }
    return { type: 'ellipse', points }
  }

  // mixed signs → hyperbola: pick which axis is "transverse" (same sign as k)
  const [lu, lv, vu, vv] = l1 * k > 0 ? [l1, l2, v1, v2] : [l2, l1, v2, v1]
  const branches = [1, -1].map((sign) => {
    const points = []
    for (let i = 0; i <= samples; i++) {
      const t = -3 + (6 * i) / samples
      const u = sign * Math.sqrt(k / lu) * Math.cosh(t)
      const v = Math.sqrt(-k / lv) * Math.sinh(t)
      points.push({ x: u * vu.x + v * vv.x, y: u * vu.y + v * vv.y })
    }
    return points
  })
  return { type: 'hyperbola', branches }
}