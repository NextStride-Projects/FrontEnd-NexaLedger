"use client";

import ResourceDetails from "@/app/components/Steps/resourcesSteps/ResourcesDetails";
import { useParams, useSearchParams, useRouter } from "next/navigation";
import { useState, useEffect } from "react";
import resources from "@/app/utils/dataFake/resources";
import movements from "@/app/utils/dataFake/lastMovementResources";
import Button from "@/app/components/Button/Button";
import LatestMovements from "@/app/components/Steps/resourcesSteps/LatestMovements";
import TabBar from "@/app/components/Containers/TabBar";

export default function ResourceDetailsPage() {
  const params = useParams();
  const router = useRouter();
  const searchParams = useSearchParams();
  const resourceId = parseInt(params.id as string, 10);
  const [resource, setResource] = useState<any | null>(null);
  const [activeTab, setActiveTab] = useState(1);

  // Inicializamos el estado isEditMode en función del parámetro de la URL
  const [isEditMode, setIsEditMode] = useState(searchParams.get("edit") === "true");

  // Función para manejar el cambio de valores
  const handleChange = (name: string, value: string) => {
    setResource((prevResource: any) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  // Buscar el recurso de manera segura
  useEffect(() => {
    if (resourceId) {
      const foundResource = resources.find((item) => item.id === resourceId);
      setResource(foundResource || null);
    }
  }, [resourceId]);

  // Función para alternar el modo de edición
  const toggleEditMode = () => {
    // Alternar el estado de isEditMode
    setIsEditMode((prev) => !prev);

    // Actualizamos la URL con el parámetro 'edit'
    router.push(`/resources/${resourceId}?edit=${!isEditMode}`);
  };

  const tabs = [
    {
      id: 1,
      label: "Detalles del Recurso",
      component: resource ? (
        <ResourceDetails resource={resource} isEditMode={isEditMode} handleChange={handleChange} />
      ) : (
        <p>Recurso no encontrado</p>
      ),
    },
    {
      id: 2,
      label: "Últimos Movimientos",
      component: <LatestMovements movements={movements} />,
    },
  ];

  const renderTabComponent = () => {
    const currentTab = tabs.find((tab) => tab.id === activeTab);
    return currentTab?.component || null;
  };

  // Si no se encuentra el recurso, mostramos un mensaje
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
            onClick={toggleEditMode}
            variant={"primary"}
          />
        </div>
      </header>
      <TabBar tabs={tabs} activeTab={activeTab} onTabClick={setActiveTab} />
      <div className="mt-6 text-gray-700">{renderTabComponent()}</div>
    </div>
  );
}
