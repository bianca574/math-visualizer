export default function CustomFunctionInput({ label, placeholder, value, onChange, error }) {
    return (
        <label className="flex flex-col gap-3 text-xs font-mono text-ink-500 mt-3 mb-3 mt-3">
            <span className="block mb-2 mt-3">{label}</span>
            <input
                type="text"
                value={value}
                placeholder={placeholder}
                onChange={(e) => onChange(e.target.value)}
                spellCheck={false}
                className={`rounded-md border bg-ink-800 py-1.5 px-2 text-text-primary focus:border-amber-accent outline-none font-mono text-sm ${error ? 'border-blue-accent' : 'border-ink-700'
                    }`}
            />
            {error && <span className="text-blue-accent text-[11px] leading-snug">{error}</span>}
        </label>
    )
}