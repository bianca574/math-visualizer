import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import { classifySignature, levelCurve } from '../lib/quadraticForm'
import { useLanguage } from '../context/LanguageContext'
import { topicStrings } from '../lib/topicStrings'

function NumberField({ label, value, onChange }) {
    return (
        <label className="flex items-center gap-2 text-xs font-mono text-ink-500">
            <span className="w-6">{label}</span>
            <input
                type="number"
                step="0.1"
                value={value}
                onChange={(e) => onChange(e.target.value)}
                className="w-20 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-text-primary focus:border-amber-accent outline-none"
            />
        </label>
    )
}

export default function Signature() {
    const [a, setA] = useState('2')
    const [b, setB] = useState('0.5')
    const [c, setC] = useState('1')

    const { lang } = useLanguage()
    const str = topicStrings['signature'][lang]

    const av = parseFloat(a) || 0
    const bv = parseFloat(b) || 0
    const cv = parseFloat(c) || 0
    const result = classifySignature(av, bv, cv, lang)
    const curve = levelCurve(av, bv, cv)

    return (
        <div className="flex flex-col md:flex-row gap-15 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <div className="rounded-lg border border-ink-700 bg-ink-900 p-4 space-y-2">
                    <p className="font-mono text-sm text-ink-500 mb-2">Q(x, y) = a·x² + 2b·xy + c·y²</p>
                    <NumberField label="a" value={a} onChange={setA} />
                    <NumberField label="b" value={b} onChange={setB} />
                    <NumberField label="c" value={c} onChange={setC} />
                </div>
                <div className="font-mono text-xs text-ink-500 space-y-1">
                    <div>λ₁ = {result.l1.toFixed(2)}, λ₂ = {result.l2.toFixed(2)}</div>
                    <div>
                        Signature : ({result.positives}, {result.negatives}) —{' '}
                        <span className="text-amber-accent">{result.label}</span>
                    </div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                    {str.help}
                </p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    if (curve.type === 'degenerate') return null
                    if (curve.type === 'ellipse') {
                        const pts = curve.points.map((p) => transform.toScreen(p.x, p.y))
                        return <polyline points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--color-amber-accent)" strokeWidth={2} />
                    }
                    return curve.branches.map((branch, i) => {
                        const pts = branch.map((p) => transform.toScreen(p.x, p.y))
                        return <polyline key={i} points={pts.map((p) => `${p.x},${p.y}`).join(' ')} fill="none" stroke="var(--color-blue-accent)" strokeWidth={2} />
                    })
                }}
            </CoordinatePlane>
        </div>
    )
}