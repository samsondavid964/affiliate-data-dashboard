import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { fetchAllEarnings, fetchEarningsByAffiliate, computeMonthlyTotals, formatCurrency, deriveMonths } from '../lib/data'
import { useAuth } from '../AuthContext'
import type { EarningRow, MonthlyTotal } from '../types'
import { EarningsBarChart } from '../components/Charts'
import { MonthlyEarningsTable } from '../components/Tables'
import { CalendarFilter } from '../components/Filters'

function parseMonthNum(label: string) {
  const [name, year] = label.split(' ')
  const idx = new Date(`${name} 1, ${year}`).getMonth()
  return parseInt(year, 10) * 12 + idx
}

export const TrendsPage: React.FC = () => {
  const { role } = useAuth()
  const [rows,    setRows]    = useState<EarningRow[]>([])
  const [loading, setLoading] = useState(true)
  const [startMonth, setStartMonth] = useState<string | null>(null)
  const [endMonth,   setEndMonth]   = useState<string | null>(null)
  const [drillMonth, setDrillMonth] = useState<string | null>(null)

  useEffect(() => {
    const fetchAction = role === 'Ad-Lab' 
      ? fetchAllEarnings() 
      : fetchEarningsByAffiliate(role as string)

    fetchAction.then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [role])

  const availableMonths = useMemo(() => deriveMonths(rows), [rows])

  // Filter rows by calendar range
  const rangedRows = useMemo(() => {
    if (!startMonth || !endMonth) return rows
    const s = parseMonthNum(startMonth)
    const e = parseMonthNum(endMonth)
    return rows.filter(r => {
      const n = parseMonthNum(r.month)
      return n >= s && n <= e
    })
  }, [rows, startMonth, endMonth])

  const monthlyTotals: MonthlyTotal[] = computeMonthlyTotals(rangedRows)

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner" />
      <span>Loading…</span>
    </div>
  )

  return (
    <div>
      {/* Hero + filters */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div className="page-hero" style={{ marginBottom: 0 }}>
          <h1 className="page-hero-title">Monthly Trends</h1>
          <p className="page-hero-sub">
            {role === 'Ad-Lab' 
              ? 'Month-by-month breakdown for Vince and Difiano' 
              : 'Your month-by-month earnings breakdown'}
          </p>
        </div>
        <CalendarFilter
          availableMonths={availableMonths}
          startMonth={startMonth}
          endMonth={endMonth}
          onChange={(s, e) => { setStartMonth(s); setEndMonth(e); setDrillMonth(null) }}
        />
      </div>

      {/* Bar Chart — all months in range */}
      <motion.div
        className="card chart-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="card-header">
          <div className="card-title">Earnings Per Month</div>
          {startMonth && endMonth && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>
              {startMonth} – {endMonth}
            </span>
          )}
        </div>
        {monthlyTotals.length > 0
          ? <EarningsBarChart data={monthlyTotals} />
          : <div className="empty-state"><div>No data found</div></div>
        }
      </motion.div>

      {/* Month Summary Table */}
      <motion.div
        className="card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        style={{ marginBottom: 20 }}
      >
        <div className="card-header">
          <div className="card-title">Month-by-Month Summary</div>
          <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap' }}>
            <button
              onClick={() => setDrillMonth(null)}
              style={{
                padding: '4px 12px',
                borderRadius: 99,
                border: '1px solid var(--border-subtle)',
                background: !drillMonth ? 'var(--accent-primary)' : 'var(--bg-input)',
                color: !drillMonth ? '#fff' : 'var(--text-secondary)',
                fontSize: 12,
                fontWeight: 600,
                cursor: 'pointer',
                fontFamily: 'inherit',
                transition: 'all 0.18s',
              }}
            >
              All
            </button>
            {monthlyTotals.map(m => (
              <button
                key={m.month}
                onClick={() => setDrillMonth(m.month)}
                style={{
                  padding: '4px 12px',
                  borderRadius: 99,
                  border: `1px solid ${drillMonth === m.month ? 'var(--accent-primary)' : 'var(--border-subtle)'}`,
                  background: drillMonth === m.month ? 'var(--accent-primary)' : 'var(--bg-input)',
                  color: drillMonth === m.month ? '#fff' : 'var(--text-secondary)',
                  fontSize: 11.5,
                  fontWeight: 500,
                  cursor: 'pointer',
                  fontFamily: 'inherit',
                  transition: 'all 0.18s',
                }}
              >
                {m.month.split(' ')[0].slice(0, 3)}
                {m.month.split(' ')[1] !== '2025' ? ` '${m.month.split(' ')[1].slice(2)}` : ''}
              </button>
            ))}
          </div>
        </div>

        {!drillMonth ? (
          <div style={{ overflowX: 'auto' }}>
            <table className="data-table">
              <thead>
                <tr>
                  <th>Month</th>
                  {(role === 'Ad-Lab' || role === 'Vince') && <th>{role === 'Ad-Lab' ? 'Vince' : 'Earnings'}</th>}
                  {(role === 'Ad-Lab' || role === 'Difiano') && <th>{role === 'Ad-Lab' ? 'Difiano' : 'Earnings'}</th>}
                  {role === 'Ad-Lab' && <th>Total</th>}
                  {role === 'Ad-Lab' && <th>Leading</th>}
                </tr>
              </thead>
              <tbody>
                {monthlyTotals.map((m, i) => (
                  <motion.tr
                    key={m.month}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: i * 0.025 }}
                    style={{ cursor: 'pointer' }}
                    onClick={() => setDrillMonth(m.month)}
                  >
                    <td style={{ fontWeight: 600 }}>{m.month}</td>
                    {(role === 'Ad-Lab' || role === 'Vince') && (
                      <td style={{ color: 'var(--accent-primary)', fontWeight: 600 }}>{formatCurrency(m.vince)}</td>
                    )}
                    {(role === 'Ad-Lab' || role === 'Difiano') && (
                      <td style={{ color: 'var(--accent-secondary)', fontWeight: 600 }}>{formatCurrency(m.difiano)}</td>
                    )}
                    {role === 'Ad-Lab' && (
                      <td style={{ color: 'var(--accent-green)', fontWeight: 700 }}>{formatCurrency(m.total)}</td>
                    )}
                    {role === 'Ad-Lab' && (
                      <td>
                        <span className={`badge badge-${m.vince >= m.difiano ? 'vince' : 'difiano'}`}>
                          {m.vince >= m.difiano ? 'Vince' : 'Difiano'}
                        </span>
                      </td>
                    )}
                  </motion.tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div>
            <div style={{ marginBottom: 14, padding: '10px 14px', background: 'var(--bg-input)', borderRadius: 10, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--text-primary)' }}>
                Detailed: {drillMonth}
              </span>
              <button
                onClick={() => setDrillMonth(null)}
                style={{ fontSize: 12, color: 'var(--accent-primary)', background: 'none', border: 'none', cursor: 'pointer', fontWeight: 600 }}
              >
                ← Back to summary
              </button>
            </div>
            <MonthlyEarningsTable rows={rangedRows} month={drillMonth} />
          </div>
        )}
      </motion.div>
    </div>
  )
}
