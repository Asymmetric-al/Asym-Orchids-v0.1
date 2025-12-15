'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity, Globe, ArrowUpRight, ArrowDownRight, Bell, Calendar, Plus } from "lucide-react"
import { useMC } from '@/lib/mission-control/context'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts"
import { Button } from "@/components/ui/button"

const data = [
  { name: "Jan", total: 2400 },
  { name: "Feb", total: 1398 },
  { name: "Mar", total: 9800 },
  { name: "Apr", total: 3908 },
  { name: "May", total: 4800 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4300 },
]

export default function MissionControlPage() {
  const { user } = useMC()

  return (
    <div className="flex-1 space-y-8 p-8 pt-6">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Welcome back, {user?.name?.split(' ')[0] || 'Missionary'}
          </h2>
          <p className="text-muted-foreground text-lg">
            Here's what's happening across your mission today.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="outline" className="hidden sm:flex">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            New Update
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-emerald-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+20.1%</span>
              <span className="ml-1">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Missionaries</CardTitle>
            <Globe className="h-4 w-4 text-blue-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">24</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+2</span>
              <span className="ml-1">new this month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Donors</CardTitle>
            <Users className="h-4 w-4 text-violet-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">573</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowUpRight className="h-3 w-3 text-emerald-500 mr-1" />
              <span className="text-emerald-500 font-medium">+12%</span>
              <span className="ml-1">since last quarter</span>
            </p>
          </CardContent>
        </Card>
        <Card className="shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Projects</CardTitle>
            <Activity className="h-4 w-4 text-orange-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">12</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <ArrowDownRight className="h-3 w-3 text-rose-500 mr-1" />
              <span className="text-rose-500 font-medium">-1</span>
              <span className="ml-1">completed recently</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Area */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Growth Chart */}
        <Card className="col-span-4 shadow-sm">
          <CardHeader>
            <CardTitle>Growth Metrics</CardTitle>
            <CardDescription>
              Revenue overview for the current year.
            </CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[350px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data}>
                  <defs>
                    <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis 
                    dataKey="name" 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                  />
                  <YAxis 
                    stroke="#888888" 
                    fontSize={12} 
                    tickLine={false} 
                    axisLine={false} 
                    tickFormatter={(value) => `$${value}`} 
                  />
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" />
                  <Tooltip 
                    contentStyle={{ 
                      backgroundColor: 'var(--background)', 
                      borderColor: 'var(--border)', 
                      borderRadius: 'var(--radius)',
                      boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                    }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area 
                    type="monotone" 
                    dataKey="total" 
                    stroke="var(--primary)" 
                    strokeWidth={2}
                    fillOpacity={1} 
                    fill="url(#colorTotal)" 
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Recent Activity Feed */}
        <Card className="col-span-3 shadow-sm">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle>Recent Activity</CardTitle>
                <CardDescription>Latest actions across your organization.</CardDescription>
              </div>
              <Bell className="h-4 w-4 text-muted-foreground" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              <div className="flex items-start">
                <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-emerald-100 text-xs font-medium text-emerald-700">SJ</span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">New Donation Received</p>
                  <p className="text-sm text-muted-foreground">
                    <span className="font-semibold text-foreground">$150.00</span> from Sarah Johnson
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">2 minutes ago</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-blue-100 text-xs font-medium text-blue-700">JD</span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Missionary Approved</p>
                  <p className="text-sm text-muted-foreground">
                    John Doe - South East Asia
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">1 hour ago</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-violet-100 text-xs font-medium text-violet-700">CW</span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">Campaign Goal Met</p>
                  <p className="text-sm text-muted-foreground">
                    Clean Water Initiative hit <span className="font-semibold text-foreground">$10k</span>
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">3 hours ago</p>
                </div>
              </div>

              <div className="flex items-start">
                <div className="relative flex h-9 w-9 shrink-0 overflow-hidden rounded-full border">
                  <span className="flex h-full w-full items-center justify-center rounded-full bg-orange-100 text-xs font-medium text-orange-700">SYS</span>
                </div>
                <div className="ml-4 space-y-1">
                  <p className="text-sm font-medium leading-none">System Alert</p>
                  <p className="text-sm text-muted-foreground">
                    Email service latency detected
                  </p>
                  <p className="text-xs text-muted-foreground pt-1">5 hours ago</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
