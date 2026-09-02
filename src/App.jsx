import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { LanguageProvider } from './context/LanguageProvider'
import Layout from './components/Layout'
import Home from './pages/Home'
import TopicPage from './pages/TopicPage'

function App() {
    return (
        <LanguageProvider>
            <BrowserRouter>
                <Routes>
                    <Route element={<Layout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="/visualizer/:categoryId/:topicId" element={<TopicPage />} />
                    </Route>
                </Routes>
            </BrowserRouter>
        </LanguageProvider>
    )
}

export default App