import React from "react";
import { IResource } from "@/app/utils/interfaces/resources"; // Asegurando que tienes la interfaz IResource
import TextInput from "@/app/components/Input/TextInput";
import CheckInput from "@/app/components/Input/CheckInput";

interface ResourceDetailsProps {
  resource: IResource;
  isEditMode: boolean;
  handleChange: (name: string, value: string) => void;
}

const ResourceDetails: React.FC<ResourceDetailsProps> = ({ resource, isEditMode, handleChange }) => {
  return (
    <div className="max-w-[1600px] min-h-[400px] p-6">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <TextInput label="ID" value={resource.id} name="resource-id" editable={false} />
          <TextInput
            label="Nombre del artículo"
            value={resource.name}
            name="resource-name"
            editable={isEditMode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <TextInput
            label="Descripción detallada"
            value={resource.description}
            name="resource-description"
            editable={isEditMode}
            isTextArea
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="resource-features" className="text-gray-700">Características</label>
            <div className="flex flex-wrap gap-2">
              {resource.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 border rounded-md">{feature}</span>
              ))}
            </div>
          </div>
          <TextInput
            label="Categoría"
            value={resource.category}
            name="resource-category"
            editable={isEditMode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <CheckInput
            label="Disponibilidad de recurso"
            value={resource.available ? "✔" : "x"}
            name="resource-availability"
            editable={isEditMode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <CheckInput
            label="Disponibilidad de venta"
            value={resource.saleAvailability ? "✔" : "x"}
            name="resource-availability-sale"
            editable={isEditMode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
          <TextInput
            label="Precio"
            value={resource.price}
            name="resource-price"
            editable={isEditMode}
            onChange={(e) => handleChange(e.target.name, e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default ResourceDetails;