"use client";

import React from "react";
import clsx from "clsx";
// import './tab.module.css';
// import styles from "./tab.module.css";

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
        "cursor-pointer px-2 py-2 text-sm text-center transition-all duration-300",
        active
          ? "text-black font-bold "
          : "text-black bg-gray-200 hover:bg-gray-100"
      )}
      style={{
        borderTop: "1.9px solid green",
        borderLeft: "1.9px solid green",
        borderRight: "1.9px solid green",
        borderTopLeftRadius: "5px",
        borderTopRightRadius: "5px",
        borderBottom: active ? "1.9px solid white" : "1.9px solid green",
      }}
    >
      <div className="mx-6">{label}</div>
    </div>
  );
};

export default Tab;
