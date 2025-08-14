import { NextRequest, NextResponse } from 'next/server';
import { sendLeadAlert } from '@/lib/email/resend';

export async function GET(request: NextRequest) {
  console.log('Test email endpoint called');
  console.log('Environment check:');
  console.log('- RESEND_API_KEY:', process.env.RESEND_API_KEY ? 'SET' : 'NOT SET');
  console.log('- RESEND_FROM_EMAIL:', process.env.RESEND_FROM_EMAIL || 'NOT SET');
  
  try {
    const result = await sendLeadAlert({
      companyName: 'Test Company',
      websiteUrl: 'https://example.com',
      contactEmail: 'test@example.com',
      ttmRevenue: '$1-5M',
      currentGrowthRate: '20-50%',
      targetGrowthRate: '50-75%',
      biggestChallenge: 'Not enough leads',
      submittedAt: new Date().toISOString(),
      submissionId: 'test-' + Date.now()
    });
    
    return NextResponse.json({
      success: result.success,
      emailId: result.emailId,
      error: result.error,
      timestamp: new Date().toISOString()
    });
  } catch (error: any) {
    console.error('Test email error:', error);
    return NextResponse.json({
      success: false,
      error: error.message,
      timestamp: new Date().toISOString()
    }, { status: 500 });
  }
}