import { createCollection, queryCollectionOptions } from '@tanstack/db'
import { z } from 'zod'
import type {
  Profile,
  Missionary,
  Donor,
  Post,
  PostComment,
  PostLike,
  PostPrayer,
  Donation,
  Fund,
  RecurringGiving,
  Follow,
} from '@/types/database'

const profileSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  user_id: z.string().uuid(),
  role: z.enum(['donor', 'missionary', 'admin']),
  first_name: z.string(),
  last_name: z.string(),
  email: z.string().email(),
  avatar_url: z.string().nullable(),
  created_at: z.string(),
  updated_at: z.string(),
})

const missionarySchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  profile_id: z.string().uuid(),
  bio: z.string().nullable(),
  mission_field: z.string().nullable(),
  funding_goal: z.number().default(0),
  current_funding: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
})

const donorSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  profile_id: z.string().uuid(),
  giving_preferences: z.record(z.unknown()).default({}),
  total_given: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
})

const postSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  missionary_id: z.string().uuid(),
  content: z.string(),
  media: z.array(z.object({
    url: z.string(),
    type: z.enum(['image', 'video']),
    width: z.number().optional(),
    height: z.number().optional(),
  })).default([]),
  like_count: z.number().default(0),
  prayer_count: z.number().default(0),
  comment_count: z.number().default(0),
  created_at: z.string(),
  updated_at: z.string(),
})

const postCommentSchema = z.object({
  id: z.string().uuid(),
  post_id: z.string().uuid(),
  user_id: z.string().uuid(),
  content: z.string(),
  created_at: z.string(),
})

const postLikeSchema = z.object({
  id: z.string().uuid(),
  post_id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.string(),
})

const postPrayerSchema = z.object({
  id: z.string().uuid(),
  post_id: z.string().uuid(),
  user_id: z.string().uuid(),
  created_at: z.string(),
})

const donationSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  donor_id: z.string().uuid(),
  missionary_id: z.string().uuid(),
  fund_id: z.string().uuid().nullable(),
  amount: z.number(),
  currency: z.string().default('usd'),
  stripe_payment_intent_id: z.string().nullable(),
  status: z.enum(['pending', 'completed', 'failed', 'refunded']).default('pending'),
  created_at: z.string(),
})

const fundSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  name: z.string(),
  description: z.string().nullable(),
  target_amount: z.number().default(0),
  current_amount: z.number().default(0),
  missionary_id: z.string().uuid().nullable(),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
})

const recurringGivingSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  donor_id: z.string().uuid(),
  missionary_id: z.string().uuid().nullable(),
  fund_id: z.string().uuid().nullable(),
  amount: z.number(),
  currency: z.string().default('usd'),
  frequency: z.enum(['weekly', 'biweekly', 'monthly', 'quarterly', 'yearly']),
  next_charge_date: z.string(),
  stripe_subscription_id: z.string().nullable(),
  is_active: z.boolean().default(true),
  created_at: z.string(),
  updated_at: z.string(),
})

const followSchema = z.object({
  id: z.string().uuid(),
  tenant_id: z.string().uuid(),
  donor_id: z.string().uuid(),
  missionary_id: z.string().uuid(),
  created_at: z.string(),
})

async function fetchFromApi<T>(endpoint: string, params?: Record<string, string>): Promise<T[]> {
  const url = new URL(endpoint, window.location.origin)
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      url.searchParams.set(key, value)
    })
  }
  const response = await fetch(url.toString(), { credentials: 'include' })
  if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`)
  const data = await response.json()
  return Array.isArray(data) ? data : data.data || []
}

export const profilesCollection = createCollection<Profile>(
  queryCollectionOptions({
    id: 'profiles',
    schema: profileSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const idFilter = query.where.find((w: { field: string }) => w.field === 'id')
        if (idFilter) params.id = idFilter.value
        const userIdFilter = query.where.find((w: { field: string }) => w.field === 'user_id')
        if (userIdFilter) params.user_id = userIdFilter.value
      }
      return fetchFromApi<Profile>('/api/profiles', params)
    },
  })
)

export const missionariesCollection = createCollection<Missionary>(
  queryCollectionOptions({
    id: 'missionaries',
    schema: missionarySchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const idFilter = query.where.find((w: { field: string }) => w.field === 'id')
        if (idFilter) params.id = idFilter.value
        const profileIdFilter = query.where.find((w: { field: string }) => w.field === 'profile_id')
        if (profileIdFilter) params.profile_id = profileIdFilter.value
      }
      return fetchFromApi<Missionary>('/api/missionaries', params)
    },
  })
)

export const donorsCollection = createCollection<Donor>(
  queryCollectionOptions({
    id: 'donors',
    schema: donorSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const idFilter = query.where.find((w: { field: string }) => w.field === 'id')
        if (idFilter) params.id = idFilter.value
        const profileIdFilter = query.where.find((w: { field: string }) => w.field === 'profile_id')
        if (profileIdFilter) params.profile_id = profileIdFilter.value
      }
      return fetchFromApi<Donor>('/api/donors', params)
    },
  })
)

export const postsCollection = createCollection<Post>(
  queryCollectionOptions({
    id: 'posts',
    schema: postSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const missionaryIdFilter = query.where.find((w: { field: string }) => w.field === 'missionary_id')
        if (missionaryIdFilter) params.missionary_id = missionaryIdFilter.value
      }
      if (query.limit) params.limit = String(query.limit)
      if (query.offset) params.offset = String(query.offset)
      return fetchFromApi<Post>('/api/posts', params)
    },
  })
)

export const postCommentsCollection = createCollection<PostComment>(
  queryCollectionOptions({
    id: 'post_comments',
    schema: postCommentSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const postIdFilter = query.where?.find((w: { field: string }) => w.field === 'post_id')
      if (!postIdFilter) return []
      return fetchFromApi<PostComment>(`/api/posts/${postIdFilter.value}/comments`)
    },
  })
)

export const postLikesCollection = createCollection<PostLike>(
  queryCollectionOptions({
    id: 'post_likes',
    schema: postLikeSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const postIdFilter = query.where?.find((w: { field: string }) => w.field === 'post_id')
      if (!postIdFilter) return []
      return fetchFromApi<PostLike>(`/api/posts/${postIdFilter.value}/likes`)
    },
  })
)

export const postPrayersCollection = createCollection<PostPrayer>(
  queryCollectionOptions({
    id: 'post_prayers',
    schema: postPrayerSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const postIdFilter = query.where?.find((w: { field: string }) => w.field === 'post_id')
      if (!postIdFilter) return []
      return fetchFromApi<PostPrayer>(`/api/posts/${postIdFilter.value}/prayers`)
    },
  })
)

export const donationsCollection = createCollection<Donation>(
  queryCollectionOptions({
    id: 'donations',
    schema: donationSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const donorIdFilter = query.where.find((w: { field: string }) => w.field === 'donor_id')
        if (donorIdFilter) params.donor_id = donorIdFilter.value
        const missionaryIdFilter = query.where.find((w: { field: string }) => w.field === 'missionary_id')
        if (missionaryIdFilter) params.missionary_id = missionaryIdFilter.value
        const statusFilter = query.where.find((w: { field: string }) => w.field === 'status')
        if (statusFilter) params.status = statusFilter.value
      }
      if (query.limit) params.limit = String(query.limit)
      return fetchFromApi<Donation>('/api/donations', params)
    },
  })
)

export const fundsCollection = createCollection<Fund>(
  queryCollectionOptions({
    id: 'funds',
    schema: fundSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const idFilter = query.where.find((w: { field: string }) => w.field === 'id')
        if (idFilter) params.id = idFilter.value
        const missionaryIdFilter = query.where.find((w: { field: string }) => w.field === 'missionary_id')
        if (missionaryIdFilter) params.missionary_id = missionaryIdFilter.value
        const isActiveFilter = query.where.find((w: { field: string }) => w.field === 'is_active')
        if (isActiveFilter) params.is_active = String(isActiveFilter.value)
      }
      return fetchFromApi<Fund>('/api/funds', params)
    },
  })
)

export const recurringGivingCollection = createCollection<RecurringGiving>(
  queryCollectionOptions({
    id: 'recurring_giving',
    schema: recurringGivingSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const donorIdFilter = query.where.find((w: { field: string }) => w.field === 'donor_id')
        if (donorIdFilter) params.donor_id = donorIdFilter.value
        const isActiveFilter = query.where.find((w: { field: string }) => w.field === 'is_active')
        if (isActiveFilter) params.is_active = String(isActiveFilter.value)
      }
      return fetchFromApi<RecurringGiving>('/api/recurring-giving', params)
    },
  })
)

export const followsCollection = createCollection<Follow>(
  queryCollectionOptions({
    id: 'follows',
    schema: followSchema,
    getKey: (item) => item.id,
    queryFn: async ({ query }) => {
      const params: Record<string, string> = {}
      if (query.where) {
        const donorIdFilter = query.where.find((w: { field: string }) => w.field === 'donor_id')
        if (donorIdFilter) params.donor_id = donorIdFilter.value
        const missionaryIdFilter = query.where.find((w: { field: string }) => w.field === 'missionary_id')
        if (missionaryIdFilter) params.missionary_id = missionaryIdFilter.value
      }
      return fetchFromApi<Follow>('/api/follows', params)
    },
  })
)
