import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { materialesApi } from '../api/materiales.api';
import { MaterialesTable } from '../components/materiales/MaterialesTable';
import { CreateMaterialModal } from '../components/materiales/CreateMaterialModal';
import { EditMaterialModal } from '../components/materiales/EditMaterialModal';
import { PageHeader } from '../components/ui/PageHeader';
import { Button } from '../components/ui/Button';
import { usePageTitle } from '../hooks/usePageTitle';
import type { Material } from '../types/material.types';

export function MaterialesPage() {
    usePageTitle('Materiales');
    const [materiales, setMateriales] = useState<Material[]>([]);
    const [loading, setLoading] = useState(true);
    const [estadoFiltro, setEstadoFiltro] = useState<'activo' | 'inactivo'>('activo');
    const [showCreate, setShowCreate] = useState(false);
    const [editMaterial, setEditMaterial] = useState<Material | null>(null);

    const fetchMateriales = async () => {
        setLoading(true);
        try {
            const res = await materialesApi.listar(estadoFiltro);
            setMateriales(res.data.data);
        } catch {
            toast.error('Error al cargar materiales');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { fetchMateriales(); }, [estadoFiltro]);

    return (
        <div className="space-y-6">
            <PageHeader
                section="Inventarios"
                title="Materiales"
                action={
                    <Button icon="add" onClick={() => setShowCreate(true)}>
                        Crear Material
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
                    Activos
                </button>
                <button
                    onClick={() => setEstadoFiltro('inactivo')}
                    className={`px-4 py-2 rounded-lg text-xs font-bold uppercase tracking-widest transition-colors ${
                        estadoFiltro === 'inactivo'
                            ? 'bg-red-100 text-red-700'
                            : 'bg-surface-container text-slate-500 hover:bg-surface-container-high'
                    }`}
                >
                    Inactivos
                </button>
            </div>

            {/* Tabla */}
            <div className="bg-surface-container-low rounded-xl overflow-hidden">
                {loading ? (
                    <div className="h-48 animate-pulse bg-surface-container-low rounded-xl" />
                ) : (
                    <MaterialesTable
                        materiales={materiales}
                        onEdit={(m) => setEditMaterial(m)}
                        onRefresh={fetchMateriales}
                    />
                )}
            </div>

            <CreateMaterialModal
                isOpen={showCreate}
                onClose={() => setShowCreate(false)}
                onCreated={fetchMateriales}
            />

            <EditMaterialModal
                isOpen={!!editMaterial}
                onClose={() => setEditMaterial(null)}
                onUpdated={fetchMateriales}
                material={editMaterial}
            />
        </div>
    );
}
