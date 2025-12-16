'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Mail,
  Send,
  Users,
  FileText,
  Eye,
  Clock,
  CheckCircle2,
  Image as ImageIcon,
  Sparkles,
  Plus,
  Copy,
  ExternalLink,
  LayoutTemplate,
} from 'lucide-react'

const templates = [
  { id: 't1', name: 'Monthly Update', description: 'Regular newsletter template', icon: FileText },
  { id: 't2', name: 'Thank You', description: 'Donor appreciation email', icon: Sparkles },
  { id: 't3', name: 'Prayer Request', description: 'Urgent prayer needs', icon: Mail },
  { id: 't4', name: 'Year End', description: 'Annual summary letter', icon: FileText },
]

const previousNewsletters = [
  { id: 'n1', subject: 'December Ministry Update', sentAt: '2024-12-01', recipients: 42, opened: 36 },
  { id: 'n2', subject: 'November Newsletter', sentAt: '2024-11-01', recipients: 40, opened: 32 },
  { id: 'n3', subject: 'October Stories from the Field', sentAt: '2024-10-01', recipients: 38, opened: 30 },
]

function TemplateCard({ template }: { template: typeof templates[0] }) {
  const Icon = template.icon
  return (
    <Card className="cursor-pointer hover:border-zinc-400 hover:bg-zinc-50 transition-all group border-zinc-200 bg-white">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-zinc-100 flex items-center justify-center group-hover:bg-zinc-900 transition-colors">
          <Icon className="h-5 w-5 text-zinc-600 group-hover:text-white transition-colors" />
        </div>
        <div>
          <p className="font-medium text-sm text-zinc-900">{template.name}</p>
          <p className="text-xs text-zinc-500">{template.description}</p>
        </div>
      </CardContent>
    </Card>
  )
}

function ComposeNewsletterDialog() {
  const [open, setOpen] = React.useState(false)
  const [subject, setSubject] = React.useState('')
  const [content, setContent] = React.useState('')

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="lg" className="gap-2 bg-zinc-900 hover:bg-zinc-800 text-white">
          <Plus className="h-4 w-4" />
          Compose Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-4xl h-[85vh] p-0 flex flex-col gap-0 overflow-hidden">
        <DialogHeader className="px-6 py-4 border-b flex-shrink-0">
          <DialogTitle>Compose Newsletter</DialogTitle>
          <DialogDescription>Create and send an update to your supporters.</DialogDescription>
        </DialogHeader>
        <div className="flex-1 overflow-y-auto p-6 space-y-6">
          <div className="flex items-center justify-between p-3 bg-muted/30 rounded-lg border">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm font-medium">Recipients</span>
            </div>
              <div className="flex items-center gap-2">
                 <span className="text-sm text-zinc-500">All Subscribers</span>
                 <Badge variant="secondary" className="bg-zinc-100 text-zinc-700">42 recipients</Badge>
              </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label>Template</Label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose a template..." />
                </SelectTrigger>
                <SelectContent>
                  {templates.map(t => (
                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label>Subject Line</Label>
              <Input
                placeholder="e.g., December Ministry Update"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <Label>Email Content</Label>
              <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="h-8">
                  <ImageIcon className="mr-2 h-3.5 w-3.5" />
                  Image
                </Button>
                <Button variant="outline" size="sm" className="h-8">
                  <LayoutTemplate className="mr-2 h-3.5 w-3.5" />
                  Layout
                </Button>
              </div>
            </div>
            <Textarea
              placeholder="Write your newsletter content here...

Dear {first_name},

Thank you for your continued support of our ministry..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none font-mono text-sm leading-relaxed p-4"
            />
            <p className="text-xs text-muted-foreground">
              Tip: Use {'{first_name}'} to personalize with donor&apos;s name
            </p>
          </div>

          <div className="flex items-center gap-4 p-4 bg-amber-50/50 border border-amber-100 rounded-lg text-sm">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <p className="text-amber-800">
              Your newsletter will be sent from your organization&apos;s email address and include your branding automatically.
            </p>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 py-4 border-t bg-muted/10 mt-auto flex-shrink-0">
          <Button variant="ghost" onClick={() => setOpen(false)}>
            Save Draft
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button disabled={!subject || !content} className="bg-zinc-900 hover:bg-zinc-800 text-white">
              <Send className="mr-2 h-4 w-4" />
              Send Newsletter
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function NewsletterPage() {
  return (
    <div className="p-6 max-w-6xl mx-auto space-y-8 bg-zinc-50 min-h-full">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Newsletter</h1>
          <p className="text-zinc-500">Send updates to your supporters via email.</p>
        </div>
        <ComposeNewsletterDialog />
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-6">
          <Card className="border-zinc-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-zinc-900 flex items-center gap-2">
                Templates
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {templates.map(template => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white">
            <CardHeader>
              <CardTitle className="text-base font-semibold text-zinc-900">Previous Newsletters</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {previousNewsletters.map(newsletter => (
                  <div 
                    key={newsletter.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/30 transition-colors"
                  >
                    <div className="flex items-center gap-4">
                      <div className="h-9 w-9 rounded-lg bg-zinc-100 flex items-center justify-center shrink-0">
                        <CheckCircle2 className="h-4 w-4 text-zinc-600" />
                      </div>
                      <div>
                        <p className="font-medium text-sm">{newsletter.subject}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(newsletter.sentAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {newsletter.recipients}
                          </span>
                          <span className="flex items-center gap-1 text-emerald-600 font-medium">
                            <Eye className="h-3 w-3" />
                            {Math.round((newsletter.opened / newsletter.recipients) * 100)}%
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon" className="h-8 w-8">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border-zinc-200 bg-zinc-50">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-semibold uppercase tracking-wider text-zinc-500">Stats Overview</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="text-center">
                <p className="text-4xl font-bold tracking-tight text-zinc-900">42</p>
                <p className="text-sm text-zinc-500">Active subscribers</p>
              </div>
              <div className="grid grid-cols-2 gap-4 border-t border-zinc-200 pt-4">
                <div className="text-center">
                  <p className="text-xl font-bold text-zinc-900">12</p>
                  <p className="text-xs text-zinc-500">Sent YTD</p>
                </div>
                <div className="text-center">
                  <p className="text-xl font-bold text-emerald-600">78%</p>
                  <p className="text-xs text-zinc-500">Avg Open Rate</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-zinc-200 bg-white">
            <CardHeader className="pb-3">
              <CardTitle className="text-base font-semibold text-zinc-900">Tips for Success</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3.5 text-sm">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-zinc-500">Keep subject lines under 50 characters for better open rates</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-zinc-500">Include a personal story or testimony to connect with donors</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-zinc-500">Add photos to increase engagement and readability</p>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p className="text-zinc-500">Send consistently (monthly recommended)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}