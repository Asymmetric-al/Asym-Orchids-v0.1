'use client'

import * as React from 'react'
import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
    <Card className="border">
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-sm text-muted-foreground">{title}</p>
            <p className="text-2xl font-semibold mt-1">{value}</p>
            {subtitle && <p className="text-sm text-muted-foreground mt-1">{subtitle}</p>}
          </div>
          <div className="h-10 w-10 rounded-lg bg-muted flex items-center justify-center">
            <Icon className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function FundingProgress() {
  return (
    <Card className="border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Funding Progress</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-baseline justify-between">
            <span className="text-3xl font-semibold">${stats.monthlySupport.toLocaleString()}</span>
            <span className="text-sm text-muted-foreground">of ${stats.monthlyGoal.toLocaleString()}</span>
          </div>
          <div className="h-2 bg-muted rounded-full overflow-hidden">
            <div 
              className="h-full bg-[#5d7052] rounded-full transition-all"
              style={{ width: `${Math.min(stats.percentFunded, 100)}%` }}
            />
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">{stats.percentFunded}% funded</span>
            <span className="text-muted-foreground">${(stats.monthlyGoal - stats.monthlySupport).toLocaleString()} remaining</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function BalanceCard() {
  return (
    <Card className="border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Available Balance</CardTitle>
      </CardHeader>
      <CardContent>
        <p className="text-3xl font-semibold">${stats.currentBalance.toLocaleString()}</p>
        <div className="flex items-center gap-2 mt-2 text-sm text-[#5d7052]">
          <TrendingUp className="h-4 w-4" />
          +$825 this month
        </div>
        <Button variant="outline" size="sm" className="w-full mt-4">
          View Transactions
        </Button>
      </CardContent>
    </Card>
  )
}

function ActivityFeed() {
  return (
    <Card className="border">
      <CardHeader className="flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-medium">Recent Activity</CardTitle>
        <Link href="/missionary-dashboard/donors" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          View All <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-3">
        {recentActivity.map((activity) => (
          <div key={activity.id} className="flex items-center gap-3 p-3 rounded-lg border">
            <div className={`flex h-9 w-9 items-center justify-center rounded-full ${
              activity.type === 'gift' ? 'bg-[#e8ebe5]' : 'bg-muted'
            }`}>
              {activity.type === 'gift' ? (
                <Heart className="h-4 w-4 text-[#5d7052]" />
              ) : (
                <RefreshCcw className="h-4 w-4 text-muted-foreground" />
              )}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <p className="text-sm font-medium">{activity.donor}</p>
                {activity.isNew && (
                  <Badge className="bg-[#5d7052] text-white text-[10px] px-1.5 py-0">NEW</Badge>
                )}
              </div>
              <p className="text-xs text-muted-foreground">
                {activity.type === 'gift' ? 'One-time' : 'Recurring'} • ${activity.amount}
              </p>
            </div>
            <span className="text-xs text-muted-foreground">{activity.date}</span>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}

function TasksPreview() {
  return (
    <Card className="border">
      <CardHeader className="flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-medium">Tasks Due Soon</CardTitle>
        <Link href="/missionary-dashboard/tasks" className="text-sm text-muted-foreground hover:text-foreground flex items-center gap-1">
          All Tasks <ArrowRight className="h-3 w-3" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {pendingTasks.map((task) => (
          <div key={task.id} className="flex items-center gap-3 p-3 rounded-lg border">
            <div className={`h-2 w-2 rounded-full ${
              task.priority === 'high' ? 'bg-red-500' : 'bg-amber-500'
            }`} />
            <p className="text-sm font-medium flex-1">{task.title}</p>
            <Badge variant="outline" className="text-xs">
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
    <Card className="border">
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-medium">Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-2 gap-2">
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/missionary-dashboard/feed/new">
            <Mail className="h-4 w-4" />
            <span className="text-xs">Post Update</span>
          </Link>
        </Button>
        <Button variant="outline" className="h-auto py-3 flex-col gap-1" asChild>
          <Link href="/missionary-dashboard/newsletter">
            <Mail className="h-4 w-4" />
            <span className="text-xs">Newsletter</span>
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
            <CheckSquare className="h-4 w-4" />
            <span className="text-xs">Add Task</span>
          </Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function MissionaryDashboardPage() {
  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-2xl font-semibold">Welcome back, Sarah</h1>
        <p className="text-muted-foreground">Here&apos;s how your ministry support is doing.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-6">
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
  )
}