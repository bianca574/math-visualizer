import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import { classifyConic, conicPoints } from '../lib/conic'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

function NumberField({ label, value, onChange }) {
    return (
        <label className="flex items-center gap-2 text-xs font-mono text-ink-500">
            <span className="w-4">{label}</span>
            <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-16 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-text-primary focus:border-amber-accent outline-none"
            />
        </label>
    )
}

const initial = { A: '1', B: '0', C: '1', D: '0', E: '0', F: '-4' }

export default function ConicsQuadrics() {
    const [coeffs, setCoeffs] = useState(initial)

    const { lang } = useLanguage()
    const str = topicStrings['conics-quadrics'][lang]

    const numeric = Object.fromEntries(Object.entries(coeffs).map(([k, v]) => [k, parseFloat(v) || 0]))
    const type = classifyConic(numeric.A, numeric.B, numeric.C, lang)

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <p className="font-mono text-xs text-ink-500">A·x² + B·xy + C·y² + D·x + E·y + F = 0</p>
                <div className="grid grid-cols-3 gap-2 rounded-lg border border-ink-700 bg-ink-900 p-3">
                    {Object.entries(coeffs).map(([key, val]) => (
                        <NumberField key={key} label={key} value={val} onChange={(v) => setCoeffs((prev) => ({ ...prev, [key]: v }))} />
                    ))}
                </div>
                <div className="font-mono text-sm">
                    {str.typeLabel} : <span className="text-amber-accent">{type}</span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">{str.help}</p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    const pts = conicPoints(numeric, transform.xMin, transform.xMax)
                    return pts.map((p, i) => {
                        const s = transform.toScreen(p.x, p.y)
                        return <circle key={i} cx={s.x} cy={s.y} r={1.6} fill="var(--color-amber-accent)" />
                    })
                }}
            </CoordinatePlane>
        </div>
    )
}