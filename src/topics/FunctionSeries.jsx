import { useState, useMemo } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { functionSeriesPresets, supError } from '../lib/functionSeries'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'
import CustomFunctionInput from '../components/CustomFunctionInput'
import { compileFunction } from '../lib/customFunction'

const MAIN_W = 460
const MAIN_H = 300
const ERR_W = 460
const ERR_H = 160
const MAX_N = 60

export default function FunctionSeries() {
    const [presetId, setPresetId] = useState(functionSeriesPresets[0].id)
    const [n, setN] = useState(1)

    const { lang } = useLanguage()
    const str = topicStrings['function-series'][lang]

    const preset = functionSeriesPresets.find((p) => p.id === presetId)

    const [customExpr, setCustomExpr] = useState('')
    const [domainA, setDomainA] = useState('0')
    const [domainB, setDomainB] = useState('1')
    const { fn: customFn, error: customError } = customExpr.trim()
        ? compileFunction(customExpr, ['x', 'n'])
        : { fn: null, error: null }

    const activeFn = customFn ? (x, nv) => customFn(x, nv) : preset.fn
    const activeLimit = customFn ? (x) => customFn(x, 1000) : preset.limit
    const [a, b] = customFn ? [parseFloat(domainA) || 0, parseFloat(domainB) || 1] : preset.domain

    const fnPoints = []
    const limitPoints = []
    const SAMPLES = 200

    for (let i = 0; i <= SAMPLES; i++) {
        const x = a + ((b - a) * i) / SAMPLES
        fnPoints.push({ x, y: activeFn(x, n) })
        limitPoints.push({ x, y: activeLimit(x) })
    }

    const activePreset = customFn ? { ...preset, fn: activeFn, limit: activeLimit, domain: [a, b] } : preset
    const currentError = useMemo(() => supError(activePreset, n), [activePreset, n])
    const errorCurve = useMemo(() => {
        const pts = []
        for (let k = 1; k <= MAX_N; k++) pts.push({ n: k, err: supError(activePreset, k) })
        return pts
    }, [activePreset])

    const maxErr = Math.max(...errorCurve.map((p) => p.err), 0.05)

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col md:flex-row gap-15 items-start">
                <div className="flex flex-col gap-7 w-full max-w-xs">
                    <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                        <InlineMath math={preset.latex} />
                    </div>

                    <label className="flex flex-col gap-3 text-xs font-mono text-ink-500">
                        <span>{str.fnLabel}</span>
                        <select
                            value={presetId}
                            onChange={(e) => {
                                setPresetId(e.target.value)
                                setN(1)
                            }}
                            className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none"
                        >
                            {functionSeriesPresets.map((p) => (
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
                            <div className="flex gap-2">
                                <label className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                    <span>a</span>
                                    <input type="number" step="0.1" value={domainA} onChange={(e) => setDomainA(e.target.value)}
                                        className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                </label>
                                <label className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                    <span>b</span>
                                    <input type="number" step="0.1" value={domainB} onChange={(e) => setDomainB(e.target.value)}
                                        className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                </label>
                            </div>
                        )}
                    </label>

                    <label className="block text-xs text-ink-500 font-mono">
                        <div className="flex justify-between mb-1">
                            <span>n</span>
                            <span className="text-text-primary">{n}</span>
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
                                <span className="text-amber-accent">{str.uniform}</span>
                            ) : (
                                <span className="text-blue-accent">{str.nonUniform}</span>
                            )}
                        </div>
                    </div>

                    <p className="text-xs text-ink-500 leading-relaxed">{lang === 'en' ? preset.noteEn : preset.note}</p>
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
                <p className="text-xs text-ink-500 mb-2">{str.errNote}</p>
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