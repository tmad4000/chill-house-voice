
import { MessageSquare, Bot, MessageCircle } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: MessageCircle,
      title: "Smart Chat Integration",
      description: "Seamlessly integrates with Discord, Slack, and other group chat platforms. Monitors conversations and detects when tensions are rising.",
      gradient: "from-blue-500 to-cyan-500"
    },
    {
      icon: Bot,
      title: "AI-Powered Mediation",
      description: "Uses advanced natural language processing to understand context, emotions, and underlying issues in conflicts.",
      gradient: "from-purple-500 to-indigo-500"
    },
    {
      icon: MessageSquare,
      title: "Voice Agent Support",
      description: "Real-time voice mediation for in-person conflicts. Just press a button and let PeaceKeeper facilitate the conversation.",
      gradient: "from-indigo-500 to-purple-500"
    }
  ];

  return (
    <div className="py-24 px-6 mx-auto max-w-7xl lg:px-8">
      <div className="mx-auto max-w-3xl text-center mb-16">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
          How PeaceKeeper Works
        </h2>
        <p className="mt-4 text-lg text-gray-600">
          Three powerful features to keep your living space harmonious and productive
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
            { step: "1", title: "Install", desc: "Add PeaceKeeper to your group chat" },
            { step: "2", title: "Monitor", desc: "AI passively monitors conversations" },
            { step: "3", title: "Mediate", desc: "Intervenes when conflicts arise" }
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
