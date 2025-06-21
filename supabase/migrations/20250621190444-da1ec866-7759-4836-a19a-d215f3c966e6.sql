
-- Create a table to store Signal conversations
CREATE TABLE public.signal_conversations (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  group_id TEXT NOT NULL,
  group_name TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Create a table to store messages
CREATE TABLE public.signal_messages (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.signal_conversations(id) ON DELETE CASCADE,
  sender_phone TEXT NOT NULL,
  sender_name TEXT,
  message_text TEXT,
  timestamp TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  is_bot_message BOOLEAN DEFAULT FALSE
);

-- Create a table to store mediation events
CREATE TABLE public.mediation_events (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  conversation_id UUID REFERENCES public.signal_conversations(id) ON DELETE CASCADE,
  trigger_message_id UUID REFERENCES public.signal_messages(id),
  conflict_detected BOOLEAN DEFAULT FALSE,
  mediation_response TEXT,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Add Row Level Security (RLS) - making tables publicly readable for demo purposes
ALTER TABLE public.signal_conversations ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.signal_messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.mediation_events ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (for demo purposes)
CREATE POLICY "Allow public read access to conversations" 
  ON public.signal_conversations FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to messages" 
  ON public.signal_messages FOR SELECT 
  USING (true);

CREATE POLICY "Allow public read access to mediation events" 
  ON public.mediation_events FOR SELECT 
  USING (true);

-- Allow inserts for the bot functionality
CREATE POLICY "Allow public insert to conversations" 
  ON public.signal_conversations FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert to messages" 
  ON public.signal_messages FOR INSERT 
  WITH CHECK (true);

CREATE POLICY "Allow public insert to mediation events" 
  ON public.mediation_events FOR INSERT 
  WITH CHECK (true);
