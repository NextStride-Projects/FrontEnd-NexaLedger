"use client";

import Pagination from "@/app/components/Table/pagination";
import ItemsPerPageSelector from "@/app/components/Table/itemsPerPageSelector";
import { useState, useMemo, useEffect } from "react";
import axios from "axios";
import { getCookie } from "@/app/utils/functions/cookies";
import { IMovementWithUsername } from "@/app/utils/interfaces/movement/movement";

interface MovementsProps {
  movements: IMovementWithUsername[];
}

export default function Movements({ movements }: MovementsProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const paginatedMovements = useMemo(() => {
    if (!Array.isArray(movements) || movements.length === 0) {
      return [];
    }
    const startIndex = (currentPage - 1) * itemsPerPage;
    return movements.slice(startIndex, startIndex + itemsPerPage);
  }, [movements, currentPage, itemsPerPage]);

  return (
    <div>
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="rounded-lg text-sm overflow-auto h-[400px] flex items-start justify-center">
        {paginatedMovements.length > 0 ? (
          <table className="w-full bg-white">
            <thead className="bg-primaryColor text-white">
              <tr>
                <th className="px-4 py-2 text-left font-medium">Fecha</th>
                <th className="px-4 py-2 text-left font-medium">Usuario</th>
                <th className="px-4 py-2 text-left font-medium">Tipo</th>
                <th className="px-4 py-2 text-left font-medium">Descripción</th>
              </tr>
            </thead>
            <tbody>
              {paginatedMovements.map((movement, index) => (
                <tr
                  key={`${movement.resourceId}-${index}`}
                  className={`hover:bg-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 text-gray-900">
                    {new Date(movement.timestamp).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2 text-gray-900">
                    {movement.username || "Usuario desconocido"}
                  </td>
                  <td className="px-4 py-2 text-gray-900">{movement.type}</td>
                  <td className="px-4 py-2 text-gray-900">
                    {movement.description}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay movimientos registrados.</p>
        )}
      </div>
      <Pagination
        totalPages={Math.ceil(movements.length / itemsPerPage)}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
