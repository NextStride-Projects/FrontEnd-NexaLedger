"use client";

import "@/app/globals.css";
import Button from "../../../components/Button/Button";


export default function Dashboard() {

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
      </div>
    </main>
  );
}