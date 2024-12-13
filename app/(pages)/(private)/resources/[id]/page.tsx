"use client";

import { useState, useEffect, SetStateAction } from "react";
import { useParams } from "next/navigation";
import axios from "axios";
import ResourceDetails from "@/app/components/Steps/resourcesSteps/ResourcesDetails";
import Movements from "@/app/components/Steps/resourcesSteps/LatestMovements";

export default function ResourceDetailsID() {
  const { id } = useParams();
  const [resource, setResource] = useState(null);
  const [movements, setMovements] = useState([]);
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

    const fetchMovements = async () => {
      try {
        const response = await axios.get(`/api/movement/${id}`);
        setMovements(response.data);
      } catch (error) {
        setErrorMessage("Error fetching movements data.");
      }
    };

    if (id) {
      fetchResource();
      fetchMovements();
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
      <div className="flex justify-between mb-6">
        <h1 className="text-lg font-bold">Resource Details</h1>
        <div className="flex gap-4">
          <a href="/resources" className="bg-gray-500 text-white px-4 py-2 rounded">Back</a>
          <a href={`/resources/${id}/edit`} className="bg-primaryColor text-white px-4 py-2 rounded">Edit</a>
        </div>
      </div>
      <div className="flex items-center gap-4 mb-6">
        <button onClick={() => handleTabClick("detalles")} className={`px-6 py-2 ${activeTab === "detalles" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}>Details</button>
        <button onClick={() => handleTabClick("movimientos")} className={`px-6 py-2 ${activeTab === "movimientos" ? "text-blue-500 border-b-2 border-blue-500" : "text-gray-500"}`}>Movements</button>
      </div>
      {activeTab === "detalles" && <ResourceDetails resource={resource} />}
      {activeTab === "movimientos" && <Movements movements={movements} />}
    </div>
  );
}