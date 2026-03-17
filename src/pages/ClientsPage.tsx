import React, { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { fetchAllEarnings, fetchEarningsByAffiliate, computeTopClients } from '../lib/data'
import { useAuth } from '../AuthContext'
import type { EarningRow, ClientEarning, Affiliate } from '../types'
import { ClientTable } from '../components/Tables'
import { AffiliateToggle } from '../components/Filters'

export const ClientsPage: React.FC = () => {
  const { role } = useAuth()
  const [rows,    setRows]    = useState<EarningRow[]>([])
  const [loading, setLoading] = useState(true)
  const [affiliate, setAffiliate] = useState<Affiliate>(role === 'Ad-Lab' ? 'Both' : (role as Affiliate))
  const [sortBy,    setSortBy]    = useState<'owed' | 'billable'>('owed')

  useEffect(() => {
    const fetchAction = role === 'Ad-Lab' 
      ? fetchAllEarnings() 
      : fetchEarningsByAffiliate(role as string)

    fetchAction.then(data => {
      setRows(data)
      setLoading(false)
    })
  }, [role])

  const filtered = role === 'Ad-Lab' 
    ? (affiliate === 'Both' ? rows : rows.filter(r => r.affiliate === affiliate))
    : rows
  const clients: ClientEarning[] = computeTopClients(filtered)
    .sort((a, b) => sortBy === 'owed' ? b.total_owed - a.total_owed : b.total_billable - a.total_billable)

  if (loading) return (
    <div className="loading-spinner">
      <div className="spinner" />
      <span>Loading…</span>
    </div>
  )

  return (
    <div>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: 22, flexWrap: 'wrap', gap: 12 }}>
        <div className="page-hero" style={{ marginBottom: 0 }}>
          <h1 className="page-hero-title">Clients Overview</h1>
          <p className="page-hero-sub">All-time client performance across all months</p>
        </div>
      </div>

      <div className="filter-bar" style={{ gap: 14 }}>
        {role === 'Ad-Lab' && <AffiliateToggle selected={affiliate} onChange={setAffiliate} />}
        <div className="filter-chip-group">
          <button
            className={`filter-chip ${sortBy === 'owed' ? 'active' : ''}`}
            onClick={() => setSortBy('owed')}
          >
            Sort by Earned
          </button>
          <button
            className={`filter-chip ${sortBy === 'billable' ? 'active' : ''}`}
            onClick={() => setSortBy('billable')}
          >
            Sort by Billable
          </button>
        </div>
      </div>

      <motion.div
        className="card"
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.1 }}
      >
        <div className="card-header">
          <div className="card-title">All Clients — Cumulative Earnings</div>
          <span style={{
            fontSize: 12,
            color: 'var(--text-muted)',
            background: 'var(--bg-input)',
            padding: '3px 10px',
            borderRadius: 99,
            fontWeight: 600,
          }}>
            {clients.length} client{clients.length !== 1 ? 's' : ''}
          </span>
        </div>
        <ClientTable clients={clients} showAffiliate={affiliate === 'Both'} />
      </motion.div>
    </div>
  )
}
