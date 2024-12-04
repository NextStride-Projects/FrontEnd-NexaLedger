"use client";

import "@/app/globals.css";
import Image from "next/image";
import TextInput from "@/app/components/Input/TextInput";
import Button from "@/app/components/Button/Button";
// import { useState } from "react";
// import { useRouter } from "next/navigation";
// import useSWR from "swr";

// const fetcher = async ([url, token]: [string, string]) => {
//   const response = await fetch(url, {
//     headers: { Authorization: `Bearer ${token}` },
//   });
//   if (!response.ok) throw new Error("Token inválido o expirado");
//   return response.json();
// };

export default function Login() {
  // const [credentials, setCredentials] = useState({ username: "", password: "" });
  // const [errorMessage, setErrorMessage] = useState<string | null>(null);
  // const router = useRouter();

  // const token = typeof window !== "undefined" ? localStorage.getItem("authToken") : null;

  // const { data } = useSWR(token ? ["/api/verify-token", token] : null, fetcher, {
  //   onError: () => setErrorMessage("Token inválido o expirado"),
  // });

  // if (data?.valid) router.push("/dashboard");

  // const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
  //   const { name, value } = e.target;
  //   setCredentials((prev) => ({ ...prev, [name]: value }));
  // };

  // const handleLogin = async (e: React.FormEvent) => {
  //   e.preventDefault();
  //   setErrorMessage(null);

  //   try {
  //     const response = await fetch("/api/login", {
  //       method: "POST",
  //       headers: { "Content-Type": "application/json" },
  //       body: JSON.stringify(credentials),
  //     });

  //     if (!response.ok) throw new Error((await response.json()).message || "Error de autenticación");

  //     const { token } = await response.json();
  //     localStorage.setItem("authToken", token);
  //     router.push("/dashboard");
  //   } catch (error: any) {
  //     setErrorMessage(error.message || "Ocurrió un error inesperado.");
  //   }
  // };

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
          // onSubmit={handleLogin}
          >
            {["username", "password"].map((field) => (
              <div key={field} className="flex flex-col">
                <label className="mb-1 font-semibold text-gray-700">
                  {field === "username" ? "Usuario:" : "Contraseña:"}
                </label>
                <TextInput
                  name={field}
                  type={field === "password" ? "password" : "text"}
                  editable={true}
                  // onChange={handleInputChange}
                />
              </div>
            ))}
            {/* {errorMessage && <p className="text-center text-red-500">{errorMessage}</p>} */}
            <Button label="Iniciar sesión" variant="primary" type="submit" />
            <p className="text-center text-gray-500">¿No estás registrado? Contacta con el administrador</p>
          </form>
        </div>
      </section>
    </div>
  );
}