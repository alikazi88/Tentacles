import { useState } from 'react'
import { Settings, User, Shield, CreditCard, Bell, Cpu, Box, Database, Sparkles, Key, Brush, MonitorSmartphone } from 'lucide-react'

type SettingsTab = 'profile' | 'security' | 'billing' | 'notifications' | 'models' | 'skills' | 'memory' | 'agents' | 'api_keys' | 'appearance' | 'system'

export function ApplicationSettings() {
    const [activeTab, setActiveTab] = useState<SettingsTab>('appearance')

    const tabs: { id: SettingsTab, label: string, icon: React.ReactNode, group: string }[] = [
        { id: 'profile', label: 'Profile Settings', icon: <User size={16} />, group: 'Account' },
        { id: 'security', label: 'Security & Auth', icon: <Shield size={16} />, group: 'Account' },
        { id: 'billing', label: 'Billing & Usage', icon: <CreditCard size={16} />, group: 'Account' },

        { id: 'appearance', label: 'Appearance', icon: <Brush size={16} />, group: 'Preferences' },
        { id: 'notifications', label: 'Notifications', icon: <Bell size={16} />, group: 'Preferences' },

        { id: 'models', label: 'LLM Connections', icon: <Cpu size={16} />, group: 'Engine' },
        { id: 'agents', label: 'Agent Defaults', icon: <Sparkles size={16} />, group: 'Engine' },
        { id: 'skills', label: 'Skill Sandboxing', icon: <Box size={16} />, group: 'Engine' },
        { id: 'memory', label: 'Memory Retention', icon: <Database size={16} />, group: 'Engine' },

        { id: 'api_keys', label: 'Developer API Keys', icon: <Key size={16} />, group: 'Advanced' },
        { id: 'system', label: 'System Diagnostics', icon: <MonitorSmartphone size={16} />, group: 'Advanced' },
    ]

    // Group tabs by category
    const groupedTabs = tabs.reduce((acc, tab) => {
        if (!acc[tab.group]) acc[tab.group] = []
        acc[tab.group].push(tab)
        return acc
    }, {} as Record<string, typeof tabs>)

    return (
        <div className="h-full flex gap-6 max-w-[1600px] mx-auto w-full pb-6">

            {/* Left Sidebar - Settings Navigation */}
            <div className="w-64 glass-card bg-surface/40 flex flex-col hidden lg:flex rounded-2xl overflow-hidden shrink-0 border border-white/5 pb-4">
                <div className="p-6 border-b border-white/5 flex items-center gap-3">
                    <Settings className="text-neon" size={24} />
                    <span className="text-lg font-bold text-white">Settings</span>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-6">
                    {Object.entries(groupedTabs).map(([group, groupTabs]) => (
                        <div key={group}>
                            <h4 className="text-[10px] font-bold text-textSecondary uppercase tracking-widest mb-2 px-3">
                                {group}
                            </h4>
                            <div className="space-y-1">
                                {groupTabs.map(tab => (
                                    <button
                                        key={tab.id}
                                        onClick={() => setActiveTab(tab.id)}
                                        className={`w-full text-left px-3 py-2.5 rounded-xl transition-all flex items-center gap-3 text-sm font-medium ${activeTab === tab.id
                                            ? 'bg-neon/10 text-neon shadow-[0_0_10px_rgba(209,255,0,0.05)] border border-neon/20'
                                            : 'text-textSecondary hover:bg-white/5 hover:text-white border border-transparent'
                                            }`}
                                    >
                                        {tab.icon} {tab.label}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 glass-card bg-surface/30 border-white/5 overflow-hidden rounded-2xl flex flex-col relative">

                {/* Header Container */}
                <div className="h-16 border-b border-white/5 bg-surface/60 backdrop-blur-md flex items-center px-8 shrink-0">
                    <h2 className="text-xl font-bold text-white">
                        {tabs.find(t => t.id === activeTab)?.label}
                    </h2>
                </div>

                {/* Content Container (Scrollable) */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-8">

                    {activeTab === 'appearance' && (
                        <div className="max-w-3xl space-y-8 animate-[fadeIn_0.3s_ease_forwards]">

                            <div className="space-y-4">
                                <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">Theme Preferences</h3>
                                <p className="text-sm text-textSecondary">Customize the visual aesthetic of the Tentacles OS interface.</p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
                                    <button className="flex items-center justify-between p-4 rounded-xl border border-neon bg-neon/5 transition-all text-left group">
                                        <div>
                                            <div className="font-semibold text-white group-hover:text-neon transition-colors">Minimin Dark (Default)</div>
                                            <div className="text-xs text-textSecondary mt-1">Deep ocean blues with toxic neon yellow utility accents.</div>
                                        </div>
                                        <div className="w-12 h-12 rounded-lg bg-[#050505] border-2 border-neon flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full bg-neon shadow-[0_0_10px_#D1FF00]" />
                                        </div>
                                    </button>

                                    <button className="flex items-center justify-between p-4 rounded-xl border border-white/10 hover:border-white/30 bg-surface/50 transition-all text-left group opacity-60 grayscale">
                                        <div>
                                            <div className="font-semibold text-white transition-colors">Abyss Light</div>
                                            <div className="text-xs text-textSecondary mt-1">High contrast stark white architecture layout.</div>
                                        </div>
                                        <div className="w-12 h-12 rounded-lg bg-gray-200 border-2 border-gray-400 flex items-center justify-center">
                                            <div className="w-4 h-4 rounded-full bg-black" />
                                        </div>
                                    </button>
                                </div>
                            </div>

                            <div className="space-y-4 pt-6">
                                <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">Layout Density</h3>

                                <div className="flex gap-4">
                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative flex items-center justify-center">
                                            <input type="radio" name="density" className="peer sr-only" defaultChecked />
                                            <div className="w-5 h-5 rounded-full border border-white/20 peer-checked:border-neon"></div>
                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-neon scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <span className="text-sm text-white">Comfortable (Standard)</span>
                                    </label>

                                    <label className="flex items-center gap-3 cursor-pointer">
                                        <div className="relative flex items-center justify-center">
                                            <input type="radio" name="density" className="peer sr-only" />
                                            <div className="w-5 h-5 rounded-full border border-white/20 peer-checked:border-neon"></div>
                                            <div className="absolute w-2.5 h-2.5 rounded-full bg-neon scale-0 peer-checked:scale-100 transition-transform"></div>
                                        </div>
                                        <span className="text-sm text-textSecondary">Compact (Data-dense)</span>
                                    </label>
                                </div>
                            </div>

                        </div>
                    )}

                    {activeTab === 'memory' && (
                        <div className="max-w-3xl space-y-8 animate-[fadeIn_0.3s_ease_forwards]">

                            <div className="space-y-4">
                                <h3 className="text-base font-semibold text-white border-b border-white/10 pb-2">Auto-Remember Pipeline</h3>
                                <p className="text-sm text-textSecondary">Configure how the system extracts background memories from conversations and raw documents.</p>

                                <div className="p-5 rounded-xl border border-white/10 bg-surface/50 flex items-center justify-between">
                                    <div className="pr-6">
                                        <div className="font-semibold text-white mb-1">Continuous Graph Extraction</div>
                                        <div className="text-sm text-textSecondary">Allows agent-core to digest offline chat logs and automatically embed new entities into PgVector.</div>
                                    </div>
                                    <label className="relative inline-flex items-center cursor-pointer shrink-0">
                                        <input type="checkbox" className="sr-only peer" defaultChecked />
                                        <div className="w-11 h-6 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-textSecondary peer-checked:after:bg-black after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-neon shadow-inner border border-white/10"></div>
                                    </label>
                                </div>

                                <div className="p-5 rounded-xl border border-white/10 bg-surface/50 flex items-center justify-between">
                                    <div className="pr-6">
                                        <div className="font-semibold text-white mb-1">Vectorization Model</div>
                                        <div className="text-sm text-textSecondary">The embedding model to use for storing semantic memory data.</div>
                                    </div>
                                    <select className="bg-background border border-white/10 text-white text-sm rounded-lg focus:ring-neon focus:border-neon block p-2.5">
                                        <option>nomic-embed-text (Local)</option>
                                        <option>text-embedding-3-small (OpenAI)</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab !== 'appearance' && activeTab !== 'memory' && (
                        <div className="flex flex-col items-center justify-center h-full text-textSecondary opacity-50 space-y-4">
                            <Settings size={48} className="animate-[spin_10s_linear_infinite]" />
                            <h3 className="text-xl font-medium text-white mb-2">Configuration Pending</h3>
                            <p className="text-sm text-center max-w-sm">
                                The {tabs.find(t => t.id === activeTab)?.label} configuration module is currently being scaffolded.
                            </p>
                        </div>
                    )}

                </div>
            </div>
        </div>
    )
}
