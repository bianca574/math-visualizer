export default function PlaneVector({ transform, x, y, color = 'var(--color-amber-accent)', label }) {
    const origin = transform.toScreen(0, 0)
    const tip = transform.toScreen(x, y)
    const angle = Math.atan2(tip.y - origin.y, tip.x - origin.x)
    const headLength = 10
    const headAngle = Math.PI / 7

    const p1 = {
        x: tip.x - headLength * Math.cos(angle - headAngle),
        y: tip.y - headLength * Math.sin(angle - headAngle),
    }
    const p2 = {
        x: tip.x - headLength * Math.cos(angle + headAngle),
        y: tip.y - headLength * Math.sin(angle + headAngle),
    }

    return (
        <g>
            <line x1={origin.x} y1={origin.y} x2={tip.x} y2={tip.y} stroke={color} strokeWidth={2.5} />
            <polygon points={`${tip.x},${tip.y} ${p1.x},${p1.y} ${p2.x},${p2.y}`} fill={color} />
            {label && (
                <text x={tip.x + 8} y={tip.y - 8} fontFamily="var(--font-mono)" fontSize="12" fill={color}>
                    {label}
                </text>
            )}
        </g>
    )
}