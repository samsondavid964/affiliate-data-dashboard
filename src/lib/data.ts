import { supabase } from './supabase'
import type { EarningRow, MonthlyTotal, ClientEarning } from '../types'

/**
 * Derives the sorted list of unique months from whatever rows are in Supabase.
 * This is fully dynamic — works for March 2025 through any future month.
 */
export function deriveMonths(rows: EarningRow[]): string[] {
  const seen = new Map<number, string>() // month_index → month label
  for (const r of rows) {
    if (!seen.has(r.month_index)) seen.set(r.month_index, r.month)
  }
  return Array.from(seen.entries())
    .sort((a, b) => a[0] - b[0])
    .map(([, label]) => label)
}

export async function fetchAllEarnings(): Promise<EarningRow[]> {
  const { data, error } = await supabase
    .from('affiliate_earnings')
    .select('*')
    .order('month_index', { ascending: true })

  if (error) {
    console.error('Error fetching earnings:', error)
    return []
  }
  const rows = data as EarningRow[]
  // Filter out purely numeric client names e.g., "1772" or "1,772.50"
  // and hide any rows where the affiliate has zero/null earnings
  return rows.filter(r => 
    !/^[\d.,]+$/.test(r.client_name.trim()) && 
    (r.amount_owed !== null && r.amount_owed > 0)
  )
}

export async function fetchEarningsByAffiliate(affiliate: string): Promise<EarningRow[]> {
  const { data, error } = await supabase
    .from('affiliate_earnings')
    .select('*')
    .eq('affiliate', affiliate)
    .order('month_index', { ascending: true })

  if (error) {
    console.error('Error fetching earnings:', error)
    return []
  }
  const rows = data as EarningRow[]
  // Filter out purely numeric client names e.g., "1772" or "1,772.50"
  // and hide any rows where the affiliate has zero/null earnings
  return rows.filter(r => 
    !/^[\d.,]+$/.test(r.client_name.trim()) && 
    (r.amount_owed !== null && r.amount_owed > 0)
  )
}

export function computeMonthlyTotals(rows: EarningRow[]): MonthlyTotal[] {
  const map = new Map<string, MonthlyTotal>()

  for (const row of rows) {
    if (!map.has(row.month)) {
      map.set(row.month, {
        month: row.month,
        month_index: row.month_index,
        vince: 0,
        difiano: 0,
        total: 0,
      })
    }
    const entry = map.get(row.month)!
    const owed = row.amount_owed ?? 0
    if (row.affiliate === 'Vince') entry.vince += owed
    else entry.difiano += owed
    entry.total += owed
  }

  return Array.from(map.values()).sort((a, b) => a.month_index - b.month_index)
}

export function computeTopClients(rows: EarningRow[]): ClientEarning[] {
  const map = new Map<string, ClientEarning>()

  for (const row of rows) {
    const key = `${row.affiliate}::${row.client_name}`
    if (!map.has(key)) {
      map.set(key, {
        client_name: row.client_name,
        affiliate: row.affiliate,
        total_billable: 0,
        total_owed: 0,
      })
    }
    const entry = map.get(key)!
    entry.total_billable += row.billable_usd ?? 0
    entry.total_owed += row.amount_owed ?? 0
  }

  return Array.from(map.values()).sort((a, b) => b.total_owed - a.total_owed)
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2,
  }).format(value)
}
