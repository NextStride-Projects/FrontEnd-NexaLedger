"use client";

import ResourceDetails from "@/app/components/Steps/resourcesSteps/ResourcesDetails";
import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchResourceById } from "@/app/utils/api";
import Button from "@/app/components/Button/Button";
import LatestMovements from "@/app/components/Steps/resourcesSteps/LatestMovements";
import TabBar from "@/app/components/Containers/TabBar";
import { useResourceStore } from "@/app/store/useResourceStore";

export default function ResourceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const resourceId = parseInt(params.id as string, 10);

  const { resources, isEditMode, setResource, toggleEditMode } = useResourceStore();

  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);

  const resource = resources.find((res) => res.id === resourceId);

  const handleSave = () => {
    if (resource) {
      console.log("Guardando el recurso actualizado:", resource);

      setResource(resource);
      console.log("Recurso guardado en la store:", resource);

      toggleEditMode();
    }
  };

  useEffect(() => {
    const loadResource = async () => {
      if (resourceId) {
        setLoading(true);
        const fetchedResource = await fetchResourceById(resourceId);
        if (fetchedResource) {
          setResource(fetchedResource);
        }
        setLoading(false);
      }
    };

    loadResource();
  }, [resourceId]);

  const tabs = [
    {
      id: 1,
      label: "Detalles del Recurso",
      component: loading ? (
        <p>Cargando...</p>
      ) : resource ? (
        <ResourceDetails resource={resource} isEditMode={isEditMode} handleSave={handleSave} />
      ) : (
        <p>Recurso no encontrado</p>
      ),
    },
    {
      id: 2,
      label: "Últimos Movimientos",
      component: <LatestMovements movements={[]} />, 
    },
  ];

  const renderTabComponent = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab?.component || null;
  };

  if (!resourceId || !resource) {
    return <p className="text-red-600">Recurso no encontrado</p>;
  }

  return (
    <div className="max-w-[1600px] min-h-[400px]">
      <header className="flex flex-col sm:flex-row items-center justify-between my-4 gap-4">
        <nav className="text-gray-600">
          Inventario &gt; {resource.name}
        </nav>
        <div className="flex flex-row items-center gap-4">
          <Button
            label="VOLVER"
            onClick={() => router.push("/resources")}
            variant="default"
          />
          <Button
            label={isEditMode ? "GUARDAR" : "EDITAR"}
            onClick={handleSave}
            variant={"primary"}
          />
        </div>
      </header>
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="mt-6 text-gray-700">{renderTabComponent()}</div>
    </div>
  );
}