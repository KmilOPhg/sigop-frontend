import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { bodegasApi } from '../api/bodegas.api';
import { BodegasTable } from '../components/bodegas/BodegasTable';
import { CreateBodegaModal } from '../components/bodegas/CreateBodegaModal';
import { EditBodegaModal } from '../components/bodegas/EditBodegaModal';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { usePageTitle } from '../hooks/usePageTitle';
import type { Bodega } from '../types/bodega.types';

export function BodegasPage() {
    usePageTitle('Bodegas');
    const [bodegas, setBodegas] = useState<Bodega[]>([]);
    const [loading, setLoading] = useState(true);
    const [estadoFiltro, setEstadoFiltro] = useState<'activo' | 'inactivo'>('activo');
    const [showCreate, setShowCreate] = useState(false);
    const [editBodega, setEditBodega] = useState<Bodega | null>(null);

    const fetchBodegas = async () => {
        setLoading(true);
        try {
            const res = await bodegasApi.listar(estadoFiltro);
            setBodegas(res.data.data);
        } catch {
            toast.error('Error al cargar bodegas');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchBodegas(); }, [estadoFiltro]);

    return (
        <div className="space-y-6">
            <PageHeader
                section="Inventarios"
                title="Bodegas"
                action={
                    <Button icon="add" onClick={() => setShowCreate(true)}>
                        Crear Bodega
                    </Button>
                }
            />

            {/* Filtro de estado */}
            <div className="flex gap-2">
                <button
                    onClick={() => setEstadoFiltro('activo')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                        estadoFiltro === 'activo'
                            ? 'bg-green-100 text-green-700'
                            : 'bg-surface-container text-slate-500 hover:bg-surface-container-high'
                    }`}
                >
                    Activas
                </button>
                <button
                    onClick={() => setEstadoFiltro('inactivo')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                        estadoFiltro === 'inactivo'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-surface-container text-slate-500 hover:bg-surface-container-high'
                    }`}
                >
                    Inactivas
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden">
                {loading ? (
                    <div className="h-48 animate-pulse bg-surface-container-low rounded-xl" />
                ) : (
                    <BodegasTable
                        bodegas={bodegas}
                        onEdit={(b) => setEditBodega(b)}
                        onRefresh={fetchBodegas}
                    />
                )}
            </div>

            <CreateBodegaModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                onCreated={fetchBodegas}
            />

            <EditBodegaModal
                isOpen={!!editBodega}
                onClose={() => setEditBodega(null)}
                onUpdated={fetchBodegas}
                bodega={editBodega}
            />
        </div>
    );
}
