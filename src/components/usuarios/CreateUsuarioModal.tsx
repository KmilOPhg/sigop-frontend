import { useState } from 'react';
import { toast } from 'sonner';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { PermisosPopup } from './PermisosPopup';
import { usuariosApi } from '../../api/usuarios.api';
import type { Rol } from '../../types/usuario.types';

interface PermisoItem {
    id: number;
    codigo: string;
    nombre: string;
    modulo: string;
}

interface CreateUsuarioModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
    roles: Rol[];
    permisosAgrupados: Record<string, PermisoItem[]>;
}

export function CreateUsuarioModal({
    isOpen,
    onClose,
    onCreated,
    roles,
    permisosAgrupados,
}: CreateUsuarioModalProps) {
    const [form, setForm] = useState({ nombre: '', email: '', password: '', rolId: '' });
    const [selectedPermisos, setSelectedPermisos] = useState<string[]>([]);
    const [showPermisos, setShowPermisos] = useState(false);
    const [loading, setLoading] = useState(false);

    const togglePermiso = (codigo: string) => {
        setSelectedPermisos((prev) =>
            prev.includes(codigo) ? prev.filter((c) => c !== codigo) : [...prev, codigo]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!form.rolId) { toast.error('Selecciona un rol'); return; }
        setLoading(true);
        try {
            await usuariosApi.crear({
                nombre: form.nombre,
                email: form.email,
                password: form.password,
                rolId: Number(form.rolId),
            });
            toast.success('Usuario creado correctamente');
            onCreated();
            onClose();
            setForm({ nombre: '', email: '', password: '', rolId: '' });
            setSelectedPermisos([]);
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al crear el usuario';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <Modal isOpen={isOpen} onClose={onClose} title="Crear Usuario" subtitle="Registra un nuevo usuario en el sistema">
                <form onSubmit={handleSubmit} className="p-5 space-y-4">
                    {/* Info básica */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-2">Información Básica</h4>
                        <div className="grid grid-cols-3 gap-3">
                            <Input
                                label="Nombre completo"
                                placeholder="Juan Pérez"
                                required
                                value={form.nombre}
                                onChange={(e) => setForm({ ...form, nombre: e.target.value })}
                            />
                            <Input
                                label="Correo electrónico"
                                type="email"
                                placeholder="usuario@empresa.com"
                                required
                                value={form.email}
                                onChange={(e) => setForm({ ...form, email: e.target.value })}
                            />
                            <Input
                                label="Contraseña"
                                type="password"
                                placeholder="Mínimo 6 caracteres"
                                required
                                minLength={6}
                                value={form.password}
                                onChange={(e) => setForm({ ...form, password: e.target.value })}
                            />
                        </div>
                    </div>

                    {/* Rol */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-2">Rol del Usuario</h4>
                        <div className="grid grid-cols-2 gap-2">
                            {roles.map((rol) => (
                                <label
                                    key={rol.id}
                                    className="flex items-center gap-2 px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg cursor-pointer hover:bg-blue-50 transition-colors text-xs"
                                >
                                    <input
                                        type="radio"
                                        name="rolId-create"
                                        value={rol.id}
                                        checked={form.rolId === String(rol.id)}
                                        onChange={() => setForm({ ...form, rolId: String(rol.id) })}
                                        className="border-slate-300 text-blue-600"
                                    />
                                    {rol.nombre.charAt(0).toUpperCase() + rol.nombre.slice(1)}
                                </label>
                            ))}
                        </div>
                    </div>

                    {/* Permisos */}
                    <div>
                        <h4 className="text-[10px] font-bold uppercase tracking-wider text-primary/60 mb-2">Permisos Adicionales</h4>
                        <div className="flex items-center gap-3">
                            <button
                                type="button"
                                onClick={() => setShowPermisos(true)}
                                className="px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg text-xs font-semibold text-primary hover:bg-blue-50 transition-colors flex items-center gap-2"
                            >
                                <span className="material-symbols-outlined text-sm">tune</span>
                                Configurar Permisos
                            </button>
                            {selectedPermisos.length > 0 ? (
                                <span className="text-[10px] text-slate-400">{selectedPermisos.length} permiso(s) seleccionado(s)</span>
                            ) : (
                                <span className="text-[10px] text-slate-400 italic">Sin permisos adicionales</span>
                            )}
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 pt-3 border-t border-slate-200/50">
                        <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                        <Button type="submit" loading={loading} icon="check_circle">Guardar</Button>
                    </div>
                </form>
            </Modal>

            <PermisosPopup
                isOpen={showPermisos}
                onClose={() => setShowPermisos(false)}
                permisosAgrupados={permisosAgrupados}
                selectedPermisos={selectedPermisos}
                onToggle={togglePermiso}
                onConfirm={() => setShowPermisos(false)}
            />
        </>
    );
}
