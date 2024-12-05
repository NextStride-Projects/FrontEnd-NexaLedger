import axios from 'axios';
import { IResource } from '@/app/utils/interfaces/resources';

const API_URL = 'http://localhost:5000/api/resources';

export const fetchResources = async (): Promise<IResource[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los recursos:", error);
    return [];
  }
};

export const fetchResourceById = async (id: number): Promise<IResource | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log(response.data)
    return response.data;
  } catch (error) {
    console.error("Error al obtener el recurso:", error);
    return null;
  }
};