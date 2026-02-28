import { create } from 'zustand'
import { supabase } from '../lib/supabase'

export type Role = 'user' | 'assistant' | 'system' | 'tool'

export interface Message {
    id: string
    role: Role
    content: string
    timestamp: Date
    agent_id?: string
    tool_calls?: any[]
    attachments?: {
        name: string
        url: string
        type: string
    }[]
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
    isLoading: boolean
    fetchConversations: () => Promise<void>
    setActiveConversation: (id: string | null) => void
    sendMessage: (content: string, role?: Role, attachments?: any[]) => Promise<void>
    createNewConversation: () => Promise<void>
    deleteConversation: (id: string) => Promise<void>
}



export const useChatStore = create<ChatState>((set, get) => ({
    activeConversationId: null,
    conversations: [],
    isLoading: false,

    fetchConversations: async () => {
        set({ isLoading: true })
        const { data: convs, error: convError } = await supabase
            .from('conversations')
            .select('*')
            .order('last_message_at', { ascending: false })

        if (convError) {
            console.error('Error fetching conversations:', convError)
            set({ isLoading: false })
            return
        }

        const formattedConvs: Conversation[] = await Promise.all((convs || []).map(async c => {
            const { data: msgs } = await supabase
                .from('messages')
                .select('*')
                .eq('conversation_id', c.id)
                .order('created_at', { ascending: true })

            return {
                id: c.id,
                title: c.title || 'Untitled',
                updated_at: new Date(c.last_message_at || c.created_at),
                messages: (msgs || []).map(m => ({
                    id: m.id,
                    role: m.role as Role,
                    content: m.content || '',
                    timestamp: new Date(m.created_at),
                    agent_id: m.agent_id,
                    tool_calls: m.tool_calls,
                    attachments: m.attachments
                }))
            }
        }))

        set({ conversations: formattedConvs, isLoading: false })
    },

    setActiveConversation: (id) => set({ activeConversationId: id }),

    createNewConversation: async () => {
        const { data: { user } } = await supabase.auth.getUser()

        const { data, error } = await supabase
            .from('conversations')
            .insert([{
                title: 'New Conversation',
                user_id: user?.id,
                last_message_at: new Date().toISOString()
            }])
            .select()
            .single()

        if (error) {
            console.error('Error creating conversation:', error)
            return
        }

        const newConv: Conversation = {
            id: data.id,
            title: data.title,
            updated_at: new Date(data.created_at),
            messages: []
        }

        set((state) => ({
            conversations: [newConv, ...state.conversations],
            activeConversationId: data.id
        }))
    },

    sendMessage: async (content, role = 'user', attachments = []) => {
        const activeId = get().activeConversationId
        if (!activeId) return

        // 1. Create DB Message record
        const { data: msgData, error: msgError } = await supabase
            .from('messages')
            .insert([{
                conversation_id: activeId,
                role,
                content,
                attachments,
                // agent_id logic would go here
            }])
            .select()
            .single()

        if (msgError) {
            console.error('Error saving message:', msgError)
            return
        }

        const newMessage: Message = {
            id: msgData.id,
            role: msgData.role as Role,
            content: msgData.content,
            timestamp: new Date(msgData.created_at),
            attachments: msgData.attachments
        }

        // 2. Update local state
        set((state) => ({
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
        }))

        // 3. Update conversation last_message_at
        await supabase
            .from('conversations')
            .update({ last_message_at: new Date().toISOString() })
            .eq('id', activeId)

        // 4. Trigger Agent Core if it's a user message
        if (role === 'user') {
            try {
                const response = await fetch('http://localhost:8080/api/v1/chat', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        message: content,
                        conversation_id: activeId,
                        agent_id: null
                    })
                })

                const data = await response.json()

                if (data.status === 'success') {
                    // Recursive call to save assistant message
                    await get().sendMessage(data.reply, 'assistant')
                }
            } catch (error) {
                console.error('Failed to connect to Agent Core:', error)
                await get().sendMessage('Failed to connect to Intelligence Layer. Make sure Agent Core is running.', 'system')
            }
        }
    },

    deleteConversation: async (id) => {
        const { error } = await supabase
            .from('conversations')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Error deleting conversation:', error)
            return
        }

        set((state) => ({
            conversations: state.conversations.filter(c => c.id !== id),
            activeConversationId: state.activeConversationId === id ? null : state.activeConversationId
        }))
    }
}))

