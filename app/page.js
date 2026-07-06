'use client'
import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabaseClient'
import { usePlayer } from './components/PlayerContext'
import LikeButton from './components/LikeButton'

const COLORS = [
    'linear-gradient(135deg,#f6d365,#fda085)',
    'linear-gradient(135deg,#a18cd1,#fbc2eb)',
    'linear-gradient(135deg,#84fab0,#8fd3f4)',
    'linear-gradient(135deg,#ff9a9e,#fecfef)',
    'linear-gradient(135deg,#30cfd0,#330867)',
    'linear-gradient(135deg,#f77062,#fe5196)',
    ]

function colorFor(id) {
    let hash = 0
    const str = String(id)
    for (let i = 0; i < str.length; i++) hash = str.charCodeAt(i) + ((hash << 5) - hash)
    return COLORS[Math.abs(hash) % COLORS.length]
}

export default function Home() {
    const [tracks, setTracks] = useState([])
    const [loading, setLoading] = useState(true)
    const { play, currentTrack, isPlaying } = usePlayer()

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
    <h1 className="page-title">Decouvrir</h1>
    {loading && <p className="muted">Chargement...</p>}
     {!loading && tracks.length === 0 && <p className="muted">Aucun morceau pour le moment.</p>}
      <div className="track-grid">
     {tracks.map((track) => {
         const color = colorFor(track.id)
         const playing = currentTrack && currentTrack.id === track.id && isPlaying
         return (
             <div className="track-card" key={track.id}>
             <div className="track-cover" style={{ background: color }} onClick={() => play({ ...track, color })}>
    <button className="track-play-btn" onClick={(e) => { e.stopPropagation(); play({ ...track, color }) }}>
    {playing ? 'Pause' : 'Play'}
    </button>
        </div>
    <p className="track-title">{track.title}</p>
    <p className="track-artist">{track.artist_name}</p>
    <LikeButton trackId={track.id} />
        </div>
    )
})}
</div>
    </div>
)
}
