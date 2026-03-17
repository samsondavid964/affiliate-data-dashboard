import React from 'react'
import { motion } from 'framer-motion'
import {
  ResponsiveContainer,
  ComposedChart,
  Area,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from 'recharts'
import { useAuth } from '../AuthContext'
import type { MonthlyTotal, ClientEarning } from '../types'
import { formatCurrency } from '../lib/data'

interface EarningsChartProps {
  data: MonthlyTotal[]
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (!active || !payload?.length) return null
  return (
    <div style={{
      background: 'var(--chart-tooltip-bg)',
      border: '1px solid var(--chart-tooltip-border)',
      borderRadius: 12,
      padding: '12px 16px',
      boxShadow: 'var(--chart-tooltip-shadow)',
      minWidth: 160,
    }}>
      <div style={{ fontSize: 12, color: 'var(--text-muted)', marginBottom: 8, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.6px' }}>
        {label}
      </div>
      {payload.map((entry: any) => (
        <div key={entry.dataKey} style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 5 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color, flexShrink: 0 }} />
          <span style={{ fontSize: 12.5, color: 'var(--text-secondary)', flex: 1 }}>{entry.name}</span>
          <span style={{ fontSize: 13, color: 'var(--text-primary)', fontWeight: 700 }}>
            {formatCurrency(entry.value)}
          </span>
        </div>
      ))}
      {payload.length > 1 && (
        <div style={{ marginTop: 8, paddingTop: 8, borderTop: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ fontSize: 12, color: 'var(--text-muted)' }}>Total</span>
          <span style={{ fontSize: 13, fontWeight: 700, color: 'var(--accent-green)' }}>
            {formatCurrency(payload.reduce((s: number, e: any) => s + e.value, 0))}
          </span>
        </div>
      )}
    </div>
  )
}

const shortMonth = (month: string) => {
  const parts = month.split(' ')
  return parts[0].slice(0, 3) + (parts[1] === '2026' ? " '26" : '')
}

export const EarningsAreaChart: React.FC<EarningsChartProps> = ({ data }) => {
  const { role } = useAuth()
  const chartData = data.map(d => ({
    ...d,
    month_short: shortMonth(d.month),
    Vince: d.vince,
    Difiano: d.difiano,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.15 }}
      style={{ width: '100%', height: 290 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
          <defs>
            <linearGradient id="vinceGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%"  stopColor="#ca5cec" stopOpacity={0.20} />
              <stop offset="96%" stopColor="#ca5cec" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="difanoGrad" x1="0" y1="0" x2="0" y2="1">
              <stop offset="2%"  stopColor="#06b6d4" stopOpacity={0.20} />
              <stop offset="96%" stopColor="#06b6d4" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--chart-grid)" vertical={false} />
          <XAxis
            dataKey="month_short"
            tick={{ fill: 'var(--chart-axis-tick)', fontSize: 11.5, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={4}
          />
          <YAxis
            tick={{ fill: 'var(--chart-axis-tick)', fontSize: 11.5 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }}>{v}</span>}
            iconType="circle"
            iconSize={8}
          />
          {(role === 'Ad-Lab' || role === 'Vince') && (
            <Area
              type="monotone"
              dataKey="Vince"
              stroke="#ca5cec"
              strokeWidth={2.5}
              fill="url(#vinceGrad)"
              dot={{ fill: '#ca5cec', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#ca5cec', strokeWidth: 2, stroke: '#fff' }}
            />
          )}
          {(role === 'Ad-Lab' || role === 'Difiano') && (
            <Area
              type="monotone"
              dataKey="Difiano"
              stroke="#06b6d4"
              strokeWidth={2.5}
              fill="url(#difanoGrad)"
              dot={{ fill: '#06b6d4', r: 3, strokeWidth: 0 }}
              activeDot={{ r: 5, fill: '#06b6d4', strokeWidth: 2, stroke: '#fff' }}
            />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export const EarningsBarChart: React.FC<EarningsChartProps> = ({ data }) => {
  const { role } = useAuth()
  const chartData = data.map(d => ({
    ...d,
    month_short: shortMonth(d.month),
    Vince: d.vince,
    Difiano: d.difiano,
  }))

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.99 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      style={{ width: '100%', height: 290 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={chartData} margin={{ top: 8, right: 8, left: 8, bottom: 4 }}>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--chart-grid)" vertical={false} />
          <XAxis
            dataKey="month_short"
            tick={{ fill: 'var(--chart-axis-tick)', fontSize: 11.5, fontWeight: 500 }}
            axisLine={false}
            tickLine={false}
            dy={4}
          />
          <YAxis
            tick={{ fill: 'var(--chart-axis-tick)', fontSize: 11.5 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
            width={44}
          />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            formatter={(v) => <span style={{ color: 'var(--text-secondary)', fontSize: 12, fontWeight: 600 }}>{v}</span>}
            iconType="circle"
            iconSize={8}
          />
          {(role === 'Ad-Lab' || role === 'Vince') && (
            <Bar dataKey="Vince"   fill="#ca5cec" radius={[5, 5, 0, 0]} maxBarSize={28} opacity={0.92} />
          )}
          {(role === 'Ad-Lab' || role === 'Difiano') && (
            <Bar dataKey="Difiano" fill="#06b6d4" radius={[5, 5, 0, 0]} maxBarSize={28} opacity={0.88} />
          )}
        </ComposedChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

export const EarningsLineChart: React.FC<{ data: MonthlyTotal[] }> = ({ data }) => {
  const chartData = data.map(d => ({
    ...d,
    month_short: shortMonth(d.month),
    Total: d.total,
  }))

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', height: 210 }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={chartData} margin={{ top: 5, right: 8, left: 5, bottom: 4 }}>
          <defs>
            <linearGradient id="totalLineGrad" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%"   stopColor="#ca5cec" />
              <stop offset="50%"  stopColor="#06b6d4" />
              <stop offset="100%" stopColor="#10b981" />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 5" stroke="var(--chart-grid)" vertical={false} />
          <XAxis
            dataKey="month_short"
            tick={{ fill: 'var(--chart-axis-tick)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            dy={4}
          />
          <YAxis
            tick={{ fill: 'var(--chart-axis-tick)', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
            tickFormatter={v => `$${(v/1000).toFixed(0)}k`}
            width={40}
          />
          <Tooltip content={<CustomTooltip />} />
          <Line
            type="monotone"
            dataKey="Total"
            stroke="url(#totalLineGrad)"
            strokeWidth={3}
            dot={{ fill: '#10b981', r: 3.5, strokeWidth: 0 }}
            activeDot={{ r: 5.5, strokeWidth: 2, stroke: '#fff', fill: '#10b981' }}
          />
        </LineChart>
      </ResponsiveContainer>
    </motion.div>
  )
}

const COLORS = ['#ca5cec', '#06b6d4', '#10b981', '#f59e0b', '#ef4444', '#6366f1']

export const EarningsDonutChart: React.FC<{ data: ClientEarning[] }> = ({ data }) => {
  if (!data?.length) return null

  // Ensure data has the required properties for Recharts Pie, use total_owed for distribution
  const chartData = data.map((item, index) => ({
    name: item.client_name,
    value: item.total_owed,
    color: COLORS[index % COLORS.length]
  }))

  const CustomPieTooltip = ({ active, payload }: any) => {
    if (!active || !payload?.length) return null
    const labelData = payload[0].payload
    return (
      <div style={{
        background: 'var(--chart-tooltip-bg)',
        border: '1px solid var(--chart-tooltip-border)',
        borderRadius: 12,
        padding: '12px 16px',
        boxShadow: 'var(--chart-tooltip-shadow)',
        minWidth: 160,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
          <div style={{ width: 8, height: 8, borderRadius: '50%', background: payload[0].color, flexShrink: 0 }} />
          <span style={{ fontSize: 13, color: 'var(--text-secondary)', fontWeight: 600, flex: 1 }}>{labelData.name}</span>
          <span style={{ fontSize: 13.5, color: 'var(--text-primary)', fontWeight: 700 }}>
            {formatCurrency(labelData.value)}
          </span>
        </div>
      </div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.35 }}
      style={{ width: '100%', height: 210, display: 'flex', alignItems: 'center', justifyContent: 'center' }}
    >
      <ResponsiveContainer width="100%" height="100%">
        <PieChart margin={{ top: 0, right: 0, left: 0, bottom: 0 }}>
          <Pie
            data={chartData}
            cx="50%"
            cy="50%"
            innerRadius={65}
            outerRadius={85}
            paddingAngle={4}
            dataKey="value"
            stroke="none"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip content={<CustomPieTooltip />} />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            content={(props) => {
              const { payload } = props;
              return (
                <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '8px 16px' }}>
                  {payload?.map((entry, index) => (
                    <li key={`item-${index}`} style={{ display: 'flex', alignItems: 'center', gap: 6 }}>
                      <span style={{ width: 8, height: 8, borderRadius: '50%', background: entry.color }} />
                      <span style={{ fontSize: 11.5, color: 'var(--text-secondary)', fontWeight: 500 }}>
                        {entry.value ? (String(entry.value).length > 15 ? String(entry.value).substring(0, 15) + '...' : String(entry.value)) : 'Unknown'}
                      </span>
                    </li>
                  ))}
                </ul>
              );
            }}
          />
        </PieChart>
      </ResponsiveContainer>
    </motion.div>
  )
}
