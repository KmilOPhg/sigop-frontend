import { toast } from 'sonner';
import { bodegasApi } from '../../api/bodegas.api';
import { EstadoBadge } from '../ui/Badge';
import type { Bodega } from '../../types/bodega.types';

interface BodegasTableProps {
    bodegas: Bodega[];
    onEdit: (bodega: Bodega) => void;
    onRefresh: () => void;
}

export function BodegasTable({ bodegas, onEdit, onRefresh }: BodegasTableProps) {
    const handleToggleEstado = async (bodega: Bodega) => {
        const nuevoEstado = bodega.estado === 'activo' ? 'inactivo' : 'activo';
        try {
            await bodegasApi.inhabilitar(bodega.id, nuevoEstado);
            toast.success(`Bodega ${nuevoEstado === 'activo' ? 'habilitada' : 'inhabilitada'} correctamente`);
            onRefresh();
        } catch {
            toast.error('Error al cambiar el estado de la bodega');
        }
    };

    if (bodegas.length === 0) {
        return (
            <div className="px-6 py-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-3xl mb-2 block">warehouse</span>
                No se encontraron bodegas.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-surface-container-high/50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Referencia</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Descripción</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Estado</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/40">
                    {bodegas.map((bodega) => (
                        <tr
                            key={bodega.id}
                            className={`hover:bg-surface-container-lowest transition-colors ${bodega.estado === 'inactivo' ? 'opacity-50' : ''}`}
                        >
                            <td className="px-6 py-4">
                                <span className="text-xs font-bold text-primary">{bodega.referencia}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs text-slate-700">{bodega.descripcion}</span>
                            </td>
                            <td className="px-6 py-4">
                                <EstadoBadge estado={bodega.estado} onClick={() => handleToggleEstado(bodega)} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onEdit(bodega)}
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
    );
}
