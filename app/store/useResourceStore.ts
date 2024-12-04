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
  resource: Resource | null;
  isEditMode: boolean;
  setResource: (newResource: Partial<Resource>) => void;  // Cambiar a Partial<Resource>
  toggleEditMode: () => void;
}

export const useResourceStore = create<ResourceStore>((set) => ({
  resource: null,
  isEditMode: false,
  setResource: (newResource) => set((state) => ({
    resource: state.resource
      ? { ...state.resource, ...newResource }
      : newResource as Resource,
  })),
  toggleEditMode: () => set((state) => ({
    isEditMode: !state.isEditMode,
  })),
}));