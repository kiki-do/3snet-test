import { ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';

import type { AdminData, ApiResponse } from '@/types';

interface MonthTableProps {
  data: ApiResponse;
}

export const Table = ({ data }: MonthTableProps) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const nextMonths = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() + 1);
    setCurrentMonth(newMonth);
  };

  const prevMonths = () => {
    const newMonth = new Date(currentMonth);
    newMonth.setMonth(newMonth.getMonth() - 1);
    setCurrentMonth(newMonth);
  };

  const generateMonths = () => {
    const months: Date[] = [];
    for (let i = 0; i < 6; i++) {
      const month = new Date(currentMonth);
      month.setMonth(month.getMonth() + i);
      months.push(month);
    }
    return months;
  };

  const formatShortMonth = (date: Date): string => {
    return date.toLocaleString('en-US', { month: 'short' });
  };

  const getMonthData = (admin: AdminData, monthIndex: number) => {
    const currentDate = new Date(currentMonth);
    currentDate.setMonth(currentDate.getMonth() + monthIndex);

    const yearDiff = currentDate.getFullYear() - admin.year;
    const adjustedMonthIndex = monthIndex - yearDiff * 12;

    if (adjustedMonthIndex < 0 || adjustedMonthIndex >= admin.months.length) {
      return null;
    }

    return admin.months[adjustedMonthIndex];
  };

  return (
    <div className="w-full">
      <div className="mb-4 flex justify-end gap-4">
        <button
          onClick={prevMonths}
          className="rounded-lg border border-gray-400 bg-white p-2 transition hover:bg-gray-100"
        >
          <ChevronLeft />
        </button>

        <button
          onClick={nextMonths}
          className="rounded-lg border border-gray-400 bg-white p-2 transition hover:bg-gray-100"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="overflow-x-auto">
        <table className="divide min-w-full divide-gray-200 border border-gray-200 bg-white">
          <thead className="bg-gray-50">
            <tr>
              <th className="border-b border-gray-200 bg-gray-50 p-2 text-left">
                Administrator
              </th>
              <th className="border-b border-gray-200 bg-gray-50 p-2 text-left"></th>
              {generateMonths().map((month, index) => (
                <th
                  key={index}
                  className="border-b border-gray-200 bg-gray-50 p-2 text-left"
                >
                  <div>{formatShortMonth(month)}</div>
                  <div className="text-gray-500">{month.getFullYear()}</div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-gray-400">Fact</span>
                    <span className="text-gray-400">Plan</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="divide-y divide-gray-200 bg-white">
            {data.data.table.map(admin => (
              <tr key={admin.id}>
                <td className="border-b border-gray-200 p-2 font-medium">
                  {admin.adminName} (ID: {admin.adminId})
                </td>
                <td className="border-b border-gray-200 p-2 font-medium">
                  <div className="text-gray-400flex flex-col">
                    <div className="font-medium text-gray-700">
                      Total income:
                    </div>
                    <div className="font-medium text-gray-700">
                      Active partners
                    </div>
                  </div>
                </td>
                {generateMonths().map((_, monthIndex) => {
                  const monthData = getMonthData(admin, monthIndex);

                  return (
                    <td
                      key={monthIndex}
                      className="border-b border-gray-200 p-2"
                    >
                      {monthData ? (
                        <div className="grid grid-cols-2 gap-1">
                          <div className="text-center text-gray-400">
                            <div className="font-medium">
                              $ {monthData.fact.income}
                            </div>
                            <div>{monthData.fact.activePartners}</div>
                          </div>
                          <div className="text-center text-gray-400">
                            <div className="font-medium">
                              $ {monthData.plan.income}
                            </div>
                            <div className="">
                              {monthData.plan.activePartners}
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-center text-gray-400">-</div>
                      )}
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="mt-8">
        <h3 className="mb-2 text-lg font-semibold">Total Data</h3>
        <table className="min-w-full border border-gray-200 bg-white">
          <thead>
            <tr>
              <th className="border-b border-gray-200 bg-gray-50 p-2 text-left">
                Metric
              </th>
              {generateMonths().map((month, index) => (
                <th
                  key={index}
                  className="border-b border-gray-200 bg-gray-50 p-2 text-center"
                >
                  <div>{formatShortMonth(month)}</div>
                  <div className="text-gray-500">{month.getFullYear()}</div>
                  <div className="grid grid-cols-2 gap-1">
                    <span className="text-center text-gray-400">Fact</span>
                    <span className="text-center text-gray-400">Plan</span>
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="border-b border-gray-200 p-2 font-medium">
                Total Income
              </td>
              {generateMonths().map((_, index) => (
                <td key={index} className="border-b border-gray-200 p-2">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-center text-gray-400">
                      $ {data.data.total[index]?.fact.income}
                    </div>
                    <div className="text-center text-gray-400">
                      $ {data.data.total[index]?.plan.income}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
            <tr>
              <td className="border-b border-gray-200 p-2 font-medium">
                Active Partners
              </td>
              {generateMonths().map((_, index) => (
                <td key={index} className="border-b border-gray-200 p-2">
                  <div className="grid grid-cols-2 gap-1">
                    <div className="text-center text-gray-400">
                      {data.data.total[index]?.fact.activePartners}
                    </div>
                    <div className="text-center text-gray-400">
                      {data.data.total[index]?.plan.activePartners}
                    </div>
                  </div>
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
