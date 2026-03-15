import React, { useEffect, useState, useMemo } from 'react'
import { motion } from 'framer-motion'
import { DollarSign, TrendingUp, Users, Award } from 'lucide-react'
import { KPICard } from '../components/KPICard'
import { EarningsAreaChart, EarningsLineChart } from '../components/Charts'
import { ClientTable } from '../components/Tables'
import { AffiliateToggle, CalendarFilter } from '../components/Filters'
import {
  fetchAllEarnings,
  computeMonthlyTotals,
  computeTopClients,
  deriveMonths,
} from '../lib/data'
import type { EarningRow, MonthlyTotal, ClientEarning, Affiliate } from '../types'

function parseMonthNum(label: string) {
  const [name, year] = label.split(' ')
  const idx = new Date(`${name} 1, ${year}`).getMonth()
  return parseInt(year, 10) * 12 + idx
}

export const OverviewPage: React.FC = () => {
  const [rows,      setRows]      = useState<EarningRow[]>([])
  const [loading,   setLoading]   = useState(true)
  const [affiliate, setAffiliate] = useState<Affiliate>('Both')
  const [startMonth, setStartMonth] = useState<string | null>(null)
  const [endMonth,   setEndMonth]   = useState<string | null>(null)

  useEffect(() => {
    fetchAllEarnings().then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [])

  const availableMonths = useMemo(() => deriveMonths(rows), [rows])

  // Filter by selected date range
  const rangedRows = useMemo(() => {
    if (!startMonth || !endMonth) return rows
    const s = parseMonthNum(startMonth)
    const e = parseMonthNum(endMonth)
    return rows.filter(r => {
      const n = parseMonthNum(r.month)
      return n >= s && n <= e
    })
  }, [rows, startMonth, endMonth])

  // Filter by affiliate on top of ranged rows
  const filtered = affiliate === 'Both'
    ? rangedRows
    : rangedRows.filter(r => r.affiliate === affiliate)

  const monthlyTotals: MonthlyTotal[] = computeMonthlyTotals(filtered)
  const topClients: ClientEarning[]   = computeTopClients(filtered).slice(0, 5)

  const totalEarned   = filtered.reduce((s, r) => s + (r.amount_owed  ?? 0), 0)
  const totalBillable = filtered.reduce((s, r) => s + (r.billable_usd ?? 0), 0)
  const vinceTotal    = rangedRows.filter(r => r.affiliate === 'Vince').reduce((s, r) => s + (r.amount_owed ?? 0), 0)
  const difanoTotal   = rangedRows.filter(r => r.affiliate === 'Difiano').reduce((s, r) => s + (r.amount_owed ?? 0), 0)
  const avgMonthly    = monthlyTotals.length ? totalEarned / monthlyTotals.length : 0

  if (loading) {
    return (
      <div className="loading-spinner">
        <div className="spinner" />
        <span>Loading earnings data…</span>
      </div>
    )
  }

  return (
    <div>
      {/* Welcome Banner */}
      <div className="welcome-banner">
        <h2 className="welcome-banner-title">Welcome to Ad-Lab — your affiliate earnings at a glance.</h2>
        <p className="welcome-banner-sub">All figures in USD · Earnings dashboard</p>
      </div>

      {/* Hero + Calendar */}
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div className="page-hero" style={{ marginBottom: 0 }}>
          <h1 className="page-hero-title">Affiliate Overview</h1>
          <p className="page-hero-sub">All figures in USD · Earnings dashboard</p>
        </div>
        <CalendarFilter
          availableMonths={availableMonths}
          startMonth={startMonth}
          endMonth={endMonth}
          onChange={(s, e) => { setStartMonth(s); setEndMonth(e) }}
        />
      </div>

      {/* KPI Grid */}
      <div className="kpi-grid">
        <KPICard label="Total Earnings"   value={totalEarned}   variant="total"   icon={DollarSign} delay={0}    />
        <KPICard label="Vince Earnings"   value={vinceTotal}    variant="vince"   icon={TrendingUp}  delay={0.05} />
        <KPICard label="Difiano Earnings" value={difanoTotal}   variant="difiano" icon={TrendingUp}  delay={0.10} />
        <KPICard label="Avg / Month"      value={avgMonthly}    variant="neutral" icon={Award}       delay={0.15} />
        <KPICard label="Total Managed"    value={totalBillable} variant="neutral" icon={Users}       delay={0.20} />
      </div>

      {/* Affiliate Toggle */}
      <div style={{ marginBottom: 22, display: 'flex', alignItems: 'center', gap: 12 }}>
        <span style={{ color: 'var(--text-muted)', fontSize: 13, fontWeight: 600 }}>View:</span>
        <AffiliateToggle selected={affiliate} onChange={setAffiliate} />
      </div>

      {/* Area Chart */}
      <motion.div
        className="card chart-full"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.25 }}
      >
        <div className="card-header">
          <div className="card-title">Monthly Earnings Trend</div>
          {startMonth && endMonth && (
            <span style={{ fontSize: 12, color: 'var(--text-muted)', fontWeight: 500 }}>
              {startMonth} – {endMonth}
            </span>
          )}
        </div>
        {monthlyTotals.length > 0
          ? <EarningsAreaChart data={monthlyTotals} />
          : <div className="empty-state"><div>No data found · <a style={{ color: 'var(--accent-primary)' }} href="https://supabase.com" target="_blank" rel="noreferrer">Connect Supabase</a></div></div>
        }
      </motion.div>

      {/* Bottom row */}
      <div className="charts-grid">
        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.32 }}
        >
          <div className="card-header">
            <div className="card-title">Total Combined — Monthly</div>
          </div>
          {monthlyTotals.length > 0
            ? <EarningsLineChart data={monthlyTotals} />
            : <div className="empty-state"><div>No data</div></div>
          }
        </motion.div>

        <motion.div
          className="card"
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.38 }}
        >
          <div className="card-header">
            <div className="card-title">Top 5 Clients</div>
            <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>by earnings</span>
          </div>
          <ClientTable clients={topClients} showAffiliate={affiliate === 'Both'} />
        </motion.div>
      </div>
    </div>
  )
}
