'use client';

import React, { Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

const OrderConfirmationContent: React.FC = () => {
  const searchParams = useSearchParams();
  const orderId = searchParams.get('orderId');
  const orderNo = searchParams.get('orderNo');

  if (!orderId || !orderNo) {
    return (
      <div className="container mx-auto max-w-2xl p-4 text-center">
        <h1 className="text-2xl font-bold mb-4">Order Information Saknas</h1>
        <p className="mb-4">Vi kunde inte hitta din beställningsinformation.</p>
        <Link href="/menu" aria-label="Gå till kundvagn">
          <button className="bg-[var(--color-text-red)] text-white px-4 py-2 rounded hover:bg-[#e00f32] transition-colors">
            Tillbaka till menyn
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-2xl p-4 mt-10">
      <div className="bg-white rounded-lg shadow-lg p-8 text-center border-2 border-[var(--color-text-green)]">
        <div className="flex justify-center mb-6">
          <div className="w-24 h-24 bg-[var(--color-text-green)] rounded-full flex items-center justify-center">
            <svg
              className="w-16 h-16 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={3}
                d="M5 13l4 4L19 7"
              />
            </svg>
          </div>
        </div>

        <h1 className="text-3xl font-bold mb-3 text-[var(--color-text-green)]">Tack för din beställning!</h1>
        <p className="text-gray-800 text-lg mb-6">Din beställning har tagits emot och bearbetas nu.</p>

        <div className="mb-6 p-6 bg-[#f8f9fa] rounded-lg border border-gray-200">
          <p className="mb-3 text-lg">
            <span className="font-bold">Ordernummer:</span> {orderNo}
          </p>
       
        </div>

        <div className="p-4 bg-[#e8f5e9] rounded-lg mb-8 border border-[var(--color-text-green)]">
          <p className="text-[var(--color-text-green)] font-semibold text-lg">
            Din beställning kommer att vara klar för avhämtning inom ca 30 minuter.
          </p>
        </div>

        <Link href="/Menu" aria-label="Gå till kundvagn">
          <button className="bg-[var(--color-text-red)] text-white px-6 py-3 rounded-md text-lg font-semibold hover:bg-[#e00f32] transition-colors">
            Tillbaka till menyn
          </button>
        </Link>
      </div>
    </div>
  );
};

const OrderConfirmationPage: React.FC = () => (
  <Suspense fallback={<div>Laddar beställning...</div>}>
    <OrderConfirmationContent />
  </Suspense>
);

export default OrderConfirmationPage;

