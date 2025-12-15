'use client'

import { memo } from 'react'
import { GlobalSearch } from './GlobalSearch'
import { NotificationsMenu } from './NotificationsMenu'
import { ProfileMenu } from './ProfileMenu'
import { TenantSwitcher } from './TenantSwitcher'
import { MobileSidebar } from './MobileSidebar'
import { Separator } from '@/components/ui/separator'

export const TopBar = memo(function TopBar() {
  return (
    <header className="flex h-14 shrink-0 items-center justify-between border-b border-border bg-background px-4">
      <div className="flex items-center gap-3">
        <MobileSidebar />
        <GlobalSearch />
      </div>
      <div className="flex items-center gap-1">
        <TenantSwitcher />
        <Separator orientation="vertical" className="mx-2 h-6" />
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  )
})
