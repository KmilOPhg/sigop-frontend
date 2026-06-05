export interface AuthUser {
    id: number;
    nombre: string;
    email: string;
    rol: string;
    estado: string;
}

export interface MeResponse {
    id: number;
    nombre: string;
    email: string | null;
    estado: string;
    rol: { id: number; nombre: string };
    permisos: string[];
}

export interface LoginRequest {
    email: string;
    password: string;
}

export interface ForgotPasswordRequest {
    email: string;
    emailAdmin: string;
}

export interface ResetPasswordRequest {
    email: string;
    token: string;
    password: string;
}
