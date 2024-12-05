// app/store/useResourceStore.ts
import { create } from 'zustand';

interface Resource {
  id: number;
  name: string;
  description: string;
  features: string[];
  category: string;
  available: boolean;
  saleAvailability: boolean;
  price: number;
  size: number;
  image: string;
}

interface ResourceStore {
  resources: Resource[];  // Lista de recursos
  isEditMode: boolean;
  setResource: (updatedResource: Resource) => void;
  setResources: (newResources: Resource[]) => void;  // Función para establecer todos los recursos
  toggleEditMode: () => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resources: [],  // Almacenamos una lista de recursos
  isEditMode: false,
  setResource: (updatedResource) =>
    set((state) => ({
      resources: state.resources.map((resource) =>
        resource.id === updatedResource.id ? updatedResource : resource
      ),
    })),
  setResources: (newResources) => set(() => ({ resources: newResources })),
  toggleEditMode: () => set((state) => ({
    isEditMode: !state.isEditMode,
  })),
}));