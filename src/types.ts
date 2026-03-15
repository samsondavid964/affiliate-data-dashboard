export interface EarningRow {
  id: string
  affiliate: 'Vince' | 'Difiano'
  client_name: string
  month: string
  month_index: number
  billable_usd: number | null
  referral_pct: number
  amount_owed: number | null
  created_at: string
}

export type Affiliate = 'Vince' | 'Difiano' | 'Both'

export interface MonthlyTotal {
  month: string
  month_index: number
  vince: number
  difiano: number
  total: number
}

export interface ClientEarning {
  client_name: string
  affiliate: string
  total_billable: number
  total_owed: number
}
