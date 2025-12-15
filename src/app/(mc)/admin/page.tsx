'use client'

import { TilePage } from '@/components/mission-control/tiles/TilePage'
import { getTileById } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Settings, Globe, Key, Sparkles, Download, Activity, Shield, CheckCircle, AlertCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdminPage() {
  const tile = getTileById('admin')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Domains</CardDescription>
            <CardTitle className="text-2xl">4</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600 flex items-center gap-1">
              <CheckCircle className="h-3 w-3" /> All verified
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>API Keys</CardDescription>
            <CardTitle className="text-2xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">active keys</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>System Health</CardDescription>
            <CardTitle className="text-2xl text-emerald-600">Healthy</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">all services operational</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Last Export</CardDescription>
            <CardTitle className="text-2xl">Dec 1</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">month-end export</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Globe className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Domains & Certificates</CardTitle>
            <CardDescription>Custom domains for Web, Email, Callbacks</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/admin/domains">
              <Button variant="outline" size="sm" className="w-full">Manage Domains</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Key className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">API Keys</CardTitle>
            <CardDescription>Manage integration credentials</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/admin/keys">
              <Button variant="outline" size="sm" className="w-full">View Keys</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Sparkles className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">AI Settings</CardTitle>
            <CardDescription>API keys and AI model configuration</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/admin/ai">
              <Button variant="outline" size="sm" className="w-full">Configure AI</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Download className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Exports</CardTitle>
            <CardDescription>Finance and auditor data dumps</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/admin/exports">
              <Button variant="outline" size="sm" className="w-full">View Exports</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <Activity className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Status & Health</CardTitle>
            <CardDescription>Background jobs and third-party status</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/admin/status">
              <Button variant="outline" size="sm" className="w-full">View Status</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10 text-slate-600">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Security</CardTitle>
            <CardDescription>Audit logs and access controls</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/admin/security">
              <Button variant="outline" size="sm" className="w-full">View Security</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Service Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">Stripe Payments</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Operational</Badge>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">Email Delivery (SendGrid)</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Operational</Badge>
          </div>
          <div className="flex items-center justify-between py-2 border-b">
            <span className="text-sm">Background Jobs</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Operational</Badge>
          </div>
          <div className="flex items-center justify-between py-2">
            <span className="text-sm">Database</span>
            <Badge variant="secondary" className="bg-emerald-100 text-emerald-700">Operational</Badge>
          </div>
        </CardContent>
      </Card>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">Best Practices</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Rotate keys quarterly</li>
            <li>Limit admin to least privilege</li>
            <li>Keep non-prod domains isolated from prod auth</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}
