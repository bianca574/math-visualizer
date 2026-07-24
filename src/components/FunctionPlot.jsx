import { makeScale } from '../lib/plotScale'

function niceStep(rough) {
    const mag = Math.pow(10, Math.floor(Math.log10(rough)))
    const norm = rough / mag
    if (norm < 1.5) return mag
    if (norm < 3) return 2 * mag
    if (norm < 7) return 5 * mag
    return 10 * mag
}

export default function FunctionPlot({ width = 480, height = 320, xMin, xMax, yMin, yMax, children }) {
    const scale = makeScale(width, height, xMin, xMax, yMin, yMax)
    const xStep = niceStep((xMax - xMin) / 6)
    const yStep = niceStep((yMax - yMin) / 6)

    const xTicks = []
    for (let x = Math.ceil(xMin / xStep) * xStep; x <= xMax; x += xStep) xTicks.push(Number(x.toFixed(6)))
    const yTicks = []
    for (let y = Math.ceil(yMin / yStep) * yStep; y <= yMax; y += yStep) yTicks.push(Number(y.toFixed(6)))

    const origin = scale.toScreen(0, 0)

    return (
        <svg width={width} height={height} className="rounded-lg border border-ink-700 bg-ink-900">
            {xTicks.map((x) => {
                const { x: sx } = scale.toScreen(x, 0)
                return <line key={`x${x}`} x1={sx} y1={0} x2={sx} y2={height} stroke="var(--color-grid)" strokeWidth={1} />
            })}
            {yTicks.map((y) => {
                const { y: sy } = scale.toScreen(0, y)
                return <line key={`y${y}`} x1={0} y1={sy} x2={width} y2={sy} stroke="var(--color-grid)" strokeWidth={1} />
            })}

            {yMin <= 0 && yMax >= 0 && (
                <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="var(--color-ink-500)" strokeWidth={1.5} />
            )}
            {xMin <= 0 && xMax >= 0 && (
                <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="var(--color-ink-500)" strokeWidth={1.5} />
            )}

            {xTicks.map((x) => {
                const { x: sx } = scale.toScreen(x, 0)
                return (
                    <text key={`xt${x}`} x={sx} y={height - 4} fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-ink-500)" textAnchor="middle">
                        {x}
                    </text>
                )
            })}
            {yTicks.map((y) => {
                const { y: sy } = scale.toScreen(0, y)
                return (
                    <text key={`yt${y}`} x={4} y={sy - 4} fontSize="10" fontFamily="var(--font-mono)" fill="var(--color-ink-500)">
                        {y}
                    </text>
                )
            })}

            {typeof children === 'function' ? children(scale) : children}
        </svg>
    )
}