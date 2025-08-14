import { createClient } from './server';
import type { Database } from '@/lib/types/database.types';

type PlaybookSubmission = Database['public']['Tables']['playbook_submissions']['Insert'];
type AnalyticsEvent = Database['public']['Tables']['analytics_events']['Insert'];

export async function savePlaybookSubmission(data: PlaybookSubmission) {
  const supabase = await createClient();
  
  const { data: submission, error } = await supabase
    .from('playbook_submissions')
    .insert(data)
    .select()
    .single();

  if (error) {
    console.error('Error saving playbook submission:', error);
    throw error;
  }

  return submission;
}

export async function trackAnalyticsEvent(event: AnalyticsEvent) {
  const supabase = await createClient();
  
  const { error } = await supabase
    .from('analytics_events')
    .insert(event);

  if (error) {
    console.error('Error tracking analytics event:', error);
    // Don't throw for analytics - we don't want to break the user experience
  }
}

export async function addToWaitlist(email: string, data?: {
  company_name?: string;
  role?: string;
  source?: string;
  marketing_consent?: boolean;
}) {
  const supabase = await createClient();
  
  const { data: submission, error } = await supabase
    .from('waitlist')
    .insert({
      email,
      ...data
    })
    .select()
    .single();

  if (error) {
    console.error('Error adding to waitlist:', error);
    throw error;
  }

  return submission;
}