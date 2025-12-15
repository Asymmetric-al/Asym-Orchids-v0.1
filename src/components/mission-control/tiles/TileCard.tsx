'use client'

import Link from 'next/link'
import type { Tile } from '@/lib/mission-control/types'
import { getIcon, ChevronRight } from '../icons'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

interface TileCardProps {
  tile: Tile
}

export function TileCard({ tile }: TileCardProps) {
  const Icon = getIcon(tile.icon)

  return (
    <Card className="group relative flex flex-col overflow-hidden transition-all hover:shadow-md hover:border-primary/20">
      <CardHeader className="pb-2">
        <div className="flex items-start justify-between">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 text-primary">
            <Icon className="h-5 w-5" />
          </div>
          <Link
            href={`/mc${tile.route}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-muted opacity-0 transition-opacity group-hover:opacity-100"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <CardTitle className="mt-3 text-base font-semibold">{tile.title}</CardTitle>
        <CardDescription className="text-sm">{tile.purpose}</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-3 pt-0">
        <p className="text-xs text-muted-foreground">{tile.inside}</p>
        <div className="mt-auto flex flex-wrap gap-1.5">
          {tile.quickActions.slice(0, 3).map((action) => {
            const ActionIcon = action.icon ? getIcon(action.icon) : null
            return (
              <Link key={action.label} href={`/mc${action.href}`}>
                <Button variant="outline" size="sm" className="h-7 text-xs">
                  {ActionIcon && <ActionIcon className="mr-1 h-3 w-3" />}
                  {action.label}
                </Button>
              </Link>
            )
          })}
        </div>
      </CardContent>
      <Link href={`/mc${tile.route}`} className="absolute inset-0" aria-label={`Open ${tile.title}`}>
        <span className="sr-only">Open {tile.title}</span>
      </Link>
    </Card>
  )
}
