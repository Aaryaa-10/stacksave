export interface ToolUsageInput {
  tool: string;
  currentPlan: string;
  monthlySpend: number;
  seats: number;
  useCase: "coding" | "writing" | "research" | "data" | "mixed";
}

export interface AuditRecommendation {
  tool: string;
  currentPlan: string;
  recommendedPlan: string;
  monthlySavings: number;
  annualSavings: number;
  reason: string;
}

export interface AuditResult {
  recommendations: AuditRecommendation[];
  totalMonthlySavings: number;
  totalAnnualSavings: number;
}