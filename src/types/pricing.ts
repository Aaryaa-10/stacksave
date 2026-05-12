export type UseCase =
  | "coding"
  | "writing"
  | "research"
  | "data"
  | "mixed";

export interface ToolPlan {
  name: string;
  monthlyPrice: number;
  seatBased: boolean;
  bestFor: UseCase[];
  features: string[];
}

export interface ToolPricing {
  tool: string;
  category: string;
  plans: ToolPlan[];
  officialUrl: string;
}