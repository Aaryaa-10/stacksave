"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Cell,
  ResponsiveContainer,
} from "recharts";

type Props = {
  currentSpend: number;
  optimizedSpend: number;
  savings: number;
};

export default function SavingsChart({
  currentSpend,
  optimizedSpend,
  savings,
}: Props) {
  const data = [
    {
      name: "Current",
      value: currentSpend,
    },
    {
      name: "Optimized",
      value: optimizedSpend,
    },
    {
      name: "Savings",
      value: savings,
    },
  ];

  return (
    <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
      <div className="space-y-2 mb-8">
        <h2 className="text-3xl font-bold">
          Spend Breakdown
        </h2>

        <p className="text-slate-600">
          Comparison of current vs optimized
          AI operational spending.
        </p>
      </div>

      <div className="h-[350px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <XAxis dataKey="name" />

            <YAxis />

            <Tooltip />

            <Bar
  dataKey="value"
  radius={[12, 12, 0, 0]}
>
  {data.map((entry, index) => {
    const colors = [
      "#0f172a", // slate
      "#2563eb", // blue
      "#16a34a", // emerald
    ];

    return (
      <Cell
        key={`cell-${index}`}
        fill={colors[index]}
      />
    );
  })}
</Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}