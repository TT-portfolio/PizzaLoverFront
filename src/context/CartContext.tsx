'use client'
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Pizza } from "@/types/pizza";

export interface CartItem {
  id: string;
  name: string;
  quantity: number;
  price: number;
}

export interface Customer {
  firstName: string;
  lastName: string;
  email?: string;
  phoneNumber?: string;
  address?: string;
}

export interface Order {
  orderId?: string;
  orderNo?: string;
  customer: Customer;
  items: CartItem[];
}

interface CartContextType {
  items: CartItem[];
  customer: Customer;
  addToCart: (pizza: Pizza, quantity: number) => void;
  removeFromCart: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  updateCustomer: (customer: Customer) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

interface CartProviderProps {
  children: ReactNode;
}

export const CartProvider: React.FC<CartProviderProps> = ({ children }) => {
  const [items, setItems] = useState<CartItem[]>([]);
  const [customer, setCustomer] = useState<Customer>({ firstName: '', lastName: '' });
  const [totalItems, setTotalItems] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  // Load cart from localStorage on mount
  useEffect(() => {
    const savedCart = localStorage.getItem('pizzaCart');
    const savedCustomer = localStorage.getItem('pizzaCustomer');
    
    if (savedCart) {
      setItems(JSON.parse(savedCart));
    }
    
    if (savedCustomer) {
      setCustomer(JSON.parse(savedCustomer));
    }
  }, []);

  // Save cart to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pizzaCart', JSON.stringify(items));
    
    // Calculate totals
    const itemCount = items.reduce((sum, item) => sum + item.quantity, 0);
    const price = items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    
    setTotalItems(itemCount);
    setTotalPrice(price);
  }, [items]);

  // Save customer to localStorage when it changes
  useEffect(() => {
    localStorage.setItem('pizzaCustomer', JSON.stringify(customer));
  }, [customer]);

  const addToCart = (pizza: Pizza, quantity: number) => {
    const newItem: CartItem = {
      id: pizza.id,
      name: pizza.properties.pizzaName,
      price: pizza.properties.pizzaPrice,
      quantity: quantity
    };

    setItems(prevItems => {
      // Check if item already exists in cart
      const existingItemIndex = prevItems.findIndex(item => item.id === newItem.id);
      
      if (existingItemIndex >= 0) {
        // Update existing item
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity
        };
        return updatedItems;
      } else {
        // Add new item
        return [...prevItems, newItem];
      }
    });
  };

  const removeFromCart = (id: string) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id: string, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(id);
      return;
    }
    
    setItems(prevItems => 
      prevItems.map(item => 
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setItems([]);
  };

  const updateCustomer = (newCustomer: Customer) => {
    setCustomer({ ...customer, ...newCustomer });
  };

  return (
    <CartContext.Provider value={{
      items,
      customer,
      addToCart,
      removeFromCart,
      updateQuantity,
      clearCart,
      updateCustomer,
      totalItems,
      totalPrice
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = (): CartContextType => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};