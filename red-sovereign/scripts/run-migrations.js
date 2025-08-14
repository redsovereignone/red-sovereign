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

console.log('🚀 Running Supabase migrations...');
console.log(`📍 Project: ${supabaseUrl}`);

// Read migration file
const migrationPath = path.resolve(__dirname, '../supabase/migrations/001_initial_schema.sql');
const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');

// Since we can't run raw SQL directly, we'll need to use the Supabase Management API
// For now, output the SQL for manual execution
console.log('\n📋 Migration SQL to run in Supabase Dashboard:');
console.log('----------------------------------------');
console.log('Go to: https://supabase.com/dashboard/project/lxjlatocuabjjaxkdsjq/sql/new');
console.log('And run this SQL:\n');
console.log(migrationSQL);
console.log('----------------------------------------');
console.log('\n✅ Copy the SQL above and run it in your Supabase SQL editor!');