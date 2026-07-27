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
  
export function classifyCriticalPoint(fn, x, y) {
    const grad = numericGradient(fn, x, y)
    const hess = numericHessian(fn, x, y)
    const D = hess.fxx * hess.fyy - hess.fxy * hess.fxy
    let label
    if (Math.abs(D) < 1e-2) label = 'Indéterminé (D ≈ 0)'
    else if (D > 0 && hess.fxx > 0) label = 'Minimum local'
    else if (D > 0 && hess.fxx < 0) label = 'Maximum local'
    else label = 'Point selle'
    return { grad, hess, D, label }
}
  
export const criticalPointPresets = [
    { id: 'paraboloid', label: 'f(x,y) = x² + y²', latex: 'f(x,y) = x^2+y^2', fn: (x, y) => x * x + y * y, domain: [-2, 2, -2, 2] },
    { id: 'neg-paraboloid', label: 'f(x,y) = -x² - y²', latex: 'f(x,y) = -x^2-y^2', fn: (x, y) => -x * x - y * y, domain: [-2, 2, -2, 2] },
    { id: 'saddle', label: 'f(x,y) = x² - y²', latex: 'f(x,y) = x^2-y^2', fn: (x, y) => x * x - y * y, domain: [-2, 2, -2, 2] },
    { id: 'monkey-saddle', label: 'f(x,y) = x³ - 3xy²', latex: 'f(x,y) = x^3-3xy^2', fn: (x, y) => Math.pow(x, 3) - 3 * x * y * y, domain: [-1.5, 1.5, -1.5, 1.5] },
]