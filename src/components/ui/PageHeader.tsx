interface PageHeaderProps {
    section: string;
    title: string;
    action?: React.ReactNode;
}

export function PageHeader({ section, title, action }: PageHeaderProps) {
    return (
        <div className="flex items-end justify-between">
            <div>
                <span className="text-xs font-bold text-primary/40 uppercase tracking-[0.2em]">{section}</span>
                <h2 className="text-3xl font-bold tracking-tight text-on-surface mt-1">{title}</h2>
            </div>
            {action && <div>{action}</div>}
        </div>
    );
}
