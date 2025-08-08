import { SummarySection } from "@/components/sections/summary-section";
import TransactionTable from "@/components/sections/transaction-table";

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <SummarySection />
      <TransactionTable />
    </div>
  );
}
