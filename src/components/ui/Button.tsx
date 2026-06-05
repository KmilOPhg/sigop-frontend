import type { ButtonHTMLAttributes } from 'react';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
    size?: 'sm' | 'md';
    loading?: boolean;
    icon?: string;
}

export function Button({
    variant = 'primary',
    size = 'md',
    loading = false,
    icon,
    children,
    disabled,
    className = '',
    ...props
}: ButtonProps) {
    const base = 'inline-flex items-center gap-2 font-bold uppercase tracking-widest rounded-lg transition-colors';
    const sizes = {
        sm: 'px-4 py-2 text-[10px]',
        md: 'px-5 py-2.5 text-xs',
    };
    const variants = {
        primary: 'bg-gradient-to-r from-primary to-primary-container text-white shadow-lg shadow-blue-900/20 hover:brightness-110',
        secondary: 'bg-surface-container-high text-primary hover:bg-slate-200',
        danger: 'bg-red-50 text-red-600 hover:bg-red-100',
        ghost: 'text-slate-400 hover:text-slate-600 hover:bg-slate-100',
    };

    return (
        <button
            disabled={disabled || loading}
            className={`${base} ${sizes[size]} ${variants[variant]} ${disabled || loading ? 'opacity-50 cursor-not-allowed' : ''} ${className}`}
            {...props}
        >
            {loading ? (
                <span className="material-symbols-outlined text-sm animate-spin">progress_activity</span>
            ) : icon ? (
                <span className="material-symbols-outlined text-sm">{icon}</span>
            ) : null}
            {children}
        </button>
    );
}
