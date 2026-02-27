import { Search, Bell, Settings } from 'lucide-react'

export function Header() {
    return (
        <header className="h-20 flex items-center justify-between px-8 bg-background/50 backdrop-blur-md border-b border-borderLight sticky top-0 z-10 gap-8">

            <div className="flex-1 max-w-xl relative group">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                    <Search className="h-5 w-5 text-textSecondary group-focus-within:text-neon transition-colors" />
                </div>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-2.5 border border-borderLight rounded-full bg-surface/50 text-textPrimary focus:outline-none focus:ring-1 focus:ring-neon focus:border-neon transition-all"
                    placeholder="Search agents, memory, skills..."
                />
            </div>

            <div className="flex items-center gap-4">
                <button className="p-2.5 rounded-full hover:bg-surface text-textSecondary hover:text-textPrimary transition-colors relative group">
                    <Bell size={20} />
                    <span className="absolute top-2 right-2.5 w-2 h-2 bg-neon rounded-full shadow-[0_0_8px_rgba(209,255,0,0.8)] group-hover:animate-pulse"></span>
                </button>
                <button className="p-2.5 rounded-full hover:bg-surface text-textSecondary hover:text-textPrimary transition-colors">
                    <Settings size={20} />
                </button>
                <div className="h-10 w-10 rounded-full bg-gradient-to-tr from-[#D1FF00] to-[#0A2540] border-2 border-borderLight flex items-center justify-center overflow-hidden cursor-pointer shadow-lg ml-2 hover:border-neon transition-colors">
                    <img src="https://i.pravatar.cc/150?u=a042581f4e29026704d" alt="Avatar" className="w-full h-full object-cover" />
                </div>
            </div>

        </header>
    )
}
