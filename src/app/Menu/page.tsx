'use client';

import React, { useState, useEffect, useMemo } from "react";
import PizzaCard from "../Components/PizzaCard";
import { Pizza } from "@/types/pizza";
import { useApi } from "@/context/ApiContext";

export default function Menu() {
  const { fetchPage, loading, error } = useApi();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);
  const [ingredientFilter, setIngredientFilter] = useState<string>("");

  useEffect(() => {
    async function fetchData() {
      // Hämtar alla pizzaObj via din ApiContext
      const items = await fetchPage<Pizza>("pizzaObj");
      if (items) {
        setPizzas(items);
      }
    }
    fetchData();
  }, [fetchPage]);
  
  useEffect(() => {
    if (typeof window !== 'undefined' && pizzas.length > 0) {
      const selectedPizzaId = localStorage.getItem("selectedPizzaId");
      if (selectedPizzaId) {

        setTimeout(() => {
          const pizzaElement = document.getElementById(`pizza-${selectedPizzaId}`);
          if (pizzaElement) {
            pizzaElement.scrollIntoView({behavior: 'smooth', block: 'start'});

            localStorage.removeItem("selectedPizzaId");
          }          
        }, 10);
      }
    }
  }, [pizzas]);

  // Memoiserad filtrerad lista baserat på ingredientFilter
  const filteredPizzas = useMemo(() => {
    // Om inget filter är angett, returnera alla pizzor
    if (!ingredientFilter.trim()) return pizzas;
    return pizzas.filter((pizza) => {
      // Vi kollar på ingridienser under properties
      const ingList = pizza.properties.ingridienser;
      if (!ingList) return false;
      return ingList.some((ing) =>
        ing.toLowerCase().includes(ingredientFilter.toLowerCase())
      );
    });
  }, [pizzas, ingredientFilter]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pizzas.length) return <p>No pizzas found.</p>;

  return (
    <div className="m-4">
      <h1 className="text-2xl text-center">Våran underbara menu att välja ifrån</h1>
      {/* Filterfältet */}
      <div className="mb-4">
        <input
        data-test="Search"
          type="text"
          placeholder="Filtrera på ingrediens t.ex. oxfile"
          value={ingredientFilter}
          onChange={(e) => setIngredientFilter(e.target.value)}
          className="p-2 border border-gray-300 rounded w-full"
        />
      </div>

      {/* Lista med pizzor */}
      <div className="grid grid-cols gap-3 md:grid-cols-2">
        {filteredPizzas.map((pizza) => (
          <PizzaCard key={pizza.id} pizza={pizza} />
        ))}
      </div>

      {filteredPizzas.length === 0 && (
        <p data-test="NoResult">Inga pizzor matchar dina filter.</p>
      )}
    </div>
  );
}
