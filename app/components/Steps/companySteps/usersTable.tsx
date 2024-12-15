"use client";

import React, { useState, useMemo } from "react";
import Pagination from "../../Table/pagination";
import ItemsPerPageSelector from "../../Table/itemsPerPageSelector";

interface UserTableProps {
  users: { id: number; name: string; email: string }[];
}

export default function UserTable({ users }: UserTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);

  const paginatedUsers = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    return users.slice(startIndex, startIndex + itemsPerPage);
  }, [users, currentPage, itemsPerPage]);

  const totalPages = Math.ceil(users.length / itemsPerPage);

  return (
    <div>
      <div className="my-4">
        <ItemsPerPageSelector
          itemsPerPage={itemsPerPage}
          setItemsPerPage={setItemsPerPage}
          setCurrentPage={setCurrentPage}
        />
      </div>
      <div className="rounded-lg text-sm overflow-auto h-[400px] flex items-start justify-center">
        {paginatedUsers.length > 0 ? (
          <table className="w-full">
            <thead className="bg-primaryColor text-white">
              <tr>
                <th className="px-4 py-2 text-left font-medium">ID</th>
                <th className="px-4 py-2 text-left font-medium">Nombre</th>
                <th className="px-4 py-2 text-left font-medium">Email</th>
              </tr>
            </thead>
            <tbody>
              {paginatedUsers.map((user, index) => (
                <tr
                  key={user.id}
                  className={`hover:bg-gray-200 ${
                    index % 2 === 0 ? "bg-gray-100" : "bg-white"
                  }`}
                >
                  <td className="px-4 py-2 text-gray-900">{user.id}</td>
                  <td className="px-4 py-2 text-gray-900">{user.name}</td>
                  <td className="px-4 py-2 text-gray-900">{user.email}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p className="text-gray-500">No hay usuarios registrados.</p>
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
