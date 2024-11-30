"use client";

import React from "react";

interface TextInputProps {
  value: string;
  name: string;
  editable: boolean;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const TextInput: React.FC<TextInputProps> = ({ value, name, editable, onChange }) => {
  return (
    <input
      type="text"
      value={value}
      name={name}
      disabled={!editable}
      onChange={onChange}
      className="w-[250px] p-2 border border-grayColor rounded-md focus:border-primaryColor focus:outline-none"
    />
  );
};

export default TextInput;