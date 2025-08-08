import { SummaryCard } from "@/components/ui/summary-card";

export function SummarySection() {
  return (
    <div className="pt-3">
      <p className="text-3xl mb-10">Summary</p>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <SummaryCard
          title="Total Balance"
          value="$12,345"
          change="+5%"
          isPositive
        />
        <SummaryCard
          title="Total Credits"
          value="$7,890"
          change="+3%"
          isPositive
        />
        <SummaryCard
          title="Total Debits"
          value="$4,455"
          change="-2%"
          isPositive={false}
        />
        <SummaryCard
          title="Transactions"
          value={150}
          change="+10%"
          isPositive
        />
      </section>
    </div>
  );
}
