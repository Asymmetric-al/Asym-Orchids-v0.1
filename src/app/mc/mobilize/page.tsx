'use client'

import { TilePage } from '@/features/mission-control'
import { getTileById } from '@/config'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RippleButton } from '@/components/ui/ripple-button'
import Link from 'next/link'
import { Rocket, Users, ClipboardList, Calendar, GraduationCap, CheckCircle2, ArrowRight, Clock } from 'lucide-react'
import { Progress } from '@/components/ui/progress'

export default function MobilizePage() {
  const tile = getTileById('mobilize')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>In Pipeline</CardDescription>
            <CardTitle className="text-2xl">34</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">candidates active</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Applied</CardDescription>
            <CardTitle className="text-2xl">12</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={35} className="h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Interview Stage</CardDescription>
            <CardTitle className="text-2xl">8</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={24} className="h-1.5" />
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Final Onboarding</CardDescription>
            <CardTitle className="text-2xl">6</CardTitle>
          </CardHeader>
          <CardContent>
            <Progress value={18} className="h-1.5" />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-6 border-amber-200 bg-amber-50/50">
        <CardHeader className="pb-2">
          <CardTitle className="text-base flex items-center gap-2 text-amber-700">
            <Clock className="h-4 w-4" /> Overdue Items
          </CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm text-amber-700">5 checklist items are past SLA. Review and escalate to team leads.</p>
          <Link href="/mc/mobilize/overdue">
            <RippleButton variant="outline" size="sm" className="h-7 mt-2 text-xs font-medium">View Overdue</RippleButton>
          </Link>
        </CardContent>
      </Card>

      <div className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-500/10 text-blue-600">
              <Users className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Pipeline</CardTitle>
            <CardDescription>View all candidates by stage</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/mobilize/pipeline">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Pipeline</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-violet-500/10 text-violet-600">
              <ClipboardList className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Checklists</CardTitle>
            <CardDescription>Stage requirements and tasks</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/mobilize/checklists">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">Manage Checklists</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-emerald-500/10 text-emerald-600">
              <Calendar className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Interviews</CardTitle>
            <CardDescription>Schedule and track interviews</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/mobilize/interviews">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Interviews</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-600">
              <GraduationCap className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Training</CardTitle>
            <CardDescription>Required training and completions</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/mobilize/training">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Training</RippleButton>
            </Link>
          </CardContent>
        </Card>

        <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/30">
          <CardHeader className="pb-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-rose-500/10 text-rose-600">
              <CheckCircle2 className="h-5 w-5" />
            </div>
            <CardTitle className="text-base">Final Onboarding</CardTitle>
            <CardDescription>Account creation and page publishing</CardDescription>
          </CardHeader>
          <CardContent>
            <Link href="/mc/mobilize/onboarding">
              <RippleButton variant="outline" size="sm" className="h-7 w-full text-xs font-medium">View Onboarding</RippleButton>
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
            <li>Keep stage names stable. Do not encode business rules in labels.</li>
            <li>Keep checklist items small and unambiguous.</li>
            <li>Use SLA timers. Overdue items roll up to team leads.</li>
            <li>Each stage maps to named flows in Automations.</li>
          </ul>
        </CardContent>
      </Card>
    </TilePage>
  )
}