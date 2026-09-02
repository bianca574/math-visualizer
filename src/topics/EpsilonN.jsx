import { useMemo, useState } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { sequencePresets, findThresholdN } from '../lib/sequences'
import { useLanguage } from '../context/useLanguage'
import { topicStrings } from '../lib/topicStrings'
import CustomFunctionInput from '../components/CustomFunctionInput'
import { compileFunction } from '../lib/customFunction'

const PLOT_WIDTH = 480
const PLOT_HEIGHT = 340
const PLOT_MIN_N = 40

export default function EpsilonN() {
    const [presetId, setPresetId] = useState(sequencePresets[0].id)
    const [epsilon, setEpsilon] = useState(0.2)

    const { lang } = useLanguage()
    const str = topicStrings['epsilon-n'][lang]

    const preset = sequencePresets.find((p) => p.id === presetId)

    const [customExpr, setCustomExpr] = useState('')
    const [customLimit, setCustomLimit] = useState('0')
    const { fn: customFn, error: customError } = customExpr.trim()
        ? compileFunction(customExpr, ['n'])
        : { fn: null, error: null }

    const activeFn = customFn || preset.fn
    const activeLimit = customFn ? parseFloat(customLimit) || 0 : preset.limit

    const N = useMemo(() => findThresholdN(activeFn, activeLimit, epsilon), [epsilon, activeFn, activeLimit])

    const plotN = Math.max(PLOT_MIN_N, N ? N + 15 : PLOT_MIN_N)
    const points = []
    for (let n = 1; n <= plotN; n++) points.push({ n, value: activeFn(n) })

    const deviations = points.map((p) => Math.abs(p.value - activeLimit))
    const maxDev = Math.max(...deviations, epsilon * 1.5, 0.3)
    const yMin = activeLimit - maxDev * 1.15
    const yMax = activeLimit + maxDev * 1.15

    return (
        <div className="flex flex-col md:flex-row gap-25 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                    <InlineMath math={preset.latex} />
                </div>

                <label className="flex flex-col gap-3 text-xs font-mono text-ink-500 mt-3 mb-3">
                    <span className="block mb-2">{str.sequenceLabel}</span>
                    <select
                        value={presetId}
                        onChange={(e) => setPresetId(e.target.value)}
                        className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none"
                    >
                        {sequencePresets.map((p) => (
                            <option key={p.id} value={p.id}>{p.label}</option>
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
                        <label className="flex flex-col gap-3 text-xs font-mono text-ink-500 mt-3 mb-3">
                            <span>limite L =</span>
                            <input
                                type="number" step="0.1" value={customLimit}
                                onChange={(e) => setCustomLimit(e.target.value)}
                                className="w-24 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none"
                            />
                        </label>
                    )}
                </label>

                <label className="block text-xs text-ink-500 font-mono">
                    <div className="flex justify-between mb-1">
                        <span>ε</span>
                        <span className="text-text-primary">{epsilon.toFixed(2)}</span>
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
                    <div>{str.limitLabel} {activeLimit.toFixed(3)}</div>
                    <div>
                        {str.nLabel} {N ? <span className="text-amber-accent">{N}</span> : <span className="text-blue-accent">{str.notFound}</span>}
                    </div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed mt-3">{str.help}</p>
            </div>

            <FunctionPlot width={PLOT_WIDTH} height={PLOT_HEIGHT} xMin={0} xMax={plotN + 1} yMin={yMin} yMax={yMax}>
                {(scale) => {
                    const bandTop = scale.toScreen(0, activeLimit + epsilon)
                    const bandBottom = scale.toScreen(0, activeLimit - epsilon)
                    const limitY = scale.toScreen(0, activeLimit)
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
                                const within = Math.abs(p.value - activeLimit) < epsilon
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