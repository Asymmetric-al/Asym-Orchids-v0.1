'use client'

import * as React from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { ThemeProvider } from '@/providers/theme-provider'
import {
  LayoutDashboard,
  Users,
  Rss,
  BarChart3,
  CheckSquare,
  User,
  Mail,
  Settings,
  Menu,
  LogOut,
  ChevronDown,
  Search,
  Download,
  Bell
} from 'lucide-react'

const navItems = [
  { href: '/missionary-dashboard', label: 'Dashboard', icon: LayoutDashboard },
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
        'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
        isActive
          ? 'bg-zinc-100 text-zinc-900'
          : 'text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900',
        collapsed && 'justify-center px-2'
      )}
    >
      <Icon className={cn(
        'h-[18px] w-[18px] shrink-0',
        isActive ? 'text-zinc-900' : 'text-zinc-500 group-hover:text-zinc-700'
      )} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  )
}

function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('flex h-full flex-col border-r border-zinc-200 bg-white', className)}>
      <div className="flex h-14 items-center border-b border-zinc-200 px-5">
        <Link href="/missionary-dashboard" className="flex items-center gap-2.5">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-zinc-900 text-white">
            <LayoutDashboard className="h-4 w-4" />
          </div>
          <div className="flex flex-col">
            <span className="text-sm font-semibold text-zinc-900">GIVEHOPE</span>
            <span className="text-[10px] font-medium uppercase tracking-wider text-zinc-500">Fieldworker Dashboard</span>
          </div>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-3 py-4">
        <div className="space-y-6">
          <nav className="flex flex-col gap-1">
            {navItems.slice(0, 2).map((item) => (
              <NavLink key={item.href} item={item} />
            ))}
          </nav>
          
          <div className="space-y-1">
            <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">Analytics</p>
            <nav className="flex flex-col gap-1">
              {navItems.slice(2, 5).map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>

          <div className="space-y-1">
            <p className="px-3 text-[11px] font-medium uppercase tracking-wider text-zinc-400">Communication</p>
            <nav className="flex flex-col gap-1">
              {navItems.slice(5).map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-zinc-200 px-3 py-3">
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
  return (
    <header className="sticky top-0 z-40 flex h-14 items-center justify-between border-b border-zinc-200 bg-white px-4 lg:px-6">
      <div className="flex items-center gap-3 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-64 p-0 border-r-zinc-200">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-4">
        <div className="relative max-w-xs flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-400" />
          <input
            type="search"
            placeholder="Search..."
            className="h-9 w-full rounded-lg border border-zinc-200 bg-white pl-9 pr-4 text-sm text-zinc-900 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-zinc-200 transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 relative">
          <Bell className="h-[18px] w-[18px]" />
          <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-rose-500" />
        </Button>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-2 px-2 py-1 h-auto hover:bg-zinc-100 rounded-lg">
              <Avatar className="h-8 w-8 border border-zinc-200">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-zinc-100 text-zinc-700 text-xs font-medium">
                  SM
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start">
                <span className="text-sm font-medium text-zinc-900">Sarah Mitchell</span>
                <span className="text-xs text-zinc-500">Missionary</span>
              </div>
              <ChevronDown className="h-4 w-4 text-zinc-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-lg border-zinc-200 p-1.5">
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-zinc-900">Sarah Mitchell</p>
              <p className="text-xs text-zinc-500">sarah.mitchell@example.com</p>
            </div>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuItem asChild className="rounded-md focus:bg-zinc-100 cursor-pointer">
              <Link href="/missionary-dashboard/profile">
                <User className="mr-2 h-4 w-4 text-zinc-500" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-md focus:bg-zinc-100 cursor-pointer">
              <Link href="/missionary-dashboard/settings">
                <Settings className="mr-2 h-4 w-4 text-zinc-500" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-zinc-100" />
            <DropdownMenuItem className="text-rose-600 focus:text-rose-700 focus:bg-rose-50 rounded-md cursor-pointer">
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
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <div className="flex h-screen overflow-hidden bg-zinc-50">
        <Sidebar className="hidden w-64 lg:flex" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}
