'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { RippleButton } from '@/components/ui/ripple-button'
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
  ArrowLeft,
  CheckCircle2,
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
    case 'Lapsed': return 'bg-zinc-400'
    case 'New': return 'bg-blue-500'
    case 'At Risk': return 'bg-amber-500'
    default: return 'bg-zinc-400'
  }
}

const getStatusBadge = (status: Donor['status']) => {
  const styles: Record<Donor['status'], string> = {
    Active: 'bg-emerald-50 text-emerald-700 border-emerald-200',
    Lapsed: 'bg-zinc-100 text-zinc-600 border-zinc-200',
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
    case 'note': return 'bg-zinc-400'
    case 'meeting': return 'bg-emerald-400'
    default: return 'bg-zinc-400'
  }
}

const listItemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.05,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
  exit: { opacity: 0, x: -20 },
}

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }
  },
}

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.1,
    },
  },
}

const statCardVariants = {
  hidden: { opacity: 0, scale: 0.95 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    transition: {
      delay: i * 0.1,
      duration: 0.3,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

const activityVariants = {
  hidden: { opacity: 0, x: -30 },
  visible: (i: number) => ({
    opacity: 1,
    x: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.4,
      ease: [0.25, 0.1, 0.25, 1],
    },
  }),
}

export default function DonorsPage() {
  const [selectedDonorId, setSelectedDonorId] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('All')
  const [activeTab, setActiveTab] = React.useState('timeline')
  const [noteInput, setNoteInput] = React.useState('')
  const [isNoteDialogOpen, setIsNoteDialogOpen] = React.useState(false)
  const [activityInput, setActivityInput] = React.useState('')
  const [copiedField, setCopiedField] = React.useState<string | null>(null)

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

  const handleCopy = (text: string, field: string) => {
    navigator.clipboard.writeText(text)
    setCopiedField(field)
    setTimeout(() => setCopiedField(null), 2000)
  }

  const handlePostActivity = () => {
    console.log(`Posting activity: ${activityInput}`)
    setActivityInput('')
  }

  return (
    <div className="flex h-[calc(100vh-4rem)] bg-zinc-50/50">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex flex-col h-full border-r border-zinc-200 bg-white w-full lg:w-[380px] shrink-0 ${selectedDonorId ? 'hidden lg:flex' : 'flex'}`}
      >
        <div className="p-5 border-b border-zinc-100 space-y-4 shrink-0 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Partners</h2>
              <p className="text-sm text-zinc-500">{filteredDonors.length} contacts</p>
            </div>
            <div className="flex gap-2">
              <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon" className="h-7 w-7 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100">
                      <Filter className="h-3.5 w-3.5" />
                    </Button>
                  </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48 bg-white border-zinc-200">
                  <DropdownMenuLabel className="text-zinc-600">Filter Status</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-zinc-100" />
                  {['All', 'Active', 'New', 'Lapsed', 'At Risk'].map(s => (
                    <DropdownMenuCheckboxItem 
                      key={s} 
                      checked={statusFilter === s}
                      onCheckedChange={() => setStatusFilter(s)}
                      className="text-zinc-700"
                    >
                      {s}
                    </DropdownMenuCheckboxItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
                <RippleButton size="icon" className="h-7 w-7 bg-zinc-900 hover:bg-zinc-800 text-white rounded-md">
                  <Plus className="h-3.5 w-3.5" />
                </RippleButton>
            </div>
          </div>
          <div className="relative group">
            <Search className="absolute left-3 top-2 h-4 w-4 text-zinc-400 group-focus-within:text-zinc-600 transition-colors" />
            <Input 
              placeholder="Search partners..." 
              className="pl-9 bg-white border-zinc-300 focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 h-8 text-sm transition-all placeholder:text-zinc-400" 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>

        <ScrollArea className="flex-1">
          <motion.div 
            className="p-2"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredDonors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center justify-center h-64 text-zinc-400"
              >
                <Search className="h-8 w-8 mb-2 opacity-20" />
                <p className="text-sm">No partners found</p>
              </motion.div>
            ) : (
              <AnimatePresence mode="popLayout">
                {filteredDonors.map((donor, index) => (
                  <motion.div 
                    key={donor.id}
                    custom={index}
                    variants={listItemVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    layout
                    layoutId={`donor-${donor.id}`}
                    onClick={() => setSelectedDonorId(donor.id)}
                    whileHover={{ scale: 1.01, backgroundColor: selectedDonorId === donor.id ? undefined : 'rgb(250 250 250)' }}
                    whileTap={{ scale: 0.99 }}
                    className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-colors border mb-1.5 relative overflow-hidden ${
                      selectedDonorId === donor.id 
                        ? 'bg-blue-50/80 border-blue-200' 
                        : 'bg-white border-transparent hover:border-zinc-200'
                    }`}
                  >
                    {selectedDonorId === donor.id && (
                      <motion.div 
                        layoutId="selection-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-r"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    <div className="relative shrink-0">
                      <Avatar className={`h-11 w-11 border-2 transition-all ${selectedDonorId === donor.id ? 'border-blue-200' : 'border-white shadow-sm'}`}>
                        <AvatarImage src={donor.avatar} />
                        <AvatarFallback className="bg-zinc-100 text-zinc-600 font-medium text-sm">
                          {donor.initials}
                        </AvatarFallback>
                      </Avatar>
                      <motion.div 
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.2, type: 'spring', stiffness: 500 }}
                        className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-white ${getStatusColor(donor.status)}`} 
                      />
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between mb-0.5">
                        <span className={`font-medium text-sm truncate ${selectedDonorId === donor.id ? 'text-blue-900' : 'text-zinc-900'}`}>
                          {donor.name}
                        </span>
                        <span className="text-[11px] text-zinc-400 whitespace-nowrap ml-2">
                          {formatDistanceToNow(new Date(donor.lastGiftDate), { addSuffix: true })}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-zinc-500 truncate">
                          {donor.location}
                        </span>
                        <span className="text-xs font-semibold text-zinc-700 bg-zinc-100 px-1.5 py-0.5 rounded">
                          {formatCurrency(donor.lastGiftAmount)}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            )}
          </motion.div>
        </ScrollArea>
      </motion.div>

      <AnimatePresence mode="wait">
        <motion.div 
          key={selectedDonorId || 'empty'}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className={`flex-1 flex flex-col bg-white h-full overflow-hidden ${selectedDonorId ? 'flex' : 'hidden lg:flex'}`}
        >
          {selectedDonor ? (
            <>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="shrink-0 h-16 border-b border-zinc-100 px-6 flex items-center justify-between bg-white"
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="lg:hidden h-7 w-7 -ml-2 text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100"
                      onClick={() => setSelectedDonorId(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <h2 className="text-lg font-semibold text-zinc-900">{selectedDonor.name}</h2>
                  {getStatusBadge(selectedDonor.status)}
                </div>
                  <div className="flex items-center gap-1.5">
                    <RippleButton 
                      variant="outline" 
                      size="sm" 
                      className="h-7 px-2.5 text-xs font-medium gap-1.5 border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600"
                      onClick={() => setIsNoteDialogOpen(true)}
                    >
                      <Pencil className="h-3 w-3" /> Note
                    </RippleButton>
                    <RippleButton 
                      variant="outline" 
                      size="sm" 
                      className="h-7 px-2.5 text-xs font-medium gap-1.5 border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600"
                    >
                      <Phone className="h-3 w-3" /> Call
                    </RippleButton>
                    <RippleButton 
                      size="sm" 
                      className="h-7 px-2.5 text-xs font-medium gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800"
                    >
                      <Mail className="h-3 w-3" /> Email
                    </RippleButton>
                  </div>
              </motion.div>

              <ScrollArea className="flex-1">
                <div className="max-w-5xl mx-auto p-6 space-y-8">
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col md:flex-row gap-8 items-start"
                  >
                    <div className="flex items-center gap-5">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <Avatar className="h-20 w-20 border-4 border-white shadow-lg rounded-2xl">
                          <AvatarImage src={selectedDonor.avatar} />
                          <AvatarFallback className="text-xl font-semibold bg-zinc-100 text-zinc-600 rounded-2xl">
                            {selectedDonor.initials}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div>
                        <h1 className="text-2xl font-semibold text-zinc-900">{selectedDonor.name}</h1>
                        <div className="flex items-center gap-1.5 text-sm text-zinc-500 mt-1">
                          <MapPin className="h-3.5 w-3.5" /> {selectedDonor.location}
                        </div>
                        <motion.div 
                          className="flex flex-wrap gap-2 mt-3"
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          transition={{ delay: 0.2 }}
                        >
                          {selectedDonor.tags.map((tag, i) => (
                            <motion.span 
                              key={tag} 
                              initial={{ opacity: 0, scale: 0.8 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.3 + i * 0.1 }}
                              className="px-2.5 py-1 bg-zinc-100 border border-zinc-200 rounded-lg text-xs font-medium text-zinc-600"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    <motion.div 
                      className="flex-1 w-full grid grid-cols-2 md:grid-cols-4 gap-3"
                      variants={staggerContainer}
                      initial="hidden"
                      animate="visible"
                    >
                      {[
                        { label: 'Lifetime', value: formatCurrency(selectedDonor.totalGiven), large: true },
                        { label: 'Last Gift', value: formatCurrency(selectedDonor.lastGiftAmount), large: true },
                        { label: 'Frequency', value: selectedDonor.frequency },
                        { label: 'Partner Since', value: new Date(selectedDonor.joinedDate).getFullYear().toString() },
                      ].map((stat, i) => (
                        <motion.div
                          key={stat.label}
                          custom={i}
                          variants={statCardVariants}
                          whileHover={{ scale: 1.02, y: -2 }}
                          className="bg-white border border-zinc-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-shadow"
                        >
                          <p className="text-[10px] uppercase tracking-wider font-semibold text-zinc-400 mb-1">{stat.label}</p>
                          <p className={`font-semibold text-zinc-900 ${stat.large ? 'text-xl' : 'text-sm'}`}>{stat.value}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-zinc-200">
                      <TabsList className="bg-transparent h-auto p-0 gap-8">
                        {['Timeline', 'Contact Info', 'Giving History'].map(tab => (
                          <TabsTrigger 
                            key={tab} 
                            value={tab.toLowerCase().replace(' ', '-')}
                            className="relative bg-transparent border-b-2 border-transparent data-[state=active]:border-zinc-800 data-[state=active]:text-zinc-800 data-[state=active]:shadow-none rounded-none px-0 py-2 text-xs font-medium text-zinc-400 hover:text-zinc-600 transition-colors"
                          >
                            {tab}
                          </TabsTrigger>
                        ))}
                      </TabsList>
                    </div>

                    <div className="pt-6">
                      <TabsContent value="timeline" className="space-y-6 mt-0">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm flex gap-4"
                        >
                          <Avatar className="h-9 w-9 hidden md:block">
                            <AvatarFallback className="bg-zinc-900 text-white text-xs font-medium">ME</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Textarea 
                              placeholder="Log a call, meeting notes, or task..." 
                              className="min-h-[70px] border-zinc-300 bg-white focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 resize-none transition-all text-sm placeholder:text-zinc-400"
                              value={activityInput}
                              onChange={(e) => setActivityInput(e.target.value)}
                            />
                            <div className="flex justify-between items-center">
                              <div className="flex gap-0.5">
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px] text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 gap-1">
                                  <Phone className="h-3 w-3" /> Log Call
                                </Button>
                                <Button variant="ghost" size="sm" className="h-6 px-2 text-[11px] text-zinc-500 hover:text-zinc-800 hover:bg-zinc-100 gap-1">
                                  <Check className="h-3 w-3" /> Task
                                </Button>
                              </div>
                                <RippleButton 
                                  size="sm" 
                                  className="h-7 px-2.5 text-xs font-medium gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800"
                                  onClick={handlePostActivity}
                                  disabled={!activityInput.trim()}
                                >
                                  Post <Send className="h-3 w-3" />
                                </RippleButton>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="space-y-0 pl-6 border-l-2 border-zinc-200 ml-4 relative"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {selectedDonor.activities.map((activity, index) => (
                            <motion.div 
                              key={activity.id} 
                              custom={index}
                              variants={activityVariants}
                              className="relative pl-8 pb-6 last:pb-0"
                            >
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 400 }}
                                className={`absolute -left-[25px] top-0 h-8 w-8 rounded-full border-4 border-white flex items-center justify-center shadow-md ${getActivityBg(activity.type)}`}
                              >
                                {getActivityIcon(activity.type)}
                              </motion.div>
                              
                              <motion.div 
                                whileHover={{ scale: 1.01, y: -1 }}
                                className="bg-white p-4 rounded-xl border border-zinc-200 shadow-sm hover:shadow-md transition-all"
                              >
                                <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2">
                                  <div className="space-y-1">
                                    <div className="flex items-center gap-2">
                                      <span className="text-sm font-semibold text-zinc-900">{activity.title}</span>
                                      {activity.amount && (
                                        <Badge className={`font-semibold px-2 h-5 ${activity.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                          {formatCurrency(activity.amount)}
                                        </Badge>
                                      )}
                                    </div>
                                    {activity.description && (
                                      <p className="text-sm text-zinc-600 leading-relaxed">{activity.description}</p>
                                    )}
                                  </div>
                                  <span className="text-[11px] text-zinc-400 whitespace-nowrap font-medium">
                                    {format(new Date(activity.date), 'MMM d, h:mm a')}
                                  </span>
                                </div>
                              </motion.div>
                            </motion.div>
                          ))}
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="contact-info" className="mt-0">
                        <motion.div 
                          className="grid grid-cols-1 md:grid-cols-2 gap-4"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.div variants={fadeInUp}>
                            <Card className="shadow-sm border border-zinc-200 bg-white hover:shadow-md transition-shadow">
                              <CardHeader className="pb-3 border-b border-zinc-100">
                                <CardTitle className="text-sm font-semibold text-zinc-900">Contact Methods</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4 space-y-4">
                                <motion.div 
                                  whileHover={{ x: 2 }}
                                  className="flex items-center justify-between group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                                      <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Email</p>
                                      <p className="text-sm font-medium text-zinc-900">{selectedDonor.email}</p>
                                    </div>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-zinc-400 hover:text-blue-600 hover:bg-blue-50" 
                                      onClick={() => handleCopy(selectedDonor.email, 'email')}
                                    >
                                      {copiedField === 'email' ? (
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                      )}
                                    </Button>
                                  </motion.div>
                                </motion.div>
                                <motion.div 
                                  whileHover={{ x: 2 }}
                                  className="flex items-center justify-between group"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                                      <Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-[11px] uppercase tracking-wider text-zinc-400 font-medium">Phone</p>
                                      <p className="text-sm font-medium text-zinc-900">{selectedDonor.phone}</p>
                                    </div>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-zinc-400 hover:text-emerald-600 hover:bg-emerald-50" 
                                      onClick={() => handleCopy(selectedDonor.phone, 'phone')}
                                    >
                                      {copiedField === 'phone' ? (
                                        <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" />
                                      ) : (
                                        <Copy className="h-3.5 w-3.5" />
                                      )}
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              </CardContent>
                            </Card>
                          </motion.div>

                          <motion.div variants={fadeInUp}>
                            <Card className="shadow-sm border border-zinc-200 bg-white hover:shadow-md transition-shadow">
                              <CardHeader className="pb-3 border-b border-zinc-100">
                                <CardTitle className="text-sm font-semibold text-zinc-900">Address</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <motion.div 
                                  whileHover={{ x: 2 }}
                                  className="flex items-start justify-between"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="h-10 w-10 rounded-xl bg-zinc-100 text-zinc-600 flex items-center justify-center shrink-0">
                                      <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-zinc-900">{selectedDonor.address.street}</p>
                                      <p className="text-sm text-zinc-600">
                                        {selectedDonor.address.city}, {selectedDonor.address.state} {selectedDonor.address.zip}
                                      </p>
                                      <p className="text-[11px] text-zinc-400 mt-1 uppercase font-semibold tracking-wider">{selectedDonor.address.country}</p>
                                    </div>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-400 hover:text-zinc-900 hover:bg-zinc-100">
                                      <ExternalLink className="h-3.5 w-3.5" />
                                    </Button>
                                  </motion.div>
                                </motion.div>
                              </CardContent>
                            </Card>
                          </motion.div>
                        </motion.div>
                      </TabsContent>

                      <TabsContent value="giving-history" className="mt-0">
                        <motion.div
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                        >
                          <Card className="shadow-sm border border-zinc-200 bg-white overflow-hidden">
                            <div className="p-0">
                              <table className="w-full text-sm text-left">
                                <thead className="text-[11px] text-zinc-500 uppercase bg-zinc-50 border-b border-zinc-200">
                                  <tr>
                                    <th className="px-6 py-3.5 font-semibold tracking-wider">Date</th>
                                    <th className="px-6 py-3.5 font-semibold tracking-wider">Type</th>
                                    <th className="px-6 py-3.5 font-semibold tracking-wider">Amount</th>
                                    <th className="px-6 py-3.5 font-semibold tracking-wider">Status</th>
                                    <th className="px-6 py-3.5 font-semibold tracking-wider text-right">Receipt</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-zinc-100">
                                  {selectedDonor.activities.filter(a => a.type === 'gift').map((gift, index) => (
                                    <motion.tr 
                                      key={gift.id} 
                                      initial={{ opacity: 0, y: 10 }}
                                      animate={{ opacity: 1, y: 0 }}
                                      transition={{ delay: index * 0.05 }}
                                      className="hover:bg-zinc-50/50 transition-colors"
                                    >
                                      <td className="px-6 py-4 font-medium text-zinc-900">
                                        {format(new Date(gift.date), 'MMM d, yyyy')}
                                      </td>
                                      <td className="px-6 py-4 text-zinc-500">
                                        Online Gift
                                      </td>
                                      <td className="px-6 py-4 font-semibold text-zinc-900">
                                        {formatCurrency(gift.amount || 0)}
                                      </td>
                                      <td className="px-6 py-4">
                                        <Badge variant="outline" className={`font-medium ${gift.status === 'Failed' ? 'bg-red-50 text-red-700 border-red-200' : 'bg-emerald-50 text-emerald-700 border-emerald-200'}`}>
                                          {gift.status}
                                        </Badge>
                                      </td>
                                      <td className="px-6 py-4 text-right">
                                        <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                          <Button variant="ghost" size="sm" className="h-8 w-8 p-0 hover:bg-zinc-100 rounded-full">
                                            <Download className="h-4 w-4 text-zinc-400 hover:text-zinc-900" />
                                          </Button>
                                        </motion.div>
                                      </td>
                                    </motion.tr>
                                  ))}
                                </tbody>
                              </table>
                              {selectedDonor.activities.filter(a => a.type === 'gift').length === 0 && (
                                <motion.div 
                                  initial={{ opacity: 0 }}
                                  animate={{ opacity: 1 }}
                                  className="p-12 text-center text-zinc-400"
                                >
                                  <div className="h-12 w-12 bg-zinc-100 rounded-full flex items-center justify-center mx-auto mb-3">
                                    <Heart className="h-6 w-6 text-zinc-300" />
                                  </div>
                                  <p>No giving history available.</p>
                                </motion.div>
                              )}
                            </div>
                          </Card>
                        </motion.div>
                      </TabsContent>
                    </div>
                  </Tabs>
                </div>
              </ScrollArea>
            </>
          ) : (
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              className="flex flex-col items-center justify-center h-full text-center p-8 bg-zinc-50/30"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="w-24 h-24 bg-white border-2 border-zinc-100 rounded-2xl flex items-center justify-center mb-6 shadow-sm"
              >
                <User className="h-10 w-10 text-zinc-300" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-xl font-semibold text-zinc-900 mb-2"
              >
                Select a Partner
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-zinc-500 max-w-sm mx-auto mb-8 leading-relaxed"
              >
                Select a donor from the list to view their full profile, interaction timeline, and giving history.
              </motion.p>
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
              >
                <RippleButton className="h-8 px-3 text-xs font-medium gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800">
                  <Plus className="h-3.5 w-3.5" /> Add Partner
                </RippleButton>
              </motion.div>
            </motion.div>
          )}
        </motion.div>
      </AnimatePresence>

      <Dialog open={isNoteDialogOpen} onOpenChange={setIsNoteDialogOpen}>
        <DialogContent className="sm:max-w-[500px] bg-white border-zinc-200">
          <DialogHeader>
            <DialogTitle className="text-zinc-900">Add Note</DialogTitle>
            <DialogDescription className="text-zinc-500">
              Add a private note to {selectedDonor?.name}&apos;s timeline.
            </DialogDescription>
          </DialogHeader>
          <div className="py-4">
            <Textarea 
              value={noteInput} 
              onChange={(e) => setNoteInput(e.target.value)} 
              placeholder="Type your note here..." 
              className="min-h-[120px] resize-none border-zinc-300 bg-white focus:border-zinc-400 focus:ring-1 focus:ring-zinc-200 text-sm placeholder:text-zinc-400"
            />
          </div>
          <DialogFooter>
            <RippleButton variant="outline" onClick={() => setIsNoteDialogOpen(false)} className="h-7 px-3 text-xs font-medium border-zinc-200 bg-white hover:bg-zinc-50 text-zinc-600">
              Cancel
            </RippleButton>
            <RippleButton onClick={handleAddNote} className="h-7 px-3 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800">
              Save Note
            </RippleButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
