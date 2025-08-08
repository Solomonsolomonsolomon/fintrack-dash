"use client";

import { useState, useEffect } from "react";
import { useTransactions } from "@/hooks/useTransactions";
import { EmptyState } from "@/components/ui/empty-state";
import { LoadingState } from "@/components/ui/loading-state";
import { useSearch } from "@/context/searchContext";
import { useToast } from "@/components/ui/toast-provider";
import { cn, formatAmount, formatDate } from "@/lib/utils";

type SortField = "date" | "remark" | "amount" | "type";
type SortDirection = "asc" | "desc";

export default function TransactionTable() {
  const [sortField, setSortField] = useState<SortField>("date");
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc");

  const { debouncedSearchTerm, isSearching, setIsSearching } = useSearch();
  const { showToast } = useToast();
  const { transactions, loading, error, refetch, setFilters } = useTransactions(
    {
      sortBy: sortField,
      sortOrder: sortDirection,
      search: debouncedSearchTerm,
    }
  );

  
  useEffect(() => {
    setFilters({ search: debouncedSearchTerm });
  }, [debouncedSearchTerm, setFilters]);


  useEffect(() => {
    if (debouncedSearchTerm && !loading && isSearching) {
      setIsSearching(false);
      if (transactions.length === 0) {
        showToast({
          type: "warning",
          title: "No results found",
          message: `No transactions found for "${debouncedSearchTerm}"`,
          duration: 4000,
        });
      } else {
        showToast({
          type: "success",
          title: "Search completed",
          message: `Found ${transactions.length} transaction${
            transactions.length === 1 ? "" : "s"
          } for "${debouncedSearchTerm}"`,
          duration: 3000,
        });
      }
    }
  }, [
    debouncedSearchTerm,
    loading,
    isSearching,
    transactions.length,
    setIsSearching,
    showToast,
  ]);

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
        <svg
          className="w-3 h-3 text-gray-400 transition-colors"
          viewBox="0 0 12 12"
          fill="currentColor"
        >
          <path d="M6 3l3 3H3l3-3zM6 9l3-3H3l3 3z" />
        </svg>
      );
    }
    return sortDirection === "asc" ? (
      <svg
        className="w-3 h-3 text-slate-600"
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M6 3l3 3H3l3-3z" />
      </svg>
    ) : (
      <svg
        className="w-3 h-3 text-slate-600"
        viewBox="0 0 12 12"
        fill="currentColor"
      >
        <path d="M6 9l3-3H3l3 3z" />
      </svg>
    );
  };


  if (loading || isSearching) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <LoadingState
          message={
            isSearching
              ? "Searching transactions..."
              : "Loading transactions..."
          }
        />
      </div>
    );
  }


  if (error) {
    return (
      <div className="bg-white rounded-xl shadow-sm border border-gray-100">
        <div className="p-6 text-center">
          <div className="w-12 h-12 mx-auto mb-4 bg-red-50 rounded-full flex items-center justify-center">
            <svg
              className="w-6 h-6 text-red-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-900 mb-2">
            Something went wrong
          </h3>
          <p className="text-gray-600 mb-4">{error}</p>
          <button
            onClick={refetch}
            className="px-4 py-2 bg-[#4B8B9F] text-white rounded-lg hover:bg-[#3d7489] transition-colors duration-200 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }


  if (transactions.length === 0) {
    const isSearchEmpty = debouncedSearchTerm && !loading;

    return (
      <div className="bg-inherit">
        <EmptyState
          title={isSearchEmpty ? "No results found" : "No transactions found"}
          description={
            isSearchEmpty
              ? `Oops! No data found for "${debouncedSearchTerm}". Try adjusting your search.`
              : "Get started by adding your first transaction."
          }
          variant="transactions"
          action={
            isSearchEmpty
              ? {
                  label: "Clear search",
                  onClick: () => {
                  
                  },
                }
              : {
                  label: "Add Transaction",
                  onClick: () => {
                    console.log("Add transaction");
                  },
                }
          }
        />
      </div>
    );
  }

  return (
    <div className="bg-white ">

      <div className="hidden md:block">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className=" border-b border-gray-200">
              <tr>
                <th
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors duration-200 group"
                  onClick={() => handleSort("date")}
                >
                  <div className="flex items-center gap-2">
                    Date
                    <div className="group-hover:text-gray-600 transition-colors">
                      {getSortIcon("date")}
                    </div>
                  </div>
                </th>
                <th
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors duration-200 group"
                  onClick={() => handleSort("remark")}
                >
                  <div className="flex items-center gap-2">
                    Description
                    <div className="group-hover:text-gray-600 transition-colors">
                      {getSortIcon("remark")}
                    </div>
                  </div>
                </th>
                <th
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors duration-200 group"
                  onClick={() => handleSort("amount")}
                >
                  <div className="flex items-center gap-2">
                    Amount
                    <div className="group-hover:text-gray-600 transition-colors">
                      {getSortIcon("amount")}
                    </div>
                  </div>
                </th>
                <th
                  className="py-4 px-6 text-left font-semibold text-gray-700 cursor-pointer hover:bg-gray-100/80 transition-colors duration-200 group"
                  onClick={() => handleSort("type")}
                >
                  <div className="flex items-center gap-2">
                    Type
                    <div className="group-hover:text-gray-600 transition-colors">
                      {getSortIcon("type")}
                    </div>
                  </div>
                </th>
                <th className="py-4 px-6 text-left font-semibold text-gray-700">
                  Currency
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {transactions.map((transaction, index) => (
                <tr
                  key={transaction.id}
                  className={cn(
                    "hover:bg-gray-50/50 transition-colors duration-200",
                    index % 2 === 0 ? "bg-white" : "bg-gray-50/30"
                  )}
                >
                  <td className="py-4 px-6 text-gray-700 font-medium">
                    {formatDate(transaction.date)}
                  </td>
                  <td className="py-4 px-6 text-gray-900 font-medium">
                    <div className="max-w-xs truncate">
                      {transaction.remark}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div
                      className={cn(
                        "font-bold text-sm px-2 py-1 rounded-md inline-flex items-center",
                        transaction.amount >= 0
                          ? "text-emerald-700 bg-emerald-50"
                          : "text-red-700 bg-red-50"
                      )}
                    >
                      {transaction.amount >= 0 ? "+" : "-"}
                      {formatAmount(Math.abs(transaction.amount))}
                    </div>
                  </td>
                  <td className="py-4 px-6">
                    <div className="flex items-center">
                      <div
                        className={cn(
                          "w-2.5 h-2.5 rounded-full mr-3",
                          transaction.type === "credit"
                            ? "bg-emerald-500"
                            : "bg-red-500"
                        )}
                      />
                      <span className="capitalize text-gray-700 font-medium text-sm">
                        {transaction.type}
                      </span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-gray-600 font-medium text-sm">
                    {transaction.currency}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="md:hidden">

        <div className="bg-gray-50/80 border-b border-gray-200 p-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-semibold text-gray-700">
              Sort by:
            </span>
            <div className="flex gap-2">
              <select
                value={sortField}
                onChange={(e) => {
                  const field = e.target.value as SortField;
                  setSortField(field);
                  setFilters({ sortBy: field, sortOrder: sortDirection });
                }}
                className="text-xs px-2 py-1 border border-gray-300 rounded-md bg-white text-gray-700 font-medium"
              >
                <option value="date">Date</option>
                <option value="remark">Description</option>
                <option value="amount">Amount</option>
                <option value="type">Type</option>
              </select>
              <button
                onClick={() => {
                  const newDirection = sortDirection === "asc" ? "desc" : "asc";
                  setSortDirection(newDirection);
                  setFilters({ sortBy: sortField, sortOrder: newDirection });
                }}
                className="p-1 border border-gray-300 rounded-md bg-white hover:bg-gray-50 transition-colors"
              >
                {sortDirection === "asc" ? (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 3l3 3H3l3-3z" />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-gray-600"
                    viewBox="0 0 12 12"
                    fill="currentColor"
                  >
                    <path d="M6 9l3-3H3l3 3z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </div>


        <div className="divide-y divide-gray-100">
          {transactions.map((transaction) => (
            <div
              key={transaction.id}
              className="p-4 hover:bg-gray-50/50 transition-colors duration-200 active:bg-gray-100/50"
            >
              <div className="space-y-3">
               
                <div className="flex items-start justify-between">
                  <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-gray-900 truncate text-sm">
                      {transaction.remark}
                    </h3>
                    <p className="text-xs text-gray-500 mt-1">
                      {formatDate(transaction.date)}
                    </p>
                  </div>
                  <div
                    className={cn(
                      "font-bold text-sm px-3 py-1.5 rounded-lg ml-3 flex-shrink-0",
                      transaction.amount >= 0
                        ? "text-emerald-700 bg-emerald-50 border border-emerald-200"
                        : "text-red-700 bg-red-50 border border-red-200"
                    )}
                  >
                    {transaction.amount >= 0 ? "+" : "-"}
                    {formatAmount(Math.abs(transaction.amount))}
                  </div>
                </div>


                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <div
                      className={cn(
                        "w-2 h-2 rounded-full mr-2",
                        transaction.type === "credit"
                          ? "bg-emerald-500"
                          : "bg-red-500"
                      )}
                    />
                    <span className="capitalize text-gray-600 font-medium text-xs">
                      {transaction.type}
                    </span>
                  </div>
                  <span className="text-xs text-gray-500 font-medium bg-gray-100 px-2 py-1 rounded">
                    {transaction.currency}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
