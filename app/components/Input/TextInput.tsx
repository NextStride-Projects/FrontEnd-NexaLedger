"use client";

import React from "react";

interface TextInputProps {
  label: string;
  value?: string | number;
  variant?: "disable" | "active";
  name: string;
  editable: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  style?: string;
  // id?: string;
  isTextArea?: boolean;
}

const TextInput: React.FC<TextInputProps> = ({ label, name, editable, type, variant = "active", onChange, style, value }) => {
  const baseStyles = "w-[250px] p-2 border rounded-md";
  const disableStyles = "border-grayColor bg-grayColor focus:border-primaryColor focus:outline-none w-full";
  const activeStyles = "border-primaryColor focus:outline-none bg-whiteColor w-full";

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        name={name}
        autoComplete="off"
        // Invert the logic for 'disabled'. Now it's disabled when editable is false.
        disabled={!editable}
        onChange={onChange}
        className={`${baseStyles} ${variant === "active" ? activeStyles : disableStyles}`}
      />
    </div>
  );
};

export default TextInput;