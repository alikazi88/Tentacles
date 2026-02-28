import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export type MemoryEntityType = 'person' | 'project' | 'topic' | 'file' | 'event' | 'decision' | 'organization' | 'other'

export interface MemoryEntity {
    id: string
    name: string
    type: MemoryEntityType
    summary: string
    importance_score: number // 0-1
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
    isLoading: boolean
    searchQuery: string
    activeView: 'list' | 'timeline' | 'graph'
    fetchMemory: () => Promise<void>
    setSearchQuery: (query: string) => void
    setActiveView: (view: 'list' | 'timeline' | 'graph') => void
}



export const useMemoryStore = create<MemoryState>((set) => ({
    entities: [],
    relations: [],
    isLoading: false,
    searchQuery: '',
    activeView: 'list',

    fetchMemory: async () => {
        set({ isLoading: true })
        const [entitiesRes, relationsRes] = await Promise.all([
            supabase.from('memory_entities').select('*').order('importance_score', { ascending: false }),
            supabase.from('memory_relations').select('*')
        ])

        if (entitiesRes.error) console.error('Error fetching entities:', entitiesRes.error)
        if (relationsRes.error) console.error('Error fetching relations:', relationsRes.error)

        set({
            entities: (entitiesRes.data || []).map(e => ({
                id: e.id,
                name: e.name,
                type: (e.entity_type || 'other') as MemoryEntityType,
                summary: e.description || '',
                importance_score: e.importance_score || 0,
                last_accessed: new Date(e.last_seen_at || e.created_at),
                created_at: new Date(e.created_at)
            })),
            relations: (relationsRes.data || []).map(r => ({
                id: r.id,
                source_id: r.source_id,
                target_id: r.target_id,
                type: r.type,
                strength: r.strength || 0
            })),
            isLoading: false
        })
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveView: (view) => set({ activeView: view })
}))
