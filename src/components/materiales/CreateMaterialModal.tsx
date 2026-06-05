import { useState } from 'react';
import { toast } from 'sonner';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { materialesApi } from '../../api/materiales.api';

interface CreateMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export function CreateMaterialModal({ isOpen, onClose, onCreated }: CreateMaterialModalProps) {
    const [form, setForm] = useState({ itemMaterial: '', nombreMaterial: '', unidadMedida: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await materialesApi.crear(form);
            toast.success('Material creado correctamente');
            onCreated();
            onClose();
            setForm({ itemMaterial: '', nombreMaterial: '', unidadMedida: '' });
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al crear el material';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Material" subtitle="Registra un nuevo material en el inventario">
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-3 gap-3">
                    <Input
                        label="Ítem del material"
                        placeholder="MAT-001"
                        required
                        value={form.itemMaterial}
                        onChange={(e) => setForm({ ...form, itemMaterial: e.target.value })}
                    />
                    <Input
                        label="Nombre del material"
                        placeholder="Tela algodón"
                        required
                        value={form.nombreMaterial}
                        onChange={(e) => setForm({ ...form, nombreMaterial: e.target.value })}
                    />
                    <Input
                        label="Unidad de medida"
                        placeholder="metros, kg, unidades..."
                        required
                        value={form.unidadMedida}
                        onChange={(e) => setForm({ ...form, unidadMedida: e.target.value })}
                    />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-200/50">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" loading={loading} icon="check_circle">Guardar</Button>
                </div>
            </form>
        </Modal>
    );
}
