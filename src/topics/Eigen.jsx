import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import MatrixInput from '../components/MatrixInput'
import { eigen2 } from '../lib/eigen'

export default function Eigen() {
    const [matrix, setMatrix] = useState([
        ['2', '0'],
        ['1', '3'],
    ])
    const numericMatrix = matrix.map((row) => row.map((v) => parseFloat(v) || 0))
    const result = eigen2(numericMatrix)

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-4 max-w-xs">
                <MatrixInput matrix={matrix} onChange={setMatrix} />

                {result.real ? (
                    <div className="font-mono text-sm text-ink-500 space-y-1">
                        <div>
                            λ₁ = <span className="text-amber-accent">{result.l1.toFixed(2)}</span>, v₁ = (
                            {result.v1.x.toFixed(2)}, {result.v1.y.toFixed(2)})
                        </div>
                        <div>
                            λ₂ = <span className="text-blue-accent">{result.l2.toFixed(2)}</span>, v₂ = (
                            {result.v2.x.toFixed(2)}, {result.v2.y.toFixed(2)})
                        </div>
                    </div>
                ) : (
                    <p className="font-mono text-sm text-ink-500">
                        Pas de valeurs propres réelles — la transformation comporte une rotation.
                    </p>
                )}

                <p className="text-xs text-ink-500 leading-relaxed">
                    Les droites en pointillés sont les directions propres : tout vecteur porté par
                    l'une d'elles reste sur la même droite après transformation, seule sa longueur
                    change (facteur λ).
                </p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    if (!result.real) return null
                    const l1a = transform.toScreen(-20 * result.v1.x, -20 * result.v1.y)
                    const l1b = transform.toScreen(20 * result.v1.x, 20 * result.v1.y)
                    const l2a = transform.toScreen(-20 * result.v2.x, -20 * result.v2.y)
                    const l2b = transform.toScreen(20 * result.v2.x, 20 * result.v2.y)
                    return (
                        <>
                            <line x1={l1a.x} y1={l1a.y} x2={l1b.x} y2={l1b.y} stroke="var(--color-amber-accent)" strokeWidth={1.5} strokeDasharray="4 4" />
                            <line x1={l2a.x} y1={l2a.y} x2={l2b.x} y2={l2b.y} stroke="var(--color-blue-accent)" strokeWidth={1.5} strokeDasharray="4 4" />
                            <PlaneVector transform={transform} x={result.v1.x} y={result.v1.y} label="v₁" />
                            <PlaneVector transform={transform} x={result.v2.x} y={result.v2.y} color="var(--color-blue-accent)" label="v₂" />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}