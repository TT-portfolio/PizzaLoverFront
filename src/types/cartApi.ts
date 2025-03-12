// src/types/cartApi.ts

import { Order } from "@/context/CartContext";

export interface OrderResponse {
  message: string;
  orderId: string;
  orderNo: string;
}
export const createOrder = async (order: Order): Promise<OrderResponse> => {
  try {
    console.log("Sending order data:", JSON.stringify(transformOrderData(order)));
    
    const response = await fetch("https://pizzafunctions.azurewebsites.net/api/CreateOrder", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformOrderData(order)),
    }).catch(err => {
      console.error("Network error details:", err);
      throw err;
    });

    console.log("Response status:", response.status);
    
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Kunde inte skapa beställning');
    }

    return await response.json(); // Returns data
  } catch (error) {
    console.error('Full error details:', error);
    throw error;
  }
};

export const transformOrderData = (order: Order) => {
  return {
    customer: {
      name: order.customer.name,
      email: order.customer.email || '',
      phone: order.customer.phone || '',
      address: order.customer.address || '',
    },
    items: order.items.map(item => ({
      name: item.name,
      quantity: item.quantity,
      price: item.price
    }))
  };
};