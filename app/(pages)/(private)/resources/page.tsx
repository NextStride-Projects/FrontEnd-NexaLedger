import { cookies } from "next/headers";
import InventoryTable from "@/app/components/Table/inventoryTable";

export default async function InventoryPage() {
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return <div>You are not authenticated. Please log in.</div>;
  }

  try {
    const response = await fetch(`http://localhost:7004/api/Resource`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch inventory data");
    }

    const inventory = await response.json();

    return (
      <div className="p-4">
        <InventoryTable inventory={inventory} />
      </div>
    );
  } catch (error) {
    console.error("Error fetching inventory:", error);
    return (
      <p className="text-red-500">
        No se pudo cargar el inventario. Intente de nuevo más tarde.
      </p>
    );
  }
}