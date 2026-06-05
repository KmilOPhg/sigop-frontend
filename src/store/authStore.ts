import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { AuthUser } from '../types/auth.types';

interface AuthState {
    token: string | null;
    usuario: AuthUser | null;
    permisos: string[];
    login: (token: string, usuario: AuthUser, permisos?: string[]) => void;
    logout: () => void;
    setPermisos: (permisos: string[]) => void;
    hasPermiso: (codigo: string) => boolean;
}

export const useAuthStore = create<AuthState>()(
    persist(
        (set, get) => ({
            token: null,
            usuario: null,
            permisos: [],

            login: (token, usuario, permisos = []) =>
                set({ token, usuario, permisos }),

            logout: () =>
                set({ token: null, usuario: null, permisos: [] }),

            setPermisos: (permisos) =>
                set({ permisos }),

            hasPermiso: (codigo) =>
                get().permisos.includes(codigo),
        }),
        { name: 'sigop-auth' }
    )
);
