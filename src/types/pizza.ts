// types/pizza.ts
export interface Pizza {
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
        image?: { url: string }[];
        ingridienser?: string[];
    };
}
