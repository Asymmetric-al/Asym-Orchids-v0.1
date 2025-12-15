'use client'

import { memo } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { ChevronRightIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ActivityItemProps {
  initials: string
  name: string
  action: string
  detail: string
  time: string
  colorVariant: 'emerald' | 'blue' | 'violet' | 'amber' | 'rose'
  onClick?: () => void
}

const colorClasses = {
  emerald: 'bg-emerald-100 text-emerald-700',
  blue: 'bg-blue-100 text-blue-700',
  violet: 'bg-violet-100 text-violet-700',
  amber: 'bg-amber-100 text-amber-700',
  rose: 'bg-rose-100 text-rose-700'
} as const

export const ActivityItem = memo(function ActivityItem({
  initials,
  name,
  action,
  detail,
  time,
  colorVariant,
  onClick
}: ActivityItemProps) {
  return (
    <div
      className='group flex cursor-pointer items-center gap-3 px-6 py-3 transition-colors hover:bg-muted/50'
      onClick={onClick}
    >
      <Avatar className='size-8 border'>
        <AvatarFallback className={cn('text-xs font-medium', colorClasses[colorVariant])}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className='min-w-0 flex-1'>
        <div className='flex items-center gap-2'>
          <p className='truncate text-sm font-medium'>{action}</p>
          <Badge className='bg-primary/10 text-primary h-4 border-0 px-1 text-[10px] font-medium'>
            {time}
          </Badge>
        </div>
        <p className='text-muted-foreground text-xs'>
          <span className='font-medium text-foreground'>{detail}</span>
          {name && <span> from {name}</span>}
        </p>
      </div>
      <ChevronRightIcon className='text-muted-foreground size-4 transition-colors group-hover:text-foreground' />
    </div>
  )
})
