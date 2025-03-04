"use client";

import Link from 'next/link';
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { SideDish } from "@/types/sideDish";

export default function SideDishCard() {
  const { fetchPage } = useApi();
  const [sideDishes, setSideDishes] = useState<SideDish[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    async function fetchSideDishes() {
      try {
        const sideDishItems = await fetchPage<SideDish>("sideDishObj");

        if (sideDishItems) {
          setSideDishes(sideDishItems);
        } else {
          setSideDishes([]); // In case of empty response
        }
      } catch (err) {
        setError(true);
      } finally {
        setLoading(false);
      }
    }
    fetchSideDishes();
  }, [fetchPage]);

  // If data is still loading
  if (loading) {
    return <div>Loading...</div>;
  }

  // If there was an error during fetch
  if (error) {
    return <div>Failed to load side dishes. Please try again later.</div>;
  }

  const categorizedSideDishes: { [key: string]: SideDish[] } = sideDishes.reduce((acc, dish) => {
    const category = dish.properties?.sideDishCategory;

    const categoryMapping: { [key: string]: string } = {
      saucesAndDips: "SÅSER/DIP 15:-",
      fries: "Pommes 35:-",
      loadedFries: "LOADED FRIES 65:-",
      otherSides: "Övriga Tillbehör",
      pizzasallad: "PIZZASALLAD 15 :-",
      coleslaw: "COLESLAW 15 :-",
    };

    // Check if the category is defined, else return a default value
    const categoryTitle = category ? categoryMapping[category] || "Övriga Tillbehör" : "Övriga Tillbehör";

    if (!acc[categoryTitle]) acc[categoryTitle] = [];
    acc[categoryTitle].push(dish);
    return acc;
  }, {} as { [key: string]: SideDish[] });

  return (
    <Link href="/Menu" data-testid="side-dish-link">
      <div
        className="relative max-w-[1000px] mx-auto px-12 py-16 mb-32 border-[3px] border-dashed border-green-700"
        data-test="sideDishesSection"
      >
        <h2 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-[var(--background)] text-[var(--color-text-green)] text-4xl font-semibold">
          Tillbehör
        </h2>

        {/* Check if side dishes are available */}
        {Object.keys(categorizedSideDishes).length === 0 ? (
          <p>No side dishes available</p>
        ) : (
          <div className="grid grid-cols-2 gap-x-6">
            <div className="space-y-6">
              {["SÅSER/DIP 15:-", "PIZZASALLAD 15 :-", "COLESLAW 15 :-"].map((category) => (
                categorizedSideDishes[category] && (
                  <div key={category}>
                    <h3 className="text-[var(--color-text-green)] font-bold text-lg uppercase">
                      {category}
                    </h3>
                    <ul className="list-none text-[var(--foreground)] text-base leading-tight pl-3">
                      {categorizedSideDishes[category].map((sideDish, index) => (
                        <li
                          key={index}
                          className="mt-1 p-4 rounded-lg transform hover:scale-105 transition duration-300 cursor-pointer backface-hidden">
                          {sideDish.properties.sideDishName}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>

            <div className="space-y-6">
              {["Pommes 35:-", "LOADED FRIES 65:-"].map((category) => (
                categorizedSideDishes[category] && (
                  <div key={category}>
                    <h3 className="text-[var(--color-text-green)] font-bold text-lg uppercase">
                      {category}
                    </h3>
                    <ul className="list-none text-[var(--foreground)] text-base leading-tight pl-3">
                      {categorizedSideDishes[category].map((sideDish, index) => (
                        <li
                          key={index}
                          className="mt-1 p-4 rounded-lg transform hover:scale-105 transition duration-300 cursor-pointer"
                        >
                          {sideDish.properties.sideDishName}: 
                          {/* Implement fallback for ingredients */}
                          {sideDish.properties.sideDishIngredients?.length
                            ? sideDish.properties.sideDishIngredients
                            : "Inga ingredienser angivna"}
                        </li>
                      ))}
                    </ul>
                  </div>
                )
              ))}
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}
