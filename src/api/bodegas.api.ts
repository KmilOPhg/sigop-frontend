import { api } from './axios';
import type { Bodega, CrearBodegaRequest, ActualizarBodegaRequest } from '../types/bodega.types';

export const bodegasApi = {
    listar: (estado: string = 'activo') =>
        api.get<{ data: Bodega[] }>(`/bodegas?estado=${estado}`),

    crear: (data: CrearBodegaRequest) =>
        api.post<{ data: Bodega }>('/bodegas', data),

    actualizar: (id: number, data: ActualizarBodegaRequest) =>
        api.put<{ data: Bodega }>(`/bodegas/${id}`, data),

    inhabilitar: (id: number, estado: string) =>
        api.patch<{ data: Bodega }>(`/bodegas/${id}/inhabilitar`, { estado }),
};
