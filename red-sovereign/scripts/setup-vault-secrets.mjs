#!/usr/bin/env node

/**
 * Script to set up Vault secrets in Supabase
 * Usage: node scripts/setup-vault-secrets.mjs
 * 
 * Make sure you have the following environment variables set:
 * - NEXT_PUBLIC_SUPABASE_URL
 * - SUPABASE_SERVICE_ROLE_KEY
 * - RESEND_API_KEY (the value you want to store in Vault)
 * - RESEND_FROM_EMAIL (optional, defaults to report@marketing.sovereignai.co)
 */

import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Load environment variables
dotenv.config({ path: join(__dirname, '..', '.env.local') });

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
const resendApiKey = process.env.RESEND_API_KEY;
const resendFromEmail = process.env.RESEND_FROM_EMAIL || 'report@marketing.sovereignai.co';

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase configuration');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

if (!resendApiKey) {
  console.error('❌ Missing RESEND_API_KEY');
  console.error('Please ensure RESEND_API_KEY is set in your environment');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function setupVaultSecrets() {
  console.log('🔐 Setting up Vault secrets in Supabase...\n');

  try {
    // Set RESEND_API_KEY
    console.log('📝 Setting RESEND_API_KEY in Vault...');
    const { error: resendKeyError } = await supabase.rpc('set_secret', {
      secret_name: 'RESEND_API_KEY',
      secret_value: resendApiKey
    });

    if (resendKeyError) {
      console.error('❌ Error setting RESEND_API_KEY:', resendKeyError);
      throw resendKeyError;
    }
    console.log('✅ RESEND_API_KEY set successfully');

    // Set RESEND_FROM_EMAIL
    console.log('📝 Setting RESEND_FROM_EMAIL in Vault...');
    const { error: fromEmailError } = await supabase.rpc('set_secret', {
      secret_name: 'RESEND_FROM_EMAIL',
      secret_value: resendFromEmail
    });

    if (fromEmailError) {
      console.error('❌ Error setting RESEND_FROM_EMAIL:', fromEmailError);
      throw fromEmailError;
    }
    console.log('✅ RESEND_FROM_EMAIL set successfully');

    // Verify the secrets were set
    console.log('\n🔍 Verifying secrets...');
    
    const { data: apiKeyData, error: apiKeyReadError } = await supabase.rpc('get_secret', {
      secret_name: 'RESEND_API_KEY'
    });

    if (apiKeyReadError) {
      console.error('❌ Error reading RESEND_API_KEY:', apiKeyReadError);
    } else {
      console.log('✅ RESEND_API_KEY verified (starts with:', apiKeyData.substring(0, 10) + '...)');
    }

    const { data: fromEmailData, error: fromEmailReadError } = await supabase.rpc('get_secret', {
      secret_name: 'RESEND_FROM_EMAIL'
    });

    if (fromEmailReadError) {
      console.error('❌ Error reading RESEND_FROM_EMAIL:', fromEmailReadError);
    } else {
      console.log('✅ RESEND_FROM_EMAIL verified:', fromEmailData);
    }

    console.log('\n✨ Vault secrets setup completed successfully!');
    console.log('\n📌 Next steps:');
    console.log('1. Run the migration to create Vault functions:');
    console.log('   npm run supabase:migrate');
    console.log('2. Deploy to Vercel:');
    console.log('   vercel --prod');
    console.log('3. Test the email functionality');

  } catch (error) {
    console.error('\n❌ Failed to set up Vault secrets:', error);
    console.error('\nTroubleshooting:');
    console.error('1. Make sure the Vault extension is enabled in Supabase');
    console.error('2. Run the migration first: npm run supabase:migrate');
    console.error('3. Check that your service role key has the correct permissions');
    process.exit(1);
  }
}

// Run the setup
setupVaultSecrets();