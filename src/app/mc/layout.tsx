'use client'

import type { ComponentType, ReactNode } from 'react'
import {
  ActivityIcon,
  BellIcon,
  ChartPieIcon,
  ChevronRightIcon,
  DollarSignIcon,
  FacebookIcon,
  InstagramIcon,
  LanguagesIcon,
  LayoutGridIcon,
  LinkedinIcon,
  MailIcon,
  SearchIcon,
  TwitterIcon,
  UsersIcon,
  HeartHandshakeIcon,
  CalendarIcon,
  FileTextIcon,
  GlobeIcon,
  PenToolIcon,
  SparklesIcon,
  LifeBuoyIcon,
  ShieldCheckIcon
} from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from '@/components/ui/collapsible'
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuBadge,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarProvider,
  SidebarTrigger
} from '@/components/ui/sidebar'

import LogoSvg from '@/assets/svg/logo'
import SearchDialog from '@/components/shadcn-studio/blocks/dialog-search'
import LanguageDropdown from '@/components/shadcn-studio/blocks/dropdown-language'
import ActivityDialog from '@/components/shadcn-studio/blocks/dialog-activity'
import NotificationDropdown from '@/components/shadcn-studio/blocks/dropdown-notification'
import ProfileDropdown from '@/components/shadcn-studio/blocks/dropdown-profile'

import { MCProvider, useMC } from '@/lib/mission-control/context'
import { ThemeProvider } from '@/providers/theme-provider'

type MenuSubItem = {
  label: string
  href: string
  badge?: string
}

type MenuItem = {
  icon: ComponentType
  label: string
} & (
  | {
      href: string
      badge?: string
      items?: never
    }
  | { href?: never; badge?: never; items: MenuSubItem[] }
)

const menuItems: MenuItem[] = [
  {
    icon: ChartPieIcon,
    label: 'Dashboard',
    href: '/mc'
  }
]

const modulesItems: MenuItem[] = [
  {
    icon: DollarSignIcon,
    label: 'Contributions',
    href: '/mc/contributions'
  },
  {
    icon: UsersIcon,
    label: 'CRM',
    href: '/mc/crm'
  },
  {
    icon: HeartHandshakeIcon,
    label: 'Member Care',
    href: '/mc/care'
  },
  {
    icon: CalendarIcon,
    label: 'Events',
    href: '/mc/events'
  },
  {
    icon: FileTextIcon,
    label: 'Reports',
    href: '/mc/reports'
  },
  {
    icon: LayoutGridIcon,
    label: 'Mobilize',
    href: '/mc/mobilize'
  }
]

const toolsItems: MenuItem[] = [
  {
    icon: MailIcon,
    label: 'Email Studio',
    href: '/mc/email'
  },
  {
    icon: GlobeIcon,
    label: 'Web Studio',
    href: '/mc/web-studio'
  },
  {
    icon: PenToolIcon,
    label: 'Sign',
    href: '/mc/sign'
  },
  {
    icon: FileTextIcon,
    label: 'PDF',
    href: '/mc/pdf'
  },
  {
    icon: SparklesIcon,
    label: 'Automations',
    href: '/mc/automations'
  }
]

const adminItems: MenuItem[] = [
  {
    icon: ShieldCheckIcon,
    label: 'Admin',
    href: '/mc/admin'
  },
  {
    icon: LifeBuoyIcon,
    label: 'Support',
    href: '/mc/support'
  }
]

const SidebarGroupedMenuItems = ({ data, groupLabel }: { data: MenuItem[]; groupLabel?: string }) => {
  return (
    <SidebarGroup>
      {groupLabel && <SidebarGroupLabel className="text-zinc-500 text-[11px] uppercase tracking-wider font-medium">{groupLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {data.map(item =>
            item.items ? (
              <Collapsible className='group/collapsible' key={item.label}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.label} className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100">
                      <item.icon />
                      <span>{item.label}</span>
                      <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map(subItem => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton className='justify-between text-zinc-600 hover:text-zinc-900' asChild>
                            <a href={subItem.href}>
                              {subItem.label}
                              {subItem.badge && (
                                <span className='bg-zinc-100 text-zinc-700 flex h-5 min-w-5 items-center justify-center rounded-full text-xs'>
                                  {subItem.badge}
                                </span>
                              )}
                            </a>
                          </SidebarMenuSubButton>
                        </SidebarMenuSubItem>
                      ))}
                    </SidebarMenuSub>
                  </CollapsibleContent>
                </SidebarMenuItem>
              </Collapsible>
            ) : (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton tooltip={item.label} className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100 data-[active=true]:bg-zinc-100 data-[active=true]:text-zinc-900" asChild>
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
                {item.badge && <SidebarMenuBadge className='bg-zinc-100 text-zinc-700 rounded-full'>{item.badge}</SidebarMenuBadge>}
              </SidebarMenuItem>
            )
          )}
        </SidebarMenu>
      </SidebarGroupContent>
    </SidebarGroup>
  )
}

function AppHeader() {
  const { user, signOut } = useMC()

  return (
    <header className='sticky top-0 z-50 bg-zinc-50'>
      <div className='bg-white relative z-[51] mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-[calc(1280px-3rem)] items-center justify-between rounded-lg border border-zinc-200 px-4 py-2 sm:w-[calc(100%-3rem)]'>
        <div className='flex items-center gap-1.5 sm:gap-3'>
          <SidebarTrigger className='[&_svg]:!size-5 text-zinc-600 hover:text-zinc-900' />
          <Separator orientation='vertical' className='hidden !h-4 bg-zinc-200 sm:block' />
          <SearchDialog
            trigger={
              <>
                <Button variant='ghost' className='hidden !bg-transparent px-1 py-0 font-normal sm:block'>
                  <div className='text-zinc-500 hidden items-center gap-1.5 text-sm sm:flex'>
                    <SearchIcon className="size-4" />
                    <span>Type to search...</span>
                  </div>
                </Button>
                <Button variant='ghost' size='icon' className='sm:hidden text-zinc-600'>
                  <SearchIcon />
                  <span className='sr-only'>Search</span>
                </Button>
              </>
            }
          />
        </div>
        <div className='flex items-center gap-1.5'>
          <LanguageDropdown
            trigger={
              <Button variant='ghost' size='icon' className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100">
                <LanguagesIcon className="size-[18px]" />
              </Button>
            }
          />
          <ActivityDialog
            trigger={
              <Button variant='ghost' size='icon' className="text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100">
                <ActivityIcon className="size-[18px]" />
              </Button>
            }
          />
          <NotificationDropdown
            trigger={
              <Button variant='ghost' size='icon' className='relative text-zinc-600 hover:text-zinc-900 hover:bg-zinc-100'>
                <BellIcon className="size-[18px]" />
                <span className='bg-rose-500 absolute top-2 right-2.5 size-2 rounded-full' />
              </Button>
            }
          />
          <ProfileDropdown
            trigger={
              <Button variant='ghost' size='icon' className='size-9'>
                <Avatar className='size-8 rounded-md border border-zinc-200'>
                  <AvatarImage src={user?.avatarUrl || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'} />
                  <AvatarFallback className="bg-zinc-100 text-zinc-700 text-xs">{user?.name?.charAt(0) || 'U'}</AvatarFallback>
                </Avatar>
              </Button>
            }
            user={user}
            onSignOut={signOut}
          />
        </div>
      </div>
    </header>
  )
}

function ApplicationShell({ children }: { children: ReactNode }) {
  return (
    <div className='flex min-h-dvh w-full bg-zinc-50'>
      <SidebarProvider>
        <Sidebar collapsible='icon' className="border-r border-zinc-200 bg-white">
          <SidebarHeader className="border-b border-zinc-200">
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg' className='gap-2.5 !bg-transparent [&>svg]:size-8' asChild>
                  <a href='/mc'>
                    <LogoSvg className='[&_rect]:fill-white [&_rect:first-child]:fill-zinc-900' />
                    <div className='flex flex-col items-start'>
                      <span className='text-sm font-semibold text-zinc-900'>Mission Control</span>
                      <span className='text-[10px] text-zinc-500'>Admin Dashboard</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent className="bg-white">
            <SidebarGroupedMenuItems data={menuItems} />
            <SidebarGroupedMenuItems data={modulesItems} groupLabel='Modules' />
            <SidebarGroupedMenuItems data={toolsItems} groupLabel='Tools' />
            <SidebarGroupedMenuItems data={adminItems} groupLabel='Admin' />
          </SidebarContent>
        </Sidebar>
        <div className='flex flex-1 flex-col'>
          <AppHeader />
          <main className='mx-auto size-full max-w-7xl flex-1 px-4 py-6 sm:px-6'>
            {children}
          </main>
          <footer className="bg-zinc-50 border-t border-zinc-200">
            <div className='text-zinc-500 mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-xs text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-zinc-900 hover:underline'>
                  Mission Control
                </a>
                , Made for better mission management
              </p>
              <div className='flex items-center gap-4'>
                <a href='#' className="text-zinc-400 hover:text-zinc-600">
                  <FacebookIcon className='size-4' />
                </a>
                <a href='#' className="text-zinc-400 hover:text-zinc-600">
                  <InstagramIcon className='size-4' />
                </a>
                <a href='#' className="text-zinc-400 hover:text-zinc-600">
                  <LinkedinIcon className='size-4' />
                </a>
                <a href='#' className="text-zinc-400 hover:text-zinc-600">
                  <TwitterIcon className='size-4' />
                </a>
              </div>
            </div>
          </footer>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default function MissionControlLayout({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MCProvider>
        <ApplicationShell>{children}</ApplicationShell>
      </MCProvider>
    </ThemeProvider>
  )
}
