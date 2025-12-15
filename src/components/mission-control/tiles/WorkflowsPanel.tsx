'use client'

import Link from 'next/link'
import { WORKFLOWS } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from '../icons'

export function WorkflowsPanel() {
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">End-to-End Workflows</h2>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {WORKFLOWS.map((workflow) => (
          <Link key={workflow.id} href={`/mc${workflow.route}`}>
            <Card className="group cursor-pointer transition-all hover:shadow-md hover:border-primary/20">
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-sm font-medium">{workflow.title}</CardTitle>
                  <ArrowRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                </div>
                <CardDescription className="text-xs">{workflow.description}</CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}