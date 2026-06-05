import { Modal } from '../ui/Modal';

interface PermisoItem {
    id: number;
    codigo: string;
    nombre: string;
    modulo: string;
}

interface PermisosPopupProps {
    isOpen: boolean;
    onClose: () => void;
    permisosAgrupados: Record<string, PermisoItem[]>;
    selectedPermisos: string[];
    onToggle: (codigo: string) => void;
    onConfirm: () => void;
}

export function PermisosPopup({
    isOpen,
    onClose,
    permisosAgrupados,
    selectedPermisos,
    onToggle,
    onConfirm,
}: PermisosPopupProps) {
    const toggleGrupo = (permisos: PermisoItem[]) => {
        const codigos = permisos.map((p) => p.codigo);
        const allSelected = codigos.every((c) => selectedPermisos.includes(c));
        codigos.forEach((c) => {
            const isSelected = selectedPermisos.includes(c);
            if (allSelected && isSelected) onToggle(c);
            else if (!allSelected && !isSelected) onToggle(c);
        });
    };

    const grupoSeleccionado = (permisos: PermisoItem[]) =>
        permisos.every((p) => selectedPermisos.includes(p.codigo));

    const grupoIndeterminado = (permisos: PermisoItem[]) => {
        const sel = permisos.filter((p) => selectedPermisos.includes(p.codigo)).length;
        return sel > 0 && sel < permisos.length;
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Configurar Permisos" maxWidth="max-w-2xl">
            <div className="p-6 space-y-4 max-h-96 overflow-y-auto">
                {Object.entries(permisosAgrupados).map(([modulo, permisos]) => (
                    <div key={modulo}>
                        {/* Grupo header con checkbox maestro */}
                        <label className="flex items-center gap-2 mb-2 cursor-pointer">
                            <input
                                type="checkbox"
                                checked={grupoSeleccionado(permisos)}
                                ref={(el) => {
                                    if (el) el.indeterminate = grupoIndeterminado(permisos);
                                }}
                                onChange={() => toggleGrupo(permisos)}
                                className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                            />
                            <span className="text-[10px] font-black uppercase tracking-wider text-primary/60">
                                {modulo}
                            </span>
                        </label>

                        {/* Permisos del grupo */}
                        <div className="grid grid-cols-2 gap-2 pl-4">
                            {permisos.map((permiso) => (
                                <label
                                    key={permiso.codigo}
                                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors text-xs"
                                >
                                    <input
                                        type="checkbox"
                                        checked={selectedPermisos.includes(permiso.codigo)}
                                        onChange={() => onToggle(permiso.codigo)}
                                        className="rounded border-slate-300 text-blue-600 focus:ring-blue-500/20"
                                    />
                                    {permiso.nombre}
                                </label>
                            ))}
                        </div>
                    </div>
                ))}
            </div>

            <div className="px-6 py-4 border-t border-slate-200/50 flex justify-between items-center">
                <span className="text-[10px] text-slate-400">
                    {selectedPermisos.length} permiso(s) seleccionado(s)
                </span>
                <div className="flex gap-3">
                    <button
                        onClick={onClose}
                        className="px-5 py-2 bg-surface-container-high text-primary rounded-lg text-xs font-bold uppercase tracking-widest hover:bg-slate-200 transition-colors"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        className="px-5 py-2 bg-gradient-to-r from-primary to-primary-container text-white rounded-lg text-xs font-bold uppercase tracking-widest shadow-lg shadow-blue-900/20 flex items-center gap-2"
                    >
                        <span className="material-symbols-outlined text-sm">check_circle</span>
                        Confirmar
                    </button>
                </div>
            </div>
        </Modal>
    );
}
