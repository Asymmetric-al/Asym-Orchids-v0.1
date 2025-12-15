'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  DollarSignIcon,
  UsersIcon,
  TrendingUpIcon,
  CalendarIcon,
  MailIcon,
  CheckSquareIcon,
  ClockIcon,
  PlusIcon,
  FilterIcon,
  ArrowUpRightIcon,
  WalletIcon,
  TargetIcon,
  SparklesIcon,
  AlertCircleIcon,
  ChevronRightIcon,
  RssIcon
} from 'lucide-react'

const stats = {
  monthlySupport: 4250,
  monthlyGoal: 5000,
  percentFunded: 85,
  currentBalance: 12450,
  activeSupporters: 42,
  newSupportersThisMonth: 3,
}

const recentActivity = [
  { id: 1, type: 'gift', donor: 'Amanda Lee', amount: 100, isNew: true, date: 'Today' },
  { id: 2, type: 'gift', donor: 'David Brown', amount: 250, isNew: true, date: '2 days ago' },
  { id: 3, type: 'recurring', donor: 'Thomas Smith', amount: 150, date: '4 days ago' },
  { id: 4, type: 'recurring', donor: 'Emily Garcia', amount: 50, date: '6 days ago' },
]

const pendingTasks = [
  { id: 1, title: 'Thank David Brown for first gift', priority: 'high', dueDate: 'Today' },
  { id: 2, title: 'Welcome Amanda Lee', priority: 'high', dueDate: 'Dec 17' },
  { id: 3, title: 'Follow up with Jennifer Davis', priority: 'medium', dueDate: 'Dec 20' },
]

const alerts = [
  { id: 1, type: 'at-risk', count: 3, label: 'At-Risk Donors' },
  { id: 2, type: 'new', count: 2, label: 'New Donors' },
  { id: 3, type: 'failed', count: 1, label: 'Failed Payment' },
]

const MetricsData = [
  {
    icons: <DollarSignIcon className='size-5' />,
    title: 'Monthly Support',
    value: `$${stats.monthlySupport.toLocaleString()}`,
    subtitle: `${stats.percentFunded}% of goal`
  },
  {
    icons: <UsersIcon className='size-5' />,
    title: 'Active Supporters',
    value: stats.activeSupporters.toString(),
    subtitle: `+${stats.newSupportersThisMonth} this month`
  },
  {
    icons: <TrendingUpIcon className='size-5' />,
    title: 'Year to Date',
    value: '$48,500',
    subtitle: 'Total received'
  },
  {
    icons: <CalendarIcon className='size-5' />,
    title: 'This Month',
    value: '$825',
    subtitle: 'Month to date'
  }
]

function FundingProgress() {
  return (
    <Card className='col-span-2 shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between gap-1 pb-0'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <TargetIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Funding Goal</CardTitle>
            <p className='text-muted-foreground text-sm'>Monthly progress</p>
          </div>
        </div>
        <Badge className='bg-primary/10 text-primary border-0 text-xs font-semibold'>
          {stats.percentFunded}% Funded
        </Badge>
      </CardHeader>
      <CardContent className='pt-4'>
        <div className='space-y-4'>
          <div className='flex items-baseline justify-between'>
            <span className='text-2xl font-medium'>${stats.monthlySupport.toLocaleString()}</span>
            <span className='text-muted-foreground text-sm font-medium'>
              of ${stats.monthlyGoal.toLocaleString()} goal
            </span>
          </div>
          <Progress value={stats.percentFunded} className='h-2.5' />
          <div className='grid grid-cols-3 gap-3'>
            <div className='rounded-md border px-3 py-2 text-center'>
              <p className='text-muted-foreground text-sm font-medium'>Remaining</p>
              <p className='text-lg font-medium'>${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()}</p>
            </div>
            <div className='rounded-md border px-3 py-2 text-center'>
              <p className='text-muted-foreground text-sm font-medium'>Trend</p>
              <p className='text-primary flex items-center justify-center gap-1 text-lg font-medium'>
                <TrendingUpIcon className='size-4' /> +12%
              </p>
            </div>
            <div className='rounded-md border px-3 py-2 text-center'>
              <p className='text-muted-foreground text-sm font-medium'>Days Left</p>
              <p className='text-lg font-medium'>16</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className='flex flex-col justify-between overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg'>
      <CardHeader className='pb-0'>
        <div className='flex items-center gap-2'>
          <WalletIcon className='size-4 text-slate-300' />
          <CardTitle className='text-xs font-medium text-slate-200'>Available Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-4 pt-2'>
        <div>
          <h3 className='text-2xl font-medium tracking-tight text-white'>${stats.currentBalance.toLocaleString()}</h3>
          <p className='text-muted-foreground mt-0.5 text-sm text-slate-300'>Updated today at 9:41 AM</p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' className='h-8 flex-1 rounded-lg border-0 bg-white/15 text-xs font-medium text-white hover:bg-white/25'>
            Withdraw
          </Button>
          <Button size='sm' className='h-8 flex-1 rounded-lg border-0 bg-white text-xs font-medium text-slate-900 hover:bg-slate-100'>
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertsSection() {
  return (
    <Card className='shadow-none'>
      <CardHeader className='flex flex-row items-center gap-3 pb-2'>
        <Avatar className='size-8.5 rounded-sm'>
          <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
            <AlertCircleIcon className='size-5' />
          </AvatarFallback>
        </Avatar>
        <CardTitle className='text-lg font-semibold'>Alerts</CardTitle>
      </CardHeader>
      <CardContent className='space-y-2'>
        {alerts.map((alert) => (
          <Link 
            key={alert.id} 
            href={`/missionary-dashboard/donors?filter=${alert.type}`}
            className='group flex items-center justify-between rounded-md border px-4 py-2 transition-colors hover:bg-muted/50'
          >
            <div className='flex items-center gap-3'>
              <div className={`size-2 rounded-full ${
                alert.type === 'at-risk' ? 'bg-amber-500' : 
                alert.type === 'new' ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
              <span className='text-sm font-medium'>{alert.label}</span>
            </div>
            <div className='flex items-center gap-2'>
              <Badge variant='secondary' className='text-xs font-medium'>
                {alert.count}
              </Badge>
              <ChevronRightIcon className='text-muted-foreground size-4 transition-colors group-hover:text-foreground' />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className='shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <SparklesIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Recent Activity</CardTitle>
            <p className='text-muted-foreground text-sm'>Latest donations</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs' asChild>
          <Link href='/missionary-dashboard/donors'>
            View All <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y'>
          {recentActivity.map((activity) => (
            <div key={activity.id} className='flex items-center gap-3 px-6 py-3 transition-colors hover:bg-muted/50'>
              <Avatar className='size-8 border'>
                <AvatarFallback className={`text-xs font-medium ${activity.type === 'gift' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                  {activity.donor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='truncate text-sm font-medium'>{activity.donor}</p>
                  {activity.isNew && (
                    <Badge className='bg-primary/10 text-primary h-4 border-0 px-1 text-[10px] font-medium'>
                      New
                    </Badge>
                  )}
                </div>
                <p className='text-muted-foreground text-xs'>
                  {activity.type === 'gift' ? 'One-time' : 'Monthly'} · {activity.date}
                </p>
              </div>
              <p className='text-primary text-sm font-medium'>+${activity.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className='shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <CheckSquareIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Tasks</CardTitle>
            <p className='text-muted-foreground text-sm'>{pendingTasks.length} pending</p>
          </div>
        </div>
        <Button variant='ghost' size='icon' className='size-7'>
          <PlusIcon className='size-4' />
        </Button>
      </CardHeader>
      <CardContent className='space-y-2'>
        {pendingTasks.map((task) => (
          <div key={task.id} className='group flex cursor-pointer items-start gap-3 rounded-md border px-4 py-2 transition-all hover:border-primary/50 hover:shadow-sm'>
            <div className={`mt-1 size-2 shrink-0 rounded-full ${
              task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium transition-colors group-hover:text-primary'>{task.title}</p>
              <div className='text-muted-foreground mt-0.5 flex items-center gap-1 text-xs'>
                <ClockIcon className='size-3' />
                <span>{task.dueDate}</span>
              </div>
            </div>
            <Button variant='ghost' size='icon' className='size-6 opacity-0 transition-opacity group-hover:opacity-100'>
              <CheckSquareIcon className='size-3' />
            </Button>
          </div>
        ))}
        <Button variant='outline' size='sm' className='mt-2 h-8 w-full border-dashed text-xs' asChild>
          <Link href='/missionary-dashboard/tasks'>View all tasks</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { icon: RssIcon, label: 'Post Update', href: '/missionary-dashboard/feed/new' },
    { icon: UsersIcon, label: 'Add Donor', href: '/missionary-dashboard/donors/new' },
    { icon: MailIcon, label: 'Newsletter', href: '/missionary-dashboard/newsletter' },
    { icon: CheckSquareIcon, label: 'New Task', href: '/missionary-dashboard/tasks/new' },
  ]

  return (
    <Card className='shadow-none'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-semibold'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-2'>
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className='group flex flex-col items-center justify-center gap-2 rounded-md border px-4 py-3 transition-all hover:border-primary/50 hover:shadow-sm'
          >
            <Avatar className='size-8.5 rounded-sm transition-transform group-hover:scale-105'>
              <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                <action.icon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <span className='text-xs font-medium'>{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className='min-h-full space-y-4 p-4 md:p-6'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Dashboard</h1>
          <p className='text-muted-foreground text-sm'>Welcome back, here&apos;s your ministry overview</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-8 gap-1.5'>
            <FilterIcon className='size-3.5' />
            <span className='hidden sm:inline'>Filter</span>
          </Button>
          <Button size='sm' className='h-8 gap-1.5'>
            <PlusIcon className='size-3.5' />
            <span className='hidden sm:inline'>New Gift</span>
          </Button>
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {MetricsData.map((metric, index) => (
          <Card key={index} className='shadow-none'>
            <CardContent className='flex items-center gap-3 px-4 py-3'>
              <Avatar className='size-8.5 rounded-sm'>
                <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                  {metric.icons}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0.5'>
                <span className='text-muted-foreground text-sm font-medium'>{metric.title}</span>
                <span className='text-lg font-medium'>{metric.value}</span>
                {metric.subtitle && (
                  <div className='text-primary flex items-center gap-1 text-xs font-medium'>
                    <TrendingUpIcon className='size-3' />
                    <span>{metric.subtitle}</span>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
        <div className='space-y-4 lg:col-span-2'>
          <div className='grid gap-4 md:grid-cols-3'>
            <FundingProgress />
            <BalanceCard />
          </div>
          <ActivityFeed />
        </div>
        <div className='space-y-4'>
          <AlertsSection />
          <TasksPreview />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}