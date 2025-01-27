"use client";

import React, { useState, useEffect } from "react";
import PizzaCard from "../Components/PizzaCard";
import { Pizza } from "@/types/pizza";
import { useApi } from "@/context/ApiContext";

export default function Menu() {
  const { fetchPage, loading, error } = useApi();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchData() {
      // This is a shorter and better version to fetch, using type
      const items = await fetchPage<Pizza>("pizzaObj"); // Get pizzas in []
      if (items) {
        setPizzas(items);
      }
    }
    fetchData();
  }, [fetchPage]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!pizzas.length) return <p>No pizzas found.</p>;

  return (
    <div className="grid grid-cols m-4 gap-3">
      {pizzas.map((pizza) => (
        //Sending info to pizzaCard
          <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}
