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
  Calendar,
  Mail,
  CheckSquare,
  Clock,
  Plus,
  Filter,
  ArrowUpRight,
  Wallet,
  Target,
  Sparkles,
  AlertCircle,
  ChevronRight,
  Rss
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

function StatCard({ title, value, subtitle, icon: Icon, iconBg, iconColor }: { 
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  iconBg: string
  iconColor: string
}) {
  return (
    <Card className="overflow-hidden border-slate-200 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-slate-700">{title}</p>
            <p className="text-xl font-bold text-slate-900">{value}</p>
            {subtitle && (
              <div className="flex items-center gap-1 text-xs text-emerald-700 font-medium">
                <TrendingUp className="h-3 w-3" />
                <span>{subtitle}</span>
              </div>
            )}
          </div>
          <div className={`flex h-9 w-9 items-center justify-center rounded-lg ${iconBg}`}>
            <Icon className={`h-4 w-4 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FundingProgress() {
  return (
    <Card className="col-span-2 border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-3 pb-0">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-100">
            <Target className="h-4 w-4 text-emerald-700" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">Funding Goal</CardTitle>
            <p className="text-xs text-slate-600">Monthly progress</p>
          </div>
        </div>
        <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100 border-0 text-xs font-semibold">
          {stats.percentFunded}% Funded
        </Badge>
      </CardHeader>
      <CardContent className="p-3 pt-2">
        <div className="space-y-3">
          <div className="flex items-baseline justify-between">
            <span className="text-2xl font-bold text-slate-900">${stats.monthlySupport.toLocaleString()}</span>
            <span className="text-xs text-slate-700 font-medium">
              of ${stats.monthlyGoal.toLocaleString()} goal
            </span>
          </div>
          <Progress value={stats.percentFunded} className="h-2.5 bg-slate-200 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500" />
          <div className="grid grid-cols-3 gap-2 pt-1">
            <div className="text-center p-2 rounded-lg bg-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-0.5">Remaining</p>
              <p className="text-base font-bold text-slate-900">${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()}</p>
            </div>
            <div className="text-center p-2 rounded-lg bg-emerald-100">
              <p className="text-xs font-semibold text-slate-700 mb-0.5">Trend</p>
              <p className="text-base font-bold text-emerald-800 flex items-center justify-center gap-1">
                <TrendingUp className="h-3.5 w-3.5" /> +12%
              </p>
            </div>
            <div className="text-center p-2 rounded-lg bg-slate-100">
              <p className="text-xs font-semibold text-slate-700 mb-0.5">Days Left</p>
              <p className="text-base font-bold text-slate-900">16</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className="flex flex-col justify-between overflow-hidden border-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white shadow-lg">
      <CardHeader className="p-3 pb-0">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-slate-300" />
          <CardTitle className="text-xs font-medium text-slate-200">Available Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-2 space-y-3">
        <div>
          <h3 className="text-2xl font-bold tracking-tight text-white">${stats.currentBalance.toLocaleString()}</h3>
          <p className="mt-0.5 text-xs text-slate-300">Updated today at 9:41 AM</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 h-8 bg-white/15 text-white hover:bg-white/25 border-0 rounded-lg text-xs font-medium">
            Withdraw
          </Button>
          <Button size="sm" className="flex-1 h-8 bg-white text-slate-900 hover:bg-slate-100 border-0 rounded-lg text-xs font-medium">
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertsSection() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-100">
            <AlertCircle className="h-4 w-4 text-amber-700" />
          </div>
          <CardTitle className="text-sm font-semibold text-slate-900">Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-1.5">
        {alerts.map((alert) => (
          <Link 
            key={alert.id} 
            href={`/missionary-dashboard/donors?filter=${alert.type}`}
            className="flex items-center justify-between p-2 rounded-lg bg-slate-100 hover:bg-slate-200 transition-colors group"
          >
            <div className="flex items-center gap-2">
              <div className={`h-2 w-2 rounded-full ${
                alert.type === 'at-risk' ? 'bg-amber-500' : 
                alert.type === 'new' ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
              <span className="text-sm font-semibold text-slate-800">{alert.label}</span>
            </div>
            <div className="flex items-center gap-1.5">
              <Badge variant="secondary" className={`text-xs font-bold ${
                alert.type === 'at-risk' ? 'bg-amber-200 text-amber-800' : 
                alert.type === 'new' ? 'bg-emerald-200 text-emerald-800' : 'bg-rose-200 text-rose-800'
              }`}>
                {alert.count}
              </Badge>
              <ChevronRight className="h-4 w-4 text-slate-500 group-hover:text-slate-700 transition-colors" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-100">
            <Sparkles className="h-4 w-4 text-blue-700" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">Recent Activity</CardTitle>
            <p className="text-xs text-slate-600">Latest donations</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-7 text-xs text-slate-700 hover:text-slate-900 hover:bg-slate-100" asChild>
          <Link href="/missionary-dashboard/donors">
            View All <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-200">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-2 px-3 py-2 hover:bg-slate-50 transition-colors">
              <Avatar className="h-8 w-8 border border-slate-300">
                <AvatarFallback className={`text-xs font-semibold ${activity.type === 'gift' ? 'bg-rose-100 text-rose-700' : 'bg-blue-100 text-blue-700'}`}>
                  {activity.donor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-1.5">
                  <p className="text-sm font-semibold text-slate-900 truncate">{activity.donor}</p>
                  {activity.isNew && (
                    <Badge className="h-4 px-1 text-[10px] bg-emerald-200 text-emerald-800 hover:bg-emerald-200 border-0 font-semibold">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-600">
                  {activity.type === 'gift' ? 'One-time' : 'Monthly'} · {activity.date}
                </p>
              </div>
              <p className="text-sm font-bold text-emerald-700">+${activity.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-3 pb-2">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-100">
            <CheckSquare className="h-4 w-4 text-violet-700" />
          </div>
          <div>
            <CardTitle className="text-sm font-semibold text-slate-900">Tasks</CardTitle>
            <p className="text-xs text-slate-600">{pendingTasks.length} pending</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-7 w-7 text-slate-600 hover:text-slate-900 hover:bg-slate-100">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-3 pt-0 space-y-1.5">
        {pendingTasks.map((task) => (
          <div key={task.id} className="flex items-start gap-2 p-2 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all group cursor-pointer">
            <div className={`mt-1 h-2 w-2 rounded-full shrink-0 ${
              task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900 group-hover:text-emerald-700 transition-colors">{task.title}</p>
              <div className="flex items-center gap-1 mt-0.5 text-xs text-slate-600">
                <Clock className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-6 w-6 opacity-0 group-hover:opacity-100 transition-opacity text-slate-500 hover:text-emerald-700 hover:bg-emerald-50">
              <CheckSquare className="h-3 w-3" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full mt-1.5 h-8 text-xs border-dashed border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400 hover:bg-slate-50" asChild>
          <Link href="/missionary-dashboard/tasks">View all tasks</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { icon: Rss, label: 'Post Update', href: '/missionary-dashboard/feed/new', bg: 'bg-blue-100', color: 'text-blue-700' },
    { icon: Users, label: 'Add Donor', href: '/missionary-dashboard/donors/new', bg: 'bg-emerald-100', color: 'text-emerald-700' },
    { icon: Mail, label: 'Newsletter', href: '/missionary-dashboard/newsletter', bg: 'bg-purple-100', color: 'text-purple-700' },
    { icon: CheckSquare, label: 'New Task', href: '/missionary-dashboard/tasks/new', bg: 'bg-amber-100', color: 'text-amber-700' },
  ]

  return (
    <Card className="border-slate-200 bg-white shadow-sm">
      <CardHeader className="p-3 pb-2">
        <CardTitle className="text-sm font-semibold text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-3 pt-0 grid grid-cols-2 gap-1.5">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-lg border border-slate-200 bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <div className={`flex h-8 w-8 items-center justify-center rounded-lg ${action.bg} group-hover:scale-105 transition-transform`}>
              <action.icon className={`h-4 w-4 ${action.color}`} />
            </div>
            <span className="text-xs font-semibold text-slate-700 group-hover:text-slate-900">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className="min-h-full p-3 md:p-4 space-y-4">
      <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-700">Welcome back, here's your ministry overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-8 gap-1.5 border-slate-300 text-slate-700 hover:text-slate-900 hover:bg-slate-100">
            <Filter className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button size="sm" className="h-8 gap-1.5 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            <Plus className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">New Gift</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Support"
          value={`$${stats.monthlySupport.toLocaleString()}`}
          subtitle={`${stats.percentFunded}% of goal`}
          icon={DollarSign}
          iconBg="bg-emerald-100"
          iconColor="text-emerald-700"
        />
        <StatCard
          title="Active Supporters"
          value={stats.activeSupporters}
          subtitle={`+${stats.newSupportersThisMonth} this month`}
          icon={Users}
          iconBg="bg-blue-100"
          iconColor="text-blue-700"
        />
        <StatCard
          title="Year to Date"
          value="$48,500"
          subtitle="Total received"
          icon={TrendingUp}
          iconBg="bg-violet-100"
          iconColor="text-violet-700"
        />
        <StatCard
          title="This Month"
          value="$825"
          subtitle="Month to date"
          icon={Calendar}
          iconBg="bg-amber-100"
          iconColor="text-amber-700"
        />
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        <div className="space-y-4 lg:col-span-2">
          <div className="grid gap-3 md:grid-cols-3">
            <FundingProgress />
            <BalanceCard />
          </div>
          <ActivityFeed />
        </div>
        <div className="space-y-3">
          <AlertsSection />
          <TasksPreview />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}