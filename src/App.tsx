
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

export default function App() {
  return (
    <BrowserRouter>
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
