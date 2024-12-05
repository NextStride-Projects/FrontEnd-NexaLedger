import axios from 'axios';
import { IResource } from '@/app/utils/interfaces/resources';

const API_URL = 'http://localhost:5000/api/resources';

/**
 * Obtiene todos los recursos desde el backend.
 */
export const fetchResources = async (): Promise<IResource[]> => {
  try {
    const response = await axios.get(API_URL);
    return response.data;
  } catch (error) {
    console.error("Error al obtener los recursos:", error);
    return [];
  }
};

/**
 * Obtiene un recurso específico por su ID.
 * @param id ID del recurso.
 */
export const fetchResourceById = async (id: number): Promise<IResource | null> => {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    console.log("[fetchResourceById] Response data:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al obtener el recurso:", error);
    return null;
  }
};

/**
 * Actualiza un recurso en el backend.
 * @param resource El recurso con los datos actualizados.
 */
export const updateResource = async (resource: IResource): Promise<IResource | null> => {
  try {
    const response = await axios.put(`${API_URL}/${resource.id}`, resource, {
      headers: { "Content-Type": "application/json" },
    });
    console.log("[updateResource] Recurso actualizado:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error al actualizar el recurso:", error);
    return null;
  }
};
