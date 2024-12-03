"use client";

import "@/app/globals.css";
import Button from "../../../components/Button/Button";

interface IResourcesColumn {
  id: number;
  name: string; 
  size: number;
  location: string;
  available: boolean;
}

export default function ResourcesPage() {
  const resourcesColumn: IResourcesColumn[] = [
    { id: 1, name: "Teclado Inalámbrico", size: 150, location: "Madrid", available: true },
    { id: 2, name: "Silla Ergonómica", size: 76, location: "Barcelona", available: true },
    { id: 3, name: "Papel A4 500 hojas", size: 500, location: "Madrid", available: false },
  ];

  return (
    <>
    {/* // <div className=""> */}
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Inventario</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Ubicación</th>
            <th className="border border-gray-300 px-4 py-2">Disponibilidad</th>
            <th className="border border-gray-300 px-4 py-2">Acciones</th>
          </tr>
        </thead>
        <tbody>
          {resourcesColumn.map((resource) => (
            <tr key={resource.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{resource.name}</td>
              <td className="border border-gray-300 px-4 py-2">{resource.size}</td>
              <td className="border border-gray-300 px-4 py-2">{resource.location}</td>
              <td className="border border-gray-300 px-4 py-2">
                {resource.available ? (
                  <span className="text-green-600 font-semibold">Disponible</span>
                ) : (
                  <span className="text-red-600 font-semibold">No Disponible</span>
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Button
                  label="Ver detalles"
                  onClick={() => console.log(`Detalles de ${resource.name}`)}
                  variant="primary"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    {/* </div> */}
    </>
  );
}