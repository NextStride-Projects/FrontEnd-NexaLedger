"use client";

import "@/app/globals.css";
import Image from "next/image";
import TextInput from "@/app/components/Input/TextInput";
import Button from "@/app/components/Button/Button";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Datos quemados para pruebas
    const mockUsername = "admin";
    const mockPassword = "password123";

    if (username === mockUsername && password === mockPassword) {
      setErrorMessage(null);
      router.push("/dashboard");
    } else {
      setErrorMessage("Usuario o contraseña incorrectos");
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
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-700">
            Bienvenido
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Por favor, inicia sesión para continuar
          </p>

          <form className="flex flex-col space-y-4" onSubmit={handleLogin}>
            <div className="flex flex-col">
              <label className="mb-1 font-semibold text-gray-700">
                Usuario:
              </label>
              <TextInput
                name="Username"
                editable={true}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            <div className="flex flex-col" style={{ width: "100%" }}>
              <label className="mb-1 font-semibold text-gray-700">
                Contraseña:
              </label>
              <TextInput
                name="Password"
                editable={true}
                type="password"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {errorMessage && (
              <p className="text-center text-red-500">{errorMessage}</p>
            )}

            <Button label={"Iniciar sesión"} variant={"primary"} />

            <p className="text-center text-gray-500 mb-8">
              ¿No estás registrado? Contacta con el administrador
            </p>
          </form>
        </div>
      </section>
    </div>
  );
}
