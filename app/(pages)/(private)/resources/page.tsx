"use client";

import { useEffect } from "react";
import { useResourcesStore } from "@/app/store/useResourceStore";
import InventoryTable from "@/app/components/Table/inventoryTable";
import axios from "axios";
import { getCookie } from "@/app/utils/functions/cookies";

export default function ClientInventory() {
  const { resources, setResources } = useResourcesStore();

  useEffect(() => {
    const fetchResources = async () => {
      try {
        const token = getCookie("token");
        console.log(token);
        if (!token) {
          throw new Error("Token de autenticación no encontrado.");
        }

        const response = await axios.get("http://localhost:7004/api/Resource", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.status !== 200) {
          throw new Error(
            `Error en la respuesta del servidor: ${response.statusText}`
          );
        }

        const data = response.data;
        setResources(data);
      } catch (error) {
        console.error("Error al obtener los recursos:", error);
      }
    };

    fetchResources();
  }, [setResources]);

  return (
    <div>
      <InventoryTable inventory={resources} />
    </div>
  );
}
