export const sequencePresets = [
    { id: 'inv-n', label: 'uₙ = 1/n', latex: 'u_n = \\dfrac{1}{n}', fn: (n) => 1 / n, limit: 0 },
    { id: 'n-plus-1-over-n', label: 'uₙ = (n+1)/n', latex: 'u_n = \\dfrac{n+1}{n}', fn: (n) => (n + 1) / n, limit: 1 },
    { id: 'alt-inv-n', label: 'uₙ = (-1)ⁿ/n', latex: 'u_n = \\dfrac{(-1)^n}{n}', fn: (n) => (n % 2 === 0 ? 1 : -1) / n, limit: 0 },
    { id: 'sin-n-over-n', label: 'uₙ = sin(n)/n', latex: 'u_n = \\dfrac{\\sin(n)}{n}', fn: (n) => Math.sin(n) / n, limit: 0 },
    { id: 'euler', label: 'uₙ = (1+1/n)ⁿ → e', latex: 'u_n = \\left(1+\\dfrac{1}{n}\\right)^{n}', fn: (n) => Math.pow(1 + 1 / n, n), limit: Math.E },
  ]
  
// smallest N such that every term from N up to maxN stays within eps of L
export function findThresholdN(fn, limit, eps, maxN = 500) {
    for (let N = 1; N <= maxN; N++) {
      let allWithin = true
      for (let n = N; n <= maxN; n++) {
        if (Math.abs(fn(n) - limit) >= eps) {
          allWithin = false
          break
        }
      }
      if (allWithin) return N
    }
    return null
}