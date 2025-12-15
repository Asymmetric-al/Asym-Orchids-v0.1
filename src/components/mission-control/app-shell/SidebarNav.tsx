'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { useMC } from '@/lib/mission-control/context'
import { getMainNavItems, getToolsNavItems } from '@/lib/mission-control/nav'
import { getIcon, ChevronLeft, ChevronRight, LayoutDashboard } from '../icons'
import { Button } from '@/components/ui/button'
import { Tooltip, TooltipContent, TooltipTrigger, TooltipProvider } from '@/components/ui/tooltip'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'

export function SidebarNav() {
  const pathname = usePathname()
  const { role, sidebarCollapsed, setSidebarCollapsed } = useMC()

  const mainItems = getMainNavItems(role)
  const toolsItems = getToolsNavItems(role)

  const isActive = (route: string) => {
    if (route === '/') return pathname === '/mc' || pathname === '/mc/'
    return pathname.startsWith(`/mc${route}`)
  }

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={cn(
          'flex flex-col border-r border-border bg-sidebar transition-all duration-200',
          sidebarCollapsed ? 'w-16' : 'w-64'
        )}
      >
        <div className="flex h-14 items-center justify-between border-b border-border px-3">
          {!sidebarCollapsed && (
            <Link href="/mc" className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <LayoutDashboard className="h-4 w-4" />
              </div>
              <span className="font-semibold text-sm">Mission Control</span>
            </Link>
          )}
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 shrink-0"
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </Button>
        </div>

        <ScrollArea className="flex-1 py-2">
          <nav className="flex flex-col gap-1 px-2">
            {mainItems.map((item) => {
              const Icon = getIcon(item.icon)
              const active = isActive(item.route)
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.route === '/' ? '/mc' : `/mc${item.route}`}
                      className={cn(
                        'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                        'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                        active
                          ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                          : 'text-sidebar-foreground',
                        sidebarCollapsed && 'justify-center px-2'
                      )}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      {!sidebarCollapsed && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right" className="font-medium">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}

            {toolsItems.length > 0 && (
              <>
                <Separator className="my-2" />
                {!sidebarCollapsed && (
                  <span className="px-3 py-1 text-xs font-medium text-muted-foreground">
                    Tools
                  </span>
                )}
                {toolsItems.map((item) => {
                  const Icon = getIcon(item.icon)
                  const active = isActive(item.route)
                  return (
                    <Tooltip key={item.id}>
                      <TooltipTrigger asChild>
                        <Link
                          href={`/mc${item.route}`}
                          className={cn(
                            'flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                            'hover:bg-sidebar-accent hover:text-sidebar-accent-foreground',
                            active
                              ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                              : 'text-sidebar-foreground',
                            sidebarCollapsed && 'justify-center px-2'
                          )}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {!sidebarCollapsed && <span>{item.title}</span>}
                        </Link>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right" className="font-medium">
                          {item.title}
                        </TooltipContent>
                      )}
                    </Tooltip>
                  )
                })}
              </>
            )}
          </nav>
        </ScrollArea>
      </aside>
    </TooltipProvider>
  )
}
