import { memo } from 'react'
import { Handle, Position } from '@xyflow/react'
import { Play, Sparkles, BrainCircuit, Globe, Code, PenTool, MessageSquare, Database } from 'lucide-react'

// Map node icons to lucide components dynamically based on string passing
const IconMap: Record<string, any> = {
    Clock: Play, // Fallback representing a trigger
    BrainCircuit,
    Globe,
    Code,
    PenTool,
    MessageSquare,
    Database,
    Sparkles
}

// Custom Trigger Node
export const TriggerNode = memo(({ data }: any) => {
    const Icon = IconMap[data.icon] || Play
    return (
        <div className="bg-surface/90 border border-emerald-500/30 rounded-xl p-4 shadow-xl min-w-[200px] backdrop-blur-md relative group">
            <div className="absolute inset-0 bg-emerald-500/5 rounded-xl pointer-events-none" />
            <div className="flex items-center gap-3 mb-2 relative z-10">
                <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                    <Icon size={16} />
                </div>
                <div className="font-semibold text-white text-sm">
                    {data.label}
                </div>
            </div>
            {data.schedule && (
                <div className="text-[10px] text-textSecondary bg-black/20 px-2 py-1 rounded inline-block font-mono border border-white/5 relative z-10">
                    cron: {data.schedule}
                </div>
            )}
            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-emerald-400 border-2 border-surface" />
        </div>
    )
})

// Custom Action Node (e.g. skills/tools)
export const ActionNode = memo(({ data }: any) => {
    const Icon = IconMap[data.icon] || Code
    return (
        <div className="bg-surface/90 border border-cyan-500/30 rounded-xl p-4 shadow-xl min-w-[200px] backdrop-blur-md relative group">
            <div className="absolute inset-0 bg-cyan-500/5 rounded-xl pointer-events-none" />
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-cyan-400 border-2 border-surface" />

            <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-cyan-500/10 rounded-lg text-cyan-400">
                    <Icon size={16} />
                </div>
                <div>
                    <div className="text-[10px] text-cyan-400/80 uppercase tracking-wider font-semibold mb-0.5">Integration</div>
                    <div className="font-semibold text-white text-sm">
                        {data.label}
                    </div>
                </div>
            </div>

            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-cyan-400 border-2 border-surface" />
        </div>
    )
})

// Custom Agent Node
export const AgentNode = memo(({ data }: any) => {
    const Icon = IconMap[data.icon] || Sparkles
    return (
        <div className="bg-surface/90 border border-neon/30 rounded-xl p-4 shadow-xl min-w-[220px] backdrop-blur-md relative group">
            <div className="absolute inset-0 bg-neon/5 rounded-xl pointer-events-none" />
            <Handle type="target" position={Position.Left} className="w-3 h-3 bg-neon border-2 border-surface" />

            <div className="flex items-center gap-3 relative z-10">
                <div className="p-2 bg-neon/10 rounded-lg text-neon">
                    <Icon size={16} />
                </div>
                <div>
                    <div className="text-[10px] text-neon/80 uppercase tracking-wider font-semibold mb-0.5">Agent Assignee</div>
                    <div className="font-semibold text-white text-sm line-clamp-1">
                        {data.label}
                    </div>
                </div>
            </div>

            <Handle type="source" position={Position.Right} className="w-3 h-3 bg-neon border-2 border-surface" />
        </div>
    )
})
