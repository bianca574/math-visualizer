import { useState } from 'react'
import Scene3D from '../components/Scene3D'
import Slider from '../components/Slider'
import { InlineMath } from '../components/Math'
import { criticalPointPresets, classifyCriticalPoint } from '../lib/criticalPoints'
import { buildSurfaceGeometry } from '../lib/surfaceMesh'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

export default function CriticalPoints() {
    const [presetId, setPresetId] = useState(criticalPointPresets[0].id)
    const preset = criticalPointPresets.find((p) => p.id === presetId)
    const [xMin, xMax, yMin, yMax] = preset.domain
    const [x, setX] = useState(0.6)
    const [y, setY] = useState(0.6)

    const { lang } = useLanguage()
    const str = topicStrings['critical-points'][lang]

    const z = preset.fn(x, y)
    const result = classifyCriticalPoint(preset.fn, x, y, lang)
    const gradMag = Math.hypot(result.grad.fx, result.grad.fy)
    const isCritical = gradMag < 0.05

    function build(content, THREE) {
        const geometry = buildSurfaceGeometry(THREE, preset.fn, xMin, xMax, yMin, yMax, 50)
        const material = new THREE.MeshStandardMaterial({
            color: 0xe8a33d, transparent: true, opacity: 0.55, side: THREE.DoubleSide, flatShading: true,
        })
        content.add(new THREE.Mesh(geometry, material))
        content.add(new THREE.AmbientLight(0xffffff, 0.9))
        content.add(new THREE.DirectionalLight(0xffffff, 0.6))

        content.add(
            new THREE.LineSegments(
                new THREE.WireframeGeometry(geometry),
                new THREE.LineBasicMaterial({ color: 0x26303c, transparent: true, opacity: 0.4 }),
            ),
        )

        const marker = new THREE.Mesh(new THREE.SphereGeometry(0.06, 16, 16), new THREE.MeshBasicMaterial({ color: 0x5b8def }))
        marker.position.set(x, z, y)
        content.add(marker)

        if (gradMag > 1e-3) {
            const dir = new THREE.Vector3(result.grad.fx, 0, result.grad.fy).normalize()
            const length = Math.min(gradMag, 3)
            content.add(new THREE.ArrowHelper(dir, new THREE.Vector3(x, z, y), length, 0x5b8def, 0.1, 0.06))
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-5 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                    <InlineMath math={preset.latex} />
                </div>

                <label className="flex flex-col gap-3 text-xs font-mono text-ink-500">
                    <span>{str.fnLabel}</span>
                    <select
                        value={presetId}
                        onChange={(e) => {
                            setPresetId(e.target.value)
                            setX(0.6)
                            setY(0.6)
                        }}
                        className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none"
                    >
                        {criticalPointPresets.map((p) => (
                            <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                    </select>
                </label>

                <Slider label="x" value={x} min={xMin} max={xMax} step={0.05} onChange={setX} />
                <Slider label="y" value={y} min={yMin} max={yMax} step={0.05} onChange={setY} />

                <div className="font-mono text-xs text-ink-500 space-y-1">
                    <div>∇f ≈ ({result.grad.fx.toFixed(2)}, {result.grad.fy.toFixed(2)})</div>
                    <div>fxx={result.hess.fxx.toFixed(2)}, fyy={result.hess.fyy.toFixed(2)}, fxy={result.hess.fxy.toFixed(2)}</div>
                    <div>D = fxx·fyy − fxy² = {result.D.toFixed(2)}</div>
                </div>

                {isCritical ? (
                    <div className="font-mono text-sm text-amber-accent">{result.label}</div>
                ) : (
                    <p className="font-mono text-xs text-ink-500 italic">{str.notCritical(gradMag.toFixed(2))}</p>
                )}
                <p className="text-xs text-ink-500 leading-relaxed">{str.help}</p>
            </div>
            <Scene3D width={420} height={420} build={build} />
        </div>
    )
}