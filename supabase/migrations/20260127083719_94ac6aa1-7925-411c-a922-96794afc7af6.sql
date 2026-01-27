-- Create enums
CREATE TYPE public.time_frame AS ENUM ('morning', 'afternoon', 'evening', 'night');
CREATE TYPE public.schedule_type AS ENUM ('everyday', 'specific_days', 'cyclical', 'as_needed');
CREATE TYPE public.intake_status AS ENUM ('taken', 'skipped', 'missed');
CREATE TYPE public.selection_rule AS ENUM ('exactly_one', 'any');

-- Create medications table
CREATE TABLE public.medications (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  form TEXT NOT NULL,
  custom_form_name TEXT,
  strength TEXT NOT NULL,
  strength_unit TEXT NOT NULL,
  shape TEXT DEFAULT 'capsule',
  shape_line BOOLEAN DEFAULT false,
  color_left TEXT DEFAULT 'blue',
  color_right TEXT,
  color_background TEXT DEFAULT 'white',
  photo_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create medication_groups table
CREATE TABLE public.medication_groups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  time_frame public.time_frame NOT NULL,
  reminder_time TIME,
  selection_rule public.selection_rule NOT NULL DEFAULT 'exactly_one',
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create dose_configurations table
CREATE TABLE public.dose_configurations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  group_id UUID NOT NULL REFERENCES public.medication_groups(id) ON DELETE CASCADE,
  medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 1,
  display_name TEXT,
  schedule_type public.schedule_type NOT NULL DEFAULT 'everyday',
  schedule_data JSONB DEFAULT '{}',
  start_date DATE NOT NULL DEFAULT CURRENT_DATE,
  end_date DATE,
  is_flexible BOOLEAN NOT NULL DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create stock_sources table
CREATE TABLE public.stock_sources (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  medication_id UUID NOT NULL REFERENCES public.medications(id) ON DELETE CASCADE,
  quantity INTEGER NOT NULL DEFAULT 0,
  expiry_date DATE,
  added_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create intake_logs table
CREATE TABLE public.intake_logs (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  dose_configuration_id UUID NOT NULL REFERENCES public.dose_configurations(id) ON DELETE CASCADE,
  taken_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  status public.intake_status NOT NULL DEFAULT 'taken'
);

-- Enable RLS on all tables
ALTER TABLE public.medications ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.medication_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.dose_configurations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stock_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.intake_logs ENABLE ROW LEVEL SECURITY;

-- RLS policies for medications
CREATE POLICY "Users can view their own medications"
  ON public.medications FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medications"
  ON public.medications FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medications"
  ON public.medications FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medications"
  ON public.medications FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for medication_groups
CREATE POLICY "Users can view their own medication groups"
  ON public.medication_groups FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own medication groups"
  ON public.medication_groups FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own medication groups"
  ON public.medication_groups FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own medication groups"
  ON public.medication_groups FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for dose_configurations
CREATE POLICY "Users can view their own dose configurations"
  ON public.dose_configurations FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own dose configurations"
  ON public.dose_configurations FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own dose configurations"
  ON public.dose_configurations FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own dose configurations"
  ON public.dose_configurations FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for stock_sources
CREATE POLICY "Users can view their own stock sources"
  ON public.stock_sources FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own stock sources"
  ON public.stock_sources FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own stock sources"
  ON public.stock_sources FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own stock sources"
  ON public.stock_sources FOR DELETE
  USING (auth.uid() = user_id);

-- RLS policies for intake_logs
CREATE POLICY "Users can view their own intake logs"
  ON public.intake_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can create their own intake logs"
  ON public.intake_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own intake logs"
  ON public.intake_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own intake logs"
  ON public.intake_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Create updated_at trigger function
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create triggers for updated_at
CREATE TRIGGER update_medications_updated_at
  BEFORE UPDATE ON public.medications
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_medication_groups_updated_at
  BEFORE UPDATE ON public.medication_groups
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

CREATE TRIGGER update_dose_configurations_updated_at
  BEFORE UPDATE ON public.dose_configurations
  FOR EACH ROW EXECUTE FUNCTION public.update_updated_at_column();

-- Create indexes for performance
CREATE INDEX idx_medications_user_id ON public.medications(user_id);
CREATE INDEX idx_medication_groups_user_id ON public.medication_groups(user_id);
CREATE INDEX idx_dose_configurations_user_id ON public.dose_configurations(user_id);
CREATE INDEX idx_dose_configurations_group_id ON public.dose_configurations(group_id);
CREATE INDEX idx_dose_configurations_medication_id ON public.dose_configurations(medication_id);
CREATE INDEX idx_stock_sources_user_id ON public.stock_sources(user_id);
CREATE INDEX idx_stock_sources_medication_id ON public.stock_sources(medication_id);
CREATE INDEX idx_intake_logs_user_id ON public.intake_logs(user_id);
CREATE INDEX idx_intake_logs_dose_configuration_id ON public.intake_logs(dose_configuration_id);
CREATE INDEX idx_intake_logs_taken_at ON public.intake_logs(taken_at);