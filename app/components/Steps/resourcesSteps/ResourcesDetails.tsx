import { useEffect, useState } from "react";
import { IResource } from "@/app/utils/interfaces/resources";

interface ResourceDetailsProps {
  resource: IResource;
  isEditMode: boolean;
}

const ResourceDetails = ({ resource, isEditMode }: ResourceDetailsProps) => {
  const [editableResource, setEditableResource] = useState<IResource>(resource);

  useEffect(() => {
    setEditableResource(resource);
  }, [resource]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setEditableResource((prevResource) => ({
      ...prevResource,
      [name]: value,
    }));
  };

  return (
    <div>
      <form>
        <div>
          <label>Nombre</label>
          <input
            type="text"
            name="name"
            value={editableResource.name}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label>Descripción</label>
          <input
            type="text"
            name="description"
            value={editableResource.description}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>
        <div>
          <label>Precio</label>
          <input
            type="number"
            name="price"
            value={editableResource.price}
            onChange={handleChange}
            disabled={!isEditMode}
          />
        </div>
        
      </form>
    </div>
  );
};

export default ResourceDetails;