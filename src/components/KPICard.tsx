import React, { useEffect, useState } from 'react'
import { motion, AnimatePresence, useMotionValue, animate } from 'framer-motion'
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
  const motionVal = useMotionValue(0)
  const [display, setDisplay] = useState(() =>
    typeof value === 'number'
      ? isCurrency ? formatCurrency(0) : '0'
      : String(value)
  )

  useEffect(() => {
    // Only animate numbers; strings (labels, etc.) render directly
    if (typeof value !== 'number') {
      setDisplay(String(value))
      return
    }
    const controls = animate(motionVal, value, {
      duration: 0.6,
      ease: 'easeOut',
      onUpdate: (v) =>
        setDisplay(isCurrency ? formatCurrency(v) : String(Math.round(v))),
    })
    return controls.stop
  }, [value, isCurrency])

  const isUp = trend && trend.value >= 0
  const isGradient = variant === 'total'

  return (
    // whileHover is intentionally absent here.
    // The existing file has whileHover={{ y: -2 }} — this replacement removes it.
    // Reason: Framer overrides CSS transforms on any axis it controls. If whileHover
    // sets y, the CSS .kpi-card:hover { transform: translateY(-3px) } is suppressed.
    // Solution: CSS handles all hover state; Framer only drives the entry animation.
    <motion.div
      className="kpi-card"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay, ease: 'easeOut' }}
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
            key={String(value)}
            className={isGradient ? 'kpi-value-gradient' : 'kpi-value'}
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25 }}
          >
            {display}
          </motion.div>
        </AnimatePresence>
        {sub && <div className="kpi-sub">{sub}</div>}
      </div>
    </motion.div>
  )
}
