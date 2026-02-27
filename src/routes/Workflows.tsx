import { useCallback } from 'react'
import { Plus, Play, Settings2, Clock, GitCommit, Pause, Network, CheckCircle2 } from 'lucide-react'
import {
    ReactFlow,
    Background,
    Controls,
    MiniMap,
    useNodesState,
    useEdgesState,
    addEdge
} from '@xyflow/react'
import type { Connection, Edge } from '@xyflow/react'
import '@xyflow/react/dist/style.css'
import { useWorkflowStore } from '../store/workflowStore'
import { TriggerNode, ActionNode, AgentNode } from '../components/workflows/CustomNodes'

const nodeTypes = {
    trigger: TriggerNode,
    action: ActionNode,
    agent: AgentNode
}

export function Workflows() {
    const { workflows, activeWorkflowId, setActiveWorkflow } = useWorkflowStore()
    const activeWorkflow = workflows.find(w => w.id === activeWorkflowId)

    // Flow State
    const [nodes, setNodes, onNodesChange] = useNodesState(activeWorkflow?.nodes || [])
    const [edges, setEdges, onEdgesChange] = useEdgesState(activeWorkflow?.edges || [])

    const onConnect = useCallback(
        (params: Connection | Edge) => setEdges((eds) => addEdge({ ...params, animated: true }, eds)),
        [setEdges]
    )

    return (
        <div className="h-full flex flex-col md:flex-row gap-6 max-w-[1600px] mx-auto pb-6 w-full">

            {/* Left Sidebar - Workflow List */}
            <div className="w-full md:w-72 glass-card bg-surface/40 flex flex-col rounded-2xl border border-white/5 shrink-0 overflow-hidden">
                <div className="p-4 border-b border-white/5 flex items-center justify-between bg-surface/50">
                    <h3 className="text-sm font-semibold text-white flex items-center gap-2">
                        <Network size={16} className="text-neon" /> Automations
                    </h3>
                    <button className="p-1.5 rounded-lg text-textSecondary hover:text-white hover:bg-white/5 transition-colors title='New Workflow'">
                        <Plus size={16} />
                    </button>
                </div>

                <div className="flex-1 overflow-y-auto custom-scrollbar p-3 space-y-2">
                    {workflows.map(wf => {
                        const isActive = wf.id === activeWorkflowId
                        return (
                            <button
                                key={wf.id}
                                onClick={() => {
                                    setActiveWorkflow(wf.id)
                                    setNodes(wf.nodes)
                                    setEdges(wf.edges)
                                }}
                                className={`w-full text-left p-3 rounded-xl transition-all border ${isActive
                                    ? 'bg-neon/5 border-neon/30 shadow-[0_0_10px_rgba(209,255,0,0.05)]'
                                    : 'bg-transparent border-transparent text-textSecondary hover:bg-white/5 hover:text-white'
                                    }`}
                            >
                                <div className="flex items-center justify-between mb-1">
                                    <div className={`text-sm font-semibold truncate ${isActive ? 'text-neon' : ''}`}>{wf.name}</div>
                                    {wf.is_active ? (
                                        <div className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.8)]" />
                                    ) : (
                                        <div className="w-2 h-2 rounded-full bg-textSecondary" />
                                    )}
                                </div>
                                <div className="text-[10px] opacity-60 flex items-center gap-1.5 mt-2">
                                    <Clock size={10} />
                                    {wf.last_run ? wf.last_run.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : 'Never'}
                                </div>
                            </button>
                        )
                    })}
                </div>
            </div>

            {/* Main Canvas Area */}
            <div className="flex-1 glass-card bg-surface/20 border-white/5 overflow-hidden rounded-2xl flex flex-col relative">

                {/* Canvas Header */}
                <div className="h-16 border-b border-white/5 bg-surface/60 backdrop-blur-md flex items-center justify-between px-6 z-10 shrink-0">

                    {activeWorkflow ? (
                        <>
                            <div>
                                <h2 className="text-lg font-bold text-white flex items-center gap-3">
                                    {activeWorkflow.name}
                                    <span className={`text-[10px] px-2 py-0.5 rounded-full border flex items-center gap-1 uppercase tracking-wider font-mono ${activeWorkflow.is_active ? 'border-emerald-500/30 text-emerald-400 bg-emerald-500/10' : 'border-white/10 text-textSecondary bg-white/5'}`}>
                                        {activeWorkflow.is_active ? <CheckCircle2 size={10} /> : <Pause size={10} />}
                                        {activeWorkflow.is_active ? 'Active' : 'Paused'}
                                    </span>
                                </h2>
                                <p className="text-xs text-textSecondary mt-0.5 max-w-xl truncate">{activeWorkflow.description}</p>
                            </div>

                            <div className="flex items-center gap-3">
                                <button className="p-2 text-textSecondary hover:text-white rounded-lg hover:bg-white/5 transition-colors border border-transparent hover:border-white/10" title="Workflow Settings">
                                    <Settings2 size={18} />
                                </button>
                                <button className="btn-secondary flex items-center gap-2 text-xs py-1.5 px-3">
                                    <GitCommit size={14} /> View Logs
                                </button>
                                <button className="btn-primary flex items-center gap-2 text-xs py-1.5 px-4 shadow-[0_0_15px_rgba(209,255,0,0.15)]">
                                    <Play size={14} className="fill-black" /> Run Now
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center text-textSecondary text-sm">Select a workflow</div>
                    )}
                </div>

                {/* React Flow Canvas */}
                <div className="flex-1 w-full bg-[#050505] relative">
                    <ReactFlow
                        nodes={nodes}
                        edges={edges}
                        nodeTypes={nodeTypes}
                        onNodesChange={onNodesChange}
                        onEdgesChange={onEdgesChange}
                        onConnect={onConnect}
                        fitView
                        proOptions={{ hideAttribution: true }}
                        className="custom-workflow-theme"
                    >
                        <Background color="#ffffff" gap={16} size={1} />
                        <Controls
                            className="bg-surface border-white/10 fill-white text-white"
                            showInteractive={false}
                        />
                        <MiniMap
                            nodeColor="#D1FF00"
                            maskColor="rgba(0, 0, 0, 0.5)"
                            className="bg-surface/50 border border-white/10 rounded-xl overflow-hidden"
                        />
                    </ReactFlow>

                    {/* Tool Tray Overlay */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 bg-surface/80 backdrop-blur-xl border border-white/10 rounded-2xl p-2 flex items-center gap-2 shadow-2xl">
                        <button className="px-4 py-2 text-xs font-medium text-white hover:text-neon hover:bg-white/5 rounded-xl transition-colors cursor-grab active:cursor-grabbing">
                            + Trigger
                        </button>
                        <div className="w-px h-4 bg-white/10" />
                        <button className="px-4 py-2 text-xs font-medium text-white hover:text-emerald-400 hover:bg-white/5 rounded-xl transition-colors cursor-grab active:cursor-grabbing">
                            + Agent Action
                        </button>
                        <div className="w-px h-4 bg-white/10" />
                        <button className="px-4 py-2 text-xs font-medium text-white hover:text-cyan-400 hover:bg-white/5 rounded-xl transition-colors cursor-grab active:cursor-grabbing">
                            + Code / API
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}
