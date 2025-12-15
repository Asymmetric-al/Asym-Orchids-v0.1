'use client'

import { DBProvider } from '@tanstack/react-db'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { useState, type ReactNode } from 'react'
import {
  profilesCollection,
  missionariesCollection,
  donorsCollection,
  postsCollection,
  postCommentsCollection,
  postLikesCollection,
  postPrayersCollection,
  donationsCollection,
  fundsCollection,
  recurringGivingCollection,
  followsCollection,
} from './collections'

const collections = [
  profilesCollection,
  missionariesCollection,
  donorsCollection,
  postsCollection,
  postCommentsCollection,
  postLikesCollection,
  postPrayersCollection,
  donationsCollection,
  fundsCollection,
  recurringGivingCollection,
  followsCollection,
]

interface TanStackDBProviderProps {
  children: ReactNode
}

export function TanStackDBProvider({ children }: TanStackDBProviderProps) {
  const [queryClient] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: 60 * 1000,
            gcTime: 5 * 60 * 1000,
            refetchOnWindowFocus: false,
          },
        },
      })
  )

  return (
    <QueryClientProvider client={queryClient}>
      <DBProvider collections={collections}>
        {children}
      </DBProvider>
    </QueryClientProvider>
  )
}
