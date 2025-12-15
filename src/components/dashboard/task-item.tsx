'use client'

import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontalIcon, ClockIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface TaskItemProps {
  title: string
  dueDate: string
  priority: 'high' | 'medium' | 'low'
  onMenuClick?: () => void
}

const priorityColors = {
  high: 'bg-rose-500',
  medium: 'bg-amber-500',
  low: 'bg-emerald-500'
} as const

export const TaskItem = memo(function TaskItem({
  title,
  dueDate,
  priority,
  onMenuClick
}: TaskItemProps) {
  return (
    <div className='group flex cursor-pointer items-start gap-3 px-6 py-3 transition-colors hover:bg-muted/50'>
      <div className={cn('mt-1.5 size-2 shrink-0 rounded-full', priorityColors[priority])} />
      <div className='min-w-0 flex-1'>
        <p className='text-sm font-medium transition-colors group-hover:text-primary'>{title}</p>
        <div className='text-muted-foreground mt-0.5 flex items-center gap-1 text-xs'>
          <ClockIcon className='size-3' />
          <span>{dueDate}</span>
        </div>
      </div>
      <Button
        variant='ghost'
        size='icon'
        className='size-6 opacity-0 transition-opacity group-hover:opacity-100'
        onClick={(e) => {
          e.stopPropagation()
          onMenuClick?.()
        }}
      >
        <MoreHorizontalIcon className='size-3' />
      </Button>
    </div>
  )
})
