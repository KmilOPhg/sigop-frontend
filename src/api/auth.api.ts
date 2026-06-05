import { api } from './axios';
import type { LoginRequest, ForgotPasswordRequest, ResetPasswordRequest, MeResponse } from '../types/auth.types';

export const authApi = {
    login: (data: LoginRequest) =>
        api.post<{ data: { token: string; usuario: { id: number; nombre: string; email: string; rol: string; estado: string } } }>('/auth/login', data),

    forgotPassword: (data: ForgotPasswordRequest) =>
        api.post('/auth/forgot-password', data),

    resetPassword: (data: ResetPasswordRequest) =>
        api.post('/auth/reset-password', data),

    me: () =>
        api.get<{ data: MeResponse }>('/auth/me'),
};
