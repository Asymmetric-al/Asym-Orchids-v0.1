'use client'

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Users, DollarSign, Activity, Globe, ArrowUpRight, ArrowDownRight, Bell, Calendar, Plus, Search, MoreHorizontal, CheckCircle2, AlertCircle, Clock } from "lucide-react"
import { useMC } from '@/lib/mission-control/context'
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid, BarChart, Bar } from "recharts"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"

const data = [
  { name: "Jan", total: 2400 },
  { name: "Feb", total: 1398 },
  { name: "Mar", total: 9800 },
  { name: "Apr", total: 3908 },
  { name: "May", total: 4800 },
  { name: "Jun", total: 3800 },
  { name: "Jul", total: 4300 },
]

const recentActivity = [
  {
    user: "Sarah Johnson",
    action: "New Donation Received",
    amount: "$150.00",
    time: "2m ago",
    initials: "SJ",
    color: "bg-chart-1/20 text-chart-1",
    type: "donation"
  },
  {
    user: "John Doe",
    action: "Missionary Approved",
    detail: "South East Asia",
    time: "1h ago",
    initials: "JD",
    color: "bg-chart-2/20 text-chart-2",
    type: "system"
  },
  {
    user: "Clean Water Initiative",
    action: "Campaign Goal Met",
    amount: "$10,000",
    time: "3h ago",
    initials: "CW",
    color: "bg-chart-4/20 text-chart-4",
    type: "campaign"
  },
  {
    user: "System",
    action: "Alert",
    detail: "Email service latency",
    time: "5h ago",
    initials: "SY",
    color: "bg-chart-5/20 text-chart-5",
    type: "alert"
  }
]

const missionaries = [
  { name: "John & Jane Doe", location: "Chiang Mai, Thailand", status: "On Field", avatar: "/avatars/01.png" },
  { name: "Sarah Smith", location: "Nairobi, Kenya", status: "On Field", avatar: "/avatars/02.png" },
  { name: "David & Ruth Miller", location: "Chicago, USA", status: "Furlough", avatar: "/avatars/03.png" },
]

export default function MissionControlPage() {
  const { user } = useMC()
  const currentDate = new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })

  return (
    <div className="flex-1 space-y-6 p-8 pt-6 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div className="space-y-1">
          <h2 className="text-3xl font-bold tracking-tight text-foreground">
            Mission Control
          </h2>
          <p className="text-muted-foreground">
            {currentDate} • Overview of your ministry impact.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <div className="relative hidden md:block">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <input
              type="search"
              placeholder="Search..."
              className="h-9 w-64 rounded-md border border-input bg-background pl-9 pr-4 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-ring"
            />
          </div>
          <Button variant="outline" size="sm" className="h-9">
            <Calendar className="mr-2 h-4 w-4" />
            Schedule
          </Button>
          <Button size="sm" className="h-9">
            <Plus className="mr-2 h-4 w-4" />
            New Entry
          </Button>
        </div>
      </div>
      
      {/* Stats Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Total Revenue</CardTitle>
            <div className="h-8 w-8 rounded-full bg-chart-1/10 flex items-center justify-center">
              <DollarSign className="h-4 w-4 text-chart-1" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">$45,231.89</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-chart-1 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                20.1%
              </span>
              <span className="ml-1 opacity-70">from last month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Missionaries</CardTitle>
            <div className="h-8 w-8 rounded-full bg-chart-2/10 flex items-center justify-center">
              <Globe className="h-4 w-4 text-chart-2" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">24</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-chart-1 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +2
              </span>
              <span className="ml-1 opacity-70">new this month</span>
            </p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Active Donors</CardTitle>
            <div className="h-8 w-8 rounded-full bg-chart-4/10 flex items-center justify-center">
              <Users className="h-4 w-4 text-chart-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">573</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-chart-1 font-medium flex items-center">
                <ArrowUpRight className="h-3 w-3 mr-1" />
                +12%
              </span>
              <span className="ml-1 opacity-70">since last quarter</span>
            </p>
          </CardContent>
        </Card>
        <Card className="hover:border-primary/50 transition-colors cursor-pointer">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">Projects Completed</CardTitle>
            <div className="h-8 w-8 rounded-full bg-chart-5/10 flex items-center justify-center">
              <Activity className="h-4 w-4 text-chart-5" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">12</div>
            <p className="text-xs text-muted-foreground mt-1 flex items-center">
              <span className="text-chart-5 font-medium flex items-center">
                <ArrowDownRight className="h-3 w-3 mr-1" />
                -1
              </span>
              <span className="ml-1 opacity-70">from last month</span>
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        
        {/* Left Column (Charts) */}
        <div className="col-span-4 space-y-6">
          <Card className="col-span-4 shadow-sm border-none bg-background/50 ring-1 ring-border/50">
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Growth Metrics</CardTitle>
                  <CardDescription>
                    Revenue overview for the current year.
                  </CardDescription>
                </div>
                <Button variant="outline" size="sm" className="h-8">
                  View Report
                </Button>
              </div>
            </CardHeader>
            <CardContent className="pl-0">
              <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                      <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--chart-1)" stopOpacity={0.2}/>
                        <stop offset="95%" stopColor="var(--chart-1)" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <XAxis 
                      dataKey="name" 
                      stroke="var(--muted-foreground)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      dy={10}
                    />
                    <YAxis 
                      stroke="var(--muted-foreground)" 
                      fontSize={12} 
                      tickLine={false} 
                      axisLine={false} 
                      tickFormatter={(value) => `$${value}`} 
                      dx={-10}
                    />
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                    <Tooltip 
                      contentStyle={{ 
                        backgroundColor: 'var(--popover)', 
                        borderColor: 'var(--border)', 
                        borderRadius: 'var(--radius)',
                        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                        padding: '12px'
                      }}
                      itemStyle={{ color: 'var(--foreground)', fontWeight: 500 }}
                      cursor={{ stroke: 'var(--chart-1)', strokeWidth: 1, strokeDasharray: '4 4' }}
                    />
                    <Area 
                      type="monotone" 
                      dataKey="total" 
                      stroke="var(--chart-1)" 
                      strokeWidth={3}
                      fillOpacity={1} 
                      fill="url(#colorTotal)" 
                      animationDuration={1500}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <div className="grid gap-6 md:grid-cols-2">
            <Card className="shadow-sm border-none bg-background/50 ring-1 ring-border/50">
              <CardHeader>
                <CardTitle className="text-base">Top Regions</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                  {['North America', 'Southeast Asia', 'East Africa'].map((region, i) => (
                    <div key={region} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-2 h-2 rounded-full ${i === 0 ? 'bg-chart-1' : i === 1 ? 'bg-chart-2' : 'bg-chart-3'}`} />
                        <span className="text-sm font-medium">{region}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">{i === 0 ? '45%' : i === 1 ? '32%' : '23%'}</span>
                    </div>
                  ))}
                 </div>
              </CardContent>
            </Card>
            <Card className="shadow-sm border-none bg-background/50 ring-1 ring-border/50">
               <CardHeader>
                <CardTitle className="text-base">Support Types</CardTitle>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                  {[
                    { label: 'Recurring', value: '65%', color: 'bg-chart-1' },
                    { label: 'One-time', value: '25%', color: 'bg-chart-2' },
                    { label: 'Offline', value: '10%', color: 'bg-chart-3' }
                  ].map((item, i) => (
                    <div key={item.label} className="space-y-1">
                      <div className="flex items-center justify-between text-sm">
                        <span className="font-medium">{item.label}</span>
                        <span className="text-muted-foreground">{item.value}</span>
                      </div>
                      <div className="h-2 w-full rounded-full bg-secondary overflow-hidden">
                        <div 
                          className={`h-full ${item.color}`} 
                          style={{ width: item.value }} 
                        />
                      </div>
                    </div>
                  ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Right Column (Feed & Lists) */}
        <div className="col-span-3 space-y-6">
          
          {/* Recent Activity */}
          <Card className="shadow-sm border-none bg-background/50 ring-1 ring-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-base">Recent Activity</CardTitle>
                <CardDescription>Latest actions.</CardDescription>
              </div>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <Bell className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {recentActivity.map((item, index) => (
                  <div key={index} className="flex items-start gap-4 relative">
                    {index !== recentActivity.length - 1 && (
                      <div className="absolute left-[19px] top-10 bottom-[-24px] w-[1px] bg-border" />
                    )}
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarFallback className={item.color}>{item.initials}</AvatarFallback>
                    </Avatar>
                    <div className="space-y-1 pt-1">
                      <p className="text-sm font-medium leading-none">
                        {item.action}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {item.amount && <span className="font-medium text-foreground mr-1">{item.amount}</span>}
                        {item.detail && <span className="text-foreground mr-1">{item.detail}</span>}
                        {(!item.amount && !item.detail) && <span className="text-foreground mr-1">{item.user}</span>}
                        {item.amount && `from ${item.user}`}
                      </p>
                      <p className="text-xs text-muted-foreground flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        {item.time}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Missionaries List */}
          <Card className="shadow-sm border-none bg-background/50 ring-1 ring-border/50">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
              <div className="space-y-1">
                <CardTitle className="text-base">Missionaries</CardTitle>
                <CardDescription>Active personnel.</CardDescription>
              </div>
              <Button variant="ghost" size="sm" className="h-8 text-xs">View All</Button>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {missionaries.map((m, i) => (
                  <div key={i} className="flex items-center justify-between group cursor-pointer p-2 -mx-2 hover:bg-muted/50 rounded-lg transition-colors">
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        {/* Simulated avatar images for now, falling back to initials */}
                        <AvatarFallback>{m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <p className="text-sm font-medium leading-none">{m.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">{m.location}</p>
                      </div>
                    </div>
                    <Badge variant={m.status === 'On Field' ? 'default' : 'secondary'} className="text-[10px] h-5">
                      {m.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

        </div>
      </div>
    </div>
  )
}