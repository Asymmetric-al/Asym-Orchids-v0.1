import { memo } from 'react'
import { Button } from '@/components/ui/button'
import { MoreHorizontal } from 'lucide-react'
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
  low: 'bg-emerald-500',
} as const

export const TaskItem = memo(function TaskItem({
  title,
  dueDate,
  priority,
  onMenuClick,
}: TaskItemProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-3.5">
      <div className={cn('h-2 w-2 rounded-full shrink-0', priorityColors[priority])} />
      <div className="flex-1 min-w-0 space-y-0.5">
        <p className="text-sm font-medium leading-none truncate">{title}</p>
        <p className="text-xs text-muted-foreground">{dueDate}</p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
        onClick={onMenuClick}
      >
        <MoreHorizontal className="h-4 w-4" />
      </Button>
    </div>
  )
})
