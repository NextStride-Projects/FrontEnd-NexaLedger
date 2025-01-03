"use client";

import React, { useState, useMemo } from "react";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import Pagination from "./pagination";
import ItemsPerPageSelector from "./itemsPerPageSelector";
import SortableHeader from "./sortableHeader";
import InventoryRow from "./inventoryRow";
import Link from "next/link";

interface InventoryTableProps {
  inventory: IResource[];
}

export default function InventoryTable({ inventory }: InventoryTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState<"name" | "size">("name");
  const [sortDirection, setSortDirection] = useState<"asc" | "desc">("asc");
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const sortedAndPaginatedInventory = useMemo(() => {
    const sortedInventory = [...inventory].sort((a, b) => {
      if (sortBy === "name") {
        return sortDirection === "asc"
          ? a.name.localeCompare(b.name)
          : b.name.localeCompare(a.name);
      } else if (sortBy === "size") {
        return sortDirection === "asc" ? a.size - b.size : b.size - a.size;
      }
      return 0;
    });

    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedInventory.slice(startIndex, endIndex);
  }, [inventory, currentPage, itemsPerPage, sortBy, sortDirection]);

  const totalPages = Math.ceil(inventory.length / itemsPerPage);

  const handleSort = (field: "name" | "size") => {
    if (sortBy === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortBy(field);
      setSortDirection("asc");
    }
  };

  return (
    <div>
      <div className="flex justify-between mb-6">
        <h2 className="text-xl font-semibold text-black">Inventario</h2>
        <div className="relative">
          <button
            className="bg-primaryColor text-white rounded px-3 py-2 hover:bg-primaryColorDark"
            onClick={toggleDropdown}
          >
            Añadir
          </button>
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded shadow-lg">
              <Link
                href="/resources/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Añadir Objeto en Inventario
              </Link>
              <Link
                href="/movements/register"
                className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
              >
                Añadir Movimiento
              </Link>
            </div>
          )}
        </div>
      </div>
      <ItemsPerPageSelector
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        setCurrentPage={setCurrentPage}
      />
      <div className="rounded-lg text-sm mt-2 overflow-auto flex items-start justify-center">
        {sortedAndPaginatedInventory.length > 0 ? (
          <table className="w-full bg-white">
            <thead className="bg-primaryColor text-white">
              <tr>
                <SortableHeader
                  title="Nombre"
                  field="name"
                  currentSortBy={sortBy}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
                <th className="px-4 py-2 text-left font-medium">Descripción</th>
                <th className="px-4 py-2 text-left font-medium">Disponible</th>
                <SortableHeader
                  title="Tamaño"
                  field="size"
                  currentSortBy={sortBy}
                  currentSortDirection={sortDirection}
                  onSort={handleSort}
                />
                <th className="px-4 py-2 text-left font-medium">Categoría</th>
                <th className="px-4 py-2 text-left font-medium">{" "}</th>
              </tr>
            </thead>
            <tbody>
              {sortedAndPaginatedInventory.map((item, index) => (
                <InventoryRow key={item.id.toString()} item={item} index={index} />
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay artículos en el inventario.</p>
        )}
      </div>
      <Pagination
        totalPages={totalPages}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}