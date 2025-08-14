-- Enable the pgsodium extension if not already enabled
CREATE EXTENSION IF NOT EXISTS pgsodium;

-- Create a function to get a secret from the vault
-- This is a security definer function that can only be called from server-side code
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

-- Create a function to set a secret in the vault
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

-- Add a comment to document the functions
COMMENT ON FUNCTION get_secret(text) IS 'Retrieves a secret from the vault. Only accessible by service role.';
COMMENT ON FUNCTION set_secret(text, text) IS 'Sets a secret in the vault. Only accessible by service role.';