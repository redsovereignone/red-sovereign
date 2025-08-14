import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function POST() {
  try {
    const supabase = await createClient();
    
    // Test data
    const testData = {
      email: 'test@example.com',
      company_size: '11-50',
      industry: 'SaaS',
      monthly_spend: '$5-15k',
      primary_channel: 'Inbound',
      biggest_challenge: 'Lead Gen',
      playbook_data: {
        generated_at: new Date().toISOString(),
        test: true
      }
    };

    const { data, error } = await supabase
      .from('playbook_submissions')
      .insert(testData)
      .select()
      .single();

    if (error) {
      return NextResponse.json({ 
        status: 'error',
        message: 'Insert failed',
        error: error.message,
        hint: error.code === '42P01' ? 'Table does not exist. Please run migrations first.' : undefined
      }, { status: 400 });
    }

    return NextResponse.json({ 
      status: 'success',
      message: 'Test data inserted successfully!',
      data
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to insert test data',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}