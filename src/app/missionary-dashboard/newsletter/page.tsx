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
    <Card className="cursor-pointer hover:border-primary/50 transition-colors group">
      <CardContent className="p-4 flex items-center gap-3">
        <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors">
          <Icon className="h-5 w-5 text-primary" />
        </div>
        <div>
          <p className="font-medium">{template.name}</p>
          <p className="text-xs text-muted-foreground">{template.description}</p>
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
        <Button size="lg" className="gap-2">
          <Plus className="h-4 w-4" />
          Compose Newsletter
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-3xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Compose Newsletter</DialogTitle>
          <DialogDescription>Create and send an update to your supporters.</DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4 text-muted-foreground" />
              <span className="text-sm">Sending to</span>
            </div>
            <Badge variant="secondary">42 recipients</Badge>
          </div>

          <div className="space-y-2">
            <Label>Subject Line</Label>
            <Input
              placeholder="e.g., December Ministry Update"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
            />
          </div>

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
            <div className="flex items-center justify-between">
              <Label>Email Content</Label>
              <Button variant="ghost" size="sm">
                <ImageIcon className="mr-2 h-4 w-4" />
                Add Image
              </Button>
            </div>
            <Textarea
              placeholder="Write your newsletter content here...

Dear {first_name},

Thank you for your continued support of our ministry..."
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="min-h-[300px] resize-none font-mono text-sm"
            />
            <p className="text-xs text-muted-foreground">
              Use {'{first_name}'} to personalize with donor&apos;s name
            </p>
          </div>

          <div className="flex items-center gap-4 p-3 bg-amber-50 dark:bg-amber-950/30 rounded-lg text-sm">
            <Sparkles className="h-4 w-4 text-amber-600 shrink-0" />
            <p className="text-amber-800 dark:text-amber-200">
              Your newsletter will be sent from your organization&apos;s email address and include your branding.
            </p>
          </div>
        </div>
        <div className="flex justify-between">
          <Button variant="outline" onClick={() => setOpen(false)}>
            Save Draft
          </Button>
          <div className="flex gap-2">
            <Button variant="outline">
              <Eye className="mr-2 h-4 w-4" />
              Preview
            </Button>
            <Button disabled={!subject || !content}>
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
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Newsletter</h1>
          <p className="text-muted-foreground">Send updates to your supporters via email.</p>
        </div>
        <ComposeNewsletterDialog />
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <LayoutTemplate className="h-5 w-5" />
                Templates
              </CardTitle>
              <CardDescription>Start with a pre-designed template</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-3">
                {templates.map(template => (
                  <TemplateCard key={template.id} template={template} />
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Previous Newsletters</CardTitle>
              <CardDescription>Your sent newsletters</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {previousNewsletters.map(newsletter => (
                  <div 
                    key={newsletter.id}
                    className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                        <CheckCircle2 className="h-5 w-5 text-emerald-600" />
                      </div>
                      <div>
                        <p className="font-medium">{newsletter.subject}</p>
                        <div className="flex items-center gap-3 text-xs text-muted-foreground mt-0.5">
                          <span className="flex items-center gap-1">
                            <Clock className="h-3 w-3" />
                            {new Date(newsletter.sentAt).toLocaleDateString()}
                          </span>
                          <span className="flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            {newsletter.recipients} recipients
                          </span>
                          <span className="flex items-center gap-1">
                            <Eye className="h-3 w-3" />
                            {Math.round((newsletter.opened / newsletter.recipients) * 100)}% opened
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <Button variant="ghost" size="sm">
                        <Copy className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg flex items-center gap-2">
                <Users className="h-5 w-5" />
                Recipients
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <p className="text-3xl font-bold">42</p>
                <p className="text-sm text-muted-foreground">Active subscribers</p>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Recurring donors</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">One-time donors</span>
                  <span className="font-medium">4</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-muted-foreground">Other subscribers</span>
                  <span className="font-medium">34</span>
                </div>
              </div>
              <p className="text-xs text-muted-foreground">
                Donors who opted out of emails are automatically excluded.
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Newsletter Stats</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">12</p>
                  <p className="text-xs text-muted-foreground">Sent this year</p>
                </div>
                <div className="text-center p-3 bg-muted/50 rounded-lg">
                  <p className="text-2xl font-bold">78%</p>
                  <p className="text-xs text-muted-foreground">Avg open rate</p>
                </div>
              </div>
              <div className="pt-2 border-t">
                <p className="text-xs text-muted-foreground">
                  Last newsletter sent on Dec 1, 2024
                </p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Tips</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm">
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p>Keep subject lines under 50 characters</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p>Include a personal story or testimony</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p>Add photos to increase engagement</p>
              </div>
              <div className="flex items-start gap-2">
                <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
                <p>Send consistently (monthly recommended)</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
