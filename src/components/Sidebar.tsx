import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  BarChart3,
  Moon,
  Sun,
} from 'lucide-react'
import { useTheme } from '../ThemeContext'
import logoSrc from '../logo.png'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview',        to: '/' },
  { icon: TrendingUp,      label: 'Monthly Trends',  to: '/trends' },
  { icon: Users,           label: 'By Client',       to: '/clients' },
  { icon: BarChart3,       label: 'Vince vs Difiano',to: '/comparison' },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const isDark = theme === 'dark'

  return (
    <aside className="sidebar">
      <div className="sidebar-logo">
        <div className="logo-mark">
          <div className="logo-img-wrap">
            <img src={logoSrc} alt="Ad-Lab Logo" />
          </div>
          <div>
            <div className="logo-text">Ad-Lab</div>
            <div className="logo-sub">Affiliate Dashboard</div>
          </div>
        </div>
      </div>

      <nav className="sidebar-nav">
        <div className="nav-section-label">Navigation</div>
        {navItems.map(({ icon: Icon, label, to }) => {
          const isActive = to === '/'
            ? location.pathname === '/'
            : location.pathname.startsWith(to)
          return (
            <NavLink
              key={to}
              to={to}
              className={`nav-item ${isActive ? 'active' : ''}`}
            >
              <Icon className="nav-icon" size={16} />
              {label}
            </NavLink>
          )
        })}
      </nav>

      <div className="sidebar-footer">
        <button className="theme-toggle-btn" onClick={toggleTheme}>
          {isDark ? <Moon size={15} /> : <Sun size={15} />}
          <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
          <div className={`theme-toggle-track ${isDark ? 'dark-on' : ''}`}>
            <div className="theme-toggle-thumb" />
          </div>
        </button>
      </div>
    </aside>
  )
}
