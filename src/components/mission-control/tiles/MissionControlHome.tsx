'use client'

import { useState } from 'react'
import { useMC } from '@/lib/mission-control/context'
import { TILES } from '@/lib/mission-control/tiles'
import { TileCard } from './TileCard'
import { QuickActionsRow } from './QuickActionsRow'
import { WorkflowsPanel } from './WorkflowsPanel'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import { getIcon } from '../icons'

export function MissionControlHome() {
  const { role } = useMC()
  const [showAllTools, setShowAllTools] = useState(false)

  const visibleTiles = TILES.filter((tile) => tile.roles.includes(role))
  const allTiles = TILES

  return (
    <div className="space-y-8 p-6 lg:p-8">
      <div className="space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">Mission Control</h1>
        <p className="text-muted-foreground">
          Your command center. A small set of surfaces, deep links, and quick actions to get work done.
        </p>
      </div>

      <div className="space-y-3">
        <h2 className="text-sm font-medium text-muted-foreground">Quick Actions</h2>
        <QuickActionsRow />
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your Tools</h2>
          <Dialog open={showAllTools} onOpenChange={setShowAllTools}>
            <DialogTrigger asChild>
              <Button variant="link" size="sm" className="h-auto p-0 text-xs">
                View all tools
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>All Mission Control Tools</DialogTitle>
                <DialogDescription>
                  Complete list of all available tools in Mission Control
                </DialogDescription>
              </DialogHeader>
              <div className="grid gap-2 py-4 sm:grid-cols-2">
                {allTiles.map((tile) => {
                  const Icon = getIcon(tile.icon)
                  const hasAccess = tile.roles.includes(role)
                  return (
                    <div
                      key={tile.id}
                      className={`flex items-center gap-3 rounded-lg border p-3 ${
                        hasAccess ? 'bg-card' : 'bg-muted/50 opacity-60'
                      }`}
                    >
                      <div className={`flex h-8 w-8 items-center justify-center rounded-md ${
                        hasAccess ? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                      }`}>
                        <Icon className="h-4 w-4" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">{tile.title}</p>
                        <p className="text-xs text-muted-foreground">
                          {hasAccess ? 'Available' : 'No access'}
                        </p>
                      </div>
                    </div>
                  )
                })}
              </div>
            </DialogContent>
          </Dialog>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {visibleTiles.map((tile) => (
            <TileCard key={tile.id} tile={tile} />
          ))}
        </div>
      </div>

      <WorkflowsPanel />
    </div>
  )
}
