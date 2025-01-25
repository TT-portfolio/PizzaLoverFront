import React from 'react'
import { Pizza } from '@/types/pizza'

interface PizzaCardProps {
  pizza: Pizza;
}

export default function PizzaCard({pizza}: PizzaCardProps) {
  const { pizzaName, pizzaDescription, pizzaPrice} = pizza.properties;
  return (
    <div>
        <p>{pizzaName}</p>
        <p>{pizzaDescription}</p>
        <p>{pizzaPrice}</p>
    </div>
  )
}
