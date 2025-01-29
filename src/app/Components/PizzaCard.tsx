import React from 'react'
import { Pizza } from '@/types/pizza'

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({pizza}: PizzaCardProps) {
  const { pizzaName, pizzaDescription, pizzaPrice, image} = pizza.properties;

  console.log("image data", image)
  
  return (
    <div className='flex flex-col gap-0'>
        <p className='text-color-text-red font-semibold p-0'>{pizzaName}</p>
        <p className='font-medium'>{pizzaDescription}</p>
        <p className='font-medium'>{pizzaPrice} :-</p>
        {image?.[0]?.url && <p>{image[0].url}</p>}
        <div className='h-px bg-gray-400'></div>
    </div>
  )
}
