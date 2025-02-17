"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { Pizza } from "@/types/pizza";
import { SideDish } from "@/types/sideDish";
import MenuStartPage from "@/app/Components/MenuStartPage"; 
import SideDishCard from "@/app/Components/SideDishCard"; 

function HomePage() {
  const { fetchPage, loading, error } = useApi();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [sideDishes, setSideDishes] = useState<SideDish[]>([]);

  useEffect(() => {
    async function fetchData() {     
      const pizzaItems = await fetchPage<Pizza>("pizzaObj");
      const sideDishItems = await fetchPage<SideDish>("sideDishes");

      if (pizzaItems) {
        console.log("API Response från pizzaObj:", pizzaItems); 
        setPizzas(pizzaItems);
      }
      
      if (sideDishItems) {
        console.log("API Response från sideDishes:", sideDishItems); 
        setSideDishes(sideDishItems);
      }
    }
    fetchData();
  }, [fetchPage]);

  if (loading) return <h1 className="text-3xl">Loading...</h1>;
  if (error) return <p className="text-2xl">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-16">
      
      {/* Wrapper pizza-section */}
      <div className="relative max-w-[900px] mx-auto px-8 py-12 mb-16">
              
        <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-[var(--background)] text-[var(--color-text-green)] text-4xl font-semibold">
          Pizzor
        </h1>
       
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-6 mt-12 px-10 grid-auto-rows-[1fr]">
          {pizzas.length > 0 ? (
            pizzas.map((pizza, index) => (
              <div key={index} className="h-full flex flex-col justify-between px-4">
                <MenuStartPage pizza={pizza} />
              </div>
            ))
          ) : (
            <p className="text-xl">Inga pizzor tillgängliga.</p>
          )}
        </div>
      </div>

      {/* Wrapper sideDishes */}
      <div className="relative max-w-[1000px] mx-auto px-12 py-16 mb-32 border-[3px] border-dashed border-green-700">

        {/* Title and dottedline sides */}
        <h1 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-[var(--background)] text-[var(--color-text-green)] text-4xl font-semibold">
          Tillbehör
        </h1>

        {/* SideDishes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-6 mt-12">
          
          {/* left column */}
          <div className="flex flex-col space-y-6">
            {sideDishes
              .filter((dish) => dish.properties.sideDishName.toLowerCase().includes("sås"))
              .map((sideDish, index) => (
                <SideDishCard key={index} sideDish={sideDish} />
              ))}
            
            {sideDishes
              .filter((dish) => dish.properties.sideDishName.toLowerCase().includes("pizzasallad"))
              .map((sideDish, index) => (
                <SideDishCard key={index} sideDish={sideDish} />
              ))}

            {sideDishes
              .filter((dish) => dish.properties.sideDishName.toLowerCase().includes("coleslaw"))
              .map((sideDish, index) => (
                <SideDishCard key={index} sideDish={sideDish} />
              ))}
          </div>

          {/* Right column */}
          <div className="flex flex-col space-y-6">
            {sideDishes
              .filter((dish) => dish.properties.sideDishName.toLowerCase().includes("pommes"))
              .map((sideDish, index) => (
                <SideDishCard key={index} sideDish={sideDish} />
              ))}

            {sideDishes
              .filter((dish) => dish.properties.sideDishName.toLowerCase().includes("loaded"))
              .map((sideDish, index) => (
                <SideDishCard key={index} sideDish={sideDish} />
              ))}
          </div>

        </div>
      </div>
    </div>
  );
}

export default HomePage;
