import { useState } from 'react'
import Scene3D from '../components/Scene3D'
import Slider from '../components/Slider'
import { InlineMath } from '../components/Math'
import { multipleIntegralPresets, integrate2D } from '../lib/multipleIntegral'
import { buildSurfaceGeometry } from '../lib/surfaceMesh'
import { useLanguage } from '../context/useLanguage'
import { topicStrings } from '../lib/topicStrings'
import CustomFunctionInput from '../components/CustomFunctionInput'
import { compileFunction } from '../lib/customFunction'

export default function MultipleIntegrals() {
    const [presetId, setPresetId] = useState(multipleIntegralPresets[0].id)
    const [n, setN] = useState(6)
    const preset = multipleIntegralPresets.find((p) => p.id === presetId)

    const [customExpr, setCustomExpr] = useState('')
    const [dxMin, setDxMin] = useState('-1')
    const [dxMax, setDxMax] = useState('1')
    const [dyMin, setDyMin] = useState('-1')
    const [dyMax, setDyMax] = useState('1')
    const { fn: customFn, error: customError } = customExpr.trim()
        ? compileFunction(customExpr, ['x', 'y'])
        : { fn: null, error: null }

    const activeFn = customFn || preset.fn
    const [xMin, xMax, yMin, yMax] = customFn
        ? [parseFloat(dxMin) || -1, parseFloat(dxMax) || 1, parseFloat(dyMin) || -1, parseFloat(dyMax) || 1]
        : preset.domain

    const { lang } = useLanguage()
    const str = topicStrings['multiple-integrals'][lang]

    const referenceValue = integrate2D(activeFn, xMin, xMax, yMin, yMax, 80)

    const cellW = (xMax - xMin) / n
    const cellD = (yMax - yMin) / n
    let riemannSum = 0
    const cells = []
    for (let i = 0; i < n; i++) {
        const cx = xMin + (i + 0.5) * cellW
        for (let j = 0; j < n; j++) {
            const cy = yMin + (j + 0.5) * cellD
            const value = activeFn(cx, cy)
            riemannSum += value * cellW * cellD
            cells.push({ cx, cy, value })
        }
    }

    function build(content, THREE) {
        const geometry = buildSurfaceGeometry(THREE, activeFn, xMin, xMax, yMin, yMax, 40)
        const wireMat = new THREE.MeshBasicMaterial({ color: 0x8b96a8, wireframe: true, transparent: true, opacity: 0.35 })
        content.add(new THREE.Mesh(geometry, wireMat))

        for (const cell of cells) {
            const height = Math.max(Math.abs(cell.value), 0.001)
            const boxGeom = new THREE.BoxGeometry(cellW * 0.92, height, cellD * 0.92)
            const color = cell.value >= 0 ? 0xe8a33d : 0x5b8def
            const box = new THREE.Mesh(boxGeom, new THREE.MeshBasicMaterial({ color, transparent: true, opacity: 0.45 }))
            box.position.set(cell.cx, cell.value >= 0 ? height / 2 : -height / 2, cell.cy)
            content.add(box)

            const edges = new THREE.LineSegments(
                new THREE.EdgesGeometry(boxGeom),
                new THREE.LineBasicMaterial({ color, transparent: true, opacity: 0.8 }),
            )
            edges.position.copy(box.position)
            content.add(edges)
        }
    }

    return (
        <div className="flex flex-col md:flex-row gap-25 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                    <InlineMath math={preset.latex} />
                </div>

                <label className="flex flex-col gap-3 text-xs font-mono text-ink-500 mt-3 mb-3">
                    <span className="block mb-2">{str.fnLabel}</span>
                    <select
                        value={presetId}
                        onChange={(e) => setPresetId(e.target.value)}
                        className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none"
                    >
                        {multipleIntegralPresets.map((p) => (
                            <option key={p.id} value={p.id}>{lang === 'en' ? p.labelEn : p.label}</option>
                        ))}
                    </select>
                    <CustomFunctionInput
                        label={str.customLabel}
                        placeholder={str.customPlaceholder}
                        value={customExpr}
                        onChange={setCustomExpr}
                        error={customError}
                    />
                    {customExpr.trim() && !customError && (
                        <div className="grid grid-cols-2 gap-2">
                            {[['xMin', dxMin, setDxMin], ['xMax', dxMax, setDxMax], ['yMin', dyMin, setDyMin], ['yMax', dyMax, setDyMax]].map(
                                ([label, val, setter]) => (
                                    <label key={label} className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                        <span>{label}</span>
                                        <input type="number" step="0.1" value={val} onChange={(e) => setter(e.target.value)}
                                            className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                    </label>
                                ),
                            )}
                        </div>
                    )}
                </label>

                <Slider label={str.subdivLabel} value={n} min={1} max={20} step={1} onChange={setN} />

                <div className="font-mono text-xs text-ink-500 space-y-1 mt-3">
                    <div>{str.riemannLabel} <span className="text-amber-accent">{riemannSum.toFixed(4)}</span></div>
                    <div>{str.refLabel} <span className="text-blue-accent">{referenceValue.toFixed(4)}</span></div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed mt-3">{str.help}</p>
            </div>
            <Scene3D width={420} height={420} build={build} />
        </div>
    )
}