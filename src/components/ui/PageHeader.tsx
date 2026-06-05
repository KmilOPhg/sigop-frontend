interface PageHeaderProps {
    section: string;
    title: string;
    action?: React.ReactNode;
}

export function PageHeader({ section, title, action }: PageHeaderProps) {
    return (
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3">
            <div>
                <span className="text-xs font-bold text-primary/40 uppercase tracking-[0.2em]">{section}</span>
                <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-on-surface mt-1">{title}</h2>
            </div>
            {action && <div className="flex-shrink-0">{action}</div>}
        </div>
    );
}
