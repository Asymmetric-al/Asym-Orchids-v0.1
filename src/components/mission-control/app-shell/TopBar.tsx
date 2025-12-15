'use client'

import { GlobalSearch } from './GlobalSearch'
import { NotificationsMenu } from './NotificationsMenu'
import { ProfileMenu } from './ProfileMenu'
import { TenantSwitcher } from './TenantSwitcher'
import { MobileSidebar } from './MobileSidebar'

export function TopBar() {
  return (
    <header className="flex h-14 items-center justify-between border-b border-border bg-background px-4 lg:px-6">
      <div className="flex items-center gap-2">
        <MobileSidebar />
        <GlobalSearch />
      </div>
      <div className="flex items-center gap-2">
        <TenantSwitcher />
        <NotificationsMenu />
        <ProfileMenu />
      </div>
    </header>
  )
}
