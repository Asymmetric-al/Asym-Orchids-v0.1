'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip'
import {
  DollarSign,
  Users,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CreditCard,
  Gift,
  CheckSquare,
  ArrowUpRight,
  Heart,
  RefreshCcw,
  Calendar,
  Mail,
  Wallet,
  Target,
  Sparkles,
  Clock,
} from 'lucide-react'

const stats = {
  monthlySupport: 4250,
  monthlyGoal: 5000,
  percentFunded: 85,
  currentBalance: 12450,
  balanceAsOf: 'Dec 14, 2024',
  activeSupporters: 42,
  newSupportersThisMonth: 3,
  yearToDateGiving: 48500,
  monthToDateGiving: 825,
}

const alerts = {
  atRiskDonors: 2,
  failedPayments: 0,
  pendingTasks: 5,
  newDonors: 2,
}

const recentActivity = [
  { id: 1, type: 'gift', donor: 'Amanda Lee', amount: 100, isNew: true, date: 'Today' },
  { id: 2, type: 'gift', donor: 'David Brown', amount: 250, isNew: true, date: '2 days ago' },
  { id: 3, type: 'recurring', donor: 'Thomas Smith', amount: 150, date: '4 days ago' },
  { id: 4, type: 'recurring', donor: 'Emily Garcia', amount: 50, date: '6 days ago' },
  { id: 5, type: 'recurring', donor: 'Rebecca Johnson', amount: 75, date: '9 days ago' },
]

const recentSupporters = [
  { id: 1, name: 'Thomas Smith', amount: 150, frequency: 'monthly', initials: 'TS', date: '4 days ago' },
  { id: 2, name: 'Rebecca Johnson', amount: 75, frequency: 'monthly', initials: 'RJ', date: '9 days ago' },
  { id: 3, name: 'Michael Williams', amount: 200, frequency: 'monthly', initials: 'MW', date: '2 weeks ago' },
]

const pendingTasks = [
  { id: 1, title: 'Thank David Brown for first gift', type: 'thank_you', priority: 'high', dueDate: 'Today' },
  { id: 2, title: 'Welcome Amanda Lee', type: 'thank_you', priority: 'high', dueDate: 'Dec 17' },
  { id: 3, title: 'Follow up with Jennifer Davis', type: 'at_risk', priority: 'medium', dueDate: 'Dec 20' },
]

function StatCard({ 
  title, 
  value, 
  subtitle, 
  icon: Icon, 
  trend,
  trendValue,
  className 
}: { 
  title: string
  value: string | number
  subtitle?: string
  icon: React.ElementType
  trend?: 'up' | 'down'
  trendValue?: string
  className?: string
}) {
  return (
    <Card className={`relative overflow-hidden transition-all hover:shadow-md ${className}`}>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold tracking-tight">{value}</p>
            {(subtitle || trendValue) && (
              <div className="flex items-center gap-2">
                {trend && trendValue && (
                  <span className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-0.5" /> : <TrendingDown className="h-3 w-3 mr-0.5" />}
                    {trendValue}
                  </span>
                )}
                {subtitle && <span className="text-xs text-muted-foreground">{subtitle}</span>}
              </div>
            )}
          </div>
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10">
            <Icon className="h-5 w-5 text-primary" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FundingMeter() {
  const progressColor = stats.percentFunded >= 100 
    ? 'bg-emerald-500' 
    : stats.percentFunded >= 75 
      ? 'bg-emerald-500' 
      : stats.percentFunded >= 50 
        ? 'bg-amber-500' 
        : 'bg-rose-500'

  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 via-transparent to-teal-500/5" />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Target className="h-5 w-5 text-emerald-600" />
              Funding Progress
            </CardTitle>
            <CardDescription>Monthly support goal</CardDescription>
          </div>
          <Badge 
            variant={stats.percentFunded >= 75 ? 'default' : 'secondary'}
            className={stats.percentFunded >= 75 ? 'bg-emerald-500/10 text-emerald-700 hover:bg-emerald-500/20' : ''}
          >
            {stats.percentFunded}% funded
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-bold">${stats.monthlySupport.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">of ${stats.monthlyGoal.toLocaleString()}</span>
          </div>
          <div className="relative">
            <Progress value={stats.percentFunded} className="h-3" />
            <div 
              className={`absolute inset-y-0 left-0 rounded-full transition-all ${progressColor}`}
              style={{ width: `${Math.min(stats.percentFunded, 100)}%` }}
            />
          </div>
        </div>
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">Recurring</p>
            <p className="text-sm font-semibold">$475/mo</p>
          </div>
          <div className="space-y-0.5">
            <p className="text-xs text-muted-foreground">One-time (MTD)</p>
            <p className="text-sm font-semibold">$350</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-indigo-500/5" />
      <CardHeader className="pb-2">
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg font-semibold flex items-center gap-2">
              <Wallet className="h-5 w-5 text-blue-600" />
              Available Balance
            </CardTitle>
            <CardDescription>Your support account</CardDescription>
          </div>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger>
                <Badge variant="outline" className="text-xs">
                  As of {stats.balanceAsOf}
                </Badge>
              </TooltipTrigger>
              <TooltipContent>
                <p>Balance reflects all donations minus expenses</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <p className="text-3xl font-bold">${stats.currentBalance.toLocaleString()}</p>
          <div className="flex items-center gap-4 text-sm">
            <span className="flex items-center gap-1 text-emerald-600">
              <TrendingUp className="h-3.5 w-3.5" />
              +$825 this month
            </span>
          </div>
          <Button variant="outline" size="sm" className="w-full mt-2">
            View Transactions
          </Button>
        </div>
      </CardContent>
    </Card>
  )
}

function AlertsCard() {
  const hasAlerts = alerts.atRiskDonors > 0 || alerts.failedPayments > 0 || alerts.pendingTasks > 0
  
  return (
    <Card className={`relative overflow-hidden ${hasAlerts ? 'border-amber-200 dark:border-amber-900/50' : ''}`}>
      {hasAlerts && <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-orange-500/5" />}
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold flex items-center gap-2">
          <Sparkles className="h-5 w-5 text-amber-600" />
          Action Items
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-2">
        {alerts.newDonors > 0 && (
          <Link href="/missionary-dashboard/donors?status=new" className="flex items-center justify-between p-2.5 rounded-lg bg-emerald-50 dark:bg-emerald-950/30 hover:bg-emerald-100 dark:hover:bg-emerald-950/50 transition-colors">
            <div className="flex items-center gap-2">
              <Gift className="h-4 w-4 text-emerald-600" />
              <span className="text-sm font-medium">New Donors</span>
            </div>
            <Badge className="bg-emerald-500">{alerts.newDonors}</Badge>
          </Link>
        )}
        {alerts.atRiskDonors > 0 && (
          <Link href="/missionary-dashboard/donors?status=at_risk" className="flex items-center justify-between p-2.5 rounded-lg bg-amber-50 dark:bg-amber-950/30 hover:bg-amber-100 dark:hover:bg-amber-950/50 transition-colors">
            <div className="flex items-center gap-2">
              <AlertTriangle className="h-4 w-4 text-amber-600" />
              <span className="text-sm font-medium">At-Risk Donors</span>
            </div>
            <Badge variant="secondary" className="bg-amber-100 text-amber-700">{alerts.atRiskDonors}</Badge>
          </Link>
        )}
        {alerts.failedPayments > 0 && (
          <Link href="/missionary-dashboard/donors?filter=failed" className="flex items-center justify-between p-2.5 rounded-lg bg-rose-50 dark:bg-rose-950/30 hover:bg-rose-100 dark:hover:bg-rose-950/50 transition-colors">
            <div className="flex items-center gap-2">
              <CreditCard className="h-4 w-4 text-rose-600" />
              <span className="text-sm font-medium">Failed Payments</span>
            </div>
            <Badge variant="destructive">{alerts.failedPayments}</Badge>
          </Link>
        )}
        <Link href="/missionary-dashboard/tasks" className="flex items-center justify-between p-2.5 rounded-lg bg-blue-50 dark:bg-blue-950/30 hover:bg-blue-100 dark:hover:bg-blue-950/50 transition-colors">
          <div className="flex items-center gap-2">
            <CheckSquare className="h-4 w-4 text-blue-600" />
            <span className="text-sm font-medium">Pending Tasks</span>
          </div>
          <Badge variant="secondary" className="bg-blue-100 text-blue-700">{alerts.pendingTasks}</Badge>
        </Link>
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Recent Activity</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" asChild>
            <Link href="/missionary-dashboard/donors">
              View All <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentActivity.map((activity, index) => (
          <div 
            key={activity.id} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
              activity.type === 'gift' ? 'bg-emerald-100 dark:bg-emerald-950' : 'bg-blue-100 dark:bg-blue-950'
            }`}>
              {activity.type === 'gift' ? (
                <Heart className="h-4 w-4 text-emerald-600" />
              ) : (
                <RefreshCcw className="h-4 w-4 text-blue-600" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium truncate">{activity.donor}</p>
                {activity.isNew && (
                  <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-emerald-100 text-emerald-700">NEW</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {activity.type === 'gift' ? 'One-time gift' : 'Recurring gift'} • ${activity.amount}
              </p>
            </div>
            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function SupportersList() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold">Top Supporters</CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" asChild>
            <Link href="/missionary-dashboard/donors">
              All Donors <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentSupporters.map((supporter, index) => (
          <div 
            key={supporter.id} 
            className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <Avatar className="h-9 w-9">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xs">
                {supporter.initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{supporter.name}</p>
              <p className="text-xs text-muted-foreground">
                ${supporter.amount}/{supporter.frequency}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">{supporter.date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <CheckSquare className="h-5 w-5 text-primary" />
            Tasks Due Soon
          </CardTitle>
          <Button variant="ghost" size="sm" className="text-xs" asChild>
            <Link href="/missionary-dashboard/tasks">
              All Tasks <ArrowUpRight className="ml-1 h-3 w-3" />
            </Link>
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-2">
        {pendingTasks.map((task, index) => (
          <div 
            key={task.id} 
            className="flex items-center gap-3 p-2.5 rounded-lg border bg-card hover:bg-muted/50 transition-colors animate-fade-in-up"
            style={{ animationDelay: `${index * 50}ms` }}
          >
            <div className={`h-2 w-2 rounded-full ${
              task.priority === 'high' ? 'bg-rose-500' : task.priority === 'medium' ? 'bg-amber-500' : 'bg-blue-500'
            }`} />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium truncate">{task.title}</p>
            </div>
            <Badge variant="outline" className="text-xs shrink-0">
              <Clock className="h-3 w-3 mr-1" />
              {task.dueDate}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function QuickActions() {
  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/missionary-dashboard/feed/new">
            <Sparkles className="h-4 w-4" />
            <span className="text-xs">Post Update</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/missionary-dashboard/newsletter">
            <Mail className="h-4 w-4" />
            <span className="text-xs">Send Newsletter</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/missionary-dashboard/donors">
            <Users className="h-4 w-4" />
            <span className="text-xs">View Donors</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/missionary-dashboard/tasks/new">
            <Calendar className="h-4 w-4" />
            <span className="text-xs">Add Task</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold tracking-tight">Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Here&apos;s how your ministry support is doing.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 animate-fade-in-up stagger-1">
        <StatCard
          title="Monthly Support"
          value={`$${stats.monthlySupport.toLocaleString()}`}
          subtitle={`${stats.percentFunded}% of goal`}
          icon={DollarSign}
          trend="up"
          trendValue="+12%"
        />
        <StatCard
          title="Active Supporters"
          value={stats.activeSupporters}
          subtitle={`+${stats.newSupportersThisMonth} this month`}
          icon={Users}
          trend="up"
          trendValue={`+${stats.newSupportersThisMonth}`}
        />
        <StatCard
          title="Year to Date"
          value={`$${stats.yearToDateGiving.toLocaleString()}`}
          subtitle="Total received"
          icon={TrendingUp}
          trend="up"
          trendValue="+8% vs last year"
        />
        <StatCard
          title="This Month"
          value={`$${stats.monthToDateGiving.toLocaleString()}`}
          subtitle="Month to date"
          icon={Calendar}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-2">
          <div className="grid gap-6 md:grid-cols-2 animate-fade-in-up stagger-2">
            <FundingMeter />
            <BalanceCard />
          </div>
          <div className="animate-fade-in-up stagger-3">
            <ActivityFeed />
          </div>
          <div className="animate-fade-in-up stagger-4">
            <TasksPreview />
          </div>
        </div>
        <div className="space-y-6">
          <div className="animate-fade-in-up stagger-2">
            <AlertsCard />
          </div>
          <div className="animate-fade-in-up stagger-3">
            <SupportersList />
          </div>
          <div className="animate-fade-in-up stagger-4">
            <QuickActions />
          </div>
        </div>
      </div>
    </div>
  )
}
