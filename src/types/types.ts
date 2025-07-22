export interface MonthData {
  income: number;
  activePartners: number;
  plan: {
    income: number;
    activePartners: number;
  };
  fact: {
    income: number;
    activePartners: number;
  };
}

export interface AdminData {
  id: number;
  adminId: number;
  adminName: string;
  months: (MonthData | null)[];
  year: number;
}

export interface ApiResponse {
  success: boolean;
  data: {
    total: {
      fact: {
        income: number;
        activePartners: number;
      };
      plan: {
        income: number;
        activePartners: number;
      };
    }[];
    table: AdminData[];
  };
}
