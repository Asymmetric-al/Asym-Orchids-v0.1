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
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Profile</h1>
          <p className="text-muted-foreground">Manage your public profile and contact information.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview Page
          </Button>
          <Button onClick={() => setIsEditing(!isEditing)}>
            {isEditing ? (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Changes
              </>
            ) : (
              <>
                <Sparkles className="mr-2 h-4 w-4" />
                Edit Profile
              </>
            )}
          </Button>
        </div>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Profile Photo</CardTitle>
              <CardDescription>This appears on your giving page</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center gap-4">
              <div className="relative">
                <Avatar className="h-32 w-32">
                  <AvatarImage src="/placeholder-avatar.jpg" />
                  <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-3xl">
                    SM
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <Button size="icon" className="absolute bottom-0 right-0 h-8 w-8 rounded-full">
                    <Camera className="h-4 w-4" />
                  </Button>
                )}
              </div>
              {isEditing && (
                <Button variant="outline" size="sm">
                  <Upload className="mr-2 h-4 w-4" />
                  Upload Photo
                </Button>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Cover Image</CardTitle>
              <CardDescription>Banner for your giving page</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="relative aspect-[3/1] bg-gradient-to-br from-emerald-500 to-teal-600 rounded-lg overflow-hidden">
                {isEditing && (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                    <Button variant="secondary" size="sm">
                      <Upload className="mr-2 h-4 w-4" />
                      Change Cover
                    </Button>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Social Links</CardTitle>
              <CardDescription>Connect your social profiles</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Facebook className="h-4 w-4 text-blue-600" />
                  Facebook
                </Label>
                <Input 
                  placeholder="https://facebook.com/..." 
                  value={profile.facebook}
                  onChange={(e) => setProfile({...profile, facebook: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Instagram className="h-4 w-4 text-pink-600" />
                  Instagram
                </Label>
                <Input 
                  placeholder="https://instagram.com/..." 
                  value={profile.instagram}
                  onChange={(e) => setProfile({...profile, instagram: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Twitter className="h-4 w-4 text-sky-500" />
                  Twitter / X
                </Label>
                <Input 
                  placeholder="https://twitter.com/..." 
                  value={profile.twitter}
                  onChange={(e) => setProfile({...profile, twitter: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Youtube className="h-4 w-4 text-red-600" />
                  YouTube
                </Label>
                <Input 
                  placeholder="https://youtube.com/..." 
                  value={profile.youtube}
                  onChange={(e) => setProfile({...profile, youtube: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label className="flex items-center gap-2">
                  <Link2 className="h-4 w-4" />
                  Website
                </Label>
                <Input 
                  placeholder="https://..." 
                  value={profile.website}
                  onChange={(e) => setProfile({...profile, website: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="lg:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Basic Information</CardTitle>
              <CardDescription>Your name and contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label>First Name</Label>
                  <Input 
                    value={profile.firstName}
                    onChange={(e) => setProfile({...profile, firstName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label>Last Name</Label>
                  <Input 
                    value={profile.lastName}
                    onChange={(e) => setProfile({...profile, lastName: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    Email
                  </Label>
                  <Input 
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    Phone
                  </Label>
                  <Input 
                    type="tel"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-muted-foreground" />
                    Location
                  </Label>
                  <Input 
                    value={profile.location}
                    onChange={(e) => setProfile({...profile, location: e.target.value})}
                    disabled={!isEditing}
                    placeholder="City, Country"
                  />
                </div>
                <div className="space-y-2">
                  <Label className="flex items-center gap-2">
                    <Globe className="h-4 w-4 text-muted-foreground" />
                    Ministry Focus
                  </Label>
                  <Input 
                    value={profile.ministryFocus}
                    onChange={(e) => setProfile({...profile, ministryFocus: e.target.value})}
                    disabled={!isEditing}
                    placeholder="e.g., Youth Ministry"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">About / Bio</CardTitle>
              <CardDescription>Tell supporters about your ministry</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea 
                value={profile.bio}
                onChange={(e) => setProfile({...profile, bio: e.target.value})}
                disabled={!isEditing}
                className="min-h-[200px] resize-none"
                placeholder="Share your story, mission, and vision..."
              />
              <p className="text-xs text-muted-foreground mt-2">
                {profile.bio.length} / 2000 characters
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Giving Page Preview</CardTitle>
              <CardDescription>How supporters see your profile</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="border rounded-lg overflow-hidden">
                <div className="aspect-[3/1] bg-gradient-to-br from-emerald-500 to-teal-600" />
                <div className="p-6 relative">
                  <Avatar className="h-20 w-20 absolute -top-10 border-4 border-background">
                    <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-xl">
                      SM
                    </AvatarFallback>
                  </Avatar>
                  <div className="mt-12">
                    <h3 className="text-xl font-bold">{profile.firstName} {profile.lastName}</h3>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mt-1">
                      <span className="flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5" />
                        {profile.location}
                      </span>
                      <Badge variant="secondary">{profile.ministryFocus}</Badge>
                    </div>
                    <p className="text-sm mt-4 text-muted-foreground line-clamp-3">{profile.bio}</p>
                    <div className="flex gap-2 mt-4">
                      {profile.facebook && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Facebook className="h-4 w-4" />
                        </Button>
                      )}
                      {profile.instagram && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Instagram className="h-4 w-4" />
                        </Button>
                      )}
                      {profile.website && (
                        <Button variant="ghost" size="icon" className="h-8 w-8">
                          <Globe className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
