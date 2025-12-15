'use client'

import { Bell } from '../icons'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

const STUB_NOTIFICATIONS = [
  { id: '1', title: 'New donation received', description: '$500 from John Smith', time: '2m ago' },
  { id: '2', title: 'Background check complete', description: 'Sarah Johnson - Approved', time: '1h ago' },
  { id: '3', title: 'Event registration', description: '15 new registrations for Summer Conference', time: '3h ago' },
]

export function NotificationsMenu() {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative h-9 w-9">
          <Bell className="h-4 w-4" />
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground">
            {STUB_NOTIFICATIONS.length}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <DropdownMenuLabel className="flex items-center justify-between">
          Notifications
          <Button variant="ghost" size="sm" className="h-auto px-2 py-1 text-xs">
            Mark all read
          </Button>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        {STUB_NOTIFICATIONS.map((notification) => (
          <DropdownMenuItem key={notification.id} className="flex flex-col items-start gap-1 py-3">
            <span className="font-medium">{notification.title}</span>
            <span className="text-xs text-muted-foreground">{notification.description}</span>
            <span className="text-xs text-muted-foreground">{notification.time}</span>
          </DropdownMenuItem>
        ))}
        <DropdownMenuSeparator />
        <DropdownMenuItem className="justify-center text-sm font-medium">
          View all notifications
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
