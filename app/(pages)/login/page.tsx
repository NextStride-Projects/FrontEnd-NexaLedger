"use client";

import "@/app/globals.css";
import Image from "next/image";
import TextInput from "@/app/components/Input/TextInput";
import Button from "../../components/Button/Button";

export default function Login() {
  return (
    <div className="flex min-w-screen flex-col md:flex-row overflow-hidden"  style={{ minHeight: 'calc(100vh - 38px)' }}>
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

          <form className="flex flex-col space-y-4">
            <div className="flex">
              <label className="mb-1 font-semibold text-gray-700 w-[40px]" style={{ width:"80px", border:"1px solid red"}}>
                Usuario:
              </label>
              <TextInput name={"Username"} editable={true} />
            </div>

            <div>
              <label className="mb-1 font-semibold text-gray-700">
                Contraseña:
              </label>
              <TextInput name={"Password"} editable={true} type="password" />
            </div>

            <Button
              label={"Iniciar sesión"}
              variant={"primary"}
              // className="w-full mt-6"
            />
          </form>
        </div>
      </section>
    </div>
  );
}
