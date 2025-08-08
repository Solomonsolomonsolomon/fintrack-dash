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