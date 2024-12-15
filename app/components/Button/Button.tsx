"use client";

import React from "react";

interface ButtonProps {
  label: React.ReactNode;
  onClick?: () => void;
  variant?: "default" | "primary";
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  label,
  onClick,
  variant = "default",
  className = "",
}) => {
  const baseStyles =
    "px-4 py-2 rounded-md text-sm font-light transition focus:outline-none";
  const defaultStyles =
    "border primaryColor text-primaryColor hover:bg-grayColor hover:border-primaryColor";
  const primaryStyles =
    "bg-primaryColor text-white border hover:bg-primaryColorDark";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${
        variant === "primary" ? primaryStyles : defaultStyles
      } ${className}`}
    >
      {label}
    </button>
  );
};

export default Button;