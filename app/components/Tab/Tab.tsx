"use client";

import React from "react";
import clsx from "clsx";

interface TabProps {
  label: string;
  onClick: () => void;
  active?: boolean;
}

const Tab: React.FC<TabProps> = ({ label, onClick, active }) => {
  return (
    <div
      onClick={onClick}
      className={clsx(
        "cursor-pointer px-4 py-2 text-sm text-center transition-all duration-300 rounded-t-md",
        active
          ? "text-black font-bold border-t-2 border-l-2 border-r-2 border-primaryColor bg-white"
          : "text-black bg-gray-200 border border-primaryColor hover:bg-gray-100"
      )}
    >
      <span className="inline-block mx-6 truncate">{label}</span>
    </div>
  );
};

export default Tab;
