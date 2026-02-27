import { Outlet, Link, useLocation } from 'react-router-dom'
import { Search, Bell, Settings } from 'lucide-react'

export function AppLayout() {
    const location = useLocation()

    const navItems = [
        { label: 'Overview', path: '/dashboard' },
        { label: 'Analytics', path: '/analytics' },
        { label: 'Companies', path: '/agents' },
        { label: 'Documents', path: '/skills' }
    ]

    return (
        <div className="flex h-screen bg-appBg p-4 md:p-6 text-textPrimary overflow-hidden font-sans antialiased selection:bg-neon selection:text-black">
            {/* Main Dashboard Container */}
            <div className="flex-1 bg-background rounded-3xl overflow-hidden shadow-2xl flex flex-col relative border border-white/10">

                {/* Floating Top Navigation Pill */}
                <header className="absolute top-6 left-6 right-6 z-20 flex items-center justify-between">

                    {/* Left Nav Group */}
                    <nav className="flex items-center bg-surface/80 backdrop-blur-md rounded-full p-1 border border-borderLight shadow-sm">
                        {navItems.map(item => {
                            const isActive = location.pathname.startsWith(item.path) || (location.pathname === '/' && item.path === '/dashboard')
                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${isActive
                                            ? 'bg-neon text-black shadow-sm'
                                            : 'text-textSecondary hover:text-white hover:bg-white/5'
                                        }`}
                                >
                                    {item.label}
                                </Link>
                            )
                        })}
                    </nav>

                    {/* Center Search */}
                    <div className="flex-1 max-w-md mx-6">
                        <div className="relative group flex items-center bg-background/50 backdrop-blur-md rounded-full px-4 py-2 border border-borderLight shadow-sm focus-within:border-neon/50 focus-within:ring-1 focus-within:ring-neon/50">
                            <Search className="w-4 h-4 text-textSecondary mr-2" />
                            <input
                                type="text"
                                placeholder="Search Client Name or ID"
                                className="bg-transparent border-none text-sm text-white placeholder:text-textSecondary/70 focus:outline-none w-full"
                            />
                        </div>
                    </div>

                    {/* Right Action Icons */}
                    <div className="flex items-center gap-2 bg-surface/80 backdrop-blur-md rounded-full p-1 border border-borderLight shadow-sm">
                        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-textPrimary transition-colors">
                            <Bell className="w-4 h-4" />
                        </button>
                        <button className="w-9 h-9 flex items-center justify-center rounded-full hover:bg-white/10 text-textPrimary transition-colors">
                            <Settings className="w-4 h-4" />
                        </button>
                        <div className="w-9 h-9 rounded-full overflow-hidden border border-borderLight ml-1">
                            <img src="https://i.pravatar.cc/150?u=a042581f4e290267041" alt="Profile" className="w-full h-full object-cover" />
                        </div>
                    </div>

                </header>

                {/* Scrollable Main Content */}
                <main className="flex-1 overflow-y-auto px-8 pt-28 pb-8 bg-hero-gradient">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}
