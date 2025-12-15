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
    icon: <HeartIcon className='size-5' />,
    title: 'Total Given',
    value: '$12,450',
    subtitle: '+12% from last year'
  },
  {
    icon: <UsersIcon className='size-5' />,
    title: 'Missionaries Supported',
    value: '8',
    subtitle: 'Across 5 countries'
  },
  {
    icon: <CalendarIcon className='size-5' />,
    title: 'Monthly Giving',
    value: '$850',
    subtitle: 'Recurring monthly'
  },
  {
    icon: <TrendingUpIcon className='size-5' />,
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
    { icon: HeartIcon, label: 'One-Time Gift', href: '/donate' },
    { icon: CalendarIcon, label: 'Recurring Gift', href: '/donate/recurring' },
    { icon: UsersIcon, label: 'Browse Missionaries', href: '/missionaries' },
    { icon: MailIcon, label: 'Contact Support', href: '/support' }
  ]

  return (
    <Card className='shadow-none'>
      <CardHeader className='pb-2'>
        <CardTitle className='text-lg font-semibold'>Quick Actions</CardTitle>
      </CardHeader>
      <CardContent className='grid grid-cols-2 gap-2'>
        {actions.map((action) => (
          <Link
            key={action.label}
            href={action.href}
            className='group flex flex-col items-center justify-center gap-2 rounded-md border px-4 py-3 transition-all hover:border-primary/50 hover:shadow-sm'
          >
            <Avatar className='size-8.5 rounded-sm transition-transform group-hover:scale-105'>
              <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                <action.icon className='size-5' />
              </AvatarFallback>
            </Avatar>
            <span className='text-xs font-medium'>{action.label}</span>
          </Link>
        ))}
      </CardContent>
    </Card>
  )
}

function RecentGiftsCard() {
  return (
    <Card className='shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <HeartIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Recent Gifts</CardTitle>
            <p className='text-muted-foreground text-sm'>Your giving history</p>
          </div>
        </div>
        <Button variant='ghost' size='sm' className='h-7 text-xs' asChild>
          <Link href='/donor-dashboard/history'>
            View All <ArrowUpRightIcon className='ml-1 size-3' />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className='p-0'>
        <div className='divide-y'>
          {recentGifts.map((gift) => (
            <div key={gift.id} className='flex items-center gap-3 px-6 py-3 transition-colors hover:bg-muted/50'>
              <Avatar className='size-8 border'>
                <AvatarFallback className='bg-rose-100 text-rose-700 text-xs font-medium'>
                  {gift.missionary.split(' ').map(n => n[0]).join('').slice(0, 2)}
                </AvatarFallback>
              </Avatar>
              <div className='min-w-0 flex-1'>
                <p className='truncate text-sm font-medium'>{gift.missionary}</p>
                <p className='text-muted-foreground text-xs'>{gift.date}</p>
              </div>
              <div className='text-right'>
                <p className='text-primary text-sm font-medium'>${gift.amount}</p>
                <Badge className='bg-primary/10 text-primary h-4 border-0 px-1 text-[10px] font-medium'>
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
    <Card className='shadow-none'>
      <CardHeader className='flex flex-row items-center justify-between gap-3 pb-2'>
        <div className='flex items-center gap-3'>
          <Avatar className='size-8.5 rounded-sm'>
            <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
              <GlobeIcon className='size-5' />
            </AvatarFallback>
          </Avatar>
          <div className='flex flex-col gap-0.5'>
            <CardTitle className='text-lg font-semibold'>Supported Missionaries</CardTitle>
            <p className='text-muted-foreground text-sm'>{supportedMissionaries.length} active</p>
          </div>
        </div>
        <Button variant='ghost' size='icon' className='size-7'>
          <PlusIcon className='size-4' />
        </Button>
      </CardHeader>
      <CardContent className='space-y-2'>
        {supportedMissionaries.map((m) => (
          <div
            key={m.name}
            className='group flex items-center gap-3 rounded-md border px-4 py-2 transition-all hover:border-primary/50 hover:shadow-sm'
          >
            <Avatar className='size-8 border'>
              <AvatarFallback className='bg-blue-100 text-blue-700 text-xs font-medium'>
                {m.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              </AvatarFallback>
            </Avatar>
            <div className='min-w-0 flex-1'>
              <p className='text-sm font-medium transition-colors group-hover:text-primary'>{m.name}</p>
              <p className='text-muted-foreground text-xs'>{m.location}</p>
            </div>
            <p className='text-sm font-medium'>${m.monthly}/mo</p>
          </div>
        ))}
        <Button variant='outline' size='sm' className='mt-2 h-8 w-full border-dashed text-xs' asChild>
          <Link href='/missionaries'>Browse missionaries</Link>
        </Button>
      </CardContent>
    </Card>
  )
}

export default function DonorDashboard() {
  return (
    <div className='min-h-full space-y-4 p-4 md:p-6'>
      <div className='flex flex-col gap-2 md:flex-row md:items-center md:justify-between'>
        <div>
          <h1 className='text-xl font-semibold'>Welcome back</h1>
          <p className='text-muted-foreground text-sm'>Here&apos;s an overview of your giving activity</p>
        </div>
        <div className='flex items-center gap-2'>
          <Button size='sm' className='h-8 gap-1.5'>
            <PlusIcon className='size-3.5' />
            <span className='hidden sm:inline'>Make a Gift</span>
          </Button>
        </div>
      </div>

      <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
        {MetricsData.map((metric, index) => (
          <Card key={index} className='shadow-none'>
            <CardContent className='flex items-center gap-3 px-4 py-3'>
              <Avatar className='size-8.5 rounded-sm'>
                <AvatarFallback className='bg-primary/10 text-primary shrink-0 rounded-sm'>
                  {metric.icon}
                </AvatarFallback>
              </Avatar>
              <div className='flex flex-col gap-0.5'>
                <span className='text-muted-foreground text-sm font-medium'>{metric.title}</span>
                <span className='text-lg font-medium'>{metric.value}</span>
                <div className='text-primary flex items-center gap-1 text-xs font-medium'>
                  <TrendingUpIcon className='size-3' />
                  <span>{metric.subtitle}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className='grid gap-4 lg:grid-cols-3'>
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
