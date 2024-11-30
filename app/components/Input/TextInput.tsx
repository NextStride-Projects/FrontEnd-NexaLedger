"use client";

import React from "react";

interface TextInputProps {
  // value?: string;
  variant?: "disable" | "active";
  name: string;
  editable: boolean;
  type?: string;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ name, editable, type, variant = "active", onChange }) => {
  const baseStyles = "w-[250px] p-2 border rounded-md";
  const disableStyles = "border-grayColor bg-grayColor focus:border-primaryColor focus:outline-none";
  const activeStyles = "border-primaryColor focus:outline-none bg-whiteColor";

  return (
    <input
      type={type}
      // value={value}
      name={name}
      autoComplete="off"
      disabled={!editable}
      onChange={onChange}
      className={`${baseStyles} ${variant === "active" ? activeStyles : disableStyles}`}
    />
  );
};

export default TextInput;