import { api } from './axios';

export interface DashboardData {
    bodegasReferencias: { referencia: string; nombre: string; estado: string; total: number }[];
    materialesItems: { item: string; nombre: string; estado: string; total: number }[];
    totales: {
        bodegas: { activas: number; inactivas: number };
        materiales: { activas: number; inactivas: number };
    };
}

export const dashboardApi = {
    getData: () =>
        api.get<{ data: DashboardData }>('/dashboard/data'),

    getBodegasPorReferencia: (referencia: string) =>
        api.get<{ data: { id: number; referencia: string; descripcion: string; estado: string }[] }>(`/dashboard/bodegas/${referencia}`),

    getMaterialesPorItem: (item: string) =>
        api.get<{ data: { id: number; itemMaterial: string; nombreMaterial: string; unidadMedida: string; estado: string }[] }>(`/dashboard/materiales/${item}`),
};
