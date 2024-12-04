"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
// import jwt from "jsonwebtoken";

export default function Home() {
  const router = useRouter();

  // useEffect(() => {
  //   const token = localStorage.getItem("authToken");
  //   if (!token) {
  //     router.push("/login");
  //     console.log("Pal login")
  //     return;
  //   }

  //   try {
  //     const decoded = jwt.verify(token, "tu_secreto");
  //     console.log("Token válido:", decoded);
  //   } catch (error) {
  //     console.error("Token inválido:", error);
  //     router.push("/login");
  //   }
  // }, [router]);

  return (
    <div>
      <h1>Sistema de Inventario</h1>
      <ul>
        <li>
          <a href="/login">Iniciar Sesión</a>
        </li>
        <li>
          <a href="/resources">Ver Recursos</a>
        </li>
      </ul>
    </div>
  );
}