import { useState } from 'react'
import CoordinatePlane from '../components/CoordinatePlane'
import PlaneVector from '../components/PlaneVector'
import { dot, norm, projectOnto } from '../lib/projection'

export default function DotProductProjection() {
    const [ux, setUx] = useState('3')
    const [uy, setUy] = useState('1')
    const [vx, setVx] = useState('1')
    const [vy, setVy] = useState('2.5')

    const u = { x: parseFloat(ux) || 0, y: parseFloat(uy) || 0 }
    const v = { x: parseFloat(vx) || 0, y: parseFloat(vy) || 0 }
    const p = projectOnto(v, u)

    const dotProduct = dot(u, v)
    const nu = norm(u)
    const nv = norm(v)
    const cosTheta = nu > 1e-9 && nv > 1e-9 ? dotProduct / (nu * nv) : null
    const angleDeg = cosTheta !== null ? (Math.acos(Math.max(-1, Math.min(1, cosTheta))) * 180) / Math.PI : null

    return (
        <div className="flex flex-col md:flex-row gap-6 items-start">
            <div className="flex flex-col gap-3 w-full max-w-xs">
                <p className="font-mono text-xs text-ink-500">Déplace u et v :</p>
                <div className="grid grid-cols-2 gap-3 rounded-lg border border-ink-700 bg-ink-900 p-3">
                    {[['ux', ux, setUx], ['uy', uy, setUy], ['vx', vx, setVx], ['vy', vy, setVy]].map(([label, val, setter]) => (
                        <label key={label} className="flex items-center gap-2 text-xs font-mono text-ink-500">
                            <span>{label}</span>
                            <input
                                type="number" step="0.1" value={val} onChange={(e) => setter(e.target.value)}
                                className="w-14 text-center rounded-md border border-ink-700 bg-ink-800 py-1 text-[#e8ebf0] focus:border-amber-accent outline-none"
                            />
                        </label>
                    ))}
                </div>

                <div className="font-mono text-xs text-ink-500 space-y-1">
                    <div>⟨u,v⟩ = <span className="text-amber-accent">{dotProduct.toFixed(2)}</span></div>
                    <div>‖u‖ = {nu.toFixed(2)}, ‖v‖ = {nv.toFixed(2)}</div>
                    <div>angle(u,v) = {angleDeg !== null ? `${angleDeg.toFixed(1)}°` : '—'}</div>
                    <div>proj_u(v) = ({p.x.toFixed(2)}, {p.y.toFixed(2)})</div>
                </div>
                <p className="text-xs text-ink-500 leading-relaxed">
                    Le segment vert relie v à sa projection : il est toujours perpendiculaire à u.
                    ⟨u,v⟩ = 0 (u et v orthogonaux) exactement quand la projection s'annule.
                </p>
            </div>

            <CoordinatePlane width={420} height={420}>
                {(transform) => {
                    const uEnd = transform.toScreen(u.x, u.y)
                    const uLineStart = transform.toScreen(-u.x * 3, -u.y * 3)
                    const uLineEnd = transform.toScreen(u.x * 3, u.y * 3)
                    const vScreen = transform.toScreen(v.x, v.y)
                    const pScreen = transform.toScreen(p.x, p.y)
                    return (
                        <>
                            <line x1={uLineStart.x} y1={uLineStart.y} x2={uLineEnd.x} y2={uLineEnd.y} stroke="var(--color-ink-500)" strokeWidth={1} strokeDasharray="4 4" />
                            <line x1={vScreen.x} y1={vScreen.y} x2={pScreen.x} y2={pScreen.y} stroke="var(--color-green-ok)" strokeWidth={1.5} strokeDasharray="3 3" />
                            <PlaneVector transform={transform} x={u.x} y={u.y} label="u" color="var(--color-blue-accent)" />
                            <PlaneVector transform={transform} x={v.x} y={v.y} label="v" />
                            <PlaneVector transform={transform} x={p.x} y={p.y} label="proj" color="var(--color-green-ok)" />
                        </>
                    )
                }}
            </CoordinatePlane>
        </div>
    )
}