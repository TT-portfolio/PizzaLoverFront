"use client";

import React, { useEffect, useState } from "react";
import { Pizza } from "@/types/pizza";
import { fetchImageMetadata } from "@/context/fetchMetadata";
import Image from "next/image";
import Button from "./Button";
import CartButton from "./CartButton";
import { useCart } from "@/context/CartContext";

interface PizzaCardProps {
    pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
    const { pizzaName, pizzaDescription, pizzaPrice, image, ingridienser } =
        pizza.properties;
    const baseUrl =
        "https://pizzaloverstorage.blob.core.windows.net/pizzalovercontainer";

    const imageFileName = image?.[0].url;
    const imageUrl = imageFileName ? `${baseUrl}${imageFileName}` : null;
    const [altText, setAltText] = useState<string>(
        imageFileName ? "Loading..." : "No alt text available"
    );

    const [ingrid, setIngrid] = useState<boolean>(false);
    const [quantity, setQuantity] = useState<number>(1);
    const { addToCart } = useCart();

    const handleClick = () => {
        setIngrid((prevState) => !prevState);
    };

    const handleBasket = () => {
        addToCart(pizza, quantity);
        setQuantity(1);
    }

    useEffect(() => {
        if (imageUrl) {
            fetchImageMetadata(imageUrl).then(setAltText);
        }
    }, [imageUrl]);
    
    return (
        <div data-test="pizzaCard" className="w-full flex flex-col gap-2">
            <div className="flex justify-between bg-color-highlight rounded-md p-1 px-2 font-semibold">
                <p data-test="pizzaName" className="text-black p-0">
                    {pizzaName}
                </p>
                <p data-test="pizzaPrice">{pizzaPrice} :-</p>
            </div>
            <div className="flex justify-between">
                <div className="flex flex-col justify-between w-full">
                    <div
                        data-test="pizzaDescriptionOrIngredients"
                        className="px-2 font-medium">
                        {ingrid ? (
                            <p className="">
                                {pizzaDescription}
                            </p>
                        ) : ingridienser && ingridienser.length > 0 ? (
                            <div className="grid grid-cols-2 gap-2">
                                {ingridienser.map((ingri, index) => (
                                    <p key={index}>{ingri}</p>
                                ))}
                            </div>
                        ) : (
                            <p>Inga ingredienser är tillgängliga</p>
                        )}
                    </div>
                    <div className="flex justify-between items-center">
                        <Button
                            label={
                                ingrid ? "Ingridienser" : "Beskrivning"
                            }
                            variant="description"
                            onClick={handleClick}
                        />
                        
                        <div className="flex items-center">
                            <div className="flex border border-[var(--color-text-green)] rounded-md mr-2">
                                <button
                                    className="px-2 py-1 text-[var(--color-text-green)] font-semibold"
                                    onClick={() => setQuantity(prev => Math.max(1, prev - 1))}
                                >
                                    -
                                </button>
                                <span className="px-3 py-1 border-x border-[var(--color-text-green)] text-center">{quantity}</span>
                                <button
                                    className="px-2 py-1 text-[var(--color-text-green)] font-semibold"
                                    onClick={() => setQuantity(prev => prev + 1)}
                                >
                                    +
                                </button>
                            </div>
                            <CartButton
                                variant="purchase"
                                label="Lägg i kundkorg"
                                onClick={handleBasket}
                            />
                        </div>
                    </div>
                </div>
                {imageUrl && (
                    <Image
                        data-test="pizzaImage"
                        src={imageUrl}
                        alt={altText}
                        width={500}
                        height={500}
                        className="w-40 h-40 min-w-40 object-cover rounded-md hidden sm:flex sm:ml-3"
                    />
                )}
            </div>
        </div>
    );
}