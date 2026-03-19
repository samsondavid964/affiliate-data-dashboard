import React from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  TrendingUp,
  Users,
  BarChart3,
  Moon,
  Sun,
  X,
} from 'lucide-react'
import { useTheme } from '../ThemeContext'
import { useAuth } from '../AuthContext'
import logoSrc from '../logo.png'

const navItems = [
  { icon: LayoutDashboard, label: 'Overview',        to: '/' },
  { icon: TrendingUp,      label: 'Monthly Trends',  to: '/trends' },
  { icon: Users,           label: 'By Client',       to: '/clients' },
  { icon: BarChart3,       label: 'Vince vs Difiano', to: '/comparison' },
]

interface SidebarProps {
  isOpen?: boolean
  onClose?: () => void
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const location = useLocation()
  const { theme, toggleTheme } = useTheme()
  const { role, logout } = useAuth()
  const isDark = theme === 'dark'

  const filteredNavItems = role === 'Ad-Lab'
    ? navItems
    : navItems.filter(item => item.to !== '/comparison')

  const handleNavClick = () => {
    // Close drawer on mobile after navigation
    onClose?.()
  }

  return (
    <>
      {/* Mobile overlay backdrop */}
      {isOpen && (
        <div className="sidebar-overlay" onClick={onClose} aria-hidden="true" />
      )}

      <aside className={`sidebar${isOpen ? ' sidebar-open' : ''}`}>
        {/* Mobile close button */}
        <button
          className="sidebar-close-btn"
          onClick={onClose}
          aria-label="Close navigation"
        >
          <X size={20} />
        </button>

        <div className="sidebar-logo">
          <div className="logo-mark">
            <div className="logo-img-wrap">
              <img src={logoSrc} alt="Ad-Lab Logo" />
            </div>
            <div>
              <div className="logo-text">{role === 'Ad-Lab' ? 'Ad-Lab' : role}</div>
              <div className="logo-sub">Affiliate Dashboard</div>
            </div>
          </div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section-label">Navigation</div>
          {filteredNavItems.map(({ icon: Icon, label, to }) => {
            const isActive = to === '/'
              ? location.pathname === '/'
              : location.pathname.startsWith(to)
            return (
              <NavLink
                key={to}
                to={to}
                className={`nav-item ${isActive ? 'active' : ''}`}
                onClick={handleNavClick}
              >
                <Icon className="nav-icon" size={16} />
                {label}
              </NavLink>
            )
          })}
        </nav>

        <div className="sidebar-footer">
          <button className="theme-toggle-btn" onClick={toggleTheme} style={{ marginBottom: 10 }}>
            {isDark ? <Moon size={15} /> : <Sun size={15} />}
            <span>{isDark ? 'Dark Mode' : 'Light Mode'}</span>
            <div className={`theme-toggle-track ${isDark ? 'dark-on' : ''}`}>
              <div className="theme-toggle-thumb" />
            </div>
          </button>

          <button className="nav-item" onClick={logout} style={{ color: 'var(--accent-red)' }}>
            <Sun size={16} className="nav-icon" style={{ transform: 'rotate(45deg)' }} />
            <span>Log Out</span>
          </button>
        </div>
      </aside>
    </>
  )
}
