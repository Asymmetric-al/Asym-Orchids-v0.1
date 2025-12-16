'use client'

import { TilePage } from '@/features/mission-control'
import { getTileById } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RippleButton } from '@/components/ui/ripple-button'
import Link from 'next/link'
import { CalendarDays, Users, Mic2, DollarSign, Ticket, Tag, UserCheck, QrCode, TrendingUp } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Progress } from '@/components/ui/progress'

export default function EventsPage() {
  const tile = getTileById('events')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Events</CardDescription>
            <CardTitle className="text-2xl">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">registration open</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Registrations</CardDescription>
            <CardTitle className="text-2xl">428</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +24% vs last year
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Revenue</CardDescription>
            <CardTitle className="text-2xl">$48,200</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">from registrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Upcoming</CardDescription>
            <CardTitle className="text-2xl">5</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">events scheduled</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader className="pb-2">
          <CardTitle className="text-base">Upcoming: Mission Conference 2025</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-muted-foreground">Registration Progress</span>
            <span className="text-sm font-medium">312 / 500</span>
          </div>
          <Progress value={62} className="h-2" />
          <div className="mt-3 flex gap-2">
            <Badge variant="secondary">Jan 15-18, 2025</Badge>
            <Badge variant="outline">62% capacity</Badge>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <CalendarDays className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Events</CardTitle>
            <CardDescription>Manage all events</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/list">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Events</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Mic2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Sessions & Speakers</CardTitle>
            <CardDescription>Schedule and speaker management</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/sessions">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">Manage Sessions</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Budgets</CardTitle>
            <CardDescription>Track event finances</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/budgets">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Budgets</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Ticket className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Registration</CardTitle>
            <CardDescription>Forms and payment settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/registration">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">Configure</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <Tag className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Discounts</CardTitle>
            <CardDescription>Promo codes and early bird</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/discounts">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">Manage Discounts</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cyan-500/10 text-cyan-600">
              <Users className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Attendees</CardTitle>
            <CardDescription>Registered participants</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/attendees">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Attendees</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-500/10 text-indigo-600">
              <QrCode className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Check-in</CardTitle>
            <CardDescription>QR codes and badge printing</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/events/checkin">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">Check-in Portal</RippleButton>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Keep one source of truth for pricing: use discount codes, not custom prices</li>
            <li>Use session caps to manage room capacity</li>
            <li>Link volunteer shifts to tasks in CRM</li>
            <li>Registration forms come from Sign Studio templates. Payment routes to Contributions.</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}