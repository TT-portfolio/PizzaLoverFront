export interface SideDish {
  id: string;
  properties: {
    sideDishName: string;
    sideDishPrice: number;
    sideDishIngredients?: string[];
    sideDishImage?: { url: string }[];
    sideDishDescription?: string;
  };
}
