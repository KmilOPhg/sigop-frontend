import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { materialesApi } from '../../api/materiales.api';
import type { Material } from '../../types/material.types';

interface EditMaterialModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdated: () => void;
    material: Material | null;
}

export function EditMaterialModal({ isOpen, onClose, onUpdated, material }: EditMaterialModalProps) {
    const [form, setForm] = useState({ nombreMaterial: '', unidadMedida: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (material) {
            setForm({ nombreMaterial: material.nombreMaterial, unidadMedida: material.unidadMedida });
        }
    }, [material]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!material) return;
        setLoading(true);
        try {
            await materialesApi.actualizar(material.id, form);
            toast.success('Material actualizado correctamente');
            onUpdated();
            onClose();
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al actualizar el material';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title="Editar Material"
            subtitle={material ? `Ítem: ${material.itemMaterial}` : ''}
        >
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Nombre del material"
                        required
                        value={form.nombreMaterial}
                        onChange={(e) => setForm({ ...form, nombreMaterial: e.target.value })}
                    />
                    <Input
                        label="Unidad de medida"
                        required
                        value={form.unidadMedida}
                        onChange={(e) => setForm({ ...form, unidadMedida: e.target.value })}
                    />
                </div>
                <div className="flex justify-end gap-3 pt-3 border-t border-slate-200/50">
                    <Button type="button" variant="secondary" onClick={onClose}>Cancelar</Button>
                    <Button type="submit" loading={loading} icon="check_circle">Actualizar</Button>
                </div>
            </form>
        </Modal>
    );
}
