import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export type SkillCategory = 'core' | 'development' | 'web' | 'data' | 'system' | 'custom'

export interface Skill {
    id: string
    name: string
    description: string
    category: SkillCategory
    icon: string
    version: string
    author: string
    is_active: boolean
    is_installed: boolean
    permissions: string[]
    last_updated: Date
}

interface SkillState {
    skills: Skill[]
    isLoading: boolean
    searchQuery: string
    activeCategory: SkillCategory | 'all'
    fetchSkills: () => Promise<void>
    setSearchQuery: (query: string) => void
    setActiveCategory: (category: SkillCategory | 'all') => void
    toggleSkillActive: (id: string, active: boolean) => Promise<void>
    installSkill: (id: string) => Promise<void>
}



// REAL_SKILLS removed as they are now seeded and fetched from Supabase

export const useSkillStore = create<SkillState>((set) => ({
    skills: [],
    isLoading: false,
    searchQuery: '',
    activeCategory: 'all',

    fetchSkills: async () => {
        set({ isLoading: true })
        const { data, error } = await supabase
            .from('skills')
            .select('*')
            .order('name', { ascending: true })

        if (error) {
            console.error('Error fetching skills:', error)
            set({ isLoading: false })
            return
        }

        const formattedSkills: Skill[] = (data || []).map(s => ({
            id: s.id,
            name: s.name,
            description: s.description || '',
            category: s.category as SkillCategory,
            icon: s.icon || '🛠️',
            version: s.manifest?.version || '1.0.0',
            author: s.manifest?.author || 'Unknown',
            is_active: s.is_enabled,
            is_installed: s.is_builtin || s.is_enabled,
            permissions: s.permissions || [],
            last_updated: new Date(s.created_at)
        }))

        set({ skills: formattedSkills, isLoading: false })
    },

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveCategory: (category) => set({ activeCategory: category }),

    toggleSkillActive: async (id, active) => {
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('skills')
            .update({ is_enabled: active, user_id: user?.id || null })
            .eq('id', id)

        if (error) {
            console.error('Error toggling skill active state:', error)
            return
        }

        set((state) => ({
            skills: state.skills.map((s) => (s.id === id ? { ...s, is_active: active } : s))
        }))
    },

    installSkill: async (id) => {
        set({ isLoading: true })
        const { data: { user } } = await supabase.auth.getUser()

        const { error } = await supabase
            .from('skills')
            .update({ is_enabled: true, user_id: user?.id || null }) // Simulating install by enabling
            .eq('id', id)

        if (error) {
            console.error('Error installing skill:', error)
            set({ isLoading: false })
            return
        }

        await new Promise(r => setTimeout(r, 800))
        set((state) => ({
            skills: state.skills.map((s) => (s.id === id ? { ...s, is_installed: true, is_active: true } : s)),
            isLoading: false
        }))
    }
}))
