'use client'

import { memo, useCallback, useMemo } from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Separator } from '@/components/ui/separator'
import { Skeleton } from '@/components/ui/skeleton'
import { StatCard } from '@/components/dashboard/stat-card'
import { ActivityItem } from '@/components/dashboard/activity-item'
import { TaskItem } from '@/components/dashboard/task-item'
import { QuickActionCard } from '@/components/dashboard/quick-action-card'
import {
  Users,
  DollarSign,
  Activity,
  Globe,
  Bell,
  Calendar,
  Plus,
  TrendingUp,
  MoreHorizontal,
  ChevronRight,
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
    <div className="space-y-3" style={{ height }}>
      <div className="flex items-end justify-between gap-2">
        {[60, 40, 80, 55, 70, 45, 65].map((h, i) => (
          <Skeleton key={i} className="flex-1" style={{ height: `${h}%` }} />
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
  { name: 'Jul', revenue: 4300, donors: 195 },
] as const

const WEEKLY_DATA = [
  { day: 'Mon', amount: 1200 },
  { day: 'Tue', amount: 900 },
  { day: 'Wed', amount: 1600 },
  { day: 'Thu', amount: 1100 },
  { day: 'Fri', amount: 2100 },
  { day: 'Sat', amount: 800 },
  { day: 'Sun', amount: 1400 },
] as const

const ACTIVITY_DATA = [
  { id: 1, initials: 'SJ', name: 'Sarah Johnson', action: 'New Donation', detail: '$150.00', time: '2 min ago', colorVariant: 'emerald' as const },
  { id: 2, initials: 'JD', name: 'John Doe', action: 'Missionary Approved', detail: 'South East Asia', time: '1 hour ago', colorVariant: 'blue' as const },
  { id: 3, initials: 'CW', name: 'Clean Water', action: 'Goal Reached', detail: '$10,000', time: '3 hours ago', colorVariant: 'violet' as const },
  { id: 4, initials: 'MK', name: 'Mike Kim', action: 'Report Submitted', detail: 'Q4 Summary', time: '5 hours ago', colorVariant: 'amber' as const },
] as const

const TASKS_DATA = [
  { id: 1, title: 'Review missionary applications', dueDate: 'Today', priority: 'high' as const },
  { id: 2, title: 'Send monthly newsletter', dueDate: 'Tomorrow', priority: 'medium' as const },
  { id: 3, title: 'Quarterly donor report', dueDate: 'Dec 20', priority: 'low' as const },
] as const

const StatsGrid = memo(function StatsGrid() {
  const stats = useMemo(() => [
    {
      title: 'Total Revenue',
      value: '$45,231.89',
      change: { value: '20.1%', type: 'increase' as const, label: 'from last month' },
      icon: DollarSign,
      iconColor: 'emerald' as const,
    },
    {
      title: 'Active Missionaries',
      value: '24',
      change: { value: '2 new', type: 'increase' as const, label: 'this month' },
      icon: Globe,
      iconColor: 'blue' as const,
    },
    {
      title: 'Active Donors',
      value: '573',
      change: { value: '12%', type: 'increase' as const, label: 'since last quarter' },
      icon: Users,
      iconColor: 'violet' as const,
    },
    {
      title: 'Active Projects',
      value: '12',
      change: { value: '1', type: 'decrease' as const, label: 'completed recently' },
      icon: Activity,
      iconColor: 'amber' as const,
    },
  ], [])

  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
      {stats.map((stat, i) => (
        <div key={stat.title} className={`animate-fade-in-up stagger-${i + 1}`} style={{ opacity: 0 }}>
          <StatCard {...stat} />
        </div>
      ))}
    </div>
  )
})

const RevenueSection = memo(function RevenueSection() {
  return (
    <Card className="lg:col-span-4 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
          <CardDescription className="text-sm text-slate-600">Monthly revenue for the current year</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <RevenueChart data={[...REVENUE_DATA]} />
        <Separator className="my-4" />
        <div className="flex items-center justify-between text-sm">
          <div className="flex items-center gap-2 text-slate-700">
            <TrendingUp className="h-4 w-4 text-emerald-500" />
            <span>
              Trending up by <span className="font-medium text-slate-900">5.2%</span> this month
            </span>
          </div>
          <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900">
            View Report
            <ChevronRight className="h-3 w-3" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

const WeeklySection = memo(function WeeklySection() {
  const weeklyTotal = useMemo(
    () => WEEKLY_DATA.reduce((sum, d) => sum + d.amount, 0),
    []
  )

  return (
    <Card className="lg:col-span-3 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">This Week</CardTitle>
          <CardDescription className="text-sm text-slate-600">Daily donation totals</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent>
        <WeeklyChart data={[...WEEKLY_DATA]} />
        <Separator className="my-4" />
        <div className="flex items-center justify-between">
          <div className="text-sm text-slate-700">
            Total: <span className="font-semibold text-slate-900">${weeklyTotal.toLocaleString()}</span>
          </div>
          <Badge variant="secondary" className="text-xs font-medium text-slate-800">+23% vs last week</Badge>
        </div>
      </CardContent>
    </Card>
  )
})

const ActivitySection = memo(function ActivitySection() {
  const handleActivityClick = useCallback((id: number) => {
    console.log('Activity clicked:', id)
  }, [])

  return (
    <Card className="lg:col-span-4 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          <CardDescription className="text-sm text-slate-600">Latest actions across your organization</CardDescription>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-600 hover:bg-slate-100 hover:text-slate-900">
          <Bell className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {ACTIVITY_DATA.map((item) => (
            <ActivityItem
              key={item.id}
              {...item}
              onClick={() => handleActivityClick(item.id)}
            />
          ))}
        </div>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900" size="sm">
            View all activity
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

const TasksSection = memo(function TasksSection() {
  const handleTaskMenu = useCallback((id: number) => {
    console.log('Task menu:', id)
  }, [])

  return (
    <Card className="lg:col-span-3 overflow-hidden border-slate-200/80 bg-white shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
          <CardDescription className="text-sm text-slate-600">Your scheduled items</CardDescription>
        </div>
        <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900">
          <Plus className="h-3 w-3" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border">
          {TASKS_DATA.map((task) => (
            <TaskItem
              key={task.id}
              {...task}
              onMenuClick={() => handleTaskMenu(task.id)}
            />
          ))}
        </div>
        <div className="border-t p-4">
          <Button variant="ghost" className="w-full text-sm font-medium text-slate-700 hover:bg-slate-100 hover:text-slate-900" size="sm">
            View all tasks
            <ChevronRight className="ml-1 h-4 w-4" />
          </Button>
        </div>
      </CardContent>
    </Card>
  )
})

const QuickActionsGrid = memo(function QuickActionsGrid() {
  const actions = useMemo(() => [
    { icon: Users, title: 'Invite Team Members', description: 'Collaborate with your team', buttonLabel: 'Send Invite' },
    { icon: Globe, title: 'Add Missionary', description: 'Expand your mission reach', buttonLabel: 'Get Started' },
    { icon: Activity, title: 'Create Campaign', description: 'Launch a new fundraiser', buttonLabel: 'Create Now' },
  ], [])

  return (
    <div className="grid gap-4 sm:grid-cols-3">
      {actions.map((action, i) => (
        <div key={action.title} className={`animate-fade-in-up stagger-${i + 4}`} style={{ opacity: 0 }}>
          <QuickActionCard {...action} />
        </div>
      ))}
    </div>
  )
})

const DashboardHeader = memo(function DashboardHeader() {
  const today = useMemo(() => {
    return new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
  }, [])

  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="space-y-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Dashboard Overview
        </h1>
        <p className="text-sm text-slate-600">
          Here&apos;s what&apos;s happening with your mission today.
        </p>
      </div>
      <div className="flex items-center gap-2">
        <Button variant="outline" size="sm" className="h-9 text-sm border-slate-300 text-slate-700 hover:bg-slate-100 hover:text-slate-900">
          <Calendar className="mr-2 h-4 w-4" />
          {today}
        </Button>
        <Button size="sm" className="h-9 text-sm bg-slate-900 text-white hover:bg-slate-800">
          <Plus className="mr-2 h-4 w-4" />
          New Update
        </Button>
      </div>
    </header>
  )
})

export default function MissionControlPage() {
  return (
    <div className="space-y-8">
      <DashboardHeader />
      <StatsGrid />
      <div className="grid gap-4 lg:grid-cols-7">
        <RevenueSection />
        <WeeklySection />
      </div>
      <div className="grid gap-4 lg:grid-cols-7">
        <ActivitySection />
        <TasksSection />
      </div>
      <QuickActionsGrid />
    </div>
  )
}