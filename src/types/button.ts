export interface ButtonProps {
    label: string;
    variant?: "description" | "purchase";
    onClick?: () => void;
}