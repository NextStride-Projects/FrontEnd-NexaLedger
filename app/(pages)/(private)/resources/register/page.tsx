"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IResource } from "@/app/utils/interfaces/resources/resources";
import axios from "axios";

export default function RegisterResource() {
  const [formData, setFormData] = useState<
    Omit<IResource, "id" | "acquiredAt" | "latesMovementDate">
  >({
    name: "",
    description: "",
    available: false,
    saleAvailability: false,
    size: 0,
    features: [],
    price: 0,
    category: "",
    image: "",
  });
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const router = useRouter();

  const getCookie = (name: string): string | null => {
    const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
    return match ? match[2] : null;
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox"
        ? (e.target as HTMLInputElement).checked
        : value,
    }));
  };

  const handleFeatureChange = (index: number, value: string) => {
    setFormData((prev) => {
      const updatedFeatures = [...prev.features];
      updatedFeatures[index] = value;
      return { ...prev, features: updatedFeatures };
    });
  };

  const addFeature = () => {
    setFormData((prev) => ({
      ...prev,
      features: [...prev.features, ""],
    }));
  };

  const removeFeature = (index: number) => {
    setFormData((prev) => {
      const updatedFeatures = prev.features.filter((_, i) => i !== index);
      return { ...prev, features: updatedFeatures };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const token = getCookie("token");

      if (!token) {
        throw new Error("Token de autenticación no encontrado.");
      }

      await axios.post(`/api/resources/create`, formData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      router.push(`/resources`);
    } catch (error: any) {
      setErrorMessage(
        error.response?.data?.message || "Error al registrar el recurso."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-6">
      <h2 className="text-md font-bold text-gray-700 mb-6">Registrar Recurso</h2>
      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Nombre:
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Categoría:
          </label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Cantidad:
          </label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
            required
          />
        </div>
        <div>
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Precio de compra:
          </label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
            required
          />
        </div>
        <div className="col-span-2 flex space-x-4 items-center">
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 text-sm font-medium">
              Disponible:
            </label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4"
            />
          </div>
          <div className="flex items-center space-x-2">
            <label className="text-gray-700 text-sm font-medium">
              Disponible para venta:
            </label>
            <input
              type="checkbox"
              name="saleAvailability"
              checked={formData.saleAvailability}
              onChange={handleChange}
              className="h-4 w-4"
            />
          </div>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Descripción:
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
            rows={3}
            required
          ></textarea>
        </div>
        <div className="col-span-2">
          <label className="block text-gray-700 text-sm font-medium mb-1">
            Características:
          </label>
          {formData.features.map((feature, index) => (
            <div key={index} className="flex items-center space-x-2 mb-2">
              <input
                type="text"
                value={feature}
                onChange={(e) => handleFeatureChange(index, e.target.value)}
                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
              />
              <button
                type="button"
                onClick={() => removeFeature(index)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600 text-xs"
              >
                Eliminar
              </button>
            </div>
          ))}
          <button
            type="button"
            onClick={addFeature}
            className="px-4 py-2 bg-primaryColor text-white rounded hover:bg-primaryColorDark text-xs"
          >
            Añadir característica
          </button>
        </div>
        <div className="col-span-2 flex justify-between">
          <button
            type="button"
            onClick={() => router.push(`/resources`)}
            className="px-6 py-2 bg-gray-400 text-white rounded hover:bg-gray-500 text-xs"
          >
            Cancelar
          </button>
          <button
            type="submit"
            disabled={isLoading}
            className={`px-6 py-2 rounded text-xs transition-all ${
              isLoading
                ? "bg-gray-400 cursor-not-allowed"
                : "bg-primaryColor text-white hover:bg-primaryColorDark"
            }`}
          >
            {isLoading ? "Guardando..." : "Registrar"}
          </button>
        </div>
        {errorMessage && (
          <p className="text-red-500 text-center mt-4 text-sm">{errorMessage}</p>
        )}
      </form>
    </div>
  );
}