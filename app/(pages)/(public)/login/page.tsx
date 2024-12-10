"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function Login() {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setErrorMessage("");
    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      setIsLoading(false);
      
      router.push(`/resources`)
    } catch (error: any) {
      setIsLoading(false);
      setErrorMessage(error.message || "Error de red o del servidor.");
    }
  };

  return (
    <div
      className="flex min-w-screen flex-col md:flex-row overflow-hidden"
      style={{ minHeight: "calc(100vh - 38px)" }}
    >
      <section className="hidden md:flex w-1/2 items-center justify-center bg-gray-100">
        <Image
          src="/imagenLogin.png"
          alt="Logo Empresa"
          width={450}
          height={450}
          className="object-contain"
        />
      </section>

      <section className="flex flex-1 items-center justify-center bg-white">
        <div className="flex flex-col w-4/5 max-w-md">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">Bienvenido</h1>
          <p className="text-center text-gray-500 mb-8">
            Por favor, inicia sesión para continuar
          </p>
          <form className="flex flex-col space-y-4" 
          onSubmit={handleSubmit}
          >

            <label>
          Correo Electrónico:
          <input
            type="email"
            name="email"
            placeholder="Ingrese su correo"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>
        <label>
          Contraseña:
          <input
            type="password"
            name="password"
            placeholder="Ingrese su contraseña"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ width: "100%", padding: "8px" }}
          />
        </label>
        <button
          type="submit"
          disabled={isLoading}
          style={{
            padding: "10px",
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "5px",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading ? "Cargando..." : "Iniciar Sesión"}
        </button>
        {errorMessage && <p style={{ color: "red" }}>{errorMessage}</p>}

            <p className="text-center text-gray-500">¿No estás registrado? Contacta con el administrador</p>
          </form>
        </div>
      </section>
    </div>
  );
}