import { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

interface ButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
}

export default function Button({
  children,
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      className={clsx(
        "px-5 py-2 rounded-xl bg-blue-600 text-white font-medium",
        "hover:bg-blue-700 transition-all duration-200",
        "disabled:opacity-50",
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
}