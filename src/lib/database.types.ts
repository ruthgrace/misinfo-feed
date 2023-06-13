export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json }
  | Json[]

export interface Database {
  public: {
    Tables: {
      feed: {
        Row: {
          created_at: string | null
          id: number
          logo: string | null
          rss_uri: string | null
          title: string | null
          updated_at: string
          website: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          logo?: string | null
          rss_uri?: string | null
          title?: string | null
          updated_at?: string
          website?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          logo?: string | null
          rss_uri?: string | null
          title?: string | null
          updated_at?: string
          website?: string | null
        }
      }
      feeditem: {
        Row: {
          created_at: string | null
          description: string | null
          feed_id: number | null
          id: number
          public_health_related: number | null
          timestamp: string | null
          title: string | null
          title_html: string | null
          uri: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feed_id?: number | null
          id?: number
          public_health_related?: number | null
          timestamp?: string | null
          title?: string | null
          title_html?: string | null
          uri?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feed_id?: number | null
          id?: number
          public_health_related?: number | null
          timestamp?: string | null
          title?: string | null
          title_html?: string | null
          uri?: string | null
        }
      }
      site_constant: {
        Row: {
          created_at: string | null
          id: number
          name: string | null
          value: string | null
        }
        Insert: {
          created_at?: string | null
          id?: number
          name?: string | null
          value?: string | null
        }
        Update: {
          created_at?: string | null
          id?: number
          name?: string | null
          value?: string | null
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
    CompositeTypes: {
      [_ in never]: never
    }
  }
}
