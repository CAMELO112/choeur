'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'

export default function Signup() {
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')
const [username, setUsername] = useState('')
const [message, setMessage] = useState(null)
const [error, setError] = useState(null)

async function handleSignup(e) {
e.preventDefault()
setError(null)
setMessage(null)
const { data, error } = await supabase.auth.signUp({ email, password })
if (error) {
setError(error.message)
return
}
if (data.user) {
await supabase.from('profiles').insert({
id: data.user.id,
username,
})
}
setMessage('Compte cree ! Verifie ton email pour confirmer ton inscription.')
}

return (
<div className="form-box">
<h1>Inscription</h1>
<form onSubmit={handleSignup}>
<input placeholder="Nom d'utilisateur" value={username} onChange={(e) => setUsername(e.target.value)} required />
<input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
<input type="password" placeholder="Mot de passe" value={password} onChange={(e) => setPassword(e.target.value)} required />
<button type="submit" className="btn">Creer mon compte</button>
</form>
{error && <p className="error">{error}</p>}
{message && <p className="success">{message}</p>}
</div>
)
}
