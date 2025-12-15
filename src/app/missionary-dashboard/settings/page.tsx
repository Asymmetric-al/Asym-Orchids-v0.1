'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Switch } from '@/components/ui/switch'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Bell,
  Mail,
  Smartphone,
  Gift,
  RefreshCcw,
  AlertTriangle,
  CreditCard,
  Users,
  MessageCircle,
  Heart,
  Settings,
  Save,
} from 'lucide-react'

interface NotificationSetting {
  id: string
  label: string
  description: string
  icon: React.ElementType
  inApp: boolean
  email: boolean
  sms: boolean
}

const notificationSettings: NotificationSetting[] = [
  { id: 'new_gift', label: 'New Gift Received', description: 'When someone gives to your fund', icon: Gift, inApp: true, email: true, sms: false },
  { id: 'recurring_started', label: 'New Recurring Gift', description: 'When someone starts a recurring donation', icon: RefreshCcw, inApp: true, email: true, sms: false },
  { id: 'recurring_failed', label: 'Recurring Gift Failed', description: 'When a payment fails or is declined', icon: AlertTriangle, inApp: true, email: true, sms: true },
  { id: 'recurring_cancelled', label: 'Recurring Gift Cancelled', description: 'When a donor cancels their recurring', icon: RefreshCcw, inApp: true, email: true, sms: false },
  { id: 'card_expiring', label: 'Card Expiring Soon', description: "When a donor's card is about to expire", icon: CreditCard, inApp: true, email: false, sms: false },
  { id: 'new_donor', label: 'New Donor', description: "When someone gives for the first time", icon: Users, inApp: true, email: true, sms: false },
  { id: 'at_risk', label: 'At-Risk Donor Alert', description: 'When a donor becomes at-risk', icon: AlertTriangle, inApp: true, email: false, sms: false },
  { id: 'new_comment', label: 'New Comment', description: 'When someone comments on your post', icon: MessageCircle, inApp: true, email: false, sms: false },
  { id: 'new_follower', label: 'New Follower Request', description: 'When someone requests to follow you', icon: Users, inApp: true, email: false, sms: false },
  { id: 'post_reaction', label: 'Post Reactions', description: 'When someone reacts to your post', icon: Heart, inApp: true, email: false, sms: false },
]

function NotificationRow({ setting, onChange }: { 
  setting: NotificationSetting
  onChange: (id: string, channel: 'inApp' | 'email' | 'sms', value: boolean) => void 
}) {
  const Icon = setting.icon
  return (
    <div className="flex items-start gap-4 py-4">
      <div className="h-9 w-9 rounded-lg bg-primary/10 flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-primary" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium">{setting.label}</p>
        <p className="text-sm text-muted-foreground">{setting.description}</p>
      </div>
      <div className="flex items-center gap-6">
        <div className="flex flex-col items-center gap-1">
          <Switch 
            checked={setting.inApp} 
            onCheckedChange={(checked) => onChange(setting.id, 'inApp', checked)}
          />
          <span className="text-xs text-muted-foreground">In-App</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Switch 
            checked={setting.email} 
            onCheckedChange={(checked) => onChange(setting.id, 'email', checked)}
          />
          <span className="text-xs text-muted-foreground">Email</span>
        </div>
        <div className="flex flex-col items-center gap-1">
          <Switch 
            checked={setting.sms} 
            onCheckedChange={(checked) => onChange(setting.id, 'sms', checked)}
          />
          <span className="text-xs text-muted-foreground">SMS</span>
        </div>
      </div>
    </div>
  )
}

export default function SettingsPage() {
  const [settings, setSettings] = React.useState(notificationSettings)
  const [hasChanges, setHasChanges] = React.useState(false)

  const handleChange = (id: string, channel: 'inApp' | 'email' | 'sms', value: boolean) => {
    setSettings(prev => prev.map(s => 
      s.id === id ? { ...s, [channel]: value } : s
    ))
    setHasChanges(true)
  }

  const handleSave = () => {
    setHasChanges(false)
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your notification preferences.</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave}>
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Bell className="h-5 w-5" />
            Notification Preferences
          </CardTitle>
          <CardDescription>Choose how you want to be notified about activity</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-end gap-6 pb-4 border-b mb-2">
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Bell className="h-4 w-4" />
              In-App
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Mail className="h-4 w-4" />
              Email
            </div>
            <div className="flex items-center gap-2 text-sm text-muted-foreground">
              <Smartphone className="h-4 w-4" />
              SMS
            </div>
          </div>
          <div className="divide-y">
            {settings.map(setting => (
              <NotificationRow 
                key={setting.id} 
                setting={setting} 
                onChange={handleChange}
              />
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <Settings className="h-5 w-5" />
            General Settings
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Daily Digest</Label>
              <p className="text-sm text-muted-foreground">Receive a daily summary instead of individual emails</p>
            </div>
            <Switch />
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div className="space-y-0.5">
              <Label>Marketing Emails</Label>
              <p className="text-sm text-muted-foreground">Receive tips and updates from the platform</p>
            </div>
            <Switch defaultChecked />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Account</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Change Password</p>
              <p className="text-sm text-muted-foreground">Update your account password</p>
            </div>
            <Button variant="outline">Change</Button>
          </div>
          <Separator />
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium">Two-Factor Authentication</p>
              <p className="text-sm text-muted-foreground">Add an extra layer of security</p>
            </div>
            <Button variant="outline">Enable</Button>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
