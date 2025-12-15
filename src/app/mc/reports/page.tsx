'use client'

import { TilePage } from '@/features/mission-control'
import { getTileById } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { BarChart3, Library, Calendar, Send, Star, FileDown, Filter, Plus } from 'lucide-react'

export default function ReportsPage() {
  const tile = getTileById('reports')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Saved Reports</CardDescription>
            <CardTitle className="text-2xl">48</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">in your library</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Scheduled</CardDescription>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">automated reports</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Ran This Week</CardDescription>
            <CardTitle className="text-2xl">156</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600">across all users</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Favorites</CardDescription>
            <CardTitle className="text-2xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">pinned reports</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Plus className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Build Report</CardTitle>
            <CardDescription>Create a new custom report</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/reports/new">
              <Button variant="outline" size="sm" className="w-full">New Report</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Library className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Library</CardTitle>
            <CardDescription>Browse saved reports</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/reports/library">
              <Button variant="outline" size="sm" className="w-full">View Library</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Calendar className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Schedules</CardTitle>
            <CardDescription>Automated report delivery</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/reports/schedules">
              <Button variant="outline" size="sm" className="w-full">Manage Schedules</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Send className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Destinations</CardTitle>
            <CardDescription>Email, storage, notifications</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/reports/destinations">
              <Button variant="outline" size="sm" className="w-full">Configure</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Star className="h-4 w-4 text-amber-500" /> Favorites
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="text-sm font-medium">Gift.new this month.finance.weekly</p>
              <p className="text-xs text-muted-foreground">Last run: 2 days ago</p>
            </div>
            <Button variant="ghost" size="sm">Run</Button>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div>
              <p className="text-sm font-medium">Person.active donors.fundraising.monthly</p>
              <p className="text-xs text-muted-foreground">Last run: 1 week ago</p>
            </div>
            <Button variant="ghost" size="sm">Run</Button>
          </div>
          <div className="flex items-center justify-between py-2">
            <div>
              <p className="text-sm font-medium">Contribution.reconciliation.finance.daily</p>
              <p className="text-xs text-muted-foreground">Last run: today</p>
            </div>
            <Button variant="ghost" size="sm">Run</Button>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Naming Convention</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground">
          <p className="mb-2">Reports follow the pattern: <code className="bg-muted px-1.5 py-0.5 rounded">object.primary filter.audience.cadence</code></p>
          <p>Example: <code className="bg-muted px-1.5 py-0.5 rounded">Gift.new this month.finance.weekly</code></p>
        </CardContent>
      </Card>
    </TilePage>
  )
}