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

function StatCard({ title, value, subtitle, icon: Icon }: { 
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
}) {
  return (
    <Card className="relative overflow-hidden rounded-2xl border border-border/70 bg-card/70 shadow-sm backdrop-blur">
      <div className="absolute inset-x-4 top-3 h-px bg-gradient-to-r from-emerald-400/70 via-teal-400/70 to-sky-400/70" />
      <CardContent className="p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <p className="text-xs font-medium uppercase tracking-[0.14em] text-muted-foreground/80">{title}</p>
            <p className="text-3xl font-semibold tracking-tight">{value}</p>
            {subtitle && (
              <span className="inline-flex items-center gap-2 rounded-full bg-muted px-3 py-1 text-xs font-medium text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                {subtitle}
              </span>
            )}
          </div>
          <div className="flex h-11 w-11 items-center justify-center rounded-full border border-emerald-100 bg-emerald-50 text-emerald-700">
            <Icon className="h-5 w-5" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FundingProgress() {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <CardTitle className="text-base font-semibold">Funding Progress</CardTitle>
          <Badge variant="outline" className="rounded-full border-dashed text-xs font-medium text-muted-foreground">
            Monthly goal
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-wrap items-end justify-between gap-3">
          <div>
            <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">This month</p>
            <p className="text-3xl font-semibold tracking-tight">${stats.monthlySupport.toLocaleString()}</p>
          </div>
          <span className="inline-flex items-center rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
            {stats.percentFunded}% funded
          </span>
        </div>
        <Progress value={stats.percentFunded} className="h-3 bg-muted" />
        <div className="grid grid-cols-2 gap-3 text-sm text-muted-foreground">
          <div className="rounded-xl border border-dashed border-border/60 bg-muted/60 px-3 py-2">
            <p className="text-[11px] uppercase tracking-[0.12em]">Goal</p>
            <p className="text-foreground font-medium">${stats.monthlyGoal.toLocaleString()}</p>
          </div>
          <div className="rounded-xl border border-dashed border-border/60 bg-muted/60 px-3 py-2 text-right">
            <p className="text-[11px] uppercase tracking-[0.12em]">Remaining</p>
            <p className="text-foreground font-medium">${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Available Balance</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-3xl font-semibold tracking-tight">${stats.currentBalance.toLocaleString()}</p>
          <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-700">
            <TrendingUp className="h-4 w-4" />
            +$825 this month
          </div>
        </div>
        <Button variant="secondary" size="sm" className="w-full rounded-xl">
          View transactions
        </Button>
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
        <Link href="/missionary-dashboard/donors" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          View all <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentActivity.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start gap-3 rounded-xl border border-border/60 bg-muted/50 px-3 py-3 shadow-sm transition-colors hover:border-border hover:bg-card"
          >
            <div
              className={`flex h-10 w-10 items-center justify-center rounded-full border ${
                activity.type === 'gift'
                  ? 'border-emerald-100 bg-emerald-50 text-emerald-700'
                  : 'border-slate-200 bg-slate-50 text-slate-700'
              }`}
            >
              {activity.type === 'gift' ? (
                <Heart className="h-4 w-4" />
              ) : (
                <RefreshCcw className="h-4 w-4" />
              )}
            </div>
            <div className="flex-1 min-w-0 space-y-1">
              <div className="flex items-center gap-2">
                <p className="text-sm font-semibold leading-none">{activity.donor}</p>
                {activity.isNew && (
                  <Badge className="rounded-full bg-emerald-100 px-2 text-[10px] font-semibold uppercase tracking-wide text-emerald-700">
                    New
                  </Badge>
                )}
              </div>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <span className="rounded-full bg-background px-2 py-0.5 font-medium text-foreground/80">
                  {activity.type === 'gift' ? 'One-time' : 'Recurring'}
                </span>
                <span>${activity.amount}</span>
              </div>
            </div>
            <div className="text-xs font-medium text-muted-foreground">{activity.date}</div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Tasks Due Soon</CardTitle>
        <Link href="/missionary-dashboard/tasks" className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground">
          All tasks <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {pendingTasks.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 rounded-xl border border-border/60 bg-muted/50 px-3 py-3 shadow-sm transition hover:border-border hover:bg-card"
          >
            <div
              className={`h-2.5 w-2.5 rounded-full ${
                task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
              }`}
            />
            <p className="flex-1 text-sm font-semibold leading-snug">{task.title}</p>
            <div className="inline-flex items-center gap-1 rounded-full bg-background px-3 py-1 text-xs font-medium text-muted-foreground">
              <Clock className="h-3.5 w-3.5" />
              {task.dueDate}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  return (
    <Card className="rounded-2xl border border-border/70 bg-card/80 shadow-sm backdrop-blur">
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-3">
        <Button
          variant="secondary"
          className="h-auto justify-start gap-2 rounded-xl border border-dashed border-border/80 bg-muted/60 px-3 py-3 text-left"
          asChild
        >
          <Link href="/missionary-dashboard/feed/new">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-semibold">Post update</span>
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="h-auto justify-start gap-2 rounded-xl border border-dashed border-border/80 bg-muted/60 px-3 py-3 text-left"
          asChild
        >
          <Link href="/missionary-dashboard/newsletter">
            <Mail className="h-4 w-4" />
            <span className="text-xs font-semibold">Newsletter</span>
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="h-auto justify-start gap-2 rounded-xl border border-dashed border-border/80 bg-muted/60 px-3 py-3 text-left"
          asChild
        >
          <Link href="/missionary-dashboard/donors">
            <Users className="h-4 w-4" />
            <span className="text-xs font-semibold">View donors</span>
          </Link>
        </Button>
        <Button
          variant="secondary"
          className="h-auto justify-start gap-2 rounded-xl border border-dashed border-border/80 bg-muted/60 px-3 py-3 text-left"
          asChild
        >
          <Link href="/missionary-dashboard/tasks/new">
            <CheckSquare className="h-4 w-4" />
            <span className="text-xs font-semibold">Add task</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className="relative isolate min-h-full overflow-hidden">
      <div className="pointer-events-none absolute inset-x-0 top-[-20%] h-72 bg-gradient-to-br from-emerald-200/40 via-sky-100/30 to-transparent blur-3xl" />
      <div className="pointer-events-none absolute inset-y-0 right-[-10%] w-64 bg-gradient-to-b from-emerald-100/40 via-transparent to-transparent blur-3xl" />

      <div className="relative mx-auto max-w-6xl px-6 py-8 lg:py-12">
        <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
          <div className="space-y-2">
            <Badge variant="outline" className="rounded-full border-dashed px-3 py-1 text-xs font-medium text-muted-foreground">
              Support snapshot
            </Badge>
            <div>
              <h1 className="text-3xl font-semibold tracking-tight">Welcome back, Sarah</h1>
              <p className="text-muted-foreground">Here&apos;s how your ministry support is doing today.</p>
            </div>
          </div>
        </div>

        <div className="mb-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatCard
            title="Monthly Support"
            value={`$${stats.monthlySupport.toLocaleString()}`}
            subtitle={`${stats.percentFunded}% of goal`}
            icon={DollarSign}
          />
          <StatCard
            title="Active Supporters"
            value={stats.activeSupporters}
            subtitle={`+${stats.newSupportersThisMonth} this month`}
            icon={Users}
          />
          <StatCard
            title="Year to Date"
            value="$48,500"
            subtitle="Total received"
            icon={TrendingUp}
          />
          <StatCard
            title="This Month"
            value="$825"
            subtitle="Month to date"
            icon={Calendar}
          />
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <div className="grid gap-6 md:grid-cols-2">
              <FundingProgress />
              <BalanceCard />
            </div>
            <ActivityFeed />
            <TasksPreview />
          </div>
          <div className="space-y-6">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}