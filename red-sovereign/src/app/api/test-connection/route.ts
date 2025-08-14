import { NextResponse } from 'next/server';
import { createClient } from '@/lib/supabase/server';

export async function GET() {
  try {
    const supabase = await createClient();
    
    // Test the connection by attempting to fetch from a table
    const { data, error } = await supabase
      .from('playbook_submissions')
      .select('count')
      .limit(1);

    if (error) {
      // If table doesn't exist, that's okay - connection still works
      if (error.code === '42P01') {
        return NextResponse.json({ 
          status: 'connected',
          message: 'Successfully connected to Supabase. Tables need to be created.',
          details: {
            url: process.env.NEXT_PUBLIC_SUPABASE_URL,
            tables_exist: false
          }
        });
      }
      
      return NextResponse.json({ 
        status: 'error',
        message: 'Connection failed',
        error: error.message 
      }, { status: 500 });
    }

    return NextResponse.json({ 
      status: 'connected',
      message: 'Successfully connected to Supabase!',
      details: {
        url: process.env.NEXT_PUBLIC_SUPABASE_URL,
        tables_exist: true
      }
    });
  } catch (error) {
    return NextResponse.json({ 
      status: 'error',
      message: 'Failed to connect to Supabase',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}