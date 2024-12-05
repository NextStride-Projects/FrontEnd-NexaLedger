"use client";

import "@/app/globals.css";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useResourceStore } from "@/app/store/useResourceStore";
import { fetchResources } from "@/app/utils/api";
import Button from "@/app/components/Button/Button";
import { HiChevronRight, HiCheck, HiX } from "react-icons/hi";

export default function ResourcesPage() {
  const router = useRouter();
  const { resources, setResources } = useResourceStore();
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  useEffect(() => {
    const loadResources = async () => {
      if (resources.length === 0) {
        console.log("[ResourcesPage] Cargando recursos desde la API...");
        const resourcesData = await fetchResources();
        setResources(resourcesData);
      } else {
        console.log("[ResourcesPage] Recursos ya cargados en el store.");
      }
    };

    loadResources();
  }, [resources, setResources]);

  const totalPages = Math.ceil(resources.length / itemsPerPage);
  const currentPageItems = resources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Recursos</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th className="border border-gray-300 px-4 py-2">Nombre</th>
            <th className="border border-gray-300 px-4 py-2">Cantidad</th>
            <th className="border border-gray-300 px-4 py-2">Disponibilidad</th>
            <th className="border border-gray-300 px-4 py-2">Detalles</th>
          </tr>
        </thead>
        <tbody>
          {currentPageItems.map((resource) => (
            <tr key={resource.id} className="odd:bg-white even:bg-gray-50">
              <td className="border border-gray-300 px-4 py-2">{resource.name}</td>
              <td className="border border-gray-300 px-4 py-2">{resource.size}</td>
              <td className="border border-gray-300 px-4 py-2">
                {resource.available ? <HiCheck className="text-green-600" /> : <HiX className="text-red-600" />}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Button
                  label={<HiChevronRight className="text-xl" />}
                  onClick={() => router.push(`/resources/${resource.id}`)}
                  variant="default"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}