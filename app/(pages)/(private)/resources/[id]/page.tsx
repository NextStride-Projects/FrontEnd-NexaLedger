import { IResource } from "@/app/utils/interfaces/resources/resources";
import { cookies } from "next/headers";

export default async function ResourceDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const cookieStore = cookies();
  const token = (await cookieStore).get("token")?.value;

  if (!token) {
    return <div>You are not authenticated. Please log in.</div>;
  }

  try {
    const response = await fetch(`http://localhost:7004/api/Resource/${id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch resource details");
    }

    const resource: IResource = await response.json();

    return (
      <div className="p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Detalles del Recurso
        </h2>
        <p className="text-gray-700">
          <strong>Nombre:</strong> {resource.name}
        </p>
        <p className="text-gray-700">
          <strong>Descripción:</strong> {resource.description}
        </p>
        <p className="text-gray-700">
          <strong>Disponible:</strong> {resource.available ? "Sí" : "No"}
        </p>
        <p className="text-gray-700">
          <strong>Tamaño:</strong> {resource.size}
        </p>
        <p className="text-gray-700">
          <strong>Características:</strong>{" "}
          {resource.features.length > 0
            ? resource.features.join(", ")
            : "Ninguna"}
        </p>
        <p className="text-gray-700">
          <strong>Precio:</strong> ${resource.price}
        </p>
        <p className="text-gray-700">
          <strong>Adquirido en:</strong>{" "}
          {new Date(resource.createdAt).toLocaleDateString()}
        </p>
        <p className="text-gray-700">
          <strong>Último movimiento:</strong>{" "}
          {new Date(resource.updatedAt).toLocaleDateString()}
        </p>
        <div className="mt-6">
          <a
            href="/resources"
            className="text-primaryColor hover:text-primaryColorDark"
          >
            Volver al inventario
          </a>
        </div>
      </div>
    );
  } catch (error) {
    console.error("Failed to fetch resource details:", error);
    return (
      <p className="text-red-500">
        No se pudieron cargar los detalles del recurso. Intente de nuevo más
        tarde.
      </p>
    );
  }
}
