"use client";

import React, { useState } from "react";
import { HiMenu } from "react-icons/hi";

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`flex flex-col items-start justify-start ${
        isOpen ? "w-[100px]" : "w-[40px]"
      } bg-primaryColor text-white transition-width duration-300 ease-in-out`}
      style={{ position: "fixed", top: 0, left: 0, height: "100%" }}
    >
      {/* Botón del menú */}
      <button
        className="p-2 hover:bg-opacity-70 rounded"
        onClick={() => setIsOpen(!isOpen)}
      >
        <HiMenu className="text-2xl" />
      </button>

      {/* Contenido del sidebar */}
      {isOpen && (
        <div className="flex flex-col items-center mt-4">
          <a href="#" className="py-2 hover:bg-opacity-70 px-4 rounded">
            Link 1
          </a>
          <a href="#" className="py-2 hover:bg-opacity-70 px-4 rounded">
            Link 2
          </a>
          <a href="#" className="py-2 hover:bg-opacity-70 px-4 rounded">
            Link 3
          </a>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
