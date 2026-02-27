import { create } from 'zustand'

export type MemoryEntityType = 'person' | 'project' | 'concept' | 'event' | 'document' | 'other'

export interface MemoryEntity {
    id: string
    name: string
    type: MemoryEntityType
    summary: string
    relevance_score: number // 0-1
    last_accessed: Date
    created_at: Date
}

export interface MemoryRelation {
    id: string
    source_id: string
    target_id: string
    type: string // e.g. "works_on", "mentioned_in", "related_to"
    strength: number // 0-1
}

interface MemoryState {
    entities: MemoryEntity[]
    relations: MemoryRelation[]
    searchQuery: string
    activeView: 'list' | 'timeline' | 'graph'
    setSearchQuery: (query: string) => void
    setActiveView: (view: 'list' | 'timeline' | 'graph') => void
}

const MOCK_ENTITIES: MemoryEntity[] = [
    {
        id: 'e1',
        name: 'Tentacles OS',
        type: 'project',
        summary: 'A localized AI operating system utilizing WASM sandboxes.',
        relevance_score: 0.95,
        last_accessed: new Date(),
        created_at: new Date('2025-01-01')
    },
    {
        id: 'e2',
        name: 'Minimin UI',
        type: 'concept',
        summary: 'A dark, neon-accented, glassmorphism design aesthetic.',
        relevance_score: 0.88,
        last_accessed: new Date(Date.now() - 1000 * 60 * 60 * 2), // 2 hours ago
        created_at: new Date('2025-02-15')
    },
    {
        id: 'e3',
        name: 'Supabase',
        type: 'project',
        summary: 'Open source Firebase alternative used for Postgres DB and Edge Functions.',
        relevance_score: 0.90,
        last_accessed: new Date(Date.now() - 1000 * 60 * 60 * 24 * 5), // 5 days ago
        created_at: new Date('2024-12-10')
    },
    {
        id: 'e4',
        name: 'Nexus Generalist',
        type: 'person',
        summary: 'The primary fallback routing agent in the local cluster.',
        relevance_score: 0.75,
        last_accessed: new Date(Date.now() - 1000 * 60 * 60 * 48), // 2 days ago
        created_at: new Date('2025-02-28')
    },
    {
        id: 'e5',
        name: 'Phase 6 Integration',
        type: 'event',
        summary: 'Upcoming sprint focused on implementing Memory architecture.',
        relevance_score: 0.85,
        last_accessed: new Date(),
        created_at: new Date('2025-03-01')
    }
]

const MOCK_RELATIONS: MemoryRelation[] = [
    { id: 'r1', source_id: 'e1', target_id: 'e2', type: 'uses_aesthetic', strength: 0.9 },
    { id: 'r2', source_id: 'e1', target_id: 'e3', type: 'powered_by', strength: 0.95 },
    { id: 'r3', source_id: 'e4', target_id: 'e1', type: 'operates_in', strength: 0.8 },
    { id: 'r4', source_id: 'e5', target_id: 'e1', type: 'milestone_for', strength: 0.7 },
]

export const useMemoryStore = create<MemoryState>((set) => ({
    entities: MOCK_ENTITIES,
    relations: MOCK_RELATIONS,
    searchQuery: '',
    activeView: 'list',

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveView: (view) => set({ activeView: view })
}))
