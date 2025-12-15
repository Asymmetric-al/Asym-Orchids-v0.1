'use client'

import { memo, useMemo } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Skeleton } from '@/components/ui/skeleton'
import { StatCard } from '@/components/dashboard/stat-card'
import { ActivityItem } from '@/components/dashboard/activity-item'
import { TaskItem } from '@/components/dashboard/task-item'
import {
  UsersIcon,
  DollarSignIcon,
  ActivityIcon,
  GlobeIcon,
  BellIcon,
  CalendarIcon,
  PlusIcon,
  TrendingUpIcon,
  ChevronRightIcon,
  ArrowUpRightIcon,
  FilterIcon
} from 'lucide-react'

const RevenueChart = dynamic(
  () => import('@/components/dashboard/charts/revenue-chart').then(mod => ({ default: mod.RevenueChart })),
  {
    ssr: false,
    loading: () => <ChartSkeleton height={280} />
  }
)

const WeeklyChart = dynamic(
  () => import('@/components/dashboard/charts/weekly-chart').then(mod => ({ default: mod.WeeklyChart })),
  {
    ssr: false,
    loading: () => <ChartSkeleton height={200} />
  }
)

const ChartSkeleton = memo(function ChartSkeleton({ height }: { height: number }) {
  return (
    <div className='space-y-3' style={{ height }}>
      <div className='flex items-end justify-between gap-2'>
        {[60, 40, 80, 55, 70, 45, 65].map((h, i) => (
          <Skeleton key={i} className='flex-1' style={{ height: `${h}%` }} />
        ))}
      </div>
    </div>
  )
})

const REVENUE_DATA = [
  { name: 'Jan', revenue: 2400, donors: 145 },
  { name: 'Feb', revenue: 1398, donors: 132 },
  { name: 'Mar', revenue: 9800, donors: 201 },
  { name: 'Apr', revenue: 3908, donors: 178 },
  { name: 'May', revenue: 4800, donors: 189 },
  { name: 'Jun', revenue: 3800, donors: 167 },
  { name: 'Jul', revenue: 4300, donors: 195 }
] as const

const WEEKLY_DATA = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 900 },
  { day: 'Wed', amount: 1600 },
  { day: 'Thu', amount: 1100 },
  { day: 'Fri', amount: 2100 },
  { day: 'Sat', amount: 800 },
  { day: 'Sun', amount: 1400 }
] as const

const ACTIVITY_DATA = [
  { id: 1, initials: 'SJ', name: 'Sarah Johnson', action: 'New Donation', detail: '$150.00', time: '2 min ago', colorVariant: 'emerald' as const },
  { id: 2, initials: 'JD', name: 'John Doe', action: 'Missionary Approved', detail: 'South East Asia', time: '1 hour ago', colorVariant: 'blue' as const },
  { id: 3, initials: 'CW', name: 'Clean Water', action: 'Goal Reached', detail: '$10,000', time: '3 hours ago', colorVariant: 'violet' as const },
  { id: 4, initials: 'MK', name: 'Mike Kim', action: 'Report Submitted', detail: 'Q4 Summary', time: '5 hours ago', colorVariant: 'amber' as const }
] as const

const TASKS_DATA = [
  { id: 1, title: 'Review missionary applications', dueDate: 'Today', priority: 'high' as const },
  { id: 2, title: 'Send monthly newsletter', dueDate: 'Tomorrow', priority: 'medium' as const },
  { id: 3, title: 'Quarterly donor report', dueDate: 'Dec 20', priority: 'low' as const }
] as const

const StatsGrid = memo(function StatsGrid() {
  const stats = useMemo(
    () => [
      {
        title: 'Total Revenue',
        value: '$45,231.89',
        change: { value: '20.1%', type: 'increase' as const, label: 'from last month' },
        icon: DollarSignIcon
      },
      {
        title: 'Active Missionaries',
        value: '24',
        change: { value: '2 new', type: 'increase' as const, label: 'this month' },
        icon: GlobeIcon
      },
      {
        title: 'Active Donors',
        value: '573',
        change: { value: '12%', type: 'increase' as const, label: 'since last quarter' },
        icon: UsersIcon
      },
      {
        title: 'Active Projects',
        value: '12',
        change: { value: '1', type: 'decrease' as const, label: 'completed recently' },
        icon: ActivityIcon
      }
    ],
    []
  )

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
      {stats.map((stat) => (
        <StatCard key={stat.title} {...stat} />
      ))}
    </div>
  )
})

const RevenueSection = memo(function RevenueSection() {
  return (
    <Card className='shadow-none lg:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <TrendingUpIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Revenue Overview</CardTitle>
            <p className='text-muted-foreground text-sm'>Monthly revenue for the current year</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs' asChild>
          <Link href='/mc/reports'>
            View Report <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <RevenueChart data={[...REVENUE_DATA]} />
        <div className='mt-4 flex items-center justify-between border-t pt-4 text-sm'>
          <div className='text-primary flex items-center gap-2'>
            <TrendingUpIcon className='size-4' />
            <span>
              Trending up by <span className='font-medium'>5.2%</span> this month
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
})

const WeeklySection = memo(function WeeklySection() {
  const weeklyTotal = useMemo(() => WEEKLY_DATA.reduce((sum, d) => sum + d.amount, 0), [])

  return (
    <Card className='shadow-none lg:col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <CalendarIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>This Week</CardTitle>
            <p className='text-muted-foreground text-sm'>Daily donation totals</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <WeeklyChart data={[...WEEKLY_DATA]} />
        <div className='mt-4 flex items-center justify-between border-t pt-4'>
          <div className='text-sm'>
            Total: <span className='font-semibold'>${weeklyTotal.toLocaleString()}</span>
          </div>
          <Badge className='bg-primary/10 text-primary border-0 text-xs font-medium'>+23% vs last week</Badge>
        </div>
      </CardContent>
    </Card>
  )
})

const ActivitySection = memo(function ActivitySection() {
  return (
    <Card className='shadow-none lg:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <BellIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Recent Activity</CardTitle>
            <p className='text-muted-foreground text-sm'>Latest actions across your organization</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs' asChild>
          <Link href='/mc/reports'>
            View All <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y'>
          {ACTIVITY_DATA.map((item) => (
            <ActivityItem key={item.id} {...item} />
          ))}
        </div>
        <div className='border-t p-4'>
          <Button variant='outline' size='sm' className='h-8 w-full border-dashed text-xs' asChild>
            <Link href='/mc/reports'>
              View all activity
              <ChevronRightIcon className='ml-1 size-3' />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

const TasksSection = memo(function TasksSection() {
  return (
    <Card className='shadow-none lg:col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <ActivityIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Upcoming Tasks</CardTitle>
            <p className='text-muted-foreground text-sm'>Your scheduled items</p>
          </div>
        </div>
        <Button variant='ghost' size='icon' className='size-7'>
          <PlusIcon className='size-4' />
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y'>
          {TASKS_DATA.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </div>
        <div className='border-t p-4'>
          <Button variant='outline' size='sm' className='h-8 w-full border-dashed text-xs'>
            View all tasks
            <ChevronRightIcon className='ml-1 size-3' />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

const QuickActionsGrid = memo(function QuickActionsGrid() {
  const actions = [
    { icon: UsersIcon, title: 'Invite Team Members', description: 'Collaborate with your team', href: '/mc/admin' },
    { icon: GlobeIcon, title: 'Add Missionary', description: 'Expand your mission reach', href: '/mc/crm' },
    { icon: ActivityIcon, title: 'Create Campaign', description: 'Launch a new fundraiser', href: '/mc/contributions' }
  ]

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className='group cursor-pointer shadow-none transition-all hover:border-primary/50 hover:shadow-sm'>
            <CardContent className='flex flex-col items-center justify-center gap-2 px-4 py-6 text-center'>
              <Avatar className='size-10 rounded-sm transition-transform group-hover:scale-105'>
                <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                  <action.icon className='size-5' />
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0.5'>
                <h3 className='text-sm font-medium transition-colors group-hover:text-primary'>{action.title}</h3>
                <p className='text-muted-foreground max-w-[180px] text-xs'>{action.description}</p>
              </div>
            </CardContent>
          </Card>
        </Link>
      ))}
    </div>
  )
})

export default function MissionControlPage() {
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }, [])

  return (
    <div className='min-h-full space-y-4 p-4 md:p-6'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Dashboard Overview</h1>
          <p className='text-muted-foreground text-sm'>Here&apos;s what&apos;s happening with your mission today</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-8 gap-1.5'>
            <CalendarIcon className='size-3.5' />
            {today}
          </Button>
          <Button variant='outline' size='sm' className='h-8 gap-1.5'>
            <FilterIcon className='size-3.5' />
            <span className='hidden sm:inline'>Filter</span>
          </Button>
          <Button size='sm' className='h-8 gap-1.5'>
            <PlusIcon className='size-3.5' />
            <span className='hidden sm:inline'>New Update</span>
          </Button>
        </div>
      </div>

      <StatsGrid />

      <div className='grid gap-4 lg:grid-cols-7'>
        <RevenueSection />
        <WeeklySection />
      </div>

      <div className='grid gap-4 lg:grid-cols-7'>
        <ActivitySection />
        <TasksSection />
      </div>

      <QuickActionsGrid />
    </div>
  )
}
