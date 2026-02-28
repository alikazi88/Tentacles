import { create } from 'zustand'
import { supabase } from '../lib/supabase'

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



export const useAgentStore = create<AgentState>((set, get) => ({
    agents: [],
    isLoading: false,
    fetchAgents: async () => {
        set({ isLoading: true })
        const { data, error } = await supabase
            .from('agents')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching agents:', error)
            set({ isLoading: false })
            return
        }

        const formattedAgents: Agent[] = (data || []).map(a => ({
            id: a.id,
            name: a.name,
            description: a.description || '',
            avatar_url: a.avatar_url,
            agent_type: a.agent_type as AgentType,
            is_active: a.is_active,
            is_default: a.is_default,
            system_prompt: a.system_prompt,
            model: a.model_config?.model,
            temperature: a.model_config?.temperature,
            skills: [] // Future: Join with agent_skills table
        }))

        set({ agents: formattedAgents, isLoading: false })
    },
    toggleAgentActive: async (id, active) => {
        const { error } = await supabase
            .from('agents')
            .update({ is_active: active })
            .eq('id', id)

        if (error) {
            console.error('Error toggling agent active state:', error)
            return
        }

        set((state) => ({
            agents: state.agents.map((a) => (a.id === id ? { ...a, is_active: active } : a))
        }))
    },
    addAgent: async (agent) => {
        const { data: { user } } = await supabase.auth.getUser()

        const newAgentData = {
            name: agent.name || 'New Agent',
            description: agent.description || '',
            agent_type: agent.agent_type || 'custom',
            is_active: true,
            is_default: false,
            system_prompt: agent.system_prompt || '',
            model_config: {
                model: agent.model || 'qwen3:8b',
                temperature: agent.temperature || 0.7
            },
            user_id: user?.id || null
        }

        const { data, error } = await supabase
            .from('agents')
            .insert([newAgentData])
            .select()
            .single()

        if (error) {
            console.error('Error adding agent:', error)
            return
        }

        const addedAgent: Agent = {
            id: data.id,
            name: data.name,
            description: data.description,
            agent_type: data.agent_type as AgentType,
            is_active: data.is_active,
            is_default: data.is_default,
            system_prompt: data.system_prompt,
            model: data.model_config?.model,
            temperature: data.model_config?.temperature,
            skills: []
        }

        set((state) => ({
            agents: [addedAgent, ...state.agents]
        }))
    },
    updateAgent: async (id, updates) => {
        const dbUpdates: any = { ...updates }
        if (updates.model || updates.temperature) {
            const currentAgent = get().agents.find(a => a.id === id)
            dbUpdates.model_config = {
                model: updates.model || currentAgent?.model || 'qwen3:8b',
                temperature: updates.temperature ?? currentAgent?.temperature ?? 0.7
            }
            delete dbUpdates.model
            delete dbUpdates.temperature
        }

        const { error } = await supabase
            .from('agents')
            .update(dbUpdates)
            .eq('id', id)

        if (error) {
            console.error('Error updating agent:', error)
            return
        }

        set((state) => ({
            agents: state.agents.map(a => a.id === id ? { ...a, ...updates } : a)
        }))
    },
    deleteAgent: async (id) => {
        const { error } = await supabase
            .from('agents')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting agent:', error)
            return
        }

        set((state) => ({
            agents: state.agents.filter(a => a.id !== id)
        }))
    }
}))
