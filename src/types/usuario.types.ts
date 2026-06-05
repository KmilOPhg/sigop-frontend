export interface Rol {
    id: number;
    nombre: string;
    descripcion?: string;
    activo?: boolean;
}

export interface Permiso {
    id: number;
    codigo: string;
    nombre: string;
    descripcion?: string;
    modulo: string;
}

export interface Usuario {
    id: number;
    nombre: string;
    email: string | null;
    estado: string;
    rol: { id: number; nombre: string };
    permisos: string[];
    createdAt: string;
}

export interface CrearUsuarioRequest {
    nombre: string;
    email: string;
    password: string;
    rolId: number;
}

export interface ActualizarUsuarioRequest {
    nombre: string;
    email: string;
    password?: string;
    estado: string;
    rolId: number;
}
