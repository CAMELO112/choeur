'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Home() {
const [tracks, setTracks] = useState([])
const [loading, setLoading] = useState(true)

useEffect(() => {
async function loadTracks() {
const { data, error } = await supabase
.from('tracks')
.select('*')
.order('created_at', { ascending: false })
if (!error) setTracks(data)
setLoading(false)
}
loadTracks()
}, [])

return (
<div>
<h1>Decouvrir</h1>
{loading && <p>Chargement...</p>}
{!loading && tracks.length === 0 && <p>Aucun morceau pour le moment.</p>}
{tracks.map((track) => (
<div className="track-card" key={track.id}>
<p className="track-title">{track.title}</p>
<p className="track-artist">{track.artist_name}</p>
<audio controls src={track.audio_url}></audio>
</div>
))}
</div>
)
}
