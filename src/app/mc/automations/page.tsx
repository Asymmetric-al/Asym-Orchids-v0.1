'use client'

import { TilePage } from '@/features/mission-control'
import { getTileById } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RippleButton } from '@/components/ui/ripple-button'
import Link from 'next/link'
import { Zap, Link2, AlertTriangle, History, Play, RefreshCw, Clock, CheckCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AutomationsPage() {
  const tile = getTileById('automations')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Active Flows</CardDescription>
            <CardTitle className="text-2xl">28</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">running automations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Runs (24h)</CardDescription>
            <CardTitle className="text-2xl">1,247</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> 99.2% success
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Connections</CardDescription>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">active integrations</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Failed Runs</CardDescription>
            <CardTitle className="text-2xl text-amber-600">8</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">needs review</p>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-amber-700">
            <AlertTriangle className="h-4 w-4" /> Failed Runs
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">8 automation runs failed in the last 24 hours. Review and retry.</p>
          <Link href="/mc/automations/runs?status=failed">
            <RippleButton variant="outline" size="sm" className="h-7 mt-2 text-xs font-medium">Review Failed</RippleButton>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Play className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Flows</CardTitle>
            <CardDescription>Active automations and zaps</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/automations/flows">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Flows</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Link2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Connections</CardTitle>
            <CardDescription>Third-party integrations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/automations/connections">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">Manage</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <RefreshCw className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Errors & Retries</CardTitle>
            <CardDescription>Failed runs and retry queue</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/automations/runs?status=failed">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Errors</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <History className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Change Log</CardTitle>
            <CardDescription>Run history with I/O snapshots</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/automations/logs">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Logs</RippleButton>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Active Mobilize Stage Flows</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">mobilize</Badge>
              <span className="text-sm font-medium">mobilize.advance-to-interview</span>
            </div>
            <Badge variant="secondary" className="text-xs">Active</Badge>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">mobilize</Badge>
              <span className="text-sm font-medium">mobilize.send-background-packet</span>
            </div>
            <Badge variant="secondary" className="text-xs">Active</Badge>
          </div>
          <div className="flex items-center justify-between py-2">
            <div className="flex items-center gap-2">
              <Badge variant="outline" className="text-xs">giving</Badge>
              <span className="text-sm font-medium">giving.send-thank-you</span>
            </div>
            <Badge variant="secondary" className="text-xs">Active</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Use idempotency keys on create actions</li>
            <li>Prefix names by domain: <code className="bg-muted px-1 rounded">mobilize.</code>, <code className="bg-muted px-1 rounded">giving.</code>, <code className="bg-muted px-1 rounded">care.</code></li>
            <li>Keep secrets in Connections, never in field mappers</li>
            <li>Owners must subscribe to failure alerts</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}