import { useState, useEffect } from 'react'
import { X, Save, Trash2, Cpu, Wrench, Settings2, Image as ImageIcon } from 'lucide-react'
import { useAgentStore } from '../../store/agentStore'
import type { Agent } from '../../store/agentStore'

interface AgentConfigModalProps {
    agent: Agent | null
    isOpen: boolean
    onClose: () => void
}

const AVAILABLE_MODELS = [
    { id: 'llama3:latest', name: 'Llama 3 8B (Local)' },
    { id: 'codellama:13b', name: 'CodeLlama 13B (Local)' },
    { id: 'mistral:latest', name: 'Mistral 7B (Local)' },
    { id: 'gpt-4o', name: 'GPT-4o (Cloud)' },
    { id: 'claude-3-5', name: 'Claude 3.5 Sonnet (Cloud)' },
]

const AVAILABLE_SKILLS = [
    { id: 'web_search', name: 'Web Search', icon: '🌐' },
    { id: 'file_ops', name: 'File Operations', icon: '📁' },
    { id: 'terminal_exec', name: 'Terminal Execution', icon: '💻' },
    { id: 'document_parse', name: 'Document Parser', icon: '📄' },
    { id: 'memory_query', name: 'Memory Query', icon: '🧠' },
]

export function AgentConfigModal({ agent, isOpen, onClose }: AgentConfigModalProps) {
    const { updateAgent, addAgent, deleteAgent } = useAgentStore()
    const isNew = !agent

    // Local form state
    const [formData, setFormData] = useState<Partial<Agent>>({})

    useEffect(() => {
        if (isOpen && agent) {
            setFormData(agent)
        } else if (isOpen && !agent) {
            setFormData({
                name: '',
                description: '',
                agent_type: 'custom',
                system_prompt: '',
                model: 'llama3:latest',
                temperature: 0.7,
                skills: [],
                is_active: true,
                is_default: false
            })
        }
    }, [isOpen, agent])

    if (!isOpen) return null

    const handleSave = async () => {
        if (isNew) {
            await addAgent(formData)
        } else if (agent) {
            await updateAgent(agent.id, formData)
        }
        onClose()
    }

    const handleDelete = async () => {
        if (agent && !isNew) {
            if (confirm(`Are you sure you want to delete ${agent.name}?`)) {
                await deleteAgent(agent.id)
                onClose()
            }
        }
    }

    const toggleSkill = (skillId: string) => {
        const currentSkills = formData.skills || []
        if (currentSkills.includes(skillId)) {
            setFormData({ ...formData, skills: currentSkills.filter(id => id !== skillId) })
        } else {
            setFormData({ ...formData, skills: [...currentSkills, skillId] })
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />

            {/* Modal */}
            <div className="relative w-full max-w-3xl bg-surface/90 border border-borderLight rounded-2xl shadow-2xl overflow-hidden flex flex-col max-h-[90vh]">

                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-borderLight bg-surface/50">
                    <div>
                        <h2 className="text-xl font-bold text-white flex items-center gap-2">
                            <Settings2 className="text-neon" size={20} />
                            {isNew ? 'Create New Agent' : `Configure ${agent?.name}`}
                        </h2>
                        <p className="text-sm text-textSecondary mt-1">
                            Fine-tune behavior, attach tools, and configure LLM parameters.
                        </p>
                    </div>
                    <button onClick={onClose} className="p-2 text-textSecondary hover:text-white rounded-lg hover:bg-white/10 transition-colors">
                        <X size={20} />
                    </button>
                </div>

                {/* Body - Scrollable */}
                <div className="p-6 overflow-y-auto custom-scrollbar flex-1 space-y-8">

                    {/* Basic Info */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2">
                            <ImageIcon size={16} className="text-textSecondary" /> Basic Details
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">Agent Name</label>
                                <input
                                    type="text"
                                    value={formData.name || ''}
                                    onChange={e => setFormData({ ...formData, name: e.target.value })}
                                    placeholder="e.g. Data Analyst"
                                    className="w-full bg-background border border-borderLight rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon transition-all outline-none"
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">Role / Type</label>
                                <select
                                    value={formData.agent_type || 'custom'}
                                    onChange={e => setFormData({ ...formData, agent_type: e.target.value as any })}
                                    className="w-full bg-background border border-borderLight rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon transition-all outline-none appearance-none"
                                >
                                    <option value="generalist">Generalist</option>
                                    <option value="coder">Coder</option>
                                    <option value="researcher">Researcher</option>
                                    <option value="writer">Writer</option>
                                    <option value="analyst">Analyst</option>
                                    <option value="planner">Planner</option>
                                    <option value="custom">Custom Role</option>
                                </select>
                            </div>
                            <div className="space-y-2 md:col-span-2">
                                <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">Short Description</label>
                                <input
                                    type="text"
                                    value={formData.description || ''}
                                    onChange={e => setFormData({ ...formData, description: e.target.value })}
                                    placeholder="Brief summary of what this agent does..."
                                    className="w-full bg-background border border-borderLight rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon transition-all outline-none"
                                />
                            </div>
                        </div>
                    </div>

                    {/* LLM Config */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-t border-borderLight pt-6">
                            <Cpu size={16} className="text-textSecondary" /> Model Configuration
                        </h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div className="space-y-2">
                                <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">Primary Model</label>
                                <select
                                    value={formData.model || 'llama3:latest'}
                                    onChange={e => setFormData({ ...formData, model: e.target.value })}
                                    className="w-full bg-background border border-borderLight rounded-lg px-4 py-2.5 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon transition-all outline-none appearance-none"
                                >
                                    {AVAILABLE_MODELS.map(m => (
                                        <option key={m.id} value={m.id}>{m.name}</option>
                                    ))}
                                </select>
                            </div>
                            <div className="space-y-2">
                                <div className="flex justify-between">
                                    <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">Temperature</label>
                                    <span className="text-[11px] text-neon font-mono">{formData.temperature?.toFixed(1) || '0.7'}</span>
                                </div>
                                <input
                                    type="range"
                                    min="0" max="2" step="0.1"
                                    value={formData.temperature || 0.7}
                                    onChange={e => setFormData({ ...formData, temperature: parseFloat(e.target.value) })}
                                    className="w-full accent-neon h-2 bg-background rounded-lg appearance-none cursor-pointer"
                                />
                                <div className="flex justify-between text-[10px] text-textSecondary">
                                    <span>Precise</span>
                                    <span>Creative</span>
                                </div>
                            </div>
                        </div>
                        <div className="space-y-2 pt-2">
                            <label className="text-[11px] text-textSecondary uppercase tracking-wider font-medium">System Prompt</label>
                            <textarea
                                value={formData.system_prompt || ''}
                                onChange={e => setFormData({ ...formData, system_prompt: e.target.value })}
                                placeholder="You are a helpful AI assistant specialized in..."
                                rows={4}
                                className="w-full bg-background border border-borderLight rounded-lg px-4 py-3 text-sm text-white focus:border-neon focus:ring-1 focus:ring-neon transition-all outline-none resize-none custom-scrollbar font-mono leading-relaxed"
                            />
                        </div>
                    </div>

                    {/* Skills Config */}
                    <div className="space-y-4">
                        <h3 className="text-sm font-semibold text-white uppercase tracking-wider flex items-center gap-2 border-t border-borderLight pt-6">
                            <Wrench size={16} className="text-textSecondary" /> Attached Skills
                        </h3>
                        <p className="text-[11px] text-textSecondary mb-2">Select which WASM tools this agent has permission to execute.</p>
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                            {AVAILABLE_SKILLS.map(skill => {
                                const isSelected = (formData.skills || []).includes(skill.id)
                                return (
                                    <button
                                        key={skill.id}
                                        onClick={() => toggleSkill(skill.id)}
                                        className={`flex items-center gap-2.5 p-3 rounded-xl border text-left transition-all ${isSelected
                                            ? 'bg-neon/10 border-neon/50 shadow-[0_0_10px_rgba(209,255,0,0.1)]'
                                            : 'bg-background border-borderLight hover:border-white/20'
                                            }`}
                                    >
                                        <span className="text-lg">{skill.icon}</span>
                                        <span className={`text-sm font-medium ${isSelected ? 'text-white' : 'text-textSecondary'}`}>
                                            {skill.name}
                                        </span>
                                    </button>
                                )
                            })}
                        </div>
                    </div>
                </div>

                {/* Footer */}
                <div className="p-6 border-t border-borderLight bg-surface/50 flex items-center justify-between">
                    {!isNew && !formData.is_default ? (
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-2 text-red-400 hover:text-red-300 hover:bg-red-400/10 px-4 py-2 rounded-lg transition-colors text-sm font-medium"
                        >
                            <Trash2 size={16} /> Delete Agent
                        </button>
                    ) : (
                        <div /> // Spacer
                    )}

                    <div className="flex items-center gap-3">
                        <button
                            onClick={onClose}
                            className="btn-secondary"
                        >
                            Cancel
                        </button>
                        <button
                            onClick={handleSave}
                            disabled={!formData.name}
                            className="btn-primary flex items-center gap-2"
                        >
                            <Save size={16} /> Save Agent
                        </button>
                    </div>
                </div>

            </div>
        </div>
    )
}
