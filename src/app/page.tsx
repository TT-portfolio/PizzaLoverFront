"use client";

import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { Pizza } from "@/types/pizza";
import MenuStartPage from "@/app/Components/MenuStartPage"; 

function HomePage() {
  const { fetchPage, loading, error } = useApi();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchData() {     
      const items = await fetchPage<Pizza>("pizzaObj");
      if (items) {
        console.log("API Response från pizzaObj:", items); 
        setPizzas(items);
      }
    }
    fetchData();
  }, [fetchPage]);

  if (loading) return <h1 className="text-3xl">Loading...</h1>;
  if (error) return <p className="text-2xl">Error: {error}</p>;

  return (
    <div className="flex flex-col items-center justify-center w-full mt-16">
      <div className="w-full max-w-3xl mx-auto text-center">
        <h1 className="text-[var(--color-text-green)] text-4xl font-semibold mb-6">
          Pizzor
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-8 max-w-3xl mx-auto px-4">
        {pizzas.length > 0 ? (
          pizzas.map((pizza, index) => (
            <MenuStartPage key={index} pizza={pizza} />
          ))
        ) : (
          <p className="text-xl">Inga pizzor tillgängliga.</p>
        )}
      </div>
    </div>
  );
}


export default HomePage;
