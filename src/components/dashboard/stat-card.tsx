'use client'

import { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { TrendingUpIcon, TrendingDownIcon } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface StatCardProps {
  title: string
  value: string
  change?: {
    value: string
    type: 'increase' | 'decrease'
    label: string
  }
  icon: LucideIcon
  iconColor?: 'emerald' | 'blue' | 'violet' | 'amber' | 'rose' | 'primary'
  className?: string
}

export const StatCard = memo(function StatCard({
  title,
  value,
  change,
  icon: Icon,
  className
}: StatCardProps) {
  return (
    <Card className={cn('shadow-none', className)}>
      <CardContent className='flex items-center gap-3 px-4 py-3'>
        <Avatar className='size-8.5 rounded-sm'>
          <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
            <Icon className='size-5' />
          </AvatarFallback>
        </Avatar>
        <div className='flex flex-col gap-0.5'>
          <span className='text-muted-foreground text-sm font-medium'>{title}</span>
          <span className='text-lg font-medium'>{value}</span>
          {change && (
            <div
              className={cn(
                'flex items-center gap-1 text-xs font-medium',
                change.type === 'increase' ? 'text-primary' : 'text-rose-600'
              )}
            >
              {change.type === 'increase' ? (
                <TrendingUpIcon className='size-3' />
              ) : (
                <TrendingDownIcon className='size-3' />
              )}
              <span>
                {change.value} {change.label}
              </span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
})
