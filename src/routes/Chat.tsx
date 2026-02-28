import { useEffect, useRef, useState } from 'react'
import { Send, Plus, Settings2, Command, FileText, Image as ImageIcon, User, Sparkles } from 'lucide-react'
import { useChatStore } from '../store/chatStore'
import type { Message } from '../store/chatStore'
import { useAgentStore } from '../store/agentStore'
import { supabase } from '../lib/supabase'
import { v4 as uuidv4 } from 'uuid'
import { toast } from 'react-hot-toast'

const MessageBubble = ({ msg }: { msg: Message }) => {
    const isUser = msg.role === 'user'

    return (
        <div className={`flex gap-4 p-4 rounded-2xl ${isUser ? 'bg-surface/30' : 'bg-transparent'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${isUser ? 'bg-surface border border-white/10' : 'bg-neon/10 border border-neon/30 text-neon'}`}>
                {isUser ? <User size={16} /> : <Sparkles size={16} />}
            </div>
            <div className="flex-1 space-y-2">
                <div className="flex items-center gap-2">
                    <span className="text-sm font-semibold text-white">
                        {isUser ? 'You' : 'Assistant'}
                    </span>
                    <span className="text-[10px] text-textSecondary uppercase tracking-wider">
                        {msg.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </span>
                </div>
                <div className="text-sm text-textSecondary leading-relaxed whitespace-pre-wrap">
                    {msg.content}
                </div>

                {msg.attachments && msg.attachments.length > 0 && (
                    <div className="flex flex-wrap gap-2 mt-3">
                        {msg.attachments.map((file, i) => (
                            <a
                                key={i}
                                href={file.url}
                                target="_blank"
                                rel="noreferrer"
                                className="flex items-center gap-2 p-2 rounded-lg bg-surface/50 border border-white/5 hover:border-white/20 transition-all group"
                            >
                                {file.type.startsWith('image/') ? (
                                    <div className="w-10 h-10 rounded overflow-hidden bg-black/20">
                                        <img src={file.url} alt={file.name} className="w-full h-full object-cover" />
                                    </div>
                                ) : (
                                    <FileText size={20} className="text-textSecondary group-hover:text-neon transition-colors" />
                                )}
                                <div className="text-[10px] pr-2">
                                    <div className="text-white font-medium truncate max-w-[120px]">{file.name}</div>
                                    <div className="text-textSecondary uppercase tracking-tighter opacity-50">{(file.type.split('/')[1] || '').toUpperCase()}</div>
                                </div>
                            </a>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export function Chat() {
    const {
        conversations,
        activeConversationId,
        setActiveConversation,
        createNewConversation,
        sendMessage,
        fetchConversations
    } = useChatStore()

    const { agents } = useAgentStore()

    const [input, setInput] = useState('')
    const [isUploading, setIsUploading] = useState(false)
    const fileInputRef = useRef<HTMLInputElement>(null)
    const imageInputRef = useRef<HTMLInputElement>(null)
    const messagesEndRef = useRef<HTMLDivElement>(null)

    const activeConv = conversations.find(c => c.id === activeConversationId)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
    }

    useEffect(() => {
        scrollToBottom()
    }, [activeConv?.messages])

    useEffect(() => {
        fetchConversations()
    }, [fetchConversations])

    const handleSend = () => {
        if (!input.trim()) return
        sendMessage(input.trim(), 'user')
        setInput('')
    }

    const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>, type: 'media' | 'documents') => {
        const file = event.target.files?.[0]
        if (!file || !activeConversationId) return

        setIsUploading(true)
        const toastId = toast.loading(`Uploading ${file.name}...`)

        try {
            const fileExt = file.name.split('.').pop()
            const fileName = `${uuidv4()}.${fileExt}`
            const filePath = `${activeConversationId}/${fileName}`

            const { error: uploadError } = await supabase.storage
                .from(type)
                .upload(filePath, file)

            if (uploadError) throw uploadError

            const { data: { publicUrl } } = supabase.storage
                .from(type)
                .getPublicUrl(filePath)

            // Add the file to the current message being typed or send it immediately with a placeholder
            await sendMessage(`Uploaded file: ${file.name}`, 'user', [{
                name: file.name,
                url: publicUrl,
                type: file.type
            }])

            toast.success('Upload complete', { id: toastId })
        } catch (error: any) {
            console.error('Upload failed:', error)
            toast.error(error.message || 'Upload failed', { id: toastId })
        } finally {
            setIsUploading(false)
            if (event.target) event.target.value = ''
        }
    }

    return (
        <div className="h-full flex gap-6 max-w-[1600px] mx-auto w-full">

            {/* Left Sidebar - Chat History */}
            <div className="w-64 glass-card bg-surface/40 flex flex-col hidden lg:flex rounded-2xl overflow-hidden shrink-0 border border-white/5">
                <div className="p-4 border-b border-white/5 flex items-center justify-between">
                    <span className="text-sm font-semibold text-white">History</span>
                    <button
                        onClick={createNewConversation}
                        className="p-1.5 rounded-lg text-textSecondary hover:text-white hover:bg-white/5 transition-colors"
                    >
                        <Plus size={16} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-1">
                    {conversations.map(conv => {
                        const isActive = conv.id === activeConversationId
                        return (
                            <button
                                key={conv.id}
                                onClick={() => setActiveConversation(conv.id)}
                                className={`w-full text-left p-3 rounded-xl transition-all ${isActive
                                    ? 'bg-white/10 text-white'
                                    : 'text-textSecondary hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="text-xs font-medium truncate">{conv.title}</div>
                                <div className="text-[10px] opacity-60 mt-1 truncate">
                                    {conv.messages[conv.messages.length - 1]?.content || 'Empty discussion'}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Main Chat Area */}
            <div className="flex-1 glass-card bg-surface/30 flex flex-col rounded-2xl overflow-hidden border border-white/5 relative shadow-inner">

                {/* Header */}
                <div className="h-14 border-b border-white/5 bg-surface/50 backdrop-blur-md flex items-center justify-between px-6 z-10">
                    <div className="flex items-center gap-3">
                        <select className="bg-black/20 border border-white/10 rounded-lg px-3 py-1.5 text-xs text-white outline-none cursor-pointer appearance-none hover:border-white/20 transition-colors">
                            {agents.map(a => (
                                <option key={a.id} value={a.id}>{a.name}</option>
                            ))}
                        </select>
                        <span className="text-[10px] text-neon px-2 py-0.5 rounded bg-neon/10 border border-neon/20">v1.2 Active</span>
                    </div>

                    <button className="text-textSecondary hover:text-white transition-colors">
                        <Settings2 size={16} />
                    </button>
                </div>

                {/* Messages */}
                <div className="flex-1 overflow-y-auto custom-scrollbar p-6 space-y-6">
                    {activeConv?.messages.map(msg => (
                        <MessageBubble key={msg.id} msg={msg} />
                    ))}
                    {activeConv?.messages.length === 0 && (
                        <div className="h-full flex flex-col items-center justify-center text-textSecondary opacity-50 space-y-4">
                            <Sparkles size={48} className="text-neon" />
                            <p className="text-sm">Start a new conversation</p>
                        </div>
                    )}
                    <div ref={messagesEndRef} />
                </div>

                {/* Input Area */}
                <div className="p-4 bg-background/50 border-t border-white/5 backdrop-blur-xl">
                    <div className="relative group max-w-4xl mx-auto flex items-end gap-2 bg-surface/80 border border-borderLight rounded-2xl p-2 shadow-sm focus-within:border-neon/50 focus-within:ring-1 focus-within:ring-neon/50 transition-all">

                        <div className="flex items-center gap-1 mb-1 px-1">
                            <input
                                type="file"
                                ref={fileInputRef}
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, 'documents')}
                                accept=".pdf,.doc,.docx,.txt"
                            />
                            <input
                                type="file"
                                ref={imageInputRef}
                                className="hidden"
                                onChange={(e) => handleFileUpload(e, 'media')}
                                accept="image/*"
                            />
                            <button
                                onClick={() => fileInputRef.current?.click()}
                                disabled={isUploading}
                                className="p-2 text-textSecondary hover:text-white rounded-xl hover:bg-white/5 transition-colors disabled:opacity-30"
                                title="Attach Document"
                            >
                                <FileText size={18} />
                            </button>
                            <button
                                onClick={() => imageInputRef.current?.click()}
                                disabled={isUploading}
                                className="p-2 text-textSecondary hover:text-white rounded-xl hover:bg-white/5 transition-colors disabled:opacity-30"
                                title="Attach Image"
                            >
                                <ImageIcon size={18} />
                            </button>
                        </div>

                        <textarea
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter' && !e.shiftKey) {
                                    e.preventDefault()
                                    handleSend()
                                }
                            }}
                            placeholder="Message Agent or type '/' for commands..."
                            className="flex-1 bg-transparent border-none text-sm text-white placeholder:text-textSecondary outline-none min-h-[44px] max-h-48 resize-none py-3 custom-scrollbar"
                            rows={1}
                        />

                        <button
                            onClick={handleSend}
                            disabled={!input.trim()}
                            className="p-3 bg-neon text-black rounded-xl hover:brightness-110 disabled:opacity-50 disabled:cursor-not-allowed transition-all mb-0.5"
                        >
                            <Send size={16} className="ml-0.5" />
                        </button>

                        {/* Mention floating hint */}
                        <div className="absolute -top-10 left-4 text-[10px] text-textSecondary bg-surface border border-white/10 px-3 py-1.5 rounded-lg shadow-lg opacity-0 group-focus-within:opacity-100 transition-opacity flex items-center gap-2 pointer-events-none">
                            <Command size={10} className="text-neon" /> Use <span className="text-white font-mono">@</span> to tag agents, <span className="text-white font-mono">/</span> for tools
                        </div>
                    </div>
                    <div className="text-center mt-2.5 text-[10px] text-textSecondary/60">
                        Agent interactions may incur local compute usage or API credits depending on selected model.
                    </div>
                </div>

            </div>
        </div>
    )
}
