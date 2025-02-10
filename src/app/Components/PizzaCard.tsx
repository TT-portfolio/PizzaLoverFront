import React, { useEffect, useState } from "react";
import { Pizza } from "@/types/pizza";
import { fetchImageMetadata } from "@/context/fetchMetadata";
import Image from "next/image";
import Button from "./Button";

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

    const handleClick = () => {
        setIngrid((prevState) => !prevState);
    };

    const handleBasket = () => {
      alert("Kundkorg är inte klar än")
    }

    useEffect(() => {
        if (imageUrl) {
            fetchImageMetadata(imageUrl).then(setAltText);
        }
    }, [imageUrl]);
    return (
        // <div className="flex flex-col ">
            // <div className="flex gap-2 justify-between w-full ">
                <div
                    data-test="pizzaCard"
                    className="w-full flex flex-col gap-2">
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
                                    // Ingen grid här, bara beskrivningstext
                                    <p className="">
                                        {pizzaDescription}
                                    </p>
                                ) : ingridienser && ingridienser.length > 0 ? (
                                    // Grid endast på ingredienserna
                                    <div className="grid grid-cols-2 gap-2">
                                        {ingridienser.map((ingri, index) => (
                                            <p key={index}>{ingri}</p>
                                        ))}
                                    </div>
                                ) : (
                                    <p>Inga ingredienser är tillgängliga</p>
                                )}
                            </div>
                                <Button
                                    label={
                                        ingrid ? "Ingridienser" : "Beskrivning"
                                    }
                                    variant="description"
                                    onClick={handleClick}
                                />
                            {/* Denna kan vi koppla in när vi bygger mot kundkorgen
                            <div className="grid grid-cols-2 gap-4">
                                <Button
                                    label={
                                        "Lägg i kundkorg"
                                    }
                                    variant="purchase"
                                    onClick={handleBasket}
                                />
                            </div> */}
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
            // </div>
        // </div>
    );
}
