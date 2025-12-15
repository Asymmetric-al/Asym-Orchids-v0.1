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
    <Card className="overflow-hidden border-slate-200/80 bg-white shadow-sm hover:shadow-md transition-shadow">
      <CardContent className="p-4">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm font-medium text-slate-600">{title}</p>
            <p className="text-2xl font-bold text-slate-900">{value}</p>
            {subtitle && (
              <div className="flex items-center gap-1.5 text-xs text-emerald-700">
                <TrendingUp className="h-3 w-3" />
                <span className="font-semibold">{subtitle}</span>
              </div>
            )}
          </div>
          <div className={`flex h-11 w-11 items-center justify-center rounded-xl ${iconBg}`}>
            <Icon className={`h-5 w-5 ${iconColor}`} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FundingProgress() {
  return (
    <Card className="col-span-2 border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-0">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50">
            <Target className="h-5 w-5 text-emerald-600" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">Funding Goal</CardTitle>
            <p className="text-xs text-slate-600">Monthly progress</p>
          </div>
        </div>
        <Badge className="bg-emerald-50 text-emerald-700 hover:bg-emerald-50 border-0 font-medium">
          {stats.percentFunded}% Funded
        </Badge>
      </CardHeader>
      <CardContent className="p-4 pt-3">
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold text-slate-900">${stats.monthlySupport.toLocaleString()}</span>
            <span className="text-sm text-slate-600">
              of ${stats.monthlyGoal.toLocaleString()} goal
            </span>
          </div>
          <Progress value={stats.percentFunded} className="h-3 bg-slate-100 [&>div]:bg-gradient-to-r [&>div]:from-emerald-500 [&>div]:to-teal-500" />
          <div className="grid grid-cols-3 gap-3 pt-2">
            <div className="text-center p-3 rounded-lg bg-slate-50">
              <p className="text-xs font-medium text-slate-600 mb-1">Remaining</p>
              <p className="text-lg font-bold text-slate-900">${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()}</p>
            </div>
            <div className="text-center p-3 rounded-lg bg-emerald-50">
              <p className="text-xs font-medium text-slate-600 mb-1">Trend</p>
              <p className="text-lg font-bold text-emerald-700 flex items-center justify-center gap-1">
                <TrendingUp className="h-4 w-4" /> +12%
              </p>
            </div>
            <div className="text-center p-3 rounded-lg bg-slate-50">
              <p className="text-xs font-medium text-slate-600 mb-1">Days Left</p>
              <p className="text-lg font-bold text-slate-900">16</p>
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
      <CardHeader className="p-4 pb-0">
        <div className="flex items-center gap-2">
          <Wallet className="h-4 w-4 text-slate-300" />
          <CardTitle className="text-sm font-medium text-slate-200">Available Balance</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-3 space-y-4">
        <div>
          <h3 className="text-3xl font-bold tracking-tight">${stats.currentBalance.toLocaleString()}</h3>
          <p className="mt-1 text-xs text-slate-300">Updated today at 9:41 AM</p>
        </div>
        <div className="flex gap-2">
          <Button size="sm" className="flex-1 h-9 bg-white/12 text-white hover:bg-white/20 border-0 rounded-lg text-xs font-medium">
            Withdraw
          </Button>
          <Button size="sm" className="flex-1 h-9 bg-white text-slate-900 hover:bg-slate-100 border-0 rounded-lg text-xs font-medium">
            View History
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertsSection() {
  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-amber-50">
            <AlertCircle className="h-5 w-5 text-amber-600" />
          </div>
          <CardTitle className="text-base font-semibold text-slate-900">Alerts</CardTitle>
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        {alerts.map((alert) => (
          <Link 
            key={alert.id} 
            href={`/missionary-dashboard/donors?filter=${alert.type}`}
            className="flex items-center justify-between p-3 rounded-lg bg-slate-50 hover:bg-slate-100 transition-colors group"
          >
            <div className="flex items-center gap-3">
              <div className={`h-2 w-2 rounded-full ${
                alert.type === 'at-risk' ? 'bg-amber-500' : 
                alert.type === 'new' ? 'bg-emerald-500' : 'bg-rose-500'
              }`} />
              <span className="text-sm font-medium text-slate-700">{alert.label}</span>
            </div>
            <div className="flex items-center gap-2">
              <Badge variant="secondary" className={`text-xs font-bold ${
                alert.type === 'at-risk' ? 'bg-amber-100 text-amber-700' : 
                alert.type === 'new' ? 'bg-emerald-100 text-emerald-700' : 'bg-rose-100 text-rose-700'
              }`}>
                {alert.count}
              </Badge>
              <ChevronRight className="h-4 w-4 text-slate-400 group-hover:text-slate-600 transition-colors" />
            </div>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50">
            <Sparkles className="h-5 w-5 text-blue-600" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">Recent Activity</CardTitle>
            <p className="text-xs text-slate-500">Latest donations</p>
          </div>
        </div>
        <Button variant="ghost" size="sm" className="h-8 text-xs text-slate-600 hover:text-slate-900" asChild>
          <Link href="/missionary-dashboard/donors">
            View All <ArrowUpRight className="ml-1 h-3 w-3" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="p-0">
        <div className="divide-y divide-slate-100">
          {recentActivity.map((activity) => (
            <div key={activity.id} className="flex items-center gap-3 px-4 py-3 hover:bg-slate-50/50 transition-colors">
              <Avatar className="h-9 w-9 border border-slate-200">
                <AvatarFallback className={`text-xs font-semibold ${activity.type === 'gift' ? 'bg-rose-50 text-rose-600' : 'bg-blue-50 text-blue-600'}`}>
                  {activity.donor.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <p className="text-sm font-medium text-slate-900 truncate">{activity.donor}</p>
                  {activity.isNew && (
                    <Badge className="h-4 px-1.5 text-[10px] bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-0">
                      New
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-slate-500">
                  {activity.type === 'gift' ? 'One-time' : 'Monthly'} · {activity.date}
                </p>
              </div>
              <p className="text-sm font-semibold text-emerald-600">+${activity.amount}</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between p-4 pb-3">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-violet-50">
            <CheckSquare className="h-5 w-5 text-violet-600" />
          </div>
          <div>
            <CardTitle className="text-base font-semibold text-slate-900">Tasks</CardTitle>
            <p className="text-xs text-slate-500">{pendingTasks.length} pending</p>
          </div>
        </div>
        <Button variant="ghost" size="icon" className="h-8 w-8 text-slate-500 hover:text-slate-900">
          <Plus className="h-4 w-4" />
        </Button>
      </CardHeader>
      <CardContent className="p-4 pt-0 space-y-2">
        {pendingTasks.map((task) => (
          <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm transition-all group cursor-pointer">
            <div className={`mt-1 h-2.5 w-2.5 rounded-full shrink-0 ${
              task.priority === 'high' ? 'bg-rose-500' : 'bg-amber-500'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-slate-900 group-hover:text-emerald-700 transition-colors">{task.title}</p>
              <div className="flex items-center gap-1.5 mt-1 text-xs text-slate-500">
                <Clock className="h-3 w-3" />
                <span>{task.dueDate}</span>
              </div>
            </div>
            <Button variant="ghost" size="icon" className="h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity text-slate-400 hover:text-emerald-600">
              <CheckSquare className="h-3.5 w-3.5" />
            </Button>
          </div>
        ))}
        <Button variant="outline" size="sm" className="w-full mt-2 h-9 text-xs border-dashed border-slate-300 text-slate-700 hover:text-slate-900 hover:border-slate-400" asChild>
          <Link href="/missionary-dashboard/tasks">View all tasks</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  const actions = [
    { icon: Rss, label: 'Post Update', href: '/missionary-dashboard/feed/new', bg: 'bg-blue-50', color: 'text-blue-600' },
    { icon: Users, label: 'Add Donor', href: '/missionary-dashboard/donors/new', bg: 'bg-emerald-50', color: 'text-emerald-600' },
    { icon: Mail, label: 'Newsletter', href: '/missionary-dashboard/newsletter', bg: 'bg-purple-50', color: 'text-purple-600' },
    { icon: CheckSquare, label: 'New Task', href: '/missionary-dashboard/tasks/new', bg: 'bg-amber-50', color: 'text-amber-600' },
  ]

  return (
    <Card className="border-slate-200/80 bg-white shadow-sm">
      <CardHeader className="p-4 pb-3">
        <CardTitle className="text-base font-semibold text-slate-900">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="p-4 pt-0 grid grid-cols-2 gap-2">
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className="flex flex-col items-center justify-center gap-2 p-4 rounded-xl border border-slate-200/80 bg-white hover:border-slate-300 hover:shadow-sm transition-all group"
          >
            <div className={`flex h-10 w-10 items-center justify-center rounded-xl ${action.bg} group-hover:scale-105 transition-transform`}>
              <action.icon className={`h-5 w-5 ${action.color}`} />
            </div>
            <span className="text-xs font-medium text-slate-600 group-hover:text-slate-900">{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className="min-h-full p-4 md:p-6 space-y-5">
      <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-slate-900">Dashboard</h1>
          <p className="text-sm text-slate-600">Welcome back, here's your ministry overview</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" className="h-9 gap-2 border-slate-300 text-slate-700 hover:text-slate-900">
            <Filter className="h-4 w-4" />
            <span className="hidden sm:inline">Filter</span>
          </Button>
          <Button size="sm" className="h-9 gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">New Gift</span>
          </Button>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Monthly Support"
          value={`$${stats.monthlySupport.toLocaleString()}`}
          subtitle={`${stats.percentFunded}% of goal`}
          icon={DollarSign}
          iconBg="bg-emerald-50"
          iconColor="text-emerald-600"
        />
        <StatCard
          title="Active Supporters"
          value={stats.activeSupporters}
          subtitle={`+${stats.newSupportersThisMonth} this month`}
          icon={Users}
          iconBg="bg-blue-50"
          iconColor="text-blue-600"
        />
        <StatCard
          title="Year to Date"
          value="$48,500"
          subtitle="Total received"
          icon={TrendingUp}
          iconBg="bg-violet-50"
          iconColor="text-violet-600"
        />
        <StatCard
          title="This Month"
          value="$825"
          subtitle="Month to date"
          icon={Calendar}
          iconBg="bg-amber-50"
          iconColor="text-amber-600"
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-4 md:grid-cols-3">
            <FundingProgress />
            <BalanceCard />
          </div>
          <ActivityFeed />
        </div>
        <div className="space-y-4">
          <AlertsSection />
          <TasksPreview />
          <QuickActions />
        </div>
      </div>
    </div>
  )
}