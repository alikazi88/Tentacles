import { useState } from 'react'
import { X, GitBranch, Shield, Zap, Info } from 'lucide-react'
import { useModelStore } from '../../store/modelStore'
import { toast } from 'react-hot-toast'

interface AddRoutingRuleModalProps {
    isOpen: boolean
    onClose: () => void
}

export function AddRoutingRuleModal({ isOpen, onClose }: AddRoutingRuleModalProps) {
    const { models, addRoutingRule } = useModelStore()
    const [name, setName] = useState('')
    const [condition, setCondition] = useState("task == 'general'")
    const [primaryModelId, setPrimaryModelId] = useState('')
    const [fallbackModelId, setFallbackModelId] = useState('')
    const [isSubmitting, setIsSubmitting] = useState(false)

    if (!isOpen) return null

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!name || !primaryModelId) {
            toast.error('Please fill in all required fields')
            return
        }

        setIsSubmitting(true)
        try {
            await addRoutingRule({
                name,
                condition,
                primary_model_id: primaryModelId,
                fallback_model_id: fallbackModelId || undefined,
                is_active: true
            })
            toast.success('Routing rule added successfully')
            onClose()
            setName('')
            setPrimaryModelId('')
            setFallbackModelId('')
        } catch (error) {
            toast.error('Failed to add routing rule')
        } finally {
            setIsSubmitting(false)
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div className="glass-card w-full max-w-lg overflow-hidden border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                {/* Header */}
                <div className="relative p-6 border-b border-white/5 bg-gradient-to-br from-white/5 to-transparent">
                    <button
                        onClick={onClose}
                        className="absolute right-4 top-4 p-2 text-textSecondary hover:text-white hover:bg-white/5 rounded-lg transition-all"
                    >
                        <X size={20} />
                    </button>

                    <div className="flex items-center gap-3 mb-1">
                        <div className="p-2 rounded-lg bg-neon/10 border border-neon/20">
                            <GitBranch size={20} className="text-neon" />
                        </div>
                        <h2 className="text-xl font-bold text-white">New Routing Rule</h2>
                    </div>
                    <p className="text-textSecondary text-sm ml-11">
                        Define how tasks are allocated to specific models.
                    </p>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-6">
                    {/* Rule Name (Task Key) */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider flex items-center gap-2">
                            Rule Name (Task Intent)
                            <div className="group relative">
                                <Info size={12} className="cursor-help opacity-50" />
                                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 p-2 bg-background border border-borderLight rounded text-[10px] lowercase leading-tight opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-10">
                                    use 'coding', 'research', or 'general' to match the backend classifier.
                                </div>
                            </div>
                        </label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g., coding"
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-textSecondary/30 focus:outline-none focus:border-neon/50 transition-all font-mono text-sm"
                            required
                        />
                    </div>

                    {/* Condition */}
                    <div className="space-y-2">
                        <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider">Logic Condition</label>
                        <input
                            type="text"
                            value={condition}
                            onChange={(e) => setCondition(e.target.value)}
                            className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-cyan-400 font-mono text-sm focus:outline-none focus:border-cyan-500/50"
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Primary Model */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider flex items-center gap-2">
                                <Shield size={12} className="text-emerald-400" /> Primary Model
                            </label>
                            <select
                                value={primaryModelId}
                                onChange={(e) => setPrimaryModelId(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-emerald-500/50 appearance-none text-sm"
                                required
                            >
                                <option value="">Select model...</option>
                                {models.filter(m => m.is_active).map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>

                        {/* Fallback Model */}
                        <div className="space-y-2">
                            <label className="text-xs font-semibold text-textSecondary uppercase tracking-wider flex items-center gap-2">
                                <Zap size={12} className="text-yellow-500" /> Fallback (Optional)
                            </label>
                            <select
                                value={fallbackModelId}
                                onChange={(e) => setFallbackModelId(e.target.value)}
                                className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-yellow-500/50 appearance-none text-sm"
                            >
                                <option value="">None</option>
                                {models.filter(m => m.is_active && m.id !== primaryModelId).map(m => (
                                    <option key={m.id} value={m.id}>{m.name}</option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {/* Footer Actions */}
                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 px-4 rounded-xl border border-white/5 bg-white/5 text-textSecondary font-semibold hover:bg-white/10 transition-all text-sm"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={isSubmitting}
                            className={`flex-[2] py-3 px-4 rounded-xl bg-neon text-black font-bold hover:shadow-[0_0_20px_rgba(209,255,0,0.3)] transition-all flex items-center justify-center gap-2 text-sm ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            {isSubmitting ? 'Creating...' : 'Create Rule'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
