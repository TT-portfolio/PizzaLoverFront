import React from "react";
import { ButtonProps } from "@/types/button";

const Button: React.FC<ButtonProps> = ({
    label,
    variant = "description",
    onClick,
}) => {
    const buttonColors = {
        description: "bg-color-text-red active:bg-color-text-green sm:hover:bg-color-text-green",
        purchase: "bg-[var(--color-text-green)] hover:bg-[var(--green-hover)] text-white",
    };

    return (
        <button
            data-test="toggleButton"
            onClick={onClick}
            className={`${buttonColors[variant]} p-1 rounded-md font-semibold`}>
            {label}
        </button>
    );
};
export default Button;
