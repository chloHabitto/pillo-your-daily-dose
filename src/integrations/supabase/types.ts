export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      dose_configurations: {
        Row: {
          created_at: string
          display_name: string | null
          end_date: string | null
          group_id: string
          id: string
          is_flexible: boolean
          medication_id: string
          quantity: number
          schedule_data: Json | null
          schedule_type: Database["public"]["Enums"]["schedule_type"]
          start_date: string
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          display_name?: string | null
          end_date?: string | null
          group_id: string
          id?: string
          is_flexible?: boolean
          medication_id: string
          quantity?: number
          schedule_data?: Json | null
          schedule_type?: Database["public"]["Enums"]["schedule_type"]
          start_date?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          display_name?: string | null
          end_date?: string | null
          group_id?: string
          id?: string
          is_flexible?: boolean
          medication_id?: string
          quantity?: number
          schedule_data?: Json | null
          schedule_type?: Database["public"]["Enums"]["schedule_type"]
          start_date?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "dose_configurations_group_id_fkey"
            columns: ["group_id"]
            isOneToOne: false
            referencedRelation: "medication_groups"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "dose_configurations_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
      intake_logs: {
        Row: {
          dose_configuration_id: string
          id: string
          status: Database["public"]["Enums"]["intake_status"]
          taken_at: string
          user_id: string
        }
        Insert: {
          dose_configuration_id: string
          id?: string
          status?: Database["public"]["Enums"]["intake_status"]
          taken_at?: string
          user_id: string
        }
        Update: {
          dose_configuration_id?: string
          id?: string
          status?: Database["public"]["Enums"]["intake_status"]
          taken_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "intake_logs_dose_configuration_id_fkey"
            columns: ["dose_configuration_id"]
            isOneToOne: false
            referencedRelation: "dose_configurations"
            referencedColumns: ["id"]
          },
        ]
      }
      medication_groups: {
        Row: {
          created_at: string
          id: string
          name: string
          reminder_time: string | null
          selection_rule: Database["public"]["Enums"]["selection_rule"]
          time_frame: Database["public"]["Enums"]["time_frame"]
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          name: string
          reminder_time?: string | null
          selection_rule?: Database["public"]["Enums"]["selection_rule"]
          time_frame: Database["public"]["Enums"]["time_frame"]
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          name?: string
          reminder_time?: string | null
          selection_rule?: Database["public"]["Enums"]["selection_rule"]
          time_frame?: Database["public"]["Enums"]["time_frame"]
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      medications: {
        Row: {
          color_background: string | null
          color_left: string | null
          color_right: string | null
          created_at: string
          custom_form_name: string | null
          form: string
          id: string
          name: string
          photo_url: string | null
          shape: string | null
          shape_line: boolean | null
          strength: string
          strength_unit: string
          updated_at: string
          user_id: string
        }
        Insert: {
          color_background?: string | null
          color_left?: string | null
          color_right?: string | null
          created_at?: string
          custom_form_name?: string | null
          form: string
          id?: string
          name: string
          photo_url?: string | null
          shape?: string | null
          shape_line?: boolean | null
          strength: string
          strength_unit: string
          updated_at?: string
          user_id: string
        }
        Update: {
          color_background?: string | null
          color_left?: string | null
          color_right?: string | null
          created_at?: string
          custom_form_name?: string | null
          form?: string
          id?: string
          name?: string
          photo_url?: string | null
          shape?: string | null
          shape_line?: boolean | null
          strength?: string
          strength_unit?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      stock_sources: {
        Row: {
          added_at: string
          expiry_date: string | null
          id: string
          medication_id: string
          quantity: number
          user_id: string
        }
        Insert: {
          added_at?: string
          expiry_date?: string | null
          id?: string
          medication_id: string
          quantity?: number
          user_id: string
        }
        Update: {
          added_at?: string
          expiry_date?: string | null
          id?: string
          medication_id?: string
          quantity?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "stock_sources_medication_id_fkey"
            columns: ["medication_id"]
            isOneToOne: false
            referencedRelation: "medications"
            referencedColumns: ["id"]
          },
        ]
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      intake_status: "taken" | "skipped" | "missed"
      schedule_type: "everyday" | "specific_days" | "cyclical" | "as_needed"
      selection_rule: "exactly_one" | "any"
      time_frame: "morning" | "afternoon" | "evening" | "night"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      intake_status: ["taken", "skipped", "missed"],
      schedule_type: ["everyday", "specific_days", "cyclical", "as_needed"],
      selection_rule: ["exactly_one", "any"],
      time_frame: ["morning", "afternoon", "evening", "night"],
    },
  },
} as const
