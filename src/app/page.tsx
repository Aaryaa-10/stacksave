import AuditForm from "@/components/ui/audit-form";

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-b from-slate-50 to-white">

      <section className="max-w-6xl mx-auto px-6 py-20">

        {/* HERO */}

        <div className="max-w-4xl space-y-6 mb-16">

          <div className="inline-flex items-center rounded-full border border-slate-200 bg-white px-4 py-2 text-sm font-medium shadow-sm">
            AI Spend Optimization Platform
          </div>

          <h1 className="text-6xl font-bold tracking-tight leading-tight">
            Audit and Optimize
            <span className="block text-blue-600">
              Your AI Spending
            </span>
          </h1>

          <p className="text-xl text-slate-600 leading-relaxed max-w-3xl">
            StackSave analyzes your AI tooling stack,
            detects redundant subscriptions,
            identifies optimization opportunities,
            and estimates potential savings.
          </p>

        </div>

        {/* FORM */}

        <div className="max-w-4xl">
          <AuditForm />
        </div>

      </section>

    </main>
  );
}