'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  ArrowLeft,
  ChevronDown,
  Video,
  MessageSquare,
  FileText,
  Target,
  Lock,
  Upload,
  Filter,
  Plus,
} from 'lucide-react'

interface Donor {
  id: string
  firstName: string
  lastName: string
  email: string
  phone?: string
  city?: string
  state?: string
  status: 'active' | 'at_risk' | 'lapsed' | 'new'
  totalGiven: number
  giftCount: number
  lastGiftDate: string
  lastGiftAmount: number
  isRecurring: boolean
  recurringAmount?: number
  recurringFrequency?: string
  firstGiftDate: string
  type?: string
  carePriority?: 'High' | 'Medium' | 'Low'
}

const donors: Donor[] = [
  { id: 'd1', firstName: 'Thomas', lastName: 'Smith', email: 'thomas.smith@email.com', phone: '(512) 555-0123', city: 'Austin', state: 'TX', status: 'active', totalGiven: 1800, giftCount: 12, lastGiftDate: '2024-12-10', lastGiftAmount: 150, isRecurring: true, recurringAmount: 150, recurringFrequency: 'monthly', firstGiftDate: '2024-01-15', type: 'Church Planter', carePriority: 'Medium' },
  { id: 'd2', firstName: 'Rebecca', lastName: 'Johnson', email: 'rebecca.j@email.com', phone: '(206) 555-0456', city: 'Seattle', state: 'WA', status: 'active', totalGiven: 900, giftCount: 10, lastGiftDate: '2024-12-05', lastGiftAmount: 75, isRecurring: true, recurringAmount: 75, recurringFrequency: 'monthly', firstGiftDate: '2024-03-01', type: 'Individual', carePriority: 'Low' },
  { id: 'd3', firstName: 'Michael', lastName: 'Williams', email: 'mike.w@email.com', phone: '(303) 555-0789', city: 'Denver', state: 'CO', status: 'active', totalGiven: 2400, giftCount: 6, lastGiftDate: '2024-12-01', lastGiftAmount: 200, isRecurring: true, recurringAmount: 200, recurringFrequency: 'monthly', firstGiftDate: '2024-06-15', type: 'Family', carePriority: 'High' },
  { id: 'd4', firstName: 'Jennifer', lastName: 'Davis', email: 'jen.davis@email.com', city: 'Portland', state: 'OR', status: 'at_risk', totalGiven: 500, giftCount: 5, lastGiftDate: '2024-06-15', lastGiftAmount: 100, isRecurring: false, firstGiftDate: '2023-05-20', type: 'Individual', carePriority: 'Medium' },
  { id: 'd5', firstName: 'David', lastName: 'Brown', email: 'david.b@email.com', phone: '(312) 555-0234', city: 'Chicago', state: 'IL', status: 'new', totalGiven: 250, giftCount: 1, lastGiftDate: '2024-12-12', lastGiftAmount: 250, isRecurring: false, firstGiftDate: '2024-12-12', type: 'Individual', carePriority: 'High' },
  { id: 'd6', firstName: 'Emily', lastName: 'Garcia', email: 'emily.g@email.com', phone: '(305) 555-0567', city: 'Miami', state: 'FL', status: 'active', totalGiven: 600, giftCount: 11, lastGiftDate: '2024-12-08', lastGiftAmount: 50, isRecurring: true, recurringAmount: 50, recurringFrequency: 'monthly', firstGiftDate: '2024-02-14', type: 'Individual', carePriority: 'Low' },
  { id: 'd7', firstName: 'Robert', lastName: 'Martinez', email: 'rob.m@email.com', city: 'Phoenix', state: 'AZ', status: 'lapsed', totalGiven: 300, giftCount: 3, lastGiftDate: '2024-03-01', lastGiftAmount: 100, isRecurring: false, firstGiftDate: '2023-09-01', type: 'Individual', carePriority: 'Medium' },
  { id: 'd8', firstName: 'Amanda', lastName: 'Lee', email: 'amanda.lee@email.com', phone: '(619) 555-0890', city: 'San Diego', state: 'CA', status: 'new', totalGiven: 100, giftCount: 1, lastGiftDate: '2024-12-14', lastGiftAmount: 100, isRecurring: false, firstGiftDate: '2024-12-14', type: 'Individual', carePriority: 'High' },
]

const statusConfig = {
  active: { label: 'On Field', color: 'bg-[#5d7052] text-white' },
  at_risk: { label: 'At Risk', color: 'bg-amber-100 text-amber-800' },
  lapsed: { label: 'Lapsed', color: 'bg-gray-100 text-gray-700' },
  new: { label: 'New', color: 'bg-blue-100 text-blue-800' },
}

function ActivityHeatmap() {
  const months = ['Dec', 'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  const days = ['Mon', 'Wed', 'Fri']
  
  const generateActivityData = () => {
    const data: number[][] = []
    for (let week = 0; week < 53; week++) {
      const weekData: number[] = []
      for (let day = 0; day < 3; day++) {
        weekData.push(Math.random() > 0.7 ? Math.floor(Math.random() * 4) : 0)
      }
      data.push(weekData)
    }
    return data
  }
  
  const activityData = React.useMemo(() => generateActivityData(), [])
  
  const getColor = (level: number) => {
    const colors = ['#ebedf0', '#c6e48b', '#7bc96f', '#239a3b', '#196127']
    return colors[level] || colors[0]
  }

  return (
    <div className="rounded-xl border p-5">
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="text-xs font-medium text-muted-foreground uppercase tracking-wider">ACTIVITY OVERVIEW</p>
          <p className="text-sm text-muted-foreground">12/12/2024 — 12/12/2025</p>
        </div>
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>Less</span>
          <div className="flex gap-0.5">
            {[0, 1, 2, 3, 4].map(level => (
              <div key={level} className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: getColor(level) }} />
            ))}
          </div>
          <span>More</span>
        </div>
      </div>
      
      <div className="flex gap-1">
        <div className="flex flex-col justify-between text-[10px] text-muted-foreground pr-2 py-1">
          {days.map(day => <span key={day}>{day}</span>)}
        </div>
        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-[2px] min-w-max">
            {activityData.map((week, weekIndex) => (
              <div key={weekIndex} className="flex flex-col gap-[2px]">
                {week.map((day, dayIndex) => (
                  <div
                    key={dayIndex}
                    className="w-2.5 h-2.5 rounded-sm"
                    style={{ backgroundColor: getColor(day) }}
                  />
                ))}
              </div>
            ))}
          </div>
          <div className="flex justify-between text-[10px] text-muted-foreground mt-1 px-1">
            {months.map((month, i) => <span key={i}>{month}</span>)}
          </div>
        </div>
      </div>
    </div>
  )
}

function DonorRow({ donor, onClick }: { donor: Donor; onClick: () => void }) {
  const initials = `${donor.firstName[0]}${donor.lastName[0]}`
  const statusStyle = statusConfig[donor.status]
  
  return (
    <div 
      className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-muted/30 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <Avatar className="h-10 w-10 border">
        <AvatarFallback className="bg-muted text-sm font-medium">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium">{donor.firstName} {donor.lastName}</p>
        </div>
        <p className="text-sm text-muted-foreground">
          {donor.email}
        </p>
      </div>

      <div className="hidden md:block text-right">
        <p className="font-medium">${donor.totalGiven.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{donor.giftCount} gifts</p>
      </div>

      <div className="hidden lg:block text-right">
        <p className="text-sm">{new Date(donor.lastGiftDate).toLocaleDateString()}</p>
        <p className="text-xs text-muted-foreground">Last gift</p>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button variant="ghost" size="icon" className="h-8 w-8">
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem>
            <Mail className="mr-2 h-4 w-4" />
            Send Email
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Phone className="mr-2 h-4 w-4" />
            Log Call
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem>View Details</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function DonorDetailView({ donor, onClose }: { donor: Donor; onClose: () => void }) {
  const initials = `${donor.firstName[0]}${donor.lastName[0]}`
  const statusStyle = statusConfig[donor.status]

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto p-6">
        <button onClick={onClose} className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-6">
          <ArrowLeft className="h-4 w-4" />
          Back
        </button>

        <div className="flex items-start justify-between mb-8">
          <div className="flex items-center gap-4">
            <Avatar className="h-16 w-16 border">
              <AvatarImage src="/placeholder-avatar.jpg" />
              <AvatarFallback className="bg-muted text-lg font-medium">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-2xl font-semibold">{donor.firstName} & Jane {donor.lastName.slice(0, 3)}</h1>
              <div className="flex items-center gap-2 mt-1 flex-wrap">
                <Badge className={statusStyle.color}>{statusStyle.label}</Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground flex items-center gap-1">
                  <Lock className="h-3 w-3" /> Security: Open
                </span>
                <span className="text-muted-foreground">•</span>
                <Badge variant="outline" className="bg-[#e8ebe5] text-[#5d7052] border-[#5d7052]/20">
                  {donor.type || 'Church Planter'}
                </Badge>
                <span className="text-muted-foreground">•</span>
                <span className="text-sm text-muted-foreground">Flag</span>
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline">Open Scheduler</Button>
            <Button className="bg-[#5d7052] hover:bg-[#4a5a42] text-white">
              <Mail className="mr-2 h-4 w-4" />
              Send Email
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6 mb-6">
          <div className="col-span-2">
            <ActivityHeatmap />
          </div>
          <div className="flex gap-6">
            <div className="text-center">
              <p className="text-3xl font-semibold">{donor.carePriority}</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">CARE PRIORITY</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-semibold">10/28/2025</p>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">LAST CONTACT</p>
            </div>
          </div>
        </div>

        <Tabs defaultValue="overview" className="w-full">
          <TabsList className="border-b w-full justify-start rounded-none bg-transparent p-0 h-auto">
            <TabsTrigger value="overview" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">
              <FileText className="h-4 w-4 mr-2" />
              Overview
            </TabsTrigger>
            <TabsTrigger value="care-thread" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">
              <MessageSquare className="h-4 w-4 mr-2" />
              Care Thread
            </TabsTrigger>
            <TabsTrigger value="activity-log" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">
              <Calendar className="h-4 w-4 mr-2" />
              Activity Log
            </TabsTrigger>
            <TabsTrigger value="care-plan" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">
              <Target className="h-4 w-4 mr-2" />
              Care Plan
            </TabsTrigger>
            <TabsTrigger value="private-notes" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">
              <Lock className="h-4 w-4 mr-2" />
              Private Notes
            </TabsTrigger>
            <TabsTrigger value="files" className="rounded-none border-b-2 border-transparent data-[state=active]:border-foreground data-[state=active]:bg-transparent px-4 pb-3">
              <Upload className="h-4 w-4 mr-2" />
              Files
            </TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="mt-6">
            <div className="grid md:grid-cols-2 gap-6">
              <Card className="border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center gap-3">
                    <Mail className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{donor.email}</span>
                  </div>
                  {donor.phone && (
                    <div className="flex items-center gap-3">
                      <Phone className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{donor.phone}</span>
                    </div>
                  )}
                  {donor.city && (
                    <div className="flex items-center gap-3">
                      <MapPin className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm">{donor.city}, {donor.state}</span>
                    </div>
                  )}
                </CardContent>
              </Card>

              <Card className="border">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium">Giving Summary</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-2xl font-semibold">${donor.totalGiven.toLocaleString()}</p>
                      <p className="text-xs text-muted-foreground">Total Given</p>
                    </div>
                    <div>
                      <p className="text-2xl font-semibold">{donor.giftCount}</p>
                      <p className="text-xs text-muted-foreground">Total Gifts</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="activity-log" className="mt-6">
            <Card className="border">
              <CardHeader className="flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">Interaction Log</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">
                    <Filter className="h-4 w-4 mr-2" />
                    Filter
                  </Button>
                  <Button size="sm" className="bg-[#5d7052] hover:bg-[#4a5a42] text-white">
                    <Plus className="h-4 w-4 mr-2" />
                    Log Activity
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { type: 'Video Call', date: '10/28/2025', note: 'Monthly check-in. Discussed language school progress.', by: 'Jeremy Beaumont' },
                  { type: 'Video Call', date: '11/22/2025', note: 'Routine check-in', by: 'Elisha Lima' },
                  { type: 'Text', date: '11/20/2025', note: 'Routine check-in', by: 'Elisha Lima' },
                  { type: 'Call', date: '11/14/2025', note: 'Routine check-in', by: 'Jeremy Beaumont' },
                ].map((activity, i) => (
                  <div key={i} className="flex items-start gap-4 p-4 border rounded-lg">
                    <div className="flex-shrink-0">
                      {activity.type === 'Video Call' && <Video className="h-4 w-4 text-muted-foreground" />}
                      {activity.type === 'Text' && <MessageSquare className="h-4 w-4 text-muted-foreground" />}
                      {activity.type === 'Call' && <Phone className="h-4 w-4 text-muted-foreground" />}
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">{activity.type}</span>
                        <span className="text-muted-foreground">•</span>
                        <span className="text-sm text-muted-foreground">{activity.date}</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">{activity.note}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Avatar className="h-6 w-6">
                        <AvatarFallback className="text-xs bg-muted">{activity.by.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                      </Avatar>
                      <span className="text-sm text-muted-foreground">{activity.by}</span>
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care-thread" className="mt-6">
            <Card className="border">
              <CardHeader className="flex-row items-center justify-between pb-4">
                <CardTitle className="text-lg font-semibold">DISCUSSION FEED</CardTitle>
                <Badge variant="outline">Internal Team</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <Avatar className="h-8 w-8">
                      <AvatarFallback className="bg-muted text-xs">JB</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-medium text-sm">Jeremy Beaumont</span>
                        <span className="text-xs text-muted-foreground">Oct 28, 2025, 02:30 PM</span>
                      </div>
                      <div className="mt-2 p-3 bg-muted/50 rounded-lg border-l-2 border-muted-foreground/20">
                        <p className="text-sm">Spoke with John. He is feeling a bit isolated due to language barriers. Recommended connection with the local expat fellowship.</p>
                      </div>
                      <button className="text-xs text-muted-foreground mt-2 hover:text-foreground">← Reply</button>
                    </div>
                  </div>
                </div>
                <div className="border-t pt-4">
                  <div className="flex gap-2 border-b pb-2 mb-3">
                    <button className="p-1 hover:bg-muted rounded"><strong>B</strong></button>
                    <button className="p-1 hover:bg-muted rounded"><em>I</em></button>
                    <button className="p-1 hover:bg-muted rounded"><u>U</u></button>
                  </div>
                  <textarea 
                    placeholder="Post an update to the thread..." 
                    className="w-full min-h-[80px] p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/20"
                  />
                  <div className="flex justify-end mt-2">
                    <Button size="sm" className="bg-[#8b9a7d] hover:bg-[#7a8a6c]">
                      Post
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="care-plan" className="mt-6">
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold">Care Goals</h3>
                  <p className="text-sm text-muted-foreground">1 Active / 1 Overdue</p>
                </div>
                <Button className="bg-[#5d7052] hover:bg-[#4a5a42] text-white">
                  <Plus className="h-4 w-4 mr-2" />
                  Add Goal
                </Button>
              </div>
              <Tabs defaultValue="active">
                <TabsList className="bg-transparent border p-1">
                  <TabsTrigger value="active" className="data-[state=active]:bg-muted">Active</TabsTrigger>
                  <TabsTrigger value="completed" className="data-[state=active]:bg-muted">Completed</TabsTrigger>
                </TabsList>
              </Tabs>
              <Card className="border">
                <CardContent className="p-4">
                  <div className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-full border-2 border-muted-foreground/30 mt-0.5" />
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-xs">MINISTRY</Badge>
                        <Badge variant="destructive" className="text-xs">OVERDUE</Badge>
                      </div>
                      <h4 className="font-medium mt-2">Language Evaluation</h4>
                      <p className="text-sm text-muted-foreground">Schedule language school evaluation debrief to discuss progress and next levels.</p>
                      <div className="flex items-center gap-4 mt-3 text-sm">
                        <span className="text-red-600">Due 11/20/2023</span>
                        <span className="text-muted-foreground flex items-center gap-1">
                          <Avatar className="h-4 w-4"><AvatarFallback className="text-[8px]">EL</AvatarFallback></Avatar>
                          Elisha Lima
                        </span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="private-notes" className="mt-6">
            <div className="bg-[#3d4a52] text-white p-4 rounded-lg mb-4">
              <div className="flex items-center gap-2">
                <Lock className="h-4 w-4" />
                <span className="font-medium">Confidential Area</span>
              </div>
              <p className="text-sm mt-1 opacity-90">Notes added here are only visible to Member Care staff with specific clearance. They are not shared with the missionary or regional leadership.</p>
            </div>
            <Card className="border">
              <CardHeader className="flex-row items-center justify-between pb-3">
                <CardTitle className="text-sm font-medium">Add Private Note</CardTitle>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm">Text</Button>
                  <Button variant="ghost" size="sm">Voice</Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex gap-2 border-b pb-2 mb-3">
                  <button className="p-1 hover:bg-muted rounded"><strong>B</strong></button>
                  <button className="p-1 hover:bg-muted rounded"><em>I</em></button>
                  <button className="p-1 hover:bg-muted rounded"><u>U</u></button>
                </div>
                <textarea 
                  placeholder="Enter confidential observations..." 
                  className="w-full min-h-[120px] p-3 text-sm border rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring/20"
                />
                <div className="flex justify-end mt-3">
                  <Button className="bg-[#5d7052] hover:bg-[#4a5a42] text-white">Save Securely</Button>
                </div>
              </CardContent>
            </Card>
            <p className="text-center text-muted-foreground text-sm mt-6">No private notes recorded.</p>
          </TabsContent>

          <TabsContent value="files" className="mt-6">
            <Card className="border">
              <CardHeader className="flex-row items-center justify-between pb-3">
                <CardTitle className="text-lg font-semibold">Documents & Files</CardTitle>
                <Button className="bg-[#5d7052] hover:bg-[#4a5a42] text-white">
                  <Upload className="h-4 w-4 mr-2" />
                  Upload File
                </Button>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col items-center justify-center py-12 text-center">
                  <div className="h-12 w-12 rounded-lg bg-muted flex items-center justify-center mb-4">
                    <FileText className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <p className="text-muted-foreground">No files uploaded.</p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default function DonorsPage() {
  const [search, setSearch] = React.useState('')
  const [selectedDonor, setSelectedDonor] = React.useState<Donor | null>(null)

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = search === '' || 
      `${donor.firstName} ${donor.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase())
    return matchesSearch
  })

  if (selectedDonor) {
    return <DonorDetailView donor={selectedDonor} onClose={() => setSelectedDonor(null)} />
  }

  return (
    <div className="p-6">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-semibold">Donors</h1>
          <p className="text-muted-foreground">Manage your supporters and track their giving.</p>
        </div>
        <Button variant="outline">
          Export CSV
        </Button>
      </div>

      <Card className="border">
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <span className="text-sm text-muted-foreground self-center">{filteredDonors.length} results</span>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredDonors.length > 0 ? (
            <div>
              {filteredDonors.map(donor => (
                <DonorRow 
                  key={donor.id} 
                  donor={donor} 
                  onClick={() => setSelectedDonor(donor)}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center">
              <h3 className="font-medium mb-1">No donors found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}