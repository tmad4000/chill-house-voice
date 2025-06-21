
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import VoiceAgent from "@/components/VoiceAgent";
import SignalDashboard from "@/components/SignalDashboard";

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      <Hero />
      <Features />
      <SignalDashboard />
      <VoiceAgent />
    </div>
  );
};

export default Index;
