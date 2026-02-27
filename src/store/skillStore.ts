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

const MOCK_SKILLS: Skill[] = [
    {
        id: 'web_search',
        name: 'Web Search',
        description: 'Enables agents to search the live internet using DuckDuckGo API and scrape page content.',
        category: 'web',
        icon: '🌐',
        version: '1.2.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['network.outbound'],
        last_updated: new Date('2025-01-15')
    },
    {
        id: 'file_ops',
        name: 'File Operations',
        description: 'Read, write, and manipulate local files within the designated workspace boundary.',
        category: 'system',
        icon: '📁',
        version: '2.0.1',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['fs.read', 'fs.write'],
        last_updated: new Date('2025-02-10')
    },
    {
        id: 'terminal_exec',
        name: 'Terminal Execution',
        description: 'Execute shell commands in a sandboxed environment. Requires explicit user approval per session.',
        category: 'development',
        icon: '💻',
        version: '1.0.5',
        author: 'Tentacles Core',
        is_active: false,
        is_installed: true,
        permissions: ['process.exec'],
        last_updated: new Date('2024-11-20')
    },
    {
        id: 'document_parse',
        name: 'Document Parser',
        description: 'Extracts text and metadata from PDF, DOCX, and CSV files natively without external APIs.',
        category: 'data',
        icon: '📄',
        version: '0.9.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['fs.read'],
        last_updated: new Date('2025-02-25')
    },
    {
        id: 'memory_query',
        name: 'Memory Query',
        description: 'Direct access to the pgvector database for semantic search and graph relation traversal.',
        category: 'core',
        icon: '🧠',
        version: '3.1.0',
        author: 'Tentacles Core',
        is_active: true,
        is_installed: true,
        permissions: ['db.read', 'db.write'],
        last_updated: new Date('2025-03-01')
    },
    {
        id: 'github_tools',
        name: 'GitHub Integration',
        description: 'Manage issues, review PRs, and read repositories via the GitHub REST API.',
        category: 'development',
        icon: '🐈‍⬛',
        version: '1.0.0',
        author: 'Community',
        is_active: false,
        is_installed: false,
        permissions: ['network.outbound', 'env.read'],
        last_updated: new Date('2024-12-05')
    }
]

export const useSkillStore = create<SkillState>((set) => ({
    skills: MOCK_SKILLS,
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
