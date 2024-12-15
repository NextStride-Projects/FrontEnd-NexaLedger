import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import { IRegisterUser, IRegisterCompany } from '@/app/utils/interfaces/auth/register';

interface AuthState {
  user: IRegisterUser | null;
  company: IRegisterCompany | null;
  setUser: (user: IRegisterUser) => void;
  setCompany: (company: IRegisterCompany) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      company: null,
      setUser: (user) => set({ user }),
      setCompany: (company) => set({ company }),
      clearAuth: () => set({ user: null, company: null }),
    }),
    {
      name: 'auth-storage', // Nombre en el almacenamiento
      storage: createJSONStorage(() => localStorage), // Definir el almacenamiento
    }
  )
);