import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Sun, Moon } from 'lucide-react'
import Sidebar from './Sidebar'

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [light, setLight] = useState(false)

    return (
        <div>
            <div
                className={`flex min-h-screen transition-colors ${light ? 'bg-paper-50 text-paper-ink' : 'bg-ink-950 text-[#e8ebf0]'
                    }`}
            >
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="flex-1 min-w-0">
                    <header className="flex items-center justify-between border-b border-ink-700 px-4 py-3 md:px-6">
                        <button
                            className="md:hidden text-ink-500 hover:text-white"
                            onClick={() => setSidebarOpen(true)}
                            aria-label="Ouvrir le menu"
                        >
                            <Menu size={22} />
                        </button>
                        <div className="hidden md:block text-sm text-ink-500">
                            Explorateur interactif — Algèbre &amp; Analyse
                        </div>
                        <button
                            className="flex items-center gap-2 rounded-md border border-ink-700 px-2.5 py-1.5 text-xs text-ink-500 hover:text-white hover:border-ink-500"
                            onClick={() => setLight((v) => !v)}
                            aria-label="Changer de thème"
                        >
                            {light ? <Moon size={14} /> : <Sun size={14} />}
                            {light ? 'Mode sombre' : 'Mode clair'}
                        </button>
                    </header>

                    <main className="px-4 py-6 md:px-8 md:py-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}