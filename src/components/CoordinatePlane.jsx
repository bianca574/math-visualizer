import { useRef, useState, useEffect } from 'react'
import { makeTransform } from '../lib/coordinates'

const DEFAULT_RANGE = { xMin: -5, xMax: 5, yMin: -5, yMax: 5 }

export default function CoordinatePlane({
    width = 480,
    height = 480,
    initialRange = DEFAULT_RANGE,
    gridStep = 1,
    children,
}) {
    const [range, setRange] = useState(initialRange)
    const svgRef = useRef(null)
    const dragState = useRef(null)
    const rangeRef = useRef(range)

    useEffect(() => {
        rangeRef.current = range
    }, [range])

    const transform = makeTransform({ width, height, ...range })

    // native (non-React) wheel listener, because React's onWheel is passive
    // by default and can't reliably block the page from scrolling underneath
    useEffect(() => {
        const el = svgRef.current
        if (!el) return
        const onWheel = (e) => {
            e.preventDefault()
            const zoomFactor = e.deltaY > 0 ? 1.1 : 0.9
            setRange((r) => {
                const cx = (r.xMin + r.xMax) / 2
                const cy = (r.yMin + r.yMax) / 2
                const halfX = ((r.xMax - r.xMin) / 2) * zoomFactor
                const halfY = ((r.yMax - r.yMin) / 2) * zoomFactor
                return { xMin: cx - halfX, xMax: cx + halfX, yMin: cy - halfY, yMax: cy + halfY }
            })
        }
        el.addEventListener('wheel', onWheel, { passive: false })
        return () => el.removeEventListener('wheel', onWheel)
    }, [])

    const handlePointerDown = (e) => {
        dragState.current = { startX: e.clientX, startY: e.clientY, range: rangeRef.current }
        e.currentTarget.setPointerCapture(e.pointerId)
    }
    const handlePointerMove = (e) => {
        if (!dragState.current) return
        const { startX, startY, range: startRange } = dragState.current
        const dx = e.clientX - startX
        const dy = e.clientY - startY
        setRange({
            xMin: startRange.xMin - dx / transform.scale,
            xMax: startRange.xMax - dx / transform.scale,
            yMin: startRange.yMin + dy / transform.scale,
            yMax: startRange.yMax + dy / transform.scale,
        })
    }
    const handlePointerUp = () => {
        dragState.current = null
    }

    const gridLinesX = []
    for (let x = Math.ceil(transform.xMin / gridStep) * gridStep; x <= transform.xMax; x += gridStep) {
        gridLinesX.push(Number(x.toFixed(6)))
    }
    const gridLinesY = []
    for (let y = Math.ceil(transform.yMin / gridStep) * gridStep; y <= transform.yMax; y += gridStep) {
        gridLinesY.push(Number(y.toFixed(6)))
    }

    const origin = transform.toScreen(0, 0)

    return (
        <svg
            ref={svgRef}
            width={width}
            height={height}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
            className="touch-none select-none cursor-grab active:cursor-grabbing rounded-lg border border-ink-700 bg-ink-900"
        >
            {gridLinesX.map((x) => {
                const { x: sx } = transform.toScreen(x, 0)
                return <line key={`gx${x}`} x1={sx} y1={0} x2={sx} y2={height} stroke="var(--color-grid)" strokeWidth={1} />
            })}
            {gridLinesY.map((y) => {
                const { y: sy } = transform.toScreen(0, y)
                return <line key={`gy${y}`} x1={0} y1={sy} x2={width} y2={sy} stroke="var(--color-grid)" strokeWidth={1} />
            })}

            <line x1={0} y1={origin.y} x2={width} y2={origin.y} stroke="var(--color-ink-500)" strokeWidth={1.5} />
            <line x1={origin.x} y1={0} x2={origin.x} y2={height} stroke="var(--color-ink-500)" strokeWidth={1.5} />

            {typeof children === 'function' ? children(transform) : children}
        </svg>
    )
}