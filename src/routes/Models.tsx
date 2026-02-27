import { useState } from 'react'
import { Cpu, Server, Box, Globe, Settings2, Plus, AlertCircle, Signal, Shield, CheckCircle2, Zap, GitBranch } from 'lucide-react'
import { useModelStore, type ModelProvider } from '../store/modelStore'
import { AddModelModal } from '../components/models/AddModelModal'

const ProviderIcon = ({ provider }: { provider: ModelProvider }) => {
    switch (provider) {
        case 'ollama': return <Box size={16} />
        case 'openai': return <Globe size={16} />
        case 'anthropic': return <Globe size={16} />
        case 'custom': return <Server size={16} />
    }
}

const ProviderBadgeColor = (provider: ModelProvider) => {
    switch (provider) {
        case 'ollama': return 'bg-cyan-500/10 text-cyan-400 border-cyan-500/20'
        case 'openai': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
        case 'anthropic': return 'bg-orange-500/10 text-orange-400 border-orange-500/20'
        case 'custom': return 'bg-white/5 text-textSecondary border-white/10'
    }
}

export function Models() {
    const {
        models,
        routingRules,
        activeTab,
        setActiveTab,
        toggleModelActive,
        toggleRuleActive
    } = useModelStore()

    const [isAddModalOpen, setIsAddModalOpen] = useState(false)

    const localModels = models.filter(m => m.is_local)
    const remoteModels = models.filter(m => !m.is_local)

    return (
        <div className="space-y-8 max-w-[1600px] mx-auto pb-12">

            {/* Header Content */}
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                        Model Router
                    </h2>
                    <p className="text-textSecondary mt-2 leading-relaxed max-w-2xl">
                        — Manage local Ollama instances, external API keys, and configure intelligent task routing matrices.
                    </p>
                </div>

                <div className="flex bg-surface/50 p-1 rounded-xl border border-white/5 backdrop-blur-sm">
                    <button
                        onClick={() => setActiveTab('registry')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'registry'
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'text-textSecondary hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <Cpu size={16} /> Registry
                    </button>
                    <button
                        onClick={() => setActiveTab('routing')}
                        className={`flex items-center gap-2 px-6 py-2 rounded-lg text-sm font-medium transition-all ${activeTab === 'routing'
                            ? 'bg-white/10 text-white shadow-sm'
                            : 'text-textSecondary hover:text-white hover:bg-white/5'
                            }`}
                    >
                        <GitBranch size={16} /> Rules & Fallbacks
                    </button>
                </div>
            </div>

            {/* TAB: REGISTRY */}
            {activeTab === 'registry' && (
                <div className="space-y-8">
                    {/* Local Cluster Grid */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Server size={20} className="text-neon" /> Local Cluster (Ollama)
                            </h3>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="text-xs font-medium text-neon hover:text-neon/80 bg-neon/10 hover:bg-neon/20 px-3 py-1.5 rounded-lg border border-neon/20 transition-colors flex items-center gap-2"
                            >
                                <Plus size={14} /> Pull Model
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {localModels.map(model => (
                                <div key={model.id} className={`glass-card p-6 flex flex-col transition-all duration-300 ${model.is_active ? 'border-neon/20 shadow-[0_4px_20px_rgba(209,255,0,0.05)]' : 'border-white/5 opacity-70 grayscale-[30%]'}`}>

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                                                {model.name}
                                                {model.latency_ms && model.latency_ms < 200 && (
                                                    <div title="High speed inference">
                                                        <Zap size={14} className="text-yellow-400" />
                                                    </div>
                                                )}
                                            </h4>
                                            <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border flex w-fit items-center gap-1.5 ${ProviderBadgeColor(model.provider)}`}>
                                                <ProviderIcon provider={model.provider} /> {model.provider}
                                            </span>
                                        </div>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" checked={model.is_active} onChange={(e) => toggleModelActive(model.id, e.target.checked)} />
                                            <div className="w-9 h-5 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-textSecondary peer-checked:after:bg-black after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-neon shadow-inner border border-white/10"></div>
                                        </label>
                                    </div>

                                    <div className="grid grid-cols-2 gap-4 mb-5 flex-1">
                                        <div className="bg-surface/50 border border-white/5 rounded-xl p-3">
                                            <div className="text-[10px] text-textSecondary uppercase tracking-wider mb-1">Context Window</div>
                                            <div className="text-sm font-semibold text-white font-mono">{model.context_window / 1000}k tokens</div>
                                        </div>
                                        <div className="bg-surface/50 border border-white/5 rounded-xl p-3">
                                            <div className="text-[10px] text-textSecondary uppercase tracking-wider mb-1">Local Latency</div>
                                            <div className="text-sm font-semibold text-white font-mono flex items-center gap-1.5">
                                                <Signal size={12} className="text-emerald-400" /> {model.latency_ms}ms
                                            </div>
                                        </div>
                                    </div>

                                    <div className="flex flex-wrap gap-2 text-[10px] font-medium uppercase tracking-wider">
                                        {model.capabilities.map(cap => (
                                            <span key={cap} className="px-2 py-1 rounded bg-white/5 text-textSecondary border border-white/5">
                                                {cap}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className="h-px bg-white/5" />

                    {/* External APIs Grid */}
                    <div className="space-y-4">
                        <div className="flex items-center justify-between">
                            <h3 className="text-lg font-semibold text-white flex items-center gap-2">
                                <Globe size={20} className="text-cyan-400" /> Cloud Ecosystem
                            </h3>
                            <button
                                onClick={() => setIsAddModalOpen(true)}
                                className="text-xs font-medium text-textSecondary hover:text-white bg-surface hover:bg-white/5 px-3 py-1.5 rounded-lg border border-white/10 transition-colors flex items-center gap-2"
                            >
                                <Settings2 size={14} /> Add Provider
                            </button>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {remoteModels.map(model => (
                                <div key={model.id} className="glass-card bg-surface/20 border-white/5 p-6 flex flex-col relative group">

                                    <div className="flex justify-between items-start mb-4">
                                        <div>
                                            <h4 className="text-lg font-bold text-white mb-1">{model.name}</h4>
                                            <span className={`text-[10px] uppercase font-mono px-2 py-0.5 rounded border flex w-fit items-center gap-1.5 ${ProviderBadgeColor(model.provider)}`}>
                                                <ProviderIcon provider={model.provider} /> {model.provider}
                                            </span>
                                        </div>

                                        {!model.api_key_configured ? (
                                            <Shield size={20} className="text-yellow-500/50" />
                                        ) : (
                                            <label className="relative inline-flex items-center cursor-pointer">
                                                <input type="checkbox" className="sr-only peer" checked={model.is_active} onChange={(e) => toggleModelActive(model.id, e.target.checked)} />
                                                <div className="w-9 h-5 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-textSecondary peer-checked:after:bg-black after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-cyan-400 shadow-inner border border-white/10"></div>
                                            </label>
                                        )}
                                    </div>

                                    <div className="bg-surface/50 border border-white/5 rounded-xl p-3 mb-5 mt-auto">
                                        <div className="text-[10px] text-textSecondary uppercase tracking-wider mb-1 flex items-center justify-between">
                                            Max Context
                                            <span className="text-xs font-semibold text-white font-mono">{model.context_window / 1000}k</span>
                                        </div>
                                        <div className="w-full bg-background rounded-full h-1 mt-2">
                                            <div className="bg-gradient-to-r from-cyan-500 to-emerald-400 h-1 rounded-full" style={{ width: Math.min((model.context_window / 200000) * 100, 100) + '%' }}></div>
                                        </div>
                                    </div>

                                    {!model.api_key_configured ? (
                                        <button className="w-full py-2.5 rounded-xl bg-yellow-500/10 border border-yellow-500/20 text-yellow-500/90 text-sm font-medium hover:bg-yellow-500/20 transition-all flex items-center justify-center gap-2">
                                            <AlertCircle size={16} /> Configure API Key
                                        </button>
                                    ) : (
                                        <button className="w-full py-2.5 rounded-xl bg-surface/50 border border-white/5 text-textSecondary text-sm font-medium hover:text-white hover:bg-white/5 transition-all flex items-center justify-center gap-2">
                                            <Settings2 size={16} /> Edit Parameters
                                        </button>
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}

            {/* TAB: ROUTING RULES */}
            {activeTab === 'routing' && (
                <div className="space-y-6 max-w-4xl opacity-0 animate-[fadeIn_0.3s_ease_forwards]">
                    <div className="flex items-center justify-between mb-4">
                        <h3 className="text-lg font-semibold text-white">Execution Fallback Matrix</h3>
                        <button className="btn-primary flex items-center gap-2 text-xs py-1.5 px-3">
                            <Plus size={14} /> New Rule
                        </button>
                    </div>

                    {routingRules.map((rule, idx) => (
                        <div key={rule.id} className="glass-card p-5 bg-surface/30 border-white/5 flex items-center gap-6 relative">
                            {/* Sequence Number */}
                            <div className="absolute -left-3 -top-3 w-6 h-6 rounded-full bg-background border border-borderLight flex items-center justify-center text-xs font-mono text-textSecondary shadow-sm">
                                {idx + 1}
                            </div>

                            <div className="flex-1 space-y-3">
                                <div className="flex items-center justify-between">
                                    <h4 className="font-semibold text-white">{rule.name}</h4>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" className="sr-only peer" checked={rule.is_active} onChange={(e) => toggleRuleActive(rule.id, e.target.checked)} />
                                        <div className="w-8 h-4 bg-background peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-textSecondary peer-checked:after:bg-black after:rounded-full after:h-3 after:w-3 after:transition-all peer-checked:bg-white shadow-inner border border-white/10"></div>
                                    </label>
                                </div>

                                <div className="bg-black/30 border border-white/5 rounded-lg p-2 text-xs font-mono text-cyan-400">
                                    <span className="text-textSecondary/50 mr-2">IF</span> {rule.condition}
                                </div>

                                <div className="flex items-center gap-3 text-sm">
                                    <span className="text-textSecondary text-[10px] uppercase font-semibold tracking-wider">THEN USE</span>
                                    <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white flex items-center gap-1.5 font-medium shadow-inner">
                                        <CheckCircle2 size={12} className="text-emerald-400" /> {rule.primary_model_id}
                                    </span>

                                    {rule.fallback_model_id && (
                                        <>
                                            <span className="text-textSecondary text-[10px] uppercase font-semibold tracking-wider px-2">ELSE</span>
                                            <span className="px-2.5 py-1 rounded-md bg-white/5 border border-white/10 text-white flex items-center gap-1.5 font-medium shadow-inner opacity-80">
                                                <AlertCircle size={12} className="text-yellow-500" /> {rule.fallback_model_id}
                                            </span>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className="p-6 border border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center text-textSecondary text-sm hover:border-white/20 hover:text-white transition-all cursor-pointer bg-surface/10">
                        <Plus size={24} className="mb-2 opacity-50" />
                        Add final sweep/catch-all model rule
                    </div>
                </div>
            )}

            {/* Add Model Modal */}
            <AddModelModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    )
}
