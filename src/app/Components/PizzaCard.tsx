import React, { useEffect, useState } from "react";
import { Pizza } from "@/types/pizza";
import { fetchImageMetadata } from "@/context/fetchMetadata";
import Image from "next/image";
import Button from "../Components/Button";

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

  useEffect(() => {
    if (imageUrl) {
      fetchImageMetadata(imageUrl).then(setAltText);
    }
  }, [imageUrl]);
  return (
    <div className="flex flex-col ">
      <div className="flex gap-2 justify-between w-full ">
        <div data-test="pizzaCard" className="w-full flex flex-col gap-2 ">
          <div className="flex justify-between ">
            <p
              data-test="pizzaName"
              className="text-color-text-red font-semibold p-0"
            >
              {pizzaName}
            </p>
            <p data-test="pizzaPrice" className="font-semibold">
              {pizzaPrice}
            </p>
          </div>
          <div className="flex justify-between">
            <div className="flex flex-col justify-between">
              <div data-test="pizzaDescriptionOrIngredients">
                {ingrid ? (
                  <p className="font-medium">{pizzaDescription}</p>
                ) : (
                  ingridienser?.map((ingri, index) => (
                    <p key={index}>{ingri}</p>
                  )) || <p>Inga ingridienser är tillgängliga</p>
                )}
              </div>
              <Button
                label={ingrid ? "Ingridienser" : "Beskrivning"}
                onClick={handleClick}
              />
            </div>
            {imageUrl && (
              <Image
                data-test="pizzaImage"
                src={imageUrl}
                alt={altText}
                width={500}
                height={500}
                className="w-40 h-40 min-w-40 object-cover rounded-md"
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
