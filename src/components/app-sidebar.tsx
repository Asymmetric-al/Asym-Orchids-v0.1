'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import {
  Home,
  Users,
  Heart,
  Settings,
  BarChart3,
  UserCircle,
  Building2,
  CreditCard,
  FileText,
  Globe,
  Newspaper,
} from 'lucide-react'
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from '@/components/ui/sidebar'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'

type UserRole = 'donor' | 'missionary' | 'admin'

interface AppSidebarProps {
  role?: UserRole
  tenantLogo?: string
  tenantName?: string
}

const donorNavItems = [
  { title: 'Dashboard', href: '/donor-dashboard', icon: Home },
  { title: 'Feed', href: '/donor-dashboard', icon: Newspaper },
  { title: 'My Giving', href: '/donor-dashboard', icon: Heart },
  { title: 'Missionaries', href: '/donor-dashboard', icon: Users },
  { title: 'Giving History', href: '/donor-dashboard', icon: FileText },
  { title: 'Profile', href: '/donor-dashboard', icon: UserCircle },
]

const missionaryNavItems = [
  { title: 'Dashboard', href: '/missionary-dashboard', icon: Home },
  { title: 'My Feed', href: '/missionary-dashboard', icon: Newspaper },
  { title: 'My Supporters', href: '/missionary-dashboard', icon: Users },
  { title: 'Funding Goals', href: '/missionary-dashboard', icon: BarChart3 },
  { title: 'Updates', href: '/missionary-dashboard', icon: FileText },
  { title: 'Profile', href: '/missionary-dashboard', icon: UserCircle },
]

const adminNavItems = [
  { title: 'Dashboard', href: '/mc', icon: Home },
  { title: 'Missionaries', href: '/mc/missionaries', icon: Globe },
  { title: 'Donors', href: '/mc/donors', icon: Users },
  { title: 'Donations', href: '/mc/contributions', icon: CreditCard },
  { title: 'Reports', href: '/mc/reports', icon: BarChart3 },
  { title: 'Organization', href: '/mc/organization', icon: Building2 },
  { title: 'Settings', href: '/mc/settings', icon: Settings },
]

function getNavItems(role: UserRole) {
  switch (role) {
    case 'donor':
      return donorNavItems
    case 'missionary':
      return missionaryNavItems
    case 'admin':
      return adminNavItems
    default:
      return donorNavItems
  }
}

export function AppSidebar({ role = 'donor', tenantLogo, tenantName = 'asymmetric.al' }: AppSidebarProps) {
  const pathname = usePathname()
  const navItems = getNavItems(role)

  return (
    <Sidebar collapsible="icon" className="border-r-0">
      <SidebarHeader className="p-4">
        <Link href="/" className="flex items-center gap-3">
          {tenantLogo ? (
            <Avatar className="h-9 w-9 rounded-lg">
              <AvatarImage src={tenantLogo} alt={tenantName} />
              <AvatarFallback className="rounded-lg bg-primary text-primary-foreground">
                {tenantName.charAt(0)}
              </AvatarFallback>
            </Avatar>
          ) : (
            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-semibold">
              {tenantName.charAt(0)}
            </div>
          )}
          <span className="text-lg font-semibold tracking-tight group-data-[collapsible=icon]:hidden">
            {tenantName}
          </span>
        </Link>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-xs uppercase tracking-wider text-muted-foreground/70">
            Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {navItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathname === item.href}
                    tooltip={item.title}
                    className="h-10"
                  >
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter className="p-4">
        <div className="flex items-center gap-3 group-data-[collapsible=icon]:justify-center">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="bg-muted text-muted-foreground text-sm">U</AvatarFallback>
          </Avatar>
          <div className="flex flex-col group-data-[collapsible=icon]:hidden">
            <span className="text-sm font-medium">User Name</span>
            <span className="text-xs text-muted-foreground capitalize">{role}</span>
          </div>
        </div>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}