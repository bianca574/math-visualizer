function numericGradient(fn, x, y, h = 1e-4) {
    return {
      fx: (fn(x + h, y) - fn(x - h, y)) / (2 * h),
      fy: (fn(x, y + h) - fn(x, y - h)) / (2 * h),
    }
  }
  
function numericHessian(fn, x, y, h = 1e-3) {
    const f0 = fn(x, y)
    return {
      fxx: (fn(x + h, y) - 2 * f0 + fn(x - h, y)) / (h * h),
      fyy: (fn(x, y + h) - 2 * f0 + fn(x, y - h)) / (h * h),
      fxy: (fn(x + h, y + h) - fn(x + h, y - h) - fn(x - h, y + h) + fn(x - h, y - h)) / (4 * h * h),
    }
}
  
export function classifyCriticalPoint(fn, x, y, lang = 'fr') {
  const grad = numericGradient(fn, x, y)
  const hess = numericHessian(fn, x, y)
  const D = hess.fxx * hess.fyy - hess.fxy * hess.fxy
  const labels = {
    fr: { min: 'minimum local', max: 'maximum local', saddle: 'point selle', indeterminate: 'indéterminé (D ≈ 0)' },
    en: { min: 'local minimum', max: 'local maximum', saddle: 'saddle point', indeterminate: 'indeterminate (D ≈ 0)' },
  }
  const L = labels[lang]
  let label
  if (Math.abs(D) < 1e-2) label = L.indeterminate
  else if (D > 0 && hess.fxx > 0) label = L.min
  else if (D > 0 && hess.fxx < 0) label = L.max
  else label = L.saddle
  return { grad, hess, D, label }
}
  
export const criticalPointPresets = [
  { id: 'paraboloid', label: 'f(x,y) = x² + y²', latex: 'f(x,y) = x^2+y^2', fn: (x, y) => x * x + y * y, domain: [-2, 2, -2, 2] },
  { id: 'neg-paraboloid', label: 'f(x,y) = -x² - y²', latex: 'f(x,y) = -x^2-y^2', fn: (x, y) => -x * x - y * y, domain: [-2, 2, -2, 2] },
  { id: 'saddle', label: 'f(x,y) = x² - y²', latex: 'f(x,y) = x^2-y^2', fn: (x, y) => x * x - y * y, domain: [-2, 2, -2, 2] },
  { id: 'monkey-saddle', label: 'f(x,y) = x³ - 3xy²', latex: 'f(x,y) = x^3-3xy^2', fn: (x, y) => Math.pow(x, 3) - 3 * x * y * y, domain: [-1.5, 1.5, -1.5, 1.5] },
]