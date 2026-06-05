import { useState, useEffect } from 'react';
import { toast } from 'sonner';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { bodegasApi } from '../../api/bodegas.api';
import type { Bodega } from '../../types/bodega.types';

interface EditBodegaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onUpdated: () => void;
    bodega: Bodega | null;
}

export function EditBodegaModal({ isOpen, onClose, onUpdated, bodega }: EditBodegaModalProps) {
    const [form, setForm] = useState({ referencia: '', descripcion: '' });
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (bodega) {
            setForm({ referencia: bodega.referencia, descripcion: bodega.descripcion });
        }
    }, [bodega]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!bodega) return;
        setLoading(true);
        try {
            await bodegasApi.actualizar(bodega.id, form);
            toast.success('Bodega actualizada correctamente');
            onUpdated();
            onClose();
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al actualizar la bodega';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Editar Bodega" subtitle={bodega ? `ID: ${bodega.id}` : ''}>
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Referencia"
                        required
                        value={form.referencia}
                        onChange={(e) => setForm({ ...form, referencia: e.target.value })}
                    />
                    <Input
                        label="Descripción"
                        required
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
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
