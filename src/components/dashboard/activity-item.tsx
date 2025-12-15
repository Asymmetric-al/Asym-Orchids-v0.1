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
  emerald: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
  blue: 'bg-blue-500/10 text-blue-600 dark:text-blue-400',
  violet: 'bg-violet-500/10 text-violet-600 dark:text-violet-400',
  amber: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
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
    <div className="flex items-center gap-4 px-6 py-3.5 transition-colors hover:bg-muted/50">
      <Avatar className="h-10 w-10 border border-border/50">
        <AvatarFallback className={cn('text-xs font-medium', colorClasses[colorVariant])}>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className="flex-1 min-w-0 space-y-0.5">
        <div className="flex items-center gap-2">
          <p className="text-sm font-medium leading-none truncate">{action}</p>
          <Badge variant="outline" className="shrink-0 px-1.5 py-0 text-[10px] font-normal text-muted-foreground">
            {time}
          </Badge>
        </div>
        <p className="text-sm text-muted-foreground truncate">
          <span className="font-medium text-foreground">{detail}</span>
          {name && <span> from {name}</span>}
        </p>
      </div>
      <Button
        variant="ghost"
        size="icon"
        className="h-8 w-8 shrink-0 text-muted-foreground hover:text-foreground"
        onClick={onClick}
      >
        <ChevronRight className="h-4 w-4" />
      </Button>
    </div>
  )
})
