import { cookies } from "next/headers";
import SortableHeader from "@/app/components/HeaderTable/sortTableHeader";
import Link from "next/link";
import { FaArrowRight } from "react-icons/fa";
import { IResource } from "@/app/utils/interfaces/resources/resources";

interface InventoryTableProps {
  searchParams: Record<string, string | undefined>;
}

export default async function InventoryTable({
  searchParams,
}: InventoryTableProps) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return <div>You are not authenticated. Please log in.</div>;
  }

  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/resources`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch inventory data");
    }

    const inventory: IResource[] = await response.json();

    const sortBy = searchParams.sortBy || "name";
    const sortDirection = searchParams.sortDirection || "asc";

    return (
      <div>
        <h2 className="text-2xl font-semibold text-black mb-6">Inventario</h2>

        <div className="rounded-lg overflow-auto h-[500px] flex items-start justify-center">
          {inventory.length > 0 ? (
            <table className="w-full bg-white">
              <thead className="bg-green-800 text-white">
                <tr>
                  <th>
                    <SortableHeader
                      title="Nombre"
                      sortByField="name"
                      currentSortBy={sortBy}
                      currentSortDirection={sortDirection}
                      searchParams={searchParams}
                    />
                  </th>
                  <th className="px-4 py-2 text-left font-medium">Descripción</th>
                  <th className="px-4 py-2 text-left font-medium">Disponible</th>
                  <th className="px-4 py-2 text-left font-medium">Tamaño</th>
                  <th className="px-4 py-2 text-left font-medium">Características</th>
                  <th className="px-4 py-2 text-left font-medium">Precio</th>
                  <th className="px-4 py-2 text-left font-medium">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {inventory.map((item, index) => (
                  <tr
                    key={item.id}
                    className={`hover:bg-green-100 ${
                      index % 2 === 0 ? "bg-gray-100" : "bg-white"
                    }`}
                  >
                    <td className="px-4 py-2 text-gray-900">{item.name}</td>
                    <td className="px-4 py-2 text-gray-900">{item.description}</td>
                    <td className="px-4 py-2 text-gray-900">
                      {item.available ? "Sí" : "No"}
                    </td>
                    <td className="px-4 py-2 text-gray-900">{item.size}</td>
                    <td className="px-4 py-2 text-gray-900">
                      {item.features.join(", ")}
                    </td>
                    <td className="px-4 py-2 text-gray-900">${item.price}</td>
                    <td className="px-4 py-2 text-right">
                      <Link
                        href={`/dashboard/inventory/${item.id}`}
                        className="text-green-800 hover:text-green-600"
                      >
                        <FaArrowRight className="inline-block" />
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-gray-500">No hay artículos en el inventario.</p>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch inventory:", error);
    return (
      <p className="text-red-500">
        No se pudo cargar el inventario. Intente de nuevo más tarde.
      </p>
    );
  }
}