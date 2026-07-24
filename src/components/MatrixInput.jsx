export default function MatrixInput({ matrix, onChange }) {
    const n = matrix.length

    function updateCell(row, col, value) {
        const next = matrix.map((r) => [...r])
        next[row][col] = value
        onChange(next)
    }

    return (
        <div
            className={`inline-grid gap-2 p-3 rounded-lg border border-ink-700 bg-ink-900 font-mono ${n === 3 ? 'grid-cols-3' : 'grid-cols-2'
                }`}
        >
            {matrix.map((row, r) =>
                row.map((val, c) => (
                    <input
                        key={`${r}-${c}`}
                        type="number"
                        step="0.1"
                        value={val}
                        onChange={(e) => updateCell(r, c, e.target.value)}
                        className="w-16 text-center rounded-md border border-ink-700 bg-ink-800 py-1.5 text-[#e8ebf0] focus:border-amber-accent outline-none"
                    />
                )),
            )}
        </div>
    )
}