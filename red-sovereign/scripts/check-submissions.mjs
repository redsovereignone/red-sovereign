#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Load environment variables
const envPath = path.resolve(__dirname, '../.env.local');
const envContent = fs.readFileSync(envPath, 'utf-8');
const env = {};

envContent.split('\n').forEach(line => {
  const [key, ...valueParts] = line.split('=');
  if (key && !key.startsWith('#')) {
    env[key.trim()] = valueParts.join('=').trim();
  }
});

const supabase = createClient(
  env.NEXT_PUBLIC_SUPABASE_URL,
  env.SUPABASE_SERVICE_ROLE_KEY
);

async function checkSubmissions() {
  console.log('📊 Checking Supabase submissions...\n');
  
  // Get recent submissions
  const { data: submissions, error: subError } = await supabase
    .from('playbook_submissions')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (subError) {
    console.error('Error fetching submissions:', subError);
    return;
  }
  
  console.log(`Found ${submissions.length} recent submission(s):\n`);
  
  submissions.forEach((sub, index) => {
    console.log(`📝 Submission #${index + 1}:`);
    console.log(`   Company: ${sub.company_name}`);
    console.log(`   Email: ${sub.contact_email}`);
    console.log(`   Revenue: ${sub.ttm_revenue}`);
    console.log(`   Challenge: ${sub.biggest_challenge}`);
    console.log(`   Email Alert Sent: ${sub.email_sent ? '✅ Yes' : '❌ No'}`);
    console.log(`   Created: ${new Date(sub.created_at).toLocaleString()}`);
    console.log(`   ID: ${sub.id}\n`);
  });
  
  // Get analytics events
  const { data: events, error: eventError } = await supabase
    .from('analytics_events')
    .select('*')
    .order('created_at', { ascending: false })
    .limit(5);
  
  if (!eventError && events.length > 0) {
    console.log(`📈 Recent analytics events (${events.length}):\n`);
    events.forEach(event => {
      console.log(`   - ${event.event_name} at ${new Date(event.created_at).toLocaleTimeString()}`);
    });
  }
}

checkSubmissions().catch(console.error);