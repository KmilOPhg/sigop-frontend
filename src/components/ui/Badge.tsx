interface BadgeProps {
    label: string;
    variant?: 'active' | 'inactive' | 'role' | 'permission' | 'total';
    onClick?: () => void;
}

export function Badge({ label, variant = 'active', onClick }: BadgeProps) {
    const styles = {
        active: 'bg-green-100 text-green-700',
        inactive: 'bg-red-100 text-red-700',
        role: 'bg-secondary-container text-on-secondary-container',
        permission: 'bg-green-100 text-green-700',
        total: 'bg-slate-100 text-slate-500',
    };

    return (
        <span
            onClick={onClick}
            className={`px-2 py-1 text-[10px] font-bold rounded ${styles[variant]} ${onClick ? 'cursor-pointer hover:brightness-95' : ''}`}
        >
            {label}
        </span>
    );
}

export function EstadoBadge({ estado, onClick }: { estado: string; onClick?: () => void }) {
    return (
        <Badge
            label={estado.charAt(0).toUpperCase() + estado.slice(1)}
            variant={estado === 'activo' ? 'active' : 'inactive'}
            onClick={onClick}
        />
    );
}
