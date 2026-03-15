
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom'
import { Sidebar } from './components/Sidebar'
import { OverviewPage } from './pages/OverviewPage'
import { TrendsPage } from './pages/TrendsPage'
import { ClientsPage } from './pages/ClientsPage'
import { ComparisonPage } from './pages/ComparisonPage'
import { ThemeProvider } from './ThemeContext'
import './index.css'

const pageInfo: Record<string, { title: string; section: string }> = {
  '/':           { title: 'Overview',         section: 'Dashboard' },
  '/trends':     { title: 'Monthly Trends',   section: 'Analytics' },
  '/clients':    { title: 'By Client',        section: 'Analytics' },
  '/comparison': { title: 'Vince vs Difiano', section: 'Comparison' },
}

function AppRoutes() {
  const location = useLocation()
  const info = pageInfo[location.pathname] ?? { title: 'Dashboard', section: 'Dashboard' }

  return (
    <div className="app-shell">
      <Sidebar />
      <main className="main-content">
        <header className="topbar">
          <div className="topbar-left">
            <div className="topbar-breadcrumb">
              <span>Ad-Lab</span>
              <span className="topbar-breadcrumb-sep">/</span>
              <span>{info.section}</span>
            </div>
            <h2 className="topbar-title">{info.title}</h2>
          </div>
        </header>
        <div className="page-content">
          <Routes>
            <Route path="/"           element={<OverviewPage />} />
            <Route path="/trends"     element={<TrendsPage />} />
            <Route path="/clients"    element={<ClientsPage />} />
            <Route path="/comparison" element={<ComparisonPage />} />
          </Routes>
        </div>
      </main>
    </div>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ThemeProvider>
  )
}
