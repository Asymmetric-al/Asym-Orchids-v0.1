'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Progress } from '@/components/ui/progress'
import {
  DollarSign,
  Users,
  TrendingUp,
  ArrowRight,
  Heart,
  RefreshCcw,
  Calendar,
  Mail,
  CheckSquare,
  Clock,
  MoreHorizontal,
  Plus,
  Search,
  Filter
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

function StatCard({ title, value, subtitle, icon: Icon, trend }: { 
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: 'up' | 'down' | 'neutral'
}) {
  return (
    <Card className="group relative overflow-hidden rounded-2xl border border-border/50 bg-background/50 p-6 shadow-sm transition-all hover:shadow-md">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-50/50 via-transparent to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
      <div className="relative flex items-center justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <h3 className="text-3xl font-bold tracking-tight text-foreground">{value}</h3>
          </div>
          {subtitle && (
            <div className="flex items-center gap-2 text-xs text-muted-foreground">
              {trend === 'up' && <TrendingUp className="h-3 w-3 text-emerald-600" />}
              <span className={trend === 'up' ? 'text-emerald-600 font-medium' : ''}>{subtitle}</span>
            </div>
          )}
        </div>
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100 transition-colors group-hover:bg-emerald-100 group-hover:text-emerald-700">
          <Icon className="h-6 w-6" />
        </div>
      </div>
    </Card>
  )
}

function FundingProgress() {
  return (
    <Card className="col-span-2 overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm transition-all hover:shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-base font-semibold">Funding Goal</CardTitle>
        <Badge variant="secondary" className="font-normal">
          Monthly
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold tracking-tight">${stats.monthlySupport.toLocaleString()}</span>
            <span className="text-sm font-medium text-muted-foreground">
              of ${stats.monthlyGoal.toLocaleString()}
            </span>
          </div>
          <Progress value={stats.percentFunded} className="h-4 rounded-lg bg-emerald-100/50 [&>div]:bg-emerald-500" />
        </div>
        <div className="grid grid-cols-3 gap-4 border-t pt-4">
          <div>
            <p className="text-xs font-medium text-muted-foreground">Progress</p>
            <p className="mt-1 text-lg font-semibold text-emerald-600">{stats.percentFunded}%</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Remaining</p>
            <p className="mt-1 text-lg font-semibold">${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()}</p>
          </div>
          <div>
            <p className="text-xs font-medium text-muted-foreground">Trend</p>
            <p className="mt-1 flex items-center gap-1 text-lg font-semibold text-emerald-600">
              <TrendingUp className="h-4 w-4" /> +12%
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className="flex flex-col justify-between overflow-hidden rounded-2xl border border-border/50 bg-gradient-to-br from-emerald-600 to-teal-600 text-white shadow-lg">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-medium text-emerald-50/80">Available Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h3 className="text-4xl font-bold tracking-tight">${stats.currentBalance.toLocaleString()}</h3>
          <p className="mt-1 text-sm text-emerald-50/80">Last updated today at 9:41 AM</p>
        </div>
        <div className="flex gap-2">
          <Button variant="secondary" className="h-9 w-full bg-white/10 text-white hover:bg-white/20 border-0">
            Withdraw
          </Button>
          <Button variant="secondary" className="h-9 w-full bg-white text-emerald-900 hover:bg-emerald-50 border-0">
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className="col-span-2 overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
          <p className="text-sm text-muted-foreground">Latest donations and updates</p>
        </div>
        <Button variant="outline" size="sm" className="h-8 rounded-lg" asChild>
          <Link href="/missionary-dashboard/donors">View All</Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-border/50">
          {recentActivity.map((activity) => (
            <div
              key={activity.id}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-muted/50"
            >
              <Avatar className="h-10 w-10 border bg-white ring-2 ring-background">
                <AvatarFallback className={activity.type === 'gift' ? 'text-rose-500 bg-rose-50' : 'text-blue-500 bg-blue-50'}>
                  {activity.donor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 space-y-1">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium leading-none">{activity.donor}</p>
                  {activity.isNew && (
                    <Badge variant="secondary" className="h-5 rounded-full px-1.5 text-[10px] font-medium text-emerald-600 bg-emerald-50">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">
                  {activity.type === 'gift' ? 'One-time donation' : 'Monthly recurring'}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium text-foreground">+${activity.amount}</p>
                <p className="text-xs text-muted-foreground">{activity.date}</p>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className="overflow-hidden rounded-2xl border border-border/50 bg-background/50 shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
        <div className="space-y-1">
          <CardTitle className="text-base font-semibold">Tasks</CardTitle>
          <p className="text-sm text-muted-foreground">To-do list for this week</p>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 rounded-lg">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingTasks.map((task) => (
          <div
            key={task.id}
            className="group flex items-start gap-3 rounded-xl border border-border/50 bg-white p-3 shadow-sm transition-all hover:border-emerald-200 hover:shadow-md"
          >
            <div className={`mt-1 h-2 w-2 rounded-full ring-2 ring-offset-2 ${
              task.priority === 'high' ? 'bg-rose-500 ring-rose-100' : 'bg-amber-500 ring-amber-100'
            }`} />
            <div className="flex-1 space-y-1.5">
              <p className="text-sm font-medium leading-none group-hover:text-emerald-700">{task.title}</p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            </div>
            <div className="opacity-0 transition-opacity group-hover:opacity-100">
              <Button variant="ghost" size="icon" className="h-6 w-6 rounded-md">
                <CheckSquare className="h-3.5 w-3.5" />
              </Button>
            </div>
          </div>
        ))}
        <Button variant="outline" className="w-full rounded-xl border-dashed" asChild>
          <Link href="/missionary-dashboard/tasks">View all tasks</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { icon: Mail, label: 'Post Update', href: '/missionary-dashboard/feed/new', color: 'text-blue-600', bg: 'bg-blue-50' },
    { icon: Users, label: 'Add Donor', href: '/missionary-dashboard/donors/new', color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { icon: Mail, label: 'Newsletter', href: '/missionary-dashboard/newsletter', color: 'text-purple-600', bg: 'bg-purple-50' },
    { icon: CheckSquare, label: 'Add Task', href: '/missionary-dashboard/tasks/new', color: 'text-amber-600', bg: 'bg-amber-50' },
  ]

  return (
    <Card className="rounded-2xl border border-border/50 bg-background/50 shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="group relative flex flex-col items-center justify-center gap-2 rounded-xl border border-border/50 bg-white p-4 text-center transition-all hover:border-emerald-200 hover:shadow-md"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-full ${action.bg} ${action.color} transition-transform group-hover:scale-110`}>
              <action.icon className="h-5 w-5" />
            </div>
            <span className="text-xs font-medium text-muted-foreground group-hover:text-foreground">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className="min-h-full space-y-8 p-8">
      {/* Header */}
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-foreground">Dashboard</h1>
          <p className="text-muted-foreground">Welcome back, here's an overview of your ministry.</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" className="h-9 rounded-lg gap-2">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button className="h-9 rounded-lg gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Transaction</span>
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Support"
          value={`$${stats.monthlySupport.toLocaleString()}`}
          subtitle={`${stats.percentFunded}% of goal`}
          icon={DollarSign}
          trend="up"
        />
        <StatCard
          title="Active Supporters"
          value={stats.activeSupporters}
          subtitle={`+${stats.newSupportersThisMonth} this month`}
          icon={Users}
          trend="up"
        />
        <StatCard
          title="Year to Date"
          value="$48,500"
          subtitle="Total received"
          icon={TrendingUp}
          trend="up"
        />
        <StatCard
          title="This Month"
          value="$825"
          subtitle="Month to date"
          icon={Calendar}
          trend="neutral"
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column (2/3) */}
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-3">
            <FundingProgress />
            <BalanceCard />
          </div>
          <ActivityFeed />
        </div>

        {/* Right Column (1/3) */}
        <div className="space-y-6">
          <TasksPreview />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}