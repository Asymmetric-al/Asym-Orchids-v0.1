'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Textarea } from '@/components/ui/textarea'
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogDescription,
} from '@/components/ui/dialog'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu'
import {
  Search,
  Mail,
  Phone,
  MapPin,
  Filter,
  Plus,
  Download,
  Heart,
  MessageSquare,
  Briefcase,
  Check,
  Send,
  Copy,
  ExternalLink,
  Pencil,
  User,
} from 'lucide-react'
import { formatDistanceToNow, format } from 'date-fns'

type ActivityType = 'gift' | 'note' | 'call' | 'email' | 'meeting'

interface Activity {
  id: string
  type: ActivityType
  date: string
  title: string
  description?: string
  amount?: number
  status?: string
}

interface Donor {
  id: string
  name: string
  initials: string
  type: 'Individual' | 'Organization' | 'Church'
  status: 'Active' | 'Lapsed' | 'New' | 'At Risk'
  totalGiven: number
  lastGiftDate: string
  lastGiftAmount: number
  frequency: 'Monthly' | 'One-Time' | 'Annually' | 'Irregular'
  email: string
  phone: string
  avatar?: string
  location: string
  address: {
    street: string
    city: string
    state: string
    zip: string
    country: string
  }
  joinedDate: string
  tags: string[]
  activities: Activity[]
}

const generateActivities = (donorId: string): Activity[] => {
  return [
    { id: `act-${donorId}-1`, type: 'gift', date: '2023-10-24T10:00:00', title: 'Donation Received', amount: 200, status: 'Succeeded' },
    { id: `act-${donorId}-2`, type: 'note', date: '2023-10-15T14:30:00', title: 'Coffee Meeting', description: 'Met to discuss the new building project. Very interested in supporting the roof construction.' },
    { id: `act-${donorId}-3`, type: 'email', date: '2023-10-01T09:15:00', title: 'Sent Quarterly Update', description: 'Q3 Impact Report sent via Mailchimp.' },
    { id: `act-${donorId}-4`, type: 'gift', date: '2023-09-24T10:00:00', title: 'Donation Received', amount: 200, status: 'Succeeded' },
  ]
}

const DONORS_DATA: Donor[] = [
  { 
    id: '1', 
    name: 'Alice Johnson', 
    initials: 'AJ',
    type: 'Individual', 
    status: 'Active', 
    totalGiven: 12400, 
    lastGiftDate: '2024-10-24', 
    lastGiftAmount: 200,
    frequency: 'Monthly',
    email: 'alice.j@example.com', 
    phone: '+1 (555) 123-4567',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Denver, CO',
    address: { street: '123 Maple Avenue', city: 'Denver', state: 'CO', zip: '80203', country: 'USA' },
    joinedDate: '2019-03-15',
    tags: ['Youth Ministry', 'Monthly Partner'],
    activities: generateActivities('1')
  },
  { 
    id: '2', 
    name: 'Grace Community Church', 
    initials: 'GC',
    type: 'Church', 
    status: 'Active', 
    totalGiven: 45000, 
    lastGiftDate: '2024-10-15', 
    lastGiftAmount: 1500,
    frequency: 'Monthly',
    email: 'missions@grace-community.org', 
    phone: '+1 (555) 987-6543',
    location: 'Colorado Springs, CO',
    address: { street: '4500 Church Street', city: 'Colorado Springs', state: 'CO', zip: '80903', country: 'USA' },
    joinedDate: '2015-01-10',
    tags: ['Church Partner', 'Major Donor'],
    activities: [
       { id: 'act-2-1', type: 'gift', date: '2024-10-15T08:00:00', title: 'Monthly Support', amount: 1500, status: 'Succeeded' },
       { id: 'act-2-2', type: 'meeting', date: '2024-09-20T11:00:00', title: 'Zoom with Missions Committee', description: 'Presented the annual vision. They approved the budget increase for 2025.' },
    ]
  },
  { 
    id: '3', 
    name: 'Robert Smith', 
    initials: 'RS',
    type: 'Individual', 
    status: 'Lapsed', 
    totalGiven: 500, 
    lastGiftDate: '2024-04-10', 
    lastGiftAmount: 100,
    frequency: 'Irregular',
    email: 'bob.smith@example.com', 
    phone: '+1 (555) 456-7890',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Boulder, CO',
    address: { street: '789 Oak Lane', city: 'Boulder', state: 'CO', zip: '80302', country: 'USA' },
    joinedDate: '2023-11-01',
    tags: ['Needs Follow-up'],
    activities: [
        { id: 'act-3-1', type: 'gift', date: '2024-04-10T10:00:00', title: 'Donation', amount: 100, status: 'Succeeded' },
    ]
  },
  {
    id: '4',
    name: 'Tom Clark',
    initials: 'TC',
    type: 'Individual', 
    status: 'At Risk',
    totalGiven: 1200, 
    lastGiftDate: '2024-09-10',
    lastGiftAmount: 100,
    frequency: 'Monthly',
    email: 'tom.c@example.com', 
    phone: '+1 (555) 333-4444',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?fit=facearea&facepad=2&w=256&h=256&q=80',
    location: 'Lakewood, CO',
    address: { street: '888 Birch Dr', city: 'Lakewood', state: 'CO', zip: '80226', country: 'USA' },
    joinedDate: '2022-01-20',
    tags: ['Card Failed', 'Urgent'],
    activities: [
        { id: 'act-4-1', type: 'gift', date: '2024-09-10T10:00:00', title: 'Donation Failed', amount: 100, status: 'Failed' },
    ]
  }
]

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD', minimumFractionDigits: 0 }).format(value)
}

const getStatusColor = (status: Donor['status']) => {
  switch(status) {
    case 'Active': return 'bg-emerald-500'
    case 'Lapsed': return 'bg-gray-400'
    case 'New': return 'bg-blue-500'
    case 'At Risk': return 'bg-amber-500'
    default: return 'bg-gray-400'
  }
}

const getStatusBadge = (status: Donor['status']) => {
  const styles: Record<Donor['status'], string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Lapsed: 'bg-gray-100 text-gray-600 border-gray-200',
    New: 'bg-blue-50 text-blue-700 border-blue-200',
    'At Risk': 'bg-amber-50 text-amber-700 border-amber-200',
  }
  return (
    <Badge variant="outline" className={`font-medium border px-2.5 py-0.5 text-[11px] uppercase tracking-wider ${styles[status]}`}>
      {status}
    </Badge>
  )
}

const getActivityIcon = (type: ActivityType) => {
  switch(type) {
    case 'gift': return <Heart className="h-4 w-4 text-white" />
    case 'call': return <Phone className="h-4 w-4 text-white" />
    case 'email': return <Mail className="h-4 w-4 text-white" />
    case 'note': return <MessageSquare className="h-4 w-4 text-white" />
    case 'meeting': return <Briefcase className="h-4 w-4 text-white" />
    default: return <Heart className="h-4 w-4 text-white" />
  }
}

const getActivityBg = (type: ActivityType) => {
  switch(type) {
    case 'gift': return 'bg-rose-400'
    case 'call': return 'bg-blue-400'
    case 'email': return 'bg-violet-400'
    case 'note': return 'bg-gray-400'
    case 'meeting': return 'bg-emerald-400'
    default: return 'bg-gray-400'
  }
}

export default function DonorsPage() {
  const [selectedDonorId, setSelectedDonorId] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('All')
  const [activeTab, setActiveTab] = React.useState('timeline')
  const [noteInput, setNoteInput] = React.useState('')
  const [isNoteDialogOpen, setIsNoteDialogOpen] = React.useState(false)
  const [activityInput, setActivityInput] = React.useState('')

  const filteredDonors = React.useMemo(() => {
    return DONORS_DATA.filter(donor => {
      const matchesSearch = donor.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                            donor.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                            donor.location.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesStatus = statusFilter === 'All' || donor.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [searchTerm, statusFilter])

  const selectedDonor = React.useMemo(() => 
    DONORS_DATA.find(d => d.id === selectedDonorId), 
  [selectedDonorId])

  const handleAddNote = () => {
    console.log(`Adding note to donor ${selectedDonorId}: ${noteInput}`)
    setNoteInput('')
    setIsNoteDialogOpen(false)
  }

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  const handlePostActivity = () => {
    console.log(`Posting activity: ${activityInput}`)
    setActivityInput('')
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-white">
      <div className={`flex flex-col h-full border-r border-gray-200 bg-white w-full lg:w-[400px] shrink-0 ${selectedDonorId ? 'hidden lg:flex' : 'flex'}`}>
        <div className="p-4 border-b border-gray-100 space-y-4 shrink-0 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-gray-900">Partners</h2>
              <p className="text-sm text-gray-500">{filteredDonors.length} contacts</p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-500 hover:text-gray-900 hover:bg-gray-100">
                    <Filter className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white">
                  <DropdownMenuLabel>Filter Status</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  {['All', 'Active', 'New', 'Lapsed', 'At Risk'].map(s => (
                    <DropdownMenuCheckboxItem 
                      key={s} 
                      checked={statusFilter === s}
                      onCheckedChange={() => setStatusFilter(s)}
                    >
                      {s}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
              <Button size="icon" className="h-9 w-9 bg-gray-900 hover:bg-gray-800 text-white">
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="relative">
            <Search className="absolute left-3 top-2.5 h-4 w-4 text-gray-400" />
            <Input 
              placeholder="Search partners..." 
              className="pl-9 bg-gray-50 border-gray-200 focus:bg-white h-10" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <div className="p-2">
            {filteredDonors.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-64 text-gray-400">
                <Search className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">No partners found</p>
              </div>
            ) : (
              filteredDonors.map((donor) => (
                <div 
                  key={donor.id}
                  onClick={() => setSelectedDonorId(donor.id)}
                  className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all border mb-1 ${
                    selectedDonorId === donor.id 
                      ? 'bg-blue-50 border-blue-200' 
                      : 'bg-white border-transparent hover:bg-gray-50 hover:border-gray-200'
                  }`}
                >
                  {selectedDonorId === donor.id && (
                    <div className="absolute left-0 w-1 h-12 bg-blue-600 rounded-r" />
                  )}
                  
                  <div className="relative shrink-0">
                    <Avatar className={`h-11 w-11 border-2 ${selectedDonorId === donor.id ? 'border-blue-200' : 'border-white'}`}>
                      <AvatarImage src={donor.avatar} />
                      <AvatarFallback className="bg-gray-100 text-gray-600 font-medium text-sm">
                        {donor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(donor.status)}`} />
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <span className={`font-medium text-sm truncate ${selectedDonorId === donor.id ? 'text-blue-900' : 'text-gray-900'}`}>
                        {donor.name}
                      </span>
                      <span className="text-xs text-gray-400 whitespace-nowrap ml-2">
                        {formatDistanceToNow(new Date(donor.lastGiftDate), { addSuffix: true })}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-xs text-gray-500 truncate">
                        {donor.location}
                      </span>
                      <span className="text-xs font-semibold text-gray-700">
                        {formatCurrency(donor.lastGiftAmount)}
                      </span>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </div>

      <div className={`flex-1 flex flex-col bg-white h-full overflow-hidden ${selectedDonorId ? 'flex' : 'hidden lg:flex'}`}>
        {selectedDonor ? (
          <>
            <div className="shrink-0 border-b border-gray-100 px-6 py-4 bg-white flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="lg:hidden -ml-2 text-gray-500"
                  onClick={() => setSelectedDonorId(null)}
                >
                  Back
                </Button>
                <h2 className="text-lg font-semibold text-gray-900">{selectedDonor.name}</h2>
                {getStatusBadge(selectedDonor.status)}
              </div>
              <div className="flex items-center gap-2">
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 text-sm font-medium gap-2 border-gray-200 bg-white hover:bg-gray-50"
                  onClick={() => setIsNoteDialogOpen(true)}
                >
                  <Pencil className="h-3.5 w-3.5" /> Note
                </Button>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="h-9 text-sm font-medium gap-2 border-gray-200 bg-white hover:bg-gray-50"
                >
                  <Phone className="h-3.5 w-3.5" /> Call
                </Button>
                <Button 
                  size="sm" 
                  className="h-9 text-sm font-medium gap-2 bg-gray-900 text-white hover:bg-gray-800"
                >
                  <Mail className="h-3.5 w-3.5" /> Email
                </Button>
              </div>
            </div>

            <ScrollArea className="flex-1">
              <div className="p-6 space-y-6">
                <div className="flex flex-col md:flex-row gap-6 items-start">
                  <div className="flex items-center gap-5">
                    <Avatar className="h-20 w-20 border-2 border-white shadow-sm">
                      <AvatarImage src={selectedDonor.avatar} />
                      <AvatarFallback className="text-xl font-semibold bg-gray-100 text-gray-600">
                        {selectedDonor.initials}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h1 className="text-2xl font-semibold text-gray-900">{selectedDonor.name}</h1>
                      <div className="flex items-center gap-1.5 text-sm text-gray-500 mt-1">
                        <MapPin className="h-3.5 w-3.5" /> {selectedDonor.location}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {selectedDonor.tags.map(tag => (
                          <span key={tag} className="px-2.5 py-1 bg-gray-100 border border-gray-200 rounded-md text-xs font-medium text-gray-600 uppercase tracking-wide">
                            {tag}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-4">
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider font-medium text-gray-400 mb-1">Lifetime</p>
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedDonor.totalGiven)}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider font-medium text-gray-400 mb-1">Last Gift</p>
                      <p className="text-xl font-semibold text-gray-900">{formatCurrency(selectedDonor.lastGiftAmount)}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider font-medium text-gray-400 mb-1">Frequency</p>
                      <p className="text-sm font-semibold text-gray-900">{selectedDonor.frequency}</p>
                    </div>
                    <div className="bg-white border border-gray-200 rounded-lg p-4">
                      <p className="text-xs uppercase tracking-wider font-medium text-gray-400 mb-1">Partner Since</p>
                      <p className="text-sm font-semibold text-gray-900">{new Date(selectedDonor.joinedDate).getFullYear()}</p>
                    </div>
                  </div>
                </div>

                <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                  <div className="border-b border-gray-200">
                    <TabsList className="bg-transparent h-auto p-0 gap-6">
                      {['Timeline', 'Contact Info', 'Giving History'].map(tab => (
                        <TabsTrigger 
                          key={tab} 
                          value={tab.toLowerCase().replace(' ', '-')}
                          className="bg-transparent border-b-2 border-transparent data-[state=active]:border-gray-900 data-[state=active]:text-gray-900 data-[state=active]:shadow-none rounded-none px-0 py-3 text-sm font-medium text-gray-500 hover:text-gray-700"
                        >
                          {tab}
                        </TabsTrigger>
                      ))}
                    </TabsList>
                  </div>

                  <div className="pt-6">
                    <TabsContent value="timeline" className="space-y-6 mt-0">
                      <div className="bg-white p-4 rounded-xl border border-gray-200 flex gap-4">
                        <Avatar className="h-9 w-9 hidden md:block">
                          <AvatarFallback className="bg-gray-900 text-white text-xs font-medium">ME</AvatarFallback>
                        </Avatar>
                        <div className="flex-1 space-y-3">
                          <Input 
                            placeholder="Log a call, meeting notes, or task..." 
                            className="border-gray-200 bg-gray-50 focus:bg-white h-10"
                            value={activityInput}
                            onChange={(e) => setActivityInput(e.target.value)}
                          />
                          <div className="flex justify-between items-center">
                            <div className="flex gap-2">
                              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 gap-1.5">
                                <Phone className="h-3.5 w-3.5" /> Log Call
                              </Button>
                              <Button variant="ghost" size="sm" className="h-8 text-xs text-gray-500 hover:text-gray-900 hover:bg-gray-100 gap-1.5">
                                <Check className="h-3.5 w-3.5" /> Create Task
                              </Button>
                            </div>
                            <Button 
                              size="sm" 
                              className="h-8 text-xs bg-gray-900 text-white hover:bg-gray-800"
                              onClick={handlePostActivity}
                              disabled={!activityInput.trim()}
                            >
                              Post Activity <Send className="h-3 w-3 ml-1.5" />
                            </Button>
                          </div>
                        </div>
                      </div>

                      <div className="space-y-4 pl-6 border-l-2 border-gray-200 ml-4 relative pb-6">
                        {selectedDonor.activities.map((activity) => (
                          <div key={activity.id} className="relative pl-8 group">
                            <div className={`absolute -left-[25px] top-0 h-8 w-8 rounded-full border-4 border-white flex items-center justify-center shadow-sm ${getActivityBg(activity.type)}`}>
                              {getActivityIcon(activity.type)}
                            </div>
                            
                            <div className="bg-white p-4 rounded-xl border border-gray-200 hover:shadow-sm transition-shadow">
                              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                <div className="space-y-1">
                                  <div className="flex items-center gap-2">
                                    <span className="text-sm font-semibold text-gray-900">{activity.title}</span>
                                    {activity.amount && (
                                      <Badge className="bg-emerald-50 text-emerald-700 border-emerald-200 font-semibold px-2 h-5">
                                        {formatCurrency(activity.amount)}
                                      </Badge>
                                    )}
                                  </div>
                                  {activity.description && (
                                    <p className="text-sm text-gray-600 leading-relaxed">{activity.description}</p>
                                  )}
                                </div>
                                <span className="text-xs text-gray-400 whitespace-nowrap">
                                  {format(new Date(activity.date), 'MMM d, h:mm a')}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </TabsContent>

                    <TabsContent value="contact-info" className="mt-0">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <Card className="shadow-none border border-gray-200 bg-white">
                          <CardHeader className="pb-3 border-b border-gray-100">
                            <CardTitle className="text-sm font-semibold text-gray-900">Contact Methods</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4 space-y-4">
                            <div className="flex items-center justify-between group">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center">
                                  <Mail className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Email</p>
                                  <p className="text-sm font-medium text-gray-900">{selectedDonor.email}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-gray-400 hover:text-blue-600 hover:bg-blue-50" 
                                onClick={() => handleCopy(selectedDonor.email)}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                            <div className="flex items-center justify-between group">
                              <div className="flex items-center gap-3">
                                <div className="h-9 w-9 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                  <Phone className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-xs text-gray-500">Phone</p>
                                  <p className="text-sm font-medium text-gray-900">{selectedDonor.phone}</p>
                                </div>
                              </div>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                className="h-8 w-8 text-gray-400 hover:text-emerald-600 hover:bg-emerald-50" 
                                onClick={() => handleCopy(selectedDonor.phone)}
                              >
                                <Copy className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="shadow-none border border-gray-200 bg-white">
                          <CardHeader className="pb-3 border-b border-gray-100">
                            <CardTitle className="text-sm font-semibold text-gray-900">Address</CardTitle>
                          </CardHeader>
                          <CardContent className="pt-4">
                            <div className="flex items-start justify-between">
                              <div className="flex items-start gap-3">
                                <div className="h-9 w-9 rounded-lg bg-gray-100 text-gray-600 flex items-center justify-center shrink-0">
                                  <MapPin className="h-4 w-4" />
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-gray-900">{selectedDonor.address.street}</p>
                                  <p className="text-sm text-gray-600">
                                    {selectedDonor.address.city}, {selectedDonor.address.state} {selectedDonor.address.zip}
                                  </p>
                                  <p className="text-xs text-gray-400 mt-1 uppercase font-medium">{selectedDonor.address.country}</p>
                                </div>
                              </div>
                              <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-900 hover:bg-gray-100">
                                <ExternalLink className="h-3.5 w-3.5" />
                              </Button>
                            </div>
                          </CardContent>
                        </Card>
                      </div>
                    </TabsContent>

                    <TabsContent value="giving-history" className="mt-0">
                      <Card className="shadow-none border border-gray-200 bg-white overflow-hidden">
                        <div className="p-0">
                          <table className="w-full text-sm text-left">
                            <thead className="text-xs text-gray-500 uppercase bg-gray-50 border-b border-gray-200">
                              <tr>
                                <th className="px-6 py-3 font-medium">Date</th>
                                <th className="px-6 py-3 font-medium">Type</th>
                                <th className="px-6 py-3 font-medium">Amount</th>
                                <th className="px-6 py-3 font-medium">Status</th>
                                <th className="px-6 py-3 font-medium text-right">Receipt</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-100">
                              {selectedDonor.activities.filter(a => a.type === 'gift').map((gift) => (
                                <tr key={gift.id} className="hover:bg-gray-50 transition-colors">
                                  <td className="px-6 py-4 font-medium text-gray-900">
                                    {format(new Date(gift.date), 'MMM d, yyyy')}
                                  </td>
                                  <td className="px-6 py-4 text-gray-500">
                                    Online Gift
                                  </td>
                                  <td className="px-6 py-4 font-semibold text-gray-900">
                                    {formatCurrency(gift.amount || 0)}
                                  </td>
                                  <td className="px-6 py-4">
                                    <Badge variant="outline" className="bg-emerald-50 text-emerald-700 border-emerald-200 font-medium">
                                      {gift.status}
                                    </Badge>
                                  </td>
                                  <td className="px-6 py-4 text-right">
                                    <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-gray-100 rounded-full">
                                      <Download className="h-4 w-4 text-gray-400 hover:text-gray-900" />
                                    </Button>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                          {selectedDonor.activities.filter(a => a.type === 'gift').length === 0 && (
                            <div className="p-12 text-center text-gray-400">
                              <div className="h-12 w-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                <Heart className="h-6 w-6 text-gray-300" />
                              </div>
                              <p>No giving history available.</p>
                            </div>
                          )}
                        </div>
                      </Card>
                    </TabsContent>
                  </div>
                </Tabs>
              </div>
            </ScrollArea>
          </>
        ) : (
          <div className="flex flex-col items-center justify-center h-full text-center p-8 bg-white">
            <div className="w-20 h-20 bg-gray-100 border border-gray-200 rounded-full flex items-center justify-center mb-6">
              <User className="h-8 w-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Select a Partner</h3>
            <p className="text-gray-500 max-w-sm mx-auto mb-6 leading-relaxed">
              Select a donor from the list to view their full profile, interaction timeline, and giving history.
            </p>
            <Button className="bg-gray-900 text-white hover:bg-gray-800 px-6 h-11">
              <Plus className="mr-2 h-4 w-4" /> Add New Partner
            </Button>
          </div>
        )}
      </div>

      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white">
          <DialogHeader>
            <DialogTitle className="text-gray-900">Add Note</DialogTitle>
            <DialogDescription className="text-gray-500">
              Add a private note to {selectedDonor?.name}&apos;s timeline.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              value={noteInput} 
              onChange={(e) => setNoteInput(e.target.value)} 
              placeholder="Type your note here..." 
              className="min-h-[150px] resize-none border-gray-200 bg-white focus:bg-white"
            />
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsNoteDialogOpen(false)} className="border-gray-200 bg-white hover:bg-gray-50 text-gray-700">
              Cancel
            </Button>
            <Button onClick={handleAddNote} className="bg-gray-900 text-white hover:bg-gray-800">
              Save Note
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
