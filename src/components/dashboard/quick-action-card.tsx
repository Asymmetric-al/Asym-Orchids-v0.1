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
    <Card className={cn('group relative overflow-hidden border-dashed transition-colors hover:border-solid hover:border-border', className)}>
      <CardContent className="flex flex-col items-center justify-center py-8 text-center">
        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted transition-colors group-hover:bg-muted/80">
          <Icon className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-foreground" />
        </div>
        <h3 className="font-medium text-sm">{title}</h3>
        <p className="mt-1 text-xs text-muted-foreground max-w-[160px]">{description}</p>
        <Button
          variant="outline"
          size="sm"
          className="mt-4 h-8 text-xs"
          onClick={onAction}
        >
          {buttonLabel}
        </Button>
      </CardContent>
    </Card>
  )
})
