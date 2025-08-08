import TransactionTable  from "@/components/sections/transaction-table";

export default function TransactionsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Transactions</h1>
        <p className="text-gray-600">
          View and manage all your financial transactions in one place.
        </p>
      </div>
      <TransactionTable />
    </div>
  );
}