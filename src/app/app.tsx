import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { ApiResponse } from '@/types';

import { Table } from '@/components';

export const App = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!import.meta.env.VITE_API_URL) {
          throw new Error('API URL is not configured');
        }

        const response = await fetch(import.meta.env.VITE_API_URL);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setApiData(data);
      } catch (err) {
        setError(
          err instanceof Error ? err.message : 'An unknown error occurred'
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="animate-spin text-gray-700" size={32} />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!apiData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <p className="text-gray-500">No data available</p>
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-lg items-center justify-center max-sm:px-4">
      <Table data={apiData} />
    </div>
  );
};
