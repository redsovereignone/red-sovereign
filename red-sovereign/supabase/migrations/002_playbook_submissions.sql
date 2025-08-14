-- Create playbook_submissions table
CREATE TABLE IF NOT EXISTS playbook_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  company_name TEXT NOT NULL,
  website_url TEXT NOT NULL,
  contact_email TEXT NOT NULL,
  ttm_revenue TEXT,
  current_growth_rate TEXT,
  target_growth_rate TEXT,
  biggest_challenge TEXT,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  status TEXT DEFAULT 'pending_analysis',
  source TEXT DEFAULT 'website_playbook',
  metadata JSONB,
  analysis_sent_at TIMESTAMPTZ,
  proposal_sent_at TIMESTAMPTZ,
  notes TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX idx_playbook_submissions_email ON playbook_submissions(contact_email);
CREATE INDEX idx_playbook_submissions_status ON playbook_submissions(status);
CREATE INDEX idx_playbook_submissions_submitted_at ON playbook_submissions(submitted_at DESC);

-- Enable Row Level Security
ALTER TABLE playbook_submissions ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access (API can insert)
CREATE POLICY "Service role can manage playbook submissions" ON playbook_submissions
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create or update waitlist table to track email signups
CREATE TABLE IF NOT EXISTS waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  company_name TEXT,
  marketing_consent BOOLEAN DEFAULT false,
  source TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create index for email lookups
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON waitlist(email);

-- Enable RLS on waitlist
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Create policy for service role access
CREATE POLICY "Service role can manage waitlist" ON waitlist
  FOR ALL
  USING (auth.role() = 'service_role')
  WITH CHECK (auth.role() = 'service_role');

-- Create function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create triggers for updated_at
CREATE TRIGGER update_playbook_submissions_updated_at
  BEFORE UPDATE ON playbook_submissions
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_waitlist_updated_at
  BEFORE UPDATE ON waitlist
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();