'use client'

import { TilePage } from '@/features/mission-control'
import { getTileById } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { FileText, Palette, Database, Receipt, Calendar, Package } from 'lucide-react'

export default function PDFStudioPage() {
  const tile = getTileById('pdf')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <FileText className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Templates</CardTitle>
            <CardDescription>Reusable PDF document designs</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/pdf/templates">
              <Button variant="outline" size="sm" className="w-full">Manage Templates</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <Palette className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Themes</CardTitle>
            <CardDescription>Visual styling for documents</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/pdf/themes">
              <Button variant="outline" size="sm" className="w-full">Edit Themes</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Database className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Data Bindings</CardTitle>
            <CardDescription>Connect templates to live data</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/pdf/bindings">
              <Button variant="outline" size="sm" className="w-full">Configure Bindings</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <Receipt className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Receipt Templates</CardTitle>
            <CardDescription>Donation receipts and confirmations</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/pdf/templates/new?type=receipt">
              <Button variant="outline" size="sm" className="w-full">Create Receipt</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <Calendar className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Year-End Packs</CardTitle>
            <CardDescription>Annual giving statements</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/pdf/packs/new?type=year-end">
              <Button variant="outline" size="sm" className="w-full">Build Pack</Button>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-500/10 text-slate-600">
              <Package className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Statement Packs</CardTitle>
            <CardDescription>Compiled and archived statements</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/pdf/packs">
              <Button variant="outline" size="sm" className="w-full">View Packs</Button>
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
            <li>Data bindings reference typed objects, not free text</li>
            <li>Statement packs compile on a schedule, then archive a copy to a write-once bucket</li>
            <li>Version templates. Never edit in place after you send externally</li>
            <li>Keep fonts licensed and embedded</li>
            <li>Ship test renders with obfuscated PII for QA</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}