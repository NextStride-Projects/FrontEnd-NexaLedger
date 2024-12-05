import { useEffect, useState } from "react";
import { IResource } from "@/app/utils/interfaces/resources";
import TextInput from "@/app/components/Input/TextInput";

interface ResourceDetailsProps {
  resource: IResource;
  isEditMode: boolean;
  handleSave: () => void;
}

const ResourceDetails = ({ resource, isEditMode, handleSave }: ResourceDetailsProps) => {
  const [editableResource, setEditableResource] = useState<IResource>(resource);

  useEffect(() => {
    setEditableResource(resource);
  }, [resource]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setEditableResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  return (
    <div className="max-w-[1600px] min-h-[400px] p-6">
      <div className="flex flex-col sm:flex-row gap-8">
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <TextInput
            label="ID"
            name="id"
            value={editableResource.id}
            editable={false}
            onChange={handleChange}
          />
          <TextInput
            label="Nombre del artículo"
            name="name"
            value={editableResource.name}
            editable={isEditMode}
            onChange={handleChange}
          />
          <TextInput
            label="Descripción detallada"
            name="description"
            value={editableResource.description}
            editable={isEditMode}
            isTextArea={true}
            onChange={handleChange}
          />
          <div className="flex flex-col gap-2">
            <label htmlFor="resource-features" className="text-gray-700">Características</label>
            <div className="flex flex-wrap gap-2">
              {editableResource.features.map((feature, index) => (
                <span key={index} className="px-3 py-1 border rounded-md">{feature}</span>
              ))}
            </div>
          </div>
          <TextInput
            label="Categoría"
            name="category"
            value={editableResource.category}
            editable={isEditMode}
            onChange={handleChange}
          />
        </div>

        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <TextInput
            label="Precio"
            name="price"
            type="number"
            value={editableResource.price}
            editable={isEditMode}
            onChange={handleChange}
          />
        </div>
      </div>
      {isEditMode && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={handleSave}
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceDetails;
