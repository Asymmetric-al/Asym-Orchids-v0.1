'use client'

import { useState } from 'react'
import Link from 'next/link'
import {
  useReactTable,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  flexRender,
  type ColumnDef,
  type SortingState,
} from '@tanstack/react-table'
import { getTileById } from '@/lib/mission-control/tiles'
import { PageHeader } from '@/components/mission-control/patterns/PageHeader'
import { DetailsDrawer } from '@/components/mission-control/patterns/DetailsDrawer'
import { Plus, Search } from '@/components/mission-control/icons'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface Gift {
  id: string
  donorName: string
  donorEmail: string
  amount: number
  date: string
  method: 'stripe' | 'ach' | 'check' | 'cash'
  fund: string
  status: 'completed' | 'pending' | 'failed' | 'disputed'
  missionary?: string
}

const MOCK_GIFTS: Gift[] = [
  { id: 'G001', donorName: 'John Smith', donorEmail: 'john@example.com', amount: 500, date: '2024-12-15', method: 'stripe', fund: 'General', status: 'completed' },
  { id: 'G002', donorName: 'Sarah Johnson', donorEmail: 'sarah@example.com', amount: 1000, date: '2024-12-14', method: 'ach', fund: 'Missions', status: 'completed', missionary: 'Maria Garcia' },
  { id: 'G003', donorName: 'Michael Chen', donorEmail: 'mchen@church.org', amount: 250, date: '2024-12-14', method: 'stripe', fund: 'Building', status: 'pending' },
  { id: 'G004', donorName: 'Emily Davis', donorEmail: 'emily.d@email.com', amount: 100, date: '2024-12-13', method: 'check', fund: 'General', status: 'completed' },
  { id: 'G005', donorName: 'Robert Williams', donorEmail: 'rwilliams@corp.com', amount: 2500, date: '2024-12-12', method: 'ach', fund: 'Missions', status: 'completed', missionary: 'James Brown' },
  { id: 'G006', donorName: 'Jennifer Lee', donorEmail: 'jlee@church.org', amount: 150, date: '2024-12-11', method: 'stripe', fund: 'Youth', status: 'disputed' },
  { id: 'G007', donorName: 'David Miller', donorEmail: 'dmiller@email.com', amount: 75, date: '2024-12-10', method: 'stripe', fund: 'General', status: 'failed' },
  { id: 'G008', donorName: 'Lisa Anderson', donorEmail: 'lisa.a@email.com', amount: 5000, date: '2024-12-10', method: 'check', fund: 'Missions', status: 'completed', missionary: 'Sarah Johnson' },
]

const columns: ColumnDef<Gift>[] = [
  {
    accessorKey: 'id',
    header: 'ID',
    cell: ({ row }) => <span className="font-mono text-xs">{row.original.id}</span>,
  },
  {
    accessorKey: 'donorName',
    header: 'Donor',
    cell: ({ row }) => (
      <div>
        <div className="font-medium">{row.original.donorName}</div>
        <div className="text-xs text-muted-foreground">{row.original.donorEmail}</div>
      </div>
    ),
  },
  {
    accessorKey: 'amount',
    header: 'Amount',
    cell: ({ row }) => <span className="font-semibold">${row.original.amount.toLocaleString()}</span>,
  },
  {
    accessorKey: 'date',
    header: 'Date',
  },
  {
    accessorKey: 'method',
    header: 'Method',
    cell: ({ row }) => (
      <Badge variant="outline" className="capitalize">{row.original.method}</Badge>
    ),
  },
  {
    accessorKey: 'fund',
    header: 'Fund',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => {
      const status = row.original.status
      return (
        <Badge variant={status === 'completed' ? 'default' : status === 'pending' ? 'secondary' : status === 'disputed' ? 'destructive' : 'outline'}>
          {status}
        </Badge>
      )
    },
  },
]

export default function ContributionsPage() {
  const tile = getTileById('contributions')!
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedGift, setSelectedGift] = useState<Gift | null>(null)

  const table = useReactTable({
    data: MOCK_GIFTS,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  const totalAmount = MOCK_GIFTS.filter(g => g.status === 'completed').reduce((sum, g) => sum + g.amount, 0)

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title={tile.title}
          description={tile.purpose}
          breadcrumbs={[{ label: tile.title }]}
          actions={
            <div className="flex gap-2">
              <Link href="/mc/contributions/batches/new">
                <Button size="sm">
                  <Plus className="mr-2 h-4 w-4" />
                  New Batch
                </Button>
              </Link>
            </div>
          }
        />
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="mb-6 grid gap-4 sm:grid-cols-4">
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">Total This Month</p>
              <p className="text-2xl font-bold">${totalAmount.toLocaleString()}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">Gifts Count</p>
              <p className="text-2xl font-bold">{MOCK_GIFTS.length}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">Pending</p>
              <p className="text-2xl font-bold">{MOCK_GIFTS.filter(g => g.status === 'pending').length}</p>
            </div>
            <div className="rounded-lg border bg-card p-4">
              <p className="text-xs text-muted-foreground">Disputed</p>
              <p className="text-2xl font-bold text-destructive">{MOCK_GIFTS.filter(g => g.status === 'disputed').length}</p>
            </div>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search gifts..."
                value={globalFilter}
                onChange={(e) => setGlobalFilter(e.target.value)}
                className="pl-9"
              />
            </div>
          </div>
          <div className="rounded-lg border">
            <Table>
              <TableHeader>
                {table.getHeaderGroups().map((headerGroup) => (
                  <TableRow key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <TableHead key={header.id}>
                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
                      </TableHead>
                    ))}
                  </TableRow>
                ))}
              </TableHeader>
              <TableBody>
                {table.getRowModel().rows?.length ? (
                  table.getRowModel().rows.map((row) => (
                    <TableRow
                      key={row.id}
                      className="cursor-pointer"
                      onClick={() => setSelectedGift(row.original)}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(cell.column.columnDef.cell, cell.getContext())}
                        </TableCell>
                      ))}
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={columns.length} className="h-24 text-center">
                      No results.
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          <div className="mt-4 flex items-center justify-between">
            <p className="text-sm text-muted-foreground">
              {table.getFilteredRowModel().rows.length} gifts
            </p>
            <div className="flex gap-2">
              <Button variant="outline" size="sm" onClick={() => table.previousPage()} disabled={!table.getCanPreviousPage()}>
                Previous
              </Button>
              <Button variant="outline" size="sm" onClick={() => table.nextPage()} disabled={!table.getCanNextPage()}>
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>

      <DetailsDrawer
        open={!!selectedGift}
        onClose={() => setSelectedGift(null)}
        title={`Gift ${selectedGift?.id}`}
        fullPageHref={selectedGift ? `/mc/contributions/${selectedGift.id}` : undefined}
      >
        {selectedGift && (
          <div className="space-y-4">
            <div className="text-center">
              <p className="text-3xl font-bold">${selectedGift.amount.toLocaleString()}</p>
              <p className="text-sm text-muted-foreground">{selectedGift.date}</p>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Donor</span>
                <span>{selectedGift.donorName}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Email</span>
                <span className="text-xs">{selectedGift.donorEmail}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Method</span>
                <Badge variant="outline" className="capitalize">{selectedGift.method}</Badge>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Fund</span>
                <span>{selectedGift.fund}</span>
              </div>
              {selectedGift.missionary && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Missionary</span>
                  <span>{selectedGift.missionary}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={selectedGift.status === 'completed' ? 'default' : 'destructive'}>
                  {selectedGift.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1">Send Receipt</Button>
              <Button variant="outline" size="sm" className="flex-1">View in Stripe</Button>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </div>
  )
}
