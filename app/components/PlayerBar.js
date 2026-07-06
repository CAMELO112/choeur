'use client'
import { usePlayer } from './PlayerContext'
import LikeButton from './LikeButton'

function formatTime(t) {
    if (!t || isNaN(t)) return '0:00'
    const m = Math.floor(t / 60)
    const s = Math.floor(t % 60).toString().padStart(2, '0')
    return m + ':' + s
}

export default function PlayerBar() {
    const { currentTrack, isPlaying, progress, duration, toggle, seek } = usePlayer()
    if (!currentTrack) return null

function handleSeek(e) {
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    seek(ratio * duration)
}

const pct = duration ? (progress / duration) * 100 : 0

return (
    <div className="player-bar">
    <div className="player-info">
    <div className="player-cover" style={{ background: currentTrack.color }} />
<div className="player-text">
    <div className="player-title">{currentTrack.title}</div>
<div className="player-artist">{currentTrack.artist_name}</div>
    </div>
    </div>
<div className="player-controls">
    <button className="player-play" onClick={toggle}>{isPlaying ? 'Pause' : 'Play'}</button>
<span className="player-time">{formatTime(progress)}</span>
<div className="player-seek" onClick={handleSeek}>
    <div className="player-seek-fill" style={{ width: pct + '%' }} />
    </div>
<span className="player-time">{formatTime(duration)}</span>
    </div>
<div className="player-actions">
    <LikeButton trackId={currentTrack.id} />
    </div>
    </div>
)
}
