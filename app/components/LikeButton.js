'use client'
import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabaseClient'
import { useUser } from '../hooks/useUser'

export default function LikeButton({ trackId }) {
      const { user } = useUser()
      const [isLiked, setIsLiked] = useState(false)
      const [likeCount, setLikeCount] = useState(0)

  useEffect(() => {
          async function getLikeStatus() {
                    const { count } = await supabase
                      .from('likes')
                      .select('*', { count: 'exact', head: true })
                      .eq('track_id', trackId)
                    setLikeCount(count || 0)

            if (user) {
                        const { data } = await supabase
                          .from('likes')
                          .select('id')
                          .eq('track_id', trackId)
                          .eq('user_id', user.id)
                          .maybeSingle()
                        setIsLiked(!!data)
            }
          }
          getLikeStatus()
  }, [trackId, user])

  const handleLike = async () => {
          if (!user) return alert('Connectez-vous pour liker !')

          if (isLiked) {
                    await supabase.from('likes').delete().eq('track_id', trackId).eq('user_id', user.id)
                    setLikeCount(prev => prev - 1)
                    setIsLiked(false)
          } else {
                    await supabase.from('likes').insert({ track_id: trackId, user_id: user.id })
                    setLikeCount(prev => prev + 1)
                    setIsLiked(true)
          }
  }

  return (
          <button onClick={handleLike} style={{ color: isLiked ? 'red' : 'gray' }}>
      &#9829; {likeCount}
</button>
  )
}
