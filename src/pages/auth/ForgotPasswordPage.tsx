import { useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'sonner';
import { authApi } from '../../api/auth.api';
import { usePageTitle } from '../../hooks/usePageTitle';

export function ForgotPasswordPage() {
    usePageTitle('Recuperar contraseña');

    const [form, setForm] = useState({ email: '', emailAdmin: '' });
    const [loading, setLoading] = useState(false);
    const [sent, setSent] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await authApi.forgotPassword(form);
            setSent(true);
            toast.success('Correo de recuperación enviado al administrador');
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al enviar el correo';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-surface font-sans">
            <div className="w-full max-w-md">
                <div className="bg-white rounded-2xl shadow-2xl shadow-blue-900/10 overflow-hidden border border-slate-200/50">
                    {/* Header */}
                    <div className="bg-primary px-8 py-10 text-center">
                        <h1 className="text-2xl font-black tracking-tighter text-white uppercase">SIGOP</h1>
                        <p className="text-on-primary-container text-xs font-medium uppercase tracking-widest mt-1">
                            Control de Producción
                        </p>
                    </div>

                    <div className="px-8 py-8">
                        {sent ? (
                            <div className="text-center space-y-4">
                                <div className="w-14 h-14 rounded-full bg-green-100 flex items-center justify-center mx-auto">
                                    <span className="material-symbols-outlined text-green-600 text-2xl">mark_email_read</span>
                                </div>
                                <h2 className="text-lg font-bold text-on-surface">Correo enviado</h2>
                                <p className="text-xs text-slate-400">
                                    El enlace de restablecimiento fue enviado al correo del administrador.
                                </p>
                                <Link
                                    to="/login"
                                    className="inline-flex items-center gap-2 text-xs font-semibold text-secondary hover:text-primary transition-colors"
                                >
                                    <span className="material-symbols-outlined text-sm">arrow_back</span>
                                    Volver al login
                                </Link>
                            </div>
                        ) : (
                            <>
                                <div className="mb-6">
                                    <h2 className="text-lg font-bold text-on-surface">Recuperar contraseña</h2>
                                    <p className="text-xs text-slate-400 mt-1">
                                        El enlace de recuperación se enviará al correo del administrador.
                                    </p>
                                </div>

                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div>
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider mb-1">
                                            Tu correo electrónico
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
                                            Correo del administrador
                                        </label>
                                        <input
                                            type="email"
                                            placeholder="admin@empresa.com"
                                            required
                                            value={form.emailAdmin}
                                            onChange={(e) => setForm({ ...form, emailAdmin: e.target.value })}
                                            className="w-full px-3 py-2.5 bg-slate-50 border border-slate-200 rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all"
                                        />
                                        <p className="text-[10px] text-slate-400 mt-1">
                                            El enlace de recuperación llegará a esta dirección.
                                        </p>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="w-full py-3 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 hover:brightness-110 disabled:opacity-50 flex items-center justify-center gap-2"
                                    >
                                        {loading ? (
                                            <>
                                                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
                                                Enviando...
                                            </>
                                        ) : (
                                            <>
                                                <span className="material-symbols-outlined text-sm">send</span>
                                                Enviar enlace
                                            </>
                                        )}
                                    </button>

                                    <div className="text-center">
                                        <Link
                                            to="/login"
                                            className="inline-flex items-center gap-1 text-xs font-semibold text-secondary hover:text-primary transition-colors"
                                        >
                                            <span className="material-symbols-outlined text-sm">arrow_back</span>
                                            Volver al login
                                        </Link>
                                    </div>
                                </form>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
