// simple trapezoidal rule — good enough for smooth integrands, and keeps
// the code readable since exact quadrature isn't the point of this page
export function integrate(fn, a, b, samples = 300) {
  const h = (b - a) / samples
  let sum = 0.5 * (fn(a) + fn(b))
  for (let i = 1; i < samples; i++) sum += fn(a + i * h)
  return sum * h
}

export const parametricIntegralPresets = [
  {
    id: 'x-pow-t',
    label: 'I(t) = ∫₀¹ xᵗ dx',
    integrandLatex: 'f(x,t) = x^{t}',
    domain: [0, 1],
    fn: (x, t) => Math.pow(x, t),
    target: (t) => 1 / (t + 1),
    tRange: [-0.8, 5],
    yRangeIntegrand: [-0.1, 1.1],
  },
  {
    id: 'sin-x-plus-t',
    label: 'I(t) = ∫₀^π sin(x+t) dx',
    integrandLatex: 'f(x,t) = \\sin(x+t)',
    domain: [0, Math.PI],
    fn: (x, t) => Math.sin(x + t),
    target: (t) => Math.cos(t) - Math.cos(Math.PI + t),
    tRange: [0, 2 * Math.PI],
    yRangeIntegrand: [-1.2, 1.2],
  },
  {
    id: 'exp-neg-tx',
    label: 'I(t) = ∫₀¹ e^(-tx) dx',
    integrandLatex: 'f(x,t) = e^{-tx}',
    domain: [0, 1],
    fn: (x, t) => Math.exp(-t * x),
    target: (t) => (Math.abs(t) < 1e-6 ? 1 : (1 - Math.exp(-t)) / t),
    tRange: [-3, 5],
    yRangeIntegrand: [-0.1, 3],
  },
  {
    id: 'inverse-x2-t2',
    label: 'I(t) = ∫₀¹ dx/(x²+t²)',
    integrandLatex: 'f(x,t) = \\dfrac{1}{x^2+t^2}',
    domain: [0, 1],
    fn: (x, t) => 1 / (x * x + t * t),
    target: (t) => (Math.abs(t) < 1e-3 ? null : Math.atan(1 / t) / t),
    tRange: [0.1, 3],
    yRangeIntegrand: [0, 10],
  },
]