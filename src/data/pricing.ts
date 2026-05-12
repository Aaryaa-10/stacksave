import { ToolPricing } from "@/types/pricing";

export const pricingData: ToolPricing[] = [
  {
    tool: "Cursor",
    category: "Coding Assistant",
    officialUrl: "https://cursor.com/pricing",
    plans: [
      {
        name: "Hobby",
        monthlyPrice: 0,
        seatBased: false,
        bestFor: ["coding"],
        features: ["Basic AI coding assistance"],
      },
      {
        name: "Pro",
        monthlyPrice: 20,
        seatBased: true,
        bestFor: ["coding"],
        features: ["Unlimited completions", "Advanced models"],
      },
      {
        name: "Business",
        monthlyPrice: 40,
        seatBased: true,
        bestFor: ["coding", "mixed"],
        features: ["Team management", "Privacy controls"],
      },
    ],
  },

  {
    tool: "ChatGPT",
    category: "General AI Assistant",
    officialUrl: "https://openai.com/chatgpt/pricing",
    plans: [
      {
        name: "Plus",
        monthlyPrice: 20,
        seatBased: true,
        bestFor: ["writing", "research", "mixed"],
        features: ["GPT-4 access"],
      },
      {
        name: "Team",
        monthlyPrice: 30,
        seatBased: true,
        bestFor: ["mixed", "research"],
        features: ["Workspace collaboration"],
      },
    ],
  },

  {
  tool: "Claude",
  category: "AI Assistant",
  officialUrl: "https://www.anthropic.com/pricing",
  plans: [
    {
      name: "Free",
      monthlyPrice: 0,
      seatBased: false,
      bestFor: ["writing", "research"],
      features: ["Basic Claude access"],
    },
    {
      name: "Pro",
      monthlyPrice: 20,
      seatBased: true,
      bestFor: ["writing", "research", "mixed"],
      features: ["Higher usage limits"],
    },
    {
      name: "Team",
      monthlyPrice: 30,
      seatBased: true,
      bestFor: ["mixed"],
      features: ["Collaboration features"],
    },
  ],
},

{
  tool: "GitHub Copilot",
  category: "Coding Assistant",
  officialUrl: "https://github.com/features/copilot",
  plans: [
    {
      name: "Individual",
      monthlyPrice: 10,
      seatBased: true,
      bestFor: ["coding"],
      features: ["AI code completion"],
    },
    {
      name: "Business",
      monthlyPrice: 19,
      seatBased: true,
      bestFor: ["coding", "mixed"],
      features: ["Organization management"],
    },
  ],
},

{
  tool: "Gemini",
  category: "AI Assistant",
  officialUrl: "https://gemini.google.com",
  plans: [
    {
      name: "Advanced",
      monthlyPrice: 20,
      seatBased: true,
      bestFor: ["research", "writing", "mixed"],
      features: ["Gemini Advanced access"],
    },
  ],
},

{
  tool: "OpenAI API",
  category: "API",
  officialUrl: "https://openai.com/api/pricing",
  plans: [
    {
      name: "Pay As You Go",
      monthlyPrice: 50,
      seatBased: false,
      bestFor: ["coding", "data", "mixed"],
      features: ["Token-based API usage"],
    },
  ],
},

{
  tool: "Anthropic API",
  category: "API",
  officialUrl: "https://www.anthropic.com/pricing#api",
  plans: [
    {
      name: "Pay As You Go",
      monthlyPrice: 50,
      seatBased: false,
      bestFor: ["research", "mixed"],
      features: ["Claude API access"],
    },
  ],
},

{
  tool: "v0",
  category: "AI UI Generator",
  officialUrl: "https://v0.dev",
  plans: [
    {
      name: "Premium",
      monthlyPrice: 20,
      seatBased: true,
      bestFor: ["coding", "mixed"],
      features: ["AI UI generation"],
    },
  ],
},
];