import { toast } from 'sonner';
import { materialesApi } from '../../api/materiales.api';
import { EstadoBadge } from '../ui/Badge';
import type { Material } from '../../types/material.types';

interface MaterialesTableProps {
    materiales: Material[];
    onEdit: (material: Material) => void;
    onRefresh: () => void;
}

export function MaterialesTable({ materiales, onEdit, onRefresh }: MaterialesTableProps) {
    const handleToggleEstado = async (material: Material) => {
        const nuevoEstado = material.estado === 'activo' ? 'inactivo' : 'activo';
        try {
            await materialesApi.inhabilitar(material.id, nuevoEstado);
            toast.success(`Material ${nuevoEstado === 'activo' ? 'habilitado' : 'inhabilitado'} correctamente`);
            onRefresh();
        } catch {
            toast.error('Error al cambiar el estado del material');
        }
    };

    if (materiales.length === 0) {
        return (
            <div className="px-6 py-12 text-center text-slate-400">
                <span className="material-symbols-outlined text-3xl mb-2 block">inventory_2</span>
                No se encontraron materiales.
            </div>
        );
    }

    return (
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-surface-container-high/50">
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Ítem</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Nombre</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Unidad</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter">Estado</th>
                        <th className="px-6 py-4 text-[10px] font-black uppercase text-slate-500 tracking-tighter text-right">Acciones</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-slate-200/40">
                    {materiales.map((material) => (
                        <tr
                            key={material.id}
                            className={`hover:bg-surface-container-lowest transition-colors ${material.estado === 'inactivo' ? 'opacity-50' : ''}`}
                        >
                            <td className="px-6 py-4">
                                <span className="text-xs font-bold text-primary">{material.itemMaterial}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs text-slate-700">{material.nombreMaterial}</span>
                            </td>
                            <td className="px-6 py-4">
                                <span className="text-xs text-slate-500">{material.unidadMedida}</span>
                            </td>
                            <td className="px-6 py-4">
                                <EstadoBadge estado={material.estado} onClick={() => handleToggleEstado(material)} />
                            </td>
                            <td className="px-6 py-4 text-right">
                                <button
                                    onClick={() => onEdit(material)}
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
