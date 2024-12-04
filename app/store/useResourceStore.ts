import { create } from 'zustand';

interface IResource {
  id: number;
  name: string;
  description: string;
  features: string[];
  category: string;
  available: boolean;
  price: number;
  cost: number;
}

interface ResourceState {
    resource: IResource;
    isEditMode: boolean;
    setResource: (resource: IResource) => void;
    toggleEditMode: () => void;
    handleChange: (name: string, value: string | number) => void;
  }
  
  const useResourceStore = create<ResourceState>((set) => ({
    resource: {
      id: 1,
      name: 'Example Item',
      description: 'Detailed description',
      features: ['Feature 1', 'Feature 2'],
      category: 'Category A',
      available: true,
      price: 100,
      cost: 50,
    },
    isEditMode: false,
    // Método para actualizar el recurso
    setResource: (resource) => set({ resource }),
    // Método para alternar el modo de edición
    toggleEditMode: () => set((state) => ({ isEditMode: !state.isEditMode })),
    // Maneja los cambios en los campos
    handleChange: (name, value) =>
      set((state) => ({
        resource: {
          ...state.resource,
          [name]: value, // Actualiza el campo específico
        },
      })),
  }));
  
  export default useResourceStore;