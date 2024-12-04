"use client";

import React from "react";

interface CheckInputProps {
  label: string;
  value?: boolean | string;
  variant?: "disable" | "active";
  name: string;
  editable: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: string;
}

const CheckInput: React.FC<CheckInputProps> = ({ label, name, editable, variant = "active", onChange, style, value }) => {
  const baseStyles = "w-5 h-5";
  const disableStyles = "bg-primaryColor border-gray-400 cursor-not-allowed";
  const activeStyles = "bg-primaryColor border-primaryColor cursor-pointer";

  return (
    <div className="flex gap-2">
      <label htmlFor={name} className="text-gray-700">{label}</label>
      <input
        type="checkbox"
        name={name}
        checked={value? true : false}
        disabled={!editable}
        onChange={onChange}
        className={`${baseStyles} ${variant === "active" ? activeStyles : disableStyles} ${style}`}
      />
    </div>
  );
};

export default CheckInput;