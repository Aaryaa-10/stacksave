import { pricingData } from "@/data/pricing";
import {
  AuditRecommendation,
  AuditResult,
  ToolUsageInput,
} from "@/types/audit";

export function runAudit(
  tools: ToolUsageInput[]
): AuditResult {
  const recommendations: AuditRecommendation[] = [];

  for (const toolInput of tools) {
    const toolData = pricingData.find(
      (tool) => tool.tool === toolInput.tool
    );

    if (!toolData) continue;

    const currentPlanData = toolData.plans.find(
      (plan) => plan.name === toolInput.currentPlan
    );

    if (!currentPlanData) continue;

    let recommendedPlan = currentPlanData.name;
    let monthlySavings = 0;
    let reason = "Your current setup looks efficient.";

    

    if (
      toolInput.seats <= 2 &&
      currentPlanData.name.toLowerCase().includes("team")
    ) {
      const cheaperPlan = toolData.plans[0];

      recommendedPlan = cheaperPlan.name;

      monthlySavings =
        (currentPlanData.monthlyPrice -
          cheaperPlan.monthlyPrice) *
        toolInput.seats;

      reason =
        "Your team size is small enough that collaborative team features may not justify the higher pricing tier.";
    }

    recommendations.push({
      tool: toolInput.tool,
      currentPlan: toolInput.currentPlan,
      recommendedPlan,
      monthlySavings,
      annualSavings: monthlySavings * 12,
      reason,
    });
  }

  

  const uniqueGeneralAiTools = [
  ...new Set(
    tools
      .filter((tool) =>
        ["ChatGPT", "Claude", "Gemini"].includes(
          tool.tool
        )
      )
      .map((tool) => tool.tool)
  ),
];

if (uniqueGeneralAiTools.length >= 2) {
  recommendations.push({
    tool: "AI Stack",
    currentPlan: "Multiple subscriptions",
    recommendedPlan:
      "Consolidate overlapping tools",
    monthlySavings: 20,
    annualSavings: 240,
    reason:
      "You are paying for multiple general-purpose AI assistants with overlapping capabilities. Consolidating tools may reduce unnecessary spend.",
  });
}


const apiTools = tools.filter(
  (tool) =>
    tool.tool === "OpenAI API" ||
    tool.tool === "Anthropic API"
);

const totalApiSpend = apiTools.reduce(
  (sum, tool) => sum + tool.monthlySpend,
  0
);

if (totalApiSpend >= 200) {
  recommendations.push({
    tool: "API Infrastructure",
    currentPlan: "Direct API billing",
    recommendedPlan:
      "Explore infrastructure credits",
    monthlySavings: Math.round(
      totalApiSpend * 0.2
    ),
    annualSavings:
      Math.round(totalApiSpend * 0.2) * 12,
    reason:
      "Your API spending is high enough that infrastructure credits or negotiated enterprise pricing could meaningfully reduce monthly costs.",
  });
}

const totalMonthlySavings = recommendations.reduce(
    (sum, rec) => sum + rec.monthlySavings,
    0
  );

  const codingTools = tools.filter((tool) =>
  ["Cursor", "GitHub Copilot"].includes(
    tool.tool
  )
);

const uniqueCodingTools = [
  ...new Set(
    codingTools.map((tool) => tool.tool)
  ),
];

if (uniqueCodingTools.length >= 2) {
  recommendations.push({
    tool: "Coding Stack",
    currentPlan: "Multiple coding assistants",
    recommendedPlan:
      "Consolidate development tooling",
    monthlySavings: 15,
    annualSavings: 180,
    reason:
      "Your engineering stack includes overlapping AI coding assistants that may provide redundant functionality.",
  });
}

  return {
    recommendations,
    totalMonthlySavings,
    totalAnnualSavings: totalMonthlySavings * 12,
  };
}