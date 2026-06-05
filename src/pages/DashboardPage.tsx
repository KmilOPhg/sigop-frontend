import { useEffect, useState } from 'react';
import { toast } from 'sonner';
import { Link } from 'react-router-dom';
import { dashboardApi, type DashboardData } from '../api/dashboard.api';
import { StatCards } from '../components/dashboard/StatCards';
import { ChartDonut } from '../components/dashboard/ChartDonut';
import { ChartBar } from '../components/dashboard/ChartBar';
import { usePageTitle } from '../hooks/usePageTitle';

export function DashboardPage() {
    usePageTitle('Dashboard');
    const [data, setData] = useState<DashboardData | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        dashboardApi.getData()
            .then((res) => setData(res.data.data))
            .catch(() => toast.error('Error al cargar datos del dashboard'))
            .finally(() => setLoading(false));
    }, []);

    const handleBarClickBodega = async (referencia: string) => {
        try {
            const res = await dashboardApi.getBodegasPorReferencia(referencia);
            const registros = res.data.data;
            const html = registros.map((b) =>
                `Descripción: ${b.descripcion} | Referencia: ${b.referencia} | Estado: ${b.estado}`
            ).join('\n');
            toast.info(`Bodegas con referencia ${referencia}`, {
                description: (
                    <div className="mt-1 space-y-2">
                        {registros.map((b) => (
                            <div key={b.id} className="text-xs border-b border-slate-200 pb-2 last:border-0">
                                <p><strong>Descripción:</strong> {b.descripcion}</p>
                                <p><strong>Referencia:</strong> {b.referencia}</p>
                                <p><strong>Estado:</strong> {b.estado}</p>
                            </div>
                        ))}
                    </div>
                ) as unknown as string,
                duration: 8000,
            });
        } catch {
            toast.error('Error al cargar bodegas');
        }
    };

    const handleBarClickMaterial = async (item: string) => {
        try {
            const res = await dashboardApi.getMaterialesPorItem(item);
            const registros = res.data.data;
            toast.info(`Materiales del ítem ${item}`, {
                description: (
                    <div className="mt-1 space-y-2">
                        {registros.map((m) => (
                            <div key={m.id} className="text-xs border-b border-slate-200 pb-2 last:border-0">
                                <p><strong>Nombre:</strong> {m.nombreMaterial}</p>
                                <p><strong>Ítem:</strong> {m.itemMaterial}</p>
                                <p><strong>Unidad:</strong> {m.unidadMedida}</p>
                                <p><strong>Estado:</strong> {m.estado}</p>
                            </div>
                        ))}
                    </div>
                ) as unknown as string,
                duration: 8000,
            });
        } catch {
            toast.error('Error al cargar materiales');
        }
    };

    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
                <div>
                    <span className="text-xs font-bold text-primary/40 uppercase tracking-[0.2em]">Panel Principal</span>
                    <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface mt-1">Dashboard General</h2>
                </div>
                <div className="flex items-center self-start sm:self-auto px-3 py-1 bg-surface-container-high rounded-full text-xs font-medium text-secondary">
                    <span className="w-2 h-2 rounded-full bg-green-500 mr-2" />
                    Sistema Activo
                </div>
            </div>

            {loading ? (
                <div className="grid grid-cols-12 gap-6 animate-pulse">
                    <div className="col-span-12 h-48 bg-surface-container-low rounded-xl" />
                    <div className="col-span-12 lg:col-span-4 h-48 bg-surface-container-low rounded-xl" />
                    <div className="col-span-12 lg:col-span-6 h-80 bg-surface-container-low rounded-xl" />
                    <div className="col-span-12 lg:col-span-6 h-80 bg-surface-container-low rounded-xl" />
                </div>
            ) : data ? (
                <div className="grid grid-cols-12 gap-6">
                    {/* Hero Card */}
                    <div className="col-span-12 lg:col-span-8 bg-surface-container-low rounded-xl p-6 relative overflow-hidden min-h-[200px]">
                        <div className="absolute top-0 right-0 p-8 opacity-10">
                            <span className="material-symbols-outlined" style={{ fontSize: '120px' }}>precision_manufacturing</span>
                        </div>
                        <h3 className="text-xs font-bold uppercase tracking-wider text-primary/60 mb-1">Resumen del Sistema</h3>
                        <p className="text-lg text-slate-600 mt-2">Estado general de bodegas y materiales registrados en SIGOP.</p>
                        <div className="mt-6">
                            <StatCards
                                bodegasActivas={data.totales.bodegas.activas}
                                bodegasInactivas={data.totales.bodegas.inactivas}
                                materialesActivos={data.totales.materiales.activas}
                                materialesInactivos={data.totales.materiales.inactivas}
                            />
                        </div>
                    </div>

                    {/* Quick Actions */}
                    <div className="col-span-12 lg:col-span-4 bg-surface-container-highest rounded-xl p-6 flex flex-col gap-4">
                        <h3 className="text-sm font-bold text-primary flex items-center">
                            <span className="material-symbols-outlined mr-2 text-lg text-secondary">bolt</span>
                            Acciones Rápidas
                        </h3>
                        <div className="space-y-3 flex-1">
                            <Link to="/materiales" className="bg-surface-container-lowest p-3 rounded-lg flex items-center gap-3 hover:bg-blue-50 transition-colors">
                                <div className="w-10 h-10 rounded bg-blue-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-blue-600">category</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Gestionar Materiales</p>
                                    <p className="text-[10px] text-slate-500">Ver, crear y editar materiales</p>
                                </div>
                            </Link>
                            <Link to="/bodegas" className="bg-surface-container-lowest p-3 rounded-lg flex items-center gap-3 hover:bg-blue-50 transition-colors">
                                <div className="w-10 h-10 rounded bg-green-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-green-600">warehouse</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Gestionar Bodegas</p>
                                    <p className="text-[10px] text-slate-500">Administrar ubicaciones</p>
                                </div>
                            </Link>
                            <Link to="/usuarios" className="bg-surface-container-lowest p-3 rounded-lg flex items-center gap-3 hover:bg-blue-50 transition-colors">
                                <div className="w-10 h-10 rounded bg-amber-100 flex items-center justify-center">
                                    <span className="material-symbols-outlined text-amber-600">group</span>
                                </div>
                                <div>
                                    <p className="text-xs font-bold">Gestionar Usuarios</p>
                                    <p className="text-[10px] text-slate-500">Roles y permisos</p>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Donuts */}
                    <div className="col-span-12 lg:col-span-6">
                        <ChartDonut
                            title="Bodegas (Activas vs Inactivas)"
                            activos={data.totales.bodegas.activas}
                            inactivos={data.totales.bodegas.inactivas}
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <ChartDonut
                            title="Materiales (Activos vs Inactivos)"
                            activos={data.totales.materiales.activas}
                            inactivos={data.totales.materiales.inactivas}
                        />
                    </div>

                    {/* Bar charts */}
                    <div className="col-span-12 lg:col-span-6">
                        <ChartBar
                            title="Bodegas por Referencia"
                            items={data.bodegasReferencias.map((b) => ({
                                key: b.referencia,
                                label: b.nombre,
                                total: b.total,
                                estado: b.estado,
                            }))}
                            onBarClick={handleBarClickBodega}
                        />
                    </div>
                    <div className="col-span-12 lg:col-span-6">
                        <ChartBar
                            title="Materiales por Ítem"
                            items={data.materialesItems.map((m) => ({
                                key: m.item,
                                label: m.nombre,
                                total: m.total,
                                estado: m.estado,
                            }))}
                            onBarClick={handleBarClickMaterial}
                        />
                    </div>
                </div>
            ) : null}
        </div>
    );
}
