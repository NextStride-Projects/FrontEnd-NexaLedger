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
      location: ""
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
        active: true
      };

      const response = await axios.post("/api/auth/register", {
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
      <section className="flex flex-1 items-center justify-center bg-white px-6 text-sm">
        <div className="w-full max-w-4xl bg-white shadow-md rounded-lg p-8">
          <div className="flex items-center mb-6">
            <div className="flex items-center space-x-2">
              <span
                className={`w-[50px] h-[35px] rounded-full flex items-center justify-center font-bold text-white ${
                  currentStep === 1 ? "bg-primaryColor" : "bg-gray-400"
                }`}
              >
                1
              </span>
              <p className="text-gray-700 font-medium">Registrar Empresa</p>
            </div>
            <div className="w-full border-t border-gray-300 mx-4"></div>
            <div className="flex items-center space-x-2">
              <span
                className={`w-[50px] h-[35px] rounded-full flex items-center justify-center font-bold text-white ${
                  currentStep === 2 ? "bg-primaryColor" : "bg-gray-400"
                }`}
              >
                2
              </span>
              <p className="text-gray-700 font-medium">Registrar Usuario</p>
            </div>
          </div>

          {currentStep === 1 && (
            <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={handleNextStep}
                  className="px-6 py-3 bg-primaryColor text-white rounded hover:bg-primaryColorDark"
                >
                  Siguiente
                </button>
              </div>
            </form>
          )}

          {currentStep === 2 && (
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block text-gray-700 font-medium mb-2">Nombre:</label>
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
              <div className="flex justify-between">
                <button
                  type="button"
                  onClick={handlePreviousStep}
                  className="px-6 py-3 bg-gray-400 text-white rounded hover:bg-gray-500"
                >
                  Anterior
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
                  {isLoading ? "Cargando..." : "Registrar"}
                </button>
              </div>
              {errorMessage && (
                <p className="text-red-500 text-center mt-4">{errorMessage}</p>
              )}
            </form>
          )}
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