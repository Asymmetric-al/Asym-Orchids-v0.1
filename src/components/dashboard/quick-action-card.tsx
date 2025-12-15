import { memo } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { LucideIcon } from 'lucide-react'

export interface QuickActionCardProps {
  icon: LucideIcon
  title: string
  description: string
  buttonLabel: string
  onAction?: () => void
  className?: string
}

export const QuickActionCard = memo(function QuickActionCard({
  icon: Icon,
  title,
  description,
  buttonLabel,
  onAction,
  className,
}: QuickActionCardProps) {
  return (
    <Card className={cn('group relative overflow-hidden border border-slate-200/90 transition-colors hover:border-slate-300', className)}>
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 transition-colors group-hover:bg-slate-200">
          <Icon className="h-5 w-5 text-slate-700 transition-colors group-hover:text-slate-900" />
        </div>
        <h3 className="font-medium text-sm text-slate-800">{title}</h3>
        <p className="mt-1 text-xs text-slate-600 max-w-[180px]">{description}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 h-8 text-xs border-slate-300 text-slate-800 hover:text-slate-900"
          onClick={onAction}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  )
})