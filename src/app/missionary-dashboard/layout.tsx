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
        'group flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all duration-200',
        isActive
          ? 'bg-emerald-50 text-emerald-700'
          : 'text-slate-500 hover:bg-slate-100/80 hover:text-slate-900',
        collapsed && 'justify-center px-2'
      )}
    >
      <Icon className={cn(
        'h-5 w-5 shrink-0 transition-colors',
        isActive ? 'text-emerald-600' : 'text-slate-400 group-hover:text-slate-600'
      )} />
      {!collapsed && <span>{item.label}</span>}
    </Link>
  )
}

function Sidebar({ className }: { className?: string }) {
  return (
    <aside className={cn('flex h-full flex-col border-r border-slate-200/60 bg-white/80 backdrop-blur-xl supports-[backdrop-filter]:bg-white/60', className)}>
      <div className="flex h-16 items-center px-6">
        <Link href="/missionary-dashboard" className="flex items-center gap-2.5 group">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-sm transition-transform group-hover:scale-105">
            <LayoutDashboard className="h-5 w-5" />
          </div>
          <span className="font-bold text-lg tracking-tight text-slate-900">Missionary</span>
        </Link>
      </div>

      <ScrollArea className="flex-1 px-4 py-4">
        <div className="space-y-6">
          <div className="space-y-1">
            <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Overview</p>
            <nav className="flex flex-col gap-1">
              {navItems.slice(0, 4).map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>
          
          <div className="space-y-1">
            <p className="px-2 text-xs font-bold uppercase tracking-wider text-slate-400 mb-3">Management</p>
            <nav className="flex flex-col gap-1">
              {navItems.slice(4).map((item) => (
                <NavLink key={item.href} item={item} />
              ))}
            </nav>
          </div>
        </div>
      </ScrollArea>

      <div className="border-t border-slate-200/60 px-4 py-4">
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
    <header className="sticky top-0 z-40 flex h-16 items-center justify-between border-b border-slate-200/60 bg-white/80 px-6 backdrop-blur-md supports-[backdrop-filter]:bg-white/60">
      <div className="flex items-center gap-4 lg:hidden">
        <Sheet>
          <SheetTrigger asChild>
            <Button variant="ghost" size="icon" className="lg:hidden -ml-2 text-slate-500 hover:text-slate-900 hover:bg-slate-100">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="w-72 p-0 border-r-slate-200">
            <Sidebar />
          </SheetContent>
        </Sheet>
      </div>

      <div className="hidden lg:flex lg:flex-1 lg:items-center lg:gap-4">
        <div className="relative max-w-sm flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            placeholder="Search donors, transactions, or tasks..."
            className="h-10 w-full rounded-xl border-none bg-slate-100 pl-10 pr-4 text-sm text-slate-900 placeholder:text-slate-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:bg-white transition-all"
          />
        </div>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" className="text-slate-500 hover:text-slate-900 hover:bg-slate-100 rounded-xl relative">
          <Bell className="h-5 w-5" />
          <span className="absolute top-2.5 right-2.5 h-2 w-2 rounded-full bg-rose-500 border-2 border-white" />
        </Button>
        <div className="h-6 w-px bg-slate-200 mx-1" />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="flex items-center gap-3 px-2 py-1.5 h-auto hover:bg-slate-100 rounded-xl">
              <Avatar className="h-9 w-9 border-2 border-white shadow-sm">
                <AvatarImage src="/placeholder-avatar.jpg" />
                <AvatarFallback className="bg-emerald-100 text-emerald-700 font-bold">
                  SM
                </AvatarFallback>
              </Avatar>
              <div className="hidden md:flex flex-col items-start text-sm">
                <span className="font-semibold text-slate-900">Sarah Mitchell</span>
                <span className="text-xs text-slate-500">Missionary</span>
              </div>
              <ChevronDown className="h-4 w-4 text-slate-400" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56 rounded-xl border-slate-200 p-2">
            <div className="px-2 py-2">
              <p className="text-sm font-medium text-slate-900">Sarah Mitchell</p>
              <p className="text-xs text-slate-500">sarah.mitchell@example.com</p>
            </div>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem asChild className="rounded-lg focus:bg-slate-100 cursor-pointer">
              <Link href="/missionary-dashboard/profile">
                <User className="mr-2 h-4 w-4 text-slate-500" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild className="rounded-lg focus:bg-slate-100 cursor-pointer">
              <Link href="/missionary-dashboard/settings">
                <Settings className="mr-2 h-4 w-4 text-slate-500" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator className="bg-slate-100" />
            <DropdownMenuItem className="text-rose-600 focus:text-rose-700 focus:bg-rose-50 rounded-lg cursor-pointer">
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
      <div className="flex h-screen overflow-hidden bg-slate-50/50">
        <Sidebar className="hidden w-[280px] lg:flex" />
        <div className="flex flex-1 flex-col overflow-hidden">
          <TopBar />
          <main className="flex-1 overflow-y-auto bg-slate-50/50">
            {children}
          </main>
        </div>
      </div>
    </ThemeProvider>
  )
}