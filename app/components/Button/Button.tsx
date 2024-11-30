"use client";

import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  variant?: "default" | "primary";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, variant = "default" }) => {
  const baseStyles = "px-4 py-2 rounded-md text-sm font-light transition";
  const defaultStyles = "border primaryColor text-primaryColor hover:bg-grayColor hover:border-primaryColor";
  const primaryStyles = "bg-primaryColor text-white border hover:bg-primaryColorDark";

  return (
    <button
      onClick={onClick}
      className={`${baseStyles} ${variant === "primary" ? primaryStyles : defaultStyles}`}
    >
      {label}
    </button>
  );
};

export default Button;