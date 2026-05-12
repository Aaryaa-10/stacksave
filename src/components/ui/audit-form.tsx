"use client";
import { useEffect, useState } from "react";
import { pricingData } from "@/data/pricing";
import { AuditResult, ToolUsageInput } from "@/types/audit";
import { Button } from "@/components/ui/button";
import { runAudit } from "@/lib/audit-engine";
import { styles } from "@/lib/styles";

import { supabase } from "@/lib/saupabase";
import { v4 as uuidv4 } from "uuid";




export default function AuditForm() {

  const defaultTools: ToolUsageInput[] = [
    {
      tool: "ChatGPT",
      currentPlan: "Plus",
      monthlySpend: 20,
      seats: 1,
      useCase: "writing",
    },
  ];

  const [tools, setTools] =
    useState<ToolUsageInput[]>(defaultTools);

  const [auditResult, setAuditResult] =
    useState<AuditResult | null>(null);

  const [loading, setLoading] =
    useState(false);

  const [copied, setCopied] =
    useState(false);

  const [reportSlug, setReportSlug] =
    useState("");

  useEffect(() => {
    const savedTools =
      localStorage.getItem("audit-tools");

    if (savedTools) {
      setTools(JSON.parse(savedTools));
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "audit-tools",
      JSON.stringify(tools)
    );
  }, [tools]);

  function updateTool(
    index: number,
    field: keyof ToolUsageInput,
    value: string | number
  ) {
    const updatedTools = [...tools];

    updatedTools[index] = {
      ...updatedTools[index],
      [field]: value,
    };

    setTools(updatedTools);
  }



  async function handleRunAudit() {
    setLoading(true);
    const result = runAudit(tools);

    const summaryResponse = await fetch(
      "/api/generate-summary",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          tools,
          recommendations:
            result.recommendations,
        }),
      }
    );

    const summaryData =
      await summaryResponse.json();

    const aiSummary =
      summaryData.summary ||
      "Failed to generate summary.";

    setAuditResult(result);
    const publicSlug = uuidv4();

    setReportSlug(publicSlug);

    const { error } = await supabase
      .from("audits")
      .insert({

        public_slug: publicSlug,
        tools,
        recommendations: result.recommendations,
        total_monthly_spend: tools.reduce(
          (sum, tool) => sum + tool.monthlySpend,
          0
        ),
        total_monthly_savings:
          result.totalMonthlySavings,
        total_annual_savings:
          result.totalAnnualSavings,
        ai_summary: aiSummary,
      });

    if (error) {
      console.error(error);
    }

    console.log(result);
    setLoading(false);

  }

  function addTool() {
    setTools([
      ...tools,
      {
        tool: "ChatGPT",
        currentPlan: "Plus",
        monthlySpend: 20,
        seats: 1,
        useCase: "writing",
      },
    ]);
  }

  function removeTool(index: number) {
    const updatedTools = tools.filter(
      (_, i) => i !== index
    );

    setTools(updatedTools);
  }

  async function copyReportLink() {
    const url = `${window.location.origin}/audit/${reportSlug}`;

    await navigator.clipboard.writeText(url);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <div className="space-y-6">

      {tools.map((tool, index) => {
        const selectedTool = pricingData.find(
          (item) => item.tool === tool.tool
        );

        return (
          <div
            key={index}
            className={styles.card}
          >

            <div className="flex justify-between items-center">
              <h2 className="font-semibold text-lg">
                AI Tool #{index + 1}
              </h2>

              {tools.length > 1 && (
                <Button
                  variant="destructive"
                  size="sm"
                  onClick={() => removeTool(index)}
                >
                  Remove
                </Button>
              )}
            </div>



            <div>
              <label className={styles.label}>
                Tool
              </label>

              <select
                className={styles.input}
                value={tool.tool}
                onChange={(e) => {
                  const selectedToolName = e.target.value;

                  const selectedToolData = pricingData.find(
                    (item) => item.tool === selectedToolName
                  );

                  const firstPlan =
                    selectedToolData?.plans[0]?.name || "";

                  const updatedTools = [...tools];

                  updatedTools[index] = {
                    ...updatedTools[index],
                    tool: selectedToolName,
                    currentPlan: firstPlan,
                  };

                  setTools(updatedTools);
                }}
              >
                {pricingData.map((item) => (
                  <option
                    key={item.tool}
                    value={item.tool}
                  >
                    {item.tool}
                  </option>
                ))}
              </select>
            </div>



            <div>
              <label className={styles.label}>
                Plan
              </label>

              <select
                className={styles.input}

                value={tool.currentPlan}
                onChange={(e) =>
                  updateTool(
                    index,
                    "currentPlan",
                    e.target.value
                  )
                }
              >
                {selectedTool?.plans.map((plan) => (
                  <option
                    key={plan.name}
                    value={plan.name}
                  >
                    {plan.name}
                  </option>
                ))}
              </select>
            </div>



            <div>
              <label className={styles.label}>
                Monthly Spend
              </label>

              <input
                type="number"
                className={styles.input}
                value={tool.monthlySpend}
                onChange={(e) =>
                  updateTool(
                    index,
                    "monthlySpend",
                    Number(e.target.value)
                  )
                }
              />
            </div>


            <div>
              <label className={styles.label}>
                Seats
              </label>

              <input
                type="number"
                className={styles.input}
                value={tool.seats}
                onChange={(e) =>
                  updateTool(
                    index,
                    "seats",
                    Number(e.target.value)
                  )
                }
              />
            </div>



            <div>
              <label className={styles.label}>
                Use Case
              </label>

              <select
                className={styles.input}
                value={tool.useCase}
                onChange={(e) =>
                  updateTool(
                    index,
                    "useCase",
                    e.target.value as ToolUsageInput["useCase"]
                  )
                }
              >
                <option value="coding">
                  Coding
                </option>

                <option value="writing">
                  Writing
                </option>

                <option value="research">
                  Research
                </option>

                <option value="data">
                  Data
                </option>

                <option value="mixed">
                  Mixed
                </option>
              </select>
            </div>

          </div>
        );
      })}

      <Button
        variant="outline"
        className={styles.secondaryButton}
        onClick={addTool}
      >
        + Add Another Tool
      </Button>

      <Button
        className={styles.primaryButton}
        onClick={handleRunAudit}
        disabled={loading}
      >
        {loading
          ? "Generating AI Audit..."
          : "Run AI Spend Audit"}
      </Button>

      {auditResult && (
        <div className={styles.card}>


          <h2 className="text-2xl font-bold">
            Audit Results
          </h2>



          <p>
            Total Monthly Savings: $
            {auditResult.totalMonthlySavings}
          </p>

          <p>
            Total Annual Savings: $
            {auditResult.totalAnnualSavings}
          </p>

          <div className="space-y-4">
            {auditResult.recommendations.map(
              (recommendation, index) => (
                <div
                  key={index}
                  className={styles.resultCard}
                >
                  <h3 className={styles.resultTitle}>
                    {recommendation.tool}
                  </h3>

                  <p>
                    Current Plan:{" "}
                    {recommendation.currentPlan}
                  </p>

                  <p>
                    Recommended Plan:{" "}
                    {recommendation.recommendedPlan}
                  </p>

                  <div>
                    <p className={styles.mutedText}>
                      Monthly Savings
                    </p>

                    <p className={styles.savingsText}>
                      ${recommendation.monthlySavings}
                    </p>
                  </div>

                  <p>
                    Reason: {recommendation.reason}
                  </p>
                </div>
              )
            )}
          </div>
        </div>
      )}

      {reportSlug && (
        <a
          href={`/audit/${reportSlug}`}
          target="_blank"
          className="
      block
      text-center
      bg-black
      text-white
      rounded-2xl
      px-6
      py-4
      font-semibold
      hover:opacity-90
      transition
    "
        >
          View Full Report
        </a>
      )}

      {reportSlug && (
        <Button
          variant="outline"
          className={styles.secondaryButton}
          onClick={copyReportLink}
        >
          {copied
            ? "Link Copied!"
            : "Copy Share Link"}
        </Button>
      )}
    </div>
  );
}