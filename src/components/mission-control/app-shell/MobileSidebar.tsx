'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useMC } from '@/lib/mission-control/context'
import { getMainNavItems, getToolsNavItems } from '@/lib/mission-control/nav'
import { getIcon, Menu, LayoutDashboard } from '../icons'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from '@/components/ui/sheet'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function MobileSidebar() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()
  const { role } = useMC()

  const mainItems = getMainNavItems(role)
  const toolsItems = getToolsNavItems(role)

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/mc' || pathname === '/mc/'
    return pathname.startsWith(`/mc${route}`)
  }

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="h-9 w-9 lg:hidden">
          <Menu className="h-5 w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="w-72 p-0">
        <SheetHeader className="flex h-14 flex-row items-center border-b border-border px-4">
          <Link href="/mc" className="flex items-center gap-2" onClick={() => setOpen(false)}>
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <LayoutDashboard className="h-4 w-4" />
            </div>
            <SheetTitle className="font-semibold">Mission Control</SheetTitle>
          </Link>
        </SheetHeader>
        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-1 px-2">
            {mainItems.map((item) => {
              const Icon = getIcon(item.icon)
              const active = isActive(item.route)
              return (
                <Link
                  key={item.id}
                  href={item.route === '/' ? '/mc' : `/mc${item.route}`}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                    'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                    active
                      ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                      : 'text-sidebar-foreground'
                  )}
                >
                  <Icon className="h-4 w-4 shrink-0" />
                  <span>{item.title}</span>
                </Link>
              )
            })}

            {toolsItems.length > 0 && (
              <>
                <Separator className="my-2" />
                <span className="px-3 py-1 text-xs font-medium text-muted-foreground">Tools</span>
                {toolsItems.map((item) => {
                  const Icon = getIcon(item.icon)
                  const active = isActive(item.route)
                  return (
                    <Link
                      key={item.id}
                      href={`/mc${item.route}`}
                      onClick={() => setOpen(false)}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        active
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </Link>
                  )
                })}
              </>
            )}
          </nav>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  )
}
