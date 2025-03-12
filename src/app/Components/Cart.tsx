'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useCart } from '@/context/CartContext';
import { createOrder } from '@/types/cartApi';
import CartButton from './CartButton';

const Cart: React.FC = () => {
  const { items, customer, totalPrice, updateCustomer, clearCart, updateQuantity, removeFromCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  // Handling changes in customer form
  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCustomer({ ...customer, [name]: value });
  };

  // Handling order process
  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!customer.name) {
      setError('Vänligen ange ditt namn');
      return;
    }
    
    if (items.length === 0) {
      setError('Din kundvagn är tom');
      return;
    }
    
    setIsSubmitting(true);
    setError(null);
    
    try {
      const orderData = {
        customer: customer,
        items: items
      };
      
      const response = await createOrder(orderData);
      
      // Clears cart when order is successful
      clearCart();
      
      // Takes customer to confirmation page
      router.push(`/order-confirmation?orderId=${response.orderId}&orderNo=${response.orderNo}`);
    } catch (err) {
      setError('Ett fel uppstod vid beställningen. Försök igen.');
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-6">Din kundvagn</h1>
      
      {items.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Din kundvagn är tom</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border-b">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-600">{item.price.toFixed(2)} kr</p>
                </div>
                
                <div className="flex items-center space-x-3">
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  >
                    -
                  </button>
                  
                  <span>{item.quantity}</span>
                  
                  <button 
                    className="w-8 h-8 rounded-full bg-gray-200 flex items-center justify-center"
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>
                
                <div className="ml-4 text-right">
                  <p className="font-medium">{(item.price * item.quantity).toFixed(2)} kr</p>
                  <button 
                    className="text-red-500 text-sm mt-1"
                    onClick={() => removeFromCart(item.id)}
                  >
                    Ta bort
                  </button>
                </div>
              </div>
            ))}
            
            <div className="p-4 border-t">
              <div className="flex justify-between font-bold">
                <span>Totalt:</span>
                <span>{totalPrice.toFixed(2)} kr</span>
              </div>
            </div>
          </div>
          
          <form onSubmit={handleCheckout} className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-bold mb-4">Dina uppgifter</h2>
            
            {error && (
              <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                {error}
              </div>
            )}
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Namn *
              </label>
              <input
                type="text"
                id="name"
                name="name"
                value={customer.name}
                onChange={handleCustomerChange}
                className="w-full p-2 border rounded"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="phone">
                Telefon
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={customer.phone || ''}
                onChange={handleCustomerChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <div className="mb-6">
              <label className="block text-gray-700 mb-2" htmlFor="address">
                Adress
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={customer.address || ''}
                onChange={handleCustomerChange}
                className="w-full p-2 border rounded"
              />
            </div>
            
            <CartButton
                variant="purchase"
                label={isSubmitting ? 'Bearbetar...' : 'Slutför beställning'}
                isSubmitting={isSubmitting}
                isSubmit={true}
/>
          </form>
        </>
      )}
    </div>
  );
};

export default Cart;