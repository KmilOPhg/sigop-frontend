import { useAuthStore } from '../../store/authStore';
import { authApi } from '../../api/auth.api';
import { toast } from 'sonner';

export function Topbar() {
    const { usuario, logout } = useAuthStore();

    const handleLogout = async () => {
        logout();
        toast.success('Sesión cerrada');
        window.location.href = '/login';
    };

    const initials = usuario?.nombre
        ? usuario.nombre.split(' ').map((n) => n[0]).join('').substring(0, 2).toUpperCase()
        : 'U';

    const rolLabel = usuario?.rol
        ? usuario.rol.charAt(0).toUpperCase() + usuario.rol.slice(1)
        : 'Usuario';

    return (
        <header className="sticky top-0 right-0 w-full z-30 flex items-center justify-between px-8 py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/50 text-sm font-medium">
            {/* Search */}
            <div className="flex items-center gap-6 flex-1">
                <div className="relative w-96 group">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600">
                        search
                    </span>
                    <input
                        type="text"
                        className="w-full pl-10 pr-4 py-2 bg-slate-100 border-none rounded-lg focus:ring-2 focus:ring-blue-500/20 text-xs transition-all outline-none"
                        placeholder="Buscar..."
                    />
                </div>
            </div>

            {/* Right side */}
            <div className="flex items-center gap-4">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>

                <div className="h-6 w-px bg-slate-300 mx-2" />

                {/* User info */}
                <div className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold">
                        {initials}
                    </div>
                    <div className="flex flex-col">
                        <span className="text-xs font-semibold text-slate-700">{usuario?.nombre}</span>
                        <span className="text-[10px] text-slate-400">{rolLabel}</span>
                    </div>
                </div>

                {/* Logout */}
                <button
                    onClick={handleLogout}
                    className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-md transition-colors"
                    title="Cerrar sesión"
                >
                    <span className="material-symbols-outlined text-xl">logout</span>
                </button>
            </div>
        </header>
    );
}
