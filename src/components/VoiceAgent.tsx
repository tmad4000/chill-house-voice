
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Bot, Expand, Minimize } from "lucide-react";

const VoiceAgent = () => {
  const [isListening, setIsListening] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [messages, setMessages] = useState<Array<{ type: 'user' | 'bot', text: string }>>([]);
  const [isExpanded, setIsExpanded] = useState(false);
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    // Initialize speech recognition if available
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;

      recognitionRef.current.onresult = (event: any) => {
        let finalTranscript = '';
        for (let i = event.resultIndex; i < event.results.length; i++) {
          if (event.results[i].isFinal) {
            finalTranscript += event.results[i][0].transcript;
          }
        }
        if (finalTranscript) {
          setTranscript(finalTranscript);
          handleUserMessage(finalTranscript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };
    }
  }, []);

  const handleUserMessage = async (message: string) => {
    // Show user's message
    setMessages(prev => [...prev, { type: 'user', text: message }]);
  
    try {
      const response = await fetch("https://mediator-bot.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [{ role: "user", content: message }],
        }),
      });
  
      if (!response.ok) {
        const text = await response.text();
        console.error("Server Error Response:", text);
        throw new Error(`Server responded with status ${response.status}`);
      }
  
      const data = await response.json();
  
      // 🚫 If mediation_triggered is false or missing, don't show anything
      if (!data.mediation_triggered) {
        return;
      }
  
      // ✅ Add primary response
      if (data.response) {
        setMessages(prev => [...prev, { type: 'bot', text: data.response }]);
      }
  
      // ✅ Add extras if available
      const extras = {
        "🔍 Observation": data.observations,
        "❤️ Feelings": data.feelings,
        "💡 Needs": data.needs,
        "🗣️ Request": data.requests
      };
  
      for (const [label, value] of Object.entries(extras)) {
        if (value) {
          setMessages(prev => [...prev, { type: 'bot', text: `${label}: ${value}` }]);
        }
      }
  
    } catch (err) {
      console.error("Chat error:", err);
      setMessages(prev => [...prev, {
        type: 'bot',
        text: "⚠️ Sorry, something went wrong. Please try again."
      }]);
    }
  };
  
  const startVoiceAgent = () => {
    if (!isConnected) {
      setIsConnected(true);
      setMessages([{ type: 'bot', text: "Hi everyone! I'm MediatorBot, your AI mediator. I'm here to help facilitate productive conversations. What's going on?" }]);
    }

    if (recognitionRef.current && !isListening) {
      setIsListening(true);
      recognitionRef.current.start();
    }
  };

  const stopVoiceAgent = () => {
    setIsListening(false);
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
  };

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div 
      id="voice-agent" 
      className={`transition-all duration-300 ${
        isExpanded 
          ? 'fixed inset-4 z-50 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl overflow-hidden' 
          : 'py-24 px-6 mx-auto max-w-4xl lg:px-8 bg-gradient-to-r from-indigo-50 to-purple-50 rounded-3xl my-12'
      }`}
    >
      <div className={`${isExpanded ? 'h-full flex flex-col p-8' : ''}`}>
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-4 mb-4">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
              Try the Voice Agent
            </h2>
            <Button
              onClick={toggleExpanded}
              variant="outline"
              size="sm"
              className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50"
            >
              {isExpanded ? <Minimize className="w-4 h-4" /> : <Expand className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Experience real-time AI mediation. Perfect for when discussions get heated and you need an impartial facilitator.
          </p>
        </div>

        {/* Voice Agent Interface */}
        <div className={`bg-white rounded-2xl shadow-xl p-8 mx-auto ${isExpanded ? 'flex-1 flex flex-col max-w-none w-full' : 'max-w-2xl'}`}>
          {/* Connection Status */}
          <div className="flex items-center justify-center mb-6">
            <div className={`w-3 h-3 rounded-full mr-2 ${isConnected ? 'bg-green-500' : 'bg-gray-300'}`}></div>
            <span className="text-sm text-gray-600">
              {isConnected ? 'MediatorBot is active' : 'Ready to connect'}
            </span>
          </div>

          {/* Messages */}
          {messages.length > 0 && (
            <div className={`mb-6 overflow-y-auto bg-gray-50 rounded-xl p-4 space-y-3 ${isExpanded ? 'flex-1' : 'h-64'}`}>
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-xs px-4 py-2 rounded-lg ${message.type === 'user'
                        ? 'bg-indigo-500 text-white'
                        : 'bg-white text-gray-800 shadow-sm border'
                      }`}
                  >
                    <div className="flex items-center mb-1">
                      {message.type === 'bot' && <Bot className="w-4 h-4 mr-1 text-indigo-500" />}
                      <span className="text-xs font-medium">
                        {message.type === 'user' ? 'You' : 'MediatorBot'}
                      </span>
                    </div>
                    <p className="text-sm">{message.text}</p>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Current transcript */}
          {transcript && (
            <div className="mb-4 p-3 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-800">Listening: "{transcript}"</p>
            </div>
          )}

          {/* Controls */}
          <div className="flex justify-center space-x-4">
            {!isListening ? (
              <Button
                onClick={startVoiceAgent}
                size="lg"
                className="bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                <Bot className="w-5 h-5 mr-2" />
                {isConnected ? 'Resume Listening' : 'Start Voice Agent'}
              </Button>
            ) : (
              <Button
                onClick={stopVoiceAgent}
                size="lg"
                variant="destructive"
                className="px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Stop Listening
              </Button>
            )}
          </div>

          {/* Instructions */}
          {!isConnected && (
            <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
              <p className="text-sm text-amber-800">
                <strong>Demo Mode:</strong> This simulates the voice agent experience.
                Click "Start Voice Agent" to begin, then speak naturally. The AI will respond with mediation suggestions.
              </p>
            </div>
          )}
        </div>

        {/* Features list */}
        {!isExpanded && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
            <div className="text-center p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Real-time Processing</h4>
              <p className="text-sm text-gray-600">Instantly analyzes tone, emotion, and context</p>
            </div>
            <div className="text-center p-4">
              <h4 className="font-semibold text-gray-900 mb-2">Smart Intervention</h4>
              <p className="text-sm text-gray-600">Only steps in when mediation is needed</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default VoiceAgent;
