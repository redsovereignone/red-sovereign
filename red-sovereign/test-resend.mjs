import { Resend } from 'resend';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '.env.local' });

async function testResend() {
  console.log('Testing Resend email configuration...\n');
  
  const apiKey = process.env.RESEND_API_KEY;
  const fromEmail = process.env.RESEND_FROM_EMAIL;
  
  console.log('API Key:', apiKey ? `${apiKey.substring(0, 10)}...` : 'NOT SET');
  console.log('From Email:', fromEmail || 'NOT SET');
  
  if (!apiKey) {
    console.error('\n❌ RESEND_API_KEY is not set in environment variables');
    return;
  }
  
  if (!fromEmail) {
    console.error('\n❌ RESEND_FROM_EMAIL is not set in environment variables');
    return;
  }
  
  try {
    const resend = new Resend(apiKey);
    
    console.log('\n📧 Sending test email...');
    
    const response = await resend.emails.send({
      from: fromEmail,
      to: ['nick@redsovereign.com'],
      subject: '🧪 Resend Test - Red Sovereign',
      html: `
        <h2>Test Email from Red Sovereign</h2>
        <p>This is a test email to verify Resend configuration is working.</p>
        <p>If you're seeing this, the email system is configured correctly!</p>
        <hr>
        <p><small>Sent at: ${new Date().toISOString()}</small></p>
      `,
      text: 'Test email from Red Sovereign. If you\'re seeing this, Resend is working!'
    });
    
    console.log('\n✅ Email sent successfully!');
    console.log('Email ID:', response.data?.id);
    console.log('\nCheck nick@redsovereign.com for the test email.');
    
  } catch (error) {
    console.error('\n❌ Failed to send email:', error.message);
    
    if (error.message?.includes('401')) {
      console.error('\n⚠️  The API key appears to be invalid or unauthorized.');
      console.error('Please check your Resend dashboard for the correct API key.');
    } else if (error.message?.includes('from')) {
      console.error('\n⚠️  The from email address may not be verified in Resend.');
      console.error('Make sure', fromEmail, 'is a verified sender in your Resend account.');
    }
    
    console.error('\nFull error:', error);
  }
}

testResend();