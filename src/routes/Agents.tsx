import { useEffect, useState } from 'react'
import { Plus, Power, Settings2, Sparkles, TerminalSquare, BookOpen, PenTool, BrainCircuit } from 'lucide-react'
import { useAgentStore } from '../store/agentStore'
import type { Agent, AgentType } from '../store/agentStore'
import { AgentConfigModal } from '../components/agents/AgentConfigModal'

const AgentIcon = ({ type }: { type: AgentType }) => {
    switch (type) {
        case 'coder': return <TerminalSquare className="text-neon" size={24} />
        case 'researcher': return <BookOpen className="text-cyan-400" size={24} />
        case 'writer': return <PenTool className="text-coral-400" size={24} />
        case 'generalist': default: return <BrainCircuit className="text-purple-400" size={24} />
    }
}

export function Agents() {
    const { agents, fetchAgents, toggleAgentActive } = useAgentStore()
    const [searchTerm, setSearchTerm] = useState('')

    // Modal State
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null)

    const handleOpenModal = (agent?: Agent) => {
        setSelectedAgent(agent || null)
        setIsModalOpen(true)
    }

    const handleCloseModal = () => {
        setIsModalOpen(false)
        setSelectedAgent(null)
    }

    useEffect(() => {
        fetchAgents()
    }, [fetchAgents])

    const filteredAgents = agents.filter(a => a.name.toLowerCase().includes(searchTerm.toLowerCase()) || a.description.toLowerCase().includes(searchTerm.toLowerCase()))

    return (
        <div className="space-y-8 max-w-7xl mx-auto pb-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                    <h2 className="text-4xl font-bold tracking-tight text-white flex items-center gap-3">
                        Agent Command Center
                    </h2>
                    <p className="text-textSecondary mt-2 leading-relaxed">— Deploy and orchestrate your autonomous workforce.</p>
                </div>
                <div className="flex items-center gap-4">
                    <div className="relative group">
                        <input
                            type="text"
                            placeholder="Filter agents..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="bg-surface/50 border border-borderLight rounded-lg pl-4 pr-4 py-2 text-sm text-textPrimary focus:outline-none focus:border-neon focus:ring-1 focus:ring-neon transition-all w-64"
                        />
                    </div>
                    <button
                        onClick={() => handleOpenModal()}
                        className="btn-primary flex items-center gap-2"
                    >
                        <Plus size={18} /> New Agent
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredAgents.map((agent) => (
                    <div key={agent.id} className={`glass-card p-6 flex flex-col transition-all duration-300 ${agent.is_active ? 'border-neon/20 shadow-[0_4px_20px_rgba(209,255,0,0.05)]' : 'opacity-80 grayscale-[20%]'}`}>
                        <div className="flex justify-between items-start mb-4">
                            <div className="w-12 h-12 rounded-xl bg-surface border border-borderLight flex items-center justify-center shadow-inner">
                                <AgentIcon type={agent.agent_type} />
                            </div>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => toggleAgentActive(agent.id, !agent.is_active)}
                                    className={`p-2 rounded-lg transition-colors ${agent.is_active ? 'text-neon bg-neon/10 hover:bg-neon/20' : 'text-textSecondary bg-surface hover:text-white'}`}
                                    title={agent.is_active ? "Deactivate" : "Activate"}
                                >
                                    <Power size={18} />
                                </button>
                                <button
                                    onClick={() => handleOpenModal(agent)}
                                    className="p-2 rounded-lg text-textSecondary bg-surface hover:text-white transition-colors"
                                    title="Settings"
                                >
                                    <Settings2 size={18} />
                                </button>
                            </div>
                        </div>

                        <div className="flex-1">
                            <h3 className="text-xl font-semibold text-white mb-2 flex items-center gap-2">
                                {agent.name}
                                {agent.is_default && <Sparkles size={14} className="text-neon" />}
                            </h3>
                            <p className="text-sm text-textSecondary leading-relaxed line-clamp-3">
                                {agent.description}
                            </p>
                        </div>

                        <div className="mt-6 pt-4 border-t border-borderLight flex items-center justify-between">
                            <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-surface border border-borderLight text-textSecondary capitalize">
                                {agent.agent_type}
                            </span>
                            <div className="flex items-center gap-2 text-xs font-medium">
                                <span className={`w-2 h-2 rounded-full ${agent.is_active ? 'bg-neon shadow-[0_0_8px_rgba(209,255,0,0.8)]' : 'bg-textSecondary'}`}></span>
                                <span className={agent.is_active ? 'text-neon' : 'text-textSecondary'}>
                                    {agent.is_active ? 'Online' : 'Standby'}
                                </span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            <AgentConfigModal
                agent={selectedAgent}
                isOpen={isModalOpen}
                onClose={handleCloseModal}
            />
        </div>
    )
}
