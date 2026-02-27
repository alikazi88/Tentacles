import { create } from 'zustand'

export type Role = 'user' | 'assistant' | 'system' | 'tool'

export interface Message {
    id: string
    role: Role
    content: string
    timestamp: Date
    agent_id?: string
    tool_calls?: any[]
}

export interface Conversation {
    id: string
    title: string
    updated_at: Date
    messages: Message[]
}

interface ChatState {
    activeConversationId: string | null
    conversations: Conversation[]
    setActiveConversation: (id: string | null) => void
    sendMessage: (content: string, role?: Role) => void
    createNewConversation: () => void
}

const MOCK_CONVERSATIONS: Conversation[] = [
    {
        id: '1',
        title: 'Project Setup Planning',
        updated_at: new Date(Date.now() - 1000 * 60 * 60),
        messages: [
            { id: '1-1', role: 'user', content: 'Can we outline the database schema?', timestamp: new Date(Date.now() - 1000 * 60 * 65) },
            { id: '1-2', role: 'assistant', content: 'Certainly. I recommend a core layout with Profiles, Agents, and Workflows tables. Shall I generate the SQL?', timestamp: new Date(Date.now() - 1000 * 60 * 64) }
        ]
    },
    {
        id: '2',
        title: 'Debugging CI Pipeline',
        updated_at: new Date(Date.now() - 1000 * 60 * 60 * 24),
        messages: [
            { id: '2-1', role: 'user', content: 'Why is the GitHub action failing on the rust build step?', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
            { id: '2-2', role: 'assistant', content: 'Based on the logs, it appears you are missing the `wasm32-wasi` target. Add `rustup target add wasm32-wasi` before building.', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) }
        ]
    }
]

export const useChatStore = create<ChatState>((set) => ({
    activeConversationId: '1',
    conversations: MOCK_CONVERSATIONS,
    setActiveConversation: (id) => set({ activeConversationId: id }),
    createNewConversation: () => {
        const id = Math.random().toString(36).substring(7)
        const newConv: Conversation = {
            id,
            title: 'New Conversation',
            updated_at: new Date(),
            messages: []
        }
        set((state) => ({
            conversations: [newConv, ...state.conversations],
            activeConversationId: id
        }))
    },
    sendMessage: (content, role = 'user') => {
        set((state) => {
            const activeId = state.activeConversationId
            if (!activeId) return state

            const newMessage: Message = {
                id: Math.random().toString(36).substring(7),
                role,
                content,
                timestamp: new Date()
            }

            return {
                conversations: state.conversations.map(conv => {
                    if (conv.id === activeId) {
                        return {
                            ...conv,
                            updated_at: new Date(),
                            messages: [...conv.messages, newMessage]
                        }
                    }
                    return conv
                })
            }
        })
    }
}))
