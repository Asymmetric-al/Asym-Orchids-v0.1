'use client'

import * as React from 'react'
import dynamic from 'next/dynamic'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Skeleton } from '@/components/ui/skeleton'
import {
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  RefreshCcw,
  Download,
  Sparkles,
  AlertTriangle,
  Clock,
} from 'lucide-react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, PieChart, Pie, Cell, LineChart, Line, Area, AreaChart } from 'recharts'

const monthlyData = [
  { month: 'Jul', total: 3200, recurring: 2800, oneTime: 400 },
  { month: 'Aug', total: 3450, recurring: 2900, oneTime: 550 },
  { month: 'Sep', total: 3100, recurring: 2850, oneTime: 250 },
  { month: 'Oct', total: 4200, recurring: 3000, oneTime: 1200 },
  { month: 'Nov', total: 3800, recurring: 3100, oneTime: 700 },
  { month: 'Dec', total: 4250, recurring: 3250, oneTime: 1000 },
]

const donorSegments = [
  { name: 'Active', value: 4, color: '#10b981' },
  { name: 'New', value: 2, color: '#3b82f6' },
  { name: 'At Risk', value: 1, color: '#f59e0b' },
  { name: 'Lapsed', value: 1, color: '#ef4444' },
]

const givingTypeData = [
  { name: 'Recurring', value: 76, color: '#3b82f6' },
  { name: 'One-time', value: 24, color: '#10b981' },
]

const yearOverYear = [
  { month: 'Jan', current: 3500, previous: 3200 },
  { month: 'Feb', current: 3800, previous: 3100 },
  { month: 'Mar', current: 4100, previous: 3400 },
  { month: 'Apr', current: 3900, previous: 3600 },
  { month: 'May', current: 4200, previous: 3800 },
  { month: 'Jun', current: 4000, previous: 3500 },
  { month: 'Jul', current: 3200, previous: 3000 },
  { month: 'Aug', current: 3450, previous: 3200 },
  { month: 'Sep', current: 3100, previous: 2900 },
  { month: 'Oct', current: 4200, previous: 3700 },
  { month: 'Nov', current: 3800, previous: 3400 },
  { month: 'Dec', current: 4250, previous: 3600 },
]

function ChartSkeleton() {
  return (
    <div className="space-y-3">
      <Skeleton className="h-[200px] w-full" />
    </div>
  )
}

function StatCard({ title, value, subtitle, trend, trendValue, icon: Icon }: {
  title: string
  value: string
  subtitle?: string
  trend?: 'up' | 'down'
  trendValue?: string
  icon: React.ElementType
}) {
  return (
    <Card>
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">{title}</p>
            <p className="text-2xl font-bold">{value}</p>
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

function DonorSegmentChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Donor Segmentation</CardTitle>
        <CardDescription>Current supporter breakdown</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={donorSegments}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={4}
                dataKey="value"
              >
                {donorSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {donorSegments.map((segment) => (
            <div key={segment.name} className="flex items-center gap-2">
              <div className="h-3 w-3 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-sm">{segment.name}</span>
              <span className="text-sm font-semibold ml-auto">{segment.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MonthlyGivingChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Monthly Giving</CardTitle>
            <CardDescription>Last 6 months of donations</CardDescription>
          </div>
          <Select defaultValue="6m">
            <SelectTrigger className="w-[100px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="6m">6 months</SelectItem>
              <SelectItem value="12m">12 months</SelectItem>
              <SelectItem value="all">All time</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={monthlyData}>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7' }}
            />
            <Bar dataKey="recurring" stackId="a" fill="#3b82f6" radius={[0, 0, 0, 0]} name="Recurring" />
            <Bar dataKey="oneTime" stackId="a" fill="#10b981" radius={[4, 4, 0, 0]} name="One-time" />
          </BarChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#3b82f6]" />
            <span className="text-sm text-muted-foreground">Recurring</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#10b981]" />
            <span className="text-sm text-muted-foreground">One-time</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function GivingTypeChart() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg">Giving Breakdown</CardTitle>
        <CardDescription>Recurring vs one-time gifts</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-center">
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie
                data={givingTypeData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={80}
                paddingAngle={2}
                dataKey="value"
              >
                {givingTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip formatter={(value: number) => [`${value}%`, '']} />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-6 mt-4">
          {givingTypeData.map((type) => (
            <div key={type.name} className="text-center">
              <div className="flex items-center gap-2 justify-center">
                <div className="h-3 w-3 rounded-full" style={{ backgroundColor: type.color }} />
                <span className="text-sm font-medium">{type.name}</span>
              </div>
              <p className="text-xl font-bold mt-1">{type.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function YearComparisonChart() {
  return (
    <Card className="lg:col-span-2">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-lg">Year-over-Year Comparison</CardTitle>
            <CardDescription>2024 vs 2023 monthly giving</CardDescription>
          </div>
          <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% YTD
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={yearOverYear}>
            <defs>
              <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
              </linearGradient>
              <linearGradient id="colorPrevious" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#94a3b8" stopOpacity={0.2}/>
                <stop offset="95%" stopColor="#94a3b8" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <XAxis dataKey="month" tick={{ fontSize: 12 }} />
            <YAxis tick={{ fontSize: 12 }} tickFormatter={(value) => `$${value / 1000}k`} />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e4e4e7' }}
            />
            <Area type="monotone" dataKey="current" stroke="#3b82f6" fillOpacity={1} fill="url(#colorCurrent)" strokeWidth={2} name="2024" />
            <Area type="monotone" dataKey="previous" stroke="#94a3b8" fillOpacity={1} fill="url(#colorPrevious)" strokeWidth={2} name="2023" />
          </AreaChart>
        </ResponsiveContainer>
        <div className="flex items-center justify-center gap-6 mt-4">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#3b82f6]" />
            <span className="text-sm text-muted-foreground">2024</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded bg-[#94a3b8]" />
            <span className="text-sm text-muted-foreground">2023</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function RecurringHealthCard() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <RefreshCcw className="h-5 w-5 text-blue-600" />
          Recurring Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Monthly recurring</span>
            <span className="font-semibold">$475</span>
          </div>
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Projected annual</span>
            <span className="font-semibold">$5,700</span>
          </div>
        </div>
        <div className="pt-4 border-t space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm">Active</span>
            </div>
            <span className="text-sm font-medium">4 donors</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm">At Risk</span>
            </div>
            <span className="text-sm font-medium">0 donors</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-sm">Cancelled</span>
            </div>
            <span className="text-sm font-medium">0 this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground">Track your fundraising trends and donor insights.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export Report
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Year to Date"
          value="$48,500"
          trend="up"
          trendValue="+12%"
          subtitle="vs last year"
          icon={DollarSign}
        />
        <StatCard
          title="Monthly Average"
          value="$4,041"
          trend="up"
          trendValue="+8%"
          subtitle="vs last year"
          icon={Calendar}
        />
        <StatCard
          title="Total Donors"
          value="8"
          trend="up"
          trendValue="+2"
          subtitle="this year"
          icon={Users}
        />
        <StatCard
          title="Goal Progress"
          value="85%"
          subtitle="$4,250 of $5,000"
          icon={Target}
        />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <MonthlyGivingChart />
        <DonorSegmentChart />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <YearComparisonChart />
        <div className="space-y-6">
          <GivingTypeChart />
          <RecurringHealthCard />
        </div>
      </div>
    </div>
  )
}
