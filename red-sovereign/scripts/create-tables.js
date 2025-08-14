#!/usr/bin/env node

/**
 * Create Supabase tables directly
 */

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

const supabaseUrl = env.NEXT_PUBLIC_SUPABASE_URL || env.SUPABASE_URL;
const supabaseServiceKey = env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error('Missing Supabase credentials in .env.local');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function createTables() {
  console.log('Creating Supabase tables...\n');
  
  // Read migration file
  const migrationPath = path.resolve(__dirname, '../supabase/migrations/001_initial_schema.sql');
  const sql = fs.readFileSync(migrationPath, 'utf-8');
  
  // Split into individual statements
  const statements = sql
    .split(';')
    .map(s => s.trim())
    .filter(s => s && !s.startsWith('--'));
  
  for (const statement of statements) {
    if (statement.trim()) {
      const shortStatement = statement.substring(0, 60).replace(/\n/g, ' ');
      console.log(`Executing: ${shortStatement}...`);
      
      try {
        // We'll use the Supabase dashboard or CLI for this since
        // the JS client doesn't support DDL statements directly
        console.log('  → Please run this in Supabase SQL Editor');
      } catch (err) {
        console.error(`  ✗ Error: ${err.message}`);
      }
    }
  }
  
  console.log('\n📋 To create these tables:');
  console.log('1. Go to: https://supabase.com/dashboard/project/lxjlatocuabjjaxkdsjq/sql/new');
  console.log('2. Copy the contents of: supabase/migrations/001_initial_schema.sql');
  console.log('3. Paste and run in the SQL Editor');
  console.log('4. Or use the Supabase CLI: supabase db push');
}

createTables().catch(console.error);