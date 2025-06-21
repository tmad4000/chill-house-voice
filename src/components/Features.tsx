
import { MessageSquare, Bot, Phone } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Phone,
      title: "Signal Integration",
      description: "Seamlessly integrates with Signal groups via webhook. Monitors conversations in real-time and detects when tensions are rising in your group chats.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bot,
      title: "GPT-Powered Mediation",
      description: "Uses GPT-4 to understand context, emotions, and underlying issues in conflicts. Provides intelligent, empathetic responses tailored to each situation.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: MessageSquare,
      title: "Intelligent Intervention",
      description: "Only steps in when mediation is truly needed. Analyzes conversation patterns and emotional tone to determine the right moment to help.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="py-24 px-6 mx-auto max-w-7xl lg:px-8">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How PeaceKeeper Works with Signal
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Three powerful features to keep your Signal groups harmonious and productive
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div
            key={index}
            className="relative group p-8 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 border border-gray-100"
          >
            {/* Icon */}
            <div className={`inline-flex p-3 rounded-xl bg-gradient-to-r ${feature.gradient} mb-6`}>
              <feature.icon className="w-6 h-6 text-white" />
            </div>

            {/* Content */}
            <h3 className="text-xl font-semibold text-gray-900 mb-4">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>

            {/* Hover effect */}
            <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-indigo-500/5 via-purple-500/5 to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>

      {/* How it works timeline */}
      <div className="mt-24">
        <h3 className="text-2xl font-bold text-center text-gray-900 mb-12">Simple 3-Step Process</h3>
        <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-12">
          {[
            { step: "1", title: "Setup Webhook", desc: "Configure your Signal bot to send messages to PeaceKeeper" },
            { step: "2", title: "AI Monitoring", desc: "GPT-4 analyzes conversations for conflict indicators" },
            { step: "3", title: "Smart Mediation", desc: "Bot intervenes with helpful mediation when needed" }
          ].map((item, index) => (
            <div key={index} className="text-center max-w-xs">
              <div className="w-12 h-12 bg-gradient-to-r from-indigo-500 to-purple-500 text-white rounded-full flex items-center justify-center text-xl font-bold mx-auto mb-4">
                {item.step}
              </div>
              <h4 className="text-lg font-semibold text-gray-900 mb-2">{item.title}</h4>
              <p className="text-gray-600">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Features;
