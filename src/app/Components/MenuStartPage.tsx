"use client";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { Pizza } from "@/types/pizza";

export default function MenuStartPage() {
  const { fetchPage } = useApi();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchPizzas() {
      const pizzaItems = await fetchPage<Pizza>("pizzaObj");
      if (pizzaItems) {
        setPizzas(pizzaItems);
      }
    }
    fetchPizzas();
  }, [fetchPage]);

  // Anpassad navigation utan useRouter
  const handlePizzaClick = (pizzaId: string) => {
    if (typeof window !== 'undefined') {
      // Spara pizza-ID i localStorage
      localStorage.setItem("selectedPizzaId", pizzaId);
      
      // Navigera till menysidan
      window.location.href = "/Menu";
    }
  };

  return (
    <div className="flex justify-center pb-20">
      <div className="max-w-[900px] text-center">
        <h1 className="text-[var(--color-text-green)] text-4xl font-semibold mb-8">
          Pizzor
        </h1>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-32 gap-y-10 px-4 w-full justify-items-start">
          {pizzas.map((pizza) => (
            <div 
              key={pizza.id} 
              onClick={() => handlePizzaClick(pizza.id)}
              data-testid="pizza-link"
              className="cursor-pointer w-full"
            >
              <div className="text-left w-full p-4 rounded-lg transform hover:scale-105 transition duration-300 cursor-pointer backface-hidden">
                <h3 className="text-[var(--color-text-red)] font-bold text-xl">
                  {pizza.properties.pizzaName}
                </h3>
                <p className="text-[var(--foreground)] text-lg">
                  {pizza.properties.ingridienser?.join(", ") ||
                    "Inga ingredienser angivna"}
                </p>
                <p className="font-semibold text-lg">
                  {pizza.properties.pizzaPrice}:-
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}