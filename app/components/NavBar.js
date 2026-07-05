'use client'
import { useUser } from '../hooks/useUser'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function NavBar() {
  const { user, loading } = useUser()
  const router = useRouter()

async function handleLogout() {
  await supabase.auth.signOut()
  router.push('/')
  router.refresh()
}

return (
  <nav>
  <a href="/upload">Uploader</a>
  {!loading && user ? (
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
