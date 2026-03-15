import React from 'react'
import { motion } from 'framer-motion'
import type { EarningRow, ClientEarning } from '../types'
import { formatCurrency } from '../lib/data'

interface ClientTableProps {
  clients: ClientEarning[]
  showAffiliate?: boolean
}

export const ClientTable: React.FC<ClientTableProps> = ({ clients, showAffiliate = true }) => {
  if (!clients.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">📊</div>
        <div>No earnings data found</div>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>#</th>
            <th>Client</th>
            {showAffiliate && <th>Affiliate</th>}
            <th>Total Billable</th>
            <th>Total Earned</th>
            <th>Fee</th>
          </tr>
        </thead>
        <tbody>
          {clients.map((client, i) => (
            <motion.tr
              key={`${client.affiliate}-${client.client_name}`}
              initial={{ opacity: 0, x: -8 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.025, duration: 0.2 }}
            >
              <td style={{ color: 'var(--text-muted)', fontSize: 12, fontWeight: 400 }}>{i + 1}</td>
              <td style={{ fontWeight: 600 }}>{client.client_name}</td>
              {showAffiliate && (
                <td>
                  <span className={`badge badge-${client.affiliate.toLowerCase()}`}>
                    {client.affiliate}
                  </span>
                </td>
              )}
              <td style={{ color: 'var(--text-secondary)' }}>{formatCurrency(client.total_billable)}</td>
              <td>
                <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                  {formatCurrency(client.total_owed)}
                </span>
              </td>
              <td>
                <span style={{
                  background: 'var(--accent-primary-light)',
                  color: 'var(--accent-primary)',
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 99,
                }}>
                  20%
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

interface MonthlyEarningsTableProps {
  rows: EarningRow[]
  month: string
}

export const MonthlyEarningsTable: React.FC<MonthlyEarningsTableProps> = ({ rows, month }) => {
  const filtered = rows.filter(r => r.month === month)

  if (!filtered.length) {
    return (
      <div className="empty-state">
        <div className="empty-state-icon">🗓️</div>
        <div>No entries for {month}</div>
      </div>
    )
  }

  return (
    <div style={{ overflowX: 'auto' }}>
      <table className="data-table">
        <thead>
          <tr>
            <th>Affiliate</th>
            <th>Client</th>
            <th>Client Billable</th>
            <th>Referral %</th>
            <th>Amount Owed</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.018 }}
            >
              <td>
                <span className={`badge badge-${row.affiliate.toLowerCase()}`}>
                  {row.affiliate}
                </span>
              </td>
              <td style={{ fontWeight: 600 }}>{row.client_name}</td>
              <td>{row.billable_usd != null ? formatCurrency(row.billable_usd) : '—'}</td>
              <td>
                <span style={{
                  background: 'var(--accent-primary-light)',
                  color: 'var(--accent-primary)',
                  fontSize: 11.5,
                  fontWeight: 600,
                  padding: '2px 8px',
                  borderRadius: 99,
                }}>
                  {row.referral_pct}%
                </span>
              </td>
              <td>
                <span style={{ color: 'var(--accent-green)', fontWeight: 700 }}>
                  {row.amount_owed != null ? formatCurrency(row.amount_owed) : '—'}
                </span>
              </td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
