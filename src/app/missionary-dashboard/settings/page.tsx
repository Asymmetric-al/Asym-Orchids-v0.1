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
    <div className="flex items-start gap-4 py-4 group">
      <div className="h-9 w-9 rounded-lg bg-[#e8ebe5] flex items-center justify-center shrink-0">
        <Icon className="h-4 w-4 text-[#5d7052]" />
      </div>
      <div className="flex-1 min-w-0">
        <p className="font-medium text-sm">{setting.label}</p>
        <p className="text-sm text-muted-foreground">{setting.description}</p>
      </div>
      <div className="flex items-center gap-8">
        <div className="flex flex-col items-center gap-1.5">
          <Switch 
            checked={setting.inApp} 
            onCheckedChange={(checked) => onChange(setting.id, 'inApp', checked)}
            className="data-[state=checked]:bg-[#5d7052]"
          />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Switch 
            checked={setting.email} 
            onCheckedChange={(checked) => onChange(setting.id, 'email', checked)}
            className="data-[state=checked]:bg-[#5d7052]"
          />
        </div>
        <div className="flex flex-col items-center gap-1.5">
          <Switch 
            checked={setting.sms} 
            onCheckedChange={(checked) => onChange(setting.id, 'sms', checked)}
            className="data-[state=checked]:bg-[#5d7052]"
          />
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
    <div className="p-6 max-w-5xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your notification preferences.</p>
        </div>
        {hasChanges && (
          <Button onClick={handleSave} className="bg-[#5d7052] hover:bg-[#4a5a42] text-white">
            <Save className="mr-2 h-4 w-4" />
            Save Changes
          </Button>
        )}
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-8 space-y-8">
          <Card className="border shadow-none">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Bell className="h-4 w-4" />
                Notification Preferences
              </CardTitle>
            </CardHeader>
            <CardContent className="pt-4">
              <div className="flex items-center justify-end gap-8 pb-4 mb-2">
                <div className="w-[44px] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">In-App</div>
                <div className="w-[44px] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">Email</div>
                <div className="w-[44px] text-center text-xs font-medium text-muted-foreground uppercase tracking-wider">SMS</div>
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

          <Card className="border shadow-none">
            <CardHeader className="pb-3 border-b">
              <CardTitle className="text-base font-semibold flex items-center gap-2">
                <Settings className="h-4 w-4" />
                General Settings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 pt-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Daily Digest</Label>
                  <p className="text-sm text-muted-foreground">Receive a daily summary instead of individual emails</p>
                </div>
                <Switch className="data-[state=checked]:bg-[#5d7052]" />
              </div>
              <Separator />
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">Receive tips and updates from the platform</p>
                </div>
                <Switch defaultChecked className="data-[state=checked]:bg-[#5d7052]" />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-4 space-y-6">
          <Card className="border shadow-none">
            <CardHeader>
              <CardTitle className="text-base font-semibold">Account</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-2">
                <p className="font-medium text-sm">Change Password</p>
                <p className="text-xs text-muted-foreground mb-3">Update your account password</p>
                <Button variant="outline" size="sm" className="w-full">Change Password</Button>
              </div>
              <Separator />
              <div className="space-y-2">
                <p className="font-medium text-sm">Two-Factor Auth</p>
                <p className="text-xs text-muted-foreground mb-3">Add an extra layer of security</p>
                <Button variant="outline" size="sm" className="w-full">Enable 2FA</Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}