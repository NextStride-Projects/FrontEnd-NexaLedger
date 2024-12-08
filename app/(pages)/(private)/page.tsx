"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

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