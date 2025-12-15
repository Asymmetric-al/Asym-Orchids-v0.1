'use client'

import Link from 'next/link'
import { WORKFLOWS } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { ArrowRight } from '../icons'

export function WorkflowsPanel() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold text-slate-900">Suggested Workflows</h2>
          <p className="text-sm text-slate-500">Common tasks and multi-step processes for your role.</p>
        </div>
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {WORKFLOWS.map((workflow) => (
          <Link key={workflow.id} href={`/mc${workflow.route}`} className="group block">
            <Card className="h-full overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:border-slate-300 hover:shadow-md hover:-translate-y-1">
              <CardHeader className="space-y-1.5 p-5">
                <div className="flex items-center justify-between mb-2">
                  <div className="h-8 w-8 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-center">
                    <ArrowRight className="h-4 w-4 text-slate-400 group-hover:text-slate-900 transition-colors" />
                  </div>
                </div>
                <CardTitle className="text-base font-bold text-slate-900 group-hover:text-emerald-700 transition-colors">
                  {workflow.title}
                </CardTitle>
                <CardDescription className="text-sm text-slate-500 leading-relaxed">
                  {workflow.description}
                </CardDescription>
              </CardHeader>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}