"use client";

import { useState, useMemo } from "react";
import { sampleTransactions } from "@/data/transactionData";

type SortField = "date" | "remark" | "amount" | "type";
type SortDirection = "asc" | "desc";

function cn(...classes: (string | boolean | undefined)[]): string {
  return classes.filter(Boolean).join(" ");
}

export default function TransactionTable() {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");
  const [filterType, setFilterType] = useState<"all" | "credit" | "debit">(
    "all"
  );

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredTransactions = useMemo(() => {
    return filterType === "all"
      ? sampleTransactions
      : sampleTransactions.filter((t) => t.type === filterType);
  }, [filterType]);

  const sortedTransactions = useMemo(() => {
    return [...filteredTransactions].sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      if (sortField === "date") {
        aValue = new Date(aValue).getTime();
        bValue = new Date(bValue).getTime();
      }

      if (sortField === "amount") {
        aValue = Math.abs(aValue);
        bValue = Math.abs(bValue);
      }

      if (aValue < bValue) return sortDirection === "asc" ? -1 : 1;
      if (aValue > bValue) return sortDirection === "asc" ? 1 : -1;
      return 0;
    });
  }, [filteredTransactions, sortField, sortDirection]);

  const getSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return (
        <svg
          className="w-3 h-3 text-gray-400"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
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

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format(Math.abs(amount));
  };

  return (
    <div className="p-4 sm:p-6 bg-white">
  
      <div className="flex flex-wrap items-center gap-2 mb-6 text-sm">
        {["all", "credit", "debit"].map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type as any)}
            className={cn(
              "px-3 py-1 rounded-md transition-colors",
              filterType === type
                ? type === "credit"
                  ? "bg-green-100 text-green-700 font-semibold"
                  : type === "debit"
                  ? "bg-red-100 text-red-700 font-semibold"
                  : "bg-blue-100 text-blue-700 font-semibold"
                : "text-gray-600 hover:bg-gray-100"
            )}
          >
            {type.charAt(0).toUpperCase() + type.slice(1)}
          </button>
        ))}
      </div>


      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr>
              {["date", "remark", "amount", "type"].map((field) => (
                <th
                  key={field}
                  className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200"
                  onClick={() => handleSort(field as SortField)}
                >
                  <div className="flex items-center gap-2 capitalize">
                    {field} {getSortIcon(field as SortField)}
                  </div>
                </th>
              ))}
              <th className="py-3 px-4 text-left font-medium text-gray-600 border-b border-gray-200">
                Currency
              </th>
            </tr>
          </thead>
          <tbody>
            {sortedTransactions.map((transaction, index) => (
              <tr
                key={transaction.id}
                className={cn(
                  "hover:bg-gray-50 transition-colors",
                  index !== sortedTransactions.length - 1 &&
                    "border-b border-gray-100"
                )}
              >
                <td className="py-3 px-4 text-gray-700">{transaction.date}</td>
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


      <div className="md:hidden space-y-4">
        {sortedTransactions.map((t) => (
          <div
            key={t.id}
            className="p-4 border border-gray-200 rounded-lg shadow-sm bg-white"
          >
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm text-gray-500">{t.date}</span>
              <span
                className={cn(
                  "text-sm font-medium",
                  t.amount >= 0 ? "text-green-600" : "text-red-600"
                )}
              >
                {t.amount >= 0 ? "+" : "-"}
                {formatAmount(t.amount)}
              </span>
            </div>
            <p className="text-gray-900 font-medium">{t.remark}</p>
            <div className="flex justify-between items-center mt-2 text-sm">
              <div className="flex items-center">
                <span
                  className={cn(
                    "w-2 h-2 rounded-full mr-2",
                    t.type === "credit" ? "bg-green-500" : "bg-red-500"
                  )}
                />
                <span className="capitalize text-gray-700">{t.type}</span>
              </div>
              <span className="text-gray-500">{t.currency}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
