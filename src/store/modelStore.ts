import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export type ModelProvider = 'ollama' | 'openai' | 'anthropic' | 'custom'

export interface Model {
    id: string
    name: string
    provider: ModelProvider
    is_active: boolean
    is_local: boolean
    context_window: number
    capabilities: string[]
    endpoint?: string
    api_key_configured: boolean
    latency_ms?: number
}

export interface RoutingRule {
    id: string
    name: string
    condition: string // e.g., "task == 'coding'" or "tokens > 8000"
    primary_model_id: string
    fallback_model_id?: string
    is_active: boolean
}

interface ModelState {
    models: Model[]
    routingRules: RoutingRule[]
    activeTab: 'registry' | 'routing'
    isLoading: boolean
    fetchModels: () => Promise<void>
    setActiveTab: (tab: 'registry' | 'routing') => void
    toggleModelActive: (id: string, active: boolean) => Promise<void>
    toggleRuleActive: (id: string, active: boolean) => Promise<void>
    addModel: (model: Partial<Model>) => Promise<void>
    addRoutingRule: (rule: Partial<RoutingRule>) => Promise<void>
    deleteRoutingRule: (id: string) => Promise<void>
    addProvider: (provider: any) => void // Placeholder for now
}



export const useModelStore = create<ModelState>((set) => ({
    models: [],
    routingRules: [],
    activeTab: 'registry',
    isLoading: false,

    fetchModels: async () => {
        set({ isLoading: true })
        const [modelsRes, rulesRes] = await Promise.all([
            supabase.from('models').select('*').order('created_at', { ascending: false }),
            supabase.from('routing_rules').select('*').order('created_at', { ascending: false })
        ])

        if (modelsRes.error) console.error('Error fetching models:', modelsRes.error)
        if (rulesRes.error) console.error('Error fetching rules:', rulesRes.error)

        set({
            models: modelsRes.data || [],
            routingRules: rulesRes.data || [],
            isLoading: false
        })
    },

    setActiveTab: (tab) => set({ activeTab: tab }),

    toggleModelActive: async (id, active) => {
        const { error } = await supabase
            .from('models')
            .update({ is_active: active })
            .eq('id', id)

        if (error) {
            console.error('Error toggling model active state:', error)
            return
        }

        set(state => ({
            models: state.models.map(m => m.id === id ? { ...m, is_active: active } : m)
        }))
    },

    toggleRuleActive: async (id, active) => {
        const { error } = await supabase
            .from('routing_rules')
            .update({ is_active: active })
            .eq('id', id)

        if (error) {
            console.error('Error toggling rule active state:', error)
            return
        }

        set(state => ({
            routingRules: state.routingRules.map(r => r.id === id ? { ...r, is_active: active } : r)
        }))
    },

    addModel: async (model) => {
        const { data: { user } } = await supabase.auth.getUser()

        const newModel = {
            name: model.name || 'New Model',
            provider: model.provider || 'ollama',
            is_active: true,
            is_local: model.is_local ?? true,
            context_window: model.context_window || 4096,
            capabilities: model.capabilities || [],
            endpoint: model.endpoint,
            api_key_configured: model.api_key_configured || false,
            user_id: user?.id
        }

        const { data, error } = await supabase
            .from('models')
            .insert([newModel])
            .select()
            .single()

        if (error) {
            console.error('Error adding model:', error)
            return
        }

        set(state => ({
            models: [data, ...state.models]
        }))
    },

    addRoutingRule: async (rule) => {
        const { data: { user } } = await supabase.auth.getUser()

        const newRule = {
            name: rule.name || 'New Rule',
            condition: rule.condition || "task == 'general'",
            primary_model_id: rule.primary_model_id,
            fallback_model_id: rule.fallback_model_id,
            is_active: true,
            user_id: user?.id
        }

        const { data, error } = await supabase
            .from('routing_rules')
            .insert([newRule])
            .select()
            .single()

        if (error) {
            console.error('Error adding routing rule:', error)
            return
        }

        set(state => ({
            routingRules: [data, ...state.routingRules]
        }))
    },

    deleteRoutingRule: async (id) => {
        const { error } = await supabase
            .from('routing_rules')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting routing rule:', error)
            return
        }

        set(state => ({
            routingRules: state.routingRules.filter(r => r.id !== id)
        }))
    },

    addProvider: (provider) => {
        console.log('Adding provider:', provider)
    }
}))
