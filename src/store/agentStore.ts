import { create } from 'zustand'

export type AgentType = 'generalist' | 'coder' | 'researcher' | 'writer' | 'analyst' | 'planner' | 'custom'

export interface Agent {
    id: string
    name: string
    description: string
    avatar_url?: string
    agent_type: AgentType
    is_active: boolean
    is_default: boolean
    system_prompt?: string
    model?: string
    temperature?: number
    skills?: string[]
}

interface AgentState {
    agents: Agent[]
    isLoading: boolean
    fetchAgents: () => Promise<void>
    toggleAgentActive: (id: string, active: boolean) => Promise<void>
    addAgent: (agent: Partial<Agent>) => Promise<void>
    updateAgent: (id: string, updates: Partial<Agent>) => Promise<void>
    deleteAgent: (id: string) => Promise<void>
}



export const useAgentStore = create<AgentState>((set) => ({
    agents: [],
    isLoading: false,
    fetchAgents: async () => {
        set({ isLoading: true })
        // Future: Fetch from Supabase
        await new Promise(r => setTimeout(r, 600))
        set({ agents: [], isLoading: false })
    },
    toggleAgentActive: async (id, active) => {
        set((state) => ({
            agents: state.agents.map((a) => (a.id === id ? { ...a, is_active: active } : a))
        }))
    },
    addAgent: async (agent) => {
        const newAgent: Agent = {
            id: Math.random().toString(36).substring(7),
            name: agent.name || 'New Agent',
            description: agent.description || '',
            agent_type: agent.agent_type || 'custom',
            is_active: true,
            is_default: false,
            model: agent.model || 'llama3:latest',
            temperature: agent.temperature || 0.7,
            skills: agent.skills || [],
            system_prompt: agent.system_prompt || ''
        }
        set((state) => ({
            agents: [...state.agents, newAgent]
        }))
    },
    updateAgent: async (id, updates) => {
        set((state) => ({
            agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
        }))
    },
    deleteAgent: async (id) => {
        set((state) => ({
            agents: state.agents.filter(a => a.id !== id)
        }))
    }
}))
