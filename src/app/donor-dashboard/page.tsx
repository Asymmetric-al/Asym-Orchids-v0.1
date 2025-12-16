'use client'

import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import {
  HeartIcon,
  TrendingUpIcon,
  UsersIcon,
  CalendarIcon,
  ArrowUpRightIcon,
  PlusIcon,
  GlobeIcon,
  MailIcon
} from 'lucide-react'

const MetricsData = [
  {
    icon: HeartIcon,
    title: 'Total Given',
    value: '$12,450',
    subtitle: '+12% from last year'
  },
  {
    icon: UsersIcon,
    title: 'Missionaries Supported',
    value: '8',
    subtitle: 'Across 5 countries'
  },
  {
    icon: CalendarIcon,
    title: 'Monthly Giving',
    value: '$850',
    subtitle: 'Recurring monthly'
  },
  {
    icon: TrendingUpIcon,
    title: 'Impact Score',
    value: '94%',
    subtitle: 'Of funds reach the field'
  }
]

const recentGifts = [
  { id: 1, missionary: 'John & Jane Doe', amount: 150, date: 'Dec 10, 2025', type: 'Monthly' },
  { id: 2, missionary: 'Sarah Smith', amount: 100, date: 'Dec 5, 2025', type: 'One-time' },
  { id: 3, missionary: 'Clean Water Project', amount: 250, date: 'Nov 28, 2025', type: 'One-time' }
]

const supportedMissionaries = [
  { name: 'John & Jane Doe', location: 'Thailand', monthly: 150 },
  { name: 'Sarah Smith', location: 'Kenya', monthly: 100 },
  { name: 'Michael Chen', location: 'Japan', monthly: 200 }
]

function QuickActionsCard() {
  const actions = [
    { icon: HeartIcon, label: 'One-Time Gift', href: '/donate', bgColor: 'bg-rose-50', iconColor: 'text-rose-600' },
    { icon: CalendarIcon, label: 'Recurring Gift', href: '/donate/recurring', bgColor: 'bg-blue-50', iconColor: 'text-blue-600' },
    { icon: UsersIcon, label: 'Browse Missionaries', href: '/missionaries', bgColor: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { icon: MailIcon, label: 'Contact Support', href: '/support', bgColor: 'bg-violet-50', iconColor: 'text-violet-600' }
  ]

  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='pb-3'>
        <CardTitle className='text-sm font-semibold text-zinc-900'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-2'>
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className='group flex flex-col items-center justify-center gap-2 rounded-md bg-zinc-50 px-3 py-3 transition-colors hover:bg-zinc-100'
          >
            <div className={`flex size-8 items-center justify-center rounded-md ${action.bgColor} transition-transform group-hover:scale-105`}>
              <action.icon className={`size-4 ${action.iconColor}`} />
            </div>
            <span className='text-xs font-medium text-zinc-700'>{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function RecentGiftsCard() {
  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-rose-50'>
            <HeartIcon className='size-4 text-rose-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Recent Gifts</CardTitle>
            <p className='text-xs text-zinc-500'>Your giving history</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs text-zinc-600 hover:text-zinc-900' asChild>
          <Link href='/donor-dashboard/history'>
            View All <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y divide-zinc-100'>
          {recentGifts.map((gift) => (
            <div key={gift.id} className='flex items-center gap-3 px-6 py-2.5 transition-colors hover:bg-zinc-50'>
              <Avatar className='size-8 border border-zinc-200'>
                <AvatarFallback className='bg-zinc-100 text-zinc-700 text-xs font-medium'>
                  {gift.missionary.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium text-zinc-900'>{gift.missionary}</p>
                <p className='text-xs text-zinc-500'>{gift.date}</p>
              </div>
              <div className='text-right'>
                <p className='text-sm font-medium text-zinc-900'>${gift.amount}</p>
                <Badge variant='secondary' className='h-4 bg-zinc-100 border-0 px-1.5 text-[10px] font-medium text-zinc-600'>
                  {gift.type}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}

function SupportedMissionariesCard() {
  return (
    <Card className='border-zinc-200 bg-white'>
      <CardHeader className='flex flex-row items-center justify-between pb-3'>
        <div className='flex items-center gap-3'>
          <div className='flex size-8 items-center justify-center rounded-md bg-blue-50'>
            <GlobeIcon className='size-4 text-blue-600' />
          </div>
          <div>
            <CardTitle className='text-sm font-semibold text-zinc-900'>Supported Missionaries</CardTitle>
            <p className='text-xs text-zinc-500'>{supportedMissionaries.length} active</p>
          </div>
        </div>
        <Button variant='ghost' size='icon' className='size-7 text-zinc-500 hover:text-zinc-700'>
          <PlusIcon className='size-4' />
        </Button>
      </CardHeader>
      <CardContent className='space-y-1.5'>
        {supportedMissionaries.map((m) => (
          <div
            key={m.name}
            className='group flex items-center gap-3 rounded-md bg-zinc-50 px-3 py-2 transition-colors hover:bg-zinc-100'
          >
            <Avatar className='size-8 border border-zinc-200'>
              <AvatarFallback className='bg-blue-50 text-blue-700 text-xs font-medium'>
                {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium text-zinc-900'>{m.name}</p>
              <p className='text-xs text-zinc-500'>{m.location}</p>
            </div>
            <p className='text-sm font-medium text-zinc-700'>${m.monthly}/mo</p>
          </div>
        ))}
        <Button variant='outline' size='sm' className='mt-2 h-8 w-full border-dashed border-zinc-300 text-xs text-zinc-600' asChild>
          <Link href='/missionaries'>Browse missionaries</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function DonorDashboard() {
  return (
    <div className='min-h-screen bg-zinc-50 p-4 md:p-6'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-xl font-semibold text-zinc-900'>Welcome back</h1>
          <p className='text-sm text-zinc-500'>Here&apos;s an overview of your giving activity</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='sm' className='h-8 gap-1.5 bg-zinc-900 hover:bg-zinc-800'>
            <PlusIcon className='size-3.5' />
            <span className='hidden sm:inline'>Make a Gift</span>
          </Button>
        </div>
      </div>

      <div className='mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {MetricsData.map((metric, index) => (
          <Card key={index} className='border-zinc-200 bg-white'>
            <CardContent className='flex items-center gap-3 p-4'>
              <div className='flex size-9 items-center justify-center rounded-md bg-zinc-100'>
                <metric.icon className='size-4 text-zinc-600' />
              </div>
              <div>
                <span className='text-xs font-medium text-zinc-500'>{metric.title}</span>
                <p className='text-lg font-semibold text-zinc-900'>{metric.value}</p>
                <p className='text-xs text-zinc-500'>{metric.subtitle}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='mt-4 grid gap-4 lg:grid-cols-3'>
        <div className='space-y-4 lg:col-span-2'>
          <RecentGiftsCard />
        </div>
        <div className='space-y-4'>
          <SupportedMissionariesCard />
          <QuickActionsCard />
        </div>
      </div>
    </div>
  )
}
