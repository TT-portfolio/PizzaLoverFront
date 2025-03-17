'use client';

import React from 'react';
import Link from 'next/link';
import { useCart } from '@/context/CartContext';

const CartIcon: React.FC = () => {
  const { totalItems, totalPrice } = useCart();

  return (
    <Link href="/cart" aria-label="Gå till kundvagn">
      <div className="relative flex items-center cursor-pointer">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          className="h-6 w-6" 
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
        
        {totalItems > 0 && (
          <span className="absolute -top-2 -right-2 bg-[var(--color-text-green)] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {totalItems}
          </span>
        )}
        
        {totalItems > 0 && (
          <span className="ml-2 hidden md:inline-block">
            {totalPrice.toFixed(2)} kr
          </span>
        )}
      </div>
    </Link>
  );
};

export default CartIcon;