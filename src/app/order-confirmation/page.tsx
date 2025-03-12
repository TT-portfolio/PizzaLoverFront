'use client';

import React from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const OrderConfirmation: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderNo = searchParams.get('orderNo');

  if (!orderId || !orderNo) {
    return (
      <div className="container mx-auto max-w-2xl p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Information Saknas</h1>
        <p className="mb-4">Vi kunde inte hitta din beställningsinformation.</p>
        <Link href="/menu">
          <button className="bg-[var(--color-text-red)] text-white px-4 py-2 rounded hover:bg-color-text-green">
            Tillbaka till menyn
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <div className="bg-white rounded-lg shadow-md p-6 text-center">
        <svg
          className="w-16 h-16 text-[var(--color-text-green)]"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
        
        <h1 className="text-2xl font-bold mb-2">Tack för din beställning!</h1>
        <p className="text-gray-600 mb-6">Din beställning har tagits emot och bearbetas nu.</p>
        
        <div className="mb-6 p-4 bg-gray-100 rounded-lg">
          <p className="mb-2">
            <span className="font-medium">Order nummer:</span> {orderNo}
          </p>
          <p>
            <span className="font-medium">Order ID:</span> {orderId}
          </p>
        </div>
        
        <p className="text-gray-600 mb-6">
          Din beställning kommer att vara klar för avhämtning inom 10 minuter en kvart.
        </p>
        
        <Link href="/Menu">
          <button className="bg-[var(--color-text-red)] text-white px-6 py-3 rounded hover:bg-color-text-red">
            Tillbaka till menyn
          </button>
        </Link>
      </div>
    </div>
  );
};

export default OrderConfirmation;