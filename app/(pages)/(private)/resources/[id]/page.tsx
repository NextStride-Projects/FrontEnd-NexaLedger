"use client";

import { useParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import { fetchResourceById, updateResource } from "@/app/utils/api"; // Nueva función para actualizar
import { useResourceStore } from "@/app/store/useResourceStore";
import ResourceDetails from "@/app/components/Steps/resourcesSteps/ResourcesDetails";
import Button from "@/app/components/Button/Button";
import TabBar from "@/app/components/Containers/TabBar";
import { IResource } from "@/app/utils/interfaces/resources";

export default function ResourceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const resourceId = parseInt(params.id as string, 10);

  const { resources, isEditMode, setResource, toggleEditMode } = useResourceStore();

  const [activeTab, setActiveTab] = useState(1);
  const [loading, setLoading] = useState(true);

  const resource = resources.find((res) => res.id === resourceId);

  const handleSave = async (updatedResource: IResource) => {
    console.log("[ResourceDetailsPage] handleSave - saving updated resource:", updatedResource);

    try {
      await updateResource(updatedResource); // Sincroniza con el backend
      setResource(updatedResource); // Actualiza en el store
      console.log("[ResourceDetailsPage] Resource updated successfully.");
      toggleEditMode();
    } catch (error) {
      console.error("[ResourceDetailsPage] Error al guardar el recurso:", error);
    }
  };

  useEffect(() => {
    const loadResource = async () => {
      if (resourceId && !resource) {
        setLoading(true);
        const fetchedResource = await fetchResourceById(resourceId);
        if (fetchedResource) {
          setResource(fetchedResource);
        }
        setLoading(false);
      }
    };

    loadResource();
  }, [resourceId, resource, setResource]);

  const tabs = [
    {
      id: 1,
      label: "Detalles del Recurso",
      component: loading ? (
        <p>Cargando...</p>
      ) : resource ? (
        <ResourceDetails
          resource={resource}
          isEditMode={isEditMode}
          handleSave={(updatedResource) => handleSave(updatedResource)}
        />
      ) : (
        <p>Recurso no encontrado</p>
      ),
    },
  ];

  if (!resourceId) {
    return <p className="text-red-600">Recurso no encontrado</p>;
  }

  return (
    <div className="max-w-[1600px] min-h-[400px]">
      <header className="flex flex-col sm:flex-row items-center justify-between my-4 gap-4">
        <nav className="text-gray-600">Inventario &gt; {resource?.name}</nav>
        <div className="flex flex-row items-center gap-4">
          <Button label="VOLVER" onClick={() => router.push("/resources")} variant="default" />
          <Button
            label={isEditMode ? "GUARDAR" : "EDITAR"}
            onClick={() => (isEditMode ? handleSave(resource) : toggleEditMode())}
            variant="primary"
          />
        </div>
      </header>
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="mt-6 text-gray-700">{tabs[0].component}</div>
    </div>
  );
}