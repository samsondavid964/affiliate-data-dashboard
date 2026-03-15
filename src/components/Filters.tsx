import React, { useState, useRef, useEffect } from 'react'
import { Calendar, ChevronDown, X } from 'lucide-react'
import type { Affiliate } from '../types'

/* ========================================================
   AFFILIATE TOGGLE
   ======================================================== */
interface AffiliateToggleProps {
  selected: Affiliate
  onChange: (v: Affiliate) => void
}

export const AffiliateToggle: React.FC<AffiliateToggleProps> = ({ selected, onChange }) => {
  const options: Affiliate[] = ['Both', 'Vince', 'Difiano']
  return (
    <div className="affiliate-toggle">
      {options.map(opt => {
        const isActive = selected === opt
        const cls = isActive ? `affiliate-btn active-${opt.toLowerCase()}` : 'affiliate-btn'
        return (
          <button key={opt} className={cls} onClick={() => onChange(opt)}>
            {opt}
          </button>
        )
      })}
    </div>
  )
}

/* ========================================================
   MONTH FILTER (chip-based, used on Trends page)
   ======================================================== */
interface MonthFilterProps {
  months: string[]
  selected: string
  onChange: (month: string) => void
}

export const MonthFilter: React.FC<MonthFilterProps> = ({ months, selected, onChange }) => {
  const shortLabel = (m: string) => {
    const [monthName, year] = m.split(' ')
    const abbr = monthName.slice(0, 3)
    const yearSuffix = year && year !== '2025' ? ` '${year.slice(2)}` : ''
    return abbr + yearSuffix
  }

  return (
    <div className="filter-bar">
      <span className="filter-label">Month:</span>
      <div className="filter-chip-group">
        <button
          className={`filter-chip ${selected === 'All' ? 'active' : ''}`}
          onClick={() => onChange('All')}
        >
          All
        </button>
        {months.map(m => (
          <button
            key={m}
            className={`filter-chip ${selected === m ? 'active' : ''}`}
            onClick={() => onChange(m)}
          >
            {shortLabel(m)}
          </button>
        ))}
      </div>
    </div>
  )
}

/* ========================================================
   CALENDAR RANGE FILTER
   ======================================================== */
// Month labels in order
const MONTH_NAMES = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']

// Parse "March 2025" → { year: 2025, monthIndex: 2 } (0-based)
function parseMonth(label: string): { year: number; idx: number } {
  const [name, year] = label.split(' ')
  const idx = new Date(`${name} 1, ${year}`).getMonth()
  return { year: parseInt(year, 10), idx }
}

// Returns all months between two labels (inclusive), sorted ascending
function monthsBetween(allMonths: string[], startLabel: string, endLabel: string): string[] {
  const start = parseMonth(startLabel)
  const end   = parseMonth(endLabel)
  const startNum = start.year * 12 + start.idx
  const endNum   = end.year   * 12 + end.idx
  return allMonths.filter(m => {
    const p = parseMonth(m)
    const n = p.year * 12 + p.idx
    return n >= startNum && n <= endNum
  })
}

interface CalendarFilterProps {
  /** All available months from data */
  availableMonths: string[]
  /** Currently active start/end month labels, or null for "All" */
  startMonth: string | null
  endMonth:   string | null
  onChange: (start: string | null, end: string | null) => void
}

export const CalendarFilter: React.FC<CalendarFilterProps> = ({
  availableMonths,
  startMonth,
  endMonth,
  onChange,
}) => {
  const [open,      setOpen]      = useState(false)
  const [selecting, setSelecting] = useState<string | null>(null) // temporary first pick
  const ref = useRef<HTMLDivElement>(null)

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    document.addEventListener('mousedown', handler)
    return () => document.removeEventListener('mousedown', handler)
  }, [])

  // Group available months by year
  const byYear = React.useMemo(() => {
    const map: Record<number, string[]> = {}
    for (const m of availableMonths) {
      const { year } = parseMonth(m)
      if (!map[year]) map[year] = []
      map[year].push(m)
    }
    return map
  }, [availableMonths])

  const years = Object.keys(byYear).map(Number).sort()

  // Formatted label for the trigger button
  const rangeLabel = startMonth && endMonth
    ? `${startMonth} – ${endMonth}`
    : startMonth
    ? `${startMonth} – …`
    : 'All Months'

  // Determine if a month label is within the current selection
  const isSelected = (m: string) => {
    if (selecting) {
      // Highlight just the first pick while user is choosing the second
      return m === selecting
    }
    if (!startMonth || !endMonth) return m === startMonth
    const sp = parseMonth(startMonth)
    const ep = parseMonth(endMonth)
    const mp = parseMonth(m)
    const sn = sp.year * 12 + sp.idx
    const en = ep.year * 12 + ep.idx
    const mn = mp.year * 12 + mp.idx
    return mn >= sn && mn <= en
  }

  const isEndpoint = (m: string) =>
    m === startMonth || m === endMonth || m === selecting

  const handleMonthClick = (m: string) => {
    if (!selecting) {
      // First click: set as start, enter "selecting" state
      setSelecting(m)
    } else {
      // Second click: finalize range
      const sp = parseMonth(selecting)
      const ep = parseMonth(m)
      const sn = sp.year * 12 + sp.idx
      const en = ep.year * 12 + ep.idx
      const [finalStart, finalEnd] = sn <= en ? [selecting, m] : [m, selecting]
      setSelecting(null)
      onChange(finalStart, finalEnd)
    }
  }

  const handleReset = () => {
    setSelecting(null)
    onChange(null, null)
  }

  return (
    <div className="calendar-filter-wrap" ref={ref}>
      <button
        className="calendar-trigger-btn"
        onClick={() => setOpen(o => !o)}
      >
        <Calendar size={14} className="cal-icon" />
        <span>{rangeLabel}</span>
        <ChevronDown size={13} style={{
          color: 'var(--text-muted)',
          transform: open ? 'rotate(180deg)' : 'rotate(0)',
          transition: 'transform 0.2s',
        }} />
      </button>

      {open && (
        <div className="calendar-dropdown">
          <div className="calendar-dropdown-header">
            <span className="calendar-dropdown-title">
              {selecting ? 'Now pick an end month' : 'Select date range'}
            </span>
            <button className="calendar-reset-btn" onClick={handleReset}>
              <X size={12} style={{ display: 'inline', marginRight: 3, verticalAlign: 'middle' }} />
              Reset
            </button>
          </div>

          {years.map(year => (
            <div key={year}>
              <div className="calendar-year-row">
                <div className="calendar-year-label">{year}</div>
              </div>
              <div className="calendar-month-grid">
                {MONTH_NAMES.map(abbr => {
                  // Find matching available month for this year/abbr
                  const fullName = byYear[year]?.find(m => m.startsWith(abbr) || m.split(' ')[0].slice(0, 3) === abbr)
                  const available = !!fullName
                  const sel = fullName ? isSelected(fullName) : false
                  const endpoint = fullName ? isEndpoint(fullName) : false

                  return (
                    <button
                      key={abbr}
                      className={`calendar-month-btn ${endpoint ? 'selected' : sel ? 'in-range' : ''}`}
                      disabled={!available}
                      onClick={() => fullName && handleMonthClick(fullName)}
                    >
                      {abbr}
                    </button>
                  )
                })}
              </div>
            </div>
          ))}

          <div className="calendar-footer">
            <span className="cal-range-label">
              {selecting
                ? `From ${selecting} → pick end`
                : startMonth && endMonth
                ? `${monthsBetween(availableMonths, startMonth, endMonth).length} months selected`
                : 'Click a start month'}
            </span>
            {!selecting && (
              <button
                className="cal-apply-btn"
                onClick={() => setOpen(false)}
              >
                Apply
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  )
}
