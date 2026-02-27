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

const MOCK_WORKFLOWS: Workflow[] = [
    {
        id: 'w1',
        name: 'Morning Briefing',
        description: 'Compiles overnight memory entities, fetches top HN posts, and constructs a summary via Nexus Generalist.',
        is_active: true,
        last_run: new Date(Date.now() - 1000 * 60 * 60 * 12),
        created_at: new Date('2025-01-10'),
        nodes: [
            { id: '1', type: 'trigger', position: { x: 250, y: 50 }, data: { label: 'Schedule Trigger', icon: 'Clock', schedule: '0 8 * * *' } },
            { id: '2', type: 'action', position: { x: 100, y: 150 }, data: { label: 'Fetch New Memories', icon: 'BrainCircuit' } },
            { id: '3', type: 'action', position: { x: 400, y: 150 }, data: { label: 'Web Scrape HackerNews', icon: 'Globe' } },
            { id: '4', type: 'agent', position: { x: 250, y: 300 }, data: { label: 'Writer Agent Summarize', icon: 'PenTool' } },
        ],
        edges: [
            { id: 'e1-2', source: '1', target: '2', animated: true },
            { id: 'e1-3', source: '1', target: '3', animated: true },
            { id: 'e2-4', source: '2', target: '4' },
            { id: 'e3-4', source: '3', target: '4' },
        ]
    }
]

export const useWorkflowStore = create<WorkflowState>((set) => ({
    workflows: MOCK_WORKFLOWS,
    activeWorkflowId: 'w1',
    setActiveWorkflow: (id) => set({ activeWorkflowId: id }),
    updateWorkflow: (id, updates) => set((state) => ({
        workflows: state.workflows.map(w => w.id === id ? { ...w, ...updates } : w)
    }))
}))
