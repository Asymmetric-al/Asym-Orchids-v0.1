'use client'

import { TilePage } from '@/components/mission-control/tiles/TilePage'
import { getTileById } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { Globe, FileText, Users, ExternalLink } from 'lucide-react'

export default function WebStudioPage() {
  const tile = getTileById('web-studio')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Globe className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Public Site</CardTitle>
            <CardDescription>Manage your organization's public-facing website pages</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/web-studio/pages">
              <Button variant="outline" size="sm" className="w-full">
                Manage Pages <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <FileText className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Give Pages</CardTitle>
            <CardDescription>Configure donation pages and giving forms</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/web-studio/pages/give">
              <Button variant="outline" size="sm" className="w-full">
                Edit Give Page <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader>
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Users className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Missionary Pages</CardTitle>
            <CardDescription>Update individual missionary profiles and pages</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/web-studio/missionaries">
              <Button variant="outline" size="sm" className="w-full">
                View Missionaries <ExternalLink className="ml-2 h-3 w-3" />
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6">
        <CardHeader>
          <CardTitle className="text-base">How it works</CardTitle>
        </CardHeader>
        <CardContent className="text-sm text-muted-foreground space-y-2">
          <p>Web Studio is powered by Directus CRM, giving you full control over your public site, donor experience, and missionary pages.</p>
          <ul className="list-disc list-inside space-y-1 ml-2">
            <li>Public site pages are editable with a visual builder</li>
            <li>Donor experiences integrate with Contributions Hub</li>
            <li>Missionary pages connect to People & Churches CRM</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}
