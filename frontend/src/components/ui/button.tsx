import * as React from "react";

// Utilidad interna (NO se exporta)
function cn(...classes: (string | false | null | undefined)[]) {
  return classes.filter(Boolean).join(" ");
}

// Variantes internas (NO se exportan)
const buttonVariants = {
  default:
    "bg-blue-600 text-white hover:bg-blue-700 px-4 py-2 rounded-lg transition",
  outline:
    "border border-gray-600 text-gray-600 hover:bg-gray-50 px-4 py-2 rounded-lg transition",
  ghost:
    "text-gray-700 hover:bg-gray-100 px-4 py-2 rounded-lg transition",
  destructive:
    "bg-red-600 text-white hover:bg-red-700 px-4 py-2 rounded-lg transition",
  link: "text-blue-600 underline-offset-4 hover:underline",
};

type ButtonVariant = keyof typeof buttonVariants;
type ButtonSize = "sm" | "md" | "lg";

interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
}

// 👉 ÚNICO EXPORT (React Refresh 🔥 no da error)
export function Button({
  className = "",
  variant = "default",
  size = "md",
  ...props
}: ButtonProps) {
  const sizeClasses =
    size === "lg"
      ? "text-lg py-3 px-6"
      : size === "sm"
      ? "text-sm py-1 px-3"
      : "text-base py-2 px-4";

  return (
    <button
      className={cn(buttonVariants[variant], sizeClasses, className)}
      {...props}
    />
  );
}
