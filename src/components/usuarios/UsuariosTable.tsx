import { toast } from 'sonner';
import { usuariosApi } from '../../api/usuarios.api';
import { EstadoBadge, Badge } from '../ui/Badge';
import type { Usuario } from '../../types/usuario.types';

interface UsuariosTableProps {
    usuarios: Usuario[];
    onEdit: (usuario: Usuario) => void;
    onRefresh: () => void;
}

export function UsuariosTable({ usuarios, onEdit, onRefresh }: UsuariosTableProps) {
    const handleToggleEstado = async (usuario: Usuario) => {
        const nuevoEstado = usuario.estado === 'activo' ? 'inactivo' : 'activo';
        try {
            await usuariosApi.actualizarEstado(usuario.id, nuevoEstado);
            toast.success(`Usuario ${nuevoEstado === 'activo' ? 'activado' : 'desactivado'} correctamente`);
            onRefresh();
        } catch {
            toast.error('Error al cambiar el estado del usuario');
        }
    };

    if (usuarios.length === 0) {
        return (
            <div className="px-6 py-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-3xl mb-2 block">person_off</span>
                No se encontraron usuarios.
            </div>
        );
    }

    return (
        <div className="bg-surface-container-low rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-surface-container-high/50">
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Nombre</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Roles</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Permisos</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Email</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Estado</th>
                            <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter text-right">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-200/40">
                        {usuarios.map((usuario) => (
                            <tr
                                key={usuario.id}
                                className={`hover:bg-surface-container-lowest transition-colors ${usuario.estado === 'inactivo' ? 'opacity-50' : ''}`}
                            >
                                {/* Nombre */}
                                <td className="px-6 py-5">
                                    <div className="flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-primary text-white flex items-center justify-center text-[10px] font-bold">
                                            {usuario.nombre.substring(0, 2).toUpperCase()}
                                        </div>
                                        <span className="text-xs font-semibold text-primary">{usuario.nombre}</span>
                                    </div>
                                </td>

                                {/* Rol */}
                                <td className="px-6 py-5">
                                    <Badge label={usuario.rol.nombre.charAt(0).toUpperCase() + usuario.rol.nombre.slice(1)} variant="role" />
                                </td>

                                {/* Permisos */}
                                <td className="px-6 py-5">
                                    {usuario.rol.nombre === 'admin' ? (
                                        <span className="px-2 py-1 bg-tertiary-fixed text-on-tertiary-container text-[10px] font-bold rounded">
                                            Acceso total
                                        </span>
                                    ) : usuario.permisos.length > 0 ? (
                                        <div className="flex flex-wrap gap-1">
                                            {usuario.permisos.slice(0, 3).map((p) => (
                                                <Badge key={p} label={p} variant="permission" />
                                            ))}
                                            {usuario.permisos.length > 3 && (
                                                <span
                                                    className="px-2 py-1 bg-slate-100 text-slate-500 text-[10px] font-bold rounded cursor-pointer"
                                                    title={usuario.permisos.slice(3).join(', ')}
                                                >
                                                    +{usuario.permisos.length - 3}
                                                </span>
                                            )}
                                        </div>
                                    ) : (
                                        <span className="text-xs text-slate-400 italic">Sin permisos</span>
                                    )}
                                </td>

                                {/* Email */}
                                <td className="px-6 py-5">
                                    <span className="text-xs text-slate-500">{usuario.email}</span>
                                </td>

                                {/* Estado */}
                                <td className="px-6 py-5">
                                    <EstadoBadge estado={usuario.estado} onClick={() => handleToggleEstado(usuario)} />
                                </td>

                                {/* Acciones */}
                                <td className="px-6 py-5 text-right">
                                    <button
                                        onClick={() => onEdit(usuario)}
                                        className="inline-flex items-center gap-1 px-3 py-1.5 bg-surface-container-high text-primary text-[10px] font-bold uppercase tracking-widest rounded hover:bg-blue-50 transition-colors"
                                    >
                                        <span className="material-symbols-outlined text-sm">edit</span>
                                        Editar
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
