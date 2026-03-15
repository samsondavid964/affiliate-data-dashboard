-- =============================================
-- AFFILIATE EARNINGS DASHBOARD — SUPABASE SCHEMA
-- =============================================

-- Main earnings table
CREATE TABLE IF NOT EXISTS affiliate_earnings (
  id           UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  affiliate    TEXT NOT NULL CHECK (affiliate IN ('Vince', 'Difiano')),
  client_name  TEXT NOT NULL,
  month        TEXT NOT NULL,         -- e.g. 'March 2025', 'January 2026'
  -- month_index: YYYYMM integer for sort ordering (e.g. 202503 = March 2025, 202603 = March 2026)
  -- Using YYYYMM ensures correct ordering across any number of future years.
  month_index  INTEGER NOT NULL,
  billable_usd NUMERIC(12, 2),        -- Client Billable ($); NULL if no spend
  referral_pct NUMERIC(5, 2) DEFAULT 20.00,  -- Referral Fee (%)
  amount_owed  NUMERIC(12, 2),        -- Amount Owed ($); NULL if no spend
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW(),

  -- Prevent exact duplicate rows for same affiliate + client + month
  UNIQUE (affiliate, client_name, month)
);

-- Useful indexes
CREATE INDEX IF NOT EXISTS idx_affiliate_earnings_affiliate
  ON affiliate_earnings (affiliate);

CREATE INDEX IF NOT EXISTS idx_affiliate_earnings_month_index
  ON affiliate_earnings (month_index);

CREATE INDEX IF NOT EXISTS idx_affiliate_earnings_affiliate_month
  ON affiliate_earnings (affiliate, month_index);

-- Auto-update updated_at on row change
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at
  BEFORE UPDATE ON affiliate_earnings
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- ROW LEVEL SECURITY
-- =============================================

ALTER TABLE affiliate_earnings ENABLE ROW LEVEL SECURITY;

-- Public read-only access (for the dashboard using anon key)
CREATE POLICY "Allow public reads" ON affiliate_earnings
  FOR SELECT USING (true);

-- =============================================
-- MONTH INDEX REFERENCE (YYYYMM FORMAT)
-- =============================================
-- month_index is a YYYYMM integer — sorts lexically and numerically correct
-- across all future years without any clashes.
--
-- 202503 = March 2025       202509 = September 2025
-- 202504 = April 2025       202510 = October 2025
-- 202505 = May 2025         202511 = November 2025
-- 202506 = June 2025        202512 = December 2025
-- 202507 = July 2025        202601 = January 2026
-- 202508 = August 2025      202602 = February 2026
--
-- Future months follow the same pattern: YYYYMM
-- e.g. March 2026 = 202603, March 2027 = 202703

