'use client'

import { useState, useEffect, useCallback, useMemo, memo } from 'react'
import { useRouter } from 'next/navigation'
import { Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { navigation } from '@/config/navigation'
import { useMC } from '../context'

export const GlobalSearch = memo(function GlobalSearch() {
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

  const filteredItems = useMemo(() => navigation.filter((item) => item.roles.includes(role)), [role])

  const handleSelect = useCallback(
    (path: string) => {
      router.push(path)
      setOpen(false)
    },
    [router]
  )

  return (
    <>
      <Button
        variant="outline"
        className="relative h-8 w-56 justify-start rounded-lg border-input bg-transparent px-3 text-sm text-muted-foreground shadow-none hover:bg-accent hover:text-accent-foreground"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-3.5 w-3.5" />
        <span className="hidden sm:inline-flex">Search...</span>
        <kbd className="pointer-events-none absolute right-1.5 hidden h-5 select-none items-center gap-0.5 rounded border bg-muted px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search tiles, actions, people..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup heading="Navigation">
            {filteredItems.map((item) => {
              const Icon = item.icon
              return (
                <CommandItem key={item.id} onSelect={() => handleSelect(item.href)}>
                  <Icon className="mr-2 h-4 w-4" />
                  <span>{item.title}</span>
                </CommandItem>
              )
            })}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  )
})
