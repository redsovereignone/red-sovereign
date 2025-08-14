import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';
import { headers } from 'next/headers';
import { sendLeadAlert } from '@/lib/email/resend';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const headersList = headers();
    
    // Get client information
    const userAgent = headersList.get('user-agent') || 'Unknown';
    const ipAddress = headersList.get('x-forwarded-for')?.split(',')[0].trim() || 
                     headersList.get('x-real-ip') || 
                     'Unknown';
    
    // Normalize website URL - add https:// if missing
    let websiteUrl = data.websiteUrl || '';
    if (websiteUrl && !websiteUrl.match(/^https?:\/\//i)) {
      websiteUrl = 'https://' + websiteUrl;
    }
    
    // Prepare submission data matching the updated schema
    const submissionData = {
      company_name: data.companyName,
      website_url: websiteUrl,
      contact_email: data.contactEmail,
      ttm_revenue: data.ttmRevenue,
      current_growth_rate: data.currentGrowthRate,
      target_growth_rate: data.targetGrowthRate,
      biggest_challenge: data.biggestChallenge,
      playbook_data: {
        answers: {
          companyName: data.companyName,
          websiteUrl: data.websiteUrl,
          ttmRevenue: data.ttmRevenue,
          currentGrowthRate: data.currentGrowthRate,
          targetGrowthRate: data.targetGrowthRate,
          biggestChallenge: data.biggestChallenge
        },
        timestamp: new Date().toISOString()
      },
      user_agent: userAgent,
      ip_address: ipAddress
    };
    
    // Save to Supabase
    const { data: submission, error } = await supabaseAdmin
      .from('playbook_submissions')
      .insert([submissionData])
      .select()
      .single();
    
    if (error) {
      console.error('Supabase error:', error);
      throw new Error('Failed to save submission');
    }
    
    console.log('Playbook submission saved:', submission.id);
    
    // Track analytics event
    await supabaseAdmin
      .from('analytics_events')
      .insert([{
        event_name: 'playbook_submission',
        event_data: {
          submission_id: submission.id,
          company_name: data.companyName,
          challenge: data.biggestChallenge
        },
        page_url: request.headers.get('referer') || '/',
        referrer: request.headers.get('referer') || null
      }]);
    
    // Send lead alert email
    console.log('Preparing to send lead alert email for:', data.companyName);
    
    try {
      const emailResult = await sendLeadAlert({
        companyName: data.companyName,
        websiteUrl: websiteUrl,
        contactEmail: data.contactEmail,
        ttmRevenue: data.ttmRevenue,
        currentGrowthRate: data.currentGrowthRate,
        targetGrowthRate: data.targetGrowthRate,
        biggestChallenge: data.biggestChallenge,
        submittedAt: submission.created_at,
        submissionId: submission.id
      });
      
      if (emailResult.success) {
        console.log('Lead alert email sent successfully:', emailResult.emailId);
        
        // Update submission record with email sent status
        await supabaseAdmin
          .from('playbook_submissions')
          .update({ email_sent: true })
          .eq('id', submission.id);
      } else {
        console.error('Failed to send lead alert email - emailResult.success was false');
        console.error('Email error:', emailResult.error);
      }
    } catch (emailError) {
      console.error('Exception while sending lead alert email:', emailError);
      // Don't throw - we still want to return success for the submission
    }
    
    return NextResponse.json({ 
      success: true, 
      message: 'Submission received successfully. Our team will analyze your information and send your custom growth plan within 24 hours.',
      id: submission.id
    });
    
  } catch (error) {
    console.error('API error:', error);
    
    return NextResponse.json(
      { 
        success: false, 
        error: 'Failed to process submission. Please try again.' 
      },
      { status: 500 }
    );
  }
}