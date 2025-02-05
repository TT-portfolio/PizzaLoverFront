import React from "react";

interface ButtonProps {
    text: string;
    onClick: () => void;
}

const Button: React.FC<ButtonProps> = ({ text, onClick }) => {
    return (
        <button onClick={onClick} className="bg-gray-300 hover:bg-gray-500 p-2 rounded-md font-semibold hover:text-white">
            {text}
        </button>
    );
};

export default Button;