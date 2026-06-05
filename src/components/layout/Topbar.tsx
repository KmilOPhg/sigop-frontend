import { useAuthStore } from '../../store/authStore';
import { toast } from 'sonner';

interface TopbarProps {
    onMenuClick: () => void;
}

export function Topbar({ onMenuClick }: TopbarProps) {
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
        <header className="sticky top-0 right-0 w-full z-30 flex items-center justify-between px-4 sm:px-8 py-3 sm:py-4 bg-white/80 backdrop-blur-md border-b border-slate-200/50 text-sm font-medium gap-3">
            {/* Hamburguesa — solo en móvil */}
            <button
                onClick={onMenuClick}
                className="md:hidden p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors flex-shrink-0"
                aria-label="Abrir menú"
            >
                <span className="material-symbols-outlined">menu</span>
            </button>

            {/* Search */}
            <div className="flex items-center flex-1 min-w-0">
                <div className="relative w-full sm:w-72 md:w-96 group">
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
            <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                <button className="p-2 text-slate-500 hover:bg-slate-100 rounded-md transition-colors">
                    <span className="material-symbols-outlined">notifications</span>
                </button>

                <div className="hidden sm:block h-6 w-px bg-slate-300" />

                {/* User info */}
                <div className="flex items-center gap-2 sm:gap-3">
                    <div className="h-8 w-8 sm:h-9 sm:w-9 rounded-full bg-primary text-white flex items-center justify-center text-sm font-bold flex-shrink-0">
                        {initials}
                    </div>
                    <div className="hidden sm:flex flex-col">
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
