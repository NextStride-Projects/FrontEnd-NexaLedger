import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IResource } from '@/app/utils/interfaces/resources/resources';

interface ResourceState {
  resources: IResource[];
  currentPage: number;
  errorMessage: string;
  setResources: (resources: IResource[]) => void;
  setCurrentPage: (page: number) => void;
  setErrorMessage: (message: string) => void;
  clearResources: () => void;
}

export const useResourcesStore = create<ResourceState>()(
  persist(
    (set) => ({
      resources: [],
      currentPage: 1,
      errorMessage: '',
      setResources: (resources) => set({ resources }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setErrorMessage: (message) => set({ errorMessage: message }),
      clearResources: () => set({ resources: [] }),
    }),
    {
      name: 'resources-storage', // Nombre en el almacenamiento
      storage: createJSONStorage(() => localStorage), // Definir el almacenamiento
    }
  )
);