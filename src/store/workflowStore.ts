import { create } from 'zustand'
import { supabase } from '../lib/supabase'

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
    isLoading: boolean
    fetchWorkflows: () => Promise<void>
    setActiveWorkflow: (id: string | null) => void
    updateWorkflow: (id: string, updates: Partial<Workflow>) => Promise<void>
    addWorkflow: (workflow: Partial<Workflow>) => Promise<void>
    deleteWorkflow: (id: string) => Promise<void>
}



export const useWorkflowStore = create<WorkflowState>((set) => ({
    workflows: [],
    activeWorkflowId: null,
    isLoading: false,

    fetchWorkflows: async () => {
        set({ isLoading: true })
        const { data, error } = await supabase
            .from('workflows')
            .select('*')
            .order('created_at', { ascending: false })

        if (error) {
            console.error('Error fetching workflows:', error)
            set({ isLoading: false })
            return
        }

        const formattedWorkflows: Workflow[] = (data || []).map(w => ({
            id: w.id,
            name: w.name,
            description: w.description || '',
            is_active: w.is_active,
            nodes: w.definition?.nodes || [],
            edges: w.definition?.edges || [],
            last_run: w.last_run_at ? new Date(w.last_run_at) : undefined,
            created_at: new Date(w.created_at)
        }))

        set({ workflows: formattedWorkflows, isLoading: false })
    },

    setActiveWorkflow: (id) => set({ activeWorkflowId: id }),

    updateWorkflow: async (id, updates) => {
        const dbUpdates: any = { ...updates }
        if (updates.nodes || updates.edges) {
            dbUpdates.definition = {
                nodes: updates.nodes,
                edges: updates.edges
            }
            delete dbUpdates.nodes
            delete dbUpdates.edges
        }

        const { error } = await supabase
            .from('workflows')
            .update(dbUpdates)
            .eq('id', id)

        if (error) {
            console.error('Error updating workflow:', error)
            return
        }

        set((state) => ({
            workflows: state.workflows.map(w => w.id === id ? { ...w, ...updates } : w)
        }))
    },

    addWorkflow: async (workflow) => {
        const { data: { user } } = await supabase.auth.getUser()

        const newWorkflowData = {
            name: workflow.name || 'New Workflow',
            description: workflow.description || '',
            is_active: false,
            definition: {
                nodes: workflow.nodes || [],
                edges: workflow.edges || []
            },
            user_id: user?.id
        }

        const { data, error } = await supabase
            .from('workflows')
            .insert([newWorkflowData])
            .select()
            .single()

        if (error) {
            console.error('Error adding workflow:', error)
            return
        }

        const addedWorkflow: Workflow = {
            id: data.id,
            name: data.name,
            description: data.description,
            is_active: data.is_active,
            nodes: data.definition?.nodes || [],
            edges: data.definition?.edges || [],
            created_at: new Date(data.created_at)
        }

        set((state) => ({
            workflows: [addedWorkflow, ...state.workflows]
        }))
    },

    deleteWorkflow: async (id) => {
        const { error } = await supabase
            .from('workflows')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting workflow:', error)
            return
        }

        set((state) => ({
            workflows: state.workflows.filter(w => w.id !== id)
        }))
    }
}))
