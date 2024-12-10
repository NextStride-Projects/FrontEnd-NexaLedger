"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { IRegisterUser, IRegisterCompany } from "@/app/utils/interfaces/auth/register";

export default function RegisterPage() {
  const [formData, setFormData] = useState<{
    user: Omit<IRegisterUser, "id" | "empresaId">;
    company: Omit<IRegisterCompany, "id" | "active" | "responsibleEmail" | "responsiblePerson">;
  }>({
    user: {
      name: "",
      email: "",
      password: "",
    },
    company: {
      phone: "",
      email: "",
      fullName: "",
      description: "",
      alias: "",
      category: "",
      location: "",
      features: "",
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const router = useRouter();

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    section: "user" | "company"
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [section]: {
        ...prev[section],
        [name]: value,
      },
    }));
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const mergedCompanyData: Omit<IRegisterCompany, "id"> = {
        ...formData.company,
        responsiblePerson: formData.user.name,
        responsibleEmail: formData.user.email,
        active: true,
      };

      console.log("Datos de la empresa enviados:", mergedCompanyData);

      const response = await fetch("/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ company: mergedCompanyData, userData: formData.user }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al registrar");
      }

      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message || "Error de red o del servidor.");
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 space-y-12">
      <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
        <h1 className="text-2xl font-semibold text-gray-700 mb-6 text-center">Registrar Usuario y Empresa</h1>
        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* User Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium text-gray-700">Datos del Usuario</h2>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Nombre</label>
            <input
              type="text"
              name="name"
              required
              placeholder="Ingrese su nombre"
              value={formData.user.name}
              onChange={(e) => handleChange(e, "user")}
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Correo Electrónico</label>
            <input
              type="email"
              name="email"
              required
              placeholder="Ingrese su correo electrónico"
              value={formData.user.email}
              onChange={(e) => handleChange(e, "user")}
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Contraseña</label>
            <input
              type="password"
              name="password"
              required
              placeholder="Ingrese su contraseña"
              value={formData.user.password}
              onChange={(e) => handleChange(e, "user")}
              className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
            />
          </div>

          {/* Company Section */}
          <div className="md:col-span-2">
            <h2 className="text-lg font-medium text-gray-700">Datos de la Empresa</h2>
          </div>
          {Object.keys(formData.company).map((name) => (
            <div key={name}>
              <label className="block text-sm font-medium text-gray-700">
                {capitalize(name)}
              </label>
              <input
                type="text"
                name={name}
                required
                placeholder={`Ingrese ${name}`}
                value={formData.company[name as keyof typeof formData.company]}
                onChange={(e) => handleChange(e, "company")}
                className="mt-1 block w-full px-4 py-3 rounded-lg border-gray-300 shadow-sm focus:ring-blue-500 focus:border-blue-500"
              />
            </div>
          ))}
          <div className="md:col-span-2 flex justify-center">
            <button
              type="submit"
              disabled={isLoading}
              className="px-8 py-3 bg-blue-600 text-white font-medium rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:bg-gray-400"
            >
              {isLoading ? "Cargando..." : "Registrar"}
            </button>
          </div>

          {errorMessage && (
            <p className="text-red-500 text-center md:col-span-2">{errorMessage}</p>
          )}
        </form>
      </div>

      {/* Modal de éxito */}
      {isSuccess && (
        <div className="fixed inset-0 m-t-[0px] flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-2xl font-semibold text-green-800">¡Registro exitoso!</h2>
            <p className="text-green-700 mt-2">El registro se ha completado correctamente.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Ir al inicio de sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

function capitalize(str: string) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace(/([A-Z])/g, " $1");
}