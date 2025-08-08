import { PaginatedResponse } from "@/lib/api";
export enum PageType {
  OVERVIEW = "OVERVIEW",
  TRANSACTIONS = "TRANSACTIONS",
}

export interface HeaderBottomProps {
  sidebarOpen?: boolean;
}

export interface Transaction {
  id: string;
  date: string;
  remark: string;
  amount: number;
  currency: string;
  type: "credit" | "debit";
}
export interface DashboardSummary {
  totalBalance: number;
  totalCredits: number;
  totalDebits: number;
  transactionCount: number;
  balanceChange: number;
  creditsChange: number;
  debitsChange: number;
  transactionChange: number;
}

export interface UseTransactionsOptions {
  page?: number;
  limit?: number;
  type?: "credit" | "debit" | "all";
  search?: string;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
  autoFetch?: boolean;
}

export interface UseTransactionsReturn {
  transactions: Transaction[];
  pagination: any;
  loading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
  createTransaction: (transaction: Omit<Transaction, "id">) => Promise<void>;
  updateTransaction: (
    id: string,
    transaction: Partial<Transaction>
  ) => Promise<void>;
  deleteTransaction: (id: string) => Promise<void>;
  setFilters: (filters: Partial<UseTransactionsOptions>) => void;
}
export interface SearchContextType {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  debouncedSearchTerm: string;
  isSearching: boolean;
  setIsSearching: (searching: boolean) => void;
}