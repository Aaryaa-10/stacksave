import { ToolUsageInput } from "@/types/audit";

export const mockAuditInput: ToolUsageInput[] = [
  {
    tool: "ChatGPT",
    currentPlan: "Team",
    monthlySpend: 90,
    seats: 3,
    useCase: "writing",
  },
];