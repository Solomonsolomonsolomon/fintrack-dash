import { SummaryCard } from "@/components/ui/summary-card";
import { DashboardSummary } from "@/@types";

const data: DashboardSummary = {
  totalBalance: 12345,
  totalCredits: 7890,
  totalDebits: 4455,
  transactionCount: 150,
  balanceChange: 5,
  creditsChange: 3,
  debitsChange: -2,
  transactionChange: 10,
};

export function SummarySection() {
  return (
    <div className="pt-3">
      <p className="text-3xl mb-10 font-semibold">Summary</p>
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
        <SummaryCard
          title="Total Balance"
          value={`$${data.totalBalance.toLocaleString()}`}
          change={`${data.balanceChange}%`}
          isPositive={data.balanceChange >= 0}
        />
        <SummaryCard
          title="Total Credits"
          value={`$${data.totalCredits.toLocaleString()}`}
          change={`${data.creditsChange}%`}
          isPositive={data.creditsChange >= 0}
        />
        <SummaryCard
          title="Total Debits"
          value={`$${data.totalDebits.toLocaleString()}`}
          change={`${data.debitsChange}%`}
          isPositive={data.debitsChange >= 0}
        />
        <SummaryCard
          title="Transactions"
          value={data.transactionCount.toLocaleString()}
          change={`${data.transactionChange}%`}
          isPositive={data.transactionChange >= 0}
        />
      </section>
    </div>
  );
}
