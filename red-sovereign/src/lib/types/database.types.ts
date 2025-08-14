export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      playbook_submissions: {
        Row: {
          id: string
          created_at: string
          email: string
          company_size: string
          industry: string
          monthly_spend: string
          primary_channel: string
          biggest_challenge: string
          playbook_data: Json
          pdf_url: string | null
          email_sent: boolean
          user_agent: string | null
          ip_address: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          company_size: string
          industry: string
          monthly_spend: string
          primary_channel: string
          biggest_challenge: string
          playbook_data: Json
          pdf_url?: string | null
          email_sent?: boolean
          user_agent?: string | null
          ip_address?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          company_size?: string
          industry?: string
          monthly_spend?: string
          primary_channel?: string
          biggest_challenge?: string
          playbook_data?: Json
          pdf_url?: string | null
          email_sent?: boolean
          user_agent?: string | null
          ip_address?: string | null
        }
      }
      analytics_events: {
        Row: {
          id: string
          created_at: string
          event_name: string
          event_data: Json
          session_id: string | null
          user_id: string | null
          page_url: string | null
          referrer: string | null
        }
        Insert: {
          id?: string
          created_at?: string
          event_name: string
          event_data?: Json
          session_id?: string | null
          user_id?: string | null
          page_url?: string | null
          referrer?: string | null
        }
        Update: {
          id?: string
          created_at?: string
          event_name?: string
          event_data?: Json
          session_id?: string | null
          user_id?: string | null
          page_url?: string | null
          referrer?: string | null
        }
      }
      waitlist: {
        Row: {
          id: string
          created_at: string
          email: string
          company_name: string | null
          role: string | null
          source: string | null
          marketing_consent: boolean
        }
        Insert: {
          id?: string
          created_at?: string
          email: string
          company_name?: string | null
          role?: string | null
          source?: string | null
          marketing_consent?: boolean
        }
        Update: {
          id?: string
          created_at?: string
          email?: string
          company_name?: string | null
          role?: string | null
          source?: string | null
          marketing_consent?: boolean
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
  }
}