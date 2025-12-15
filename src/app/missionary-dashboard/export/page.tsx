'use client'

import * as React from 'react'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Label } from '@/components/ui/label'
import {
  Download,
  FileText,
  Users,
  Gift,
  Wallet,
  Calendar,
  CheckCircle2,
  Clock,
  FileSpreadsheet,
} from 'lucide-react'

interface ExportOption {
  id: string
  title: string
  description: string
  icon: React.ElementType
  formats: string[]
}

const exportOptions: ExportOption[] = [
  {
    id: 'donors',
    title: 'Donor List',
    description: 'Export all donors with contact info and giving summary',
    icon: Users,
    formats: ['CSV', 'PDF'],
  },
  {
    id: 'gifts',
    title: 'Gift History',
    description: 'Export all donations for a selected time period',
    icon: Gift,
    formats: ['CSV', 'PDF'],
  },
  {
    id: 'statement',
    title: 'Fund Statement',
    description: 'Account statement with income and expenses',
    icon: Wallet,
    formats: ['PDF'],
  },
  {
    id: 'analytics',
    title: 'Analytics Report',
    description: 'Monthly giving trends and donor segmentation',
    icon: FileText,
    formats: ['PDF'],
  },
]

const recentExports = [
  { id: 'e1', name: 'donor_list_dec2024.csv', type: 'Donor List', createdAt: '2024-12-10', size: '24 KB' },
  { id: 'e2', name: 'fund_statement_nov2024.pdf', type: 'Fund Statement', createdAt: '2024-12-01', size: '156 KB' },
  { id: 'e3', name: 'gift_history_2024.csv', type: 'Gift History', createdAt: '2024-11-15', size: '18 KB' },
]

function ExportCard({ option }: { option: ExportOption }) {
  const Icon = option.icon
  const [format, setFormat] = React.useState(option.formats[0])
  const [dateRange, setDateRange] = React.useState('year')
  const [isExporting, setIsExporting] = React.useState(false)

  const handleExport = () => {
    setIsExporting(true)
    setTimeout(() => setIsExporting(false), 2000)
  }

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start gap-3">
          <div className="h-10 w-10 rounded-lg bg-primary/10 flex items-center justify-center">
            <Icon className="h-5 w-5 text-primary" />
          </div>
          <div className="flex-1">
            <CardTitle className="text-base">{option.title}</CardTitle>
            <CardDescription>{option.description}</CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          {option.id !== 'donors' && (
            <div className="space-y-2">
              <Label className="text-xs">Time Period</Label>
              <Select value={dateRange} onValueChange={setDateRange}>
                <SelectTrigger className="h-9">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="month">This Month</SelectItem>
                  <SelectItem value="quarter">This Quarter</SelectItem>
                  <SelectItem value="year">This Year</SelectItem>
                  <SelectItem value="all">All Time</SelectItem>
                </SelectContent>
              </Select>
            </div>
          )}
          <div className="space-y-2">
            <Label className="text-xs">Format</Label>
            <Select value={format} onValueChange={setFormat}>
              <SelectTrigger className="h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {option.formats.map(f => (
                  <SelectItem key={f} value={f}>{f}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
        <Button 
          className="w-full" 
          onClick={handleExport}
          disabled={isExporting}
        >
          {isExporting ? (
            <>
              <Clock className="mr-2 h-4 w-4 animate-spin" />
              Generating...
            </>
          ) : (
            <>
              <Download className="mr-2 h-4 w-4" />
              Export {format}
            </>
          )}
        </Button>
      </CardContent>
    </Card>
  )
}

export default function ExportPage() {
  return (
    <div className="space-y-6 p-4 md:p-6 lg:p-8">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Export Data</h1>
        <p className="text-muted-foreground">Download reports and data for offline use or analysis.</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {exportOptions.map(option => (
          <ExportCard key={option.id} option={option} />
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">
            <FileSpreadsheet className="h-5 w-5" />
            Recent Exports
          </CardTitle>
          <CardDescription>Your previously generated files</CardDescription>
        </CardHeader>
        <CardContent>
          {recentExports.length > 0 ? (
            <div className="space-y-2">
              {recentExports.map(exp => (
                <div 
                  key={exp.id}
                  className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-emerald-100 dark:bg-emerald-950 flex items-center justify-center">
                      {exp.name.endsWith('.csv') ? (
                        <FileSpreadsheet className="h-5 w-5 text-emerald-600" />
                      ) : (
                        <FileText className="h-5 w-5 text-emerald-600" />
                      )}
                    </div>
                    <div>
                      <p className="font-medium text-sm">{exp.name}</p>
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span>{exp.type}</span>
                        <span>•</span>
                        <span>{new Date(exp.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>{exp.size}</span>
                      </div>
                    </div>
                  </div>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <FileText className="h-12 w-12 mx-auto text-muted-foreground/50 mb-4" />
              <p className="text-muted-foreground">No recent exports</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Export Tips</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3 text-sm">
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <p><strong>CSV files</strong> can be opened in Excel, Google Sheets, or any spreadsheet software</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <p><strong>PDF reports</strong> include your organization&apos;s branding and are ready to print</p>
          </div>
          <div className="flex items-start gap-2">
            <CheckCircle2 className="h-4 w-4 text-emerald-600 mt-0.5 shrink-0" />
            <p><strong>Fund statements</strong> are useful for tax purposes and financial planning</p>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
