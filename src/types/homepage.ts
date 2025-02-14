import { Pizza } from "@/types/pizza";

export interface Homepage {
    id: string;
    contentType: string;
    properties: {
        pageTitle: string;
        pizzas: Pizza[]; 
      };
}