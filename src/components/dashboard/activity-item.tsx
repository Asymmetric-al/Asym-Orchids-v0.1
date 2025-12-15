import { memo } from 'react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

export interface ActivityItemProps {
  initials: string
  name: string
  action: string
  detail: string
  time: string
  colorVariant: 'emerald' | 'blue' | 'violet' | 'amber'
  onClick?: () => void
}

const colorClasses = {
  emerald: 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-700 dark:text-blue-400',
  violet: 'bg-violet-500/10 text-violet-700 dark:text-violet-400',
  amber: 'bg-amber-500/10 text-amber-700 dark:text-amber-400',
} as const

export const ActivityItem = memo(function ActivityItem({
  initials,
  name,
  action,
  detail,
  time,
  colorVariant,
  onClick,
}: ActivityItemProps) {
  return (
    <div className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-slate-50">
      <Avatar className="h-10 w-10 border border-slate-200">
        <AvatarFallback className={cn('text-xs font-medium', colorClasses[colorVariant])}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium leading-none truncate text-slate-900">{action}</p>
          <Badge variant="outline" className="shrink-0 px-1.5 py-0 text-[10px] font-normal text-slate-600 border-slate-300">
            {time}
          </Badge>
        </div>
        <p className="text-sm text-slate-600 truncate">
          <span className="font-medium text-slate-800">{detail}</span>
          {name && <span> from {name}</span>}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 text-slate-500 hover:text-slate-900 hover:bg-slate-100"
        onClick={onClick}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
})