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
      {groupLabel && <SidebarGroupLabel>{groupLabel}</SidebarGroupLabel>}
      <SidebarGroupContent>
        <SidebarMenu>
          {data.map(item =>
            item.items ? (
              <Collapsible className='group/collapsible' key={item.label}>
                <SidebarMenuItem>
                  <CollapsibleTrigger asChild>
                    <SidebarMenuButton tooltip={item.label}>
                      <item.icon />
                      <span>{item.label}</span>
                      <ChevronRightIcon className='ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90' />
                    </SidebarMenuButton>
                  </CollapsibleTrigger>
                  <CollapsibleContent>
                    <SidebarMenuSub>
                      {item.items.map(subItem => (
                        <SidebarMenuSubItem key={subItem.label}>
                          <SidebarMenuSubButton className='justify-between' asChild>
                            <a href={subItem.href}>
                              {subItem.label}
                              {subItem.badge && (
                                <span className='bg-primary/10 flex h-5 min-w-5 items-center justify-center rounded-full text-xs'>
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
                <SidebarMenuButton tooltip={item.label} asChild>
                  <a href={item.href}>
                    <item.icon />
                    <span>{item.label}</span>
                  </a>
                </SidebarMenuButton>
                {item.badge && <SidebarMenuBadge className='bg-primary/10 rounded-full'>{item.badge}</SidebarMenuBadge>}
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
    <header className='before:bg-background/60 sticky top-0 z-50 before:absolute before:inset-0 before:mask-[linear-gradient(var(--card),var(--card)_18%,transparent_100%)] before:backdrop-blur-md'>
      <div className='bg-card relative z-[51] mx-auto mt-3 flex w-[calc(100%-2rem)] max-w-[calc(1280px-3rem)] items-center justify-between rounded-xl border px-6 py-2 sm:w-[calc(100%-3rem)]'>
        <div className='flex items-center gap-1.5 sm:gap-4'>
          <SidebarTrigger className='[&_svg]:!size-5' />
          <Separator orientation='vertical' className='hidden !h-4 sm:block' />
          <SearchDialog
            trigger={
              <>
                <Button variant='ghost' className='hidden !bg-transparent px-1 py-0 font-normal sm:block'>
                  <div className='text-muted-foreground hidden items-center gap-1.5 text-sm sm:flex'>
                    <SearchIcon />
                    <span>Type to search...</span>
                  </div>
                </Button>
                <Button variant='ghost' size='icon' className='sm:hidden'>
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
              <Button variant='ghost' size='icon'>
                <LanguagesIcon />
              </Button>
            }
          />
          <ActivityDialog
            trigger={
              <Button variant='ghost' size='icon'>
                <ActivityIcon />
              </Button>
            }
          />
          <NotificationDropdown
            trigger={
              <Button variant='ghost' size='icon' className='relative'>
                <BellIcon />
                <span className='bg-destructive absolute top-2 right-2.5 size-2 rounded-full' />
              </Button>
            }
          />
          <ProfileDropdown
            trigger={
              <Button variant='ghost' size='icon' className='size-10'>
                <Avatar className='size-10 rounded-md'>
                  <AvatarImage src={user?.avatarUrl || 'https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png'} />
                  <AvatarFallback>{user?.name?.charAt(0) || 'U'}</AvatarFallback>
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
    <div className='flex min-h-dvh w-full'>
      <SidebarProvider>
        <Sidebar collapsible='icon'>
          <SidebarHeader>
            <SidebarMenu>
              <SidebarMenuItem>
                <SidebarMenuButton size='lg' className='gap-2.5 !bg-transparent [&>svg]:size-8' asChild>
                  <a href='/mc'>
                    <LogoSvg className='[&_rect]:fill-sidebar [&_rect:first-child]:fill-primary' />
                    <div className='flex flex-col items-start'>
                      <span className='text-lg font-semibold'>Mission Control</span>
                      <span className='text-xs font-light'>Admin Dashboard</span>
                    </div>
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            </SidebarMenu>
          </SidebarHeader>
          <SidebarContent>
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
          <footer>
            <div className='text-muted-foreground mx-auto flex size-full max-w-7xl items-center justify-between gap-3 px-4 py-3 max-sm:flex-col sm:gap-6 sm:px-6'>
              <p className='text-sm text-balance max-sm:text-center'>
                {`©${new Date().getFullYear()}`}{' '}
                <a href='#' className='text-primary'>
                  Mission Control
                </a>
                , Made for better mission management
              </p>
              <div className='flex items-center gap-5'>
                <a href='#'>
                  <FacebookIcon className='size-4' />
                </a>
                <a href='#'>
                  <InstagramIcon className='size-4' />
                </a>
                <a href='#'>
                  <LinkedinIcon className='size-4' />
                </a>
                <a href='#'>
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

export default function MCLayout({ children }: { children: ReactNode }) {
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
