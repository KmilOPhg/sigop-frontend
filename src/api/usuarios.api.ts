import { api } from './axios';
import type { Usuario, CrearUsuarioRequest, ActualizarUsuarioRequest, Rol } from '../types/usuario.types';

export const usuariosApi = {
    listar: () =>
        api.get<{ data: Usuario[] }>('/usuarios'),

    crear: (data: CrearUsuarioRequest) =>
        api.post<{ data: Usuario }>('/usuarios', data),

    actualizar: (id: number, data: ActualizarUsuarioRequest) =>
        api.put<{ data: Usuario }>(`/usuarios/${id}`, data),

    actualizarEstado: (id: number, estado: string) =>
        api.patch<{ data: Usuario }>(`/usuarios/${id}/estado`, { estado }),

    listarRoles: () =>
        api.get<{ data: Rol[] }>('/roles'),

    listarPermisos: () =>
        api.get<{ data: Record<string, { id: number; codigo: string; nombre: string; modulo: string }[]> }>('/permisos'),
};
