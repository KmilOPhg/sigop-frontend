import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuthStore } from '../../store/authStore';

interface NavItemProps {
    to: string;
    icon: string;
    label: string;
    active: boolean;
}

function NavItem({ to, icon, label, active }: NavItemProps) {
    return (
        <Link
            to={to}
            className={`flex items-center px-3 py-3 rounded-lg transition-colors duration-200 ${
                active
                    ? 'text-white font-semibold bg-gradient-to-r from-blue-900 to-transparent'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
        >
            <span className="material-symbols-outlined mr-3">{icon}</span>
            <span>{label}</span>
        </Link>
    );
}

interface CollapseGroupProps {
    icon: string;
    label: string;
    active: boolean;
    defaultOpen?: boolean;
    children: React.ReactNode;
}

function CollapseGroup({ icon, label, active, defaultOpen = false, children }: CollapseGroupProps) {
    const [open, setOpen] = useState(defaultOpen);

    return (
        <div>
            <button
                onClick={() => setOpen(!open)}
                className={`w-full flex items-center px-3 py-3 transition-colors duration-200 rounded-lg ${
                    active
                        ? 'text-white font-semibold bg-gradient-to-r from-blue-900 to-transparent'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
                }`}
            >
                <span className="material-symbols-outlined mr-3">{icon}</span>
                <span>{label}</span>
                <span
                    className={`material-symbols-outlined ml-auto text-xs transition-transform ${open ? 'rotate-180' : ''}`}
                >
                    expand_more
                </span>
            </button>
            {open && (
                <div className="mt-1 ml-9 space-y-1 border-l border-slate-700/50">
                    {children}
                </div>
            )}
        </div>
    );
}

function SubLink({ to, label, active }: { to: string; label: string; active: boolean }) {
    return (
        <Link
            to={to}
            className={`block px-4 py-2 transition-colors text-xs ${
                active ? 'text-white font-semibold' : 'text-slate-400 hover:text-slate-200 hover:bg-white/5'
            }`}
        >
            {label}
        </Link>
    );
}

function PlaceholderSubLink({ label }: { label: string }) {
    return (
        <span className="block px-4 py-2 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors text-xs cursor-pointer">
            {label}
        </span>
    );
}

export function Sidebar() {
    const location = useLocation();
    const { usuario } = useAuthStore();

    const isActive = (path: string) => location.pathname.startsWith(path);
    const isAdmin = usuario?.rol === 'admin';

    return (
        <aside className="fixed left-0 top-0 h-full z-40 flex flex-col overflow-y-auto w-64 bg-slate-900/95 backdrop-blur-xl shadow-2xl shadow-blue-900/20 text-sm">
            {/* Brand */}
            <div className="px-6 py-8 flex flex-col gap-1">
                <div className="flex items-center gap-3">
                    <h1 className="text-xl font-black tracking-tighter text-white uppercase">SIGOP</h1>
                </div>
                <p className="text-slate-400 text-xs font-medium uppercase tracking-widest">Control de Producción</p>
            </div>

            {/* Navigation */}
            <nav className="flex-1 px-3 space-y-1">
                {/* Dashboard — solo admin */}
                {isAdmin && (
                    <NavItem
                        to="/dashboard"
                        icon="dashboard"
                        label="Dashboard"
                        active={isActive('/dashboard')}
                    />
                )}

                {/* Planeación — placeholder */}
                <CollapseGroup icon="precision_manufacturing" label="Planeación" active={false}>
                    <PlaceholderSubLink label="Control de fases" />
                    <PlaceholderSubLink label="Asignación de materiales" />
                </CollapseGroup>

                {/* Pedidos — placeholder */}
                <CollapseGroup icon="assignment" label="Pedidos" active={false}>
                    <PlaceholderSubLink label="Importar Órdenes" />
                    <PlaceholderSubLink label="Importar Inventarios" />
                    <PlaceholderSubLink label="Consultar Estado" />
                    <PlaceholderSubLink label="Reasignación de Pedidos" />
                </CollapseGroup>

                {/* Inventarios */}
                <CollapseGroup
                    icon="inventory_2"
                    label="Inventarios"
                    active={isActive('/materiales') || isActive('/bodegas')}
                    defaultOpen={isActive('/materiales') || isActive('/bodegas')}
                >
                    <PlaceholderSubLink label="Stock mínimo" />
                    <PlaceholderSubLink label="Alertas de bajo stock" />
                    <SubLink to="/materiales" label="Materiales" active={isActive('/materiales')} />
                    <SubLink to="/bodegas" label="Bodegas" active={isActive('/bodegas')} />
                </CollapseGroup>

                {/* Reportes — placeholder */}
                <CollapseGroup icon="analytics" label="Reportes" active={false}>
                    <PlaceholderSubLink label="Inventarios" />
                    <PlaceholderSubLink label="Producción" />
                    <PlaceholderSubLink label="Pedidos" />
                </CollapseGroup>

                {/* Administración — solo admin */}
                {isAdmin && (
                    <div className="pt-4 mt-4 border-t border-slate-700/50">
                        <p className="px-3 mb-2 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                            Administración
                        </p>
                        <NavItem
                            to="/usuarios"
                            icon="admin_panel_settings"
                            label="Usuarios"
                            active={isActive('/usuarios')}
                        />
                        <button className="w-full flex items-center px-3 py-3 text-slate-400 hover:text-slate-200 hover:bg-white/5 transition-colors duration-200 rounded-lg">
                            <span className="material-symbols-outlined mr-3">settings</span>
                            <span>Ajustes</span>
                        </button>
                    </div>
                )}
            </nav>

            {/* Footer */}
            <div className="mt-auto border-t border-slate-800 p-3 space-y-1">
                <button className="flex items-center px-3 py-2 text-slate-400 hover:text-slate-200 text-xs transition-colors w-full">
                    <span className="material-symbols-outlined mr-3 text-sm">help</span>
                    <span>Ayuda</span>
                </button>
            </div>
        </aside>
    );
}
