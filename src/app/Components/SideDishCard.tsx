'use client'
import { useEffect, useState } from "react";
import { useApi } from "@/context/ApiContext";
import { SideDish } from "@/types/sideDish";

export default function SideDishCard() {
    const { fetchPage } = useApi();
    const [sideDishes, setSideDishes] = useState<SideDish[]>([]);

    useEffect(() => {
        async function fetchSideDishes() {
            console.log("Fetching SideDishes...");
            const sideDishItems = await fetchPage<SideDish>("sideDishObj");
            
            if (sideDishItems) {
                console.log("Fetched SideDishes:", sideDishItems);
                setSideDishes(sideDishItems);
            }
        }

        fetchSideDishes();
    }, [fetchPage]);
    
    const categorizedSideDishes: { [key: string]: SideDish[] } = sideDishes.reduce((acc, dish) => {
        const category = dish.properties.sideDishCategory;

        const categoryMapping: { [key: string]: string } = {
            saucesAndDips: "SÅSER/DIP 15:-",
            fries: "Pommes 35:-",
            loadedFries: "LOADED FRIES 65:-",
            otherSides: "Övriga Tillbehör",
            pizzasallad: "PIZZASALLAD 15 :-",
            coleslaw: "COLESLAW 15 :-",
        };

        const categoryTitle = categoryMapping[category ?? ""] || "Övriga Tillbehör";

        if (!acc[categoryTitle]) acc[categoryTitle] = [];
        acc[categoryTitle].push(dish);
        return acc;
    }, {} as { [key: string]: SideDish[] });

    return (
        <div 
        className="relative max-w-[1000px] mx-auto px-12 py-16 mb-32 border-[3px] border-dashed border-green-700"
        data-test="sideDishesSection"     >
        <h2 className="absolute -top-6 left-1/2 transform -translate-x-1/2 px-4 bg-[var(--background)] text-[var(--color-text-green)] text-4xl font-semibold">
          Tillbehör
        </h2>

            <div className="grid grid-cols-2 gap-x-6">
                {/* Left column */}
                <div className="space-y-6">
                    {["SÅSER/DIP 15:-", "PIZZASALLAD 15 :-", "COLESLAW 15 :-"].map((category) => (
                        categorizedSideDishes[category] && (
                            <div key={category}>
                                <h3 className="text-[var(--color-text-green)] font-bold text-lg uppercase">{category}</h3>
                                <ul className="list-none text-[var(--foreground)] text-base leading-tight pl-3">
                                    {categorizedSideDishes[category].map((sideDish, index) => (
                                        <li key={index} className="mt-1"> {sideDish.properties.sideDishName}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>

                {/* Right column */}
                <div className="space-y-6">
                    {["Pommes 35:-", "LOADED FRIES 65:-"].map((category) => (
                        categorizedSideDishes[category] && (
                            <div key={category}>
                                <h3 className="text-[var(--color-text-green)] font-bold text-lg uppercase">{category}</h3>
                                <ul className="list-none text-[var(--foreground)] text-base leading-tight pl-3">
                                    {categorizedSideDishes[category].map((sideDish, index) => (
                                        <li key={index} className="mt-1 "> {sideDish.properties.sideDishName}: {sideDish.properties.sideDishIngredients}</li>
                                    ))}
                                </ul>
                            </div>
                        )
                    ))}
                </div>
            </div>
        </div>
    );
}
