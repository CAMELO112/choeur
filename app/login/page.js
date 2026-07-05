'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useRouter } from 'next/navigation'

export default function Login() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [error, setError] = useState(null)
const router = useRouter()

async function handleLogin(e) {
e.preventDefault()
setError(null)
const { error } = await supabase.auth.signInWithPassword({ email, password })
if (error) {
setError(error.message)
return
}
router.push('/')
}

return (
<div className="form-box">
<h1>Connexion</h1>
<form onSubmit={handleLogin}>
<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
<button type="submit" className="btn">Se connecter</button>
</form>
{error && <p className="error">{error}</p>}
</div>
)
}
