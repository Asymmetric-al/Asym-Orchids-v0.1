'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import {
  Home,
  Users,
  Rss,
  BarChart3,
  CheckSquare,
  User,
  Mail,
  Bell,
  Settings,
  Menu,
  LogOut,
  ChevronDown,
  Search,
  Download,
} from 'lucide-react'

const navItems = [
  { href: '/missionary-dashboard', label: 'Dashboard', icon: Home },
  { href: '/missionary-dashboard/donors', label: 'Donors', icon: Users },
  { href: '/missionary-dashboard/feed', label: 'My Feed', icon: Rss },
  { href: '/missionary-dashboard/analytics', label: 'Analytics', icon: BarChart3 },
  { href: '/missionary-dashboard/tasks', label: 'Tasks', icon: CheckSquare },
  { href: '/missionary-dashboard/profile', label: 'Profile', icon: User },
  { href: '/missionary-dashboard/newsletter', label: 'Newsletter', icon: Mail },
]

const bottomNavItems = [
  { href: '/missionary-dashboard/settings', label: 'Settings', icon: Settings },
  { href: '/missionary-dashboard/export', label: 'Export', icon: Download },
]

function NavLink({ item, collapsed = false }: { item: typeof navItems[0]; collapsed?: boolean }) {
  const pathname = usePathname()
  const isActive = pathname === item.href || (item.href !== '/missionary-dashboard' && pathname.startsWith(item.href))
  const Icon = item.icon

  return (
    <Link
      href={item.href}
      className={cn(
        'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-200',
        'hover:bg-accent/80',
        isActive
          ? 'bg-primary text-primary-foreground shadow-sm'
          : 'text-muted-foreground hover:text-foreground',
        collapsed && 'justify-center px-2'
      )}
    >
      <Icon className="h-4 w-4 shrink-0" />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  )
}

function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('flex h-full flex-col border-r bg-card', className)}>
      <div className="flex h-16 items-center border-b px-4">
        <Link href="/missionary-dashboard" className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-emerald-500 to-teal-600 text-white font-bold text-sm">
            M
          </div>
          <span className="font-semibold tracking-tight">Missionary Hub</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
      </ScrollArea>

      <div className="border-t px-3 py-4">
        <nav className="flex flex-col gap-1">
          {bottomNavItems.map((item) => (
            <NavLink key={item.href} item={item} />
          ))}
        </nav>
      </div>
    </aside>
  )
}

function TopBar() {
  const [notificationCount] = React.useState(2)

  return (
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60 px-4 lg:px-6">
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-4">
        <div className="relative max-w-md flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search donors, tasks..."
            className="h-9 w-full rounded-lg border bg-background pl-9 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring/20"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {notificationCount > 0 && (
            <Badge
              variant="destructive"
              className="absolute -right-0.5 -top-0.5 h-4 min-w-4 rounded-full px-1 text-[10px]"
            >
              {notificationCount}
            </Badge>
          )}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 pl-2 pr-1">
              <Avatar className="h-7 w-7">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs">
                  SM
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium md:inline-block">Sarah Mitchell</span>
              <ChevronDown className="h-4 w-4 text-muted-foreground" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <div className="px-2 py-1.5">
              <p className="text-sm font-medium">Sarah Mitchell</p>
              <p className="text-xs text-muted-foreground">sarah.mitchell@example.com</p>
            </div>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link href="/missionary-dashboard/profile">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/missionary-dashboard/settings">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}

export default function MissionaryDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="flex h-screen overflow-hidden bg-background">
      <Sidebar className="hidden w-64 lg:flex" />
      <div className="flex flex-1 flex-col overflow-hidden">
        <TopBar />
        <main className="flex-1 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  )
}
