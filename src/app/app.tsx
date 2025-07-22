import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';

import type { ApiResponse } from '@/types';

import { Table } from '@/components';

export const App = () => {
  const [apiData, setApiData] = useState<ApiResponse | null>(null);

  useEffect(() => {
    fetch('https://3snet.co/js_test/api.json')
      .then(response => response.json())
      .then(data => setApiData(data));
  }, []);

  if (!apiData) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <Loader2 className="animate-spin text-gray-700" size={32} />
      </div>
    );
  }

  return (
    <div className="mx-auto flex h-full w-full max-w-lg items-center justify-center max-sm:px-4">
      <Table data={apiData} />
    </div>
  );
};
