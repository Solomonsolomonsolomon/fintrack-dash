import axios from "axios";

import { Transaction } from "@/@types";
import { DashboardSummary } from "@/@types";
const api = axios.create({
  baseURL: "/api",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const endpoints = {
  transactions: "/transactions",
  dashboard: "/dashboard",
  reports: "/reports",
} as const;

export interface ApiResponse<T> {
  data: T;
  message?: string;
  success: boolean;
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
  message?: string;
  success: boolean;
}


export const transactionApi = {

  getAll: async (params?: {
    page?: number;
    limit?: number;
    type?: "credit" | "debit" | "all";
    search?: string;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
  }) => {
    const response = await api.get<PaginatedResponse<Transaction>>(
      endpoints.transactions,
      { params }
    );
    return response.data;
  },

  
  getById: async (id: string) => {
    const response = await api.get<ApiResponse<Transaction>>(
      `${endpoints.transactions}/${id}`
    );
    return response.data;
  },

  create: async (transaction: Omit<Transaction, "id">) => {
    const response = await api.post<ApiResponse<Transaction>>(
      endpoints.transactions,
      transaction
    );
    return response.data;
  },

  
  update: async (id: string, transaction: Partial<Transaction>) => {
    const response = await api.put<ApiResponse<Transaction>>(
      `${endpoints.transactions}/${id}`,
      transaction
    );
    return response.data;
  },


  delete: async (id: string) => {
    const response = await api.delete<ApiResponse<void>>(
      `${endpoints.transactions}/${id}`
    );
    return response.data;
  },
};

export const dashboardApi = {
  getSummary: async () => {
    const response = await api.get<ApiResponse<DashboardSummary>>(
      endpoints.dashboard
    );
    return response.data;
  },
};

export default api;
