import { Outlet } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Header } from './Header'

export function AppLayout() {
    return (
        <div className="flex h-screen bg-background overflow-hidden selection:bg-neon selection:text-background text-textPrimary">
            <Sidebar />
            <div className="flex flex-col flex-1 min-w-0">
                <Header />
                <main className="flex-1 overflow-y-auto p-6 md:p-10 bg-gradient-to-br from-background via-background to-[#0A2540]/10">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
