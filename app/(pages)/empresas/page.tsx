"use client";

import "@/app/globals.css";
import Image from "next/image";
import TabBar from "../../components/Containers/TabBar";
import BusinessDetails from "../../components/Steps/BusinessDetails";
import LastestMovements from "../../components/Steps/LastestMovements";
import Button from "../../components/Button/Button";
import { useState } from "react";

interface ITab {
  id: number;
  label: string;
  component: JSX.Element;
}

export default function Home() {
  const [activeTab, setActiveTab] = useState(1);

  const tabs: ITab[] = [
    { id: 1, label: "Detalles de la Empresa", component: <BusinessDetails /> },
    { id: 2, label: "Últimos Movimientos", component: <LastestMovements /> },
  ];

  const renderTabComponent = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab?.component || null;
  };

  return (
    <main className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 m-4 bg-white rounded-lg shadow-md w-full max-w-[1600px] min-h-[700px]">
        <header className="flex flex-col sm:flex-row items-center justify-between my-4 gap-4">
          <nav className="text-gray-600">
            Inventario &gt; Artículos &gt; Detalle Teclado
          </nav>
          <div className="flex flex-row items-center gap-4">
            <Button label="VOLVER" onClick={() => console.log('Volver clicked')} variant="default" />
            <Button label="EDITAR" onClick={() => console.log('Editar clicked')} variant="primary" />
          </div>
        </header>
        <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
        <div className="mt-6 text-gray-700">{renderTabComponent()}</div>
      </div>
    </main>
  );
}
