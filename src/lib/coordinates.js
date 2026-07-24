// Maps between "plane" coordinates (x right, y up — real math axes) and
// "screen" pixel coordinates (x right, y down, origin top-left) for a given
// viewport size and visible x/y range. Every visualizer uses this so a
// vector or a curve is positioned identically everywhere.

export function makeTransform({ width, height, xMin, xMax, yMin, yMax }) {
  // one scale for both axes, so a right angle in math stays a right angle
  // on screen instead of getting stretched into an ellipse
  const scale = Math.min(width / (xMax - xMin), height / (yMax - yMin))

  const spanX = width / scale
  const spanY = height / scale
  const cx = (xMin + xMax) / 2
  const cy = (yMin + yMax) / 2

  const effXMin = cx - spanX / 2
  const effXMax = cx + spanX / 2
  const effYMin = cy - spanY / 2
  const effYMax = cy + spanY / 2

  function toScreen(x, y) {
    return {
      x: (x - effXMin) * scale,
      y: height - (y - effYMin) * scale,
    }
  }

  function toPlane(sx, sy) {
    return {
      x: sx / scale + effXMin,
      y: (height - sy) / scale + effYMin,
    }
  }

  return { toScreen, toPlane, scale, xMin: effXMin, xMax: effXMax, yMin: effYMin, yMax: effYMax }
}