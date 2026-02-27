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

// Temporary mock data until Supabase integration is fully wired in Phase 2
const MOCK_AGENTS: Agent[] = [
    {
        id: '1',
        name: 'Nexus Generalist',
        description: 'Versatile AI assistant capable of handling a broad range of tasks and orchestration.',
        agent_type: 'generalist',
        is_active: true,
        is_default: true,
        model: 'llama3:latest',
        temperature: 0.7,
        skills: ['web_search', 'memory_query']
    },
    {
        id: '2',
        name: 'CodeWeaver',
        description: 'Specialized in Rust, TypeScript, and architectural system design. Can execute local dev environments.',
        agent_type: 'coder',
        is_active: true,
        is_default: false,
        model: 'codellama:13b',
        temperature: 0.2,
        skills: ['file_ops', 'terminal_exec']
    },
    {
        id: '3',
        name: 'DeepSearch',
        description: 'Autonomous researcher that navigates the web, synthesizes sources, and builds comprehensive reports.',
        agent_type: 'researcher',
        is_active: false,
        is_default: false,
        model: 'mistral:latest',
        temperature: 0.5,
        skills: ['web_search', 'document_parse']
    },
    {
        id: '4',
        name: 'CipherWriter',
        description: 'Expert copywriter for technical documentation, blog posts, and persuasive communications.',
        agent_type: 'writer',
        is_active: false,
        is_default: false,
        model: 'llama3:latest',
        temperature: 0.8,
        skills: ['document_parse']
    }
]

export const useAgentStore = create<AgentState>((set) => ({
    agents: MOCK_AGENTS,
    isLoading: false,
    fetchAgents: async () => {
        // Scaffolded for Supabase fetch
        set({ isLoading: true })
        // Simulate network
        await new Promise(r => setTimeout(r, 600))
        set({ agents: MOCK_AGENTS, isLoading: false })
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
