'use client'
import { createContext, useContext, useRef, useState, useCallback } from 'react'

const PlayerContext = createContext(null)

export function PlayerProvider({ children }) {
    const audioRef = useRef(null)
    const [currentTrack, setCurrentTrack] = useState(null)
    const [isPlaying, setIsPlaying] = useState(false)
    const [progress, setProgress] = useState(0)
    const [duration, setDuration] = useState(0)

  const play = useCallback((track) => {
        if (!audioRef.current) return
        if (currentTrack && currentTrack.id === track.id) {
                if (isPlaying) {
                          audioRef.current.pause()
                          setIsPlaying(false)
                } else {
                          audioRef.current.play()
                          setIsPlaying(true)
                }
                return
        }
        setCurrentTrack(track)
        audioRef.current.src = track.audio_url
        audioRef.current.play()
        setIsPlaying(true)
  }, [currentTrack, isPlaying])

  const toggle = useCallback(() => {
        if (!audioRef.current || !currentTrack) return
        if (isPlaying) {
                audioRef.current.pause()
                setIsPlaying(false)
        } else {
                audioRef.current.play()
                setIsPlaying(true)
        }
  }, [isPlaying, currentTrack])

  const seek = useCallback((time) => {
        if (audioRef.current) audioRef.current.currentTime = time
  }, [])

  return (
        <PlayerContext.Provider value={{ currentTrack, isPlaying, progress, duration, play, toggle, seek }}>
{children}
      <audio
        ref={audioRef}
        onTimeUpdate={(e) => setProgress(e.target.currentTime)}
        onLoadedMetadata={(e) => setDuration(e.target.duration)}
        onEnded={() => setIsPlaying(false)}
      />
        </PlayerContext.Provider>
  )
}

export function usePlayer() {
    return useContext(PlayerContext)
}
