import React, { useEffect, useState } from "react";
import { Pizza } from "@/types/pizza";
import { fetchImageMetadata } from "@/context/fetchMetadata";
import Image from "next/image";
import Button from "../Components/Button";

interface PizzaCardProps {
    pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
    const { pizzaName, pizzaDescription, pizzaPrice, image, ingridienser } = pizza.properties;
    const baseUrl =
        "https://pizzaloverstorage.blob.core.windows.net/pizzalovercontainer";

    const imageFileName = image?.[0].url;
    const imageUrl = imageFileName ? `${baseUrl}${imageFileName}` : null;
    const [ingridiens, setIngridiens] = useState(true);
    const [altText, setAltText] = useState<string>(
        imageFileName ? "Loading..." : "No alt text available"
    );

    const [ingridienser, setIngridienser] = useState<boolean>(false);

    const handleClick = () => {
        setIngridienser(prevState => !prevState);
        console.log(ingridienser)
    }

    useEffect(() => {
        if (imageUrl) {
            fetchImageMetadata(imageUrl).then(setAltText);
        }
    }, [imageUrl]);
    return (
        <div className="flex flex-col">
            <div className="flex gap-2 justify-between w-full">
                <div className="w-full">
                    <div className="flex justify-between sm:flex-col">
                        <p data-test="pizzaName" className="text-color-text-red font-semibold p-0">
                            {pizzaName}
                        </p>
                        <p className="font-semibold">{pizzaPrice} :-</p>
                    </div>
                            <Button label="Ingridienser" onClick={handleClick}/>
                    <p className="font-medium">{pizzaDescription}</p>
                </div>
                {imageUrl && (
                    <Image
                        src={imageUrl}
                        alt={altText}
                        width={500}
                        height={500}
                        className="w-40 h-40 min-w-40 object-cover rounded-md"
                    />
                )}
            </div>
        </div>
    );
}
