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



export const useMemoryStore = create<MemoryState>((set) => ({
    entities: [],
    relations: [],
    searchQuery: '',
    activeView: 'list',

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveView: (view) => set({ activeView: view })
}))
