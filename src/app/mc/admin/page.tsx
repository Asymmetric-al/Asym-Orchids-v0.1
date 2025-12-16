'use client'

import { TilePage } from '@/components/mission-control/tiles/TilePage'
import { getTileById } from '@/lib/mission-control/tiles'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { RippleButton } from '@/components/ui/ripple-button'
import Link from 'next/link'
import { Settings, Globe, Key, Sparkles, Download, Activity, Shield, CheckCircle, AlertCircle, ArrowRight } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

export default function AdminPage() {
  const tile = getTileById('admin')!

  return (
    <TilePage tile={tile}>
      <div className="mt-6 grid gap-4 md:grid-cols-4">
        <Card className="overflow-hidden border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">Domains</CardDescription>
            <CardTitle className="text-3xl font-bold text-slate-900">4</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 w-fit">
              <CheckCircle className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">All verified</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">API Keys</CardDescription>
            <CardTitle className="text-3xl font-bold text-slate-900">8</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 rounded-full bg-slate-100 px-2.5 py-0.5 w-fit">
              <Key className="h-3.5 w-3.5 text-slate-500" />
              <span className="text-xs font-medium text-slate-600">Active keys</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">System Health</CardDescription>
            <CardTitle className="text-3xl font-bold text-emerald-600">Healthy</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 w-fit">
              <Activity className="h-3.5 w-3.5 text-emerald-600" />
              <span className="text-xs font-medium text-emerald-700">All systems go</span>
            </div>
          </CardContent>
        </Card>
        <Card className="overflow-hidden border-slate-200/60 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="pb-2">
            <CardDescription className="font-medium text-slate-500">Last Export</CardDescription>
            <CardTitle className="text-3xl font-bold text-slate-900">Dec 1</CardTitle>
          </CardHeader>
          <CardContent>
             <div className="flex items-center gap-1.5 rounded-full bg-blue-50 px-2.5 py-0.5 w-fit">
              <Download className="h-3.5 w-3.5 text-blue-600" />
              <span className="text-xs font-medium text-blue-700">Month-end</span>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {[
          {
            title: 'Domains & Certificates',
            desc: 'Custom domains for Web, Email, Callbacks',
            icon: Globe,
            color: 'blue',
            href: '/mc/admin/domains',
            action: 'Manage Domains'
          },
          {
            title: 'API Keys',
            desc: 'Manage integration credentials',
            icon: Key,
            color: 'violet',
            href: '/mc/admin/keys',
            action: 'View Keys'
          },
          {
            title: 'AI Settings',
            desc: 'API keys and AI model configuration',
            icon: Sparkles,
            color: 'emerald',
            href: '/mc/admin/ai',
            action: 'Configure AI'
          },
          {
            title: 'Exports',
            desc: 'Finance and auditor data dumps',
            icon: Download,
            color: 'amber',
            href: '/mc/admin/exports',
            action: 'View Exports'
          },
          {
            title: 'Status & Health',
            desc: 'Background jobs and third-party status',
            icon: Activity,
            color: 'rose',
            href: '/mc/admin/status',
            action: 'View Status'
          },
          {
            title: 'Security',
            desc: 'Audit logs and access controls',
            icon: Shield,
            color: 'slate',
            href: '/mc/admin/security',
            action: 'View Security'
          }
        ].map((item) => (
          <Link key={item.title} href={item.href} className="group block h-full">
            <Card className="h-full overflow-hidden rounded-xl border border-slate-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-slate-300 hover:shadow-lg hover:shadow-slate-200/50">
              <CardHeader className="pb-4">
                <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-${item.color}-50 text-${item.color}-600 transition-colors group-hover:bg-${item.color}-600 group-hover:text-white`}>
                  <item.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg font-bold text-slate-900 group-hover:text-slate-700 transition-colors">
                  {item.title}
                </CardTitle>
                <CardDescription className="line-clamp-2 text-sm text-slate-500 mt-1.5">
                  {item.desc}
                </CardDescription>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="flex items-center text-sm font-semibold text-slate-600 group-hover:text-emerald-600 transition-colors mt-auto">
                  {item.action}
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        <Card className="border-slate-200/60 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Service Status</CardTitle>
            <CardDescription>Real-time operational status</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              { name: 'Stripe Payments', status: 'Operational' },
              { name: 'Email Delivery', status: 'Operational' },
              { name: 'Background Jobs', status: 'Operational' },
              { name: 'Database', status: 'Operational' }
            ].map((service) => (
              <div key={service.name} className="flex items-center justify-between rounded-lg border border-slate-100 bg-slate-50/50 p-3">
                <span className="text-sm font-medium text-slate-700">{service.name}</span>
                <Badge variant="secondary" className="bg-emerald-100 text-emerald-700 hover:bg-emerald-100 border-emerald-200 shadow-none">
                  <div className="mr-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  {service.status}
                </Badge>
              </div>
            ))}
          </CardContent>
        </Card>

        <Card className="border-slate-200/60 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-slate-900">Security Best Practices</CardTitle>
            <CardDescription>Recommended actions for admins</CardDescription>
          </CardHeader>
          <CardContent>
             <div className="rounded-xl bg-blue-50/50 border border-blue-100 p-4 space-y-3">
                {[
                  'Rotate API keys quarterly',
                  'Limit admin access to least privilege',
                  'Isolate non-prod domains from prod auth'
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-600">
                      <span className="text-[10px] font-bold">{i + 1}</span>
                    </div>
                    <span className="text-sm text-slate-600">{tip}</span>
                  </div>
                ))}
             </div>
          </CardContent>
        </Card>
      </div>
    </TilePage>
  )
}