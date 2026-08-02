export default function Slider({ label, value, min, max, step, onChange }) {
    return (
        <label className="block text-xs text-ink-500 font-mono">
            <div className="flex justify-between mb-3">
                <span>{label}</span>
                <span className="text-text-primary">{value}</span>
            </div>
            <input
                type="range"
                min={min}
                max={max}
                step={step}
                value={value}
                onChange={(e) => onChange(parseFloat(e.target.value))}
                className="w-full accent-amber-accent"
            />
        </label>
    )
}