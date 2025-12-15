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
          'flex flex-col border-r border-border bg-background transition-all duration-200',
          sidebarCollapsed ? 'w-[60px]' : 'w-[240px]'
        )}
      >
        <div className={cn(
          'flex h-14 items-center border-b border-border',
          sidebarCollapsed ? 'justify-center px-2' : 'justify-between px-4'
        )}>
          {!sidebarCollapsed && (
            <Link href="/mc" className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
                <LayoutDashboard className="h-3.5 w-3.5" />
              </div>
              <span className="font-semibold text-sm tracking-tight">Mission Control</span>
            </Link>
          )}
          {sidebarCollapsed && (
            <div className="flex h-7 w-7 items-center justify-center rounded-md bg-foreground text-background">
              <LayoutDashboard className="h-3.5 w-3.5" />
            </div>
          )}
        </div>

        <ScrollArea className="flex-1">
          <nav className="flex flex-col gap-0.5 p-2">
            {mainItems.map((item) => {
              const Icon = getIcon(item.icon)
              const active = isActive(item.route)
              return (
                <Tooltip key={item.id}>
                  <TooltipTrigger asChild>
                    <Link
                      href={item.route === '/' ? '/mc' : `/mc${item.route}`}
                      className={cn(
                        'group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all',
                        active
                          ? 'bg-secondary font-medium text-foreground'
                          : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                        sidebarCollapsed && 'justify-center px-2'
                      )}
                    >
                      <Icon className={cn(
                        'h-4 w-4 shrink-0 transition-colors',
                        active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                      )} />
                      {!sidebarCollapsed && <span>{item.title}</span>}
                    </Link>
                  </TooltipTrigger>
                  {sidebarCollapsed && (
                    <TooltipContent side="right" className="font-medium text-xs">
                      {item.title}
                    </TooltipContent>
                  )}
                </Tooltip>
              )
            })}

            {toolsItems.length > 0 && (
              <>
                <div className={cn(
                  'my-2 h-px bg-border',
                  sidebarCollapsed && 'mx-2'
                )} />
                {!sidebarCollapsed && (
                  <span className="mb-1 px-2.5 text-[11px] font-medium uppercase tracking-wider text-muted-foreground/70">
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
                            'group flex items-center gap-2.5 rounded-md px-2.5 py-2 text-sm transition-all',
                            active
                              ? 'bg-secondary font-medium text-foreground'
                              : 'text-muted-foreground hover:bg-secondary/50 hover:text-foreground',
                            sidebarCollapsed && 'justify-center px-2'
                          )}
                        >
                          <Icon className={cn(
                            'h-4 w-4 shrink-0 transition-colors',
                            active ? 'text-foreground' : 'text-muted-foreground group-hover:text-foreground'
                          )} />
                          {!sidebarCollapsed && <span>{item.title}</span>}
                        </Link>
                      </TooltipTrigger>
                      {sidebarCollapsed && (
                        <TooltipContent side="right" className="font-medium text-xs">
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

        <div className="border-t border-border p-2">
          <Button
            variant="ghost"
            size="sm"
            className={cn(
              'w-full justify-center text-muted-foreground hover:text-foreground',
              !sidebarCollapsed && 'justify-start px-2.5'
            )}
            onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          >
            {sidebarCollapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <>
                <ChevronLeft className="h-4 w-4 mr-2" />
                <span className="text-xs">Collapse</span>
              </>
            )}
          </Button>
        </div>
      </aside>
    </TooltipProvider>
  )
}
