// types/api.ts
export interface ApiItem {
  id: string;
  name: string;
  createDate: string;
  updateDate: string;
  route: {
    path: string;
    startItem: {
      id: string;
      path: string;
    };
  };
  properties: {
    pizzaDescription: string;
    pizzaName: string;
    pizzaPrice: number;
    ham: string | null;
    ost: string | null;
  };
  cultures: Record<string, any>;
}


export interface ApiResponse {
    total: number;
    items: ApiItem[];
}

