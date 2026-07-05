'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'

export function useUser() {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setUser(data.session ? data.session.user : null)
    setLoading(false)
  })
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session ? session.user : null)
  })
  return () => {
    listener.subscription.unsubscribe()
  }
}, [])

return { user, loading }
}
