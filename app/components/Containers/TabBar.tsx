"use client";

import React from "react";
import Tab from "../Tab/Tab";

interface TabBarProps {
  tabs: { id: number; label: string }[];
  activeTab: number;
  onTabClick: (id: number) => void;
}

const TabBar: React.FC<TabBarProps> = ({ tabs, activeTab, onTabClick }) => {
  return (
    <div className="flex flex-row-reverse w-full items-end" >
      {/* Tab List */}
      <hr className="border-t border-primaryColor w-full" />

      <div className="ml-auto flex flex-row">
        {tabs.map((tab, index) => (
          <div className="flex flex-row items-end" key={tab.id}>
            <div className="w-fit flex flex-row">
              <Tab
                label={tab.label}
                onClick={() => onTabClick(tab.id)}
                active={activeTab === tab.id}
              />
              
            </div>
            <div className="h-[1px] bg-primaryColor w-[10px]"></div>
            {index !== tabs.length - 1 && (
              <hr className="border-r primaryColor h-8" />
            )}
          </div>
        ))}
      </div>
      {/* Divider */}
    </div>
  );
};

export default TabBar;