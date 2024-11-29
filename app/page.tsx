"use client";

import "@/app/globals.css";
import Image from "next/image";
import TabBar from "./components/Containers/TabBar";
import { useState } from "react";
import BusinessDetails from "./components/Steps/BusinessDetails";
import LastestMovements from "./components/Steps/LastestMovements";

interface ITab {
  id: number;
  label: string;
  component: JSX.Element;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);
  const tabs: ITab[] = [
    { id: 1, label: "Detalles de la Empresa", component: <BusinessDetails /> },
    { id: 2, label: "Ultimos Movimientos", component: <LastestMovements /> },
  ];

  const renderTabComponent = () => {
    const currentTab: ITab = tabs.filter((tab) => tab.id === activeTab)[0];

    return currentTab.component;
  };

  return (
    <main className="d-flex flex-col align-items justify-center">
      <div className="p-8 m-8  bg-white min-h-[500px]">
        <header className="flex flex-row items-center justify-between my-4">
          <nav>{"Inventario > Artículos > Detalle Teclado "}</nav>
          <div className="flex flex-row items-center gap-6">
            <button
              style={{
                border: "1.9px solid green",
                borderRadius: "5px",
                paddingBlock: 2,
                paddingInline: 20,
                color: "green",
                fontWeight: 300,
                fontSize: "14px",
              }}
            >
              VOLVER
            </button>
            <button
              style={{
                background: "green",
                color: "white",
                paddingBlock: 2,
                paddingInline: 20,
                fontWeight: 300,
                fontSize: "14px",
                borderRadius: "5px",
                border: "1.9px solid green",
              }}
            >
              EDITAR
            </button>
          </div>
        </header>
        <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div className="mt-4">
          <div className="text-gray-700">{renderTabComponent()}</div>
        </div>
      </div>
    </main>
  );
}
