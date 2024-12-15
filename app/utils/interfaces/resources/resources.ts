export interface IResource {
    id: string;
    name: string;
    description: string;
    features: string[];
    category: string;
    available: boolean;
    saleAvailability: boolean;
    price: number;
    size: number;
    image: string;
    acquiredAt: Date;
    latesMovementDate: Date;
}