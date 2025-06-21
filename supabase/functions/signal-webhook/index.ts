
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const supabaseUrl = 'https://cqxqvxfpvcdnympknfql.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNxeHF2eGZwdmNkbnltcGtuZnFsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTA1MzI0NjUsImV4cCI6MjA2NjEwODQ2NX0.PsrZKE1vl1EdquASzZ_JzrirxwLjEQiTAhIP99NTwp4';

const supabase = createClient(supabaseUrl, supabaseKey);
const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

async function analyzeForConflict(messages: string[]): Promise<{ isConflict: boolean; response: string }> {
  const conversationContext = messages.slice(-10).join('\n'); // Last 10 messages for context
  
  const prompt = `You are PeaceKeeper, an AI mediator for Signal group chats. Analyze the following conversation and determine if there's conflict that needs mediation.

Recent conversation:
${conversationContext}

If you detect tension, conflict, arguments, or heated discussion, respond with a calming, diplomatic message to help mediate. If the conversation is normal, respond with "NO_MEDIATION_NEEDED".

Be empathetic, neutral, and focus on understanding all perspectives. Keep responses concise and helpful.`;

  const response = await fetch('https://api.openai.com/v1/chat/completions', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${openAIApiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      model: 'gpt-4o-mini',
      messages: [
        { role: 'system', content: 'You are PeaceKeeper, a diplomatic AI mediator for group chats.' },
        { role: 'user', content: prompt }
      ],
      max_tokens: 200,
      temperature: 0.7,
    }),
  });

  const data = await response.json();
  const aiResponse = data.choices[0].message.content.trim();
  
  if (aiResponse === "NO_MEDIATION_NEEDED") {
    return { isConflict: false, response: "" };
  }
  
  return { isConflict: true, response: aiResponse };
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    const payload = await req.json();
    console.log('Received Signal webhook:', payload);

    // Extract message data (format will depend on your Signal API setup)
    const { groupId, groupName, senderPhone, senderName, messageText, timestamp } = payload;

    if (!messageText || !groupId) {
      return new Response('Invalid payload', { status: 400, headers: corsHeaders });
    }

    // Find or create conversation
    let { data: conversation } = await supabase
      .from('signal_conversations')
      .select('*')
      .eq('group_id', groupId)
      .single();

    if (!conversation) {
      const { data: newConversation } = await supabase
        .from('signal_conversations')
        .insert({
          group_id: groupId,
          group_name: groupName || `Group ${groupId}`,
        })
        .select()
        .single();
      conversation = newConversation;
    }

    // Store the incoming message
    const { data: message } = await supabase
      .from('signal_messages')
      .insert({
        conversation_id: conversation.id,
        sender_phone: senderPhone,
        sender_name: senderName,
        message_text: messageText,
        timestamp: timestamp || new Date().toISOString(),
        is_bot_message: false,
      })
      .select()
      .single();

    // Get recent messages for context
    const { data: recentMessages } = await supabase
      .from('signal_messages')
      .select('message_text')
      .eq('conversation_id', conversation.id)
      .order('timestamp', { ascending: false })
      .limit(10);

    const messageTexts = recentMessages?.map(m => m.message_text).reverse() || [];

    // Analyze for conflict
    const { isConflict, response } = await analyzeForConflict(messageTexts);

    if (isConflict && response) {
      // Store mediation event
      await supabase
        .from('mediation_events')
        .insert({
          conversation_id: conversation.id,
          trigger_message_id: message.id,
          conflict_detected: true,
          mediation_response: response,
        });

      // Store bot response message
      await supabase
        .from('signal_messages')
        .insert({
          conversation_id: conversation.id,
          sender_phone: 'bot',
          sender_name: 'PeaceKeeper',
          message_text: response,
          is_bot_message: true,
        });

      // Here you would send the response back to Signal
      // This depends on your Signal API setup
      console.log('Mediation response:', response);
      
      return new Response(JSON.stringify({ 
        mediation_triggered: true, 
        response: response 
      }), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    return new Response(JSON.stringify({ 
      mediation_triggered: false 
    }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });

  } catch (error) {
    console.error('Error in signal-webhook:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
