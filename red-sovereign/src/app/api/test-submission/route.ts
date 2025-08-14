import { NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase/server';

export async function GET() {
  try {
    // Check if tables exist
    const tables = ['playbook_submissions', 'analytics_events', 'waitlist'];
    const results: Record<string, { exists: boolean; count?: number; error?: string; success?: boolean; message?: string }> = {};
    
    for (const table of tables) {
      const { count, error } = await supabaseAdmin
        .from(table)
        .select('*', { count: 'exact', head: true });
      
      if (error) {
        results[table] = { 
          exists: false, 
          error: error.message 
        };
      } else {
        results[table] = { 
          exists: true, 
          count: count || 0 
        };
      }
    }
    
    // Try to insert test data if playbook_submissions exists
    if (results.playbook_submissions?.exists) {
      const testData = {
        company_name: 'API Test Company',
        website_url: 'https://apitest.com',
        contact_email: 'apitest@example.com',
        ttm_revenue: '$1M-$5M',
        current_growth_rate: '20-30%',
        target_growth_rate: '50-75%',
        biggest_challenge: 'Lead Generation',
        playbook_data: {
          test: true,
          timestamp: new Date().toISOString()
        },
        user_agent: 'API Test',
        ip_address: '127.0.0.1'
      };
      
      const { data, error } = await supabaseAdmin
        .from('playbook_submissions')
        .insert([testData])
        .select()
        .single();
      
      if (error) {
        results.testInsert = { 
          exists: false,
          success: false, 
          error: error.message 
        };
      } else {
        // Clean up test data
        await supabaseAdmin
          .from('playbook_submissions')
          .delete()
          .eq('id', data.id);
        
        results.testInsert = { 
          exists: true,
          success: true, 
          message: 'Test insert and cleanup successful' 
        };
      }
    }
    
    return NextResponse.json({
      success: true,
      tables: results,
      supabaseUrl: process.env.NEXT_PUBLIC_SUPABASE_URL
    });
    
  } catch (error: unknown) {
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { 
        success: false, 
        error: errorMessage 
      },
      { status: 500 }
    );
  }
}