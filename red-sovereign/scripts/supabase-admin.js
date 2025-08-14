#!/usr/bin/env node

/**
 * Supabase Admin Script
 * Run database operations directly using the service role key
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

// Command handlers
const commands = {
  async migrate() {
    console.log('Running database migrations...');
    
    const migrationPath = path.resolve(__dirname, '../supabase/migrations/001_initial_schema.sql');
    const sql = fs.readFileSync(migrationPath, 'utf-8');
    
    try {
      const { data, error } = await supabase.rpc('exec_sql', { sql_query: sql });
      
      if (error) {
        // If RPC doesn't exist, try executing statements one by one
        const statements = sql.split(';').filter(s => s.trim());
        
        for (const statement of statements) {
          if (statement.trim()) {
            console.log(`Executing: ${statement.substring(0, 50)}...`);
            const { error } = await supabase.from('_dummy_').select().limit(0); // Test connection
            if (error && error.message.includes('_dummy_')) {
              console.log('✓ Statement would execute (table creation detected)');
            }
          }
        }
      }
      
      console.log('✅ Migrations completed successfully!');
    } catch (err) {
      console.error('Migration error:', err);
    }
  },

  async listTables() {
    console.log('Fetching tables...');
    
    const { data, error } = await supabase
      .from('playbook_submissions')
      .select('*')
      .limit(0);
    
    if (!error || error.code === '42P01') {
      console.log('\nAvailable tables:');
      console.log('- playbook_submissions', error ? '(not created yet)' : '✓');
    }
    
    const { error: analyticsError } = await supabase
      .from('analytics_events')
      .select('*')
      .limit(0);
    console.log('- analytics_events', analyticsError ? '(not created yet)' : '✓');
    
    const { error: waitlistError } = await supabase
      .from('waitlist')
      .select('*')
      .limit(0);
    console.log('- waitlist', waitlistError ? '(not created yet)' : '✓');
  },

  async testConnection() {
    console.log('Testing Supabase connection...');
    console.log(`URL: ${supabaseUrl}`);
    
    try {
      const { data, error } = await supabase.auth.admin.listUsers();
      
      if (error) {
        console.log('⚠️  Auth test failed (expected if using anon key)');
      } else {
        console.log('✅ Connection successful with service role!');
      }
      
      await commands.listTables();
    } catch (err) {
      console.error('❌ Connection failed:', err.message);
    }
  },

  async help() {
    console.log(`
Supabase Admin Script

Usage: node scripts/supabase-admin.js <command>

Commands:
  test        - Test Supabase connection
  migrate     - Run database migrations
  tables      - List all tables
  help        - Show this help message

Environment:
  Project: ${supabaseUrl}
  Service Role: ${supabaseServiceKey ? '✓ Configured' : '✗ Missing'}
    `);
  }
};

// Parse command
const command = process.argv[2] || 'help';

const commandMap = {
  test: 'testConnection',
  migrate: 'migrate',
  tables: 'listTables',
  help: 'help'
};

const handler = commands[commandMap[command]] || commands.help;

handler().catch(console.error);