
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Bot, MessageSquare, Users } from "lucide-react";

interface Conversation {
  id: string;
  group_name: string;
  group_id: string;
  created_at: string;
}

interface MediationEvent {
  id: string;
  mediation_response: string;
  created_at: string;
  signal_conversations: {
    group_name: string;
  };
}

const SignalDashboard = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [mediationEvents, setMediationEvents] = useState<MediationEvent[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      // Fetch conversations
      const { data: conversationsData } = await supabase
        .from('signal_conversations')
        .select('*')
        .order('updated_at', { ascending: false })
        .limit(10);

      // Fetch recent mediation events
      const { data: mediationData } = await supabase
        .from('mediation_events')
        .select(`
          *,
          signal_conversations (
            group_name
          )
        `)
        .eq('conflict_detected', true)
        .order('created_at', { ascending: false })
        .limit(10);

      setConversations(conversationsData || []);
      setMediationEvents(mediationData || []);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading Signal data...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl mb-4">
            Signal Bot Dashboard
          </h2>
          <p className="text-lg text-gray-600">
            Monitor your Signal groups and see PeaceKeeper in action
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Conversations */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                Active Signal Groups
              </CardTitle>
            </CardHeader>
            <CardContent>
              {conversations.length === 0 ? (
                <div className="text-center py-8">
                  <MessageSquare className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No Signal conversations yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    Configure your Signal bot to start monitoring groups
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div>
                        <h4 className="font-medium text-gray-900">
                          {conversation.group_name}
                        </h4>
                        <p className="text-sm text-gray-500">
                          ID: {conversation.group_id}
                        </p>
                      </div>
                      <Badge variant="secondary">
                        {new Date(conversation.created_at).toLocaleDateString()}
                      </Badge>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Mediation Events */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bot className="w-5 h-5" />
                Recent Mediation Events
              </CardTitle>
            </CardHeader>
            <CardContent>
              {mediationEvents.length === 0 ? (
                <div className="text-center py-8">
                  <Bot className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500">No mediation events yet</p>
                  <p className="text-sm text-gray-400 mt-1">
                    PeaceKeeper will intervene when conflicts are detected
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {mediationEvents.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 bg-blue-50 rounded-lg border border-blue-200"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <Badge className="bg-blue-100 text-blue-800">
                          {event.signal_conversations?.group_name || 'Unknown Group'}
                        </Badge>
                        <span className="text-xs text-gray-500">
                          {new Date(event.created_at).toLocaleString()}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700 italic">
                        "{event.mediation_response}"
                      </p>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SignalDashboard;
