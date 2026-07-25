import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import { evalForm, kernelLine } from '../lib/linearForm'

export default function FormesLineaires() {
    const [a, setA] = useState('2')
    const [b, setB] = useState('1')
    const [px, setPx] = useState('1.5')
    const [py, setPy] = useState('2')

    const av = parseFloat(a) || 0
    const bv = parseFloat(b) || 0
    const pxv = parseFloat(px) || 0
    const pyv = parseFloat(py) || 0
    const value = evalForm(av, bv, pxv, pyv)
    const kernel = kernelLine(av, bv)

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <p className="font-mono text-xs text-ink-500">φ(x, y) = a·x + b·y</p>
                <div className="flex gap-3 rounded-lg border border-ink-700 bg-ink-900 p-3">
                    {[['a', a, setA], ['b', b, setB]].map(([label, val, setter]) => (
                        <label key={label} className="flex items-center gap-2 text-xs font-mono text-ink-500">
                            <span>{label}</span>
                            <input
                                type="number" step="0.1" value={val} onChange={(e) => setter(e.target.value)}
                                className="w-16 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-[#e8ebf0] focus:border-amber-accent outline-none"
                            />
                        </label>
                    ))}
                </div>

                <p className="font-mono text-xs text-ink-500">point v = (x, y) — déplace-le :</p>
                <div className="flex gap-3 rounded-lg border border-ink-700 bg-ink-900 p-3">
                    {[['x', px, setPx], ['y', py, setPy]].map(([label, val, setter]) => (
                        <label key={label} className="flex items-center gap-2 text-xs font-mono text-ink-500">
                            <span>{label}</span>
                            <input
                                type="number" step="0.1" value={val} onChange={(e) => setter(e.target.value)}
                                className="w-16 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-[#e8ebf0] focus:border-amber-accent outline-none"
                            />
                        </label>
                    ))}
                </div>

                <div className="font-mono text-sm text-ink-500">
                    φ(v) = <span className="text-amber-accent">{value.toFixed(2)}</span>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                    La droite en pointillés est le noyau de φ (où φ(v) = 0), toujours
                    perpendiculaire au vecteur (a, b) qui représente φ. Chaque droite parallèle
                    au noyau est une ligne de niveau de φ.
                </p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    if (!kernel) return null
                    const s1 = transform.toScreen(kernel.p1.x, kernel.p1.y)
                    const s2 = transform.toScreen(kernel.p2.x, kernel.p2.y)
                    return (
                        <>
                            <line x1={s1.x} y1={s1.y} x2={s2.x} y2={s2.y} stroke="var(--color-ink-500)" strokeWidth={1.5} strokeDasharray="4 4" />
                            <PlaneVector transform={transform} x={av} y={bv} label="(a,b)" color="var(--color-blue-accent)" />
                            <PlaneVector transform={transform} x={pxv} y={pyv} label="v" />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}