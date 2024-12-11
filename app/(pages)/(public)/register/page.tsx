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
    <div className="flex min-h-[calc(100vh-40px)] bg-gray-100">
      <section className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Registrar Usuario y Empresa
          </h1>
          <p className="text-center text-gray-600 mb-8">
            Complete los campos para registrar el primer usuario y su empresa
          </p>
          <form className="grid grid-cols-1 md:grid-cols-2 gap-6" onSubmit={handleSubmit}>

            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Datos del Usuario</h2>
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
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
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
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
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
                className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
              />
            </div>

            <div className="md:col-span-2">
              <h2 className="text-lg font-medium text-gray-700 mb-2">Datos de la Empresa</h2>
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
                  className="w-full p-3 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor"
                />
              </div>
            ))}

            <div className="md:col-span-2 flex justify-center">
              <button
                type="submit"
                disabled={isLoading}
                className={`px-8 py-3 font-medium rounded transition-all text-white ${
                  isLoading
                    ? "bg-gray-400 cursor-not-allowed"
                    : "bg-primaryColor hover:bg-primaryColorDark"
                }`}
              >
                {isLoading ? "Cargando..." : "Registrar"}
              </button>
            </div>

            {errorMessage && (
              <p className="text-red-500 text-center md:col-span-2">{errorMessage}</p>
            )}
          </form>
        </div>
      </section>


      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
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