// app/utils/interfaces/resources.ts

export interface IResource {
    id: number;
    name: string;
    description: string;
    features: string[];
    category: string;
    available: boolean;
    saleAvailability: boolean;
    price: number;
    size: number; // Agregamos 'size'
    image: string; // Agregamos 'image'
  }
  

interface InputFieldProps {
    label: string;
    value: string | boolean;
    name: string;
    editable?: boolean;
    isTextArea?: boolean;
}

interface ILatestMovement {
    id: number;
    date: Date;
    responsible: string;
    reason: string;
    status: string;
}