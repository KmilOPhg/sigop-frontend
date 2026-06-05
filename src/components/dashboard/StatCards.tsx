interface StatCardProps {
    label: string;
    value: number;
    color: 'green' | 'slate' | 'blue' | 'orange';
}

function StatCard({ label, value, color }: StatCardProps) {
    const borderColors = {
        green: 'border-l-4 border-green-500',
        slate: 'border-l-4 border-slate-400',
        blue: 'border-l-4 border-blue-600',
        orange: 'border-l-4 border-orange-400',
    };
    const textColors = {
        green: 'text-green-600',
        slate: 'text-slate-500',
        blue: 'text-blue-600',
        orange: 'text-orange-500',
    };

    return (
        <div className={`bg-surface-container-lowest p-4 rounded-lg shadow-sm ${borderColors[color]}`}>
            <p className="text-[10px] font-bold text-slate-400 uppercase">{label}</p>
            <p className={`text-2xl font-bold mt-1 ${textColors[color]}`}>{value}</p>
        </div>
    );
}

interface StatCardsProps {
    bodegasActivas: number;
    bodegasInactivas: number;
    materialesActivos: number;
    materialesInactivos: number;
}

export function StatCards({ bodegasActivas, bodegasInactivas, materialesActivos, materialesInactivos }: StatCardsProps) {
    return (
        <div className="grid grid-cols-4 gap-4">
            <StatCard label="Bodegas Activas" value={bodegasActivas} color="green" />
            <StatCard label="Bodegas Inactivas" value={bodegasInactivas} color="slate" />
            <StatCard label="Mat. Activos" value={materialesActivos} color="blue" />
            <StatCard label="Mat. Inactivos" value={materialesInactivos} color="orange" />
        </div>
    );
}
