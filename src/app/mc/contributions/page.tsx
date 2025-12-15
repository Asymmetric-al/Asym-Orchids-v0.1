'use client'

import { TilePage } from '@/components/mission-control/tiles/TilePage'
import { getTileById } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { DollarSign, CreditCard, Building, FileCheck, AlertTriangle, TrendingUp } from 'lucide-react'

export default function ContributionsPage() {
  const tile = getTileById('contributions')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Today</CardDescription>
            <CardTitle className="text-2xl">$12,450</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">24 gifts received</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Week</CardDescription>
            <CardTitle className="text-2xl">$48,230</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <TrendingUp className="h-3 w-3" /> +12% vs last week
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>This Month</CardDescription>
            <CardTitle className="text-2xl">$186,400</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">412 total gifts</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Tie Out</CardDescription>
            <CardTitle className="text-2xl text-amber-600">3</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">batches to reconcile</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <DollarSign className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">All Contributions</CardTitle>
            <CardDescription>View the complete gifts feed</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/contributions/all">
              <Button variant="outline" size="sm" className="w-full">View Feed</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Building className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Offline Entry</CardTitle>
            <CardDescription>Enter checks and cash batches</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/contributions/batches/new">
              <Button variant="outline" size="sm" className="w-full">New Batch</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <CreditCard className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Stripe & ACH</CardTitle>
            <CardDescription>Online payment sources</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/contributions/sources">
              <Button variant="outline" size="sm" className="w-full">View Sources</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <FileCheck className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Tie Out</CardTitle>
            <CardDescription>Reconcile and close periods</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/contributions/reconcile">
              <Button variant="outline" size="sm" className="w-full">Reconcile</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-4 w-4" /> Disputes
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">2 active Stripe disputes require attention</p>
          <Link href="/mc/contributions/disputes">
            <Button variant="outline" size="sm" className="mt-2">View Disputes</Button>
          </Link>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Treat Stripe, ACH, and Offline batches as sources, not truth. Truth lives here after ingestion and validation.</li>
            <li>Capture failure reasons on retries. They drive dunning emails in Email Studio and tasks in CRM.</li>
            <li>Use soft credits for church-through giving so both donor and church see the right totals.</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}
