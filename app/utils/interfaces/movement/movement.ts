import { UUIDTypes } from "uuid";

export interface ILatestMovement {
    resourceId: UUIDTypes;
    userId: UUIDTypes;
    type: string;
    description: string;
    timestamp: string;
}