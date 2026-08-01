import { useState } from 'react'
import Scene3D from '../components/Scene3D'
import Slider from '../components/Slider'
import { rotX, rotY, rotZ, scale3, matMul3, applyMatrix3 } from '../lib/matrix3'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

// the 12 edges of the unit cube [0,1]³, each as [x1,y1,z1, x2,y2,z2]
const unitCubeEdges = [
    [0, 0, 0, 1, 0, 0], [0, 0, 0, 0, 1, 0], [0, 0, 0, 0, 0, 1],
    [1, 0, 0, 1, 1, 0], [1, 0, 0, 1, 0, 1],
    [0, 1, 0, 1, 1, 0], [0, 1, 0, 0, 1, 1],
    [0, 0, 1, 1, 0, 1], [0, 0, 1, 0, 1, 1],
    [1, 1, 0, 1, 1, 1], [1, 0, 1, 1, 1, 1], [0, 1, 1, 1, 1, 1],
]

export default function Transformations3D() {
    const [angleX, setAngleX] = useState(0)
    const [angleY, setAngleY] = useState(0)
    const [angleZ, setAngleZ] = useState(0)
    const [sx, setSx] = useState(1)
    const [sy, setSy] = useState(1)
    const [sz, setSz] = useState(1)

    const { lang } = useLanguage()
    const str = topicStrings['transformations-3d'][lang]

    const toRad = (d) => (d * Math.PI) / 180
    const M = matMul3(
        rotZ(toRad(angleZ)),
        matMul3(rotY(toRad(angleY)), matMul3(rotX(toRad(angleX)), scale3(sx, sy, sz))),
    )

    function build(content, THREE) {
        const e1 = applyMatrix3(M, 1, 0, 0)
        const e2 = applyMatrix3(M, 0, 1, 0)
        const e3 = applyMatrix3(M, 0, 0, 1)

        const arrow = (vec, hex) => {
            const dir = new THREE.Vector3(vec.x, vec.y, vec.z)
            const length = Math.max(dir.length(), 0.001)
            return new THREE.ArrowHelper(dir.clone().normalize(), new THREE.Vector3(0, 0, 0), length, hex, 0.15, 0.08)
        }
        content.add(arrow(e1, 0xe8a33d))
        content.add(arrow(e2, 0x5b8def))
        content.add(arrow(e3, 0x6fcf97))

        const points = []
        for (const [x1, y1, z1, x2, y2, z2] of unitCubeEdges) {
            const p1 = applyMatrix3(M, x1, y1, z1)
            const p2 = applyMatrix3(M, x2, y2, z2)
            points.push(new THREE.Vector3(p1.x, p1.y, p1.z), new THREE.Vector3(p2.x, p2.y, p2.z))
        }
        const geometry = new THREE.BufferGeometry().setFromPoints(points)
        const material = new THREE.LineBasicMaterial({ color: 0xe8ebf0, transparent: true, opacity: 0.5 })
        content.add(new THREE.LineSegments(geometry, material))
    }

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <Slider label={str.rotX} value={angleX} min={-180} max={180} step={1} onChange={setAngleX} />
                <Slider label={str.rotY} value={angleY} min={-180} max={180} step={1} onChange={setAngleY} />
                <Slider label={str.rotZ} value={angleZ} min={-180} max={180} step={1} onChange={setAngleZ} />
                <Slider label={str.scaleX} value={sx} min={-2} max={2} step={0.1} onChange={setSx} />
                <Slider label={str.scaleY} value={sy} min={-2} max={2} step={0.1} onChange={setSy} />
                <Slider label={str.scaleZ} value={sz} min={-2} max={2} step={0.1} onChange={setSz} />

                <p className="text-xs text-ink-500 leading-relaxed">{str.help}</p>
            </div>
            <Scene3D width={420} height={420} build={build} />
        </div>
    )
}