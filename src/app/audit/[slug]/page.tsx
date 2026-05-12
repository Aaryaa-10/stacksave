import { supabase } from "@/lib/saupabase";
import SavingsChart from "@/components/savings-chart";
import DownloadReportButton from "@/components/download-report-button";

type Props = {
    params: Promise<{
        slug: string;
    }>;
};

export default async function AuditPage({
    params,
}: Props) {
    const { slug } = await params;

    const { data: audit } = await supabase
        .from("audits")
        .select("*")
        .eq("public_slug", slug)
        .single();

    if (!audit) {
        return (
            <div className="p-10">
                Audit not found.
            </div>
        );
    }

    return (
        <main
            id="report-content"
            className="min-h-screen bg-white"
        >
            <div className="max-w-5xl mx-auto space-y-10">

              <div className="space-y-4">
                    <div className="inline-flex items-center rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-sm font-medium text-emerald-700">
                        AI Spend Optimization Report
                    </div>

                    <h1 className="text-6xl font-bold tracking-tight">
                        Your AI Spend Audit
                    </h1>

                    <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
                        We analyzed your AI tooling stack to identify
                        overspending, redundant subscriptions,
                        and optimization opportunities.
                    </p>

                    <DownloadReportButton />
                </div>

                {/* SAVINGS GRID */}

                <div className="grid md:grid-cols-2 gap-6">

                    <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
                        <p className="text-slate-500 mb-3">
                            Estimated Monthly Savings
                        </p>

                        <h2 className="text-5xl font-bold text-emerald-600">
                            ${audit.total_monthly_savings}
                        </h2>
                    </div>

                    <div className="rounded-3xl bg-white border border-slate-200 p-8 shadow-sm">
                        <p className="text-slate-500 mb-3">
                            Estimated Annual Savings
                        </p>

                        <h2 className="text-5xl font-bold text-blue-600">
                            ${audit.total_annual_savings}
                        </h2>
                    </div>

                </div>

                <SavingsChart
                    currentSpend={audit.total_monthly_spend}
                    optimizedSpend={
                        audit.total_monthly_spend -
                        audit.total_monthly_savings
                    }
                    savings={audit.total_monthly_savings}
                />

                {/* AI SUMMARY */}

                <div className="rounded-3xl bg-white border border-slate-200 p-10 shadow-sm space-y-5">
                    <div className="flex items-center justify-between">
                        <h2 className="text-3xl font-bold">
                            Executive Summary
                        </h2>

                        <div className="rounded-full bg-black text-white px-4 py-2 text-sm">
                            AI Generated
                        </div>
                    </div>

                    <p className="text-lg text-slate-700 leading-relaxed">
                        {audit.ai_summary}
                    </p>
                </div>

                {/* RECOMMENDATIONS */}

                <div className="space-y-6">

                    <div className="space-y-2">
                        <h2 className="text-3xl font-bold">
                            Optimization Recommendations
                        </h2>

                        <p className="text-slate-600">
                            Actionable opportunities identified during
                            your AI spend audit.
                        </p>
                    </div>

                    <div className="grid gap-6">

                        {audit.recommendations?.map(
                            (recommendation: any, index: number) => (
                                <div
                                    key={index}
                                    className="
            rounded-3xl
            bg-white
            border
            border-slate-200
            p-8
            shadow-sm
            space-y-6
          "
                                >

                                    <div className="flex items-start justify-between gap-6">

                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-bold">
                                                {recommendation.tool}
                                            </h3>

                                            <p className="text-slate-600 leading-relaxed">
                                                {recommendation.reason}
                                            </p>
                                        </div>

                                        <div className="
              rounded-2xl
              bg-emerald-50
              px-5
              py-4
              text-right
            ">
                                            <p className="text-sm text-emerald-700">
                                                Monthly Savings
                                            </p>

                                            <p className="text-3xl font-bold text-emerald-600">
                                                ${recommendation.monthlySavings}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="grid md:grid-cols-2 gap-4">

                                        <div className="rounded-2xl bg-slate-50 p-5">
                                            <p className="text-sm text-slate-500 mb-2">
                                                Current Plan
                                            </p>

                                            <p className="font-semibold text-lg">
                                                {recommendation.currentPlan}
                                            </p>
                                        </div>

                                        <div className="rounded-2xl bg-blue-50 p-5">
                                            <p className="text-sm text-blue-500 mb-2">
                                                Recommended Plan
                                            </p>

                                            <p className="font-semibold text-lg text-blue-700">
                                                {recommendation.recommendedPlan}
                                            </p>
                                        </div>

                                    </div>

                                </div>
                            )
                        )}

                    </div>

                </div>

            </div>
        </main>
    );
}