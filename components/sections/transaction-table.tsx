"use client";

import { useState, useMemo } from "react";
import { Transaction } from "@/@types";


const sampleTransactions: Transaction[] = [
  {
    id: "1",
    date: "2023-10-01",
    remark: "Salary",
    amount: 3000,
    currency: "USD",
    type: "credit",
  },
  {
    id: "2",
    date: "2023-10-02",
    remark: "Groceries",
    amount: -150,
    currency: "USD",
    type: "debit",
  },
  {
    id: "3",
    date: "2023-10-03",
    remark: "Gym Membership",
    amount: -50,
    currency: "USD",
    type: "debit",
  },
  {
    id: "4",
    date: "2023-10-04",
    remark: "Dinner",
    amount: -40,
    currency: "USD",
    type: "debit",
  },
  {
    id: "5",
    date: "2023-10-05",
    remark: "Movie Tickets",
    amount: -30,
    currency: "USD",
    type: "debit",
  },
  {
    id: "6",
    date: "2023-10-06",
    remark: "Rent",
    amount: -1200,
    currency: "USD",
    type: "debit",
  },
  {
    id: "7",
    date: "2023-10-07",
    remark: "Utilities",
    amount: -100,
    currency: "USD",
    type: "debit",
  },
  {
    id: "8",
    date: "2023-10-08",
    remark: "Car Payment",
    amount: -400,
    currency: "USD",
    type: "debit",
  },
  {
    id: "9",
    date: "2023-10-09",
    remark: "Insurance",
    amount: -200,
    currency: "USD",
    type: "debit",
  },
];

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
    <div className="p-6 bg-white">
      {/* Filter Buttons */}
      <div className="flex items-center gap-4 mb-6 text-sm">
        <button
          onClick={() => setFilterType("all")}
          className={cn(
            "px-3 py-1 rounded-md transition-colors",
            filterType === "all"
              ? "bg-blue-100 text-blue-700 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          All
        </button>
        <button
          onClick={() => setFilterType("credit")}
          className={cn(
            "px-3 py-1 rounded-md transition-colors",
            filterType === "credit"
              ? "bg-green-100 text-green-700 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          Credit
        </button>
        <button
          onClick={() => setFilterType("debit")}
          className={cn(
            "px-3 py-1 rounded-md transition-colors",
            filterType === "debit"
              ? "bg-red-100 text-red-700 font-semibold"
              : "text-gray-600 hover:bg-gray-100"
          )}
        >
          Debit
        </button>
      </div>

      {/* Transaction Table */}
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="">
            <tr>
              <th
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => handleSort("date")}
              >
                <div className="flex items-center gap-2">
                  Date {getSortIcon("date")}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => handleSort("remark")}
              >
                <div className="flex items-center gap-2">
                  Remark {getSortIcon("remark")}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => handleSort("amount")}
              >
                <div className="flex items-center gap-2">
                  Amount {getSortIcon("amount")}
                </div>
              </th>
              <th
                className="py-3 px-4 text-left font-medium text-gray-600 cursor-pointer hover:bg-gray-100 transition-colors border-b border-gray-200"
                onClick={() => handleSort("type")}
              >
                <div className="flex items-center gap-2">
                  Type {getSortIcon("type")}
                </div>
              </th>
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
    </div>
  );
}
