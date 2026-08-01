import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import { matMul2, applyMatrix, det2 } from '../lib/matrix'
import Slider from '../components/Slider'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

function rotationMatrix(deg) {
    const t = (deg * Math.PI) / 180
    return [
        [Math.cos(t), -Math.sin(t)],
        [Math.sin(t), Math.cos(t)],
    ]
}
function shearMatrix(k) {
    return [
        [1, k],
        [0, 1],
    ]
}
function scaleMatrix(sx, sy) {
    return [
        [sx, 0],
        [0, sy],
    ]
}

export default function Transformations2D() {
    const [angle, setAngle] = useState(0)
    const [sx, setSx] = useState(1)
    const [sy, setSy] = useState(1)
    const [shear, setShear] = useState(0)

    const { lang } = useLanguage()
    const str = topicStrings['transformations-2d'][lang]

    const M = matMul2(rotationMatrix(angle), matMul2(shearMatrix(shear), scaleMatrix(sx, sy)))
    const determinant = det2(M)
    const orientationColor = determinant < 0 ? 'var(--color-blue-accent)' : 'var(--color-amber-accent)'
    const e1 = applyMatrix(M, 1, 0)
    const e2 = applyMatrix(M, 0, 1)
    const corners = [
        { x: 0, y: 0 },
        e1,
        { x: e1.x + e2.x, y: e1.y + e2.y },
        e2,
    ]

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <Slider label={str.rotation} value={angle} min={-180} max={180} step={1} onChange={setAngle} />
                <Slider label={str.scaleX} value={sx} min={-2} max={2} step={0.1} onChange={setSx} />
                <Slider label={str.scaleY} value={sy} min={-2} max={2} step={0.1} onChange={setSy} />
                <Slider label={str.shear} value={shear} min={-2} max={2} step={0.1} onChange={setShear} />
                <div className="font-mono text-xs text-ink-500">
                    M = [[{M[0][0].toFixed(2)}, {M[0][1].toFixed(2)}], [{M[1][0].toFixed(2)}, {M[1][1].toFixed(2)}]]
                </div>
                <div className="font-mono text-xs text-ink-500">
                    det(M) = <span style={{ color: orientationColor }}>{determinant.toFixed(2)}</span>
                </div>
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
                            <PlaneVector transform={transform} x={e2.x} y={e2.y} color="var(--color-blue-accent)" label="Me₂" />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}