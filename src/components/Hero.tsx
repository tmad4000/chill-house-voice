
import { Button } from "@/components/ui/button";
import { MessageCircle, Bot } from "lucide-react";

const Hero = () => {
  const handleAddToChat = () => {
    // This would integrate with group chat platforms like Discord, Slack, etc.
    window.open("https://discord.com/oauth2/authorize?client_id=your-bot-id&permissions=2048&scope=bot", "_blank");
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
              PeaceKeeper
            </span>
          </h1>
          
          <p className="mt-6 text-xl leading-8 text-gray-600 sm:text-2xl">
            The AI mediator that keeps your Hacker house drama-free
          </p>
          
          <p className="mt-4 text-lg leading-8 text-gray-500 max-w-2xl mx-auto">
            From heated coding debates to roommate conflicts, PeaceKeeper listens, understands, and steps in with thoughtful mediation when tensions rise.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <Button 
              onClick={handleAddToChat}
              size="lg" 
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <MessageCircle className="w-5 h-5 mr-2" />
              Add to Group Chat
            </Button>
            
            <Button 
              variant="outline"
              size="lg"
              className="border-2 border-indigo-300 text-indigo-700 hover:bg-indigo-50 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:-translate-y-1"
              onClick={() => document.getElementById('voice-agent')?.scrollIntoView({ behavior: 'smooth' })}
            >
              <Bot className="w-5 h-5 mr-2" />
              Try Voice Agent
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="mt-16 pt-8 border-t border-gray-200">
            <p className="text-sm text-gray-500 mb-4">Trusted by Hacker houses worldwide</p>
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
