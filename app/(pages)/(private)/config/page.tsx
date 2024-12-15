"use client";

import { useEffect, useState, SetStateAction } from "react";
import { useCompanyStore } from "@/app/store/useCompanyStore";
import CompanyDetails from "@/app/components/Steps/companySteps/companyDetails";
import axios from "axios";
import { getCookie } from "@/app/utils/functions/cookies";
import UserTable from "@/app/components/Steps/companySteps/usersTable";

export default function Company() {
  const { companies, setCompanies } = useCompanyStore();
  const [users, setUsers] = useState<{ id: number; name: string; email: string }[]>([]); // Renombrado a "users" para mayor claridad
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [activeTab, setActiveTab] = useState("detalles");
  const [selectedCompanyId, setSelectedCompanyId] = useState<number | undefined>(undefined);

  useEffect(() => {
    const fetchCompanyDetails = async () => {
      setIsLoading(true);
      try {
        const token = getCookie("token");
        if (!token) throw new Error("Token de autenticación no encontrado.");

        const response = await axios.get("/api/company/read", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (response.status !== 200) throw new Error(`Error: ${response.statusText}`);

        const { empresas } = response.data;
        setCompanies(empresas || []);
      } catch (error) {
        setErrorMessage("Error al obtener los datos de las empresas.");
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCompanyDetails();
  }, [setCompanies]);

  useEffect(() => {
    const fetchUsers = async () => {
      if (activeTab === "usuarios" && selectedCompanyId !== undefined) {
        setIsLoading(true);
        try {
          const token = getCookie("token");
          if (!token) throw new Error("Token de autenticación no encontrado.");
  
          const response = await axios.get(`/api/company/${selectedCompanyId}`, {
            headers: { Authorization: `Bearer ${token}` },
          });
  
          if (response.status !== 200) throw new Error(`Error: ${response.statusText}`);
  
          const usuarios = response.data;
  
          setUsers(usuarios);
        } catch (error) {
          setErrorMessage("Error al obtener los datos de los usuarios.");
          console.error(error);
        } finally {
          setIsLoading(false);
        }
      }
    };
  
    fetchUsers();
  }, [activeTab, selectedCompanyId]);
  

  const handleTabClick = (tab: SetStateAction<string>, companyId?: number) => {
    setActiveTab(tab);
    setSelectedCompanyId(companyId ?? undefined);
  };

  if (isLoading) return <p className="text-gray-500">Cargando datos...</p>;
  if (errorMessage) return <p className="text-red-500">{errorMessage}</p>;


  return (
    <div className="p-6">
      <div className="flex justify-end mb-6">
        <div className="flex gap-4">
          <a href={`/registerUser`} className="bg-primaryColor text-white px-4 py-2 rounded">
            Añadir Usuario
          </a>
          <a href={`/company`} className="bg-primaryColor text-white px-4 py-2 rounded">
            Editar datos de la Empresa
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
          Detalles de la empresa
        </button>
        <button
          onClick={() => handleTabClick("usuarios", companies[0]?.id)}
          className={`px-4 py-2 text-sm font-medium transition-all duration-300 relative z-10 ${
            activeTab === "usuarios"
              ? "border border-green-800 border-b-white bg-white rounded-t text-black"
              : "border border-green-800 text-gray-500 bg-gray-100 hover:text-black rounded-t"
          }`}
        >
          Usuarios registrados
        </button>
      </div>

      <div className="p-4">
        {activeTab === "detalles" ? (
          <CompanyDetails companies={companies} />
        ) : activeTab === "usuarios" ? (
          <UserTable users={users} /> // Verifica que el prop sea "users" y no "user"
        ) : (
          <p className="text-gray-500">No se encontraron datos.</p>
        )}
      </div>
    </div>
  );
}
