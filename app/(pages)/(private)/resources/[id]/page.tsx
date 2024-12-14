"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ResourceDetails from "@/app/components/Steps/resourcesSteps/ResourcesDetails";
import Movements from "@/app/components/Steps/resourcesSteps/LatestMovements";
import { IMovementWithUsername } from "@/app/utils/interfaces/movement/movement";
import { getCookie } from "@/app/utils/functions/cookies";

export default function ResourceDetailsID() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [movements, setMovements] = useState<IMovementWithUsername[]>([]);
  const [lastMovement, setLastMovement] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState("detalles");

  useEffect(() => {
    const fetchResource = async () => {
      try {
        const response = await axios.get(`/api/resources/read?id=${id}`);
        setResource(response.data);
      } catch (error) {
        setErrorMessage("Error fetching resource data.");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchMovementsWithUsernames = async () => {
      try {
        const token = getCookie("token");
        const movementsResponse = await axios.get(`/api/movement/${id}`);
        const movements = movementsResponse.data;

        // Fetch usernames for each movement
        const movementsWithUsernames = await Promise.all(
          movements.map(async (movement: any) => {
            try {
              const userResponse = await axios.get(
                `http://localhost:7001/api/UsuarioManager/${movement.userId}`,
                {
                  headers: {
                    Authorization: `Bearer ${token}`,
                  },
                }
              );
              const username = userResponse.data.name || "Usuario desconocido";
              return { ...movement, username };
            } catch {
              return { ...movement, username: "Usuario desconocido" };
            }
          })
        );

        setMovements(movementsWithUsernames);

        // Extract the latest movement timestamp
        const latestMovement = movementsWithUsernames
          .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())[0];
        setLastMovement(latestMovement?.timestamp || null);
      } catch (error) {
        setErrorMessage("Error fetching movements data.");
      }
    };

    if (id) {
      fetchResource();
      fetchMovementsWithUsernames();
    } else {
      setErrorMessage("Invalid resource ID.");
      setIsLoading(false);
    }
  }, [id]);

  const handleTabClick = (tab: SetStateAction<string>) => setActiveTab(tab);

  if (isLoading) return <p className="text-gray-500">Loading...</p>;
  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;

  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <div className="flex gap-4">
          <a
            href="/resources"
            className="bg-gray-500 text-white px-4 py-2 rounded"
          >
            Back
          </a>
          <a
            href={`/resources/${id}/edit`}
            className="bg-primaryColor text-white px-4 py-2 rounded"
          >
            Edit
          </a>
        </div>
      </div>

      <div className="relative flex items-center gap-4 mb-4">
        <div className="absolute bottom-0 left-0 right-0 border-b border-primaryColor z-0"></div>

        <button
          onClick={() => handleTabClick("detalles")}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative z-10 ${
            activeTab === "detalles"
              ? "border border-green-800 border-b-white bg-white rounded-t text-black"
              : "border border-green-800 text-gray-500 bg-gray-100 hover:text-black rounded-t"
          }`}
        >
          Detalles del recurso
        </button>
        <button
          onClick={() => handleTabClick("movimientos")}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative z-10 ${
            activeTab === "movimientos"
              ? "border border-green-800 border-b-white bg-white rounded-t text-black"
              : "border border-green-800 text-gray-500 bg-gray-100 hover:text-black rounded-t"
          }`}
        >
          Movimientos del recurso
        </button>
      </div>

      {activeTab === "detalles" && <ResourceDetails resource={resource} latesMovementDate={lastMovement} />}
      {activeTab === "movimientos" && <Movements movements={movements} />}
    </div>
  );
}
