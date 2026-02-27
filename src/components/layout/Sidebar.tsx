import { Link, useLocation } from 'react-router-dom'
import { LayoutDashboard, MessageSquare, Bot, Wrench, BrainCircuit, Activity, Settings } from 'lucide-react'

export function Sidebar() {
    const location = useLocation()

    const navItems = [
        { label: 'Overview', icon: LayoutDashboard, path: '/dashboard' },
        { label: 'Chat', icon: MessageSquare, path: '/chat' },
        { label: 'Agents', icon: Bot, path: '/agents' },
        { label: 'Skills', icon: Wrench, path: '/skills' },
        { label: 'Memory', icon: BrainCircuit, path: '/memory' },
        { label: 'Workflows', icon: Activity, path: '/workflows' }
    ]

    return (
        <aside className="w-64 glass-card border-l-0 border-y-0 border-r border-borderLight flex flex-col h-full hidden md:flex rounded-none">
            <div className="p-6 pb-8">
                <h1 className="text-2xl font-bold text-neon tracking-tighter flex items-center gap-2">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" className="text-neon drop-shadow-[0_0_8px_rgba(209,255,0,0.8)]">
                        <path d="M4 14.5C4 18 6 20 10 20C14 20 16 18 16 14.5C16 11 14 11 12 11C10 11 10 10 10 8.5C10 7 11 6.5 13 6C15 5.5 17 6.5 18 8C19 9.5 19 12 19 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path d="M20 12V20" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 3" />
                        <circle cx="12" cy="5" r="3" stroke="currentColor" strokeWidth="2" />
                    </svg>
                    TENTACLES
                </h1>
            </div>

            <nav className="flex-1 px-4 space-y-2">
                {navItems.map((item) => {
                    const isActive = location.pathname.startsWith(item.path)
                    return (
                        <Link
                            key={item.path}
                            to={item.path}
                            className={`flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all ${isActive
                                    ? 'bg-neon text-background shadow-[0_0_15px_rgba(209,255,0,0.3)] font-semibold scale-[1.02]'
                                    : 'text-textSecondary hover:bg-white/5 hover:text-textPrimary hover:scale-[1.02]'
                                }`}
                        >
                            <item.icon size={20} className={isActive ? "stroke-[2.5]" : "stroke-2"} />
                            {item.label}
                        </Link>
                    )
                })}
            </nav>

            <div className="p-4 mt-auto">
                <Link
                    to="/settings"
                    className="flex items-center gap-3 px-4 py-3 rounded-lg text-textSecondary hover:bg-white/5 hover:text-textPrimary font-medium transition-colors"
                >
                    <Settings size={20} />
                    Settings
                </Link>
            </div>
        </aside>
    )
}
