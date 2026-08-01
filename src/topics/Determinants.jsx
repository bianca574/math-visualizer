import { useState } from 'react'
import MatrixInput from '../components/MatrixInput'
import Scene3D from '../components/Scene3D'
import { det3, applyMatrix3 } from '../lib/matrix3'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

const unitCubeEdges = [
    [0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1], [1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1],
]

export default function Determinants() {
    const [matrix, setMatrix] = useState([
        ['1', '0', '0'],
        ['0', '1', '0'],
        ['0.3', '0', '1'],
    ])
    const { lang } = useLanguage()
    const str = topicStrings['determinants'][lang]

    const numeric = matrix.map((row) => row.map((v) => parseFloat(v) || 0))
    const determinant = det3(numeric)
    const orientationHex = determinant < 0 ? 0x5b8def : 0xe8a33d
    const orientationVar = determinant < 0 ? 'var(--color-blue-accent)' : 'var(--color-amber-accent)'

    function build(content, THREE) {
        const arrow = (vec) =>
            new THREE.ArrowHelper(
                new THREE.Vector3(vec.x, vec.y, vec.z).normalize(),
                new THREE.Vector3(0, 0, 0),
                Math.max(Math.hypot(vec.x, vec.y, vec.z), 0.001),
                orientationHex,
                0.15,
                0.08,
            )
        content.add(arrow(applyMatrix3(numeric, 1, 0, 0)))
        content.add(arrow(applyMatrix3(numeric, 0, 1, 0)))
        content.add(arrow(applyMatrix3(numeric, 0, 0, 1)))

        const points = []
        for (const [x1, y1, z1, x2, y2, z2] of unitCubeEdges) {
            const p1 = applyMatrix3(numeric, x1, y1, z1)
            const p2 = applyMatrix3(numeric, x2, y2, z2)
            points.push(new THREE.Vector3(p1.x, p1.y, p1.z), new THREE.Vector3(p2.x, p2.y, p2.z))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({ color: orientationHex, transparent: true, opacity: 0.6 })
        content.add(new THREE.LineSegments(geometry, material))
    }

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <p className="text-xs text-ink-500 leading-relaxed">
                    {str.intro}
                </p>
                <MatrixInput matrix={matrix} onChange={setMatrix} />
                <div className="font-mono text-sm">
                    det(M) = <span style={{ color: orientationVar }}>{determinant.toFixed(2)}</span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                    {determinant < 0 ? str.negative : str.positive}
                </p>
            </div>
            <Scene3D width={420} height={420} build={build} />
        </div>
    )
}