"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import { IMovement } from "@/app/utils/interfaces/movement/movement";

export default function CreateMovement() {
  const [resources, setResources] = useState<Pick<IResource, "id" | "name">[]>(
    []
  );
  const [formData, setFormData] = useState<
    Omit<IMovement, "timestamp" | "userId" | "id">
  >({
    resourceId: "",
    type: "",
    description: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const router = useRouter();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const response = await axios.get("/api/resources/read");
        setResources(response.data);
        setIsLoading(false);
      } catch (error: any) {
        setErrorMessage(
          error.response?.data?.message || "Error de red o del servidor."
        );
        setIsLoading(false);
      }
    };

    fetchResources();
  }, []);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "resourceId" ? value : value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      await axios.post("/api/movement/create", formData);
      router.push("/resources");
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Error de red o del servidor."
      );
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p className="text-center text-gray-500">Cargando recursos...</p>;
  }

  if (errorMessage) {
    return <p className="text-red-500 text-center">{errorMessage}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Crear Movimiento</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Recurso:
          </label>
          <select
            name="resourceId"
            value={formData.resourceId.toString()}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
            required
          >
            <option value="" disabled>
              Seleccione un recurso
            </option>
            {resources.map((resource) => (
              <option
                key={resource.id.toString()}
                value={resource.id.toString()}
              >
                {resource.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Tipo de Movimiento:
          </label>
          <input
            type="text"
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 font-medium mb-2">
            Descripción:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
            rows={4}
            required
          ></textarea>
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push("/resources")}
            className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-3 text-white rounded transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primaryColor hover:bg-primaryColorDark"
            }`}
          >
            {isLoading ? "Guardando..." : "Crear Movimiento"}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}
