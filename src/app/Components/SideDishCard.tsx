import { SideDish } from "@/types/sideDish";

interface SideDishCardProps {
    sideDish: SideDish;
}

export default function SideDishCard({ sideDish }: SideDishCardProps) {
    const { sideDishName, sideDishPrice, sideDishIngredients = [] } = sideDish.properties;

    return (
        <div className="text-[var(--foreground)] text-xl p-2 text-left">
            <h3 className="text-[var(--color-text-green)] font-bold text-xl mb-1">
                {sideDishName} {sideDishPrice}:-
            </h3>

            {/* Säkerhetskoll så att ingredients är en array innan vi renderar */}
            {Array.isArray(sideDishIngredients) && sideDishIngredients.length > 0 && (
                <ul className="text-[var(--foreground)] text-lg list-disc pl-5">
                    {sideDishIngredients.map((ingredient, index) => (
                        <li key={index}>{ingredient}</li>
                    ))}
                </ul>
            )}
        </div>
    );
}
