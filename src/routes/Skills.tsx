import { useState } from 'react'
import { Search, Plus, Power, Download, Shield, Box, Sparkles, Filter, ExternalLink, Settings2 } from 'lucide-react'
import { useSkillStore, type SkillCategory } from '../store/skillStore'

export function Skills() {
    const {
        skills,
        searchQuery,
        activeCategory,
        setSearchQuery,
        setActiveCategory,
        toggleSkillActive,
        installSkill
    } = useSkillStore()

    const [installingId, setInstallingId] = useState<string | null>(null)

    const categories: { id: SkillCategory | 'all', label: string, icon: React.ReactNode }[] = [
        { id: 'all', label: 'All Skills', icon: <Box size={16} /> },
        { id: 'core', label: 'Core', icon: <Sparkles size={16} /> },
        { id: 'development', label: 'Development', icon: <Box size={16} /> },
        { id: 'web', label: 'Web', icon: <Box size={16} /> },
        { id: 'data', label: 'Data', icon: <Box size={16} /> },
        { id: 'system', label: 'System', icon: <Box size={16} /> }
    ]

    const filteredSkills = skills.filter(skill => {
        const matchesSearch = skill.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
            skill.description.toLowerCase().includes(searchQuery.toLowerCase())
        const matchesCategory = activeCategory === 'all' || skill.category === activeCategory
        return matchesSearch && matchesCategory
    })

    const installedSkills = filteredSkills.filter(s => s.is_installed)
    const marketplaceSkills = filteredSkills.filter(s => !s.is_installed)

    const handleInstall = async (id: string) => {
        setInstallingId(id)
        await installSkill(id)
        setInstallingId(null)
    }

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                        Skill Studio
                    </h2>
                    <p className="text-textSecondary mt-2 leading-relaxed max-w-2xl">
                        — Discover, manage, and monitor WASM-sandboxed capabilities for your autonomous agents.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <button className="btn-secondary flex items-center gap-2">
                        <Settings2 size={16} /> Sandbox Config
                    </button>
                    <button className="btn-primary flex items-center gap-2">
                        <Plus size={18} /> Import .wasm
                    </button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface/40 p-2 rounded-2xl border border-white/5 backdrop-blur-sm">
                <div className="flex items-center flex-1 gap-2 w-full overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    {categories.map(cat => (
                        <button
                            key={cat.id}
                            onClick={() => setActiveCategory(cat.id)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap ${activeCategory === cat.id
                                    ? 'bg-neon/10 text-neon border border-neon/20 shadow-[0_0_10px_rgba(209,255,0,0.1)]'
                                    : 'text-textSecondary hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            {cat.icon} {cat.label}
                        </button>
                    ))}
                </div>

                <div className="relative group w-full md:w-72 shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-textSecondary group-focus-within:text-neon transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search skills..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-textSecondary/50 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-all"
                    />
                </div>
            </div>

            {/* Installed Skills Grid */}
            {installedSkills.length > 0 && (
                <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Box size={20} className="text-neon" /> Installed Skills
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {installedSkills.map(skill => (
                            <div key={skill.id} className={`glass-card p-6 flex flex-col transition-all duration-300 ${skill.is_active ? 'border-neon/20 shadow-[0_4px_20px_rgba(209,255,0,0.05)]' : 'border-white/5 opacity-80'}`}>

                                <div className="flex justify-between items-start mb-4">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 rounded-xl bg-surface border border-white/5 flex items-center justify-center text-2xl shadow-inner">
                                            {skill.icon}
                                        </div>
                                        <div>
                                            <h4 className="text-base font-semibold text-white leading-tight">{skill.name}</h4>
                                            <span className="text-[10px] text-textSecondary uppercase tracking-wider">{skill.author} • v{skill.version}</span>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => toggleSkillActive(skill.id, !skill.is_active)}
                                        className={`p-2 rounded-lg transition-colors ${skill.is_active ? 'text-neon bg-neon/10 hover:bg-neon/20' : 'text-textSecondary bg-white/5 hover:text-white'}`}
                                        title={skill.is_active ? "Deactivate" : "Activate"}
                                    >
                                        <Power size={18} />
                                    </button>
                                </div>

                                <p className="text-sm text-textSecondary leading-relaxed line-clamp-2 mb-6 flex-1">
                                    {skill.description}
                                </p>

                                <div className="space-y-4 border-t border-white/5 pt-4 mt-auto">
                                    <div className="flex items-center gap-2 flex-wrap">
                                        <Shield size={12} className="text-yellow-500" />
                                        {skill.permissions.map(p => (
                                            <span key={p} className="text-[10px] bg-yellow-500/10 text-yellow-500/90 px-2 py-0.5 rounded border border-yellow-500/20 font-mono">
                                                {p}
                                            </span>
                                        ))}
                                    </div>

                                    <div className="flex items-center justify-between text-xs font-medium">
                                        <div className="flex items-center gap-2">
                                            <span className={`w-2 h-2 rounded-full ${skill.is_active ? 'bg-neon shadow-[0_0_8px_rgba(209,255,0,0.8)]' : 'bg-textSecondary'}`}></span>
                                            <span className={skill.is_active ? 'text-neon' : 'text-textSecondary'}>
                                                {skill.is_active ? 'Active Sandbox' : 'Disabled'}
                                            </span>
                                        </div>
                                        <button className="text-textSecondary hover:text-white transition-colors flex items-center gap-1">
                                            Details <ExternalLink size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {/* Marketplace / Uninstalled Skills */}
            {marketplaceSkills.length > 0 && (
                <div className="space-y-4 pt-8 border-t border-white/5">
                    <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                        <Download size={20} className="text-textSecondary" /> Available in Registry
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {marketplaceSkills.map(skill => (
                            <div key={skill.id} className="glass-card bg-surface/20 border-white/5 p-6 flex flex-col relative group overflow-hidden">

                                <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500" />

                                <div className="flex items-start gap-4 mb-4">
                                    <div className="w-12 h-12 rounded-xl bg-background border border-white/5 flex items-center justify-center text-2xl opacity-70">
                                        {skill.icon}
                                    </div>
                                    <div>
                                        <h4 className="text-base font-semibold text-white/80 leading-tight">{skill.name}</h4>
                                        <div className="flex items-center gap-2 mt-1">
                                            <span className="text-[10px] text-textSecondary uppercase tracking-wider">{skill.author}</span>
                                            <span className="text-[10px] bg-white/5 text-textSecondary px-1.5 py-0.5 rounded">v{skill.version}</span>
                                        </div>
                                    </div>
                                </div>

                                <p className="text-sm text-textSecondary/80 leading-relaxed line-clamp-2 mb-6 flex-1">
                                    {skill.description}
                                </p>

                                <button
                                    onClick={() => handleInstall(skill.id)}
                                    disabled={installingId === skill.id}
                                    className="w-full py-2.5 rounded-xl border border-white/10 text-sm font-medium text-white hover:bg-white/10 hover:border-white/20 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
                                >
                                    {installingId === skill.id ? (
                                        <span className="animate-pulse">Downloading .wasm...</span>
                                    ) : (
                                        <>Install <Download size={16} /></>
                                    )}
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            )}

            {filteredSkills.length === 0 && (
                <div className="py-20 flex flex-col items-center justify-center text-center opacity-50">
                    <Filter size={48} className="text-textSecondary mb-4" />
                    <h3 className="text-lg font-medium text-white mb-2">No skills found</h3>
                    <p className="text-sm text-textSecondary max-w-sm">
                        No WASM modules match your current search and category filters.
                    </p>
                </div>
            )}
        </div>
    )
}
