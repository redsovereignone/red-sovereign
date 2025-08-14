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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function initDatabase() {
  console.log('🚀 Initializing Supabase database...\n');
  
  // Test connection and check if tables exist
  console.log('Checking existing tables...\n');
  
  const tables = ['playbook_submissions', 'analytics_events', 'waitlist'];
  let tablesExist = true;
  
  for (const table of tables) {
    const { data, error } = await supabase
      .from(table)
      .select('id')
      .limit(1);
    
    if (error) {
      if (error.code === '42P01') {
        console.log(`  ❌ Table '${table}' does not exist`);
        tablesExist = false;
      } else {
        console.log(`  ⚠️  Table '${table}' - ${error.message}`);
      }
    } else {
      console.log(`  ✅ Table '${table}' exists`);
    }
  }
  
  if (!tablesExist) {
    console.log('\n⚠️  Some tables are missing.');
    console.log('\n📋 To create the missing tables:');
    console.log('1. Go to your Supabase dashboard:');
    console.log(`   https://supabase.com/dashboard/project/${supabaseUrl.split('.')[0].split('//')[1]}/sql/new`);
    console.log('2. Copy the SQL from: supabase/migrations/001_initial_schema.sql');
    console.log('3. Paste and run it in the SQL Editor\n');
    
    console.log('Or use the Supabase dashboard Table Editor to manually create the tables.\n');
  } else {
    console.log('\n✅ All required tables exist!\n');
    
    // Test inserting a sample submission
    console.log('Testing API functionality...\n');
    
    const testData = {
      company_name: 'Test Company',
      website_url: 'https://test.com',
      contact_email: 'test@example.com',
      ttm_revenue: '$1M-$5M',
      current_growth_rate: '20-30%',
      target_growth_rate: '50-75%',
      biggest_challenge: 'Lead Generation',
      playbook_data: {
        answers: {
          test: true
        },
        timestamp: new Date().toISOString()
      },
      user_agent: 'Test Script',
      ip_address: '127.0.0.1'
    };
    
    const { data: submission, error: insertError } = await supabase
      .from('playbook_submissions')
      .insert([testData])
      .select()
      .single();
    
    if (insertError) {
      console.error('  ❌ Test insertion failed:', insertError.message);
    } else {
      console.log('  ✅ Test submission created:', submission.id);
      
      // Clean up test data
      const { error: deleteError } = await supabase
        .from('playbook_submissions')
        .delete()
        .eq('id', submission.id);
      
      if (!deleteError) {
        console.log('  ✅ Test data cleaned up\n');
      }
    }
    
    console.log('🎉 Database is ready to receive submissions!\n');
  }
}

initDatabase().catch(console.error);