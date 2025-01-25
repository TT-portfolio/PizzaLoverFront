'use client';

import React, { useState, useEffect } from 'react';
import PizzaCard from '../Components/PizzaCard';
import { Pizza } from '@/types/pizza';
import { useApi } from '@/context/ApiContext';

export default function Menu() {
  const { fetchPage, loading, error } = useApi();
  const [pizzas, setPizzas] = useState<Pizza[]>([]);

  useEffect(() => {
    async function fetchData() {
      const items = await fetchPage<Pizza>("pizzaObj"); // Hämta pizzor som Pizza[]
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
    <div className="grid grid-cols-3 gap-4">
      {pizzas.map((pizza) => (
        <PizzaCard key={pizza.id} pizza={pizza} />
      ))}
    </div>
  );
}
