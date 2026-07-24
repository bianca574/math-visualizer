export function makeScale(width, height, xMin, xMax, yMin, yMax) {
    const sx = width / (xMax - xMin)
    const sy = height / (yMax - yMin)
    function toScreen(x, y) {
      return { x: (x - xMin) * sx, y: height - (y - yMin) * sy }
    }
    return { toScreen, sx, sy }
  }