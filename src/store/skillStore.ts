import { create } from 'zustand'

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
    searchQuery: string
    activeCategory: SkillCategory | 'all'
    setSearchQuery: (query: string) => void
    setActiveCategory: (category: SkillCategory | 'all') => void
    toggleSkillActive: (id: string, active: boolean) => Promise<void>
    installSkill: (id: string) => Promise<void>
}



const REAL_SKILLS: Skill[] = [
    {
        id: 'web_search',
        name: 'Web Search',
        description: 'Native DuckDuckGo search integration. Can fetch live results without an API key.',
        category: 'web',
        icon: '🌐',
        version: '1.0.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['network.outbound'],
        last_updated: new Date()
    },
    {
        id: 'file_ops',
        name: 'File Operations',
        description: 'Read and write files within the workspace boundary (d:\\Tentacles).',
        category: 'system',
        icon: '📁',
        version: '1.0.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['fs.read', 'fs.write'],
        last_updated: new Date()
    },
    {
        id: 'memory_query',
        name: 'Memory Query',
        description: 'Direct semantic search access to the pgvector memory engine.',
        category: 'core',
        icon: '🧠',
        version: '1.0.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['db.read'],
        last_updated: new Date()
    },
    {
        id: 'terminal_exec',
        name: 'Terminal Execution',
        description: 'Execute shell commands in a sandboxed terminal environment.',
        category: 'development',
        icon: '💻',
        version: '1.0.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['process.exec'],
        last_updated: new Date()
    }
]

export const useSkillStore = create<SkillState>((set) => ({
    skills: REAL_SKILLS,
    searchQuery: '',
    activeCategory: 'all',

    setSearchQuery: (query) => set({ searchQuery: query }),
    setActiveCategory: (category) => set({ activeCategory: category }),

    toggleSkillActive: async (id, active) => {
        set((state) => ({
            skills: state.skills.map((s) => (s.id === id ? { ...s, is_active: active } : s))
        }))
    },

    installSkill: async (id) => {
        // Mock install delay
        await new Promise(r => setTimeout(r, 800))
        set((state) => ({
            skills: state.skills.map((s) => (s.id === id ? { ...s, is_installed: true, is_active: true } : s))
        }))
    }
}))
