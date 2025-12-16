'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
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
    icon: DollarSignIcon,
    title: 'Monthly Support',
    value: `$${stats.monthlySupport.toLocaleString()}`,
    subtitle: `${stats.percentFunded}% of goal`
  },
  {
    icon: UsersIcon,
    title: 'Active Supporters',
    value: stats.activeSupporters.toString(),
    subtitle: `+${stats.newSupportersThisMonth} this month`
  },
  {
    icon: TrendingUpIcon,
    title: 'Year to Date',
    value: '$48,500',
    subtitle: 'Total received'
  },
  {
    icon: CalendarIcon,
    title: 'This Month',
    value: '$825',
    subtitle: 'Month to date'
  }
]

function FundingProgress() {
  return (
    <Card className='col-span-2 border-zinc-200 bg-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-2'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-zinc-100'>
            <TargetIcon className='size-4 text-zinc-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Funding Goal</CardTitle>
            <p className='text-xs text-zinc-500'>Monthly progress</p>
          </div>
        </div>
        <Badge variant='secondary' className='bg-emerald-50 text-emerald-700 border-0 text-xs font-medium'>
          {stats.percentFunded}% Funded
        </Badge>
      </CardHeader>
      <CardContent className='pt-2'>
        <div className='space-y-4'>
          <div className='flex items-baseline justify-between'>
            <span className='text-2xl font-semibold text-zinc-900'>${stats.monthlySupport.toLocaleString()}</span>
            <span className='text-sm text-zinc-500'>
              of ${stats.monthlyGoal.toLocaleString()} goal
            </span>
          </div>
          <Progress value={stats.percentFunded} className='h-2' />
          <div className='grid grid-cols-3 gap-2'>
            <div className='rounded-md bg-zinc-50 px-3 py-2 text-center'>
              <p className='text-[10px] font-medium uppercase tracking-wide text-zinc-500'>Remaining</p>
              <p className='text-sm font-semibold text-zinc-900'>${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()}</p>
            </div>
            <div className='rounded-md bg-zinc-50 px-3 py-2 text-center'>
              <p className='text-[10px] font-medium uppercase tracking-wide text-zinc-500'>Trend</p>
              <p className='flex items-center justify-center gap-1 text-sm font-semibold text-emerald-600'>
                <TrendingUpIcon className='size-3' /> +12%
              </p>
            </div>
            <div className='rounded-md bg-zinc-50 px-3 py-2 text-center'>
              <p className='text-[10px] font-medium uppercase tracking-wide text-zinc-500'>Days Left</p>
              <p className='text-sm font-semibold text-zinc-900'>16</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className='flex flex-col justify-between border-zinc-200 bg-white'>
      <CardHeader className='pb-1'>
        <div className='flex items-center gap-2'>
          <WalletIcon className='size-4 text-zinc-500' />
          <CardTitle className='text-xs font-medium text-zinc-500'>Available Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className='space-y-3 pt-0'>
        <div>
          <h3 className='text-2xl font-semibold text-zinc-900'>${stats.currentBalance.toLocaleString()}</h3>
          <p className='text-xs text-zinc-500'>Updated today at 9:41 AM</p>
        </div>
        <div className='flex gap-2'>
          <Button size='sm' variant='outline' className='h-8 flex-1 text-xs border-zinc-200'>
            Withdraw
          </Button>
          <Button size='sm' className='h-8 flex-1 text-xs bg-zinc-900 hover:bg-zinc-800'>
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertsSection() {
  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='flex flex-row items-center gap-3 pb-3'>
        <div className='flex size-8 items-center justify-center rounded-md bg-amber-50'>
          <AlertCircleIcon className='size-4 text-amber-600' />
        </div>
        <CardTitle className='text-sm font-semibold text-zinc-900'>Alerts</CardTitle>
      </CardHeader>
      <CardContent className='space-y-1.5'>
        {alerts.map((alert) => (
          <Link 
            key={alert.id} 
            href={`/missionary-dashboard/donors?filter=${alert.type}`}
            className='group flex items-center justify-between rounded-md bg-zinc-50 px-3 py-2 transition-colors hover:bg-zinc-100'
          >
            <div className='flex items-center gap-2.5'>
              <div className={`size-2 rounded-full ${
                alert.type === 'at-risk' ? 'bg-amber-500' : 
                alert.type === 'new' ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
              <span className='text-sm text-zinc-700'>{alert.label}</span>
            </div>
            <div className='flex items-center gap-1.5'>
              <Badge variant='secondary' className='h-5 bg-white border border-zinc-200 text-xs font-medium text-zinc-700'>
                {alert.count}
              </Badge>
              <ChevronRightIcon className='size-4 text-zinc-400 group-hover:text-zinc-600' />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-blue-50'>
            <SparklesIcon className='size-4 text-blue-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Recent Activity</CardTitle>
            <p className='text-xs text-zinc-500'>Latest donations</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs text-zinc-600 hover:text-zinc-900' asChild>
          <Link href='/missionary-dashboard/donors'>
            View All <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y divide-zinc-100'>
          {recentActivity.map((activity) => (
            <div key={activity.id} className='flex items-center gap-3 px-6 py-2.5 transition-colors hover:bg-zinc-50'>
              <Avatar className='size-8 border border-zinc-200'>
                <AvatarFallback className={`text-xs font-medium ${activity.type === 'gift' ? 'bg-rose-50 text-rose-700' : 'bg-blue-50 text-blue-700'}`}>
                  {activity.donor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <div className='flex items-center gap-2'>
                  <p className='truncate text-sm font-medium text-zinc-900'>{activity.donor}</p>
                  {activity.isNew && (
                    <Badge className='h-4 border-0 bg-emerald-50 px-1.5 text-[10px] font-medium text-emerald-700'>
                      New
                    </Badge>
                  )}
                </div>
                <p className='text-xs text-zinc-500'>
                  {activity.type === 'gift' ? 'One-time' : 'Monthly'} · {activity.date}
                </p>
              </div>
              <p className='text-sm font-semibold text-emerald-600'>+${activity.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-violet-50'>
            <CheckSquareIcon className='size-4 text-violet-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Tasks</CardTitle>
            <p className='text-xs text-zinc-500'>{pendingTasks.length} pending</p>
          </div>
        </div>
        <Button variant='ghost' size='icon' className='size-7 text-zinc-500 hover:text-zinc-700'>
          <PlusIcon className='size-4' />
        </Button>
      </CardHeader>
      <CardContent className='space-y-1.5'>
        {pendingTasks.map((task) => (
          <div key={task.id} className='group flex cursor-pointer items-start gap-2.5 rounded-md bg-zinc-50 px-3 py-2 transition-colors hover:bg-zinc-100'>
            <div className={`mt-1.5 size-2 shrink-0 rounded-full ${
              task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            <div className='min-w-0 flex-1'>
              <p className='text-sm text-zinc-700'>{task.title}</p>
              <div className='mt-0.5 flex items-center gap-1 text-xs text-zinc-500'>
                <ClockIcon className='size-3' />
                <span>{task.dueDate}</span>
              </div>
            </div>
          </div>
        ))}
        <Button variant='outline' size='sm' className='mt-2 h-8 w-full border-dashed border-zinc-300 text-xs text-zinc-600' asChild>
          <Link href='/missionary-dashboard/tasks'>View all tasks</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { icon: RssIcon, label: 'Post Update', href: '/missionary-dashboard/feed/new', bgColor: 'bg-orange-50', iconColor: 'text-orange-600' },
    { icon: UsersIcon, label: 'Add Donor', href: '/missionary-dashboard/donors/new', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { icon: MailIcon, label: 'Newsletter', href: '/missionary-dashboard/newsletter', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { icon: CheckSquareIcon, label: 'New Task', href: '/missionary-dashboard/tasks/new', bgColor: 'bg-violet-50', iconColor: 'text-violet-600' },
  ]

  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-sm font-semibold text-zinc-900'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-2'>
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className='group flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-3 transition-colors hover:bg-zinc-100'
          >
            <div className={`flex size-9 items-center justify-center rounded-md ${action.bgColor} transition-transform group-hover:scale-105`}>
              <action.icon className={`size-4 ${action.iconColor}`} />
            </div>
            <span className='text-xs font-medium text-zinc-700'>{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className='min-h-full space-y-4 bg-zinc-50 p-4 md:p-6'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-zinc-900'>Dashboard</h1>
          <p className='text-sm text-zinc-500'>Overview of your ministry support.</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button variant='outline' size='sm' className='h-8 border-zinc-200 text-zinc-700'>
            Report
          </Button>
          <Button size='sm' className='h-8 gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800'>
            <PlusIcon className='size-3.5' />
            Add Donation
          </Button>
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {MetricsData.map((metric, index) => (
          <Card key={index} className='border-zinc-200 bg-white'>
            <CardContent className='flex items-center gap-3 p-4'>
              <div className='flex size-9 items-center justify-center rounded-md bg-zinc-100'>
                <metric.icon className='size-4 text-zinc-600' />
              </div>
              <div>
                <span className='text-xs font-medium text-zinc-500'>{metric.title}</span>
                <p className='text-lg font-semibold text-zinc-900'>{metric.value}</p>
                <p className='text-xs text-zinc-500'>{metric.subtitle}</p>
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
