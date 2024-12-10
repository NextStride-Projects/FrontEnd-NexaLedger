"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { IResource } from "@/app/utils/interfaces/resources/resources";

const RegisterInventory = () => {
  const router = useRouter();

  const [formData, setFormData] = useState<Omit<IResource, "id" | "features" | "createdAt" | "updatedAt">>({
    name: "",
    description: "",
    category: "",
    available: false,
    saleAvailability: false,
    price: 0,
    size: 0,
    image: "",
  });

  const [features, setFeatures] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type, checked } = e.target as HTMLInputElement;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox"
          ? checked
          : type === "number"
          ? Number(value)
          : value,
    }));
  };

  const handleFeaturesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFeatures(e.target.value.split(",").map((f) => f.trim()));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const token = document.cookie
        .split("; ")
        .find((row) => row.startsWith("token="))
        ?.split("=")[1];

      if (!token) {
        throw new Error("Token de autenticación no encontrado.");
      }

      const response = await fetch("/api/resources", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          features,
        }),
      });

      if (!response.ok) {
        throw new Error("Error al registrar el inventario.");
      }

      router.push("/resources");
    } catch (err) {
      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto mt-16 p-8 bg-white rounded shadow-md">
      <h2 className="text-2xl font-bold text-center mb-6">Registrar Inventario</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-700">Nombre</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Descripción</label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">
            Características (separadas por comas)
          </label>
          <input
            type="text"
            name="features"
            value={features.join(", ")}
            onChange={handleFeaturesChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Categoría</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div className="flex items-center gap-4">
          <div>
            <label className="block text-gray-700">Disponible</label>
            <input
              type="checkbox"
              name="available"
              checked={formData.available}
              onChange={handleChange}
              className="h-4 w-4"
            />
          </div>
          <div>
            <label className="block text-gray-700">Disponible para Venta</label>
            <input
              type="checkbox"
              name="saleAvailability"
              checked={formData.saleAvailability}
              onChange={handleChange}
              className="h-4 w-4"
            />
          </div>
        </div>
        <div>
          <label className="block text-gray-700">Precio Inicial</label>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">Cantidad</label>
          <input
            type="number"
            name="size"
            value={formData.size}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        <div>
          <label className="block text-gray-700">URL de Imagen</label>
          <input
            type="text"
            name="image"
            value={formData.image}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded"
          />
        </div>
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          disabled={loading}
          className={`w-full p-2 text-white bg-green-600 rounded ${
            loading ? "opacity-50 cursor-not-allowed" : "hover:bg-green-700"
          }`}
        >
          {loading ? "Registrando..." : "Registrar"}
        </button>
      </form>
    </div>
  );
};

export default RegisterInventory;