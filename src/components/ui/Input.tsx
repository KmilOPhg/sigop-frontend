import type { InputHTMLAttributes } from 'react';

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    label?: string;
    error?: string;
}

export function Input({ label, error, className = '', ...props }: InputProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <input
                className={`w-full px-3 py-2 bg-slate-50 border ${
                    error ? 'border-red-400 focus:ring-red-500/20' : 'border-slate-200 focus:ring-blue-500/20'
                } rounded-lg text-xs focus:ring-2 focus:border-blue-500 transition-all outline-none ${className}`}
                {...props}
            />
            {error && <p className="text-[10px] text-red-500">{error}</p>}
        </div>
    );
}

interface SelectProps extends React.SelectHTMLAttributes<HTMLSelectElement> {
    label?: string;
    error?: string;
}

export function Select({ label, error, children, className = '', ...props }: SelectProps) {
    return (
        <div className="flex flex-col gap-1">
            {label && (
                <label className="block text-[10px] font-bold text-slate-500 uppercase tracking-wider">
                    {label}
                </label>
            )}
            <select
                className={`w-full px-3 py-2 bg-slate-50 border ${
                    error ? 'border-red-400' : 'border-slate-200'
                } rounded-lg text-xs focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all outline-none ${className}`}
                {...props}
            >
                {children}
            </select>
            {error && <p className="text-[10px] text-red-500">{error}</p>}
        </div>
    );
}
