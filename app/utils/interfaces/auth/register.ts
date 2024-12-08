import { UUIDTypes } from "uuid";

export interface IRegisterCompany {
    "id": UUIDTypes,
    "phone": string,
    "email": string,
    "fullName": string,
    "description": string,
    "alias": string,
    "category": string,
    "location": string,
    "active": boolean,
    "features": string,
    "responsiblePerson": string,
    "responsibleEmail": string
  }

  export interface IRegisterUser {
    "id": UUIDTypes,
    "name": string,
    "email": string,
    "password": string,
    "empresaId": number
  }