"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import axios from "axios";
import { IRegisterUser, IRegisterCompany } from "@/app/utils/interfaces/auth/register";

export default function RegisterPage() {
  const [formData, setFormData] = useState<{
    user: Omit<IRegisterUser, "id" | "empresaId">;
    company: Omit<IRegisterCompany, "id" | "active" | "empresaId" | "responsibleEmail" | "responsiblePerson" | "features">;
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
    },
  });

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  const handleNextStep = () => {
    setCurrentStep((prev) => prev + 1);
  };

  const handlePreviousStep = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const mergedCompanyData: Omit<IRegisterCompany, "id" | "features" | "empresaId"> = {
        ...formData.company,
        responsiblePerson: formData.user.name,
        responsibleEmail: formData.user.email,
        active: true,
      };

      await axios.post("/api/auth/register", {
        company: mergedCompanyData,
        userData: formData.user,
      });

      setIsLoading(false);
      setIsSuccess(true);
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.response?.data?.message || "Error de red o del servidor.");
    }
  };

  return (
    <div className="flex min-h-[calc(100vh-40px)] bg-gray-100">
      <section className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <Image
          src="/imagenLogin.png"
          alt="Imagen de Registro"
          width={450}
          height={450}
          className="object-cover w-full h-[calc(100vh-40px)]"
        />
      </section>
      <section className="flex flex-1 items-center justify-center bg-white px-6">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              <span
                className={`w-[50px] h-[35px] rounded-full flex items-center justify-center font-bold text-white text-sm ${
                  currentStep === 1 ? "bg-primaryColor" : "bg-gray-400"
                }`}
              >
                1
              </span>
              <p className="text-gray-700 text-sm font-medium">Registrar Empresa</p>
            </div>
            <div className="w-full border-t border-gray-300 mx-4"></div>
            <div className="flex items-center space-x-2">
              <span
                className={`w-[50px] h-[35px] rounded-full flex items-center justify-center font-bold text-white text-sm ${
                  currentStep === 2 ? "bg-primaryColor" : "bg-gray-400"
                }`}
              >
                2
              </span>
              <p className="text-gray-700 text-sm font-medium">Registrar Usuario</p>
            </div>
          </div>

          {currentStep === 1 && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[
                  { label: "Nombre Completo:", name: "fullName", value: formData.company.fullName },
                  { label: "Alias:", name: "alias", value: formData.company.alias },
                  { label: "Correo Electrónico:", name: "email", value: formData.company.email },
                  { label: "Teléfono:", name: "phone", value: formData.company.phone },
                  { label: "Ubicación:", name: "location", value: formData.company.location },
                  { label: "Categoría:", name: "category", value: formData.company.category },
                ].map((field, index) => (
                  <div key={index}>
                    <label className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>
                    <input
                      type="text"
                      name={field.name}
                      value={field.value}
                      onChange={(e) => handleChange(e, "company")}
                      className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
                    />
                  </div>
                ))}
                <div>
                  <label className="block text-gray-700 text-sm font-medium mb-2">Descripción:</label>
                  <textarea
                    name="description"
                    value={formData.company.description}
                    onChange={(e) => handleChange(e, "company")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
                  />
                </div>
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-2 bg-primaryColor text-white rounded text-sm hover:bg-primaryColorDark"
                >
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form className="space-y-4" onSubmit={handleSubmit}>
              {[
                { label: "Nombre:", name: "name", value: formData.user.name },
                { label: "Correo Electrónico:", name: "email", value: formData.user.email },
                { label: "Contraseña:", name: "password", value: formData.user.password, type: "password" },
              ].map((field, index) => (
                <div key={index}>
                  <label className="block text-gray-700 text-sm font-medium mb-2">{field.label}</label>
                  <input
                    type={field.type || "text"}
                    name={field.name}
                    value={field.value}
                    onChange={(e) => handleChange(e, "user")}
                    className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-primaryColor text-sm"
                  />
                </div>
              ))}
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-6 py-2 bg-gray-400 text-white rounded text-sm hover:bg-gray-500"
                >
                  Anterior
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`px-6 py-2 rounded text-sm transition-all ${
                    isLoading ? "bg-gray-400 cursor-not-allowed" : "bg-primaryColor text-white hover:bg-primaryColorDark"
                  }`}
                >
                  {isLoading ? "Cargando..." : "Registrar"}
                </button>
              </div>
              {errorMessage && <p className="text-red-500 text-center mt-4 text-sm">{errorMessage}</p>}
            </form>
          )}
        </div>
      </section>

      {isSuccess && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-green-100 p-6 rounded-lg shadow-lg text-center">
            <h2 className="text-md font-semibold text-green-800">¡Registro exitoso!</h2>
            <p className="text-green-700 mt-2 text-sm">El registro se ha completado correctamente.</p>
            <button
              onClick={() => router.push("/login")}
              className="mt-4 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 text-sm"
            >
              Ir al inicio de sesión
            </button>
          </div>
        </div>
      )}
    </div>
  );
}