import { createContext, useContext, useState } from 'react'

const LanguageContext = createContext({ lang: 'fr', setLang: () => { } })

export function LanguageProvider({ children }) {
    const [lang, setLang] = useState('fr')
    return <LanguageContext.Provider value={{ lang, setLang }}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
    return useContext(LanguageContext)
}