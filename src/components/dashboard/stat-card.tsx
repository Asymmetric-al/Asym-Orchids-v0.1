import { memo } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
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
  iconColor: 'emerald' | 'blue' | 'violet' | 'amber' | 'rose'
  className?: string
}

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-600 dark:text-emerald-400',
    gradient: 'via-emerald-500/50',
  },
  blue: {
    bg: 'bg-blue-500/10',
    text: 'text-blue-600 dark:text-blue-400',
    gradient: 'via-blue-500/50',
  },
  violet: {
    bg: 'bg-violet-500/10',
    text: 'text-violet-600 dark:text-violet-400',
    gradient: 'via-violet-500/50',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-600 dark:text-amber-400',
    gradient: 'via-amber-500/50',
  },
  rose: {
    bg: 'bg-rose-500/10',
    text: 'text-rose-600 dark:text-rose-400',
    gradient: 'via-rose-500/50',
  },
} as const

export const StatCard = memo(function StatCard({
  title,
  value,
  change,
  icon: Icon,
  iconColor,
  className,
}: StatCardProps) {
  const colors = colorMap[iconColor]
  const changeColors = change?.type === 'increase' ? colorMap.emerald : colorMap.rose

  return (
    <Card className={cn('group relative overflow-hidden', className)}>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-slate-700 dark:text-slate-200">
          {title}
        </CardTitle>
        <div className={cn('flex h-9 w-9 items-center justify-center rounded-lg', colors.bg)}>
          <Icon className={cn('h-4 w-4', colors.text)} />
        </div>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-semibold tracking-tight">{value}</div>
        {change && (
          <div className="mt-1.5 flex items-center gap-1.5 text-xs">
            <Badge
              variant="secondary"
              className={cn(
                'gap-0.5 rounded-md px-1.5 py-0.5 font-medium',
                changeColors.bg,
                changeColors.text,
                'hover:bg-transparent'
              )}
            >
              {change.type === 'increase' ? (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M17 7H7M17 7V17" />
                </svg>
              ) : (
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M17 7L7 17M7 17H17M7 17V7" />
                </svg>
              )}
              {change.value}
            </Badge>
            <span className="text-slate-600 dark:text-slate-300">{change.label}</span>
          </div>
        )}
      </CardContent>
      <div
        className={cn(
          'absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100',
          colors.gradient
        )}
      />
    </Card>
  )
})