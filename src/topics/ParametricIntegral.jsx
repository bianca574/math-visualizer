import { useMemo, useState } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { parametricIntegralPresets, integrate } from '../lib/parametricIntegral'

const PLOT_W = 440
const PLOT_H = 300
const I_SAMPLES = 80

export default function ParametricIntegral() {
    const [presetId, setPresetId] = useState(parametricIntegralPresets[0].id)
    const preset = parametricIntegralPresets.find((p) => p.id === presetId)
    const [tMin, tMax] = preset.tRange
    const [a, b] = preset.domain

    const [t, setT] = useState((tMin + tMax) / 2)

    const currentIntegral = useMemo(() => integrate((x) => preset.fn(x, t), a, b), [preset, t, a, b])

    const integrandPoints = []
    for (let i = 0; i <= 200; i++) {
        const x = a + ((b - a) * i) / 200
        integrandPoints.push({ x, y: preset.fn(x, t) })
    }

    const iOfTPoints = useMemo(() => {
        const pts = []
        for (let i = 0; i <= I_SAMPLES; i++) {
            const tv = tMin + ((tMax - tMin) * i) / I_SAMPLES
            pts.push({ t: tv, value: integrate((x) => preset.fn(x, tv), a, b) })
        }
        return pts
    }, [preset, tMin, tMax, a, b])

    const targetPoints = useMemo(() => {
        const pts = []
        for (let i = 0; i <= I_SAMPLES; i++) {
            const tv = tMin + ((tMax - tMin) * i) / I_SAMPLES
            const val = preset.target(tv)
            if (val !== null && Number.isFinite(val)) pts.push({ t: tv, value: val })
        }
        return pts
    }, [preset, tMin, tMax])

    const iYMin = Math.min(...iOfTPoints.map((p) => p.value)) - 0.3
    const iYMax = Math.max(...iOfTPoints.map((p) => p.value)) + 0.3

    return (
        <div className="flex flex-col gap-7">
            <div className="flex flex-col md:flex-row gap-7 md:gap-35 items-start">
                <div className="flex flex-col gap-5 w-full max-w-xs">
                    <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                        <InlineMath math={preset.integrandLatex} />
                    </div>

                    <label className="flex flex-col gap-1 text-xs font-mono text-ink-500">
                        <span>Intégrale</span>
                        <select
                            value={presetId}
                            onChange={(e) => {
                                setPresetId(e.target.value)
                                const np = parametricIntegralPresets.find((p) => p.id === e.target.value)
                                setT((np.tRange[0] + np.tRange[1]) / 2)
                            }}
                            className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-[#e8ebf0] focus:border-amber-accent outline-none"
                        >
                            {parametricIntegralPresets.map((p) => (
                                <option key={p.id} value={p.id}>{p.label}</option>
                            ))}
                        </select>
                    </label>

                    <label className="block text-xs text-ink-500 font-mono">
                        <div className="flex justify-between mb-1">
                            <span>t</span>
                            <span className="text-[#e8ebf0]">{t.toFixed(2)}</span>
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
                    <p className="text-xs text-ink-500 leading-relaxed">
                        Ci-contre : f(x,t) pour le t actuel — l'aire ambrée est I(t). En dessous :
                        I(t) en fonction de t, calculée numériquement (ambre) contre la formule
                        connue (bleu pointillé) — les deux courbes devraient coïncider.
                    </p>
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