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



export const useChatStore = create<ChatState>((set) => ({
    activeConversationId: null,
    conversations: [],
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
    sendMessage: async (content, role = 'user') => {
        const activeId = useChatStore.getState().activeConversationId
        if (!activeId) return

        const userMessage: Message = {
            id: Math.random().toString(36).substring(7),
            role,
            content,
            timestamp: new Date()
        }

        // Add user message immediately
        set((state) => ({
            conversations: state.conversations.map(conv => {
                if (conv.id === activeId) {
                    return {
                        ...conv,
                        updated_at: new Date(),
                        messages: [...conv.messages, userMessage]
                    }
                }
                return conv
            })
        }))

        try {
            const response = await fetch('http://localhost:8080/api/v1/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    message: content,
                    conversation_id: activeId,
                    agent_id: null // To be expanded in Agent System phase
                })
            })

            const data = await response.json()

            if (data.status === 'success') {
                const assistantMessage: Message = {
                    id: Math.random().toString(36).substring(7),
                    role: 'assistant',
                    content: data.reply,
                    timestamp: new Date()
                }

                set((state) => ({
                    conversations: state.conversations.map(conv => {
                        if (conv.id === activeId) {
                            return {
                                ...conv,
                                messages: [...conv.messages, assistantMessage]
                            }
                        }
                        return conv
                    })
                }))
            }
        } catch (error) {
            console.error('Failed to send message to Agent Core:', error)
            const errorMessage: Message = {
                id: Math.random().toString(36).substring(7),
                role: 'system',
                content: 'Failed to connect to Intelligence Layer. Make sure Agent Core is running.',
                timestamp: new Date()
            }
            set((state) => ({
                conversations: state.conversations.map(conv => {
                    if (conv.id === activeId) {
                        return {
                            ...conv,
                            messages: [...conv.messages, errorMessage]
                        }
                    }
                    return conv
                })
            }))
        }
    }
}))

