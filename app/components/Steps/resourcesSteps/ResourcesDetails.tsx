import { IResource } from "@/app/utils/interfaces/resources/resources";
import { FaTag, FaCheckCircle, FaTimesCircle, FaDollarSign, FaCube, FaCalendarAlt, FaClock } from "react-icons/fa";

interface ResourceDetailsProps {
  resource: IResource | null;
  latesMovementDate: string | null;
}

export default function ResourceDetails({ resource, latesMovementDate }: ResourceDetailsProps) {
  if (!resource) {
    return <p className="text-gray-500">No resource data available.</p>;
  }

  return (
    <div className="bg-white shadow-lg rounded-lg p-6">
      <h1>hola 1</h1>
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Left Section */}
        <div className="flex-shrink-0">
          <img
            src={resource.image || "/placeholder.jpg"}
            alt={resource.name}
            className="w-48 h-48 object-cover rounded-lg border"
          />
        </div>

        {/* Right Section */}
        <div className="flex-grow">
          <h2 className="text-2xl font-bold mb-2 text-gray-800">{resource.name}</h2>
          <p className="text-gray-600 mb-4">{resource.description}</p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {/* Category */}
            <div className="flex items-center">
              <FaTag className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Categoría:</span>{resource.category}
            </div>

            {/* Availability */}
            <div className="flex items-center">
              {resource.available ? (
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className="text-gray-700 font-medium">Disponible: </span>{" "}
              {resource.available ? " Sí" : " No"}
            </div>

            {/* Price */}
            <div className="flex items-center">
              <FaDollarSign className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Precio:</span> ${resource.price}
            </div>
            {/* Sale Availability */}
            <div className="flex items-center">
              {resource.saleAvailability ? (
                <FaCheckCircle className="h-5 w-5 text-green-500 mr-2" />
              ) : (
                <FaTimesCircle className="h-5 w-5 text-red-500 mr-2" />
              )}
              <span className="text-gray-700 font-medium">Disponible para venta:</span>{" "}
              {resource.saleAvailability ? " Sí" : " No"}
            </div>

            {/* Quantity */}
            <div className="flex items-center">
              <FaCube className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Cantidad:</span> {resource.size}
            </div>

            {/* Acquired Date */}
            <div className="flex items-center">
              <FaCalendarAlt className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Creado en:</span>{" "}
              {resource.acquiredAt
                ? new Date(resource.acquiredAt).toLocaleDateString()
                : "N/A"}
            </div>

            {/* Latest Movement Date */}
            <div className="flex items-center">
              <FaClock className="h-5 w-5 text-gray-500 mr-2" />
              <span className="text-gray-700 font-medium">Último movimiento:</span>{" "}
              {latesMovementDate ? new Date(latesMovementDate).toLocaleDateString() : "N/A"}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}