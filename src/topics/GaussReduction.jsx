import { useState } from 'react'
import { BlockMath } from '../components/Math'
import { gaussReductionSteps } from '../lib/gaussReduction'
import { useLanguage } from '../context/useLanguage'

export default function GaussReduction() {
    const [a, setA] = useState('1')
    const [b, setB] = useState('2')
    const [c, setC] = useState('1')

    const { lang } = useLanguage()

    const av = parseFloat(a) || 0
    const bv = parseFloat(b) || 0
    const cv = parseFloat(c) || 0
    const { steps } = gaussReductionSteps(av, bv, cv, lang)

    return (
        <div className="max-w-2xl space-y-4">
            <div className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                <BlockMath math="Q(x,y) = a\,x^2 + 2b\,xy + c\,y^2" />
            </div>

            <div className="flex gap-3">
                {[['a', a, setA], ['b', b, setB], ['c', c, setC]].map(([label, val, setter]) => (
                    <label key={label} className="flex items-center gap-2 text-xs font-mono text-ink-500">
                        <span>{label}</span>
                        <input
                            type="number"
                            step="0.1"
                            value={val}
                            onChange={(e) => setter(e.target.value)}
                            className="w-20 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-text-primary focus:border-amber-accent outline-none"
                        />
                    </label>
                ))}
            </div>

            <div className="space-y-3">
                {steps.map((step, i) => (
                    <div key={i} className="rounded-lg border border-ink-700 bg-ink-900 p-4">
                        <div className="font-mono text-[10px] uppercase tracking-wide text-ink-500 mb-2">Étape {i + 1}</div>
                        <BlockMath math={step.text} />
                    </div>
                ))}
            </div>
        </div>
    )
}