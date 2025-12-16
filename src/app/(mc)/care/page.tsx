'use client'

import { TilePage } from '@/components/mission-control/tiles/TilePage'
import { getTileById } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Heart, Users, MessageCircle, ClipboardList, AlertTriangle, BookOpen, Calendar, UserCheck } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function MemberCarePage() {
  const tile = getTileById('care')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Care List</CardDescription>
            <CardTitle className="text-2xl">156</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">missionaries monitored</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Care Plans</CardDescription>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">active interventions</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Check-ins (30d)</CardDescription>
            <CardTitle className="text-2xl">89</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600">on schedule</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>At-Risk Alerts</CardDescription>
            <CardTitle className="text-2xl text-rose-600">4</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">needs attention</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-rose-200 bg-rose-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-rose-700">
            <AlertTriangle className="h-4 w-4" /> At-Risk Alerts
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-sm text-rose-700">Long gap in updates (45+ days)</span>
              <Badge variant="outline" className="border-rose-300 text-rose-700">2</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-rose-700">Flagged support ticket</span>
              <Badge variant="outline" className="border-rose-300 text-rose-700">1</Badge>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-rose-700">Declined giving (3+ months)</span>
              <Badge variant="outline" className="border-rose-300 text-rose-700">1</Badge>
            </div>
          </div>
          <Link href="/mc/care/alerts">
            <Button variant="outline" size="sm" className="mt-3">Review All Alerts</Button>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Care List</CardTitle>
            <CardDescription>All missionaries by region/team</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/care/list">
              <Button variant="outline" size="sm" className="w-full">View List</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <UserCheck className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Check-ins</CardTitle>
            <CardDescription>Schedule and record check-ins</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/care/check-ins">
              <Button variant="outline" size="sm" className="w-full">Manage Check-ins</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <MessageCircle className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Prayer Requests</CardTitle>
            <CardDescription>Track and respond to prayers</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/care/prayers">
              <Button variant="outline" size="sm" className="w-full">View Requests</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Care Plans</CardTitle>
            <CardDescription>Structured intervention plans</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/care/plans">
              <Button variant="outline" size="sm" className="w-full">Manage Plans</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <AlertTriangle className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Alerts</CardTitle>
            <CardDescription>At-risk signals and escalations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/care/alerts">
              <Button variant="outline" size="sm" className="w-full">View Alerts</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10 text-slate-600">
              <BookOpen className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Resources</CardTitle>
            <CardDescription>Care guides and materials</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/care/resources">
              <Button variant="outline" size="sm" className="w-full">Browse Resources</Button>
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
            <li>Keep check-in cadence per region or team</li>
            <li>Record prayer and pastoral notes in a private stream with restricted visibility</li>
            <li>Escalate risk items with a clear rubric: green, yellow, red</li>
            <li>Care Plans create tasks in CRM. Some tasks trigger Email Studio follow-ups or packet requests in Sign Studio.</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}
