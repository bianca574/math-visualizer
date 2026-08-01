import { useMemo, useState } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { parametricIntegralPresets, integrate } from '../lib/parametricIntegral'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'
import CustomFunctionInput from '../components/CustomFunctionInput'
import { compileFunction } from '../lib/customFunction'

const PLOT_W = 440
const PLOT_H = 300
const I_SAMPLES = 80

export default function ParametricIntegral() {
    const [presetId, setPresetId] = useState(parametricIntegralPresets[0].id)
    const preset = parametricIntegralPresets.find((p) => p.id === presetId)

    const [customExpr, setCustomExpr] = useState('')
    const [domA, setDomA] = useState('0')
    const [domB, setDomB] = useState('1')
    const [tMinC, setTMinC] = useState('0')
    const [tMaxC, setTMaxC] = useState('5')
    const { fn: customFn, error: customError } = customExpr.trim()
        ? compileFunction(customExpr, ['x', 't'])
        : { fn: null, error: null }

    const activeFn = customFn || preset.fn
    const [a, b] = customFn ? [parseFloat(domA) || 0, parseFloat(domB) || 1] : preset.domain
    const [tMin, tMax] = customFn ? [parseFloat(tMinC) || 0, parseFloat(tMaxC) || 1] : preset.tRange

    const [t, setT] = useState((tMin + tMax) / 2)

    const { lang } = useLanguage()
    const str = topicStrings['parametric-integrals'][lang]

    const currentIntegral = useMemo(() => integrate((x) => activeFn(x, t), a, b), [preset, t, a, b, customExpr])

    const integrandPoints = []
    for (let i = 0; i <= 200; i++) {
        const x = a + ((b - a) * i) / 200
        integrandPoints.push({ x, y: activeFn(x, t) })
    }

    const iOfTPoints = useMemo(() => {
        const pts = []
        for (let i = 0; i <= I_SAMPLES; i++) {
            const tv = tMin + ((tMax - tMin) * i) / I_SAMPLES
            pts.push({ t: tv, value: integrate((x) => activeFn(x, tv), a, b) })
        }
        return pts
    }, [preset, tMin, tMax, a, b, customExpr])

    const targetPoints = useMemo(() => {

        if (!preset.target || customFn) return []

        const pts = []
        for (let i = 0; i <= I_SAMPLES; i++) {
            const tv = tMin + ((tMax - tMin) * i) / I_SAMPLES
            const val = preset.target(tv)
            if (val !== null && Number.isFinite(val)) pts.push({ t: tv, value: val })
        }
        return pts
    }, [preset, tMin, tMax, customFn])

    const iYMin = Math.min(...iOfTPoints.map((p) => p.value)) - 0.3
    const iYMax = Math.max(...iOfTPoints.map((p) => p.value)) + 0.3

    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col md:flex-row gap-7 md:gap-35 items-start">
                <div className="flex flex-col gap-5 w-full max-w-xs">
                    <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                        <InlineMath math={preset.integrandLatex} />
                    </div>

                    <label className="flex flex-col gap-3 text-xs font-mono text-ink-500">
                        <span>{str.integralLabel}</span>
                        <select
                            value={presetId}
                            onChange={(e) => {
                                setPresetId(e.target.value)
                                const np = parametricIntegralPresets.find((p) => p.id === e.target.value)
                                setT((np.tRange[0] + np.tRange[1]) / 2)
                            }}
                            className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none"
                        >
                            {parametricIntegralPresets.map((p) => (
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
                            <>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                        <span>a</span>
                                        <input type="number" step="0.1" value={domA} onChange={(e) => setDomA(e.target.value)}
                                            className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                    </label>
                                    <label className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                        <span>b</span>
                                        <input type="number" step="0.1" value={domB} onChange={(e) => setDomB(e.target.value)}
                                            className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                    </label>
                                </div>
                                <div className="flex gap-2">
                                    <label className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                        <span>t min</span>
                                        <input type="number" step="0.1" value={tMinC} onChange={(e) => setTMinC(e.target.value)}
                                            className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                    </label>
                                    <label className="flex items-center gap-3 text-xs font-mono text-ink-500">
                                        <span>t max</span>
                                        <input type="number" step="0.1" value={tMaxC} onChange={(e) => setTMaxC(e.target.value)}
                                            className="w-16 rounded-md border border-ink-700 bg-ink-800 py-1 px-2 text-text-primary focus:border-amber-accent outline-none" />
                                    </label>
                                </div>
                            </>
                        )}
                    </label>

                    <label className="block text-xs text-ink-500 font-mono">
                        <div className="flex justify-between mb-1">
                            <span>t</span>
                            <span className="text-text-primary">{t.toFixed(2)}</span>
                        </div>
                        <input
                            type="range"
                            min={tMin} max={tMax} step={(tMax - tMin) / 200}
                            value={t}
                            onChange={(e) => setT(parseFloat(e.target.value))}
                            className="w-full accent-amber-accent"
                        />
                    </label>

                    <div className="font-mono text-xs text-ink-500">
                        I({t.toFixed(2)}) ≈ <span className="text-amber-accent">{currentIntegral.toFixed(4)}</span>
                    </div>
                    <p className="text-xs text-ink-500 leading-relaxed">{str.help}</p>
                </div>

                <div className="flex flex-col gap-4">
                    <FunctionPlot width={PLOT_W} height={PLOT_H} xMin={a} xMax={b} yMin={preset.yRangeIntegrand[0]} yMax={preset.yRangeIntegrand[1]}>
                        {(scale) => {
                            const path = integrandPoints.map((p) => scale.toScreen(p.x, p.y))
                            const zeroY = scale.toScreen(0, 0).y
                            const areaPath = [
                                `M ${path[0].x},${zeroY}`,
                                ...path.map((p) => `L ${p.x},${p.y}`),
                                `L ${path[path.length - 1].x},${zeroY}`,
                                'Z',
                            ].join(' ')
                            return (
                                <>
                                    <path d={areaPath} fill="var(--color-amber-accent)" fillOpacity={0.18} stroke="none" />
                                    <polyline points={path.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--color-amber-accent)" strokeWidth={2} />
                                </>
                            )
                        }}
                    </FunctionPlot>
                </div>
            </div>

            <div className="max-w-xl mt-1">
                <FunctionPlot width={PLOT_W + 40} height={200} xMin={tMin} xMax={tMax} yMin={iYMin} yMax={iYMax}>
                    {(scale) => {
                        const iPath = iOfTPoints.map((p) => scale.toScreen(p.t, p.value))
                        const targetPath = targetPoints.map((p) => scale.toScreen(p.t, p.value))
                        const marker = scale.toScreen(t, currentIntegral)
                        return (
                            <>
                                <polyline
                                    points={iPath.map((p) => `${p.x},${p.y}`).join(' ')}
                                    fill="none" stroke="var(--color-amber-accent)" strokeWidth={2}
                                />
                                <polyline
                                    points={targetPath.map((p) => `${p.x},${p.y}`).join(' ')}
                                    fill="none" stroke="var(--color-blue-accent)" strokeWidth={1.5} strokeDasharray="5 4"
                                />
                                <circle cx={marker.x} cy={marker.y} r={4.5} fill="var(--color-amber-accent)" />
                            </>
                        )
                    }}
                </FunctionPlot>
            </div>
        </div>
    )
}