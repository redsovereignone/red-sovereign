-- Create playbook_submissions table
CREATE TABLE IF NOT EXISTS public.playbook_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  company_name VARCHAR(255) NOT NULL,
  website_url TEXT,
  contact_email VARCHAR(255) NOT NULL,
  ttm_revenue VARCHAR(50) NOT NULL,
  current_growth_rate VARCHAR(50) NOT NULL,
  target_growth_rate VARCHAR(50) NOT NULL,
  biggest_challenge VARCHAR(100) NOT NULL,
  playbook_data JSONB NOT NULL,
  pdf_url TEXT,
  email_sent BOOLEAN DEFAULT FALSE,
  user_agent TEXT,
  ip_address VARCHAR(45)
);

-- Create analytics_events table
CREATE TABLE IF NOT EXISTS public.analytics_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  event_name VARCHAR(100) NOT NULL,
  event_data JSONB DEFAULT '{}',
  session_id VARCHAR(255),
  user_id UUID,
  page_url TEXT,
  referrer TEXT
);

-- Create waitlist table
CREATE TABLE IF NOT EXISTS public.waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  email VARCHAR(255) NOT NULL UNIQUE,
  company_name VARCHAR(255),
  role VARCHAR(100),
  source VARCHAR(50),
  marketing_consent BOOLEAN DEFAULT FALSE
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_playbook_submissions_email ON public.playbook_submissions(contact_email);
CREATE INDEX IF NOT EXISTS idx_playbook_submissions_created_at ON public.playbook_submissions(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_playbook_submissions_company ON public.playbook_submissions(company_name);
CREATE INDEX IF NOT EXISTS idx_analytics_events_session_id ON public.analytics_events(session_id);
CREATE INDEX IF NOT EXISTS idx_analytics_events_created_at ON public.analytics_events(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_analytics_events_event_name ON public.analytics_events(event_name);
CREATE INDEX IF NOT EXISTS idx_waitlist_email ON public.waitlist(email);

-- Enable Row Level Security (RLS)
ALTER TABLE public.playbook_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.analytics_events ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.waitlist ENABLE ROW LEVEL SECURITY;

-- Create policies for anonymous access (for public form submissions)
CREATE POLICY "Allow anonymous inserts to playbook_submissions" 
  ON public.playbook_submissions FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts to analytics_events" 
  ON public.analytics_events FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow anonymous inserts to waitlist" 
  ON public.waitlist FOR INSERT 
  WITH CHECK (true);

-- Service role can do everything (for admin operations)
CREATE POLICY "Service role has full access to playbook_submissions" 
  ON public.playbook_submissions FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to analytics_events" 
  ON public.analytics_events FOR ALL 
  USING (auth.role() = 'service_role');

CREATE POLICY "Service role has full access to waitlist" 
  ON public.waitlist FOR ALL 
  USING (auth.role() = 'service_role');