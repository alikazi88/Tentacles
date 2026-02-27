import {
    ArrowUpRight, Calendar, ChevronDown, FileBox,
    Image as ImageIcon, Mic, Plus, Send, Sparkles,
    Zap, Maximize2, FileText
} from 'lucide-react'


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

                    {/* Row 1: Primary Large Cards */}
                    <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">

                        {/* Card 1: Cost Intelligence */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">💰</span> Cost Intelligence
                                </span>
                                <div className="flex items-center gap-2 text-[11px]">
                                    <span className="text-textSecondary/70">This Week <ChevronDown size={12} className="inline" /></span>
                                    <span className="text-neon ml-2 cursor-pointer hover:underline">Details</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-4 mb-6 relative z-10">
                                <div>
                                    <div className="text-3xl font-bold text-white leading-none mb-1">$12.45</div>
                                    <div className="text-[11px] text-textSecondary">Today</div>
                                </div>
                                <div className="text-center border-x border-white/5">
                                    <div className="text-3xl font-bold text-neon leading-none mb-1">$34.50</div>
                                    <div className="text-[11px] text-textSecondary">Saved</div>
                                </div>
                                <div className="text-right">
                                    <div className="text-3xl font-bold text-white leading-none mb-1">73%</div>
                                    <div className="text-[11px] text-textSecondary">Efficiency</div>
                                </div>
                            </div>

                            <div className="w-full h-px bg-white/5 mb-6"></div>

                            <div className="mb-6">
                                <div className="flex justify-between text-xs text-white mb-2 font-medium">
                                    <span>Local vs Cloud Usage</span>
                                    <span>85/15%</span>
                                </div>
                                <div className="w-full h-2 rounded-full overflow-hidden flex bg-[#1F1F22]">
                                    <div className="h-full bg-neon w-[85%] shadow-[0_0_8px_#D4F64D]"></div>
                                    <div className="h-full bg-white/20 w-[15%]"></div>
                                </div>
                                <div className="text-[11px] text-textSecondary mt-2">
                                    You saved <span className="text-neon">$34.50</span> this week by using local models
                                </div>
                            </div>

                            <div className="flex-1 space-y-3 mt-2">
                                <div className="text-xs font-semibold text-white mb-2">Top Cost Drivers:</div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-textSecondary flex items-center gap-2">• GPT-4o <span className="opacity-50">(complex analysis)</span></span>
                                    <span className="font-mono text-white">$8.20</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-textSecondary flex items-center gap-2">• Claude 3.5 Sonnet <span className="opacity-50">(coding)</span></span>
                                    <span className="font-mono text-white">$3.45</span>
                                </div>
                                <div className="flex justify-between items-center text-[11px]">
                                    <span className="text-textSecondary flex items-center gap-2">• Local models</span>
                                    <span className="font-mono text-neon text-opacity-80">$0.00 (free)</span>
                                </div>
                            </div>

                            <div className="mt-6 bg-[#262628] border border-neon/20 p-3 rounded-xl flex items-start gap-3 relative overflow-hidden group">
                                <div className="absolute inset-0 bg-neon/[0.03] group-hover:bg-neon/[0.08] transition-colors"></div>
                                <span className="text-lg relative z-10">🎯</span>
                                <div className="relative z-10">
                                    <p className="text-[11px] text-white font-medium mb-1">Suggestion: Switch "General Chat" to Llama 3.1 8B</p>
                                    <p className="text-[10px] text-neon/80">Potential savings: $5.20/week</p>
                                </div>
                            </div>
                        </div>

                        {/* Card 2: Agent Performance */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">🤖</span> Agent Performance
                                </span>
                                <div className="flex items-center gap-2 text-[11px]">
                                    <span className="text-textSecondary/70">Today <ChevronDown size={12} className="inline" /></span>
                                    <span className="text-neon ml-2 cursor-pointer hover:underline">Manage</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-white bg-black/20 p-3 rounded-xl border border-white/5 mb-6">
                                <div><span className="text-textSecondary mr-1">Active Agents:</span> 4</div>
                                <div><span className="text-textSecondary mr-1">Tasks Completed:</span> 147</div>
                                <div><span className="text-textSecondary mr-1">Avg Latency:</span> 1.2s</div>
                            </div>

                            <div className="space-y-4 mb-6 flex-1">
                                {[
                                    { icon: "🎯", name: "General", val: 100, color: "bg-white", tasks: 52, time: "0.8s" },
                                    { icon: "💻", name: "Coder", val: 75, color: "bg-neon shadow-[0_0_8px_#D4F64D]", tasks: 38, time: "1.4s" },
                                    { icon: "🔍", name: "Researcher", val: 45, color: "bg-white/60", tasks: 24, time: "2.1s" },
                                    { icon: "📝", name: "Writer", val: 30, color: "bg-white/40", tasks: 18, time: "0.9s" },
                                    { icon: "📊", name: "Analyst", val: 20, color: "bg-white/20", tasks: 15, time: "1.8s" }
                                ].map((agent, i) => (
                                    <div key={i} className="flex items-center text-[11px] group">
                                        <div className="w-24 flex items-center gap-2 text-white/80">
                                            <span>{agent.icon}</span> {agent.name}
                                        </div>
                                        <div className="flex-1 h-1.5 bg-[#1F1F22] rounded-full overflow-hidden flex relative mr-4">
                                            <div className={`h-full ${agent.color}`} style={{ width: `${agent.val}%` }}></div>
                                        </div>
                                        <div className="w-16 text-right text-textSecondary">{agent.tasks} tasks</div>
                                        <div className="w-10 text-right font-mono text-white/80">{agent.time}</div>
                                    </div>
                                ))}
                            </div>

                            <div className="border-t border-white/5 pt-5 space-y-3">
                                <div className="text-[11px] font-semibold text-white">Agent Health:</div>
                                <div className="flex gap-4 text-[10px] text-textSecondary bg-surface/50 p-2 rounded-lg border border-white/5 w-fit">
                                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-green-500 shadow-[0_0_6px_#22c55e]"></span> 4 Active</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-yellow-500"></span> 1 Busy</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-red-500"></span> 0 Error</span>
                                    <span className="flex items-center gap-1.5"><span className="w-2 h-2 rounded-full bg-white/40"></span> 2 Standby</span>
                                </div>

                                <div className="pt-2 space-y-1.5">
                                    <div className="flex items-center gap-2 text-[10px]">
                                        <span className="text-white">🏆 Most Efficient:</span>
                                        <span className="text-textSecondary">Coder Agent <span className="opacity-60">(94% local execution)</span></span>
                                    </div>
                                    <div className="flex items-center gap-2 text-[10px]">
                                        <span className="text-yellow-500 drop-shadow-[0_0_3px_rgb(234,179,8)]">⚠️ Needs Attention:</span>
                                        <span className="text-textSecondary">Researcher <span className="opacity-60">(high cloud dependency)</span></span>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Row 2: Secondary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 3: Memory Insights */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">🧠</span> Memory Insights
                                </span>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Explore</span>
                                    <span className="text-black bg-neon hover:brightness-110 cursor-pointer transition-colors px-2 py-1 rounded">Optimize</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                <div className="bg-[#1A1A1C] border border-white/5 rounded-xl p-3">
                                    <div className="text-2xl font-bold text-white mb-1">2,341</div>
                                    <div className="text-[10px] text-textSecondary uppercase tracking-wider">Total Entities</div>
                                </div>
                                <div className="bg-[#1A1A1C] border border-white/5 rounded-xl p-3">
                                    <div className="text-2xl font-bold text-white mb-1">+23</div>
                                    <div className="text-[10px] text-textSecondary uppercase tracking-wider">Today New</div>
                                </div>
                                <div className="bg-[#1A1A1C] border border-neon/20 rounded-xl p-3">
                                    <div className="text-2xl font-bold text-neon mb-1">89%</div>
                                    <div className="text-[10px] text-neon/70 uppercase tracking-wider">Relevance</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-[11px] font-semibold text-white mb-3">Memory Composition:</div>
                                <div className="flex gap-4 text-[11px]">
                                    <span className="text-textSecondary"><span className="text-white">👤 45%</span> People</span>
                                    <span className="text-textSecondary"><span className="text-white">💼 28%</span> Projects</span>
                                    <span className="text-textSecondary"><span className="text-white">📄 15%</span> Files</span>
                                    <span className="text-textSecondary"><span className="text-white">🏷️ 12%</span> Topics</span>
                                </div>
                            </div>

                            <div className="bg-black/20 border border-white/5 rounded-xl p-4 flex-1">
                                <div className="text-[11px] font-semibold text-white mb-3">Recent Memory Activity:</div>
                                <div className="space-y-3">
                                    <div className="flex gap-3 text-[11px]">
                                        <span className="text-textSecondary/60 font-mono w-12">2:34 PM</span>
                                        <span className="text-textSecondary">Remembered: <span className="text-white">"Sarah prefers morning meetings"</span></span>
                                    </div>
                                    <div className="flex gap-3 text-[11px]">
                                        <span className="text-textSecondary/60 font-mono w-12">1:15 PM</span>
                                        <span className="text-textSecondary">Linked: <span className="text-white">"Q4 Budget"</span> → <span className="text-white">"Cloud Costs"</span> <span className="opacity-50">(concern)</span></span>
                                    </div>
                                    <div className="flex gap-3 text-[11px]">
                                        <span className="text-textSecondary/60 font-mono w-12">11:30 AM</span>
                                        <span className="text-textSecondary">Extracted: New person <span className="text-white">"David Chen"</span> from email</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 flex items-center gap-2 text-[11px]">
                                <span className="text-textSecondary">🔍 Top Searches:</span>
                                <span className="text-neon/90 bg-neon/10 px-2 py-0.5 rounded">"budget"</span>
                                <span className="text-neon/90 bg-neon/10 px-2 py-0.5 rounded">"Sarah"</span>
                                <span className="text-neon/90 bg-neon/10 px-2 py-0.5 rounded">"API performance"</span>
                            </div>
                        </div>

                        {/* Card 4: Skill Ecosystem */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">🔧</span> Skill Ecosystem
                                </span>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Studio</span>
                                    <span className="text-black bg-neon hover:brightness-110 cursor-pointer transition-colors px-2 py-1 rounded">Marketplace</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-white bg-black/20 p-3 rounded-xl border border-white/5 mb-6">
                                <div><span className="text-textSecondary mr-1">Installed:</span> 12</div>
                                <div><span className="text-textSecondary mr-1">Active Today:</span> 8</div>
                                <div><span className="text-textSecondary mr-1">Custom Built:</span> 3</div>
                            </div>

                            <div className="flex-1">
                                <div className="text-[11px] font-semibold text-white mb-3">Most Used Skills:</div>
                                <div className="space-y-3">
                                    {[
                                        { icon: "📁", name: "File Ops", val: 89, color: "bg-white" },
                                        { icon: "🔍", name: "Web Search", val: 67, color: "bg-neon shadow-[0_0_8px_#D4F64D]" },
                                        { icon: "💻", name: "Code Exec", val: 45, color: "bg-white/60" },
                                        { icon: "🧠", name: "Memory", val: 34, color: "bg-white/40" },
                                        { icon: "📧", name: "Gmail", val: 23, color: "bg-white/20" }
                                    ].map((skill, i) => (
                                        <div key={i} className="flex items-center text-[11px]">
                                            <div className="w-24 flex items-center gap-2 text-white/80">
                                                <span>{skill.icon}</span> {skill.name}
                                            </div>
                                            <div className="flex-1 h-1.5 bg-[#1F1F22] rounded-full overflow-hidden flex relative mr-4">
                                                <div className={`h-full ${skill.color}`} style={{ width: `${skill.val}%` }}></div>
                                            </div>
                                            <div className="w-14 text-right text-textSecondary">{skill.val} uses</div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className="mt-6 border-t border-white/5 pt-4">
                                <div className="flex items-center gap-4 text-[10px] text-textSecondary mb-4">
                                    <span className="text-white font-semibold">Skill Health:</span>
                                    <span className="flex items-center gap-1.5"><span className="text-green-500">✅</span> 11 Working</span>
                                    <span className="flex items-center gap-1.5"><span className="text-yellow-500">⚠️</span> 1 Needs Update</span>
                                    <span className="flex items-center gap-1.5"><span className="text-red-500">❌</span> 0 Failed</span>
                                </div>
                                <div className="bg-[#1A1A1C] border border-white/5 rounded-xl p-3">
                                    <div className="text-[11px] font-semibold text-white mb-2 flex justify-between items-center">
                                        <span>🆕 Marketplace Highlights:</span>
                                        <span className="text-neon/80 text-[10px] cursor-pointer hover:underline">Browse 50+</span>
                                    </div>
                                    <div className="grid grid-cols-2 gap-2 text-[10px]">
                                        <div className="text-textSecondary flex justify-between">Notion Sync <span className="text-yellow-500">4.9★</span></div>
                                        <div className="text-textSecondary flex justify-between">Slack Bot <span className="text-yellow-500">4.7★</span></div>
                                        <div className="text-textSecondary flex justify-between">Figma Export <span className="text-yellow-500">4.8★</span></div>
                                        <div className="text-textSecondary flex justify-between">Jira Sync <span className="text-yellow-500">4.6★</span></div>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Row 3: Tertiary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 5: Model Efficiency */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">🧠</span> Model Efficiency
                                </span>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Configure</span>
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Details</span>
                                </div>
                            </div>

                            <div className="text-[11px] font-semibold text-white mb-3">Smart Routing Results:</div>
                            <div className="bg-[#1A1A1C] border border-white/5 rounded-xl overflow-hidden mb-6">
                                <table className="w-full text-[11px] text-left">
                                    <thead className="bg-white/5 text-textSecondary border-b border-white/5">
                                        <tr>
                                            <th className="px-3 py-2 font-medium">Task Type</th>
                                            <th className="px-3 py-2 font-medium">Routed To</th>
                                            <th className="px-3 py-2 font-medium">Avg Time</th>
                                            <th className="px-3 py-2 font-medium">Cost</th>
                                            <th className="px-3 py-2 font-medium">★</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5 text-white/90">
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-2">Simple QA</td>
                                            <td className="px-3 py-2 text-neon/90">Llama 3.1 8B</td>
                                            <td className="px-3 py-2 font-mono">0.8s</td>
                                            <td className="px-3 py-2 font-mono">$0.00</td>
                                            <td className="px-3 py-2 text-yellow-500">95%</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-2">Code Gen</td>
                                            <td className="px-3 py-2 text-neon/90">CodeLlama 13B</td>
                                            <td className="px-3 py-2 font-mono">1.2s</td>
                                            <td className="px-3 py-2 font-mono">$0.00</td>
                                            <td className="px-3 py-2 text-yellow-500">92%</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-2">Complex Analysis</td>
                                            <td className="px-3 py-2">Claude 3.5</td>
                                            <td className="px-3 py-2 font-mono">2.4s</td>
                                            <td className="px-3 py-2 font-mono">$0.05</td>
                                            <td className="px-3 py-2 text-yellow-500">98%</td>
                                        </tr>
                                        <tr className="hover:bg-white/5 transition-colors">
                                            <td className="px-3 py-2">Creative</td>
                                            <td className="px-3 py-2">GPT-4o</td>
                                            <td className="px-3 py-2 font-mono">1.8s</td>
                                            <td className="px-3 py-2 font-mono">$0.03</td>
                                            <td className="px-3 py-2 text-yellow-500">88%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>

                            <div className="flex items-center gap-6 text-[11px] mb-6">
                                <div><span className="text-white font-medium">Routing Accuracy:</span> <span className="text-neon">94%</span> <span className="text-textSecondary">(correct mode chosen)</span></div>
                                <div><span className="text-white font-medium">Fallback Rate:</span> <span className="text-yellow-500">6%</span> <span className="text-textSecondary">(local failed, used cloud)</span></div>
                            </div>

                            <div className="mt-auto bg-[#262628] border border-white/10 p-3 rounded-xl flex items-start gap-3 relative overflow-hidden group">
                                <span className="text-lg relative z-10 opacity-80">💡</span>
                                <div className="relative z-10">
                                    <p className="text-[11px] text-white font-medium mb-1">Optimization: CodeLlama handling 95% of coding tasks</p>
                                    <p className="text-[10px] text-textSecondary">Consider fine-tuning for remaining 5% edge cases</p>
                                </div>
                            </div>

                            <div className="text-center mt-4">
                                <span className="text-[10px] text-neon/60 cursor-pointer hover:underline hover:text-neon transition-colors">View All 847 Routing Decisions</span>
                            </div>
                        </div>

                        {/* Card 6: Active Workflows */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">⚡</span> Active Workflows
                                </span>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Builder</span>
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">History</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-white bg-black/20 p-3 rounded-xl border border-white/5 mb-6">
                                <div><span className="text-textSecondary mr-1">Running:</span> <span className="text-neon">3</span></div>
                                <div><span className="text-textSecondary mr-1">Scheduled:</span> 5</div>
                                <div><span className="text-textSecondary mr-1">Completed Today:</span> 12</div>
                            </div>

                            <div className="space-y-3 mb-6 flex-1">
                                <div className="bg-[#1A1A1C] border border-neon/20 p-3 rounded-xl">
                                    <div className="flex items-center justify-between text-[11px] mb-2">
                                        <div className="flex items-center gap-2 text-white font-medium">
                                            <span className="text-neon animate-pulse">🔄</span> Email Triage
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-neon bg-neon/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">Running</span>
                                            <span className="text-textSecondary">● 12 processed</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-textSecondary pl-6 flex items-center gap-1.5">
                                        <span>└─→</span>
                                        <span className="text-white/80">Researcher</span>
                                        <span className="text-textSecondary/50">→</span>
                                        <span className="text-white/80">Coder</span>
                                        <span className="text-textSecondary/50">→</span>
                                        <span className="text-white/80">Archive</span>
                                    </div>
                                </div>

                                <div className="bg-[#1A1A1C] border border-white/5 p-3 rounded-xl opacity-80">
                                    <div className="flex items-center justify-between text-[11px] mb-2">
                                        <div className="flex items-center gap-2 text-white font-medium">
                                            <span>⏰</span> Daily Standup
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-white/60 bg-white/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">Scheduled</span>
                                            <span className="text-textSecondary">9:00 AM tomorrow</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-textSecondary pl-6 flex items-center gap-1.5">
                                        <span>└─→</span>
                                        <span className="text-white/80">Analyst</span>
                                        <span className="text-textSecondary/50">→</span>
                                        <span className="text-white/80">Slack #standup</span>
                                    </div>
                                </div>

                                <div className="bg-[#1A1A1C] border border-white/5 p-3 rounded-xl opacity-60">
                                    <div className="flex items-center justify-between text-[11px] mb-2">
                                        <div className="flex items-center gap-2 text-white font-medium">
                                            <span className="text-green-500">✅</span> Code Review
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <span className="text-green-500 bg-green-500/10 px-1.5 py-0.5 rounded text-[9px] uppercase tracking-wider">Completed</span>
                                            <span className="text-textSecondary">23 PRs reviewed</span>
                                        </div>
                                    </div>
                                    <div className="text-[10px] text-textSecondary pl-6 flex items-center gap-1.5">
                                        <span>└─→</span>
                                        <span className="text-white/80">Coder</span>
                                        <span className="text-textSecondary/50">→</span>
                                        <span className="text-white/80">GitHub</span>
                                        <span className="text-textSecondary/50">→</span>
                                        <span className="text-white/80">Memory</span>
                                    </div>
                                </div>
                            </div>

                            <div className="border-t border-white/5 pt-4 space-y-3">
                                <div className="text-[11px] font-semibold text-white mb-2">Workflow Performance:</div>
                                <div className="flex items-center justify-between text-[11px] text-white bg-surface/50 p-2.5 rounded-lg border border-white/5">
                                    <div><span className="text-textSecondary mr-1">Avg Execution:</span> 4.2s</div>
                                    <div><span className="text-textSecondary mr-1">Success Rate:</span> <span className="text-green-500">98%</span></div>
                                    <div><span className="text-textSecondary mr-1">Time Saved:</span> <span className="text-neon">14h</span></div>
                                </div>

                                <div className="flex items-center gap-2 text-[10px] text-yellow-500 bg-yellow-500/10 p-2 rounded border border-yellow-500/20">
                                    <span>🔔</span>
                                    <span>1 Workflow needs attention: "Code Review" failed 2x</span>
                                    <span className="ml-auto underline cursor-pointer hover:text-yellow-400">View Logs</span>
                                </div>
                            </div>
                        </div>

                    </div>

                    {/* Row 4: Final Cards (System Health & Team Collab) */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Card 7: System Health */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">🔒</span> System Health & Security
                                </span>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Audit Log</span>
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Settings</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-3 gap-2 mb-6 text-center">
                                <div className="bg-[#1A1A1C] border border-green-500/20 rounded-xl p-3">
                                    <div className="text-2xl mb-1 drop-shadow-[0_0_8px_#22c55e]">🟢</div>
                                    <div className="text-[10px] text-textSecondary uppercase tracking-wider">Healthy</div>
                                </div>
                                <div className="bg-[#1A1A1C] border border-white/5 rounded-xl p-3">
                                    <div className="text-2xl font-bold text-white mb-1">0</div>
                                    <div className="text-[10px] text-textSecondary uppercase tracking-wider">Alerts</div>
                                </div>
                                <div className="bg-[#1A1A1C] border border-white/5 rounded-xl p-3">
                                    <div className="text-2xl font-bold text-white mb-1">100%</div>
                                    <div className="text-[10px] text-textSecondary uppercase tracking-wider">Uptime (7d)</div>
                                </div>
                            </div>

                            <div className="mb-6">
                                <div className="text-[11px] font-semibold text-white mb-3">Component Status:</div>
                                <div className="space-y-2 text-[11px]">
                                    <div className="flex justify-between items-center text-textSecondary">
                                        <span className="flex items-center gap-2">● Local LLM (Ollama)</span>
                                        <span className="text-white/80 border-b border-white/10 flex-1 mx-4 border-dotted leading-[0.5]"></span>
                                        <span className="text-white flex items-center gap-1.5"><span className="text-[8px]">🟢</span> Online (4 models)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-textSecondary">
                                        <span className="flex items-center gap-2">● Cloud API (OpenAI)</span>
                                        <span className="text-white/80 border-b border-white/10 flex-1 mx-4 border-dotted leading-[0.5]"></span>
                                        <span className="text-white flex items-center gap-1.5"><span className="text-[8px]">🟢</span> Responsive (45ms)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-textSecondary">
                                        <span className="flex items-center gap-2">● Cloud API (Anthropic)</span>
                                        <span className="text-white/80 border-b border-white/10 flex-1 mx-4 border-dotted leading-[0.5]"></span>
                                        <span className="text-white flex items-center gap-1.5"><span className="text-[8px]">🟢</span> Responsive (62ms)</span>
                                    </div>
                                    <div className="flex justify-between items-center text-textSecondary">
                                        <span className="flex items-center gap-2">● Vector DB (pgvector)</span>
                                        <span className="text-white/80 border-b border-white/10 flex-1 mx-4 border-dotted leading-[0.5]"></span>
                                        <span className="text-white flex items-center gap-1.5"><span className="text-[8px]">🟢</span> 2,341 indexed</span>
                                    </div>
                                    <div className="flex justify-between items-center text-textSecondary">
                                        <span className="flex items-center gap-2">● WASM Sandbox</span>
                                        <span className="text-white/80 border-b border-white/10 flex-1 mx-4 border-dotted leading-[0.5]"></span>
                                        <span className="text-white flex items-center gap-1.5"><span className="text-[8px]">🟢</span> 12 skills active</span>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-black/20 border border-white/5 rounded-xl p-4 flex-1 mb-4">
                                <div className="text-[11px] font-semibold text-white mb-3">Recent Security Events:</div>
                                <div className="space-y-2.5">
                                    <div className="flex items-start gap-2.5 text-[10px]">
                                        <span className="text-green-500 mt-0.5">✅</span>
                                        <div>
                                            <span className="text-textSecondary/60 font-mono mr-2">14:32</span>
                                            <span className="text-textSecondary">Skill "File Ops" accessed ~/Tentacles <span className="text-green-500/80">(allowed)</span></span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5 text-[10px]">
                                        <span className="text-green-500 mt-0.5">✅</span>
                                        <div>
                                            <span className="text-textSecondary/60 font-mono mr-2">14:15</span>
                                            <span className="text-textSecondary">Model switched: GPT-4o → Local <span className="text-white/60">(budget opt.)</span></span>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-2.5 text-[10px]">
                                        <span className="text-green-500 mt-0.5">✅</span>
                                        <div>
                                            <span className="text-textSecondary/60 font-mono mr-2">13:58</span>
                                            <span className="text-textSecondary">User approved web search for "API docs"</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center justify-center gap-2 text-[10px] text-textSecondary">
                                <span>🛡️</span> All 847 sandbox executions contained this week
                            </div>
                        </div>

                        {/* Card 8: Team Collaboration */}
                        <div className="glass-card bg-surface/40 p-6 flex flex-col group hover:border-neon/30 transition-colors">
                            <div className="flex items-center justify-between mb-6">
                                <span className="flex items-center gap-2 text-sm text-textSecondary font-medium">
                                    <span className="text-lg">👥</span> Team Collaboration <span className="text-[10px] bg-white/10 px-1.5 py-0.5 rounded text-white/80 ml-1">Beta</span>
                                </span>
                                <div className="flex items-center gap-3 text-[11px]">
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Invite</span>
                                    <span className="text-textSecondary hover:text-white cursor-pointer transition-colors bg-white/5 px-2 py-1 rounded">Manage</span>
                                </div>
                            </div>

                            <div className="flex items-center justify-between text-xs text-white bg-black/20 p-3 rounded-xl border border-white/5 mb-6">
                                <div><span className="text-textSecondary mr-1">Team:</span> 5 members</div>
                                <div><span className="text-textSecondary mr-1">Shared Agents:</span> 3</div>
                                <div><span className="text-textSecondary mr-1">Team Memory:</span> 892</div>
                            </div>

                            <div className="mb-6 flex-1">
                                <div className="text-[11px] font-semibold text-white mb-3">Shared Resources:</div>
                                <div className="space-y-3 bg-[#1A1A1C] border border-white/5 rounded-xl p-4">
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-white">
                                            <span>🤖</span> Onboarding Agent
                                        </div>
                                        <div className="flex items-center gap-4 text-textSecondary">
                                            <span>Used by 4 members</span>
                                            <span className="font-mono w-16 text-right">234 chats</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-white">
                                            <span>🤖</span> Support Triage
                                        </div>
                                        <div className="flex items-center gap-4 text-textSecondary">
                                            <span>Used by 3 members</span>
                                            <span className="font-mono w-16 text-right">189 chats</span>
                                        </div>
                                    </div>
                                    <div className="flex items-center justify-between text-[11px]">
                                        <div className="flex items-center gap-2 text-white">
                                            <span>📊</span> Sales Analytics
                                        </div>
                                        <div className="flex items-center gap-4 text-textSecondary">
                                            <span>Used by 2 members</span>
                                            <span className="font-mono w-16 text-right">67 queries</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-gradient-to-br from-neon/10 to-transparent border border-neon/20 rounded-xl p-4 mb-6">
                                <div className="text-[11px] font-semibold text-white mb-2">Team Memory Insights:</div>
                                <ul className="text-[11px] text-textSecondary space-y-1.5 list-disc pl-4">
                                    <li>Most referenced: <span className="text-white">"Q4 Goals"</span> <span className="opacity-60">(mentioned 45 times)</span></li>
                                    <li>New this week: <span className="text-white">"Product Launch"</span>, <span className="text-white">"Competitor Analysis"</span></li>
                                </ul>
                            </div>

                            <button className="w-full py-2.5 rounded-xl border border-white/10 text-[11px] text-white hover:bg-white/5 transition-colors font-medium flex items-center justify-center gap-2">
                                Upgrade to Team Plan <span className="text-textSecondary font-normal">- $29/mo for advanced collaboration</span>
                            </button>
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
