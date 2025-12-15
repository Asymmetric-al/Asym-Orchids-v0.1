'use client'

import { TilePage } from '@/features/mission-control'
import { getTileById } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Mail, Layout, Palette, Variable, Shield, FileText, Send } from 'lucide-react'

export default function EmailStudioPage() {
  const tile = getTileById('email')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Campaigns Sent (30d)</CardDescription>
            <CardTitle className="text-2xl">24</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">142,500 emails delivered</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Open Rate</CardDescription>
            <CardTitle className="text-2xl">38.2%</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-emerald-600">+4.1% above average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Bounces</CardDescription>
            <CardTitle className="text-2xl text-amber-600">156</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">needs review</p>
          </CardContent>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Send className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Campaigns</CardTitle>
            <CardDescription>Create and send email campaigns</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/email/campaigns">
              <Button variant="outline" size="sm" className="w-full">View Campaigns</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Layout className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Templates</CardTitle>
            <CardDescription>Reusable email designs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/email/templates">
              <Button variant="outline" size="sm" className="w-full">Manage Templates</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Palette className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Brand Styles</CardTitle>
            <CardDescription>Colors, fonts, and visual identity</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/email/brand">
              <Button variant="outline" size="sm" className="w-full">Edit Styles</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Variable className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Variables</CardTitle>
            <CardDescription>Dynamic merge fields for personalization</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/email/variables">
              <Button variant="outline" size="sm" className="w-full">Configure</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <Shield className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Mail Auth</CardTitle>
            <CardDescription>SPF, DKIM, and DMARC settings</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/email/auth">
              <Button variant="outline" size="sm" className="w-full">Auth Settings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10 text-slate-600">
              <FileText className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Mail Logs</CardTitle>
            <CardDescription>Delivery status and diagnostics</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/email/logs">
              <Button variant="outline" size="sm" className="w-full">View Logs</Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Drafts target CRM lists or report segments from Report Studio</li>
            <li>Variables pull from Person, Church, Fund, and Gift objects</li>
            <li>Logs write back outcomes to CRM → Activity</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}