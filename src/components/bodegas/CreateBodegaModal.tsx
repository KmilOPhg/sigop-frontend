import { useState } from 'react';
import { toast } from 'sonner';
import { Modal } from '../ui/Modal';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { bodegasApi } from '../../api/bodegas.api';

interface CreateBodegaModalProps {
    isOpen: boolean;
    onClose: () => void;
    onCreated: () => void;
}

export function CreateBodegaModal({ isOpen, onClose, onCreated }: CreateBodegaModalProps) {
    const [form, setForm] = useState({ referencia: '', descripcion: '' });
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        try {
            await bodegasApi.crear(form);
            toast.success('Bodega creada correctamente');
            onCreated();
            onClose();
            setForm({ referencia: '', descripcion: '' });
        } catch (err: unknown) {
            const msg = (err as { response?: { data?: { msg?: string } } })?.response?.data?.msg || 'Error al crear la bodega';
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Crear Bodega" subtitle="Registra una nueva bodega">
            <form onSubmit={handleSubmit} className="p-5 space-y-4">
                <div className="grid grid-cols-2 gap-3">
                    <Input
                        label="Referencia"
                        placeholder="BOD-001"
                        required
                        value={form.referencia}
                        onChange={(e) => setForm({ ...form, referencia: e.target.value })}
                    />
                    <Input
                        label="Descripción"
                        placeholder="Bodega principal..."
                        required
                        value={form.descripcion}
                        onChange={(e) => setForm({ ...form, descripcion: e.target.value })}
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
