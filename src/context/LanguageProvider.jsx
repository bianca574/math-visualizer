import { useState } from 'react'
import { LanguageContext } from './LanguageContext'

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('fr')
    return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}