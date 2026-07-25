import { useState, useMemo } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { functionSeriesPresets, supError } from '../lib/functionSeries'

const MAIN_W = 460
const MAIN_H = 300
const ERR_W = 460
const ERR_H = 160
const MAX_N = 60

export default function FunctionSeries() {
    const [presetId, setPresetId] = useState(functionSeriesPresets[0].id)
    const [n, setN] = useState(1)

    const preset = functionSeriesPresets.find((p) => p.id === presetId)
    const [a, b] = preset.domain

    const fnPoints = []
    const limitPoints = []
    const SAMPLES = 200
    for (let i = 0; i <= SAMPLES; i++) {
        const x = a + ((b - a) * i) / SAMPLES
        fnPoints.push({ x, y: preset.fn(x, n) })
        limitPoints.push({ x, y: preset.limit(x) })
    }

    const currentError = useMemo(() => supError(preset, n), [preset, n])
    const errorCurve = useMemo(() => {
        const pts = []
        for (let k = 1; k <= MAX_N; k++) pts.push({ n: k, err: supError(preset, k) })
        return pts
    }, [preset])
    const maxErr = Math.max(...errorCurve.map((p) => p.err), 0.05)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-6 items-start">
                <div className="flex flex-col gap-4 w-full max-w-xs">
                    <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                        <InlineMath math={preset.latex} />
                    </div>

                    <label className="flex flex-col gap-1 text-xs font-mono text-ink-500">
                        <span>fonction</span>
                        <select
                            value={presetId}
                            onChange={(e) => {
                                setPresetId(e.target.value)
                                setN(1)
                            }}
                            className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-[#e8ebf0] focus:border-amber-accent outline-none"
                        >
                            {functionSeriesPresets.map((p) => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block text-xs text-ink-500 font-mono">
                        <div className="flex justify-between mb-1">
                            <span>n</span>
                            <span className="text-[#e8ebf0]">{n}</span>
                        </div>
                        <input
                            type="range"
                            min={1}
                            max={MAX_N}
                            step={1}
                            value={n}
                            onChange={(e) => setN(parseInt(e.target.value, 10))}
                            className="w-full accent-amber-accent"
                        />
                    </label>

                    <div className="font-mono text-xs text-ink-500 space-y-1">
                        <div>sup|fₙ − f| ≈ {currentError.toFixed(3)}</div>
                        <div>
                            {preset.uniform ? (
                                <span className="text-amber-accent">convergence uniforme</span>
                            ) : (
                                <span className="text-blue-accent">convergence simple seulement</span>
                            )}
                        </div>
                    </div>

                    <p className="text-xs text-ink-500 leading-relaxed">{preset.note}</p>
                </div>

                <FunctionPlot width={MAIN_W} height={MAIN_H} xMin={a} xMax={b} yMin={preset.yRange[0]} yMax={preset.yRange[1]}>
                    {(scale) => {
                        const fnPath = fnPoints.map((p) => scale.toScreen(p.x, p.y))
                        const limitPath = limitPoints.map((p) => scale.toScreen(p.x, p.y))
                        return (
                            <>
                                <polyline
                                    points={limitPath.map((p) => `${p.x},${p.y}`).join(' ')}
                                    fill="none"
                                    stroke="var(--color-blue-accent)"
                                    strokeWidth={1.5}
                                    strokeDasharray="5 4"
                                />
                                <polyline
                                    points={fnPath.map((p) => `${p.x},${p.y}`).join(' ')}
                                    fill="none"
                                    stroke="var(--color-amber-accent)"
                                    strokeWidth={2}
                                />
                            </>
                        )
                    }}
                </FunctionPlot>
            </div>

            <div className="max-w-xl">
                <p className="text-xs text-ink-500 mb-2">
                    sup|fₙ − f| en fonction de n — si la courbe tend vers 0, la convergence est
                    uniforme ; si elle plafonne au-dessus de 0, elle ne l'est pas.
                </p>
                <FunctionPlot width={ERR_W} height={ERR_H} xMin={1} xMax={MAX_N} yMin={0} yMax={maxErr * 1.15}>
                    {(scale) => {
                        const path = errorCurve.map((p) => scale.toScreen(p.n, p.err))
                        const current = scale.toScreen(n, currentError)
                        return (
                            <>
                                <polyline
                                    points={path.map((p) => `${p.x},${p.y}`).join(' ')}
                                    fill="none"
                                    stroke="var(--color-amber-accent)"
                                    strokeWidth={2}
                                />
                                <circle cx={current.x} cy={current.y} r={4} fill="var(--color-blue-accent)" />
                            </>
                        )
                    }}
                </FunctionPlot>
            </div>
        </div>
    )
}