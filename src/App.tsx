
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import { AppLayout } from './components/layout/AppLayout'
import { Dashboard } from './routes/Dashboard'
import { Agents } from './routes/Agents'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<AppLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="chat" element={<div className="text-white text-2xl font-bold p-8">Chat System Placeholder</div>} />
          <Route path="agents" element={<Agents />} />
          <Route path="skills" element={<div className="text-white text-2xl font-bold p-8">Skills Studio Placeholder</div>} />
          <Route path="memory" element={<div className="text-white text-2xl font-bold p-8">Memory Browser Placeholder</div>} />
          <Route path="workflows" element={<div className="text-white text-2xl font-bold p-8">Workflow Canvas Placeholder</div>} />
          <Route path="settings" element={<div className="text-white text-2xl font-bold p-8">Settings Placeholder</div>} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
