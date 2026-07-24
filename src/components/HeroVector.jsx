import { useEffect, useRef, useState } from 'react'

export default function HeroVector() {
    const [angle, setAngle] = useState(0.6)
    const rafRef = useRef()

    useEffect(() => {
        const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        if (prefersReducedMotion) return

        let last = performance.now()
        const tick = (now) => {
            const dt = (now - last) / 1000
            last = now
            setAngle((a) => a + dt * 0.35)
            rafRef.current = requestAnimationFrame(tick)
        }
        rafRef.current = requestAnimationFrame(tick)
        return () => cancelAnimationFrame(rafRef.current)
    }, [])

    const size = 220
    const c = size / 2
    const r = 78
    const x = c + r * Math.cos(angle)
    const y = c - r * Math.sin(angle)
    const degrees = (((angle * 180) / Math.PI) % 360 + 360) % 360

    return (
        <div className="relative shrink-0">
            <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`} className="overflow-visible">
                {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`v${i}`} x1={i * (size / 8)} y1={0} x2={i * (size / 8)} y2={size} stroke="var(--color-grid)" strokeWidth="1" />
                ))}
                {Array.from({ length: 9 }).map((_, i) => (
                    <line key={`h${i}`} x1={0} y1={i * (size / 8)} x2={size} y2={i * (size / 8)} stroke="var(--color-grid)" strokeWidth="1" />
                ))}
                <line x1={0} y1={c} x2={size} y2={c} stroke="var(--color-ink-500)" strokeWidth="1" />
                <line x1={c} y1={0} x2={c} y2={size} stroke="var(--color-ink-500)" strokeWidth="1" />
                <circle cx={c} cy={c} r={r} fill="none" stroke="var(--color-ink-600)" strokeWidth="1" strokeDasharray="3 4" />
                <line x1={c} y1={c} x2={x} y2={y} stroke="var(--color-amber-accent)" strokeWidth="2.5" />
                <circle cx={x} cy={y} r={4.5} fill="var(--color-amber-accent)" />
                <circle cx={c} cy={c} r={2.5} fill="var(--color-blue-accent)" />
            </svg>
            <div className="mt-3 font-mono text-xs text-ink-500">
                θ = {degrees.toFixed(0)}°&nbsp;&nbsp;v = (cos θ, sin θ)
            </div>
        </div>
    )
}