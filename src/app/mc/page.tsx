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
          <Skeleton key={i} className='flex-1 bg-zinc-100' style={{ height: `${h}%` }} />
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
    <Card className='border-zinc-200 bg-white lg:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-zinc-100'>
            <TrendingUpIcon className='size-4 text-zinc-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Revenue Overview</CardTitle>
            <p className='text-xs text-zinc-500'>Monthly revenue for the current year</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs text-zinc-600 hover:text-zinc-900' asChild>
          <Link href='/mc/reports'>
            View Report <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <RevenueChart data={[...REVENUE_DATA]} />
        <div className='mt-4 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm'>
          <div className='text-emerald-600 flex items-center gap-2'>
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
    <Card className='border-zinc-200 bg-white lg:col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-zinc-100'>
            <CalendarIcon className='size-4 text-zinc-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>This Week</CardTitle>
            <p className='text-xs text-zinc-500'>Daily donation totals</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <WeeklyChart data={[...WEEKLY_DATA]} />
        <div className='mt-4 flex items-center justify-between border-t border-zinc-100 pt-4'>
          <div className='text-sm text-zinc-700'>
            Total: <span className='font-semibold text-zinc-900'>${weeklyTotal.toLocaleString()}</span>
          </div>
          <Badge variant='secondary' className='bg-emerald-50 text-emerald-700 border-0 text-xs font-medium'>+23% vs last week</Badge>
        </div>
      </CardContent>
    </Card>
  )
})

const ActivitySection = memo(function ActivitySection() {
  return (
    <Card className='border-zinc-200 bg-white lg:col-span-4'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-zinc-100'>
            <BellIcon className='size-4 text-zinc-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Recent Activity</CardTitle>
            <p className='text-xs text-zinc-500'>Latest actions across your organization</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs text-zinc-600 hover:text-zinc-900' asChild>
          <Link href='/mc/reports'>
            View All <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y divide-zinc-100'>
          {ACTIVITY_DATA.map((item) => (
            <ActivityItem key={item.id} {...item} />
          ))}
        </div>
        <div className='border-t border-zinc-100 p-4'>
          <Button variant='outline' size='sm' className='h-8 w-full border-dashed border-zinc-300 text-xs text-zinc-600' asChild>
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
    <Card className='border-zinc-200 bg-white lg:col-span-3'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-zinc-100'>
            <ActivityIcon className='size-4 text-zinc-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Upcoming Tasks</CardTitle>
            <p className='text-xs text-zinc-500'>Your scheduled items</p>
          </div>
        </div>
        <Button variant='ghost' size='icon' className='size-7 text-zinc-500 hover:text-zinc-700'>
          <PlusIcon className='size-4' />
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y divide-zinc-100'>
          {TASKS_DATA.map((task) => (
            <TaskItem key={task.id} {...task} />
          ))}
        </div>
        <div className='border-t border-zinc-100 p-4'>
          <Button variant='outline' size='sm' className='h-8 w-full border-dashed border-zinc-300 text-xs text-zinc-600'>
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
    { icon: UsersIcon, title: 'Invite Team Members', description: 'Collaborate with your team', href: '/mc/admin', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { icon: GlobeIcon, title: 'Add Missionary', description: 'Expand your mission reach', href: '/mc/crm', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { icon: ActivityIcon, title: 'Create Campaign', description: 'Launch a new fundraiser', href: '/mc/contributions', bgColor: 'bg-violet-50', iconColor: 'text-violet-600' }
  ]

  return (
    <div className='grid gap-4 sm:grid-cols-3'>
      {actions.map((action) => (
        <Link key={action.title} href={action.href}>
          <Card className='group cursor-pointer border-zinc-200 bg-white transition-all hover:border-zinc-300 hover:shadow-sm'>
            <CardContent className='flex flex-col items-center justify-center gap-2 px-4 py-5 text-center'>
              <div className={`flex size-10 items-center justify-center rounded-md ${action.bgColor} transition-transform group-hover:scale-105`}>
                <action.icon className={`size-5 ${action.iconColor}`} />
              </div>
              <div className='flex flex-col gap-0.5'>
                <h3 className='text-sm font-medium text-zinc-900'>{action.title}</h3>
                <p className='text-xs text-zinc-500'>{action.description}</p>
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
    <div className='min-h-full space-y-4'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-zinc-900'>Dashboard Overview</h1>
          <p className='text-sm text-zinc-500'>Here&apos;s what&apos;s happening with your mission today</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-8 gap-1.5 border-zinc-200 text-zinc-700'>
            <CalendarIcon className='size-3.5' />
            {today}
          </Button>
          <Button variant='outline' size='sm' className='h-8 gap-1.5 border-zinc-200 text-zinc-700'>
            <FilterIcon className='size-3.5' />
            <span className='hidden sm:inline'>Filter</span>
          </Button>
          <Button size='sm' className='h-8 gap-1.5 bg-zinc-900 hover:bg-zinc-800'>
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
