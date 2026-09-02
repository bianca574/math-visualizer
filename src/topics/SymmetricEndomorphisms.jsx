import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import { eigen2 } from '../lib/eigen'
import { dot } from '../lib/projection'
import { useLanguage } from '../context/useLanguage'
import { topicStrings } from '../lib/topicStrings'

export default function SymmetricEndomorphisms() {
    const [a, setA] = useState('2')
    const [b, setB] = useState('1')
    const [c, setC] = useState('1')

    const { lang } = useLanguage()
    const str = topicStrings['symmetric-endomorphisms'][lang]

    const av = parseFloat(a) || 0
    const bv = parseFloat(b) || 0
    const cv = parseFloat(c) || 0
    const result = eigen2([[av, bv], [bv, cv]])

    const dotProduct = result.real ? dot(result.v1, result.v2) : null

    return (
        <div className="flex flex-col md:flex-row gap-25 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">

                <p className="font-mono text-xs text-ink-500 mb-5">{str.matrixNote}</p>

                <div className="flex gap-3 rounded-lg border border-ink-700 bg-ink-900 p-3 mb-7">
                    {[['a', a, setA], ['b', b, setB], ['c', c, setC]].map(([label, val, setter]) => (
                        <label key={label} className="flex items-center gap-2 text-xs font-mono text-ink-500">
                            <span>{label}</span>
                            <input
                                type="number" step="0.1" value={val} onChange={(e) => setter(e.target.value)}
                                className="w-14 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-text-primary focus:border-amber-accent outline-none"
                            />
                        </label>
                    ))}
                </div>

                {result.real ? (
                    <div className="font-mono text-xs text-ink-500 space-y-1">
                        <div>λ₁ = <span className="text-amber-accent">{result.l1.toFixed(2)}</span>, v₁ = ({result.v1.x.toFixed(2)}, {result.v1.y.toFixed(2)})</div>
                        <div>λ₂ = <span className="text-blue-accent">{result.l2.toFixed(2)}</span>, v₂ = ({result.v2.x.toFixed(2)}, {result.v2.y.toFixed(2)})</div>
                        <div>⟨v₁,v₂⟩ = <span className="text-green-ok">{dotProduct.toFixed(4)}</span></div>
                    </div>
                ) : (
                    <p className="font-mono text-xs text-ink-500">{str.unexpected}</p>
                )}

                <p className="text-xs text-ink-500 leading-relaxed mt-7">{str.help}</p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    if (!result.real) return null
                    const l1a = transform.toScreen(-20 * result.v1.x, -20 * result.v1.y)
                    const l1b = transform.toScreen(20 * result.v1.x, 20 * result.v1.y)
                    const l2a = transform.toScreen(-20 * result.v2.x, -20 * result.v2.y)
                    const l2b = transform.toScreen(20 * result.v2.x, 20 * result.v2.y)

                    const origin = transform.toScreen(0, 0)
                    const along1 = transform.toScreen(0.25 * result.v1.x, 0.25 * result.v1.y)
                    const along2 = transform.toScreen(0.25 * result.v2.x, 0.25 * result.v2.y)
                    const corner = {
                        x: along1.x + along2.x - origin.x,
                        y: along1.y + along2.y - origin.y,
                    }

                    return (
                        <>
                            <line x1={l1a.x} y1={l1a.y} x2={l1b.x} y2={l1b.y} stroke="var(--color-amber-accent)" strokeWidth={1.5} strokeDasharray="4 4" />
                            <line x1={l2a.x} y1={l2a.y} x2={l2b.x} y2={l2b.y} stroke="var(--color-blue-accent)" strokeWidth={1.5} strokeDasharray="4 4" />
                            <polyline
                                points={`${along1.x},${along1.y} ${corner.x},${corner.y} ${along2.x},${along2.y}`}
                                fill="none"
                                stroke="var(--color-green-ok)"
                                strokeWidth={1.5}
                            />
                            <PlaneVector transform={transform} x={result.v1.x} y={result.v1.y} label="v₁" />
                            <PlaneVector transform={transform} x={result.v2.x} y={result.v2.y} color="var(--color-blue-accent)" label="v₂" />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}