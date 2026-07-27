import { useState } from 'react'
import Scene3D from '../components/Scene3D'
import Slider from '../components/Slider'
import { InlineMath } from '../components/Math'
import { multipleIntegralPresets, integrate2D } from '../lib/multipleIntegral'
import { buildSurfaceGeometry } from '../lib/surfaceMesh'

export default function MultipleIntegrals() {
    const [presetId, setPresetId] = useState(multipleIntegralPresets[0].id)
    const [n, setN] = useState(6)
    const preset = multipleIntegralPresets.find((p) => p.id === presetId)
    const [xMin, xMax, yMin, yMax] = preset.domain

    const referenceValue = integrate2D(preset.fn, xMin, xMax, yMin, yMax, 80)

    const cellW = (xMax - xMin) / n
    const cellD = (yMax - yMin) / n
    let riemannSum = 0
    const cells = []
    for (let i = 0; i < n; i++) {
        const cx = xMin + (i + 0.5) * cellW
        for (let j = 0; j < n; j++) {
            const cy = yMin + (j + 0.5) * cellD
            const value = preset.fn(cx, cy)
            riemannSum += value * cellW * cellD
            cells.push({ cx, cy, value })
        }
    }

    function build(content, THREE) {
        const geometry = buildSurfaceGeometry(THREE, preset.fn, xMin, xMax, yMin, yMax, 40)
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
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                    <InlineMath math={preset.latex} />
                </div>

                <label className="flex flex-col gap-3 text-xs font-mono text-ink-500">
                    <span>Fonction</span>
                    <select
                        value={presetId}
                        onChange={(e) => setPresetId(e.target.value)}
                        className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-[#e8ebf0] focus:border-amber-accent outline-none"
                    >
                        {multipleIntegralPresets.map((p) => (
                            <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                    </select>
                </label>

                <Slider label="Subdivisions par côté (n)" value={n} min={1} max={20} step={1} onChange={setN} />

                <div className="font-mono text-xs text-ink-500 space-y-1">
                    <div>Somme de Riemann (n×n) ≈ <span className="text-amber-accent">{riemannSum.toFixed(4)}</span></div>
                    <div>Valeur de référence ≈ <span className="text-blue-accent">{referenceValue.toFixed(4)}</span></div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                    Chaque prisme a pour base une cellule de la grille et pour hauteur
                    |f(milieu de la cellule)| — bleu si f y est négative. Augmente n pour voir
                    la somme de Riemann se rapprocher de la valeur de référence.
                </p>
            </div>
            <Scene3D width={420} height={420} build={build} />
        </div>
    )
}