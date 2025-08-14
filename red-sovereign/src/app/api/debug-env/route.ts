import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET(request: NextRequest) {
  // Only allow in development or with a secret query param
  const secret = request.nextUrl.searchParams.get('secret');
  if (process.env.NODE_ENV === 'production' && secret !== 'debug-red-sovereign-2024') {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
  }
  
  const envCheck = {
    NODE_ENV: process.env.NODE_ENV,
    RESEND_API_KEY: process.env.RESEND_API_KEY ? 'SET (' + process.env.RESEND_API_KEY.substring(0, 10) + '...)' : 'NOT SET',
    RESEND_FROM_EMAIL: process.env.RESEND_FROM_EMAIL || 'NOT SET',
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL ? 'SET' : 'NOT SET',
    SUPABASE_SERVICE_ROLE_KEY: process.env.SUPABASE_SERVICE_ROLE_KEY ? 'SET' : 'NOT SET',
  };
  
  // Check Vault secrets
  let vaultCheck = {
    RESEND_API_KEY: 'Not checked',
    RESEND_FROM_EMAIL: 'Not checked'
  };
  
  try {
    const { data: apiKey, error: apiKeyError } = await supabaseAdmin.rpc('get_secret', {
      secret_name: 'RESEND_API_KEY'
    });
    
    if (apiKeyError) {
      vaultCheck.RESEND_API_KEY = 'Error: ' + apiKeyError.message;
    } else if (apiKey) {
      vaultCheck.RESEND_API_KEY = 'SET (' + apiKey.substring(0, 10) + '...)';
    } else {
      vaultCheck.RESEND_API_KEY = 'NOT SET';
    }
    
    const { data: fromEmail, error: fromEmailError } = await supabaseAdmin.rpc('get_secret', {
      secret_name: 'RESEND_FROM_EMAIL'
    });
    
    if (fromEmailError) {
      vaultCheck.RESEND_FROM_EMAIL = 'Error: ' + fromEmailError.message;
    } else if (fromEmail) {
      vaultCheck.RESEND_FROM_EMAIL = fromEmail;
    } else {
      vaultCheck.RESEND_FROM_EMAIL = 'NOT SET';
    }
  } catch (error: any) {
    vaultCheck = {
      RESEND_API_KEY: 'Vault error: ' + error.message,
      RESEND_FROM_EMAIL: 'Vault error: ' + error.message
    };
  }
  
  // Test Resend initialization
  let resendTest = 'Not tested';
  try {
    const { Resend } = await import('resend');
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resendTest = 'Resend client created successfully (from env)';
    } else if (vaultCheck.RESEND_API_KEY.startsWith('SET')) {
      resendTest = 'Resend API key available in Vault';
    } else {
      resendTest = 'No API key to test with';
    }
  } catch (error: any) {
    resendTest = 'Error: ' + error.message;
  }
  
  return NextResponse.json({
    envCheck,
    vaultCheck,
    resendTest,
    timestamp: new Date().toISOString()
  });
}