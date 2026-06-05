import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../../api/auth.api';
import { useAuthStore } from '../../store/authStore';
import { usePageTitle } from '../../hooks/usePageTitle';

export function LoginPage() {
    usePageTitle('Iniciar sesión');
    const navigate = useNavigate();
    const { login } = useAuthStore();

    const [form, setForm] = useState({ email: '', password: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);
        try {
            const res = await authApi.login(form);
            const { token, usuario } = res.data.data;
            // Obtener permisos del perfil
            login(token, usuario);
            toast.success(`Bienvenido, ${usuario.nombre}`);
            navigate('/dashboard');
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Credenciales incorrectas';
            setError(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface font-sans">
            <div className="w-full max-w-md">
                {/* Card */}
                <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-200/50">
                    {/* Header */}
                    <div className="bg-primary px-8 py-10 text-center">
                        <h1 className="text-2xl font-black tracking-tighter text-white uppercase">SIGOP</h1>
                        <p className="text-on-primary-container text-xs font-medium uppercase tracking-widest mt-1">
                            Control de Producción
                        </p>
                    </div>

                    {/* Form */}
                    <div className="px-8 py-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-on-surface">Iniciar sesión</h2>
                            <p className="text-xs text-slate-400 mt-1">Ingresa tus credenciales para continuar</p>
                        </div>

                        {error && (
                            <div className="mb-4 px-4 py-3 bg-red-50 border border-red-200 rounded-lg text-xs text-red-700 flex items-center gap-2">
                                <span className="material-symbols-outlined text-sm">error</span>
                                {error}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Correo electrónico
                                </label>
                                <input
                                    type="email"
                                    placeholder="usuario@empresa.com"
                                    required
                                    value={form.email}
                                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Contraseña
                                </label>
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    required
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div className="flex items-center justify-end">
                                <a
                                    href="/forgot-password"
                                    className="text-[10px] text-secondary hover:text-primary transition-colors font-semibold"
                                >
                                    ¿Olvidaste tu contraseña?
                                </a>
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:brightness-110 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                        Ingresando...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-sm">login</span>
                                        Ingresar
                                    </>
                                )}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
