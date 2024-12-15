export interface ICompany {
    id: number;
    phone?: string;
    email?: string;
    fullName?: string;
    description?: string;
    alias?: string;
    category?: string;
    location?: string;
    active: boolean;
    features?: string[];
    responsiblePerson?: string;
    responsibleEmail?: string;
  }