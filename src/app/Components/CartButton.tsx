'use client';

import React from "react";
import Button from "./Button";

interface CartButtonProps {
  label: string;
  variant?: "description" | "purchase";
  onClick?: () => void; 
  isSubmitting?: boolean;
  isSubmit?: boolean;
}

const CartButton: React.FC<CartButtonProps> = ({
  label,
  variant = "purchase",
  onClick,
  isSubmitting = false,
  isSubmit = false
}) => {
  
  if (isSubmit) {
    return (
      <button
        type="submit"
        className={`${variant === "purchase" ? "bg-[var(--color-text-green)] hover:bg-green-600 text-white" : "bg-color-text-red active:bg-color-text-green sm:hover:bg-color-text-green"} p-1 rounded-md font-semibold ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={isSubmitting}
      >
        {label}
      </button>
    );
  }

  return (
    <Button
      label={label}
      variant={variant}
      onClick={onClick}
    />
  );
};

export default CartButton;