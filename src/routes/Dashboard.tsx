import {
    Activity, ArrowUpRight, Calendar, ChevronDown, Cpu, FileBox,
    Image as ImageIcon, Layers, Mic, Plus, Send, Sparkles, TerminalSquare,
    Zap, Maximize2, FileText, CheckCircle2
} from 'lucide-react'

// Helper for the gauge chart in Synced Records
const SemiCircleGauge = ({ percentage }: { percentage: number }) => {
    const radius = 60
    const circumference = radius * Math.PI
    const strokeDashoffset = circumference - (percentage / 100) * circumference

    return (
        <div className="relative w-full flex justify-center mt-6">
            <svg className="w-48 h-24 transform rotate-180" viewBox="0 0 140 70">
                {/* Background Arc */}
                <path
                    d="M 10,70 A 60,60 0 0,1 130,70"
                    fill="none"
                    stroke="rgba(255,255,255,0.05)"
                    strokeWidth="6"
                    strokeLinecap="round"
                />
                {/* Foreground Arc */}
                <path
                    d="M 10,70 A 60,60 0 0,1 130,70"
                    fill="none"
                    stroke="#D4F64D"
                    strokeWidth="6"
                    strokeLinecap="round"
                    strokeDasharray={circumference}
                    strokeDashoffset={strokeDashoffset}
                    className="drop-shadow-[0_0_8px_rgba(212,246,77,0.5)] transition-all duration-1000 ease-out"
                />
                <circle cx="120" cy="55" r="4" fill="#D4F64D" className="shadow-[0_0_10px_#D4F64D]" />
            </svg>
            <div className="absolute bottom-0 inset-x-0 flex flex-col items-center justify-end pb-2">
                <span className="text-3xl font-bold tracking-tight text-white">{percentage},49<span className="text-xl text-textSecondary">%</span></span>
            </div>
        </div>
    )
}

// Helper for sparklines
const Sparkline = ({ count, activeIndex, color = '#D4F64D' }: { count: number, activeIndex?: number, color?: string }) => {
    return (
        <div className="flex items-end gap-[3px] h-12 w-full mt-auto pt-4 border-t border-borderLight/50">
            {[...Array(count)].map((_, i) => {
                const height = 20 + Math.random() * 80
                const isActive = i === activeIndex
                return (
                    <div
                        key={i}
                        className={`flex-1 rounded-t-sm transition-all duration-500 hover:bg-white/30 ${isActive ? '' : 'bg-surfaceHover'}`}
                        style={{
                            height: `${height}%`,
                            backgroundColor: isActive ? color : undefined,
                            boxShadow: isActive ? `0 0 10px ${color}80` : 'none'
                        }}
                    />
                )
            })}
        </div>
    )
}

// Waveform Sparkline
const WaveformSparkline = () => {
    return (
        <div className="absolute bottom-6 left-6 right-6 h-16 flex items-end justify-between gap-[2px] opacity-60">
            {[...Array(40)].map((_, i) => {
                const h = 20 + Math.sin(i * 0.4) * 30 + Math.random() * 50
                const isHighlight = i === 28
                return (
                    <div
                        key={i}
                        className={`w-full rounded-full ${isHighlight ? 'bg-neon w-1.5 shadow-[0_0_10px_#D4F64D]' : 'bg-textSecondary/40'}`}
                        style={{ height: `${h}%` }}
                    />
                )
            })}
        </div>
    )
}

export function Dashboard() {
    return (
        <div className="space-y-6 max-w-[1600px] mx-auto pb-10">

            {/* ------------------------------------------------------------- */}
            {/* HERO SECTION                                                  */}
            {/* ------------------------------------------------------------- */}
            <div className="relative pt-6 pb-4">
                <h1 className="text-4xl font-black text-neon tracking-widest mb-8 drop-shadow-md">TENTACLES<span className="text-borderLight">\\</span></h1>

                <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">

                    <div className="z-10">
                        <span className="text-textSecondary text-sm font-medium flex items-center gap-2 mb-2">
                            <span className="w-4 h-px bg-textSecondary"></span> Data Based on All System Agents
                        </span>
                        <h2 className="text-5xl lg:text-[4rem] font-medium tracking-tight text-white leading-tight">
                            Dashboard Overview
                        </h2>
                    </div>

                    <div className="relative flex-1 flex justify-end min-h-[160px] mr-12 lg:mr-32">
                        {/* Stacked Cards Layout */}
                        {/* Card 3 (Bottom) */}
                        <div className="absolute right-[-40px] top-6 w-[280px] h-[140px] bg-[#667341]/40 backdrop-blur-sm border border-[#8C9A61]/30 rounded-2xl transform rotate-[12deg] flex p-4 items-start shadow-xl">
                            <div className="flex-1"></div>
                            <ArrowUpRight className="text-black/50" size={18} />
                            <div className="absolute bottom-4 right-4 text-black/50 font-medium text-sm">savings</div>
                        </div>

                        {/* Card 2 (Middle) */}
                        <div className="absolute right-[-10px] top-3 w-[280px] h-[140px] bg-[#7D8C50]/60 backdrop-blur-md border border-[#9CAE68]/40 rounded-2xl transform rotate-[6deg] flex p-4 items-start shadow-xl">
                            <div className="flex-1"></div>
                            <ArrowUpRight className="text-black/60" size={18} />
                            <div className="absolute bottom-4 right-4 text-black/60 font-medium text-sm">savings</div>
                        </div>

                        {/* Card 1 (Top/Foreground) */}
                        <div className="absolute right-[20px] top-0 w-[300px] h-[160px] bg-gradient-to-br from-[#E2FF66] to-[#C0E626] rounded-2xl shadow-[0_10px_40px_rgba(212,246,77,0.2)] p-5 border border-[#F0FF99] z-10 flex flex-col justify-between">
                            <div className="flex items-center justify-between text-black mb-3">
                                <span className="text-sm font-semibold flex items-center gap-2">
                                    <Zap size={16} className="fill-black" /> Account Insight
                                </span>
                                <ArrowUpRight size={18} />
                            </div>
                            <p className="text-lg font-medium text-black leading-snug">
                                Last month, <span className="text-black/60">automation</span> boosted your time savings to <span className="font-bold">48.3 hours</span>
                            </p>
                        </div>
                    </div>
                </div>

                {/* Floating Calendar Pills */}
                <div className="flex items-center gap-3 justify-end mt-12 pr-4 relative z-20">
                    <button className="bg-neon text-black p-2.5 rounded-lg shadow-sm hover:brightness-110 transition-all">
                        <Calendar size={18} />
                    </button>
                    <div className="glass-card bg-surface/80 border-borderLight px-4 py-2 text-sm text-textSecondary hover:text-white transition-colors cursor-pointer rounded-xl">
                        01, Mar 2025
                    </div>
                    <div className="glass-card bg-surface/80 border-borderLight px-4 py-2 text-sm text-textSecondary hover:text-white transition-colors cursor-pointer rounded-xl">
                        30, Mar 2025
                    </div>
                    <div className="glass-card bg-surface/80 border-borderLight px-4 py-2 text-sm text-white flex items-center gap-2 hover:bg-surface transition-colors cursor-pointer rounded-xl">
                        All Partner <ChevronDown size={14} />
                    </div>
                </div>
            </div>


            {/* ------------------------------------------------------------- */}
            {/* GRID SECTION                                                  */}
            {/* ------------------------------------------------------------- */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

                {/* LEFT COLUMN (Spans 9) */}
                <div className="lg:col-span-8 xl:col-span-9 flex flex-col gap-6">

                    {/* Row 1: Top 3 Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {/* Processed Items */}
                        <div className="glass-card bg-surface/40 p-5 flex flex-col justify-between hover:border-neon/30 transition-colors">
                            <div className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                <Layers size={16} /> Processed Items
                            </div>
                            <div className="my-6">
                                <span className="text-[2.75rem] font-bold text-white tracking-tight leading-none">97,22<span className="text-2xl text-textSecondary">%</span></span>
                            </div>
                            <div>
                                <div className="flex items-center justify-between text-xs mb-2">
                                    <div><div className="text-white font-medium">16.4K</div><div className="text-textSecondary/60 mt-0.5">Auto-Processed</div></div>
                                    <div className="text-right"><div className="text-white font-medium">20K</div><div className="text-textSecondary/60 mt-0.5">Pending Check</div></div>
                                </div>
                                {/* Progress bar with neon indicator */}
                                <div className="w-full h-2.5 bg-[#1F1F22] rounded-full overflow-hidden flex relative border border-white/5">
                                    <div className="h-full bg-white w-3/4 shadow-[0_0_10px_rgba(255,255,255,0.3)] z-10"></div>
                                    <div className="h-full bg-gradient-to-r from-[#8C9A61] to-[#D4F64D] w-1/4 relative">
                                        <div className="absolute right-0 top-0 bottom-0 w-[2px] bg-white shadow-[0_0_8px_#fff]"></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Synced Records */}
                        <div className="glass-card bg-surface/40 p-5 flex flex-col justify-between hover:border-neon/30 transition-colors relative overflow-hidden">
                            <div className="flex items-center gap-2 text-sm text-textSecondary font-medium relative z-10">
                                <Cpu size={16} /> Synced Records
                            </div>

                            <div className="flex items-center justify-between text-xs mt-4 relative z-10">
                                <div><div className="text-white font-medium">16.4K</div><div className="text-textSecondary/60 mt-0.5">Auto-Processed</div></div>
                                <div className="text-right"><div className="text-white font-medium">20K</div><div className="text-textSecondary/60 mt-0.5">Pending Check</div></div>
                            </div>

                            <SemiCircleGauge percentage={80} />
                        </div>

                        {/* Anomalies */}
                        <div className="glass-card bg-surface/40 p-5 flex flex-col justify-between hover:border-neon/30 transition-colors">
                            <div className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                <Activity size={16} /> Anomalies
                            </div>
                            <div className="my-4">
                                <span className="text-[2.5rem] font-bold text-white tracking-tight leading-none">15,12<span className="text-xl text-textSecondary">%</span></span>
                            </div>
                            <div className="flex-1 flex flex-col justify-end">
                                <div className="flex items-center justify-between text-xs mb-3">
                                    <div><div className="text-white font-medium">2.84K</div><div className="text-textSecondary/60 mt-0.5">Detected</div></div>
                                    <div className="text-right"><div className="text-white font-medium">20.8K</div><div className="text-textSecondary/60 mt-0.5">Total Items</div></div>
                                </div>
                                <Sparkline count={32} activeIndex={2} color="#fff" />
                            </div>
                        </div>

                    </div>

                    {/* Row 2: Wide Charts */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Utilization */}
                        <div className="glass-card bg-surface/40 p-6 relative min-h-[220px] group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <TerminalSquare size={16} /> Utilization
                                </span>
                                <ArrowUpRight size={16} className="text-textSecondary group-hover:text-white transition-colors" />
                            </div>

                            <div className="grid grid-cols-3 mt-4 relative z-10">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">88%</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Syncs</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">75%</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Fetches</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-xs text-textSecondary/80 mb-1">Average Account Stats</div>
                                    <div className="text-[2.5rem] font-bold text-white tracking-tight leading-none">58,2<span className="text-xl text-textSecondary">%</span></div>
                                </div>
                                <div className="space-y-4 text-right">
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">67%</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Manuals</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">15%</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Autosync</div>
                                    </div>
                                </div>
                            </div>

                            <WaveformSparkline />

                            <div className="absolute pl-6 pr-6 bottom-3 inset-x-0 flex justify-between text-[10px] text-textSecondary/50 font-medium">
                                <span>Feb</span>
                                <span>Mar</span>
                            </div>
                        </div>

                        {/* Timely Closures */}
                        <div className="glass-card bg-surface/40 p-6 relative min-h-[220px] group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <CheckCircle2 size={16} /> Timely Closures
                                </span>
                                <ArrowUpRight size={16} className="text-textSecondary group-hover:text-white transition-colors" />
                            </div>

                            <div className="grid grid-cols-3 mt-4 relative z-10">
                                <div className="space-y-4">
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">92</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Done</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">32%</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Active</div>
                                    </div>
                                </div>
                                <div className="flex flex-col items-center justify-center">
                                    <div className="text-xs text-textSecondary/80 mb-1">Average Account Stats</div>
                                    <div className="text-[2.5rem] font-bold text-white tracking-tight leading-none">88,5<span className="text-xl text-textSecondary">%</span></div>
                                </div>
                                <div className="space-y-4 text-right">
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">70/0%</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">On Time</div>
                                    </div>
                                    <div>
                                        <div className="text-xl font-bold text-white leading-none">30/5</div>
                                        <div className="text-[10px] text-textSecondary/70 uppercase tracking-wider mt-1">Timely</div>
                                    </div>
                                </div>
                            </div>

                            <WaveformSparkline />

                            <div className="absolute pl-6 pr-6 bottom-3 inset-x-0 flex justify-between text-[10px] text-textSecondary/50 font-medium">
                                <span>Feb</span>
                                <span>Mar</span>
                            </div>
                        </div>

                    </div>

                    {/* Row 3: Avatars */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <div className="glass-card bg-surface/30 p-4 flex items-center justify-between group hover:bg-surface/60 transition-colors cursor-pointer border border-borderLight/30">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=1" alt="Alma" className="w-10 h-10 rounded-full border border-white/10" />
                                <div>
                                    <div className="text-sm font-semibold text-white">Alma Lawson</div>
                                    <div className="text-[11px] text-textSecondary">alma.lawson@example.com</div>
                                </div>
                            </div>
                            <ArrowUpRight size={16} className="text-textSecondary group-hover:text-white transition-colors" />
                        </div>

                        <div className="glass-card bg-surface/30 p-4 flex items-center justify-between group hover:bg-surface/60 transition-colors cursor-pointer border border-borderLight/30">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=2" alt="Cody" className="w-10 h-10 rounded-full border border-white/10" />
                                <div>
                                    <div className="text-sm font-semibold text-white">Cody Fisher</div>
                                    <div className="text-[11px] text-textSecondary">cody.fisher@example.com</div>
                                </div>
                            </div>
                            <ArrowUpRight size={16} className="text-textSecondary group-hover:text-white transition-colors" />
                        </div>

                        <div className="glass-card bg-surface/30 p-4 flex items-center justify-between group hover:bg-surface/60 transition-colors cursor-pointer border border-borderLight/30">
                            <div className="flex items-center gap-3">
                                <img src="https://i.pravatar.cc/150?u=3" alt="Devon" className="w-10 h-10 rounded-full border border-white/10" />
                                <div>
                                    <div className="text-sm font-semibold text-white">Devon Lane</div>
                                    <div className="text-[11px] text-textSecondary">devon.lane@example.com</div>
                                </div>
                            </div>
                            <ArrowUpRight size={16} className="text-textSecondary group-hover:text-white transition-colors" />
                        </div>
                    </div>

                </div>

                {/* RIGHT COLUMN (Spans 3) - Ai Assistant */}
                <div className="lg:col-span-4 xl:col-span-3">
                    <div className="glass-card bg-[#1A1A1C] h-full border border-borderLight flex flex-col overflow-hidden">

                        {/* Header */}
                        <div className="px-5 py-4 flex items-center justify-between border-b border-white/5">
                            <div className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                <Sparkles size={16} /> Ai Assistant
                            </div>
                            <button className="text-textSecondary hover:text-white transition-colors">
                                <Maximize2 size={14} />
                            </button>
                        </div>

                        {/* Chat History */}
                        <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-6">

                            {/* User Message */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <img src="https://i.pravatar.cc/150?u=a042581f4e290267041" alt="User" className="w-6 h-6 rounded-full" />
                                        <span className="text-sm font-semibold text-white">Abdul Karim</span>
                                    </div>
                                    <span className="text-[10px] text-textSecondary">12:42 PM</span>
                                </div>
                                <p className="text-sm text-textSecondary pl-8 mb-3 leading-relaxed">
                                    Hey TENTACLES, can you check for discrepancies in revenue and projects value?
                                </p>
                                <div className="ml-8 inline-flex items-center gap-2 bg-[#262628] border border-white/5 px-3 py-1.5 rounded-lg">
                                    <FileBox size={14} className="text-yellow-500" />
                                    <span className="text-[11px] text-white">ID: #OQW874999P</span>
                                </div>
                            </div>

                            {/* Bot Message */}
                            <div>
                                <div className="flex items-center justify-between mb-2">
                                    <div className="flex items-center gap-2">
                                        <h4 className="text-sm font-black text-neon tracking-wider">TENTACLES</h4>
                                    </div>
                                    <span className="text-[10px] text-textSecondary">12:42 PM</span>
                                </div>
                                <p className="text-sm text-white font-medium mb-4">
                                    Main Deviations by Month:
                                </p>

                                <div className="space-y-3 mb-6">
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 rounded-full bg-borderLight"></span> Jan :</div>
                                        <div className="font-semibold text-white">$50.2 K</div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2 text-white"><span className="w-1.5 h-1.5 rounded-full bg-borderLight"></span> Feb :</div>
                                        <div className="font-semibold text-white">$47.9 K</div>
                                    </div>
                                    <div className="flex items-center justify-between text-xs">
                                        <div className="flex items-center gap-2 text-neon"><span className="w-1.5 h-1.5 rounded-full bg-neon shadow-[0_0_8px_#D4F64D]"></span> Mar :</div>
                                        <div className="font-semibold text-white">$26.7 K</div>
                                    </div>
                                </div>

                                {/* Distribution Bar */}
                                <div className="w-full flex gap-[2px] h-3">
                                    <div className="w-[10%] bg-neon rounded-l-sm shadow-[0_0_8px_#D4F64D]"></div>
                                    <div className="w-[60%] bg-[#3A3A3C]"></div>
                                    <div className="flex-1 bg-[#262628] rounded-r-sm flex gap-[1px]">
                                        {[...Array(15)].map((_, i) => <div key={i} className="flex-1 bg-borderLight/20"></div>)}
                                    </div>
                                </div>

                            </div>
                        </div>

                        {/* Input Area */}
                        <div className="p-4 border-t border-white/5 bg-[#1F1F22]">
                            <div className="flex gap-2 mb-3">
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md bg-[#2C2C2E] border border-white/5 text-[11px] text-textSecondary hover:text-white transition-colors">
                                    <FileText size={12} /> File
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/5 text-[11px] text-textSecondary hover:text-white hover:bg-[#2C2C2E] transition-colors">
                                    <ImageIcon size={12} /> Image
                                </button>
                                <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-md border border-white/5 text-[11px] text-textSecondary hover:text-white hover:bg-[#2C2C2E] transition-colors">
                                    <Mic size={12} /> Audio Chat
                                </button>
                            </div>

                            <div className="flex gap-2 bg-[#1A1A1C] border border-white/10 rounded-xl p-1 items-center shadow-inner">
                                <input
                                    type="text"
                                    placeholder="Enter your AI Assistant Request"
                                    className="flex-1 bg-transparent border-none text-[13px] text-white px-3 py-2 focus:outline-none placeholder:text-textSecondary/60"
                                />
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-[#2C2C2E] text-textSecondary hover:text-white transition-colors">
                                    <Plus size={16} />
                                </button>
                                <button className="w-8 h-8 flex items-center justify-center rounded-lg bg-neon text-black hover:brightness-110 shadow-[0_0_10px_rgba(212,246,77,0.3)] transition-all">
                                    <Send size={14} className="mr-0.5 mt-0.5" />
                                </button>
                            </div>
                        </div>

                    </div>
                </div>

            </div>

        </div>
    )
}
