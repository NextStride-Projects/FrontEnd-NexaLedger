"use client";

import { useEffect } from "react";
import { useResourcesStore } from "@/app/store/useResourceStore";
import InventoryTable from "@/app/components/Table/inventoryTable";
import axios from "axios";

export default function ClientInventory() {
  const { resources, setResources } = useResourcesStore();

  useEffect(() => {
    const fetchResources = async () => {
      if (resources.length > 0) return;

      try {
        const response = await axios.get(`/api/resource/read`);
        setResources(response.data);
      } catch (error) {
        console.error("Error al obtener los recursos:", error);
      }
    };

    fetchResources();
  }, [resources, setResources]);

  return (
    <div>
      <InventoryTable inventory={resources} />
    </div>
  );
}