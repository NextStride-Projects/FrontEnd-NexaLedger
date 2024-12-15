import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { ICompany } from "../utils/interfaces/company/company"

interface CompanyState {
  companies: ICompany[];
  currentPage: number;
  errorMessage: string;
  setCompanies: (companies: ICompany[]) => void;
  setCurrentPage: (page: number) => void;
  setErrorMessage: (message: string) => void;
  clearCompanies: () => void;
}

export const useCompanyStore = create<CompanyState>()(
  persist(
    (set) => ({
      companies: [],
      currentPage: 1,
      errorMessage: "",
      setCompanies: (companies) => set({ companies }),
      setCurrentPage: (page) => set({ currentPage: page }),
      setErrorMessage: (message) => set({ errorMessage: message }),
      clearCompanies: () => set({ companies: [] }),
    }),
    {
      name: "companies-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);