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
  const [fieldErrors, setFieldErrors] = useState({
    firstName: false,
    lastName: false,
    phoneNumber: false,
    address: false,
    email: false
  });
  const router = useRouter();

  const handleCustomerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    updateCustomer({ ...customer, [name]: value });
    
    // Clear field-specific error when the user types in that field
    if (fieldErrors[name as keyof typeof fieldErrors]) {
      setFieldErrors({
        ...fieldErrors,
        [name]: false
      });
    }
    
    // Clear general error message when typing in any field
    if (error) {
      setError(null);
    }
  };

  // Validate fom 
  const validateForm = () => {
    //  check each field to ensure proper validation
    const newFieldErrors = {
      firstName: !customer.firstName?.trim(),
      lastName: !customer.lastName?.trim(),
      phoneNumber: !customer.phoneNumber?.trim(),
      address: !customer.address?.trim(),
      email: !customer.email?.trim()
    };
    
    // Set field errors immediately
    setFieldErrors(newFieldErrors);
    
    // Highlight all empty fields with red border
    Object.entries(newFieldErrors).forEach(([field, hasError]) => {
      if (hasError) {
        const inputElement = document.getElementById(field);
        if (inputElement) {
          inputElement.classList.add('border-red-500');
          inputElement.focus(); 
        }
      }
    });
    
    // Return true if all fields are valid (no errors)
    return !Object.values(newFieldErrors).some(hasError => hasError);
  };

  const handleCheckout = async (e: React.FormEvent) => {
    e.preventDefault();    
    
    // Validate form
    const isValid = validateForm();
    
    if (!isValid) {
      setError('Vänligen fyll i alla obligatoriska fält.');
     
      const firstInvalidField = Object.entries(fieldErrors)
        .find(([_, hasError]) => hasError)?.[0];
        
      if (firstInvalidField) {
        const inputElement = document.getElementById(firstInvalidField);
        if (inputElement) {
          setTimeout(() => {
            inputElement.focus();
            window.scrollBy(0, -100);
          }, 100);
        }
      }
      
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
            
      clearCart();
      
      // Takes you to confirmation page
      router.push(`/order-confirmation?orderId=${response.orderId}&orderNo=${response.orderNo}`);
    } catch (err) {
      setError('Ett fel uppstod vid beställningen. Försök igen.');
      console.error('Checkout error:', err);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Mandatory fields styling
  const requiredFieldStyle = "after:content-['*'] after:ml-0.5 after:text-red-500";
  
  return (
    <div className="container mx-auto max-w-2xl p-4">
      <h1 className="text-2xl font-bold mb-6">Din kundvagn</h1>
      
      {items.length === 0 ? (
        <div className="py-8">
          <p className="text-gray-800">Din kundvagn är tom</p>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-lg shadow-md mb-6">
            {items.map(item => (
              <div key={item.id} className="flex justify-between items-center p-4 border-b">
                <div className="flex-1">
                  <h3 className="font-medium">{item.name}</h3>
                  <p className="text-gray-800">{item.price.toFixed(2)} kr</p>
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
          
          <form onSubmit={handleCheckout} className="bg-white rounded-lg shadow-md p-6" noValidate>
            <h2 className="text-xl font-bold mb-4">Dina uppgifter</h2>
            <p className="text-sm text-gray-800 mb-4">Fält markerade med <span className="text-red-500">*</span> är obligatoriska</p>
            
            {error && (
              <div className="bg-red-100 border-2 border-red-500 text-red-700 px-4 py-3 rounded-md mb-4">
                <div className="flex items-center">
                  <svg className="w-5 h-5 mr-2 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <p className="font-bold">{error}</p>
                </div>
                <p className="text-sm mt-2 ml-7">Kontrollera att alla obligatoriska fält är ifyllda.</p>
              </div>
            )}
            
            <div className="mb-4">
              <label className={`block text-gray-800 mb-2 ${requiredFieldStyle}`} htmlFor="firstName">
                Förnamn
              </label>
              <input
                type="text"
                id="firstName"
                name="firstName"
                value={customer.firstName || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 border rounded ${fieldErrors.firstName ? 'border-red-500 bg-red-50' : ''}`}
                required
                aria-invalid={fieldErrors.firstName}
                aria-describedby={fieldErrors.firstName ? 'firstName-error' : undefined}
              />
              {fieldErrors.firstName && (
                <p id="firstName-error" className="text-red-500 text-xs mt-1 font-semibold">Vänligen ange ditt förnamn</p>
              )}
            </div>

            <div className="mb-4">
              <label className={`block text-gray-800 mb-2 ${requiredFieldStyle}`} htmlFor="lastName">
                Efternamn
              </label>
              <input
                type="text"
                id="lastName"
                name="lastName"
                value={customer.lastName || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 border rounded ${fieldErrors.lastName ? 'border-red-500 bg-red-50' : ''}`}
                required
                aria-invalid={fieldErrors.lastName}
                aria-describedby={fieldErrors.lastName ? 'lastName-error' : undefined}
              />
              {fieldErrors.lastName && (
                <p id="lastName-error" className="text-red-500 text-xs mt-1 font-semibold">Vänligen ange ditt efternamn</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className={`block text-gray-800 mb-2 ${requiredFieldStyle}`} htmlFor="phoneNumber">
                Telefon
              </label>
              <input
                type="tel"
                id="phoneNumber"
                name="phoneNumber"
                value={customer.phoneNumber || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 border rounded ${fieldErrors.phoneNumber ? 'border-red-500 bg-red-50' : ''}`}
                required
                aria-invalid={fieldErrors.phoneNumber}
                aria-describedby={fieldErrors.phoneNumber ? 'phone-error' : undefined}
              />
              {fieldErrors.phoneNumber && (
                <p id="phone-error" className="text-red-500 text-xs mt-1 font-semibold">Vänligen ange ditt telefonnummer</p>
              )}
            </div>
            
            <div className="mb-4">
              <label className={`block text-gray-800 mb-2 ${requiredFieldStyle}`} htmlFor="email">
                E-post
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={customer.email || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 border rounded ${fieldErrors.email ? 'border-red-500 bg-red-50' : ''}`}
                required
                aria-invalid={fieldErrors.email}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && (
                <p id="email-error" className="text-red-500 text-xs mt-1 font-semibold">Vänligen ange din e-postadress</p>
              )}
            </div>
            
            <div className="mb-6">
              <label className={`block text-gray-800 mb-2 ${requiredFieldStyle}`} htmlFor="address">
                Adress
              </label>
              <input
                type="text"
                id="address"
                name="address"
                value={customer.address || ''}
                onChange={handleCustomerChange}
                className={`w-full p-2 border rounded ${fieldErrors.address ? 'border-red-500 bg-red-50' : ''}`}
                required
                aria-invalid={fieldErrors.address}
                aria-describedby={fieldErrors.address ? 'address-error' : undefined}
              />
              {fieldErrors.address && (
                <p id="address-error" className="text-red-500 text-xs mt-1 font-semibold">Vänligen ange din adress</p>
              )}
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