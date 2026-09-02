import { useState, useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Menu, Sun, Moon, Languages } from 'lucide-react'
import Sidebar from './Sidebar'
import { useLanguage } from '../context/useLanguage'
import { ui } from '../lib/ui'

export default function Layout() {
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const [light, setLight] = useState(false)

    useEffect(() => {
        document.documentElement.classList.toggle('theme-light', light)
    }, [light])

    const { lang, setLang } = useLanguage()
    const t = ui[lang]

    return (
        <div className={light ? 'theme-light' : ''}>
            <div className="flex min-h-screen bg-ink-950 text-text-primary transition-colors">
                <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

                <div className="flex-1 min-w-0">
                    <header className="flex items-center justify-between border-b border-ink-700 px-4 py-3 md:px-6">
                        <button
                            className="md:hidden text-ink-500 hover:text-text-strong"
                            onClick={() => setSidebarOpen(true)}
                            aria-label={t.openMenu}
                        >
                            <Menu size={22} />
                        </button>
                        <div className="hidden md:block text-sm text-ink-500">{t.subtitle}</div>
                        <div className="flex items-center gap-2">
                            <button
                                className="flex items-center gap-1.5 rounded-md border border-ink-700 px-2.5 py-1.5 text-xs text-ink-500 hover:text-text-strong hover:border-ink-500"
                                onClick={() => setLang(lang === 'fr' ? 'en' : 'fr')}
                                aria-label="Switch language"
                            >
                                <Languages size={14} />
                                {lang === 'fr' ? 'EN' : 'FR'}
                            </button>
                            <button
                                className="flex items-center gap-2 rounded-md border border-ink-700 px-2.5 py-1.5 text-xs text-ink-500 hover:text-text-strong hover:border-ink-500"
                                onClick={() => setLight((v) => !v)}
                                aria-label="Switch theme"
                            >
                                {light ? <Moon size={14} /> : <Sun size={14} />}
                                {light ? t.themeDark : t.themeLight}
                            </button>
                        </div>
                    </header>

                    <main className="px-4 py-6 md:px-8 md:py-10">
                        <Outlet />
                    </main>
                </div>
            </div>
        </div>
    )
}