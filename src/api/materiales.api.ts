import { api } from './axios';
import type { Material, CrearMaterialRequest, ActualizarMaterialRequest } from '../types/material.types';

export const materialesApi = {
    listar: (estado: string = 'activo') =>
        api.get<{ data: Material[] }>(`/materiales?estado=${estado}`),

    crear: (data: CrearMaterialRequest) =>
        api.post<{ data: Material }>('/materiales', data),

    actualizar: (id: number, data: ActualizarMaterialRequest) =>
        api.put<{ data: Material }>(`/materiales/${id}`, data),

    inhabilitar: (id: number, estado: string) =>
        api.patch<{ data: Material }>(`/materiales/${id}/inhabilitar`, { estado }),
};
