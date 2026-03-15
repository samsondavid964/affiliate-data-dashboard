import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import type { LucideIcon } from 'lucide-react'
import { TrendingUp, TrendingDown } from 'lucide-react'
import { formatCurrency } from '../lib/data'

interface KPICardProps {
  label: string
  value: number | string
  sub?: string
  variant: 'vince' | 'difiano' | 'total' | 'neutral'
  icon: LucideIcon
  isCurrency?: boolean
  delay?: number
  trend?: { value: number; label?: string }
}

export const KPICard: React.FC<KPICardProps> = ({
  label,
  value,
  sub,
  variant,
  icon: Icon,
  isCurrency = true,
  delay = 0,
  trend,
}) => {
  const displayValue = typeof value === 'number' && isCurrency
    ? formatCurrency(value as number)
    : String(value)

  const isUp = trend && trend.value >= 0

  return (
    <motion.div
      className={`kpi-card`}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
      whileHover={{ y: -2 }}
    >
      <div className="kpi-card-top">
        <div className={`kpi-icon-wrap ${variant}`}>
          <Icon size={19} />
        </div>
        {trend !== undefined && (
          <div className={`kpi-trend ${isUp ? 'up' : 'down'}`}>
            {isUp ? <TrendingUp size={11} /> : <TrendingDown size={11} />}
            {Math.abs(trend.value).toFixed(1)}%
          </div>
        )}
      </div>
      <div className="kpi-card-inner">
        <div className="kpi-label">{label}</div>
        <AnimatePresence mode="wait">
          <motion.div
            key={displayValue}
            className="kpi-value"
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {displayValue}
          </motion.div>
        </AnimatePresence>
        {sub && <div className="kpi-sub">{sub}</div>}
      </div>
    </motion.div>
  )
}
