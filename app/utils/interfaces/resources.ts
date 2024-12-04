export interface IResource {
    id: number;
    name: string;
    description: string;
    features: string[];
    category: string;
    size: number;
    available: boolean;
    saleAvailability: boolean;
    price: number;
    cost: number;
    image: string;
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