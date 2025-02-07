import React from "react"
import {ButtonProps} from "@/types/button"

const Button: React.FC<ButtonProps> = ({label, onClick})=> {
    return (
        <button onClick={onClick} className="bg-color-text-red p-1 rounded-md active:bg-color-text-green">
            {label}
        </button>
    )
}; export default Button;