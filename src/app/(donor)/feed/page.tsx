'use client'

import { useQuery, useMutation } from '@tanstack/react-query'
import { Spinner } from '@/components/ui/spinner'
import { FeedPost } from '@/components/feed'
import type { PostWithAuthor } from '@/types/database'

export default function DonorFeedPage() {
  const { data, isLoading, error } = useQuery({
    queryKey: ['posts'],
    queryFn: async () => {
      const res = await fetch('/api/posts')
      if (!res.ok) throw new Error('Failed to fetch posts')
      return res.json()
    },
    staleTime: 60000,
  })

  const likeMutation = useMutation({
    mutationFn: async ({ postId, liked }: { postId: string; liked: boolean }) => {
      const res = await fetch(`/api/posts/${postId}/like`, {
        method: liked ? 'POST' : 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to update like')
      return res.json()
    },
  })

  const prayerMutation = useMutation({
    mutationFn: async ({ postId, prayed }: { postId: string; prayed: boolean }) => {
      const res = await fetch(`/api/posts/${postId}/prayer`, {
        method: prayed ? 'POST' : 'DELETE',
      })
      if (!res.ok) throw new Error('Failed to update prayer')
      return res.json()
    },
  })

  const handleLike = (postId: string, liked: boolean) => {
    likeMutation.mutate({ postId, liked })
  }

  const handlePrayer = (postId: string, prayed: boolean) => {
    prayerMutation.mutate({ postId, prayed })
  }

  const posts: PostWithAuthor[] = data?.posts ?? []

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Feed</h1>
        <p className="text-muted-foreground">Updates from missionaries you support</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Spinner className="size-8" />
        </div>
      ) : error ? (
        <div className="py-12 text-center text-muted-foreground">
          Failed to load posts. Please try again.
        </div>
      ) : posts.length === 0 ? (
        <div className="py-12 text-center text-muted-foreground">
          No posts yet. Follow missionaries to see their updates here!
        </div>
      ) : (
        <div className="mx-auto max-w-xl space-y-6">
          {posts.map((post) => (
            <FeedPost
              key={post.id}
              post={post}
              onLike={handleLike}
              onPrayer={handlePrayer}
            />
          ))}
        </div>
      )}
    </div>
  )
}
