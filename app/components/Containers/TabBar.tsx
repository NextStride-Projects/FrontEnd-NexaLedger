"use client";

import React from "react";
// import Tab from "..";
// import './TabBar.module.css';
// import styles from "./tabBar.module.css";
import Tab from "../Tab/Tab";

interface TabBarProps {
  tabs: { id: number; label: string }[];
  activeTab: number;
  onTabClick: (id: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex flex-row-reverse w-full" style={{ alignItems: "end"}}>
      {/* Tab List */}
      <hr style={{ border: "1px solid green", width: "100%" }} />

      <div className="ml-auto flex flex-row ">
        {tabs.map((tab, index) => (
          <div className="flex flex-row items-end" key={tab.id}>
            <div  className="w-[250px] d-flex flex-row">
              <Tab
                label={tab.label}
                onClick={() => onTabClick(tab.id)}
                active={activeTab === tab.id}
              />
            </div>
            {index !== tabs.length - 1 && (
              <hr style={{ border: "1px solid green", width: "10%" }} />
            )}
          </div>
        ))}
      </div>
      {/* Divider */}
    </div>
  );
};

export default TabBar;
