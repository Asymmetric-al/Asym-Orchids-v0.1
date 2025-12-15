'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Command, Search } from '../icons'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { NAV_ITEMS } from '@/lib/mission-control/nav'
import { TILES } from '@/lib/mission-control/tiles'
import { getIcon } from '../icons'
import { useMC } from '@/lib/mission-control/context'

export function GlobalSearch() {
  const [open, setOpen] = useState(false)
  const router = useRouter()
  const { role } = useMC()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((prev) => !prev)
      }
    }
    document.addEventListener('keydown', down)
    return () => document.removeEventListener('keydown', down)
  }, [])

  const filteredTiles = TILES.filter((tile) => tile.roles.includes(role))

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-64 justify-start text-sm text-muted-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span>Search...</span>
        <kbd className="pointer-events-none absolute right-2 hidden h-5 select-none items-center gap-1 rounded border bg-muted px-1.5 font-mono text-xs font-medium opacity-100 sm:flex">
          <Command className="h-3 w-3" />K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tiles, actions, people..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {filteredTiles.map((tile) => {
              const Icon = getIcon(tile.icon)
              return (
                <CommandItem
                  key={tile.id}
                  onSelect={() => {
                    router.push(`/mc${tile.route}`)
                    setOpen(false)
                  }}
                >
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{tile.title}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
          <CommandGroup heading="Quick Actions">
            {filteredTiles.slice(0, 4).flatMap((tile) =>
              tile.quickActions.slice(0, 2).map((action) => {
                const Icon = action.icon ? getIcon(action.icon) : Search
                return (
                  <CommandItem
                    key={`${tile.id}-${action.label}`}
                    onSelect={() => {
                      router.push(`/mc${action.href}`)
                      setOpen(false)
                    }}
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    <span>{action.label}</span>
                    <span className="ml-auto text-xs text-muted-foreground">{tile.title}</span>
                  </CommandItem>
                )
              })
            )}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
}
