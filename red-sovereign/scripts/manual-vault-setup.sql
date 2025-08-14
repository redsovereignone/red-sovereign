-- Manual Vault Setup Script for Supabase
-- Run this in the SQL Editor in your Supabase Dashboard

-- Step 1: Ensure Vault extension is enabled
CREATE EXTENSION IF NOT EXISTS vault;
CREATE EXTENSION IF NOT EXISTS pgsodium;

-- Step 2: Create the helper functions for accessing secrets
-- Function to get a secret from the vault
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

-- Function to set a secret in the vault
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

-- Step 3: Store your secrets
-- IMPORTANT: Replace these with your actual values!
SELECT set_secret('RESEND_API_KEY', 'YOUR_ACTUAL_RESEND_API_KEY_HERE');
SELECT set_secret('RESEND_FROM_EMAIL', 'report@marketing.sovereignai.co');

-- Step 4: Verify the secrets were stored
SELECT name FROM vault.secrets;

-- You should see:
-- name
-- ----------------
-- RESEND_API_KEY
-- RESEND_FROM_EMAIL

-- Step 5: Test retrieval (optional)
-- This will only work if you're running as service_role
-- SELECT get_secret('RESEND_API_KEY');

-- Done! Your secrets are now stored securely in Vault.