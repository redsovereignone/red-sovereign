import { NextRequest, NextResponse } from 'next/server';

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
  
  // Test Resend initialization
  let resendTest = 'Not tested';
  try {
    const { Resend } = await import('resend');
    if (process.env.RESEND_API_KEY) {
      const resend = new Resend(process.env.RESEND_API_KEY);
      resendTest = 'Resend client created successfully';
    } else {
      resendTest = 'No API key to test with';
    }
  } catch (error: any) {
    resendTest = 'Error: ' + error.message;
  }
  
  return NextResponse.json({
    envCheck,
    resendTest,
    timestamp: new Date().toISOString()
  });
}