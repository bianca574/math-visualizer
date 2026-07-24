import { NavLink } from 'react-router-dom'
import { categories } from '../data/topics'
import { X } from 'lucide-react'

export default function Sidebar({ open, onClose }) {
    return (
        <>
            {open && (
                <button
                    aria-label="Fermer le menu"
                    onClick={onClose}
                    className="fixed inset-0 z-30 bg-ink-950/70 backdrop-blur-sm md:hidden"
                />
            )}

            <aside
                className={`fixed z-40 inset-y-0 left-0 w-72 shrink-0 border-r border-ink-700 bg-ink-900 text-[#e8ebf0]
          overflow-y-auto transition-transform duration-200 md:static md:translate-x-0
          ${open ? 'translate-x-0' : '-translate-x-full'}`}
            >
                <div className="flex items-center justify-between px-5 py-5 border-b border-ink-700">
                    <NavLink to="/" className="flex items-baseline gap-2" onClick={onClose}>
                        <span className="font-display italic text-xl text-amber-accent">∂</span>
                        <span className="font-display text-lg tracking-tight">math companion</span>
                    </NavLink>
                    <button className="md:hidden text-ink-500 hover:text-white" onClick={onClose} aria-label="Fermer">
                        <X size={20} />
                    </button>
                </div>

                <nav className="px-3 py-4 space-y-6">
                    {categories.map((category) => (
                        <div key={category.id}>
                            <h3 className="px-2 mb-2 text-xs font-semibold uppercase tracking-wider text-ink-500">
                                {category.label}
                            </h3>
                            <ul className="space-y-0.5">
                                {category.topics.map((topic) => (
                                    <li key={topic.id}>
                                        <NavLink
                                            to={`/visualizer/${category.id}/${topic.id}`}
                                            onClick={onClose}
                                            className={({ isActive }) =>
                                                `flex items-center justify-between gap-2 rounded-md px-2.5 py-1.5 text-sm transition-colors
                        border-l-2 ${isActive
                                                    ? 'border-amber-accent bg-ink-800 text-white'
                                                    : 'border-transparent text-ink-500 hover:text-white hover:bg-ink-800/60'
                                                }`
                                            }
                                        >
                                            <span>{topic.label}</span>
                                            {topic.status === 'planned' && (
                                                <span className="text-[10px] uppercase tracking-wide text-ink-500">
                                                    à venir
                                                </span>
                                            )}
                                        </NavLink>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}
                </nav>
            </aside>
        </>
    )
}