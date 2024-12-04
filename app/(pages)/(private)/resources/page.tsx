"use client";

import "@/app/globals.css";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { HiChevronRight } from "react-icons/hi";
import { HiCheck, HiX } from "react-icons/hi";
import Button from "@/app/components/Button/Button";
import resources from "@/app/utils/dataFake/resources";

export default function ResourcesPage() {
  const router = useRouter();

  const [currentPage, setCurrentPage] = useState(1);
  const [sortBy, setSortBy] = useState<"name" | "size" | null>(null);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const itemsPerPage = 10;

  const sortedResources = [...resources].sort((a, b) => {
    if (!sortBy) return 0;
    const fieldA = a[sortBy];
    const fieldB = b[sortBy];
    const orderMultiplier = sortOrder === "asc" ? 1 : -1;

    if (typeof fieldA === "string" && typeof fieldB === "string") {
      return fieldA.localeCompare(fieldB) * orderMultiplier;
    }
    if (typeof fieldA === "number" && typeof fieldB === "number") {
      return (fieldA - fieldB) * orderMultiplier;
    }
    return 0;
  });

  const totalItems = sortedResources.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const currentPageItems = sortedResources.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSorting = (field: "name" | "size") => {
    if (sortBy === field) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortOrder("asc");
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div>
      <h1 className="text-2xl font-bold text-gray-800 mb-6">Recursos</h1>
      <table className="table-auto w-full border-collapse border border-gray-300">
        <thead>
          <tr className="bg-gray-200 text-left">
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSorting("name")}
            >
              Nombre {sortBy === "name" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
            <th
              className="border border-gray-300 px-4 py-2 cursor-pointer"
              onClick={() => handleSorting("size")}
            >
              Cantidad {sortBy === "size" ? (sortOrder === "asc" ? "↑" : "↓") : ""}
            </th>
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
                {resource.available ? (
                  <HiCheck className="text-green-600" />
                ) : (
                  <HiX className="text-red-600" />
                )}
              </td>
              <td className="border border-gray-300 px-4 py-2">
                <Button
                  label={<HiChevronRight className="text-xl" />}
                  onClick={() => router.push(`/resources/${resource.id}`)}
                  variant="default"
                  className="border-none"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-between items-center mt-4">
        <button
          disabled={currentPage === 1}
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-4 py-2 border rounded ${currentPage === 1 ? "opacity-50" : "bg-primaryColor text-white"}`}
        >
          <HiChevronRight className="transform rotate-180 text-white" />
        </button>
        <span>
          Pagina {currentPage} de {totalPages}
        </span>
        <button
          disabled={currentPage === totalPages}
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-4 py-2 border rounded ${currentPage === totalPages ? "opacity-50" : "bg-primaryColor text-white"}`}
        >
          <HiChevronRight className="text-white" />
        </button>
      </div>
    </div>
  );
}