import React, { useEffect, useState } from "react";
import { Pizza } from "@/types/pizza";
import { fetchImageMetadata } from "@/context/fetchMetadata";
import Image from "next/image";

interface PizzaCardProps {
    pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
    const { pizzaName, pizzaDescription, pizzaPrice, image } = pizza.properties;
    const baseUrl =
        "https://pizzaloverstorage.blob.core.windows.net/pizzalovercontainer";

    const imageFileName = image?.[0].url;
    const imageUrl = imageFileName ? `${baseUrl}${imageFileName}` : null;

    const [altText, setAltText] = useState<string>(
        imageFileName ? "Loading..." : "No alt text available"
    );

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
                        <p className="text-color-text-red font-semibold p-0">
                            {pizzaName}
                        </p>
                        <p className="font-semibold">{pizzaPrice} :-</p>
                    </div>
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
            {/* <div className="h-px bg-gray-400"></div> */}
        </div>
    );
}
