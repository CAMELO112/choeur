'use client'
import { useState } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useUser } from '../hooks/useUser'

export default function Upload() {
  const { user } = useUser()
  const [title, setTitle] = useState('')
  const [artistName, setArtistName] = useState('')
  const [file, setFile] = useState(null)
  const [message, setMessage] = useState(null)
  const [error, setError] = useState(null)

async function handleUpload(e) {
  e.preventDefault()
  setError(null)
  setMessage(null)

  if (!user) {
    setError('Tu dois etre connecte pour uploader un morceau.')
    return
  }
  if (!file) {
    setError('Choisis un fichier audio.')
    return
  }

  // Cree le profil s'il n'existe pas encore (au cas ou le trigger automatique aurait echoue)
  const { error: profileError } = await supabase.from('profiles').upsert(
    { id: user.id, username: user.email },
    { onConflict: 'id', ignoreDuplicates: true }
    )

  if (profileError) {
    setError('Erreur de profil : ' + profileError.message)
    return
  }

  const filePath = user.id + '/' + Date.now() + '_' + file.name
  const { error: uploadError } = await supabase.storage
  .from('audio')
  .upload(filePath, file)

  if (uploadError) {
    setError(uploadError.message)
    return
  }

  const { data: publicUrlData } = supabase.storage
  .from('audio')
  .getPublicUrl(filePath)

  const { error: insertError } = await supabase.from('tracks').insert({
    owner_id: user.id,
    title,
    artist_name: artistName,
    audio_url: publicUrlData.publicUrl,
  })

  if (insertError) {
    setError(insertError.message)
    return
  }

  setMessage('Morceau uploade avec succes !')
  setTitle('')
  setArtistName('')
  setFile(null)
}

return (
  <div className="form-box">
  <h1>Uploader un morceau</h1>
  <form onSubmit={handleUpload}>
  <input placeholder="Titre" value={title} onChange={(e) => setTitle(e.target.value)} required />
  <input placeholder="Artiste" value={artistName} onChange={(e) => setArtistName(e.target.value)} required />
  <input type="file" accept="audio/*" onChange={(e) => setFile(e.target.files[0])} required />
  <button type="submit" className="btn">Uploader</button>
  </form>
{error && <p className="error">{error}</p>}
 {message && <p className="success">{message}</p>}
   </div>
  )
 }
