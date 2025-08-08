import { useState, useEffect, useCallback } from "react";
import { dashboardApi } from "@/lib/api";
import { DashboardSummary } from "@/@types";

export function useDashboardSummary(autoFetch: boolean = true) {
  const [summary, setSummary] = useState<DashboardSummary | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchSummary = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await dashboardApi.getSummary();
      setSummary(response.data);
    } catch (err) {
      console.error("Error fetching dashboard summary:", err);
      setError(
        err instanceof Error
          ? err.message
          : "Failed to fetch dashboard summary"
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (autoFetch) {
      fetchSummary();
    }
  }, [autoFetch, fetchSummary]);

  return {
    summary,
    loading,
    error,
    refetch: fetchSummary,
  };
}
