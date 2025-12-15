'use client'

import { useLiveQuery } from '@tanstack/react-db'
import {
  postsCollection,
  profilesCollection,
  missionariesCollection,
  donorsCollection,
  donationsCollection,
  fundsCollection,
  followsCollection,
  postCommentsCollection,
} from './collections'
import type { Post, Profile, Donation, Fund, PostComment } from '@/types/database'

interface PostWithAuthorQuery extends Post {
  author: Profile | null
}

interface DonationWithDetailsQuery extends Donation {
  donor: Profile | null
  fund: Fund | null
}

interface CommentWithAuthorQuery extends PostComment {
  author: Profile | null
}

export function usePostsWithAuthors(missionaryId?: string) {
  return useLiveQuery((q) => {
    let postsQuery = q.from(postsCollection)
    
    if (missionaryId) {
      postsQuery = postsQuery.where('missionary_id', '=', missionaryId)
    }
    
    return postsQuery
      .join(
        q.from(missionariesCollection),
        (post) => post.missionary_id,
        (missionary) => missionary.id
      )
      .join(
        q.from(profilesCollection),
        (_, missionary) => missionary.profile_id,
        (profile) => profile.id
      )
      .select((post, _missionary, profile) => ({
        ...post,
        author: profile,
      }))
      .orderBy('created_at', 'desc')
  })
}

export function usePostsForFollowedMissionaries(donorId: string) {
  return useLiveQuery((q) => {
    const followedMissionaryIds = q
      .from(followsCollection)
      .where('donor_id', '=', donorId)
      .select((follow) => follow.missionary_id)

    return q
      .from(postsCollection)
      .whereIn('missionary_id', followedMissionaryIds)
      .join(
        q.from(missionariesCollection),
        (post) => post.missionary_id,
        (missionary) => missionary.id
      )
      .join(
        q.from(profilesCollection),
        (_, missionary) => missionary.profile_id,
        (profile) => profile.id
      )
      .select((post, _missionary, profile) => ({
        ...post,
        author: profile,
      }))
      .orderBy('created_at', 'desc')
  })
}

export function useDonorGivingHistory(donorId: string) {
  return useLiveQuery((q) => {
    return q
      .from(donationsCollection)
      .where('donor_id', '=', donorId)
      .join(
        q.from(missionariesCollection),
        (donation) => donation.missionary_id,
        (missionary) => missionary.id
      )
      .join(
        q.from(profilesCollection),
        (_, missionary) => missionary.profile_id,
        (profile) => profile.id
      )
      .leftJoin(
        q.from(fundsCollection),
        (donation) => donation.fund_id,
        (fund) => fund.id
      )
      .select((donation, _missionary, profile, fund) => ({
        ...donation,
        missionary: profile,
        fund: fund || null,
      }))
      .orderBy('created_at', 'desc')
  })
}

export function useMissionarySupporters(missionaryId: string) {
  return useLiveQuery((q) => {
    return q
      .from(donationsCollection)
      .where('missionary_id', '=', missionaryId)
      .where('status', '=', 'completed')
      .join(
        q.from(donorsCollection),
        (donation) => donation.donor_id,
        (donor) => donor.id
      )
      .join(
        q.from(profilesCollection),
        (_, donor) => donor.profile_id,
        (profile) => profile.id
      )
      .groupBy((donation, _donor, profile) => profile.id)
      .select((_donation, _donor, profile) => ({
        ...profile,
        totalGiven: q.sum((d: Donation) => d.amount),
        donationCount: q.count(),
      }))
      .orderBy('totalGiven', 'desc')
  })
}

export function useCommentsWithAuthors(postId: string) {
  return useLiveQuery((q) => {
    return q
      .from(postCommentsCollection)
      .where('post_id', '=', postId)
      .join(
        q.from(profilesCollection),
        (comment) => comment.user_id,
        (profile) => profile.user_id
      )
      .select((comment, profile) => ({
        ...comment,
        author: profile,
      }))
      .orderBy('created_at', 'asc')
  })
}

export function useFundsWithProgress(missionaryId?: string) {
  return useLiveQuery((q) => {
    let fundsQuery = q.from(fundsCollection).where('is_active', '=', true)
    
    if (missionaryId) {
      fundsQuery = fundsQuery.where('missionary_id', '=', missionaryId)
    }
    
    return fundsQuery
      .leftJoin(
        q.from(missionariesCollection),
        (fund) => fund.missionary_id,
        (missionary) => missionary.id
      )
      .leftJoin(
        q.from(profilesCollection),
        (_, missionary) => missionary?.profile_id,
        (profile) => profile.id
      )
      .select((fund, _missionary, profile) => ({
        ...fund,
        missionary: profile || null,
        progressPercent: fund.target_amount > 0 
          ? Math.round((fund.current_amount / fund.target_amount) * 100) 
          : 0,
      }))
  })
}

export function useMissionaryDashboard(missionaryId: string) {
  return useLiveQuery((q) => {
    const donations = q
      .from(donationsCollection)
      .where('missionary_id', '=', missionaryId)
      .where('status', '=', 'completed')

    const totalRaised = donations
      .select((d) => d.amount)
      .reduce((sum, amount) => sum + amount, 0)

    const donorCount = donations
      .groupBy((d) => d.donor_id)
      .count()

    const recentDonations = donations
      .orderBy('created_at', 'desc')
      .limit(5)
      .join(
        q.from(donorsCollection),
        (donation) => donation.donor_id,
        (donor) => donor.id
      )
      .join(
        q.from(profilesCollection),
        (_, donor) => donor.profile_id,
        (profile) => profile.id
      )
      .select((donation, _donor, profile) => ({
        id: donation.id,
        amount: donation.amount,
        created_at: donation.created_at,
        donor_name: `${profile.first_name} ${profile.last_name}`,
      }))

    return {
      totalRaised,
      donorCount,
      recentDonations,
    }
  })
}
