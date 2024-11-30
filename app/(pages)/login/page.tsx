"use client";

import "@/app/globals.css";
import Image from "next/image";
import TextInput from "@/app/components/Input/TextInput";
import Button from "../../components/Button/Button";

export default function Login() {
  return (
    <main className="flex h-screen w-screen">
      {/* Sección Izquierda */}
      <section className="flex flex-col items-center justify-center w-1/2 bg-gray-100">
        <Image
          src="/imagenLogin.png"
          alt="Logo Empresa"
          width={450}
          height={100}
        />
      </section>

      {/* Sección Derecha */}
      <section className="flex flex-col items-center justify-center w-1/2 bg-white">
        <div className="flex flex-col w-2/3 max-w-md">
          <label className="mb-2 font-bold">Usuario:</label>
          <TextInput name={"Username"} editable={true} />

          <label className="mt-4 mb-2 font-bold">Contraseña:</label>
          <TextInput name={"Password"} editable={true} type="password" />

          <Button
            label={"Iniciar sesión"}
            variant={"primary"}
            // className="mt-6"
          />
        </div>
      </section>
    </main>
  );
}
