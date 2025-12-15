'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Label } from '@/components/ui/label'
import { Separator } from '@/components/ui/separator'
import {
  Camera,
  Upload,
  Globe,
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Twitter,
  Youtube,
  Link2,
  Save,
  Eye,
  Sparkles,
  ImageIcon,
  CheckCircle2,
  Smartphone,
} from 'lucide-react'

export default function ProfilePage() {
  const [isEditing, setIsEditing] = React.useState(false)
  const [profile, setProfile] = React.useState({
    firstName: 'Sarah',
    lastName: 'Mitchell',
    email: 'sarah.mitchell@example.com',
    phone: '+1 (555) 123-4567',
    location: 'Bangkok, Thailand',
    ministryFocus: 'Youth Ministry & Education',
    bio: 'Serving families and youth in Southeast Asia through education and discipleship programs. Our mission is to empower the next generation with hope, skills, and the love of Christ.',
    facebook: 'https://facebook.com/sarahmitchell',
    instagram: 'https://instagram.com/sarah.ministry',
    twitter: '',
    youtube: '',
    website: 'https://sarahmitchell.ministry',
  })

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Content & Profile</h1>
          <p className="text-muted-foreground">Manage your public presence and giving pages.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="bg-white">
            <Eye className="mr-2 h-4 w-4" />
            Live Site
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)} className="bg-black text-white hover:bg-black/90">
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-12">
        <div className="lg:col-span-7 space-y-6">
          <Card className="border shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Display Name</Label>
                  <Input 
                    value={`${profile.firstName} & ${profile.lastName}`}
                    onChange={(e) => {}}
                    disabled={!isEditing}
                    className="bg-muted/10"
                  />
                </div>
                <div className="space-y-1.5">
                  <Label className="text-xs font-medium text-muted-foreground">Location</Label>
                  <Input 
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    disabled={!isEditing}
                    className="bg-muted/10"
                  />
                </div>
              </div>
              
              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Tagline</Label>
                <Input 
                  value={profile.ministryFocus}
                  onChange={(e) => setProfile({...profile, ministryFocus: e.target.value})}
                  disabled={!isEditing}
                  className="bg-muted/10"
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-xs font-medium text-muted-foreground">Bio</Label>
                <div className="relative">
                  <div className="absolute top-2 left-2 flex gap-1 p-1 bg-white rounded border shadow-sm z-10">
                    <button className="p-1 hover:bg-muted rounded text-xs font-bold">B</button>
                    <button className="p-1 hover:bg-muted rounded text-xs italic">I</button>
                    <button className="p-1 hover:bg-muted rounded text-xs underline">U</button>
                  </div>
                  <Textarea 
                    value={profile.bio}
                    onChange={(e) => setProfile({...profile, bio: e.target.value})}
                    disabled={!isEditing}
                    className="min-h-[160px] resize-none bg-muted/10 pt-10"
                  />
                </div>
                <p className="text-[10px] text-muted-foreground text-right">Rich text formatting supported</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none">
            <CardHeader className="pb-4">
              <CardTitle className="text-base font-semibold">Imagery</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-start gap-6">
                <Avatar className="h-20 w-20 border">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-muted text-lg font-medium">SM</AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <p className="text-sm font-medium">Profile Photo</p>
                  <p className="text-xs text-muted-foreground">Recommended 400x400px. JPG or PNG.</p>
                  <Button variant="outline" size="sm" className="h-8">
                    <Upload className="mr-2 h-3.5 w-3.5" />
                    Upload New
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-sm font-medium">Cover Image</Label>
                <div className="aspect-[3/1] rounded-lg border-2 border-dashed flex flex-col items-center justify-center bg-muted/10 hover:bg-muted/20 transition-colors cursor-pointer">
                  <div className="h-10 w-10 rounded-full bg-muted/50 flex items-center justify-center mb-2">
                    <ImageIcon className="h-5 w-5 text-muted-foreground" />
                  </div>
                  <p className="text-sm text-muted-foreground">Click to upload cover</p>
                  <p className="text-xs text-muted-foreground/70">1200x400px recommended</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">Public Contact Details</CardTitle>
              <Badge variant="outline" className="text-muted-foreground font-normal">Optional Section</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground mb-2">Add contact methods for donors to reach you directly.</p>
              
              <div className="p-3 bg-muted/20 border rounded-lg flex items-start gap-2 mb-4">
                <CheckCircle2 className="h-4 w-4 text-muted-foreground mt-0.5" />
                <p className="text-xs text-muted-foreground">Fields left blank will be automatically hidden from your public profile.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">Contact Email</Label>
                    <span className="text-[10px] text-muted-foreground uppercase">Optional</span>
                  </div>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="contact@example.com" value={profile.email} onChange={(e) => setProfile({...profile, email: e.target.value})} disabled={!isEditing} />
                  </div>
                </div>
                <div className="space-y-1.5">
                  <div className="flex justify-between">
                    <Label className="text-xs font-medium text-muted-foreground">Personal Website</Label>
                    <span className="text-[10px] text-muted-foreground uppercase">Optional</span>
                  </div>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input className="pl-9" placeholder="https://yourwebsite.com" value={profile.website} onChange={(e) => setProfile({...profile, website: e.target.value})} disabled={!isEditing} />
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border shadow-none">
            <CardHeader className="flex-row items-center justify-between pb-4">
              <CardTitle className="text-base font-semibold">Social Links</CardTitle>
              <Badge variant="outline" className="text-muted-foreground font-normal">Optional</Badge>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-xs text-muted-foreground mb-2">Connect your social platforms. Icons will only appear on your page for the networks you add below.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 flex justify-center">
                    <Facebook className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input className="pl-10" placeholder="facebook.com/your-page" value={profile.facebook} onChange={(e) => setProfile({...profile, facebook: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 flex justify-center">
                    <Instagram className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input className="pl-10" placeholder="instagram.com/your-handle" value={profile.instagram} onChange={(e) => setProfile({...profile, instagram: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 flex justify-center">
                    <Twitter className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input className="pl-10" placeholder="x.com/your-handle" value={profile.twitter} onChange={(e) => setProfile({...profile, twitter: e.target.value})} disabled={!isEditing} />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 w-5 flex justify-center">
                    <Youtube className="h-4 w-4 text-muted-foreground" />
                  </div>
                  <Input className="pl-10" placeholder="youtube.com/@your-channel" value={profile.youtube} onChange={(e) => setProfile({...profile, youtube: e.target.value})} disabled={!isEditing} />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-5">
          <div className="sticky top-6">
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">Live Preview</span>
              <div className="flex gap-1">
                <Button variant="outline" size="icon" className="h-8 w-8 bg-white"><Smartphone className="h-4 w-4" /></Button>
                <Button variant="ghost" size="icon" className="h-8 w-8"><Eye className="h-4 w-4" /></Button>
              </div>
            </div>
            
            <div className="border-[8px] border-gray-900 rounded-[3rem] overflow-hidden shadow-2xl bg-white aspect-[9/19.5] relative">
              <div className="absolute top-0 left-0 right-0 h-32 bg-gray-100">
                <div className="absolute inset-0 flex items-center justify-center opacity-10">
                   <ImageIcon className="h-12 w-12" />
                </div>
              </div>
              <div className="absolute top-20 left-0 right-0 flex justify-center">
                <div className="h-24 w-24 rounded-full border-4 border-white bg-white overflow-hidden shadow-sm">
                   <Avatar className="h-full w-full">
                    <AvatarImage src="/placeholder-avatar.jpg" />
                    <AvatarFallback className="bg-muted">SM</AvatarFallback>
                  </Avatar>
                </div>
              </div>
              
              <div className="mt-48 px-6 text-center">
                <h2 className="text-xl font-bold text-gray-900">{profile.firstName} & {profile.lastName}</h2>
                <div className="flex items-center justify-center gap-1 text-xs text-gray-500 mt-1">
                  <MapPin className="h-3 w-3" />
                  {profile.location}
                </div>
                <p className="text-xs font-medium text-[#5d7052] mt-1">{profile.ministryFocus}</p>
                
                <p className="text-sm text-gray-600 mt-4 leading-relaxed line-clamp-4">
                  {profile.bio}
                </p>

                <Button className="w-full mt-6 bg-gray-900 text-white hover:bg-gray-800 rounded-full h-12 shadow-lg shadow-gray-900/20">
                  GIVE SUPPORT
                </Button>

                <div className="mt-8 pt-8 border-t flex justify-center">
                   <p className="text-[10px] text-gray-400 font-medium tracking-widest uppercase">Active Campaigns</p>
                </div>
                <div className="mt-4 bg-gray-100 rounded-xl h-24 w-full"></div>
              </div>

              {/* Dynamic Island Area */}
              <div className="absolute top-0 left-0 right-0 h-14 flex justify-center pt-2">
                 <div className="bg-black h-7 w-28 rounded-full"></div>
              </div>
              {/* Home Indicator */}
              <div className="absolute bottom-1 left-0 right-0 flex justify-center">
                 <div className="bg-gray-300 h-1 w-32 rounded-full"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}