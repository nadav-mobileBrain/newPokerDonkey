import { useState } from "react";
import { ApiResponse } from "apisauce";

type ApiFunc<T> = (...args: any[]) => Promise<ApiResponse<T>>;

export default function useApi<T>(apiFunc: ApiFunc<T>) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const request = async (...args: any[]): Promise<ApiResponse<T>> => {
    setLoading(true);
    const response = await apiFunc(...args);
    setLoading(false);

    if (!response.ok) {
      const errorMsg =
        (response.data as any)?.error || "An unexpected error occurred.";
      setError(errorMsg);
    } else {
      setError(null);
    }

    setData(response.data || null);
    return response;
  };

  return { data, error, loading, request };
}
