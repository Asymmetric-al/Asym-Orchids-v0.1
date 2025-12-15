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
import { Badge } from '@/components/ui/badge'

export function MissionControlHome() {
  const { role } = useMC()
  const [showAllTools, setShowAllTools] = useState(false)

  const visibleTiles = TILES.filter((tile) => tile.roles.includes(role))
  const allTiles = TILES

  return (
    <div className="relative isolate min-h-full">
       <div className="pointer-events-none absolute inset-x-0 top-0 h-64 bg-gradient-to-b from-slate-50 via-white to-transparent" />
       
      <div className="relative space-y-10 p-6 lg:p-10 max-w-[1600px] mx-auto">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <div className="space-y-1.5">
            <h1 className="text-3xl font-bold tracking-tight text-slate-900">Mission Control</h1>
            <p className="text-base text-slate-500 max-w-2xl">
              Your command center. A curated workspace for your ministry operations.
            </p>
          </div>
          <div className="flex items-center gap-2">
             {/* Optional top actions could go here */}
          </div>
        </div>

        <div className="space-y-4">
          <h2 className="text-xs font-bold uppercase tracking-wider text-slate-400">Quick Actions</h2>
          <QuickActionsRow />
        </div>

        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <div className="space-y-1">
              <h2 className="text-lg font-semibold text-slate-900">Your Tools</h2>
              <p className="text-sm text-slate-500">Access your enabled modules and features.</p>
            </div>
            <Dialog open={showAllTools} onOpenChange={setShowAllTools}>
              <DialogTrigger asChild>
                <Button variant="ghost" size="sm" className="text-slate-500 hover:text-slate-900">
                  View all tools
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-3xl sm:rounded-2xl">
                <DialogHeader>
                  <DialogTitle>Mission Control Tools</DialogTitle>
                  <DialogDescription>
                    Complete list of all available tools and their access status.
                  </DialogDescription>
                </DialogHeader>
                <div className="grid gap-3 py-6 sm:grid-cols-2 lg:grid-cols-3">
                  {allTiles.map((tile) => {
                    const Icon = getIcon(tile.icon)
                    const hasAccess = tile.roles.includes(role)
                    return (
                      <div
                        key={tile.id}
                        className={`flex items-start gap-3 rounded-xl border p-4 transition-colors ${
                          hasAccess 
                            ? 'bg-white border-slate-200 hover:border-slate-300' 
                            : 'bg-slate-50 border-slate-100 opacity-60'
                        }`}
                      >
                        <div className={`flex h-9 w-9 items-center justify-center rounded-lg border ${
                          hasAccess ? 'bg-white border-slate-100 shadow-sm' : 'bg-slate-100 border-transparent'
                        }`}>
                          <Icon className={`h-4 w-4 ${hasAccess ? 'text-slate-700' : 'text-slate-400'}`} />
                        </div>
                        <div className="flex-1 min-w-0 space-y-1">
                          <p className="text-sm font-semibold text-slate-900">{tile.title}</p>
                          <div className="flex items-center gap-2">
                            <Badge variant="secondary" className={`h-5 px-1.5 text-[10px] font-medium ${
                              hasAccess 
                                ? 'bg-emerald-50 text-emerald-700 hover:bg-emerald-100' 
                                : 'bg-slate-100 text-slate-500'
                            }`}>
                              {hasAccess ? 'Available' : 'Locked'}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </DialogContent>
            </Dialog>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
            {visibleTiles.map((tile) => (
              <TileCard key={tile.id} tile={tile} />
            ))}
          </div>
        </div>

        <WorkflowsPanel />
      </div>
    </div>
  )
}