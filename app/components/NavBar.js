'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const [user, setUser] = useState(null)
  const [loaded, setLoaded] = useState(false)
  const router = useRouter()

useEffect(() => {
  supabase.auth.getSession().then(({ data }) => {
    setUser(data.session ? data.session.user : null)
    setLoaded(true)
  })
  const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
    setUser(session ? session.user : null)
  })
  return () => {
    listener.subscription.unsubscribe()
  }
}, [])

async function handleLogout() {
  await supabase.auth.signOut()
  setUser(null)
  router.push('/')
  router.refresh()
}

return (
  <nav>
  <a href="/upload">Uploader</a>
  {loaded && user ? (
    <>
    <span className="nav-user">{user.email}</span>
    <button onClick={handleLogout} className="btn-link">Deconnexion</button>
    </>
   ) : (
     <>
     <a href="/login">Connexion</a>
   <a href="/signup">Inscription</a>
     </>
   )}
  </nav>
  )
}
