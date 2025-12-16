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
  Search,
  Mail,
  Phone,
  MapPin,
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

const STATUS_FILTERS: Array<Donor['status'] | 'All'> = ['All', 'Active', 'New', 'Lapsed', 'At Risk']

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

const formatRelativeDate = (value: string) => {
  const date = new Date(value)
  if (Number.isNaN(date.getTime())) return '—'
  return formatDistanceToNow(date, { addSuffix: true })
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
  const [donors, setDonors] = React.useState<Donor[]>(DONORS_DATA)
  const [selectedDonorId, setSelectedDonorId] = React.useState<string | null>(null)
  const [searchTerm, setSearchTerm] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<Donor['status'] | 'All'>('All')
  const [activeTab, setActiveTab] = React.useState('timeline')
  const [noteInput, setNoteInput] = React.useState('')
  const [isNoteDialogOpen, setIsNoteDialogOpen] = React.useState(false)
  const [activityInput, setActivityInput] = React.useState('')
  const [copiedField, setCopiedField] = React.useState<string | null>(null)
  const copyTimeoutRef = React.useRef<number | null>(null)

  const filteredDonors = React.useMemo(() => {
    const term = searchTerm.toLowerCase().trim()
    return donors.filter(donor => {
      const matchesSearch =
        donor.name.toLowerCase().includes(term) ||
        donor.email.toLowerCase().includes(term) ||
        donor.location.toLowerCase().includes(term)
      const matchesStatus = statusFilter === 'All' || donor.status === statusFilter
      return matchesSearch && matchesStatus
    })
  }, [donors, searchTerm, statusFilter])

  const selectedDonor = React.useMemo(
    () => donors.find(d => d.id === selectedDonorId),
    [donors, selectedDonorId]
  )

  const giftActivities = React.useMemo(
    () => selectedDonor?.activities.filter(a => a.type === 'gift') ?? [],
    [selectedDonor]
  )

  const updateDonorActivities = React.useCallback((donorId: string, activity: Activity) => {
    setDonors(prev =>
      prev.map(donor =>
        donor.id === donorId
          ? {
              ...donor,
              activities: [activity, ...donor.activities].sort(
                (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
              ),
            }
          : donor
      )
    )
  }, [])

  const handleAddNote = React.useCallback(() => {
    if (!selectedDonorId || !noteInput.trim()) return
    updateDonorActivities(selectedDonorId, {
      id: `act-${selectedDonorId}-${Date.now()}`,
      type: 'note',
      date: new Date().toISOString(),
      title: 'Note added',
      description: noteInput.trim(),
    })
    setNoteInput('')
    setIsNoteDialogOpen(false)
    setActiveTab('timeline')
  }, [noteInput, selectedDonorId, updateDonorActivities])

  const handlePostActivity = React.useCallback(() => {
    if (!selectedDonorId || !activityInput.trim()) return
    updateDonorActivities(selectedDonorId, {
      id: `act-${selectedDonorId}-${Date.now()}`,
      type: 'note',
      date: new Date().toISOString(),
      title: 'New update',
      description: activityInput.trim(),
    })
    setActivityInput('')
  }, [activityInput, selectedDonorId, updateDonorActivities])

  const handleCopy = React.useCallback(
    async (text: string, field: string) => {
      if (!text) return
      try {
        if (navigator?.clipboard?.writeText) {
          await navigator.clipboard.writeText(text)
        } else {
          throw new Error('Clipboard API unavailable')
        }
        setCopiedField(field)
        if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current)
        copyTimeoutRef.current = window.setTimeout(() => setCopiedField(null), 2000)
      } catch (error) {
        console.error('Copy failed', error)
        setCopiedField(null)
      }
    },
    []
  )

  React.useEffect(() => {
    return () => {
      if (copyTimeoutRef.current) window.clearTimeout(copyTimeoutRef.current)
    }
  }, [])

  React.useEffect(() => {
    setActiveTab('timeline')
    setActivityInput('')
    setNoteInput('')
    setIsNoteDialogOpen(false)
  }, [selectedDonorId])

  return (
    <div className="grid min-h-[calc(100vh-3.5rem)] grid-cols-1 bg-zinc-50 lg:grid-cols-[360px_1fr]">
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.3 }}
        className={`flex h-full flex-col border-r border-zinc-200 bg-white ${selectedDonorId ? 'hidden lg:flex' : 'flex'}`}
      >
        <div className="sticky top-0 z-20 space-y-3 border-b border-zinc-100 bg-white p-5">
          <div className="flex items-center justify-between gap-3">
            <div>
              <h2 className="text-lg font-semibold text-zinc-900">Partners</h2>
              <p className="text-sm text-zinc-500">{filteredDonors.length} contacts</p>
            </div>
            <RippleButton size="icon" className="h-8 w-8 rounded-md bg-zinc-900 text-white hover:bg-zinc-800" aria-label="Add partner">
              <Plus className="h-3.5 w-3.5" />
            </RippleButton>
          </div>

          <div className="space-y-3">
            <div className="relative group">
              <Search className="absolute left-3 top-2 h-4 w-4 text-zinc-400 transition-colors group-focus-within:text-zinc-600" />
              <Input 
                placeholder="Search partners..." 
                className="h-9 rounded-lg border-zinc-300 bg-white pl-9 text-sm text-zinc-900 placeholder:text-zinc-500 transition-all focus:border-zinc-500 focus:ring-1 focus:ring-zinc-300" 
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex gap-2 overflow-x-auto pb-1">
              {STATUS_FILTERS.map((status) => (
                <Button
                  key={status}
                  variant={statusFilter === status ? 'default' : 'secondary'}
                  size="sm"
                  className={`h-8 rounded-full border px-3 text-xs font-medium ${statusFilter === status ? 'border-zinc-900 bg-zinc-900 text-white hover:bg-zinc-800' : 'border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300 hover:text-zinc-900'}`}
                  onClick={() => setStatusFilter(status)}
                  aria-pressed={statusFilter === status}
                >
                  {status}
                </Button>
              ))}
            </div>
          </div>
        </div>

        <ScrollArea className="flex-1">
          <motion.div 
            className="p-3"
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
          >
            {filteredDonors.length === 0 ? (
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex h-64 flex-col items-center justify-center text-zinc-400"
              >
                <Search className="mb-2 h-8 w-8 opacity-20" />
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
                    className={`relative mb-2 flex cursor-pointer items-center gap-3 overflow-hidden rounded-xl border p-3 transition-colors ${
                      selectedDonorId === donor.id 
                        ? 'border-blue-200 bg-blue-50/80' 
                        : 'border-transparent bg-white hover:border-zinc-200'
                    }`}
                  >
                    {selectedDonorId === donor.id && (
                      <motion.div 
                        layoutId="selection-indicator"
                        className="absolute left-0 top-0 bottom-0 w-1 rounded-r bg-blue-500"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.2 }}
                      />
                    )}
                    
                    <div className="relative shrink-0">
                      <Avatar className={`h-11 w-11 border-2 transition-all ${selectedDonorId === donor.id ? 'border-blue-200' : 'border-white shadow-sm'}`}>
                        <AvatarImage src={donor.avatar} />
                        <AvatarFallback className="bg-zinc-100 text-sm font-medium text-zinc-600">
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
                    
                    <div className="min-w-0 flex-1">
                      <div className="mb-0.5 flex items-center justify-between">
                        <span className={`truncate text-sm font-medium ${selectedDonorId === donor.id ? 'text-blue-900' : 'text-zinc-900'}`}>
                          {donor.name}
                        </span>
                        <span className="ml-2 whitespace-nowrap text-[11px] text-zinc-400">
                          {formatRelativeDate(donor.lastGiftDate)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="truncate text-xs text-zinc-500">
                          {donor.location}
                        </span>
                        <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-xs font-semibold text-zinc-700">
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
          className={`flex h-full flex-col overflow-hidden bg-white ${selectedDonorId ? 'flex' : 'hidden lg:flex'}`}
        >
          {selectedDonor ? (
            <>
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="sticky top-0 z-20 flex h-16 items-center justify-between border-b border-zinc-100 bg-white px-4 md:px-6"
              >
                <div className="flex items-center gap-3">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button 
                      variant="ghost" 
                      size="icon" 
                      className="-ml-2 h-8 w-8 text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 lg:hidden"
                      onClick={() => setSelectedDonorId(null)}
                    >
                      <ArrowLeft className="h-4 w-4" />
                    </Button>
                  </motion.div>
                  <div className="flex items-center gap-2">
                    <h2 className="text-lg font-semibold text-zinc-900">{selectedDonor.name}</h2>
                    {getStatusBadge(selectedDonor.status)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center gap-1.5 justify-end">
                  <RippleButton 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-2.5 text-xs font-medium gap-1.5 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                    onClick={() => setIsNoteDialogOpen(true)}
                  >
                    <Pencil className="h-3 w-3" /> Note
                  </RippleButton>
                  <RippleButton 
                    variant="outline" 
                    size="sm" 
                    className="h-8 px-2.5 text-xs font-medium gap-1.5 border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50"
                  >
                    <Phone className="h-3 w-3" /> Call
                  </RippleButton>
                  <RippleButton 
                    size="sm" 
                    className="h-8 px-2.5 text-xs font-medium gap-1.5 bg-zinc-900 text-white hover:bg-zinc-800"
                  >
                    <Mail className="h-3 w-3" /> Email
                  </RippleButton>
                </div>
              </motion.div>

              <ScrollArea className="flex-1">
                <div className="mx-auto flex w-full max-w-5xl flex-col gap-6 p-4 pb-10 md:gap-8 md:p-6">
                  <motion.div 
                    variants={fadeInUp}
                    initial="hidden"
                    animate="visible"
                    className="flex flex-col gap-6 lg:flex-row lg:items-start"
                  >
                    <div className="flex items-start gap-4">
                      <motion.div
                        initial={{ scale: 0.8, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                      >
                        <Avatar className="h-20 w-20 rounded-2xl border-4 border-white shadow-lg">
                          <AvatarImage src={selectedDonor.avatar} />
                          <AvatarFallback className="rounded-2xl bg-zinc-100 text-xl font-semibold text-zinc-600">
                            {selectedDonor.initials}
                          </AvatarFallback>
                        </Avatar>
                      </motion.div>
                      <div className="space-y-1">
                        <h1 className="text-2xl font-semibold text-zinc-900">{selectedDonor.name}</h1>
                        <div className="mt-1 flex items-center gap-1.5 text-sm text-zinc-500">
                          <MapPin className="h-3.5 w-3.5" /> {selectedDonor.location}
                        </div>
                        <motion.div 
                          className="mt-3 flex flex-wrap gap-2"
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
                              className="rounded-lg border border-zinc-200 bg-zinc-100 px-2.5 py-1 text-xs font-medium text-zinc-600"
                            >
                              {tag}
                            </motion.span>
                          ))}
                        </motion.div>
                      </div>
                    </div>

                    <motion.div 
                      className="grid w-full grid-cols-2 gap-3 sm:grid-cols-2 md:grid-cols-4 lg:gap-4"
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
                          className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md"
                        >
                          <p className="mb-1 text-[10px] font-semibold uppercase tracking-wider text-zinc-400">{stat.label}</p>
                          <p className={`font-semibold text-zinc-900 ${stat.large ? 'text-xl' : 'text-sm'}`}>{stat.value}</p>
                        </motion.div>
                      ))}
                    </motion.div>
                  </motion.div>

                  <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
                    <div className="border-b border-zinc-200">
                      <div className="-mx-1 overflow-x-auto px-1">
                        <TabsList className="flex h-auto gap-6 bg-transparent p-0">
                          {['Timeline', 'Contact Info', 'Giving History'].map(tab => (
                            <TabsTrigger 
                              key={tab} 
                              value={tab.toLowerCase().replace(' ', '-')}
                              className="relative whitespace-nowrap border-b-2 border-transparent bg-transparent px-0 py-2 text-xs font-medium text-zinc-500 transition-colors data-[state=active]:border-zinc-900 data-[state=active]:text-zinc-900 data-[state=active]:shadow-none hover:text-zinc-700"
                            >
                              {tab}
                            </TabsTrigger>
                          ))}
                        </TabsList>
                      </div>
                    </div>

                    <div className="pt-6">
                      <TabsContent value="timeline" className="mt-0 space-y-6">
                        <motion.div 
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.3 }}
                          className="flex flex-col gap-3 rounded-xl border border-zinc-200 bg-white p-4 shadow-sm sm:flex-row sm:gap-4"
                        >
                          <Avatar className="hidden h-9 w-9 sm:block">
                            <AvatarFallback className="bg-zinc-900 text-xs font-medium text-white">ME</AvatarFallback>
                          </Avatar>
                          <div className="flex-1 space-y-3">
                            <Textarea 
                              placeholder="Log a call, meeting notes, or task..." 
                              className="min-h-[80px] resize-none border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-500 transition-all focus:border-zinc-500 focus:ring-1 focus:ring-zinc-300"
                              value={activityInput}
                              onChange={(e) => setActivityInput(e.target.value)}
                            />
                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                              <div className="flex gap-1">
                                <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-[11px] text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900">
                                  <Phone className="h-3 w-3" /> Log Call
                                </Button>
                                <Button variant="ghost" size="sm" className="h-7 gap-1 px-2 text-[11px] text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900">
                                  <Check className="h-3 w-3" /> Task
                                </Button>
                              </div>
                              <RippleButton 
                                size="sm" 
                                className="h-8 gap-1.5 px-2.5 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800"
                                onClick={handlePostActivity}
                                disabled={!activityInput.trim()}
                              >
                                Post <Send className="h-3 w-3" />
                              </RippleButton>
                            </div>
                          </div>
                        </motion.div>

                        <motion.div 
                          className="relative ml-2 border-l-2 border-zinc-200 pl-4 sm:ml-4 sm:pl-6"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          {selectedDonor.activities.map((activity, index) => (
                            <motion.div 
                              key={activity.id} 
                              custom={index}
                              variants={activityVariants}
                              className="relative pb-6 pl-6 last:pb-0 sm:pl-8"
                            >
                              <motion.div 
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                transition={{ delay: 0.2 + index * 0.1, type: 'spring', stiffness: 400 }}
                                className={`absolute -left-[18px] top-0 flex h-8 w-8 items-center justify-center rounded-full border-4 border-white shadow-md sm:-left-[25px] ${getActivityBg(activity.type)}`}
                              >
                                {getActivityIcon(activity.type)}
                              </motion.div>
                              
                              <motion.div 
                                whileHover={{ scale: 1.01, y: -1 }}
                                className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm transition-all hover:shadow-md"
                              >
                                <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                                  <div className="space-y-1">
                                    <div className="flex flex-wrap items-center gap-2">
                                      <span className="text-sm font-semibold text-zinc-900">{activity.title}</span>
                                      {activity.amount && (
                                        <Badge className={`h-5 px-2 font-semibold ${activity.status === 'Failed' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                                          {formatCurrency(activity.amount)}
                                        </Badge>
                                      )}
                                    </div>
                                    {activity.description && (
                                      <p className="break-words text-sm leading-relaxed text-zinc-600">{activity.description}</p>
                                    )}
                                  </div>
                                  <span className="whitespace-nowrap text-[11px] font-medium text-zinc-400">
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
                          className="grid grid-cols-1 gap-4 md:grid-cols-2"
                          variants={staggerContainer}
                          initial="hidden"
                          animate="visible"
                        >
                          <motion.div variants={fadeInUp}>
                            <Card className="border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                              <CardHeader className="border-b border-zinc-100 pb-3">
                                <CardTitle className="text-sm font-semibold text-zinc-900">Contact Methods</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4 space-y-4">
                                <motion.div 
                                  whileHover={{ x: 2 }}
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-blue-600">
                                      <Mail className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">Email</p>
                                      <p className="text-sm font-medium text-zinc-900">{selectedDonor.email}</p>
                                    </div>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-zinc-500 hover:bg-blue-50 hover:text-blue-600" 
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
                                  className="flex items-center justify-between"
                                >
                                  <div className="flex items-center gap-3">
                                    <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600">
                                      <Phone className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-[11px] font-medium uppercase tracking-wider text-zinc-400">Phone</p>
                                      <p className="text-sm font-medium text-zinc-900">{selectedDonor.phone}</p>
                                    </div>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button 
                                      variant="ghost" 
                                      size="icon" 
                                      className="h-8 w-8 text-zinc-500 hover:bg-emerald-50 hover:text-emerald-600" 
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
                            <Card className="border border-zinc-200 bg-white shadow-sm transition-shadow hover:shadow-md">
                              <CardHeader className="border-b border-zinc-100 pb-3">
                                <CardTitle className="text-sm font-semibold text-zinc-900">Address</CardTitle>
                              </CardHeader>
                              <CardContent className="pt-4">
                                <motion.div 
                                  whileHover={{ x: 2 }}
                                  className="flex items-start justify-between"
                                >
                                  <div className="flex items-start gap-3">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-zinc-100 text-zinc-600">
                                      <MapPin className="h-4 w-4" />
                                    </div>
                                    <div>
                                      <p className="text-sm font-medium text-zinc-900">{selectedDonor.address.street}</p>
                                      <p className="text-sm text-zinc-600">
                                        {selectedDonor.address.city}, {selectedDonor.address.state} {selectedDonor.address.zip}
                                      </p>
                                      <p className="mt-1 text-[11px] font-semibold uppercase tracking-wider text-zinc-400">{selectedDonor.address.country}</p>
                                    </div>
                                  </div>
                                  <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 text-zinc-500 hover:bg-zinc-100 hover:text-zinc-900">
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
                        className="space-y-3"
                      >
                        {giftActivities.length > 0 ? (
                          <>
                            <div className="md:hidden space-y-3">
                              {giftActivities.map((gift) => (
                                <div key={gift.id} className="rounded-xl border border-zinc-200 bg-white p-4 shadow-sm">
                                  <div className="flex items-start justify-between gap-4">
                                    <div className="space-y-1">
                                      <p className="text-sm font-semibold text-zinc-900">{format(new Date(gift.date), 'MMM d, yyyy')}</p>
                                      <p className="text-xs text-zinc-500">Online Gift</p>
                                    </div>
                                    <div className="text-right space-y-1">
                                      <p className="text-base font-semibold text-zinc-900">{formatCurrency(gift.amount || 0)}</p>
                                      <Badge variant="outline" className={`font-medium ${gift.status === 'Failed' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                                        {gift.status}
                                      </Badge>
                                    </div>
                                  </div>
                                  <div className="mt-3 flex items-center justify-between text-xs text-zinc-500">
                                    <span>{format(new Date(gift.date), 'h:mm a')}</span>
                                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full p-0 hover:bg-zinc-100">
                                      <Download className="h-4 w-4 text-zinc-500 hover:text-zinc-900" />
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </div>

                            <Card className="hidden overflow-hidden border border-zinc-200 bg-white shadow-sm md:block">
                              <div className="overflow-x-auto">
                                <table className="min-w-[720px] w-full text-left text-sm">
                                  <thead className="border-b border-zinc-200 bg-zinc-50 text-[11px] uppercase text-zinc-500">
                                    <tr>
                                      <th className="px-6 py-3.5 font-semibold tracking-wider">Date</th>
                                      <th className="px-6 py-3.5 font-semibold tracking-wider">Type</th>
                                      <th className="px-6 py-3.5 font-semibold tracking-wider">Amount</th>
                                      <th className="px-6 py-3.5 font-semibold tracking-wider">Status</th>
                                      <th className="px-6 py-3.5 text-right font-semibold tracking-wider">Receipt</th>
                                    </tr>
                                  </thead>
                                  <tbody className="divide-y divide-zinc-100">
                                    {giftActivities.map((gift, index) => (
                                      <motion.tr 
                                        key={gift.id} 
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="transition-colors hover:bg-zinc-50/50"
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
                                          <Badge variant="outline" className={`font-medium ${gift.status === 'Failed' ? 'border-red-200 bg-red-50 text-red-700' : 'border-emerald-200 bg-emerald-50 text-emerald-700'}`}>
                                            {gift.status}
                                          </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                          <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                                            <Button variant="ghost" size="sm" className="h-8 w-8 rounded-full p-0 hover:bg-zinc-100">
                                              <Download className="h-4 w-4 text-zinc-500 hover:text-zinc-900" />
                                            </Button>
                                          </motion.div>
                                        </td>
                                      </motion.tr>
                                    ))}
                                  </tbody>
                                </table>
                              </div>
                            </Card>
                          </>
                        ) : (
                          <Card className="overflow-hidden border border-zinc-200 bg-white shadow-sm">
                            <motion.div 
                              initial={{ opacity: 0 }}
                              animate={{ opacity: 1 }}
                              className="p-12 text-center text-zinc-400"
                            >
                              <div className="mx-auto mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-zinc-100">
                                <Heart className="h-6 w-6 text-zinc-300" />
                              </div>
                              <p>No giving history available.</p>
                            </motion.div>
                          </Card>
                        )}
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
              className="flex h-full flex-col items-center justify-center bg-zinc-50/30 p-8 text-center"
            >
              <motion.div 
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: 'spring', stiffness: 200 }}
                className="mb-6 flex h-24 w-24 items-center justify-center rounded-2xl border-2 border-zinc-100 bg-white shadow-sm"
              >
                <User className="h-10 w-10 text-zinc-300" />
              </motion.div>
              <motion.h3 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mb-2 text-xl font-semibold text-zinc-900"
              >
                Select a Partner
              </motion.h3>
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mx-auto mb-8 max-w-sm leading-relaxed text-zinc-500"
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
        <DialogContent className="sm:max-w-[500px] border-zinc-200 bg-white">
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
              className="min-h-[120px] resize-none border-zinc-300 bg-white text-sm text-zinc-900 placeholder:text-zinc-500 focus:border-zinc-500 focus:ring-1 focus:ring-zinc-300"
            />
          </div>
          <DialogFooter>
            <RippleButton variant="outline" onClick={() => setIsNoteDialogOpen(false)} className="h-7 px-3 text-xs font-medium border-zinc-300 bg-white text-zinc-700 hover:bg-zinc-50">
              Cancel
            </RippleButton>
            <RippleButton onClick={handleAddNote} disabled={!noteInput.trim()} className="h-7 px-3 text-xs font-medium bg-zinc-900 text-white hover:bg-zinc-800 disabled:opacity-70">
              Save Note
            </RippleButton>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
