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
    <Card className="group relative flex flex-col overflow-hidden rounded-2xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-slate-200/50 hover:border-slate-300">
      <CardHeader className="relative z-10 pb-3 pt-5 px-5 pointer-events-none">
        <div className="flex items-start justify-between mb-4">
          <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-slate-50 border border-slate-100 text-slate-700 transition-colors group-hover:bg-slate-900 group-hover:text-white group-hover:border-slate-900 group-hover:shadow-md">
            <Icon className="h-6 w-6" />
          </div>
          <Link
            href={`/mc${tile.route}`}
            className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-50 text-slate-400 opacity-0 transition-all duration-200 hover:bg-slate-100 hover:text-slate-900 group-hover:opacity-100 pointer-events-auto"
          >
            <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <CardTitle className="text-lg font-bold text-slate-900">{tile.title}</CardTitle>
        <CardDescription className="text-sm text-slate-500 line-clamp-2 mt-1.5">
          {tile.purpose}
        </CardDescription>
      </CardHeader>
      <CardContent className="relative z-10 flex flex-1 flex-col gap-4 px-5 pb-5 pt-0 pointer-events-none">
        <div className="flex-1">
             <p className="text-xs font-medium text-slate-400 uppercase tracking-wider mb-2">Features</p>
             <p className="text-sm text-slate-600 leading-relaxed">{tile.inside}</p>
        </div>
        
        {tile.quickActions.length > 0 && (
          <div className="mt-auto pt-4 border-t border-slate-100 pointer-events-auto">
            <div className="flex flex-wrap gap-2">
              {tile.quickActions.slice(0, 3).map((action) => {
                const ActionIcon = action.icon ? getIcon(action.icon) : null
                return (
                  <Link key={action.label} href={`/mc${action.href}`} className="w-full">
                    <Button variant="ghost" size="sm" className="w-full justify-start h-8 text-xs font-medium text-slate-500 hover:text-slate-900 hover:bg-slate-50 px-2 rounded-lg">
                      {ActionIcon && <ActionIcon className="mr-2 h-3.5 w-3.5" />}
                      {action.label}
                    </Button>
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </CardContent>
      <Link href={`/mc${tile.route}`} className="absolute inset-0 z-0" aria-label={`Open ${tile.title}`}>
        <span className="sr-only">Open {tile.title}</span>
      </Link>
    </Card>
  )
}