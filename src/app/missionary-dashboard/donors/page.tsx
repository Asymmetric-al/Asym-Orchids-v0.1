'use client'

import * as React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
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
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Search,
  Filter,
  MoreHorizontal,
  Mail,
  Phone,
  MapPin,
  Calendar,
  DollarSign,
  RefreshCcw,
  AlertTriangle,
  Sparkles,
  Heart,
  Download,
  X,
  Gift,
  CreditCard,
  TrendingUp,
  Clock,
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
}

const donors: Donor[] = [
  { id: 'd1', firstName: 'Thomas', lastName: 'Smith', email: 'thomas.smith@email.com', phone: '(512) 555-0123', city: 'Austin', state: 'TX', status: 'active', totalGiven: 1800, giftCount: 12, lastGiftDate: '2024-12-10', lastGiftAmount: 150, isRecurring: true, recurringAmount: 150, recurringFrequency: 'monthly', firstGiftDate: '2024-01-15' },
  { id: 'd2', firstName: 'Rebecca', lastName: 'Johnson', email: 'rebecca.j@email.com', phone: '(206) 555-0456', city: 'Seattle', state: 'WA', status: 'active', totalGiven: 900, giftCount: 10, lastGiftDate: '2024-12-05', lastGiftAmount: 75, isRecurring: true, recurringAmount: 75, recurringFrequency: 'monthly', firstGiftDate: '2024-03-01' },
  { id: 'd3', firstName: 'Michael', lastName: 'Williams', email: 'mike.w@email.com', phone: '(303) 555-0789', city: 'Denver', state: 'CO', status: 'active', totalGiven: 2400, giftCount: 6, lastGiftDate: '2024-12-01', lastGiftAmount: 200, isRecurring: true, recurringAmount: 200, recurringFrequency: 'monthly', firstGiftDate: '2024-06-15' },
  { id: 'd4', firstName: 'Jennifer', lastName: 'Davis', email: 'jen.davis@email.com', city: 'Portland', state: 'OR', status: 'at_risk', totalGiven: 500, giftCount: 5, lastGiftDate: '2024-06-15', lastGiftAmount: 100, isRecurring: false, firstGiftDate: '2023-05-20' },
  { id: 'd5', firstName: 'David', lastName: 'Brown', email: 'david.b@email.com', phone: '(312) 555-0234', city: 'Chicago', state: 'IL', status: 'new', totalGiven: 250, giftCount: 1, lastGiftDate: '2024-12-12', lastGiftAmount: 250, isRecurring: false, firstGiftDate: '2024-12-12' },
  { id: 'd6', firstName: 'Emily', lastName: 'Garcia', email: 'emily.g@email.com', phone: '(305) 555-0567', city: 'Miami', state: 'FL', status: 'active', totalGiven: 600, giftCount: 11, lastGiftDate: '2024-12-08', lastGiftAmount: 50, isRecurring: true, recurringAmount: 50, recurringFrequency: 'monthly', firstGiftDate: '2024-02-14' },
  { id: 'd7', firstName: 'Robert', lastName: 'Martinez', email: 'rob.m@email.com', city: 'Phoenix', state: 'AZ', status: 'lapsed', totalGiven: 300, giftCount: 3, lastGiftDate: '2024-03-01', lastGiftAmount: 100, isRecurring: false, firstGiftDate: '2023-09-01' },
  { id: 'd8', firstName: 'Amanda', lastName: 'Lee', email: 'amanda.lee@email.com', phone: '(619) 555-0890', city: 'San Diego', state: 'CA', status: 'new', totalGiven: 100, giftCount: 1, lastGiftDate: '2024-12-14', lastGiftAmount: 100, isRecurring: false, firstGiftDate: '2024-12-14' },
]

const statusConfig = {
  active: { label: 'Active', color: 'bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400' },
  at_risk: { label: 'At Risk', color: 'bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-400' },
  lapsed: { label: 'Lapsed', color: 'bg-rose-100 text-rose-700 dark:bg-rose-950 dark:text-rose-400' },
  new: { label: 'New', color: 'bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-400' },
}

function DonorRow({ donor, onClick }: { donor: Donor; onClick: () => void }) {
  const initials = `${donor.firstName[0]}${donor.lastName[0]}`
  const statusStyle = statusConfig[donor.status]
  
  return (
    <div 
      className="flex items-center gap-4 p-4 border-b last:border-0 hover:bg-muted/50 transition-colors cursor-pointer"
      onClick={onClick}
    >
      <Avatar className="h-10 w-10">
        <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-sm">
          {initials}
        </AvatarFallback>
      </Avatar>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="font-medium truncate">{donor.firstName} {donor.lastName}</p>
          <Badge variant="secondary" className={`text-xs ${statusStyle.color}`}>
            {statusStyle.label}
          </Badge>
          {donor.isRecurring && (
            <Badge variant="outline" className="text-xs">
              <RefreshCcw className="h-3 w-3 mr-1" />
              ${donor.recurringAmount}/mo
            </Badge>
          )}
        </div>
        <p className="text-sm text-muted-foreground truncate">
          {donor.city}, {donor.state} • {donor.email}
        </p>
      </div>

      <div className="hidden md:flex flex-col items-end text-right">
        <p className="font-medium">${donor.totalGiven.toLocaleString()}</p>
        <p className="text-xs text-muted-foreground">{donor.giftCount} gifts</p>
      </div>

      <div className="hidden lg:flex flex-col items-end text-right">
        <p className="text-sm">Last: ${donor.lastGiftAmount}</p>
        <p className="text-xs text-muted-foreground">{new Date(donor.lastGiftDate).toLocaleDateString()}</p>
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
            Send Thank You
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

function DonorDetailModal({ donor, open, onClose }: { donor: Donor | null; open: boolean; onClose: () => void }) {
  if (!donor) return null

  const initials = `${donor.firstName[0]}${donor.lastName[0]}`
  const statusStyle = statusConfig[donor.status]
  
  const giftHistory = [
    { date: '2024-12-10', amount: donor.lastGiftAmount, type: donor.isRecurring ? 'recurring' : 'one_time' },
    { date: '2024-11-10', amount: donor.recurringAmount || 100, type: donor.isRecurring ? 'recurring' : 'one_time' },
    { date: '2024-10-10', amount: donor.recurringAmount || 100, type: donor.isRecurring ? 'recurring' : 'one_time' },
  ]

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <div className="flex items-start gap-4">
            <Avatar className="h-14 w-14">
              <AvatarFallback className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white text-lg">
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <DialogTitle className="text-xl">{donor.firstName} {donor.lastName}</DialogTitle>
                <Badge variant="secondary" className={statusStyle.color}>{statusStyle.label}</Badge>
              </div>
              <DialogDescription className="flex items-center gap-4 mt-1">
                {donor.city && donor.state && (
                  <span className="flex items-center gap-1">
                    <MapPin className="h-3.5 w-3.5" />
                    {donor.city}, {donor.state}
                  </span>
                )}
              </DialogDescription>
            </div>
          </div>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase">Total Given</p>
                <p className="text-xl font-bold">${donor.totalGiven.toLocaleString()}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase">Gifts</p>
                <p className="text-xl font-bold">{donor.giftCount}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase">First Gift</p>
                <p className="text-xl font-bold">{new Date(donor.firstGiftDate).toLocaleDateString('en-US', { month: 'short', year: '2-digit' })}</p>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4">
                <p className="text-xs text-muted-foreground uppercase">Last Gift</p>
                <p className="text-xl font-bold">{new Date(donor.lastGiftDate).toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</p>
              </CardContent>
            </Card>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <Card>
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

            {donor.isRecurring && (
              <Card>
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-medium flex items-center gap-2">
                    <RefreshCcw className="h-4 w-4 text-blue-600" />
                    Recurring Gift
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold">${donor.recurringAmount}</span>
                    <span className="text-muted-foreground">/{donor.recurringFrequency}</span>
                  </div>
                  <div className="flex items-center gap-2 mt-2">
                    <CreditCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">Visa ****4242</span>
                    <Badge variant="outline" className="text-xs">Active</Badge>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-medium">Gift History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {giftHistory.map((gift, i) => (
                  <div key={i} className="flex items-center justify-between p-2 rounded-lg hover:bg-muted/50">
                    <div className="flex items-center gap-3">
                      <div className={`h-8 w-8 rounded-full flex items-center justify-center ${
                        gift.type === 'recurring' ? 'bg-blue-100 dark:bg-blue-950' : 'bg-emerald-100 dark:bg-emerald-950'
                      }`}>
                        {gift.type === 'recurring' ? (
                          <RefreshCcw className="h-4 w-4 text-blue-600" />
                        ) : (
                          <Heart className="h-4 w-4 text-emerald-600" />
                        )}
                      </div>
                      <div>
                        <p className="text-sm font-medium">${gift.amount}</p>
                        <p className="text-xs text-muted-foreground">{gift.type === 'recurring' ? 'Recurring' : 'One-time'}</p>
                      </div>
                    </div>
                    <span className="text-sm text-muted-foreground">{new Date(gift.date).toLocaleDateString()}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="flex gap-2">
            <Button className="flex-1">
              <Mail className="mr-2 h-4 w-4" />
              Send Thank You
            </Button>
            <Button variant="outline">
              <Phone className="mr-2 h-4 w-4" />
              Log Call
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default function DonorsPage() {
  const [search, setSearch] = React.useState('')
  const [statusFilter, setStatusFilter] = React.useState<string>('all')
  const [selectedDonor, setSelectedDonor] = React.useState<Donor | null>(null)

  const filteredDonors = donors.filter(donor => {
    const matchesSearch = search === '' || 
      `${donor.firstName} ${donor.lastName}`.toLowerCase().includes(search.toLowerCase()) ||
      donor.email.toLowerCase().includes(search.toLowerCase())
    const matchesStatus = statusFilter === 'all' || donor.status === statusFilter
    return matchesSearch && matchesStatus
  })

  const statusCounts = {
    all: donors.length,
    active: donors.filter(d => d.status === 'active').length,
    new: donors.filter(d => d.status === 'new').length,
    at_risk: donors.filter(d => d.status === 'at_risk').length,
    lapsed: donors.filter(d => d.status === 'lapsed').length,
  }

  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Donors</h1>
          <p className="text-muted-foreground">Manage your supporters and track their giving.</p>
        </div>
        <Button variant="outline">
          <Download className="mr-2 h-4 w-4" />
          Export CSV
        </Button>
      </div>

      <div className="grid gap-4 md:grid-cols-5">
        <Card className="cursor-pointer hover:border-primary/50 transition-colors" onClick={() => setStatusFilter('all')}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <Gift className="h-5 w-5 text-primary" />
            </div>
            <div>
              <p className="text-2xl font-bold">{statusCounts.all}</p>
              <p className="text-xs text-muted-foreground">All Donors</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-emerald-500/50 transition-colors" onClick={() => setStatusFilter('active')}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
              <TrendingUp className="h-5 w-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{statusCounts.active}</p>
              <p className="text-xs text-muted-foreground">Active</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-blue-500/50 transition-colors" onClick={() => setStatusFilter('new')}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-blue-100 dark:bg-blue-950 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-blue-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{statusCounts.new}</p>
              <p className="text-xs text-muted-foreground">New</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-amber-500/50 transition-colors" onClick={() => setStatusFilter('at_risk')}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-amber-100 dark:bg-amber-950 flex items-center justify-center">
              <AlertTriangle className="h-5 w-5 text-amber-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{statusCounts.at_risk}</p>
              <p className="text-xs text-muted-foreground">At Risk</p>
            </div>
          </CardContent>
        </Card>
        <Card className="cursor-pointer hover:border-rose-500/50 transition-colors" onClick={() => setStatusFilter('lapsed')}>
          <CardContent className="p-4 flex items-center gap-3">
            <div className="h-10 w-10 rounded-full bg-rose-100 dark:bg-rose-950 flex items-center justify-center">
              <Clock className="h-5 w-5 text-rose-600" />
            </div>
            <div>
              <p className="text-2xl font-bold">{statusCounts.lapsed}</p>
              <p className="text-xs text-muted-foreground">Lapsed</p>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="pb-4">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search donors by name or email..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="pl-9"
              />
            </div>
            <div className="flex gap-2">
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-[140px]">
                  <Filter className="h-4 w-4 mr-2" />
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="at_risk">At Risk</SelectItem>
                  <SelectItem value="lapsed">Lapsed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          {filteredDonors.length > 0 ? (
            <div className="divide-y">
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
              <Gift className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <h3 className="font-medium mb-1">No donors found</h3>
              <p className="text-sm text-muted-foreground">Try adjusting your search or filters.</p>
            </div>
          )}
        </CardContent>
      </Card>

      <DonorDetailModal 
        donor={selectedDonor} 
        open={!!selectedDonor} 
        onClose={() => setSelectedDonor(null)} 
      />
    </div>
  )
}
