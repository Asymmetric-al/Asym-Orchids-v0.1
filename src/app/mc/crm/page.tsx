'use client'

import { TilePage } from '@/components/mission-control/tiles/TilePage'
import { getTileById } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Users, Building2, Home, ClipboardList, Activity, Search } from 'lucide-react'
import { Input } from '@/components/ui/input'

export default function CRMPage() {
  const tile = getTileById('crm')!

  return (
    <TilePage tile={tile}>
      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Search className="h-4 w-4" />
            Search People, Churches, Households
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input placeholder="Search by name, email, phone, or ID..." className="max-w-md" />
            <Button>Search</Button>
          </div>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">People</CardTitle>
            <CardDescription>Individual donors, missionaries, and contacts</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/crm/people">
              <Button variant="outline" size="sm" className="w-full">View All People</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Building2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Churches</CardTitle>
            <CardDescription>Partner churches and sending organizations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/crm/churches">
              <Button variant="outline" size="sm" className="w-full">View Churches</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Home className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Households</CardTitle>
            <CardDescription>Family units for combined giving statements</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/crm/households">
              <Button variant="outline" size="sm" className="w-full">View Households</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Activity className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Activity</CardTitle>
            <CardDescription>Email sends, form submissions, giving events</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/crm/activity">
              <Button variant="outline" size="sm" className="w-full">View Activity</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Tasks</CardTitle>
            <CardDescription>Follow-ups, calls, and assigned work items</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/crm/tasks">
              <Button variant="outline" size="sm" className="w-full">View Tasks</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Every contribution points to a Person and optionally a Church and Household.</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Activities come from email sends, support threads, form submissions, and giving events</li>
            <li>Tasks appear here from Mobilize, Support Hub, or direct assignment</li>
            <li>Use soft credits for church-through giving so both donor and church see the right totals</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}
