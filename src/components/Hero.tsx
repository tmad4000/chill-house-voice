
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot, Phone, Link, Signal } from "lucide-react";

const Hero = () => {
  const handleAddToSignal = () => {
    // Copy phone number to clipboard
    const phoneNumber = "(650) 761-9680";
    navigator.clipboard.writeText(phoneNumber);
    alert("Phone number copied to clipboard! Invite this number to your Signal group chat.");
  };

  const handleWebVoiceAgent = () => {
    // Scroll to voice agent section
    document.getElementById('voice-agent')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="relative overflow-hidden">
      {/* Background gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 via-purple-600/10 to-indigo-600/10"></div>
      
      <div className="relative px-6 py-24 mx-auto max-w-7xl lg:px-8">
        <div className="mx-auto max-w-3xl text-center">
          {/* Logo/Icon */}
          <div className="flex justify-center mb-8">
            <div className="p-4 bg-white rounded-full shadow-lg ring-1 ring-gray-200">
              <Bot className="w-12 h-12 text-indigo-600" />
            </div>
          </div>

          {/* Main heading */}
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl lg:text-7xl">
            Meet{" "}
            <span className="bg-gradient-to-r from-indigo-600 via-purple-600 to-blue-600 bg-clip-text text-transparent">
              MediatorBot
            </span>
          </h1>
          
          <p className="mt-6 text-xl leading-8 text-gray-600 sm:text-2xl">
            The AI mediator that keeps your Signal groups drama-free
          </p>
          
          <p className="mt-4 text-lg leading-8 text-gray-500 max-w-2xl mx-auto">
            From heated coding debates to roommate conflicts, MediatorBot listens to your Signal conversations and steps in with thoughtful mediation when tensions rise.
          </p>

          {/* Phone Number Display */}
          <div className="mt-8 mb-6">
            <div className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-green-50 to-emerald-50 rounded-2xl border border-green-200">
              <Phone className="w-5 h-5 text-green-600 mr-3" />
              <span className="text-2xl font-bold text-green-800 tracking-wide">
                (650) 761-9680
              </span>
            </div>
            <p className="text-sm text-gray-500 mt-2">Call anytime for instant mediation support</p>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col gap-4 justify-center mt-10">
            {/* First row - Call and Signal buttons */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="tel:+16507619680"
                className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white px-6 py-3 text-base font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Bot className="w-5 h-5 mr-2" />
                Call Mediator Bot
              </a>
              
              <Button 
                onClick={handleAddToSignal}
                variant="outline"
                size="lg"
                className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <Signal className="w-5 h-5 mr-2" />
                Add MediatorBot to Signal Chat
              </Button>
            </div>

            {/* Second row - Web Voice Agent */}
            <div className="flex justify-center">
              <Button 
                onClick={handleWebVoiceAgent}
                variant="outline"
                size="lg"
                className="border-2 border-purple-300 text-purple-700 hover:bg-purple-50 px-6 py-3 text-base font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              >
                <MessageCircle className="w-5 h-5 mr-2" />
                Web Voice Agent
              </Button>
            </div>
          </div>

          {/* Signal Setup Instructions */}
          <div className="mt-12 p-6 bg-blue-50 rounded-2xl border border-blue-200">
            <h3 className="text-lg font-semibold text-blue-900 mb-3">Quick Setup for Signal</h3>
            <div className="text-sm text-blue-800 text-left space-y-2">
              <p><strong>1.</strong> Just invite <strong>(650) 761-9680</strong> to your Signal group chat</p>
              <p><strong>2.</strong> MediatorBot will automatically monitor conversations and mediate conflicts, intervening when necessary</p>
            </div>
            
            {/* Commands Section */}
            <div className="mt-4 pt-4 border-t border-blue-200">
              <h4 className="text-sm font-semibold text-blue-900 mb-2">Commands:</h4>
              <div className="text-sm text-blue-800 text-left space-y-1">
                <p><code className="bg-blue-100 px-2 py-1 rounded">@mediatorbot pause</code> to pause monitoring</p>
                <p><code className="bg-blue-100 px-2 py-1 rounded">@mediatorbot continue</code> to resume monitoring</p>
              </div>
            </div>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Trusted by Signal groups worldwide</p>
            <div className="flex justify-center items-center space-x-8 opacity-60">
              <div className="text-2xl font-bold text-gray-400">Y Combinator</div>
              <div className="text-2xl font-bold text-gray-400">Recurse Center</div>
              <div className="text-2xl font-bold text-gray-400">Hacker Paradise</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
