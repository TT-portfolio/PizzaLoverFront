import React, { useEffect, useState } from 'react';
import { Pizza } from '@/types/pizza';
import { fetchImageMetadata } from '@/context/fetchMetadata';
import Image from 'next/image';


interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({ pizza }: PizzaCardProps) {
  const { pizzaName, pizzaDescription, pizzaPrice, image } = pizza.properties;
  const baseUrl = "https://pizzaloverstorage.blob.core.windows.net/pizzalovercontainer";

  const imageFileName = image?.[0].url;
  const imageUrl = imageFileName ? `${baseUrl}${imageFileName}` : null;

  const [altText, setAltText] = useState<string>(imageFileName ? "Loading..." : "No alt text available");

  useEffect(() => {
    if (imageUrl) {
      fetchImageMetadata(imageUrl).then(setAltText);
    }
  }, [imageUrl])
  return (
    <div className="flex flex-col gap-0">
      <p className="text-color-text-red font-semibold p-0">{pizzaName}</p>
      <p className="font-medium">{pizzaDescription}</p>
      <p className="font-medium">{pizzaPrice} :-</p>

      {imageUrl && (
        <Image src={imageUrl} alt={altText} 
        width={500}
        height={500}
        className="w-40 h-40 object-cover rounded-md"/>
      )}
      <p>Alt Text: {altText}</p>
      <div className="h-px bg-gray-400"></div>
    </div>
  );
}
