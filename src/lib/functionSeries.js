export const functionSeriesPresets = [
    {
      id: 'x-pow-n',
      label: 'fₙ(x) = xⁿ sur [0,1]',
      labelEn: 'fₙ(x) = xⁿ on [0,1]',
      latex: 'f_n(x) = x^n',
      domain: [0, 1],
      fn: (x, n) => Math.pow(x, n),
      limit: (x) => (x < 1 ? 0 : 1),
      yRange: [-0.1, 1.3],
      uniform: false,
      note: "Converge simplement vers une fonction discontinue en x=1 : une limite uniforme de fonctions continues serait continue, donc la convergence ne peut pas être uniforme.",
      noteEn: 'Converges pointwise to a discontinuous function at x=1: a uniform limit of continuous functions would be continuous, so convergence can\u2019t be uniform.',
    },
    {
      id: 'sin-nx-sqrt-n',
      label: 'fₙ(x) = sin(nx)/√n',
      labelEn: 'fₙ(x) = sin(nx)/√n',
      latex: 'f_n(x) = \\dfrac{\\sin(nx)}{\\sqrt{n}}',
      domain: [-6, 6],
      fn: (x, n) => Math.sin(n * x) / Math.sqrt(n), 
      limit: () => 0,
      yRange: [-1.2, 1.2],
      uniform: true,
      note: "sup|fₙ − 0| = 1/√n → 0, indépendamment de x : convergence uniforme.",
      noteEn: 'sup|fₙ − 0| = 1/√n → 0, independent of x: uniform convergence.',
    },
    {
      id: 'nx-1-minus-x-n',
      label: 'fₙ(x) = n·x·(1−x)ⁿ sur [0,1]',
      labelEn: 'fₙ(x) = n·x·(1−x)ⁿ on [0,1]',
      latex: 'f_n(x) = n\\,x\\,(1-x)^n',
      domain: [0, 1],
      fn: (x, n) => n * x * Math.pow(1 - x, n),
      limit: () => 0,
      yRange: [-0.05, 1],
      uniform: false,
      note: "Converge simplement vers 0 en chaque point, mais le maximum de fₙ (atteint près de x=1/n) ne tend pas vers 0 : convergence non uniforme malgré une limite continue.",
      noteEn: 'Converges pointwise to 0 everywhere, but fₙ\u2019s maximum (reached near x=1/n) doesn\u2019t tend to 0: non-uniform convergence despite a continuous limit.',
    },
    {
      id: 'x-over-n',
      label: 'fₙ(x) = x/n sur [-3,3]',
      labelEn: 'fₙ(x) = x/n on [-3,3]',
      latex: 'f_n(x) = \\dfrac{x}{n}',
      domain: [-3, 3],
      fn: (x, n) => x / n,
      limit: () => 0,
      yRange: [-1, 1],
      uniform: true,
      note: "sup|fₙ − 0| = 3/n → 0 sur cet intervalle borné : convergence uniforme.",
      noteEn: 'sup|fₙ − 0| = 3/n → 0 on this bounded interval: uniform convergence.',
    },
]
  
export function supError(preset, n, samples = 200) {
    const [a, b] = preset.domain
    let max = 0
    for (let i = 0; i <= samples; i++) {
      const x = a + ((b - a) * i) / samples
      const diff = Math.abs(preset.fn(x, n) - preset.limit(x))
      if (diff > max) max = diff
    }
    return max
}