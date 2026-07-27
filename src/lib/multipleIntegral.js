export function integrate2D(fn, xMin, xMax, yMin, yMax, samples = 80) {
    const hx = (xMax - xMin) / samples
    const hy = (yMax - yMin) / samples
    let sum = 0
    for (let i = 0; i <= samples; i++) {
      const wx = i === 0 || i === samples ? 0.5 : 1
      const x = xMin + i * hx
      for (let j = 0; j <= samples; j++) {
        const wy = j === 0 || j === samples ? 0.5 : 1
        const y = yMin + j * hy
        sum += wx * wy * fn(x, y)
      }
    }
    return sum * hx * hy
  }
  
  export const multipleIntegralPresets = [
    { id: 'paraboloid', label: '∬ (x²+y²) dA sur [-1,1]²', latex: 'f(x,y) = x^2+y^2', fn: (x, y) => x * x + y * y, domain: [-1, 1, -1, 1] },
    { id: 'sin-cos', label: '∬ sin(x)cos(y) dA sur [0,π]²', latex: 'f(x,y) = \\sin(x)\\cos(y)', fn: (x, y) => Math.sin(x) * Math.cos(y), domain: [0, Math.PI, 0, Math.PI] },
    { id: 'plane', label: '∬ (2-x-y) dA sur [0,1]²', latex: 'f(x,y) = 2-x-y', fn: (x, y) => 2 - x - y, domain: [0, 1, 0, 1] },
  ]