import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout() {
    return (
        <div className="font-sans text-on-surface antialiased bg-surface">
            <Sidebar />
            <main className="ml-64 min-h-screen flex flex-col">
                <Topbar />
                <div className="p-8 max-w-7xl mx-auto w-full overflow-y-auto flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
