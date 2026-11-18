import type { ButtonHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "light" | "outline";
type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  children: ReactNode;
};

export function Button({ variant = "primary", className = "", children, ...props }: ButtonProps) {
  return <button className={`farm-button farm-button-${variant} ${className}`.trim()} {...props}>{children}</button>;
}
