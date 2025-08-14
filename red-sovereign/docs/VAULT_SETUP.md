# Supabase Vault Setup for Resend Email

This guide explains how to set up Supabase Vault to securely store Resend API credentials, which resolves the authentication issues on Vercel deployment.

## Overview

Instead of relying on environment variables (which were causing issues on Vercel), we now use Supabase Vault to securely store and retrieve the Resend API key and from email address.

## Setup Instructions

### 1. Verify Vault is Available

Vault is enabled by default on all Supabase projects. To verify it's available:

1. Go to your Supabase dashboard
2. Navigate to SQL Editor
3. Run this query to check:
   ```sql
   SELECT * FROM pg_extension WHERE extname = 'vault';
   ```
   
If it's not enabled (rare), you can enable it:
```sql
CREATE EXTENSION IF NOT EXISTS vault;
```

### 2. Set Up Vault Functions and Secrets

You have two options:

#### Option A: Use SQL Editor (Recommended for Production)

1. Go to your Supabase Dashboard → SQL Editor
2. Open the file `scripts/manual-vault-setup.sql`
3. Replace `YOUR_ACTUAL_RESEND_API_KEY_HERE` with your actual Resend API key
4. Run the entire script

This will:
- Enable Vault extension
- Create the secure functions
- Store your secrets
- Verify they were saved

#### Option B: Using Node.js Setup Script

1. Ensure you have these environment variables in your `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
   RESEND_API_KEY=your_resend_api_key
   RESEND_FROM_EMAIL=report@marketing.sovereignai.co
   ```

2. Run the setup script:
   ```bash
   node scripts/setup-vault-secrets.mjs
   ```

### 3. Deploy to Vercel

The application will now automatically use the Vault secrets. Make sure your Vercel deployment has these environment variables:

- `NEXT_PUBLIC_SUPABASE_URL` - Your Supabase project URL
- `SUPABASE_SERVICE_ROLE_KEY` - Your Supabase service role key

**Note:** You do NOT need to set `RESEND_API_KEY` or `RESEND_FROM_EMAIL` on Vercel anymore - these are retrieved from Vault.

## How It Works

1. When the email service initializes, it first attempts to fetch the API key from Supabase Vault
2. If Vault access fails (e.g., during local development without Vault setup), it falls back to environment variables
3. This ensures the app works both locally and in production

## Testing

### Test Email Endpoint

You can test the email functionality using the test endpoint:

```bash
# In development
curl http://localhost:3000/api/test-email

# In production
curl https://your-domain.vercel.app/api/test-email
```

### Debug Environment Endpoint

Check the status of your configuration:

```bash
# In development
curl http://localhost:3000/api/debug-env

# In production (requires secret)
curl https://your-domain.vercel.app/api/debug-env?secret=debug-red-sovereign-2024
```

This will show:
- Environment variables status
- Vault secrets status
- Resend client initialization status

## Security Notes

1. **Service Role Key**: The service role key should ONLY be used server-side (API routes). Never expose it to the client.

2. **Vault Access**: Only the service role can access Vault secrets through the custom functions we created.

3. **Fallback Behavior**: The system falls back to environment variables if Vault is unavailable, ensuring local development still works.

## Troubleshooting

### "Function get_secret does not exist"

Run the migration to create the Vault functions:
```bash
npm run supabase:migrate
```

### "Unauthorized access to secrets"

Ensure you're using the service role key, not the anon key.

### "Secret RESEND_API_KEY not found"

Run the setup script to store the secrets in Vault:
```bash
node scripts/setup-vault-secrets.mjs
```

### Testing Locally

If you want to test Vault locally:
1. Set up the secrets in your Supabase project's Vault
2. Use your production Supabase URL and service role key in `.env.local`
3. The app will fetch secrets from the remote Vault

## Benefits

1. **Centralized Secret Management**: Update API keys in one place (Supabase) instead of multiple deployment platforms
2. **Better Security**: Secrets are encrypted at rest in Vault
3. **Audit Trail**: Vault access can be logged and monitored
4. **No Deployment Restarts**: Update secrets without redeploying the application