import { useState, useMemo } from 'react'
import { Search, Filter, Network, List as ListIcon, Clock, Database, BrainCircuit, ExternalLink, Zap } from 'lucide-react'
import { useMemoryStore } from '../store/memoryStore'

const EntityIcon = ({ type }: { type: string }) => {
    switch (type) {
        case 'person': return <div className="w-10 h-10 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 flex items-center justify-center font-bold">P</div>
        case 'project': return <div className="w-10 h-10 rounded-xl bg-neon/10 border border-neon/20 text-neon flex items-center justify-center font-bold">Pr</div>
        case 'topic': return <div className="w-10 h-10 rounded-lg bg-cyan-400/10 border border-cyan-400/20 text-cyan-400 flex items-center justify-center font-bold">T</div>
        case 'file': return <div className="w-10 h-10 rounded-lg bg-emerald-400/10 border border-emerald-400/20 text-emerald-400 flex items-center justify-center font-bold">F</div>
        case 'event': return <div className="w-10 h-10 rounded-full bg-orange-400/10 border border-orange-400/20 text-orange-400 flex items-center justify-center font-bold">E</div>
        case 'decision': return <div className="w-10 h-10 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 flex items-center justify-center font-bold">D</div>
        case 'organization': return <div className="w-10 h-10 rounded-xl bg-blue-400/10 border border-blue-400/20 text-blue-400 flex items-center justify-center font-bold">O</div>
        default: return <div className="w-10 h-10 rounded-md bg-white/5 border border-white/10 text-white/50 flex items-center justify-center font-bold">?</div>
    }
}

const ImportanceBadge = ({ score }: { score: number }) => {
    const color = score > 0.9 ? 'text-neon bg-neon/10 border-neon/20' :
        score > 0.8 ? 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20' :
            score > 0.6 ? 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20' :
                'text-textSecondary bg-surface border-white/5'

    return (
        <span className={`px-2 py-0.5 rounded text-[10px] font-mono border ${color} flex items-center gap-1`}>
            {score > 0.9 && <Zap size={10} />} {(score * 100).toFixed(0)}% Importance
        </span>
    )
}

export function Memory() {
    const {
        entities,
        relations,
        searchQuery,
        activeView,
        setSearchQuery,
        setActiveView
    } = useMemoryStore()

    const [typeFilter, setTypeFilter] = useState<string>('all')

    const filteredEntities = useMemo(() => {
        return entities.filter(e => {
            const matchesSearch = e.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                e.summary.toLowerCase().includes(searchQuery.toLowerCase())
            const matchesType = typeFilter === 'all' || e.type === typeFilter
            return matchesSearch && matchesType
        }).sort((a, b) => b.importance_score - a.importance_score)
    }, [entities, searchQuery, typeFilter])

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12 h-full flex flex-col">

            {/* Header Area */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 shrink-0">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                        <BrainCircuit className="text-neon" size={32} />
                        Memory Core
                    </h2>
                    <p className="text-textSecondary mt-2 leading-relaxed max-w-2xl">
                        — The central semantic database. Agents automatically extract and index entities for long-term relational context.
                    </p>
                </div>

                <div className="flex items-center gap-3">
                    <div className="flex items-center p-1 bg-surface border border-white/5 rounded-xl">
                        <button
                            onClick={() => setActiveView('list')}
                            className={`p-2 rounded-lg transition-colors ${activeView === 'list' ? 'bg-white/10 text-white' : 'text-textSecondary hover:text-white'}`}
                        >
                            <ListIcon size={18} />
                        </button>
                        <button
                            onClick={() => setActiveView('timeline')}
                            className={`p-2 rounded-lg transition-colors ${activeView === 'timeline' ? 'bg-white/10 text-white' : 'text-textSecondary hover:text-white'}`}
                        >
                            <Clock size={18} />
                        </button>
                        <button
                            onClick={() => setActiveView('graph')}
                            className={`p-2 rounded-lg transition-colors ${activeView === 'graph' ? 'bg-white/10 text-white' : 'text-textSecondary hover:text-white'}`}
                        >
                            <Network size={18} />
                        </button>
                    </div>
                    <div className="h-8 w-px bg-white/10 mx-2" />
                    <button className="btn-secondary flex items-center gap-2">
                        <Database size={16} /> PgVector Sync
                    </button>
                </div>
            </div>

            {/* Filter & Search Bar */}
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-surface/40 p-2 rounded-2xl border border-white/5 backdrop-blur-sm shrink-0">
                <div className="flex items-center flex-1 gap-2 w-full overflow-x-auto custom-scrollbar pb-1 md:pb-0">
                    {['all', 'person', 'project', 'topic', 'file', 'event', 'decision', 'organization'].map(type => (
                        <button
                            key={type}
                            onClick={() => setTypeFilter(type)}
                            className={`flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all whitespace-nowrap capitalize ${typeFilter === type
                                ? 'bg-neon/10 text-neon border border-neon/20 shadow-[0_0_10px_rgba(209,255,0,0.1)]'
                                : 'text-textSecondary hover:text-white hover:bg-white/5 border border-transparent'
                                }`}
                        >
                            {typeFilter === type && <Filter size={14} />} {type}
                        </button>
                    ))}
                </div>

                <div className="relative group w-full md:w-80 shrink-0">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Search className="h-4 w-4 text-textSecondary group-focus-within:text-neon transition-colors" />
                    </div>
                    <input
                        type="text"
                        placeholder="Search semantic memory..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full bg-background/50 border border-white/10 rounded-xl pl-10 pr-4 py-2 text-sm text-white placeholder-textSecondary/50 focus:outline-none focus:border-neon/50 focus:ring-1 focus:ring-neon/50 transition-all font-mono"
                    />
                </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-h-0 glass-card bg-surface/30 border-white/5 overflow-hidden rounded-2xl flex relative">

                {activeView === 'list' && (
                    <div className="w-full h-full overflow-y-auto custom-scrollbar p-6 space-y-4">
                        {filteredEntities.map(entity => {
                            const relatedCount = relations.filter(r => r.source_id === entity.id || r.target_id === entity.id).length

                            return (
                                <div key={entity.id} className="group relative flex gap-6 p-5 rounded-2xl bg-background/50 border border-white/5 hover:border-white/10 hover:bg-surface/50 transition-all items-center">
                                    <EntityIcon type={entity.type} />

                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center justify-between mb-1">
                                            <div className="flex items-center gap-3">
                                                <h3 className="text-base font-semibold text-white truncate">{entity.name}</h3>
                                                <span className="text-[10px] text-textSecondary uppercase tracking-widest border border-white/10 px-2 py-0.5 rounded-full bg-white/5">{entity.type}</span>
                                            </div>
                                            <div className="flex items-center gap-4">
                                                <span className="text-xs text-textSecondary hidden md:inline-flex items-center gap-1.5">
                                                    <Network size={12} /> {relatedCount} edge{relatedCount !== 1 ? 's' : ''}
                                                </span>
                                                <ImportanceBadge score={entity.importance_score} />
                                                <button className="text-textSecondary hover:text-white opacity-0 group-hover:opacity-100 transition-opacity">
                                                    <ExternalLink size={16} />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-textSecondary truncate max-w-3xl">
                                            {entity.summary}
                                        </p>
                                    </div>
                                </div>
                            )
                        })}
                        {filteredEntities.length === 0 && (
                            <div className="h-full flex flex-col items-center justify-center text-textSecondary opacity-50 space-y-4 pt-20">
                                <Search size={48} className="text-textSecondary" />
                                <p className="text-sm">No semantic entities found matching query.</p>
                            </div>
                        )}
                    </div>
                )}

                {activeView === 'graph' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
                        <Network size={64} className="text-neon/20 mb-6 animate-pulse" />
                        <h3 className="text-xl font-medium text-white mb-2">Knowledge Graph View</h3>
                        <p className="text-textSecondary max-w-md text-center text-sm leading-relaxed">
                            Visual force-directed graph rendering of the PgVector relational database requires the WebGL canvas module.
                            <br /><br />
                            <span className="text-neon/80 border border-neon/20 bg-neon/5 px-4 py-2 rounded-lg inline-block mt-2">
                                Run `npm install react-force-graph-2d` to enable this view layer.
                            </span>
                        </p>
                    </div>
                )}

                {activeView === 'timeline' && (
                    <div className="w-full h-full flex flex-col items-center justify-center relative p-8">
                        <Clock size={64} className="text-cyan-400/20 mb-6 animate-pulse" />
                        <h3 className="text-xl font-medium text-white mb-2">Temporal View</h3>
                        <p className="text-textSecondary max-w-md text-center text-sm leading-relaxed">
                            Chronological rendering of entity extraction and memory synthesis. Shows when agents first created or last accessed semantic clumps.
                        </p>
                    </div>
                )}

            </div>
        </div>
    )
}
