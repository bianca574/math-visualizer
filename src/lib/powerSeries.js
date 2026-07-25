function factorial(n) {
    let r = 1
    for (let i = 2; i <= n; i++) r *= i
    return r
}
  
export const powerSeriesPresets = [
    {
      id: 'geometric',
      label: 'Σ xⁿ (série géométrique)',
      latex: '\\sum_{n=0}^{\\infty} x^n = \\dfrac{1}{1-x}',
      coeff: () => 1,
      target: (x) => 1 / (1 - x),
      radius: 1,
      xRange: [-2, 2],
      yRange: [-6, 6],
    },
    {
      id: 'exp',
      label: 'Σ xⁿ/n! (exponentielle)',
      latex: '\\sum_{n=0}^{\\infty} \\dfrac{x^n}{n!} = e^x',
      coeff: (n) => 1 / factorial(n),
      target: (x) => Math.exp(x),
      radius: Infinity,
      xRange: [-3, 3],
      yRange: [-2, 20],
    },
    {
      id: 'ln',
      label: 'Σ (-1)ⁿ⁺¹xⁿ/n (ln(1+x))',
      latex: '\\sum_{n=1}^{\\infty} \\dfrac{(-1)^{n+1}}{n}x^n = \\ln(1+x)',
      coeff: (n) => (n === 0 ? 0 : (n % 2 === 1 ? 1 : -1) / n),
      target: (x) => Math.log(1 + x),
      radius: 1,
      xRange: [-0.9, 3.5],
      yRange: [-4, 3],
      domainNote: "définie seulement pour x > -1",
    },
    {
      id: 'cos',
      label: 'Σ (-1)ⁿ x²ⁿ/(2n)! (cosinus)',
      latex: '\\sum_{n=0}^{\\infty} \\dfrac{(-1)^n}{(2n)!}x^{2n} = \\cos(x)',
      coeff: (n) => (n % 2 === 0 ? Math.pow(-1, n / 2) / factorial(n) : 0),
      target: (x) => Math.cos(x),
      radius: Infinity,
      xRange: [-7, 7],
      yRange: [-2, 2],
    },
]
  
export function partialSum(preset, x, nTerms) {
    let sum = 0
    for (let n = 0; n <= nTerms; n++) sum += preset.coeff(n) * Math.pow(x, n)
    return sum
}