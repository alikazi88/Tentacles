import { create } from 'zustand'

export interface WorkflowNode {
    id: string
    type: 'trigger' | 'action' | 'condition' | 'agent'
    position: { x: number, y: number }
    data: {
        label: string
        description?: string
        icon?: string
        [key: string]: any
    }
}

export interface WorkflowEdge {
    id: string
    source: string
    target: string
    animated?: boolean
}

export interface Workflow {
    id: string
    name: string
    description: string
    is_active: boolean
    nodes: WorkflowNode[]
    edges: WorkflowEdge[]
    last_run?: Date
    created_at: Date
}

interface WorkflowState {
    workflows: Workflow[]
    activeWorkflowId: string | null
    setActiveWorkflow: (id: string | null) => void
    updateWorkflow: (id: string, updates: Partial<Workflow>) => void
}



export const useWorkflowStore = create<WorkflowState>((set) => ({
    workflows: [],
    activeWorkflowId: null,
    setActiveWorkflow: (id) => set({ activeWorkflowId: id }),
    updateWorkflow: (id, updates) => set((state) => ({
        workflows: state.workflows.map(w => w.id === id ? { ...w, ...updates } : w)
    }))
}))
