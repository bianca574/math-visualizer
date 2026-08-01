import { useState } from 'react'
import FunctionPlot from '../components/FunctionPlot'
import { InlineMath } from '../components/Math'
import { powerSeriesPresets, partialSum } from '../lib/powerSeries'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'
import CustomFunctionInput from '../components/CustomFunctionInput'
import { compileFunction } from '../lib/customFunction'

const PLOT_WIDTH = 480
const PLOT_HEIGHT = 340
const SAMPLES = 200

export default function PowerSeries() {
    const [presetId, setPresetId] = useState(powerSeriesPresets[0].id)
    const [nTerms, setNTerms] = useState(5)

    const { lang } = useLanguage()
    const str = topicStrings['power-series'][lang]

    const preset = powerSeriesPresets.find((p) => p.id === presetId)

    const [customExpr, setCustomExpr] = useState('')
    const { fn: customCoeff, error: customError } = customExpr.trim()
        ? compileFunction(customExpr, ['n'])
        : { fn: null, error: null }

    const activePreset = customCoeff
        ? { ...preset, coeff: customCoeff, target: null, radius: null }
        : preset

    const [xMin, xMax] = preset.xRange
    const [yMin, yMax] = preset.yRange

    const targetPoints = []
    const partialPoints = []
    for (let i = 0; i <= SAMPLES; i++) {
        const x = xMin + ((xMax - xMin) * i) / SAMPLES
        if (preset.id === 'ln' && x <= -1) continue

        const t = activePreset.target ? activePreset.target(x) : null
        if (t !== null && Number.isFinite(t) && Math.abs(t) < 1e6) targetPoints.push({ x, y: t })

        const p = partialSum(activePreset, x, nTerms)
        if (Number.isFinite(p) && Math.abs(p) < 1e6) partialPoints.push({ x, y: p })
    }

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-7 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                    <InlineMath math={preset.latex} />
                </div>

                <label className="flex flex-col gap-3 text-xs font-mono text-ink-500">
                    <span>{str.seriesLabel}</span>
                    <select
                        value={presetId}
                        onChange={(e) => {
                            setPresetId(e.target.value)
                            setNTerms(5)
                        }}
                        className="rounded-md border border-ink-700 bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none"
                    >
                        {powerSeriesPresets.map((p) => (
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
                </label>

                <label className="block text-xs text-ink-500 font-mono">
                    <div className="flex justify-between mb-1">
                        <span>{str.termsLabel}</span>
                        <span className="text-text-primary">{nTerms}</span>
                    </div>
                    <input
                        type="range"
                        min={0}
                        max={30}
                        step={1}
                        value={nTerms}
                        onChange={(e) => setNTerms(parseInt(e.target.value, 10))}
                        className="w-full accent-amber-accent"
                    />
                </label>

                {activePreset.radius !== null && (
                    <div className="font-mono text-xs text-ink-500">
                        {str.radiusLabel}{' '}
                        <span className="text-amber-accent">{activePreset.radius === Infinity ? '∞' : activePreset.radius}</span>
                    </div>
                )}

                {preset.domainNote && (
                    <p className="text-xs text-ink-500 italic">{lang === 'en' ? preset.domainNoteEn : preset.domainNote}</p>
                )}
                <p className="text-xs text-ink-500 leading-relaxed">{str.help}</p>
            </div>

            <FunctionPlot width={PLOT_WIDTH} height={PLOT_HEIGHT} xMin={xMin} xMax={xMax} yMin={yMin} yMax={yMax}>
                {(scale) => {
                    const targetPath = targetPoints.map((p) => scale.toScreen(p.x, p.y))
                    const partialPath = partialPoints.map((p) => scale.toScreen(p.x, p.y))

                    const radiusLeft = activePreset.radius !== null ? Math.max(-activePreset.radius, xMin) : xMin
                    const radiusRight = activePreset.radius !== null ? Math.min(activePreset.radius, xMax) : xMax

                    const bandLeft = scale.toScreen(radiusLeft, 0)
                    const bandRight = scale.toScreen(radiusRight, 0)

                    return (
                        <>
                            {activePreset.radius !== null && activePreset.radius !== Infinity && (
                                <rect
                                    x={bandLeft.x}
                                    y={0}
                                    width={bandRight.x - bandLeft.x}
                                    height={PLOT_HEIGHT}
                                    fill="var(--color-ink-500)"
                                    fillOpacity={0.12}
                                />
                            )}
                            <polyline
                                points={targetPath.map((p) => `${p.x},${p.y}`).join(' ')}
                                fill="none"
                                stroke="var(--color-blue-accent)"
                                strokeWidth={1.5}
                                strokeDasharray="5 4"
                            />
                            <polyline
                                points={partialPath.map((p) => `${p.x},${p.y}`).join(' ')}
                                fill="none"
                                stroke="var(--color-amber-accent)"
                                strokeWidth={2}
                            />
                        </>
                    )
                }}
            </FunctionPlot>
        </div>
    )
}