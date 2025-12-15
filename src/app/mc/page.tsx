'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity, Globe, ArrowUpRight, ArrowDownRight, Bell, Calendar, Plus, TrendingUp, MoreHorizontal, ChevronRight } from "lucide-react"
import { useMC } from '@/lib/mission-control/context'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, Bar, BarChart } from "recharts"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Separator } from "@/components/ui/separator"

const revenueData = [
  { name: "Jan", revenue: 2400, donors: 145 },
  { name: "Feb", revenue: 1398, donors: 132 },
  { name: "Mar", revenue: 9800, donors: 201 },
  { name: "Apr", revenue: 3908, donors: 178 },
  { name: "May", revenue: 4800, donors: 189 },
  { name: "Jun", revenue: 3800, donors: 167 },
  { name: "Jul", revenue: 4300, donors: 195 },
]

const weeklyData = [
  { day: "Mon", amount: 1200 },
  { day: "Tue", amount: 900 },
  { day: "Wed", amount: 1600 },
  { day: "Thu", amount: 1100 },
  { day: "Fri", amount: 2100 },
  { day: "Sat", amount: 800 },
  { day: "Sun", amount: 1400 },
]

const recentActivity = [
  { id: 1, initials: "SJ", name: "Sarah Johnson", action: "New Donation", detail: "$150.00", time: "2 min ago", color: "bg-emerald-500/10 text-emerald-600 dark:text-emerald-400" },
  { id: 2, initials: "JD", name: "John Doe", action: "Missionary Approved", detail: "South East Asia", time: "1 hour ago", color: "bg-blue-500/10 text-blue-600 dark:text-blue-400" },
  { id: 3, initials: "CW", name: "Clean Water", action: "Goal Reached", detail: "$10,000", time: "3 hours ago", color: "bg-violet-500/10 text-violet-600 dark:text-violet-400" },
  { id: 4, initials: "MK", name: "Mike Kim", action: "Report Submitted", detail: "Q4 Summary", time: "5 hours ago", color: "bg-amber-500/10 text-amber-600 dark:text-amber-400" },
]

const upcomingTasks = [
  { id: 1, title: "Review missionary applications", dueDate: "Today", priority: "high" },
  { id: 2, title: "Send monthly newsletter", dueDate: "Tomorrow", priority: "medium" },
  { id: 3, title: "Quarterly donor report", dueDate: "Dec 20", priority: "low" },
]

export default function MissionControlPage() {
  const { user } = useMC()

  return (
    <div className="flex-1 p-6 lg:p-8">
      <div className="mx-auto max-w-7xl space-y-8">
        <header className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-2xl font-semibold tracking-tight">
              Welcome back, {user?.name?.split(' ')[0] || 'User'}
            </h1>
            <p className="text-sm text-muted-foreground">
              Here&apos;s what&apos;s happening with your mission today.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="h-9">
              <Calendar className="mr-2 h-4 w-4" />
              Dec 15, 2025
            </Button>
            <Button size="sm" className="h-9">
              <Plus className="mr-2 h-4 w-4" />
              New Update
            </Button>
          </div>
        </header>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <Card className="group relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500/10">
                <DollarSign className="h-4 w-4 text-emerald-600 dark:text-emerald-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">$45,231.89</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Badge variant="secondary" className="gap-1 rounded-md bg-emerald-500/10 px-1.5 py-0.5 font-medium text-emerald-600 hover:bg-emerald-500/10 dark:text-emerald-400">
                  <ArrowUpRight className="h-3 w-3" />
                  20.1%
                </Badge>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-emerald-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>

          <Card className="group relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Missionaries</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-500/10">
                <Globe className="h-4 w-4 text-blue-600 dark:text-blue-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">24</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Badge variant="secondary" className="gap-1 rounded-md bg-blue-500/10 px-1.5 py-0.5 font-medium text-blue-600 hover:bg-blue-500/10 dark:text-blue-400">
                  <ArrowUpRight className="h-3 w-3" />
                  2 new
                </Badge>
                <span className="text-muted-foreground">this month</span>
              </div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>

          <Card className="group relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Donors</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-violet-500/10">
                <Users className="h-4 w-4 text-violet-600 dark:text-violet-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">573</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Badge variant="secondary" className="gap-1 rounded-md bg-violet-500/10 px-1.5 py-0.5 font-medium text-violet-600 hover:bg-violet-500/10 dark:text-violet-400">
                  <ArrowUpRight className="h-3 w-3" />
                  12%
                </Badge>
                <span className="text-muted-foreground">since last quarter</span>
              </div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-violet-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>

          <Card className="group relative overflow-hidden">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-500/10">
                <Activity className="h-4 w-4 text-amber-600 dark:text-amber-400" />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-semibold">12</div>
              <div className="mt-1 flex items-center gap-1 text-xs">
                <Badge variant="secondary" className="gap-1 rounded-md bg-rose-500/10 px-1.5 py-0.5 font-medium text-rose-600 hover:bg-rose-500/10 dark:text-rose-400">
                  <ArrowDownRight className="h-3 w-3" />
                  1
                </Badge>
                <span className="text-muted-foreground">completed recently</span>
              </div>
            </CardContent>
            <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-amber-500/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Revenue Overview</CardTitle>
                <CardDescription className="text-sm">Monthly revenue for the current year</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[280px]">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stopColor="#18181b" stopOpacity={0.12}/>
                        <stop offset="100%" stopColor="#18181b" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="#a1a1aa" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      dy={8}
                    />
                    <YAxis 
                      stroke="#a1a1aa" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
                      dx={-8}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'var(--border)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '13px'
                      }}
                      itemStyle={{ color: 'var(--foreground)' }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Revenue']}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="revenue" 
                      stroke="#18181b"
                      strokeWidth={2}
                      fill="url(#revenueGradient)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between text-sm">
                <div className="flex items-center gap-2 text-muted-foreground">
                  <TrendingUp className="h-4 w-4 text-emerald-500" />
                  <span>Trending up by <span className="font-medium text-foreground">5.2%</span> this month</span>
                </div>
                <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                  View Report
                  <ChevronRight className="h-3 w-3" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">This Week</CardTitle>
                <CardDescription className="text-sm">Daily donation totals</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={weeklyData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                    <XAxis 
                      dataKey="day" 
                      stroke="#a1a1aa" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false}
                      dy={8}
                    />
                    <YAxis 
                      stroke="#a1a1aa" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`}
                      dx={-8}
                    />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--background)', 
                        borderColor: 'var(--border)', 
                        borderRadius: '8px',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                        fontSize: '13px'
                      }}
                      formatter={(value: number) => [`$${value.toLocaleString()}`, 'Donations']}
                    />
                    <Bar 
                      dataKey="amount" 
                      fill="#18181b"
                      radius={[4, 4, 0, 0]}
                      className="fill-primary"
                    />
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <Separator className="my-4" />
              <div className="flex items-center justify-between">
                <div className="text-sm text-muted-foreground">
                  Total: <span className="font-semibold text-foreground">$9,100</span>
                </div>
                <Badge variant="secondary" className="text-xs">
                  +23% vs last week
                </Badge>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 lg:grid-cols-7">
          <Card className="lg:col-span-4">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Recent Activity</CardTitle>
                <CardDescription className="text-sm">Latest actions across your organization</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {recentActivity.map((item, index) => (
                  <div 
                    key={item.id} 
                    className="flex items-center gap-4 px-6 py-4 transition-colors hover:bg-muted/50"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    <Avatar className="h-10 w-10 border">
                      <AvatarFallback className={item.color}>{item.initials}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-medium leading-none">{item.action}</p>
                        <Badge variant="outline" className="px-1.5 py-0 text-[10px] font-normal">
                          {item.time}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        <span className="font-medium text-foreground">{item.detail}</span>
                        {item.name && ` from ${item.name}`}
                      </p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View all activity
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="lg:col-span-3">
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle className="text-base font-semibold">Upcoming Tasks</CardTitle>
                <CardDescription className="text-sm">Your scheduled items</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-xs">
                <Plus className="h-3 w-3" />
                Add
              </Button>
            </CardHeader>
            <CardContent className="p-0">
              <div className="divide-y">
                {upcomingTasks.map((task) => (
                  <div key={task.id} className="flex items-center gap-4 px-6 py-4">
                    <div className={`h-2 w-2 rounded-full ${
                      task.priority === 'high' ? 'bg-rose-500' : 
                      task.priority === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
                    }`} />
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">{task.title}</p>
                      <p className="text-xs text-muted-foreground">{task.dueDate}</p>
                    </div>
                    <Button variant="ghost" size="icon" className="h-8 w-8 shrink-0">
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </div>
                ))}
              </div>
              <div className="border-t p-4">
                <Button variant="ghost" className="w-full text-sm" size="sm">
                  View all tasks
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid gap-4 sm:grid-cols-3">
          <Card className="group relative overflow-hidden border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Users className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium">Invite Team Members</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Collaborate with your team
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Send Invite
              </Button>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Globe className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium">Add Missionary</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Expand your mission reach
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Get Started
              </Button>
            </CardContent>
          </Card>

          <Card className="group relative overflow-hidden border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-8 text-center">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                <Activity className="h-6 w-6 text-muted-foreground" />
              </div>
              <h3 className="font-medium">Create Campaign</h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Launch a new fundraiser
              </p>
              <Button variant="outline" size="sm" className="mt-4">
                Create Now
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
