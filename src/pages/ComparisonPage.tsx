import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchAllEarnings, computeMonthlyTotals, computeTopClients, formatCurrency } from '../lib/data'
import type { EarningRow, MonthlyTotal } from '../types'
import { EarningsBarChart } from '../components/Charts'

export const ComparisonPage: React.FC = () => {
  const [rows,    setRows]    = useState<EarningRow[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchAllEarnings().then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [])

  const monthlyTotals: MonthlyTotal[] = computeMonthlyTotals(rows)
  const vinceRows  = rows.filter(r => r.affiliate === 'Vince')
  const difanoRows = rows.filter(r => r.affiliate === 'Difiano')

  const vinceTotalOwed     = vinceRows.reduce( (s, r) => s + (r.amount_owed  ?? 0), 0)
  const difanoTotalOwed    = difanoRows.reduce((s, r) => s + (r.amount_owed  ?? 0), 0)
  const vinceTotalBillable = vinceRows.reduce( (s, r) => s + (r.billable_usd ?? 0), 0)
  const difanoTotalBillable= difanoRows.reduce((s, r) => s + (r.billable_usd ?? 0), 0)

  const vinceClients  = new Set(vinceRows.map( r => r.client_name)).size
  const difanoClients = new Set(difanoRows.map(r => r.client_name)).size

  const vinceMonths  = monthlyTotals.filter(m => m.vince   > 0).length
  const difanoMonths = monthlyTotals.filter(m => m.difiano > 0).length

  const vinceBestMonth  = monthlyTotals.reduce((best, m) => m.vince   > best.vince   ? m : best, { vince: 0,   month: '—' } as any)
  const difanoBestMonth = monthlyTotals.reduce((best, m) => m.difiano > best.difiano ? m : best, { difiano: 0, month: '—' } as any)

  const vinceTopClients  = computeTopClients(vinceRows).slice(0, 3)
  const difanoTopClients = computeTopClients(difanoRows).slice(0, 3)

  const maxOwed   = Math.max(vinceTotalOwed, difanoTotalOwed) || 1
  const barPercV  = (vinceTotalOwed  / maxOwed) * 100
  const barPercD  = (difanoTotalOwed / maxOwed) * 100

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner" />
      <span>Loading…</span>
    </div>
  )

  const statRows = [
    { label: 'Total Earned',   vince: formatCurrency(vinceTotalOwed),   difano: formatCurrency(difanoTotalOwed),   vColor: 'var(--accent-primary)', dColor: 'var(--accent-secondary)' },
    { label: 'Total Managed',  vince: formatCurrency(vinceTotalBillable),difano: formatCurrency(difanoTotalBillable) },
    { label: 'Clients Served', vince: String(vinceClients),   difano: String(difanoClients) },
    { label: 'Active Months',  vince: String(vinceMonths),    difano: String(difanoMonths) },
    { label: 'Best Month',     vince: vinceBestMonth.month,   difano: difanoBestMonth.month },
  ]

  return (
    <div>
      <div className="page-hero">
        <h1 className="page-hero-title">Vince vs Difiano</h1>
        <p className="page-hero-sub">Side-by-side performance comparison across all months</p>
      </div>

      {/* Head-to-head bar */}
      <motion.div
        className="card"
        style={{ marginBottom: 20 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="card-header">
          <div className="card-title">Total Earnings — Head to Head</div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
          {/* Vince */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-vince">Vince</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-primary)' }}>
                {formatCurrency(vinceTotalOwed)}
              </span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${barPercV}%` }}
                transition={{ duration: 1.1, delay: 0.3, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg, #ca5cec, #8b5cf6)' }}
              />
            </div>
          </div>

          {/* Difiano */}
          <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 8 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span className="badge badge-difiano">Difiano</span>
              </div>
              <span style={{ fontSize: 15, fontWeight: 800, color: 'var(--accent-secondary)' }}>
                {formatCurrency(difanoTotalOwed)}
              </span>
            </div>
            <div className="progress-track">
              <motion.div
                className="progress-fill"
                initial={{ width: 0 }}
                animate={{ width: `${barPercD}%` }}
                transition={{ duration: 1.1, delay: 0.4, ease: 'easeOut' }}
                style={{ background: 'linear-gradient(90deg, #0ea5e9, #0284c7)' }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* Stats table card */}
      <motion.div
        className="card"
        style={{ marginBottom: 20 }}
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.12 }}
      >
        <div className="card-header">
          <div className="card-title">Stats Comparison</div>
        </div>
        <div style={{ overflowX: 'auto' }}>
          <table className="data-table">
            <thead>
              <tr>
                <th>Metric</th>
                <th style={{ color: 'var(--accent-primary)' }}>Vince</th>
                <th style={{ color: 'var(--accent-secondary)' }}>Difiano</th>
              </tr>
            </thead>
            <tbody>
              {statRows.map((row, i) => (
                <motion.tr
                  key={row.label}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: i * 0.04 }}
                >
                  <td style={{ color: 'var(--text-muted)', fontWeight: 500, fontSize: 13 }}>{row.label}</td>
                  <td style={{ color: row.vColor ?? 'var(--text-primary)', fontWeight: 700 }}>{row.vince}</td>
                  <td style={{ color: row.dColor ?? 'var(--text-primary)', fontWeight: 700 }}>{row.difano}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>

      {/* Split Top Clients */}
      <div className="split-grid" style={{ marginBottom: 20 }}>
        <motion.div
          className="card split-card-vince"
          initial={{ opacity: 0, x: -16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <div className="card-header">
            <div className="card-title">Vince — Top Clients</div>
            <span className="badge badge-vince">Affiliate</span>
          </div>
          {vinceTopClients.map((c, i) => (
            <div key={c.client_name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: 'var(--accent-primary-light)', color: 'var(--accent-primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                {c.client_name}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-green)' }}>{formatCurrency(c.total_owed)}</span>
            </div>
          ))}
        </motion.div>

        <motion.div
          className="card split-card-difiano"
          initial={{ opacity: 0, x: 16 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.4, delay: 0.18 }}
        >
          <div className="card-header">
            <div className="card-title">Difiano — Top Clients</div>
            <span className="badge badge-difiano">Affiliate</span>
          </div>
          {difanoTopClients.map((c, i) => (
            <div key={c.client_name} style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 0', borderBottom: '1px solid var(--border-subtle)' }}>
              <span style={{ fontSize: 13, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ width: 20, height: 20, borderRadius: 6, background: 'rgba(14,165,233,0.1)', color: 'var(--accent-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 11, fontWeight: 700 }}>{i + 1}</span>
                {c.client_name}
              </span>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-green)' }}>{formatCurrency(c.total_owed)}</span>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bar Chart */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.3 }}
      >
        <div className="card-header">
          <div className="card-title">Monthly Earnings — Side by Side</div>
        </div>
        {monthlyTotals.length > 0
          ? <EarningsBarChart data={monthlyTotals} />
          : <div className="empty-state"><div>No data found</div></div>
        }
      </motion.div>
    </div>
  )
}
