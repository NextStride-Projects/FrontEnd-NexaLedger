import { ICompany } from "@/app/utils/interfaces/company/company";

interface CompanyListProps {
  companies: ICompany[];
}

export default function CompanyList({ companies }: CompanyListProps) {
  if (companies.length === 0) {
    return <p className="text-gray-500">No hay empresas disponibles.</p>;
  }

  return (
    <div>
      {companies.map((company) => (
        <div key={company.id} className="p-4">
          {/* ID */}
          <div className="mb-2">
            <span className="font-medium text-gray-700">ID:</span> {company.id}
          </div>

          {/* Nombre completo */}
          {company.fullName && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Nombre Completo:</span> {company.fullName}
            </div>
          )}

          {/* Teléfono */}
          {company.phone && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Teléfono:</span> {company.phone}
            </div>
          )}

          {/* Email */}
          {company.email && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Email:</span> {company.email}
            </div>
          )}

          {/* Descripción */}
          {company.description && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Descripción:</span> {company.description}
            </div>
          )}

          {/* Alias */}
          {company.alias && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Alias:</span> {company.alias}
            </div>
          )}

          {/* Categoría */}
          {company.category && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Categoría:</span> {company.category}
            </div>
          )}

          {/* Ubicación */}
          {company.location && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Ubicación:</span> {company.location}
            </div>
          )}

          {/* Estado */}
          <div className="mb-2">
            <span className="font-medium text-gray-700">Estado:</span>{" "}
            {company.active ? "Activo" : "Inactivo"}
          </div>

          {/* Características */}
          {Array.isArray(company.features) && company.features.length > 0 ? (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Características:</span>{" "}
              {company.features.join(", ")}
            </div>
          ) : (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Características:</span> Sin características
            </div>
          )}

          {/* Responsable */}
          {company.responsiblePerson && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Responsable:</span> {company.responsiblePerson}
            </div>
          )}

          {/* Email del Responsable */}
          {company.responsibleEmail && (
            <div className="mb-2">
              <span className="font-medium text-gray-700">Email del Responsable:</span>{" "}
              {company.responsibleEmail}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}