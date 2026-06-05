import { useState } from 'react';
import { Outlet } from 'react-router-dom';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';

export function AppLayout() {
    const [sidebarOpen, setSidebarOpen] = useState(false);

    return (
        <div className="font-sans text-on-surface antialiased bg-surface">
            {/* Overlay backdrop para móvil */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 z-30 bg-black/50 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                />
            )}

            <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

            <main className="md:ml-64 min-h-screen flex flex-col">
                <Topbar onMenuClick={() => setSidebarOpen(true)} />
                <div className="p-4 sm:p-6 md:p-8 max-w-7xl mx-auto w-full overflow-y-auto flex-1">
                    <Outlet />
                </div>
            </main>
        </div>
    );
}
