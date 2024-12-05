import { useEffect, useState } from 'react';
import TextInput from '@/app/components/Input/TextInput';

interface Resource {
  id: number;
  name: string;
  description: string;
  features: string[];
  category: string;
  price: number;
}

interface ResourceDetailsProps {
  resource: Resource;
  isEditMode: boolean;
  handleSave: (updatedResource: Resource) => void;
}

const ResourceDetails = ({ resource, isEditMode, handleSave }: ResourceDetailsProps) => {
  const [editableResource, setEditableResource] = useState<Resource>(resource);

  useEffect(() => {
    console.log('[ResourceDetails] useEffect - resource updated:', resource);
    setEditableResource(resource);
  }, [resource]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    console.log(`[ResourceDetails] handleChange - field: ${name}, value: ${value}`);
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
            value={editableResource.id.toString()}
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
        </div>
        <div className="flex flex-col gap-4 w-full sm:w-1/2">
          <TextInput
            label="Precio"
            name="price"
            type="number"
            value={editableResource.price.toString()}
            editable={isEditMode}
            onChange={handleChange}
          />
        </div>
      </div>
      {isEditMode && (
        <div className="mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => handleSave(editableResource)}
          >
            Guardar
          </button>
        </div>
      )}
    </div>
  );
};

export default ResourceDetails;