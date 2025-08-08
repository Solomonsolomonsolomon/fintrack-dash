import { useState, useEffect, useCallback } from "react";
import { transactionApi, PaginatedResponse } from "@/lib/api";
import {
  Transaction,
  UseTransactionsOptions,
  UseTransactionsReturn,
} from "@/@types";

export function useTransactions(
  options: UseTransactionsOptions = {}
): UseTransactionsReturn {
  const {
    page = 1,
    limit = 10,
    type = "all",
    search = "",
    sortBy = "date",
    sortOrder = "desc",
    autoFetch = true,
  } = options;

  const [transactions, setTransactions] = useState<Transaction[]>([]);
  const [pagination, setPagination] = useState<
    PaginatedResponse<Transaction>["pagination"] | null
  >(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    page,
    limit,
    type,
    search,
    sortBy,
    sortOrder,
  });

  const fetchTransactions = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await transactionApi.getAll(filters);

      setTransactions(response.data);
      setPagination(response.pagination);
    } catch (err) {
      console.error("Error fetching transactions:", err);
      setError(
        err instanceof Error ? err.message : "Failed to fetch transactions"
      );
    } finally {
      setLoading(false);
    }
  }, [filters]);

  const createTransaction = useCallback(
    async (transaction: Omit<Transaction, "id">) => {
      try {
        setLoading(true);
        setError(null);

        await transactionApi.create(transaction);

        await fetchTransactions();
      } catch (err) {
        console.error("Error creating transaction:", err);
        setError(
          err instanceof Error ? err.message : "Failed to create transaction"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchTransactions]
  );

  const updateTransaction = useCallback(
    async (id: string, transaction: Partial<Transaction>) => {
      try {
        setLoading(true);
        setError(null);

        await transactionApi.update(id, transaction);

        await fetchTransactions();
      } catch (err) {
        console.error("Error updating transaction:", err);
        setError(
          err instanceof Error ? err.message : "Failed to update transaction"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchTransactions]
  );

  const deleteTransaction = useCallback(
    async (id: string) => {
      try {
        setLoading(true);
        setError(null);
        await transactionApi.delete(id);
        await fetchTransactions();
      } catch (err) {
        console.error("Error deleting transaction:", err);
        setError(
          err instanceof Error ? err.message : "Failed to delete transaction"
        );
        throw err;
      } finally {
        setLoading(false);
      }
    },
    [fetchTransactions]
  );

  const updateFilters = useCallback(
    (newFilters: Partial<UseTransactionsOptions>) => {
      setFilters((prev) => ({
        ...prev,
        ...newFilters,

        page: newFilters.page ?? 1,
      }));
    },
    []
  );

  useEffect(() => {
    if (autoFetch) {
      fetchTransactions();
    }
  }, [filters, autoFetch, fetchTransactions]);

  return {
    transactions,
    pagination,
    loading,
    error,
    refetch: fetchTransactions,
    createTransaction,
    updateTransaction,
    deleteTransaction,
    setFilters: updateFilters,
  };
}
