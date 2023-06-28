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
        Relationships: []
      }
      feeditem: {
        Row: {
          created_at: string | null
          description: string | null
          feed_id: number
          id: number
          public_health_related: number | null
          thumbnail_url: string | null
          timestamp: string | null
          title: string | null
          uri: string | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          feed_id: number
          id?: number
          public_health_related?: number | null
          thumbnail_url?: string | null
          timestamp?: string | null
          title?: string | null
          uri?: string | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          feed_id?: number
          id?: number
          public_health_related?: number | null
          thumbnail_url?: string | null
          timestamp?: string | null
          title?: string | null
          uri?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "feeditem_feed_id_fkey"
            columns: ["feed_id"]
            referencedRelation: "feed"
            referencedColumns: ["id"]
          }
        ]
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
        Relationships: []
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
