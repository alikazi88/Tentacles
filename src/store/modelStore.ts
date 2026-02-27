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
}

const MOCK_MODELS: Model[] = [
    {
        id: 'llama3:latest',
        name: 'Llama 3 8B',
        provider: 'ollama',
        is_active: true,
        is_local: true,
        context_window: 8192,
        capabilities: ['chat', 'general', 'fast'],
        api_key_configured: true,
        latency_ms: 120
    },
    {
        id: 'codellama:13b',
        name: 'CodeLlama 13B',
        provider: 'ollama',
        is_active: true,
        is_local: true,
        context_window: 16384,
        capabilities: ['coding', 'reasoning'],
        api_key_configured: true,
        latency_ms: 350
    },
    {
        id: 'gpt-4o',
        name: 'GPT-4 Omni',
        provider: 'openai',
        is_active: true,
        is_local: false,
        context_window: 128000,
        capabilities: ['vision', 'complex_reasoning', 'coding'],
        api_key_configured: true,
        latency_ms: 850
    },
    {
        id: 'claude-3-5-sonnet',
        name: 'Claude 3.5 Sonnet',
        provider: 'anthropic',
        is_active: false,
        is_local: false,
        context_window: 200000,
        capabilities: ['long_context', 'coding', 'analysis'],
        api_key_configured: false
    }
]

const MOCK_RULES: RoutingRule[] = [
    {
        id: 'r1',
        name: 'Local First for Simple Tasks',
        condition: 'task_complexity < 0.4 AND required_context < 4k',
        primary_model_id: 'llama3:latest',
        is_active: true
    },
    {
        id: 'r2',
        name: 'Heavy Code Generation Fallback',
        condition: 'task_type == "code_generation" AND required_context > 8k',
        primary_model_id: 'codellama:13b',
        fallback_model_id: 'gpt-4o',
        is_active: true
    },
    {
        id: 'r3',
        name: 'Vision & Multi-modal Bypass',
        condition: 'has_image == true',
        primary_model_id: 'gpt-4o',
        is_active: true
    }
]

export const useModelStore = create<ModelState>((set) => ({
    models: MOCK_MODELS,
    routingRules: MOCK_RULES,
    activeTab: 'registry',

    setActiveTab: (tab) => set({ activeTab: tab }),

    toggleModelActive: (id, active) => set(state => ({
        models: state.models.map(m => m.id === id ? { ...m, is_active: active } : m)
    })),

    toggleRuleActive: (id, active) => set(state => ({
        routingRules: state.routingRules.map(r => r.id === id ? { ...r, is_active: active } : r)
    }))
}))
