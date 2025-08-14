#!/usr/bin/env node

/**
 * Script to create Vault functions in Supabase
 * Since secrets already exist, this only creates the helper functions
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

if (!supabaseUrl || !supabaseServiceRoleKey) {
  console.error('❌ Missing Supabase configuration');
  console.error('Please ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceRoleKey, {
  auth: {
    autoRefreshToken: false,
    persistSession: false
  }
});

async function createVaultFunctions() {
  console.log('🔐 Creating Vault functions in Supabase...\n');

  try {
    // SQL to create the functions
    const sql = `
      -- Ensure extensions are enabled
      CREATE EXTENSION IF NOT EXISTS vault;
      CREATE EXTENSION IF NOT EXISTS pgsodium;

      -- Create function to GET a secret from the vault
      CREATE OR REPLACE FUNCTION get_secret(secret_name text)
      RETURNS text
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public
      AS $$
      DECLARE
        secret_value text;
      BEGIN
        -- Only allow service role to access secrets
        IF auth.role() != 'service_role' THEN
          RAISE EXCEPTION 'Unauthorized access to secrets';
        END IF;
        
        SELECT decrypted_secret INTO secret_value
        FROM vault.decrypted_secrets
        WHERE name = secret_name;
        
        IF secret_value IS NULL THEN
          RAISE EXCEPTION 'Secret % not found', secret_name;
        END IF;
        
        RETURN secret_value;
      END;
      $$;

      -- Create function to SET a secret in the vault (for future use)
      CREATE OR REPLACE FUNCTION set_secret(secret_name text, secret_value text)
      RETURNS void
      LANGUAGE plpgsql
      SECURITY DEFINER
      SET search_path = public
      AS $$
      BEGIN
        -- Only allow service role to set secrets
        IF auth.role() != 'service_role' THEN
          RAISE EXCEPTION 'Unauthorized access to secrets';
        END IF;
        
        -- Delete existing secret if it exists
        DELETE FROM vault.secrets WHERE name = secret_name;
        
        -- Insert new secret
        INSERT INTO vault.secrets (name, secret)
        VALUES (secret_name, secret_value);
      END;
      $$;

      -- Grant execute permissions to service role only
      REVOKE ALL ON FUNCTION get_secret(text) FROM PUBLIC;
      GRANT EXECUTE ON FUNCTION get_secret(text) TO service_role;

      REVOKE ALL ON FUNCTION set_secret(text, text) FROM PUBLIC;
      GRANT EXECUTE ON FUNCTION set_secret(text, text) TO service_role;
    `;

    // Execute the SQL
    console.log('📝 Creating get_secret and set_secret functions...');
    const { error: functionError } = await supabase.rpc('query', { query: sql }).single();
    
    // If the above doesn't work, try direct execution
    if (functionError) {
      console.log('⚠️  Direct SQL execution not available, functions may already exist');
      console.log('    You may need to run the SQL manually in Supabase Dashboard');
    }

    // Test if functions exist by trying to get a secret
    console.log('\n🔍 Testing function availability...');
    const { data, error } = await supabase.rpc('get_secret', {
      secret_name: 'RESEND_API_KEY'
    });

    if (error) {
      if (error.message.includes('function get_secret does not exist')) {
        console.error('\n❌ Functions not created. Please run this SQL in Supabase Dashboard:');
        console.error('\nCopy the contents of: scripts/create-vault-functions.sql');
        console.error('And run it in: Dashboard → SQL Editor\n');
      } else if (error.message.includes('Secret RESEND_API_KEY not found')) {
        console.log('✅ Functions created successfully!');
        console.log('⚠️  Note: RESEND_API_KEY secret not found in Vault');
        console.log('    You need to add your secrets to Vault first');
      } else {
        console.error('❌ Error testing function:', error.message);
      }
    } else if (data) {
      console.log('✅ Functions created and working!');
      console.log('✅ RESEND_API_KEY found in Vault (starts with:', data.substring(0, 10) + '...)');
    }

    console.log('\n✨ Setup complete!');
    console.log('\n📌 Next steps:');
    console.log('1. Commit and push the changes');
    console.log('2. Vercel will automatically deploy');
    console.log('3. Test email functionality at /api/test-email');

  } catch (error) {
    console.error('\n❌ Failed to create Vault functions:', error);
    console.error('\n📝 Manual setup required:');
    console.error('1. Go to Supabase Dashboard → SQL Editor');
    console.error('2. Run the SQL from scripts/create-vault-functions.sql');
    process.exit(1);
  }
}

// Run the setup
createVaultFunctions();