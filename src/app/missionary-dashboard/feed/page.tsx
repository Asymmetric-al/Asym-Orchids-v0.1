'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Heart,
  MessageCircle,
  Flame,
  MoreHorizontal,
  Plus,
  Image as ImageIcon,
  Video,
  Pin,
  Edit,
  Trash2,
  Eye,
  EyeOff,
  Settings,
  Users,
  Globe,
  Lock,
  Send,
  X,
} from 'lucide-react'

interface Post {
  id: string
  title?: string
  content: string
  status: 'draft' | 'pending' | 'published'
  isPinned: boolean
  likeCount: number
  prayerCount: number
  fireCount: number
  commentCount: number
  publishedAt?: string
  createdAt: string
  mediaUrls?: string[]
}

interface Comment {
  id: string
  userName: string
  content: string
  createdAt: string
}

const posts: Post[] = [
  {
    id: 'p1',
    title: 'Thank You for an Amazing Year!',
    content: 'As we approach the end of 2024, I wanted to take a moment to thank each of you who have supported our ministry this year. Your generosity has enabled us to reach over 200 youth through our education programs and see 15 young people come to faith. We are so grateful for your partnership!',
    status: 'published',
    isPinned: true,
    likeCount: 24,
    prayerCount: 18,
    fireCount: 8,
    commentCount: 5,
    publishedAt: '2024-12-10',
    createdAt: '2024-12-10',
  },
  {
    id: 'p2',
    title: 'Prayer Request: Upcoming Outreach',
    content: 'Next week we are hosting our biggest outreach event of the year. Please pray for good weather, open hearts, and for our team as we prepare. We are expecting over 100 attendees!',
    status: 'published',
    isPinned: false,
    likeCount: 15,
    prayerCount: 32,
    fireCount: 5,
    commentCount: 3,
    publishedAt: '2024-12-08',
    createdAt: '2024-12-08',
  },
  {
    id: 'p3',
    title: 'November Update: Stories from the Field',
    content: 'This month we had the privilege of visiting several villages and sharing the gospel with families who had never heard the good news before. One family in particular touched our hearts – a mother of three who had been searching for hope and found it in Jesus.',
    status: 'published',
    isPinned: false,
    likeCount: 18,
    prayerCount: 12,
    fireCount: 10,
    commentCount: 4,
    publishedAt: '2024-11-28',
    createdAt: '2024-11-28',
  },
  {
    id: 'p4',
    title: 'Draft: Christmas Celebration Plans',
    content: 'Working on plans for our Christmas celebration with the youth...',
    status: 'draft',
    isPinned: false,
    likeCount: 0,
    prayerCount: 0,
    fireCount: 0,
    commentCount: 0,
    createdAt: '2024-12-12',
  },
]

const comments: Comment[] = [
  { id: 'c1', userName: 'Thomas Smith', content: 'This is so encouraging! Praying for you all!', createdAt: '2024-12-10' },
  { id: 'c2', userName: 'Rebecca Johnson', content: 'Thank you for sharing this update. We are blessed to partner with you!', createdAt: '2024-12-11' },
  { id: 'c3', userName: 'Emily Garcia', content: 'Amen! God is so good!', createdAt: '2024-12-11' },
]

function PostCard({ post, onEdit }: { post: Post; onEdit?: () => void }) {
  const [showComments, setShowComments] = React.useState(false)
  const [userReactions, setUserReactions] = React.useState({ like: false, prayer: false, fire: false })

  const toggleReaction = (type: 'like' | 'prayer' | 'fire') => {
    setUserReactions(prev => ({ ...prev, [type]: !prev[type] }))
  }

  return (
    <Card className={`relative overflow-hidden ${post.isPinned ? 'border-amber-200 dark:border-amber-900/50' : ''}`}>
      {post.isPinned && (
        <div className="absolute top-3 right-3">
          <Badge variant="secondary" className="bg-amber-100 text-amber-700">
            <Pin className="h-3 w-3 mr-1" />
            Pinned
          </Badge>
        </div>
      )}
      {post.status === 'draft' && (
        <div className="absolute top-3 right-3">
          <Badge variant="secondary">
            <EyeOff className="h-3 w-3 mr-1" />
            Draft
          </Badge>
        </div>
      )}
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <Avatar className="h-10 w-10">
            <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
              SM
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <p className="font-medium">Sarah Mitchell</p>
              <span className="text-xs text-muted-foreground">
                {post.publishedAt ? new Date(post.publishedAt).toLocaleDateString() : 'Not published'}
              </span>
            </div>
            {post.title && <p className="font-semibold mt-1">{post.title}</p>}
          </div>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Edit className="mr-2 h-4 w-4" />
                Edit Post
              </DropdownMenuItem>
              {!post.isPinned && (
                <DropdownMenuItem>
                  <Pin className="mr-2 h-4 w-4" />
                  Pin to Top
                </DropdownMenuItem>
              )}
              {post.isPinned && (
                <DropdownMenuItem>
                  <Pin className="mr-2 h-4 w-4" />
                  Unpin
                </DropdownMenuItem>
              )}
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Post
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm leading-relaxed whitespace-pre-wrap">{post.content}</p>
        
        {post.status === 'published' && (
          <>
            <div className="flex items-center gap-1 pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 ${userReactions.like ? 'text-rose-600' : ''}`}
                onClick={() => toggleReaction('like')}
              >
                <Heart className={`h-4 w-4 ${userReactions.like ? 'fill-current' : ''}`} />
                <span className="text-xs">{post.likeCount + (userReactions.like ? 1 : 0)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 ${userReactions.prayer ? 'text-blue-600' : ''}`}
                onClick={() => toggleReaction('prayer')}
              >
                <span className="text-base">🙏</span>
                <span className="text-xs">{post.prayerCount + (userReactions.prayer ? 1 : 0)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className={`gap-1.5 ${userReactions.fire ? 'text-orange-600' : ''}`}
                onClick={() => toggleReaction('fire')}
              >
                <Flame className={`h-4 w-4 ${userReactions.fire ? 'fill-current' : ''}`} />
                <span className="text-xs">{post.fireCount + (userReactions.fire ? 1 : 0)}</span>
              </Button>
              <Button
                variant="ghost"
                size="sm"
                className="gap-1.5 ml-auto"
                onClick={() => setShowComments(!showComments)}
              >
                <MessageCircle className="h-4 w-4" />
                <span className="text-xs">{post.commentCount}</span>
              </Button>
            </div>

            {showComments && (
              <div className="space-y-3 pt-2 border-t">
                {comments.slice(0, 3).map(comment => (
                  <div key={comment.id} className="flex gap-2">
                    <Avatar className="h-7 w-7">
                      <AvatarFallback className="text-xs bg-muted">
                        {comment.userName.split(' ').map(n => n[0]).join('')}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex-1 bg-muted/50 rounded-lg p-2">
                      <div className="flex items-center gap-2">
                        <p className="text-xs font-medium">{comment.userName}</p>
                        <span className="text-xs text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString()}
                        </span>
                      </div>
                      <p className="text-sm mt-0.5">{comment.content}</p>
                    </div>
                  </div>
                ))}
                <div className="flex gap-2">
                  <Avatar className="h-7 w-7">
                    <AvatarFallback className="text-xs bg-gradient-to-br from-emerald-500 to-teal-600 text-white">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <Input placeholder="Write a comment..." className="h-8 text-sm" />
                </div>
              </div>
            )}
          </>
        )}

        {post.status === 'draft' && (
          <div className="flex gap-2 pt-2 border-t">
            <Button size="sm" className="flex-1">
              <Eye className="mr-2 h-4 w-4" />
              Publish
            </Button>
            <Button size="sm" variant="outline">
              <Edit className="mr-2 h-4 w-4" />
              Edit
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

function NewPostDialog() {
  const [open, setOpen] = React.useState(false)
  const [title, setTitle] = React.useState('')
  const [content, setContent] = React.useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <Plus className="mr-2 h-4 w-4" />
          New Post
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Create New Post</DialogTitle>
          <DialogDescription>Share an update with your supporters.</DialogDescription>
        </DialogHeader>
        <div className="space-y-4 py-4">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
                SM
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">Sarah Mitchell</p>
              <p className="text-xs text-muted-foreground">Posting to your feed</p>
            </div>
          </div>
          <Input
            placeholder="Post title (optional)"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Textarea
            placeholder="What's on your heart? Share a story, prayer request, or update..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none"
          />
          <div className="flex items-center gap-2 border-t pt-4">
            <Button variant="outline" size="sm">
              <ImageIcon className="mr-2 h-4 w-4" />
              Photo
            </Button>
            <Button variant="outline" size="sm">
              <Video className="mr-2 h-4 w-4" />
              Video
            </Button>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Save Draft
          </Button>
          <Button disabled={!content.trim()}>
            <Send className="mr-2 h-4 w-4" />
            Publish
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

function FeedSettings() {
  const [visibility, setVisibility] = React.useState<'public' | 'private' | 'off'>('public')
  const [commentsMode, setCommentsMode] = React.useState<'allow' | 'approve' | 'disable'>('allow')

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Settings className="h-5 w-5" />
          Feed Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-3">
          <p className="text-sm font-medium">Feed Visibility</p>
          <div className="grid gap-2">
            <Button
              variant={visibility === 'public' ? 'default' : 'outline'}
              className="justify-start h-auto py-3"
              onClick={() => setVisibility('public')}
            >
              <Globe className="mr-3 h-4 w-4" />
              <div className="text-left">
                <p className="font-medium">Public</p>
                <p className="text-xs opacity-80">Anyone can view your posts</p>
              </div>
            </Button>
            <Button
              variant={visibility === 'private' ? 'default' : 'outline'}
              className="justify-start h-auto py-3"
              onClick={() => setVisibility('private')}
            >
              <Lock className="mr-3 h-4 w-4" />
              <div className="text-left">
                <p className="font-medium">Private</p>
                <p className="text-xs opacity-80">Only approved followers</p>
              </div>
            </Button>
            <Button
              variant={visibility === 'off' ? 'default' : 'outline'}
              className="justify-start h-auto py-3"
              onClick={() => setVisibility('off')}
            >
              <EyeOff className="mr-3 h-4 w-4" />
              <div className="text-left">
                <p className="font-medium">Off</p>
                <p className="text-xs opacity-80">Hide feed completely</p>
              </div>
            </Button>
          </div>
        </div>

        <div className="space-y-3 pt-4 border-t">
          <p className="text-sm font-medium">Comment Settings</p>
          <div className="grid gap-2">
            <Button
              variant={commentsMode === 'allow' ? 'secondary' : 'ghost'}
              size="sm"
              className="justify-start"
              onClick={() => setCommentsMode('allow')}
            >
              Allow all comments
            </Button>
            <Button
              variant={commentsMode === 'approve' ? 'secondary' : 'ghost'}
              size="sm"
              className="justify-start"
              onClick={() => setCommentsMode('approve')}
            >
              Require approval
            </Button>
            <Button
              variant={commentsMode === 'disable' ? 'secondary' : 'ghost'}
              size="sm"
              className="justify-start"
              onClick={() => setCommentsMode('disable')}
            >
              Disable comments
            </Button>
          </div>
        </div>

        <div className="pt-4 border-t">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium">Followers</p>
              <p className="text-xs text-muted-foreground">Manage who can see your feed</p>
            </div>
            <Button variant="outline" size="sm">
              <Users className="mr-2 h-4 w-4" />
              42 followers
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function FeedPage() {
  const publishedPosts = posts.filter(p => p.status === 'published')
  const draftPosts = posts.filter(p => p.status === 'draft')

  return (
    <div className="p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">My Feed</h1>
          <p className="text-muted-foreground">Share updates and engage with your supporters.</p>
        </div>
        <NewPostDialog />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          <Tabs defaultValue="published">
            <TabsList>
              <TabsTrigger value="published">Published ({publishedPosts.length})</TabsTrigger>
              <TabsTrigger value="drafts">Drafts ({draftPosts.length})</TabsTrigger>
            </TabsList>
            <TabsContent value="published" className="space-y-4 mt-4">
              {publishedPosts.map(post => (
                <PostCard key={post.id} post={post} />
              ))}
            </TabsContent>
            <TabsContent value="drafts" className="space-y-4 mt-4">
              {draftPosts.length > 0 ? (
                draftPosts.map(post => (
                  <PostCard key={post.id} post={post} />
                ))
              ) : (
                <Card className="p-8 text-center">
                  <p className="text-muted-foreground">No drafts yet</p>
                </Card>
              )}
            </TabsContent>
          </Tabs>
        </div>
        <div className="space-y-4">
          <Card>
            <CardContent className="p-4">
              <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-medium">Engagement Overview</p>
              </div>
              <div className="grid grid-cols-3 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold">57</p>
                  <p className="text-xs text-muted-foreground">Likes</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">62</p>
                  <p className="text-xs text-muted-foreground">Prayers</p>
                </div>
                <div>
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Comments</p>
                </div>
              </div>
            </CardContent>
          </Card>
          <FeedSettings />
        </div>
      </div>
    </div>
  )
}
