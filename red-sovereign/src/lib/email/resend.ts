import { Resend } from 'resend';

// Lazy initialization to avoid build-time issues
let resend: Resend | null = null;

function getResendClient() {
  if (!resend) {
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      throw new Error('RESEND_API_KEY environment variable is not set');
    }
    resend = new Resend(apiKey);
  }
  return resend;
}

export interface LeadAlertData {
  companyName: string;
  websiteUrl?: string;
  contactEmail: string;
  ttmRevenue: string;
  currentGrowthRate: string;
  targetGrowthRate: string;
  biggestChallenge: string;
  submittedAt: string;
  submissionId: string;
}

export async function sendLeadAlert(data: LeadAlertData) {
  const { companyName, websiteUrl, contactEmail, ttmRevenue, currentGrowthRate, targetGrowthRate, biggestChallenge, submittedAt, submissionId } = data;
  
  const emailHtml = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body {
            font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
            line-height: 1.6;
            color: #333;
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          .header {
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            color: white;
            padding: 30px;
            border-radius: 10px 10px 0 0;
            text-align: center;
          }
          .content {
            background: #f7f7f7;
            padding: 30px;
            border-radius: 0 0 10px 10px;
          }
          .field {
            background: white;
            padding: 15px;
            margin-bottom: 15px;
            border-radius: 8px;
            border-left: 4px solid #667eea;
          }
          .field-label {
            font-weight: 600;
            color: #555;
            font-size: 12px;
            text-transform: uppercase;
            letter-spacing: 0.5px;
            margin-bottom: 5px;
          }
          .field-value {
            font-size: 16px;
            color: #111;
          }
          .highlight {
            background: #fef3c7;
            border-left-color: #f59e0b;
          }
          .cta {
            background: #667eea;
            color: white;
            padding: 15px 30px;
            border-radius: 8px;
            text-decoration: none;
            display: inline-block;
            margin-top: 20px;
            font-weight: 600;
          }
          .footer {
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #e5e5e5;
            font-size: 12px;
            color: #999;
            text-align: center;
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1>🎯 New Playbook Lead!</h1>
          <p style="margin: 0; opacity: 0.9;">Someone just requested their 90-Day Growth Plan</p>
        </div>
        
        <div class="content">
          <div class="field highlight">
            <div class="field-label">Company</div>
            <div class="field-value">${companyName}</div>
          </div>
          
          <div class="field highlight">
            <div class="field-label">Contact Email</div>
            <div class="field-value">
              <a href="mailto:${contactEmail}" style="color: #667eea; text-decoration: none;">
                ${contactEmail}
              </a>
            </div>
          </div>
          
          ${websiteUrl ? `
          <div class="field">
            <div class="field-label">Website</div>
            <div class="field-value">
              <a href="${websiteUrl}" target="_blank" style="color: #667eea; text-decoration: none;">
                ${websiteUrl}
              </a>
            </div>
          </div>
          ` : ''}
          
          <div class="field">
            <div class="field-label">TTM Revenue</div>
            <div class="field-value">${ttmRevenue}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Current Growth Rate</div>
            <div class="field-value">${currentGrowthRate}</div>
          </div>
          
          <div class="field">
            <div class="field-label">Target Growth Rate</div>
            <div class="field-value">${targetGrowthRate}</div>
          </div>
          
          <div class="field highlight">
            <div class="field-label">Biggest Challenge</div>
            <div class="field-value">${biggestChallenge}</div>
          </div>
          
          <div style="text-align: center; margin-top: 30px;">
            <a href="https://supabase.com/dashboard/project/lxjlatocuabjjaxkdsjq/editor/29418" class="cta">
              View in Supabase →
            </a>
          </div>
          
          <div class="footer">
            <p>Submission ID: ${submissionId}</p>
            <p>Submitted at: ${new Date(submittedAt).toLocaleString('en-US', { 
              weekday: 'long', 
              year: 'numeric', 
              month: 'long', 
              day: 'numeric', 
              hour: '2-digit', 
              minute: '2-digit',
              timeZoneName: 'short'
            })}</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const emailText = `
New Playbook Lead Alert!

Company: ${companyName}
Contact: ${contactEmail}
Website: ${websiteUrl || 'Not provided'}
TTM Revenue: ${ttmRevenue}
Current Growth: ${currentGrowthRate}
Target Growth: ${targetGrowthRate}
Biggest Challenge: ${biggestChallenge}

Submission ID: ${submissionId}
Submitted at: ${new Date(submittedAt).toLocaleString()}

View in Supabase: https://supabase.com/dashboard/project/lxjlatocuabjjaxkdsjq/editor/29418
  `;
  
  try {
    const resendClient = getResendClient();
    const response = await resendClient.emails.send({
      from: process.env.RESEND_FROM_EMAIL || 'report@marketing.sovereignai.co',
      to: ['nick@redsovereign.com'], // Send to Nick
      subject: `🎯 New Lead: ${companyName} - ${ttmRevenue} Revenue`,
      html: emailHtml,
      text: emailText,
    });
    
    return { success: true, emailId: response.data?.id };
  } catch (error) {
    console.error('Failed to send lead alert email:', error);
    return { success: false, error };
  }
}