import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import MatrixInput from '../components/MatrixInput'
import { det2, applyMatrix } from '../lib/matrix'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

export default function MatrixOps() {
    const [matrix, setMatrix] = useState([
        ['1', '0'],
        ['0', '1'],
    ])
    const { lang } = useLanguage()
    const str = topicStrings['matrix-ops'][lang]

    const numericMatrix = matrix.map((row) => row.map((v) => parseFloat(v) || 0))

    const determinant = det2(numericMatrix)
    const orientationColor = determinant < 0 ? 'var(--color-blue-accent)' : 'var(--color-amber-accent)'

    const e1 = applyMatrix(numericMatrix, 1, 0)
    const e2 = applyMatrix(numericMatrix, 0, 1)

    const corners = [
        { x: 0, y: 0 },
        e1,
        { x: e1.x + e2.x, y: e1.y + e2.y },
        e2,
    ]

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-4">
                <MatrixInput matrix={matrix} onChange={setMatrix} />
                <div className="font-mono text-sm text-ink-500">
                    det(M) = <span style={{ color: orientationColor }}>{determinant.toFixed(2)}</span>
                </div>
                <p className="text-xs text-ink-500 max-w-xs leading-relaxed">
                    {determinant < 0 ? str.detNegative : str.detPositive}
                </p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    const screenCorners = corners.map((p) => transform.toScreen(p.x, p.y))
                    const pointsAttr = screenCorners.map((p) => `${p.x},${p.y}`).join(' ')
                    return (
                        <>
                            <polygon
                                points={pointsAttr}
                                fill={orientationColor}
                                fillOpacity={0.18}
                                stroke={orientationColor}
                                strokeWidth={1.5}
                            />
                            <PlaneVector transform={transform} x={e1.x} y={e1.y} label="Me₁" />
                            <PlaneVector
                                transform={transform}
                                x={e2.x}
                                y={e2.y}
                                color="var(--color-blue-accent)"
                                label="Me₂"
                            />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}