import { useMemo, useState } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { sequencePresets, findThresholdN } from '../lib/sequences'

const PLOT_WIDTH = 480
const PLOT_HEIGHT = 340
const PLOT_MIN_N = 40

export default function EpsilonN() {
    const [presetId, setPresetId] = useState(sequencePresets[0].id)
    const [epsilon, setEpsilon] = useState(0.2)

    const preset = sequencePresets.find((p) => p.id === presetId)
    const N = useMemo(() => findThresholdN(preset.fn, preset.limit, epsilon), [preset, epsilon])

    const plotN = Math.max(PLOT_MIN_N, N ? N + 15 : PLOT_MIN_N)
    const points = []
    for (let n = 1; n <= plotN; n++) points.push({ n, value: preset.fn(n) })

    const deviations = points.map((p) => Math.abs(p.value - preset.limit))
    const maxDev = Math.max(...deviations, epsilon * 1.5, 0.3)
    const yMin = preset.limit - maxDev * 1.15
    const yMax = preset.limit + maxDev * 1.15

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-4 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                    <InlineMath math={preset.latex} />
                </div>

                <label className="flex flex-col gap-1 text-xs font-mono text-ink-500">
                    <span>suite</span>
                    <select
                        value={presetId}
                        onChange={(e) => setPresetId(e.target.value)}
                        className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-[#e8ebf0] focus:border-amber-accent outline-none"
                    >
                        {sequencePresets.map((p) => (
                            <option key={p.id} value={p.id}>{p.label}</option>
                        ))}
                    </select>
                </label>

                <label className="block text-xs text-ink-500 font-mono">
                    <div className="flex justify-between mb-1">
                        <span>ε</span>
                        <span className="text-[#e8ebf0]">{epsilon.toFixed(2)}</span>
                    </div>
                    <input
                        type="range"
                        min={0.01}
                        max={1}
                        step={0.01}
                        value={epsilon}
                        onChange={(e) => setEpsilon(parseFloat(e.target.value))}
                        className="w-full accent-amber-accent"
                    />
                </label>

                <div className="font-mono text-xs text-ink-500 space-y-1">
                    <div>limite L = {preset.limit.toFixed(3)}</div>
                    <div>
                        N = {N ? <span className="text-amber-accent">{N}</span> : <span className="text-blue-accent">non trouvé ≤ 500</span>}
                    </div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                    Pour l'ε choisi, N est le plus petit rang à partir duquel tous les termes
                    restent dans la bande [L-ε, L+ε]. Diminue ε pour voir N augmenter.
                </p>
            </div>

            <FunctionPlot width={PLOT_WIDTH} height={PLOT_HEIGHT} xMin={0} xMax={plotN + 1} yMin={yMin} yMax={yMax}>
                {(scale) => {
                    const bandTop = scale.toScreen(0, preset.limit + epsilon)
                    const bandBottom = scale.toScreen(0, preset.limit - epsilon)
                    const limitY = scale.toScreen(0, preset.limit)
                    const nLineX = N ? scale.toScreen(N, 0).x : null

                    return (
                        <>
                            <rect
                                x={0}
                                y={bandTop.y}
                                width={PLOT_WIDTH}
                                height={bandBottom.y - bandTop.y}
                                fill="var(--color-amber-accent)"
                                fillOpacity={0.12}
                            />
                            <line x1={0} y1={limitY.y} x2={PLOT_WIDTH} y2={limitY.y} stroke="var(--color-amber-accent)" strokeWidth={1} strokeDasharray="4 4" />

                            {nLineX !== null && (
                                <line x1={nLineX} y1={0} x2={nLineX} y2={PLOT_HEIGHT} stroke="var(--color-blue-accent)" strokeWidth={1.5} strokeDasharray="3 3" />
                            )}

                            {points.map((p) => {
                                const s = scale.toScreen(p.n, p.value)
                                const within = Math.abs(p.value - preset.limit) < epsilon
                                return (
                                    <circle key={p.n} cx={s.x} cy={s.y} r={3} fill={within ? 'var(--color-amber-accent)' : 'var(--color-ink-500)'} />
                                )
                            })}
                        </>
                    )
                }}
            </FunctionPlot>
        </div>
    )
}