import { create } from 'zustand'

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
    setActiveTab: (tab: 'registry' | 'routing') => void
    toggleModelActive: (id: string, active: boolean) => void
    toggleRuleActive: (id: string, active: boolean) => void
    addModel: (model: Model) => void
    addProvider: (provider: any) => void // Placeholder for now
}



export const useModelStore = create<ModelState>((set) => ({
    models: [],
    routingRules: [],
    activeTab: 'registry',

    setActiveTab: (tab) => set({ activeTab: tab }),

    toggleModelActive: (id, active) => set(state => ({
        models: state.models.map(m => m.id === id ? { ...m, is_active: active } : m)
    })),

    toggleRuleActive: (id, active) => set(state => ({
        routingRules: state.routingRules.map(r => r.id === id ? { ...r, is_active: active } : r)
    })),

    addModel: (model) => set(state => ({
        models: [...state.models, model]
    })),

    addProvider: (provider) => {
        console.log('Adding provider:', provider)
    }
}))
