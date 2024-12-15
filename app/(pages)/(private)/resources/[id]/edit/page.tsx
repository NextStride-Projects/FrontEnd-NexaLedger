"use client";

import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import { useResourcesStore } from "@/app/store/useResourceStore";
import axios from "axios";
import { IResource } from "@/app/utils/interfaces/resources/resources";

export default function EditResource() {
  const { id } = useParams();
  const { resources, setResources } = useResourcesStore();
  const [formData, setFormData] = useState<IResource | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  useEffect(() => {
    const loadResources = async () => {
      try {
        const response = await axios.get("/api/resources/read");
        setResources(response.data);
      } catch {
        setErrorMessage("Error al cargar los recursos.");
      } finally {
        setIsLoading(false);
      }
    };

    if (resources.length === 0) {
      loadResources();
    } else {
      setIsLoading(false);
    }
  }, [setResources]);

  useEffect(() => {
    if (!isLoading) {
      const resource = resources.find((res) => res.id.toString() === id?.toString());
      if (resource) {
        setFormData(resource);
      } else {
        setErrorMessage(`Recurso con ID ${id} no encontrado.`);
      }
    }
  }, [id, resources, isLoading]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;
    setFormData((prev) =>
      prev
        ? {
            ...prev,
            [name]:
              type === "checkbox"
                ? checked
                : type === "number"
                ? parseFloat(value) || 0 // Parse numeric inputs, fallback to 0
                : value,
          }
        : null
    );
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      if (!prev || !prev.features) return null;
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setFormData((prev) => {
      if (!prev || !prev.features) return null;
      return { ...prev, features: [...prev.features, ""] };
    });
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => {
      if (!prev || !prev.features) return null;
      const updatedFeatures = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: updatedFeatures };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Token de autenticación no encontrado.");
      }

      const response = await axios.put(
        `/api/resources/${id}`,
        { ...formData, id },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setResources(resources.map((res) => (res.id === id ? response.data : res)));
      router.push(`/resources/${id}`);
    } catch (error: any) {
      setErrorMessage(error.message || "Error de red o del servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return <p className="text-gray-500">Cargando...</p>;
  }

  if (!formData) {
    return <p className="text-red-500">{errorMessage || "Error al cargar el recurso."}</p>;
  }

  return (
    <div className="p-6">
      <h2 className="text-xl font-bold text-gray-700 mb-6">Editar Recurso</h2>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-gray-700 mb-2">Nombre:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Descripción:</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            rows={4}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Disponible:</label>
          <input
            type="checkbox"
            name="available"
            checked={formData.available}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Tamaño:</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Características:</label>
          {formData.features?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full p-3 border rounded"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="p-2 bg-red-500 text-white rounded"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-primaryColor text-white rounded"
          >
            Añadir característica
          </button>
        </div>
        <div>
          <label className="block text-gray-700 mb-2">Precio:</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-3 border rounded"
            required
          />
        </div>
        <div className="flex justify-between">
          <button
            type="button"
            onClick={() => router.push(`/resources/${id}`)}
            className="px-4 py-2 bg-gray-500 text-white rounded"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-4 py-2 text-white rounded ${
              isLoading ? "bg-gray-400" : "bg-primaryColor hover:bg-primaryColorDark"
            }`}
          >
            {isLoading ? "Guardando..." : "Guardar Cambios"}
          </button>
        </div>
        {errorMessage && <p className="text-red-500 text-center">{errorMessage}</p>}
      </form>
    </div>
  );
}
