import { useEffect, useState } from 'react'
import type { ReactNode } from 'react'
import { Navigate } from 'react-router-dom'
import { supabase } from '../../lib/supabase'
import type { Session } from '@supabase/supabase-js'

export function ProtectedRoute({ children }: { children: ReactNode }) {
    const [session, setSession] = useState<Session | null>(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        supabase.auth.getSession().then(({ data: { session } }) => {
            setSession(session)
            setLoading(false)
        })

        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((_event, session) => {
            setSession(session)
        })

        return () => subscription.unsubscribe()
    }, [])

    if (loading) {
        return <div className="h-screen w-screen flex items-center justify-center bg-background"><div className="w-8 h-8 rounded-full border-t-2 border-neon animate-spin"></div></div>
    }

    // NOTE: For development, we bypass auth. Remove `|| true` for production.
    if (!session && !import.meta.env.DEV) {
        return <Navigate to="/auth" replace />
    }

    return <>{children}</>
}
