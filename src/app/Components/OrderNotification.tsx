'use client';

import React, { useEffect } from 'react';
import { useCart } from '@/context/CartContext';

const OrderNotification = () => {
  const { notification, hideNotification } = useCart();
  const { isVisible, itemName, itemQuantity } = notification;
  
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;
    if (isVisible) {
      timer = setTimeout(() => {
        hideNotification();
      }, 3000); // Auto-close after 3 seconds
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isVisible, hideNotification]);

  if (!isVisible) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-sm w-full border-2 border-[var(--color-text-green)] border-dotted animate-fadeIn z-50">
      <div className="flex items-center">
        <div className="bg-[var(--color-text-green)] p-2 rounded-full mr-3">
          <svg 
            xmlns="http://www.w3.org/2000/svg" 
            className="h-6 w-6 text-white" 
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" 
            />
          </svg>
        </div>
        <div className="flex-1">
          <h3 className="font-bold text-[var(--color-text-green)]">Tillagt i kundvagn!</h3>
          <p className="text-gray-600">{itemQuantity}x {itemName}</p>
        </div>
        <button 
          onClick={hideNotification}
          className="text-gray-400 hover:text-gray-600"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <div className="mt-3 flex justify-between">
        <button 
          onClick={hideNotification}
          className="text-gray-600 hover:underline"
        >
          Fortsätt handla
        </button>
        <a 
          href="/cart" 
          className="bg-[var(--color-text-red)] text-white px-4 py-2 rounded-md hover:bg-red-600"
        >
          Till kundvagn
        </a>
      </div>
    </div>
  );
};

export default OrderNotification;