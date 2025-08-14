#!/usr/bin/env node

import { createClient } from '@supabase/supabase-js';
import pg from 'pg';
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

const { Client } = pg;

async function setupDatabase() {
  console.log('🚀 Setting up Supabase database tables...\n');
  
  // Parse the connection string to add SSL properly
  const connectionString = env.POSTGRES_URL_NON_POOLING || env.POSTGRES_URL;
  
  // Create a direct PostgreSQL connection
  const client = new Client({
    connectionString: connectionString,
    ssl: connectionString.includes('sslmode=require') ? { rejectUnauthorized: false } : false
  });
  
  try {
    await client.connect();
    console.log('✅ Connected to Supabase PostgreSQL database\n');
    
    // Read the migration file
    const migrationPath = path.resolve(__dirname, '../supabase/migrations/001_initial_schema.sql');
    const migrationSQL = fs.readFileSync(migrationPath, 'utf-8');
    
    // Split into individual statements
    const statements = migrationSQL
      .split(';')
      .map(s => s.trim())
      .filter(s => s && !s.startsWith('--'));
    
    for (const statement of statements) {
      if (statement.trim()) {
        const shortStatement = statement
          .substring(0, 60)
          .replace(/\n/g, ' ')
          .replace(/\s+/g, ' ');
        
        console.log(`Executing: ${shortStatement}...`);
        
        try {
          await client.query(statement);
          console.log('  ✅ Success\n');
        } catch (err) {
          if (err.message.includes('already exists')) {
            console.log('  ⚠️  Already exists (skipping)\n');
          } else {
            console.error(`  ❌ Error: ${err.message}\n`);
            throw err;
          }
        }
      }
    }
    
    console.log('🎉 Database setup completed successfully!\n');
    
    // Test the tables
    console.log('Testing tables...');
    const tables = ['playbook_submissions', 'analytics_events', 'waitlist'];
    
    for (const table of tables) {
      const result = await client.query(
        `SELECT COUNT(*) FROM public.${table}`
      );
      console.log(`  ✅ Table '${table}' exists (${result.rows[0].count} rows)`);
    }
    
  } catch (error) {
    console.error('❌ Setup failed:', error.message);
    process.exit(1);
  } finally {
    await client.end();
  }
}

setupDatabase().catch(console.error);