"use client";

import { useState } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { cn, formatAmount,formatDate } from "@/lib/utils";

type SortField = "date" | "remark" | "amount" | "type";
type SortDirection = "asc" | "desc";

export default function TransactionTable() {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const {
    transactions,
    loading,
    error,
    refetch,
    setFilters,
  } = useTransactions({
    sortBy: sortField,
    sortOrder: sortDirection,
  });

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      const newDirection = sortDirection === "asc" ? "desc" : "asc";
      setSortDirection(newDirection);
      setFilters({ sortBy: field, sortOrder: newDirection });
    } else {
      setSortField(field);
      setSortDirection("asc");
      setFilters({ sortBy: field, sortOrder: "asc" });
    }
  };

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg className="w-3 h-3 text-gray-400" viewBox="0 0 12 12" fill="currentColor">
          <path d="M6 3l3 3H3l3-3zM6 9l3-3H3l3 3z" />
        </svg>
      );
    }
    return sortDirection === "asc" ? (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 3l3 3H3l3-3z" />
      </svg>
    ) : (
      <svg className="w-3 h-3" viewBox="0 0 12 12" fill="currentColor">
        <path d="M6 9l3-3H3l3 3z" />
      </svg>
    );
  };


  if (loading) {
    return (
      <div className="bg-white rounded-lg shadow-sm  border-gray-200">
        <LoadingState message="Loading transactions..." />
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-white rounded-lg shadow-sm border border-gray-200">
        <div className="p-6 text-center">
          <p className="text-red-600 mb-4">{error}</p>
          <button 
            onClick={refetch}
            className="px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (transactions.length === 0) {
    return (
      <div className="bg-inherit">
        <EmptyState
          title="No transactions found"
          description="Get started by adding your first transaction."
          variant="transactions"
          action={{
            label: "Add Transaction",
            onClick: () => {
              console.log("Add transaction");
            },
          }}
        />
      </div>
    );
  }

  return (
    <div className="bg-white  overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="">
            <tr>
              <th
                className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-2">
                  Date {getSortIcon("date")}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("remark")}
              >
                <div className="flex items-center gap-2">
                  Remark {getSortIcon("remark")}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-2">
                  Amount {getSortIcon("amount")}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left font-medium text-gray-700 cursor-pointer hover:bg-gray-100 transition-colors"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center gap-2">
                  Type {getSortIcon("type")}
                </div>
              </th>
              <th className="py-3 px-4 text-left font-medium text-gray-700">
                Currency
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {transactions.map((transaction) => (
              <tr key={transaction.id} className="hover:bg-gray-50 transition-colors">
                <td className="py-3 px-4 text-gray-700">
                  {formatDate(transaction.date)}
                </td>
                <td className="py-3 px-4 text-gray-900">
                  {transaction.remark}
                </td>
                <td
                  className={cn(
                    "py-3 px-4 font-medium",
                    transaction.amount >= 0 ? "text-green-600" : "text-red-600"
                  )}
                >
                  {transaction.amount >= 0 ? "+" : "-"}
                  {formatAmount(transaction.amount)}
                </td>
                <td className="py-3 px-4">
                  <div className="flex items-center">
                    <span
                      className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        transaction.type === "credit"
                          ? "bg-green-500"
                          : "bg-red-500"
                      )}
                    />
                    <span className="capitalize text-gray-700">
                      {transaction.type}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-4 text-gray-700">
                  {transaction.currency}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
