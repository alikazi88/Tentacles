
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './routes/Dashboard'
import { Agents } from './routes/Agents'
import { Chat } from './routes/Chat'
import { Skills } from './routes/Skills'
import { Memory } from './routes/Memory'
import { Workflows } from './routes/Workflows'
import { Models } from './routes/Models'
import { ApplicationSettings } from './routes/Settings'
import { useEffect } from 'react'
import { useAgentStore } from './store/agentStore'
import { useModelStore } from './store/modelStore'
import { useSkillStore } from './store/skillStore'
import { useWorkflowStore } from './store/workflowStore'
import { useChatStore } from './store/chatStore'
import { useMemoryStore } from './store/memoryStore'
import { supabase } from './lib/supabase'
import { Toaster } from 'react-hot-toast'

export default function App() {
  const fetchAgents = useAgentStore(state => state.fetchAgents)
  const fetchModels = useModelStore(state => state.fetchModels)
  const fetchSkills = useSkillStore(state => state.fetchSkills)
  const fetchWorkflows = useWorkflowStore(state => state.fetchWorkflows)
  const fetchConversations = useChatStore(state => state.fetchConversations)
  const fetchMemory = useMemoryStore(state => state.fetchMemory)

  useEffect(() => {
    // Initial Hydration from Supabase
    fetchAgents()
    fetchModels()
    fetchSkills()
    fetchWorkflows()
    fetchConversations()
    fetchMemory()

    // Real-time Subscriptions
    const agentsChannel = supabase
      .channel('schema-db-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'agents' }, () => fetchAgents())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'conversations' }, () => fetchConversations())
      .on('postgres_changes', { event: '*', schema: 'public', table: 'messages' }, () => fetchConversations())
      .subscribe()

    return () => {
      supabase.removeChannel(agentsChannel)
    }
  }, [fetchAgents, fetchModels, fetchSkills, fetchWorkflows, fetchConversations, fetchMemory])

  return (
    <BrowserRouter>
      <Toaster position="top-right" />
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<Chat />} />
          <Route path="agents" element={<Agents />} />
          <Route path="models" element={<Models />} />
          <Route path="skills" element={<Skills />} />
          <Route path="memory" element={<Memory />} />
          <Route path="workflows" element={<Workflows />} />
          <Route path="settings" element={<ApplicationSettings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
