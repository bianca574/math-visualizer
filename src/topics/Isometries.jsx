import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import Scene3D from '../components/Scene3D'
import MatrixInput from '../components/MatrixInput'
import { applyMatrix } from '../lib/matrix'
import { applyMatrix3 } from '../lib/matrix3'
import { classifyIsometry2, classifyIsometry3 } from '../lib/isometry'

const unitCubeEdges = [
    [0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1], [1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1],
]

function View2D() {
    const [matrix, setMatrix] = useState([
        ['0', '-1'],
        ['1', '0'],
    ])
    const numeric = matrix.map((row) => row.map((v) => parseFloat(v) || 0))
    const result = classifyIsometry2(numeric)
    const sample = { x: 1.5, y: 0.5 }
    const sampleImage = applyMatrix(numeric, sample.x, sample.y)

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <MatrixInput matrix={matrix} onChange={setMatrix} />
                {!result.orthogonal && (
                    <p className="text-xs text-blue-accent">Cette matrice ne préserve pas les longueurs — ce n'est pas une isométrie.</p>
                )}
                {result.orthogonal && result.type === 'rotation' && (
                    <p className="font-mono text-sm text-ink-500">
                        <span className="text-amber-accent">Rotation</span> d'angle {result.angleDeg.toFixed(1)}°
                    </p>
                )}
                {result.orthogonal && result.type === 'reflection' && (
                    <p className="font-mono text-sm text-ink-500">
                        <span className="text-blue-accent">Réflexion</span> d'axe à {result.axisAngleDeg.toFixed(1)}° de l'horizontale
                    </p>
                )}
                <p className="text-xs text-ink-500 leading-relaxed">
                    En dimension 2, det = +1 donne toujours une rotation, det = -1 donne toujours
                    une réflexion.
                </p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    if (!result.orthogonal) return null
                    if (result.type === 'rotation') {
                        const steps = 24
                        const arcPts = []
                        for (let i = 0; i <= steps; i++) {
                            const t = (result.angleDeg * Math.PI) / 180 * (i / steps)
                            arcPts.push(transform.toScreen(0.7 * Math.cos(t), 0.7 * Math.sin(t)))
                        }
                        return (
                            <>
                                <polyline points={arcPts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--color-amber-accent)" strokeWidth={1.5} />
                                <PlaneVector transform={transform} x={sample.x} y={sample.y} label="v" />
                                <PlaneVector transform={transform} x={sampleImage.x} y={sampleImage.y} color="var(--color-amber-accent)" label="Mv" />
                            </>
                        )
                    }
                    const phi = (result.axisAngleDeg * Math.PI) / 180
                    const a1 = transform.toScreen(-20 * Math.cos(phi), -20 * Math.sin(phi))
                    const a2 = transform.toScreen(20 * Math.cos(phi), 20 * Math.sin(phi))
                    return (
                        <>
                            <line x1={a1.x} y1={a1.y} x2={a2.x} y2={a2.y} stroke="var(--color-ink-500)" strokeWidth={1.5} strokeDasharray="4 4" />
                            <PlaneVector transform={transform} x={sample.x} y={sample.y} label="v" />
                            <PlaneVector transform={transform} x={sampleImage.x} y={sampleImage.y} color="var(--color-blue-accent)" label="Mv" />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}

function View3D() {
    const [matrix, setMatrix] = useState([
        ['1', '0', '0'],
        ['0', '1', '0'],
        ['0', '0', '-1'],
    ])
    const numeric = matrix.map((row) => row.map((v) => parseFloat(v) || 0))
    const result = classifyIsometry3(numeric)

    const subtypeLabel = {
        inversion: 'Symétrie rotatoire (symétrie centrale)',
        reflection: 'Symétrie orthogonale (réflexion par rapport à un plan)',
        antirotation: 'Symétrie rotatoire',
    }

    function build(content, THREE) {
        const points = []
        for (const [x1, y1, z1, x2, y2, z2] of unitCubeEdges) {
            const p1 = applyMatrix3(numeric, x1, y1, z1)
            const p2 = applyMatrix3(numeric, x2, y2, z2)
            points.push(new THREE.Vector3(p1.x, p1.y, p1.z), new THREE.Vector3(p2.x, p2.y, p2.z))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        content.add(new THREE.LineSegments(geometry, new THREE.LineBasicMaterial({ color: 0xe8ebf0, transparent: true, opacity: 0.6 })))

        if (result.orthogonal) {
            const axisVec = new THREE.Vector3(result.axis.x, result.axis.y, result.axis.z)
            content.add(new THREE.ArrowHelper(axisVec, new THREE.Vector3(0, 0, 0), 2, 0xe8a33d, 0.15, 0.08))

            if (result.type === 'antirotation' && result.subtype !== 'inversion') {
                const planeGeom = new THREE.PlaneGeometry(4, 4)
                const planeMat = new THREE.MeshBasicMaterial({ color: 0x5b8def, transparent: true, opacity: 0.15, side: THREE.DoubleSide })
                const plane = new THREE.Mesh(planeGeom, planeMat)
                plane.quaternion.setFromUnitVectors(new THREE.Vector3(0, 0, 1), axisVec.clone().normalize())
                content.add(plane)
            }
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <MatrixInput matrix={matrix} onChange={setMatrix} />
                {!result.orthogonal && (
                    <p className="text-xs text-blue-accent">Cette matrice ne préserve pas les longueurs — ce n'est pas une isométrie.</p>
                )}
                {result.orthogonal && result.type === 'rotation' && (
                    <p className="font-mono text-sm text-ink-500">
                        <span className="text-amber-accent">Rotation</span> de {result.angleDeg.toFixed(1)}° autour de l'axe (flèche)
                    </p>
                )}
                {result.orthogonal && result.type === 'antirotation' && (
                    <p className="font-mono text-sm text-ink-500">
                        <span className="text-blue-accent">{subtypeLabel[result.subtype]}</span> — angle {result.angleDeg.toFixed(1)}°
                    </p>
                )}
                <p className="text-xs text-ink-500 leading-relaxed">
                    det = +1 → rotation autour de l'axe indiqué. det = -1 → antirotation : le
                    plan bleu est le plan de réflexion perpendiculaire à l'axe. À 0°, c'est une
                    symétrie centrale ; à 180°, une réflexion (symétrie orthogonale).
                </p>
            </div>
            <Scene3D width={420} height={420} build={build} />
        </div>
    )
}

export default function Isometries() {
    const [dim, setDim] = useState(2)
    return (
        <div className="flex flex-col gap-5">
            <div className="flex gap-2">
                {[2, 3].map((d) => (
                    <button
                        key={d}
                        onClick={() => setDim(d)}
                        className={`px-3 py-1.5 text-xs font-mono rounded-md border ${dim === d ? 'border-amber-accent text-white bg-ink-800' : 'border-ink-700 text-ink-500'
                            }`}
                    >
                        {d}D
                    </button>
                ))}
            </div>
            {dim === 2 ? <View2D /> : <View3D />}
        </div>
    )
}