import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../../api/auth.api';
import { usePageTitle } from '../../hooks/usePageTitle';

export function ResetPasswordPage() {
    usePageTitle('Restablecer contraseña');
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();

    const token = searchParams.get('token') || '';
    const email = searchParams.get('email') || '';

    const [form, setForm] = useState({ password: '', confirm: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (form.password !== form.confirm) {
            toast.error('Las contraseñas no coinciden');
            return;
        }
        setLoading(true);
        try {
            await authApi.resetPassword({ email, token, password: form.password });
            toast.success('Contraseña restablecida correctamente');
            navigate('/login');
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al restablecer la contraseña';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    if (!token || !email) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface font-sans">
                <div className="text-center space-y-4">
                    <span className="material-symbols-outlined text-4xl text-slate-400">link_off</span>
                    <h2 className="text-lg font-bold text-on-surface">Enlace inválido</h2>
                    <p className="text-xs text-slate-400">Este enlace no es válido o ha expirado.</p>
                    <Link to="/forgot-password" className="inline-block text-xs font-semibold text-secondary hover:text-primary">
                        Solicitar un nuevo enlace
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface font-sans">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-200/50">
                    <div className="bg-primary px-8 py-10 text-center">
                        <h1 className="text-2xl font-black tracking-tighter text-white uppercase">SIGOP</h1>
                        <p className="text-on-primary-container text-xs font-medium uppercase tracking-widest mt-1">
                            Control de Producción
                        </p>
                    </div>

                    <div className="px-8 py-8">
                        <div className="mb-6">
                            <h2 className="text-lg font-bold text-on-surface">Nueva contraseña</h2>
                            <p className="text-xs text-slate-400 mt-1">
                                Ingresa tu nueva contraseña para <strong>{email}</strong>
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Nueva contraseña
                                </label>
                                <input
                                    type="password"
                                    placeholder="Mínimo 6 caracteres"
                                    required
                                    minLength={6}
                                    value={form.password}
                                    onChange={(e) => setForm({ ...form, password: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                    Confirmar contraseña
                                </label>
                                <input
                                    type="password"
                                    placeholder="Repite la contraseña"
                                    required
                                    minLength={6}
                                    value={form.confirm}
                                    onChange={(e) => setForm({ ...form, confirm: e.target.value })}
                                    className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={loading}
                                className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
                            >
                                {loading ? (
                                    <>
                                        <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                        Guardando...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-sm">lock_reset</span>
                                        Restablecer contraseña
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
