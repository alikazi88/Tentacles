import { useState } from 'react'
import { X, Globe, Plus, Box, Check, Loader2, AlertCircle } from 'lucide-react'
import { useModelStore } from '../../store/modelStore'

interface AddModelModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddModelModal({ isOpen, onClose }: AddModelModalProps) {
    const { addModel } = useModelStore()
    const [activeType, setActiveType] = useState<'local' | 'cloud'>('local')
    const [isPulling, setIsPulling] = useState(false)
    const [modelName, setModelName] = useState('')
    const [error, setError] = useState<string | null>(null)

    if (!isOpen) return null

    const handlePullModel = async () => {
        if (!modelName.trim()) return

        setIsPulling(true)
        setError(null)

        // Simulate Ollama Pull
        try {
            await new Promise(r => setTimeout(r, 2000))

            addModel({
                id: modelName.toLowerCase(),
                name: modelName,
                provider: 'ollama',
                is_active: true,
                is_local: true,
                context_window: 8192,
                capabilities: ['chat', 'general'],
                api_key_configured: true,
                latency_ms: 150
            })

            onClose()
            setModelName('')
        } catch (e) {
            setError('Failed to pull model. Ensure Ollama is running.')
        } finally {
            setIsPulling(false)
        }
    }

    return (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-xl bg-surface/90 border border-white/10 rounded-2xl shadow-2xl overflow-hidden flex flex-col">

                {/* Header */}
                <div className="p-6 border-b border-white/5 flex items-center justify-between">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Plus className="text-neon" size={20} /> Add New Model
                        </h2>
                        <p className="text-sm text-textSecondary mt-1">Register local instances or cloud API providers.</p>
                    </div>
                    <button onClick={onClose} className="p-2 text-textSecondary hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Switcher */}
                <div className="px-6 pt-6">
                    <div className="flex bg-background/50 p-1 rounded-xl border border-white/5">
                        <button
                            onClick={() => setActiveType('local')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeType === 'local' ? 'bg-white/10 text-white shadow-sm' : 'text-textSecondary hover:text-white'}`}
                        >
                            <Box size={16} /> Ollama (Local)
                        </button>
                        <button
                            onClick={() => setActiveType('cloud')}
                            className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-sm font-medium transition-all ${activeType === 'cloud' ? 'bg-white/10 text-white shadow-sm' : 'text-textSecondary hover:text-white'}`}
                        >
                            <Globe size={16} /> API Provider
                        </button>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {activeType === 'local' ? (
                        <div className="space-y-4">
                            <div className="space-y-2">
                                <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">Model Tag (from Ollama Hub)</label>
                                <div className="relative">
                                    <input
                                        type="text"
                                        value={modelName}
                                        onChange={(e) => setModelName(e.target.value)}
                                        placeholder="e.g. qwen3:8b, mistral, llama3"
                                        className="w-full bg-background border border-white/10 rounded-xl px-4 py-3 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon transition-all outline-none"
                                    />
                                    <div className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] text-textSecondary bg-white/5 px-2 py-1 rounded border border-white/5">
                                        ollama pull
                                    </div>
                                </div>
                                <p className="text-[10px] text-textSecondary/60 italic">Note: Make sure the Ollama desktop app is running in the background.</p>
                            </div>

                            {error && (
                                <div className="flex items-center gap-2 p-3 rounded-lg bg-red-400/10 border border-red-400/20 text-red-400 text-xs">
                                    <AlertCircle size={14} /> {error}
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-3 pb-2">
                                {['qwen3:8b', 'deepseek-r1:7b', 'llama3:latest', 'phi3'].map(tag => (
                                    <button
                                        key={tag}
                                        onClick={() => setModelName(tag)}
                                        className="text-left px-3 py-2 rounded-lg bg-white/5 border border-white/5 text-[11px] text-textSecondary hover:text-white hover:border-white/10 transition-all"
                                    >
                                        {tag}
                                    </button>
                                ))}
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center justify-center py-8 text-center space-y-4">
                            <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-textSecondary border border-white/5">
                                <Globe size={24} />
                            </div>
                            <div className="space-y-1">
                                <h4 className="text-white font-medium">Cloud Providers coming soon</h4>
                                <p className="text-xs text-textSecondary max-w-[240px]">We are currently finalizing the secure API vault for Phase 5.1.</p>
                            </div>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-white/5 bg-surface/50 flex justify-end gap-3">
                    <button onClick={onClose} className="btn-secondary">Cancel</button>
                    {activeType === 'local' && (
                        <button
                            onClick={handlePullModel}
                            disabled={!modelName.trim() || isPulling}
                            className="btn-primary flex items-center gap-2 min-w-[120px] justify-center"
                        >
                            {isPulling ? (
                                <>
                                    <Loader2 size={16} className="animate-spin" /> Pulling...
                                </>
                            ) : (
                                <>
                                    <Check size={16} /> Register Model
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    )
}
