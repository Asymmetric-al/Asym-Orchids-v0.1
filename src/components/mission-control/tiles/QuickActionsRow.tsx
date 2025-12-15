'use client'

import Link from 'next/link'
import { useMC } from '@/lib/mission-control/context'
import { TILES } from '@/lib/mission-control/tiles'
import { getIcon } from '../icons'
import { Button } from '@/components/ui/button'

const ROLE_QUICK_ACTIONS: Record<string, { tileId: string; actionIndex: number }[]> = {
  finance: [
    { tileId: 'contributions', actionIndex: 0 },
    { tileId: 'contributions', actionIndex: 1 },
    { tileId: 'reports', actionIndex: 0 },
    { tileId: 'pdf', actionIndex: 1 },
  ],
  fundraising: [
    { tileId: 'crm', actionIndex: 0 },
    { tileId: 'email', actionIndex: 0 },
    { tileId: 'crm', actionIndex: 3 },
    { tileId: 'reports', actionIndex: 0 },
  ],
  mobilizers: [
    { tileId: 'mobilize', actionIndex: 0 },
    { tileId: 'mobilize', actionIndex: 1 },
    { tileId: 'crm', actionIndex: 0 },
    { tileId: 'sign', actionIndex: 0 },
  ],
  member_care: [
    { tileId: 'care', actionIndex: 0 },
    { tileId: 'care', actionIndex: 1 },
    { tileId: 'support', actionIndex: 0 },
    { tileId: 'crm', actionIndex: 0 },
  ],
  events: [
    { tileId: 'events', actionIndex: 0 },
    { tileId: 'events', actionIndex: 1 },
    { tileId: 'contributions', actionIndex: 0 },
    { tileId: 'sign', actionIndex: 0 },
  ],
  staff: [
    { tileId: 'crm', actionIndex: 0 },
    { tileId: 'crm', actionIndex: 2 },
    { tileId: 'web-studio', actionIndex: 0 },
    { tileId: 'web-studio', actionIndex: 1 },
  ],
  admin: [
    { tileId: 'crm', actionIndex: 0 },
    { tileId: 'contributions', actionIndex: 0 },
    { tileId: 'reports', actionIndex: 0 },
    { tileId: 'admin', actionIndex: 2 },
  ],
}

export function QuickActionsRow() {
  const { role } = useMC()
  const actionRefs = ROLE_QUICK_ACTIONS[role] || ROLE_QUICK_ACTIONS.staff

  const actions = actionRefs
    .map(({ tileId, actionIndex }) => {
      const tile = TILES.find((t) => t.id === tileId)
      if (!tile) return null
      const action = tile.quickActions[actionIndex]
      if (!action) return null
      return { ...action, tile }
    })
    .filter(Boolean)
    .slice(0, 4)

  return (
    <div className="flex flex-wrap gap-3">
      {actions.map((action) => {
        if (!action) return null
        const Icon = action.icon ? getIcon(action.icon) : null
        return (
          <Link key={`${action.tile.id}-${action.label}`} href={`/mc${action.href}`}>
            <Button
              variant="secondary"
              size="sm"
              className="h-10 rounded-xl border border-slate-200/60 bg-white px-4 text-sm font-medium text-slate-700 shadow-sm transition-all hover:border-slate-300 hover:bg-slate-50 hover:text-slate-900 hover:shadow-md hover:-translate-y-0.5"
            >
              {Icon && <Icon className="mr-2.5 h-4 w-4 text-slate-500 group-hover:text-slate-900" />}
              {action.label}
            </Button>
          </Link>
        )
      })}
    </div>
  )
}