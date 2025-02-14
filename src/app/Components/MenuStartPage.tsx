import { Pizza } from "@/types/pizza"; 

interface PizzaCardProps {
    pizza: Pizza;
}

export default function MenuStartPage({ pizza }: PizzaCardProps) {
    const { pizzaName, pizzaPrice, ingridienser } = pizza.properties;

    return (
        <div className="text-[var(--foreground)] text-xl leading-tight p-4 text-left">
            <h3 className="text-[var(--color-text-red)] font-bold text-2xl">
                {pizzaName}
            </h3>
            <p className="text-[var(--foreground)] text-xl">
                {ingridienser?.join(", ") || "Inga ingredienser angivna"}
            </p>
            <p className="font-semibold text-xl">{pizzaPrice}:-</p>
        </div>
    );
}
