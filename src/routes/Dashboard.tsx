import { Activity, Zap, Cpu } from 'lucide-react'

export function Dashboard() {
    return (
        <div className="space-y-8 max-w-7xl mx-auto">
            <div className="flex items-end justify-between">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                        Dashboard Overview
                    </h2>
                    <p className="text-textSecondary mt-2 leading-relaxed">— Data Based on All System Agents</p>
                </div>
                <div className="flex items-center gap-2 bg-surface p-1.5 rounded-lg border border-borderLight shadow-inner">
                    <select className="bg-transparent text-textPrimary text-sm font-medium border-none focus:ring-0 pl-3 pr-8 py-1.5 appearance-none cursor-pointer hover:text-neon transition-colors">
                        <option>All Agents</option>
                        <option>Active Only</option>
                    </select>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                {/* Metric Card 1 */}
                <div className="glass-card p-6 glass-card-hover group">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-textSecondary text-sm font-medium flex items-center gap-2">
                            <Activity size={16} className="text-neon" /> Processed Items
                        </span>
                    </div>
                    <div className="flex flex-col">
                        <span className="text-5xl font-bold tracking-tight text-white mb-2">97,22<span className="text-2xl text-textSecondary">%</span></span>
                        <div className="flex items-center justify-between text-xs text-textSecondary mt-4 font-medium">
                            <span><span className="text-white">16.4K</span> Auto</span>
                            <span><span className="text-white">20K</span> Pending</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface mt-3 rounded-full overflow-hidden flex">
                            <div className="h-full bg-white w-3/4"></div>
                            <div className="h-full bg-neon w-1/4 shadow-[0_0_10px_rgba(209,255,0,0.8)] relative after:absolute after:right-0 after:top-1/2 after:-translate-y-1/2 after:w-2 after:h-2 after:bg-white after:rounded-full"></div>
                        </div>
                    </div>
                </div>

                {/* Highlight Card */}
                <div className="glass-card p-6 bg-gradient-to-br from-neon/15 to-transparent border-neon/30 glass-card-hover group flex flex-col justify-center">
                    <div className="flex items-center justify-between mb-2">
                        <span className="text-neon text-sm font-medium flex items-center gap-2">
                            <Zap size={16} /> Account Insight
                        </span>
                        <button className="text-neon hover:text-white transition-colors">↗</button>
                    </div>
                    <p className="text-2xl font-semibold leading-tight text-white mt-4">
                        Last month, <span className="text-neon drop-shadow-[0_0_8px_rgba(209,255,0,0.5)]">automation</span> boosted your time savings to 48.3 hours.
                    </p>
                </div>

                {/* Metric Card 3 */}
                <div className="glass-card p-6 glass-card-hover col-span-1 md:col-span-2">
                    <div className="flex items-center justify-between mb-4">
                        <span className="text-textSecondary text-sm font-medium flex items-center gap-2">
                            <Cpu size={16} className="text-neon" /> Compute Utilization
                        </span>
                    </div>
                    <div className="flex items-center gap-12 mt-4">
                        <div>
                            <span className="text-5xl font-bold text-white tracking-tight">88,5<span className="text-2xl text-textSecondary">%</span></span>
                            <p className="text-sm font-medium text-textSecondary mt-2">Average System Load</p>
                        </div>
                        <div className="flex-1 flex flex-col justify-end h-20">
                            <div className="flex items-end gap-1.5 h-full w-full">
                                {/* Fake Sparkline */}
                                {[...Array(24)].map((_, i) => (
                                    <div key={i} className={`flex-1 rounded-t-sm ${i === 20 ? 'bg-neon h-full shadow-[0_0_15px_rgba(209,255,0,0.5)]' : 'bg-surface hover:bg-white/20 h-[' + (Math.random() * 80 + 20) + '%] transition-all'}`} style={{ height: `${Math.random() * 60 + 20}%` }}></div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    )
}
