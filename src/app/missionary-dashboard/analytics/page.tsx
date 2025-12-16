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
  { name: 'Active', value: 4, color: '#18181b' },
  { name: 'New', value: 2, color: '#71717a' },
  { name: 'At Risk', value: 1, color: '#eab308' },
  { name: 'Lapsed', value: 1, color: '#a1a1aa' },
]

const givingTypeData = [
  { name: 'Recurring', value: 76, color: '#18181b' },
  { name: 'One-time', value: 24, color: '#71717a' },
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
    <Card className="border-zinc-200 bg-white">
      <CardContent className="p-6">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-zinc-500">{title}</p>
            <p className="text-2xl font-semibold tracking-tight text-zinc-900">{value}</p>
            {(subtitle || trendValue) && (
              <div className="flex items-center gap-2 mt-1">
                {trend && trendValue && (
                  <span className={`flex items-center text-xs font-medium ${trend === 'up' ? 'text-emerald-600' : 'text-rose-600'}`}>
                    {trend === 'up' ? <TrendingUp className="h-3 w-3 mr-1" /> : <TrendingDown className="h-3 w-3 mr-1" />}
                    {trendValue}
                  </span>
                )}
                {subtitle && <span className="text-xs text-zinc-500">{subtitle}</span>}
              </div>
            )}
          </div>
          <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center">
            <Icon className="h-4 w-4 text-zinc-600" />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

function DonorSegmentChart() {
  return (
    <Card className="border-zinc-200 bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-zinc-900">Donor Segmentation</CardTitle>
        <CardDescription className="text-zinc-500">Current supporter breakdown</CardDescription>
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
                paddingAngle={2}
                dataKey="value"
                strokeWidth={0}
              >
                {donorSegments.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                 contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', boxShadow: 'none' }}
                 itemStyle={{ fontSize: '12px' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="grid grid-cols-2 gap-3 mt-4">
          {donorSegments.map((segment) => (
            <div key={segment.name} className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full" style={{ backgroundColor: segment.color }} />
              <span className="text-sm text-muted-foreground">{segment.name}</span>
              <span className="text-sm font-medium ml-auto">{segment.value}</span>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function MonthlyGivingChart() {
  return (
    <Card className="lg:col-span-2 border-zinc-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-zinc-900">Monthly Giving</CardTitle>
            <CardDescription className="text-zinc-500">Last 6 months of donations</CardDescription>
          </div>
          <Select defaultValue="6m">
            <SelectTrigger className="w-[110px] h-8 text-xs">
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
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={monthlyData} barSize={32}>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#737373' }} 
              axisLine={false} 
              tickLine={false} 
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#737373' }} 
              tickFormatter={(value) => `$${value / 1000}k`} 
              axisLine={false} 
              tickLine={false}
              dx={-10}
            />
            <Tooltip 
              cursor={{ fill: '#f4f4f5' }}
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', boxShadow: 'none' }}
              labelStyle={{ fontWeight: 600, marginBottom: '4px' }}
            />
              <Bar dataKey="recurring" stackId="a" fill="#18181b" radius={[0, 0, 0, 0]} name="Recurring" />
              <Bar dataKey="oneTime" stackId="a" fill="#d4d4d8" radius={[4, 4, 0, 0]} name="One-time" />
          </BarChart>
        </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-zinc-900" />
              <span className="text-xs text-zinc-500">Recurring</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-zinc-300" />
              <span className="text-xs text-zinc-500">One-time</span>
            </div>
          </div>
      </CardContent>
    </Card>
  )
}

function GivingTypeChart() {
  return (
    <Card className="border-zinc-200 bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-zinc-900">Giving Breakdown</CardTitle>
        <CardDescription className="text-zinc-500">Recurring vs one-time gifts</CardDescription>
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
                strokeWidth={0}
              >
                {givingTypeData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                formatter={(value: number) => [`${value}%`, '']}
                contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', boxShadow: 'none' }}
              />
            </PieChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center gap-8 mt-4">
          {givingTypeData.map((type) => (
            <div key={type.name} className="text-center">
              <div className="flex items-center gap-2 justify-center mb-1">
                <div className="h-2 w-2 rounded-full" style={{ backgroundColor: type.color }} />
                <span className="text-xs text-muted-foreground uppercase tracking-wider">{type.name}</span>
              </div>
              <p className="text-xl font-bold">{type.value}%</p>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function YearComparisonChart() {
  return (
    <Card className="lg:col-span-2 border-zinc-200 bg-white">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle className="text-base font-semibold text-zinc-900">Year-over-Year Comparison</CardTitle>
            <CardDescription className="text-zinc-500">2024 vs 2023 monthly giving</CardDescription>
          </div>
          <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-0">
            <TrendingUp className="h-3 w-3 mr-1" />
            +12% YTD
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <ResponsiveContainer width="100%" height={300}>
          <AreaChart data={yearOverYear}>
              <defs>
                <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#18181b" stopOpacity={0.1}/>
                  <stop offset="95%" stopColor="#18181b" stopOpacity={0}/>
                </linearGradient>
              </defs>
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12, fill: '#737373' }} 
              axisLine={false} 
              tickLine={false}
              dy={10}
            />
            <YAxis 
              tick={{ fontSize: 12, fill: '#737373' }} 
              tickFormatter={(value) => `$${value / 1000}k`} 
              axisLine={false} 
              tickLine={false}
              dx={-10}
            />
            <Tooltip 
              formatter={(value: number) => [`$${value.toLocaleString()}`, '']}
              contentStyle={{ borderRadius: '8px', border: '1px solid #e5e5e5', boxShadow: 'none' }}
            />
              <Area 
                type="monotone" 
                dataKey="current" 
                stroke="#18181b" 
                strokeWidth={2}
                fillOpacity={1} 
                fill="url(#colorCurrent)" 
                name="2024" 
              />
            <Area 
              type="monotone" 
              dataKey="previous" 
              stroke="#e5e5e5" 
              strokeWidth={2}
              strokeDasharray="4 4"
              fill="transparent" 
              name="2023" 
            />
          </AreaChart>
        </ResponsiveContainer>
          <div className="flex items-center justify-center gap-6 mt-6">
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-4 bg-zinc-900" />
              <span className="text-xs text-zinc-500">2024</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="h-0.5 w-4 bg-zinc-300" />
              <span className="text-xs text-zinc-500">2023</span>
            </div>
          </div>
      </CardContent>
    </Card>
  )
}

function RecurringHealthCard() {
  return (
    <Card className="border-zinc-200 bg-white">
      <CardHeader>
        <CardTitle className="text-base font-semibold text-zinc-900 flex items-center gap-2">
          Recurring Health
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Monthly</span>
            <p className="text-2xl font-bold text-zinc-900">$475</p>
          </div>
          <div className="space-y-1">
            <span className="text-xs text-zinc-500 uppercase tracking-wider">Projected</span>
            <p className="text-2xl font-bold text-zinc-900">$5.7k</p>
          </div>
        </div>
        <div className="pt-6 border-t border-zinc-100 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-emerald-500" />
              <span className="text-sm text-zinc-700">Active</span>
            </div>
            <span className="text-sm font-medium text-zinc-900">4 donors</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-amber-500" />
              <span className="text-sm text-zinc-700">At Risk</span>
            </div>
            <span className="text-sm font-medium text-zinc-900">0 donors</span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 rounded-full bg-rose-500" />
              <span className="text-sm text-zinc-700">Cancelled</span>
            </div>
            <span className="text-sm font-medium text-zinc-900">0 this month</span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function AnalyticsPage() {
  return (
    <div className="space-y-6 p-6 bg-zinc-50 min-h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Analytics</h1>
          <p className="text-zinc-500">Track your fundraising trends and donor insights.</p>
        </div>
        <Button variant="outline" className="bg-white border-zinc-200 text-zinc-700 hover:bg-zinc-50">
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