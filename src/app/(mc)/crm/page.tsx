'use client'

import { useState, useMemo } from 'react'
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
import { getIcon, Plus, Search } from '@/components/mission-control/icons'
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
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

interface Person {
  id: string
  name: string
  email: string
  type: 'donor' | 'missionary' | 'contact'
  church?: string
  lastGift?: string
  totalGiven: number
  status: 'active' | 'lapsed' | 'prospect'
}

const MOCK_PEOPLE: Person[] = [
  { id: '1', name: 'John Smith', email: 'john@example.com', type: 'donor', church: 'First Baptist', lastGift: '2024-12-01', totalGiven: 5200, status: 'active' },
  { id: '2', name: 'Sarah Johnson', email: 'sarah@mission.org', type: 'missionary', lastGift: '2024-11-15', totalGiven: 0, status: 'active' },
  { id: '3', name: 'Michael Chen', email: 'mchen@church.org', type: 'donor', church: 'Grace Community', lastGift: '2024-10-22', totalGiven: 15750, status: 'active' },
  { id: '4', name: 'Emily Davis', email: 'emily.d@email.com', type: 'contact', totalGiven: 0, status: 'prospect' },
  { id: '5', name: 'Robert Williams', email: 'rwilliams@corp.com', type: 'donor', church: 'Cornerstone', lastGift: '2023-06-14', totalGiven: 2500, status: 'lapsed' },
  { id: '6', name: 'Maria Garcia', email: 'mgarcia@mission.org', type: 'missionary', totalGiven: 0, status: 'active' },
  { id: '7', name: 'James Brown', email: 'jbrown@email.com', type: 'donor', lastGift: '2024-12-10', totalGiven: 8300, status: 'active' },
  { id: '8', name: 'Jennifer Lee', email: 'jlee@church.org', type: 'donor', church: 'Faith Chapel', lastGift: '2024-09-28', totalGiven: 3100, status: 'active' },
]

const columns: ColumnDef<Person>[] = [
  {
    accessorKey: 'name',
    header: 'Name',
    cell: ({ row }) => {
      const initials = row.original.name.split(' ').map(n => n[0]).join('')
      return (
        <div className="flex items-center gap-3">
          <Avatar className="h-8 w-8">
            <AvatarFallback className="text-xs">{initials}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{row.original.name}</div>
            <div className="text-xs text-muted-foreground">{row.original.email}</div>
          </div>
        </div>
      )
    },
  },
  {
    accessorKey: 'type',
    header: 'Type',
    cell: ({ row }) => (
      <Badge variant={row.original.type === 'donor' ? 'default' : row.original.type === 'missionary' ? 'secondary' : 'outline'}>
        {row.original.type}
      </Badge>
    ),
  },
  {
    accessorKey: 'church',
    header: 'Church',
    cell: ({ row }) => row.original.church || '—',
  },
  {
    accessorKey: 'totalGiven',
    header: 'Total Given',
    cell: ({ row }) => {
      const amount = row.original.totalGiven
      return amount > 0 ? `$${amount.toLocaleString()}` : '—'
    },
  },
  {
    accessorKey: 'lastGift',
    header: 'Last Gift',
    cell: ({ row }) => row.original.lastGift || '—',
  },
  {
    accessorKey: 'status',
    header: 'Status',
    cell: ({ row }) => (
      <Badge variant={row.original.status === 'active' ? 'default' : row.original.status === 'lapsed' ? 'destructive' : 'outline'}>
        {row.original.status}
      </Badge>
    ),
  },
]

export default function CRMPage() {
  const tile = getTileById('crm')!
  const [sorting, setSorting] = useState<SortingState>([])
  const [globalFilter, setGlobalFilter] = useState('')
  const [selectedPerson, setSelectedPerson] = useState<Person | null>(null)

  const table = useReactTable({
    data: MOCK_PEOPLE,
    columns,
    state: { sorting, globalFilter },
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
  })

  return (
    <div className="flex h-full">
      <div className="flex flex-1 flex-col overflow-hidden">
        <PageHeader
          title={tile.title}
          description={tile.purpose}
          breadcrumbs={[{ label: tile.title }]}
          actions={
            <Link href="/mc/crm/people/new">
              <Button size="sm">
                <Plus className="mr-2 h-4 w-4" />
                Add Person
              </Button>
            </Link>
          }
        />
        <div className="flex-1 overflow-auto p-6 lg:p-8">
          <div className="mb-4 flex items-center gap-4">
            <div className="relative flex-1 max-w-sm">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                placeholder="Search people..."
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
                      onClick={() => setSelectedPerson(row.original)}
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
              {table.getFilteredRowModel().rows.length} people
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
        open={!!selectedPerson}
        onClose={() => setSelectedPerson(null)}
        title={selectedPerson?.name}
        fullPageHref={selectedPerson ? `/mc/crm/people/${selectedPerson.id}` : undefined}
      >
        {selectedPerson && (
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <Avatar className="h-12 w-12">
                <AvatarFallback>{selectedPerson.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold">{selectedPerson.name}</h3>
                <p className="text-sm text-muted-foreground">{selectedPerson.email}</p>
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Type</span>
                <Badge variant="outline">{selectedPerson.type}</Badge>
              </div>
              {selectedPerson.church && (
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Church</span>
                  <span>{selectedPerson.church}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Given</span>
                <span className="font-medium">${selectedPerson.totalGiven.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Status</span>
                <Badge variant={selectedPerson.status === 'active' ? 'default' : 'destructive'}>
                  {selectedPerson.status}
                </Badge>
              </div>
            </div>
            <div className="flex gap-2 pt-4">
              <Button variant="outline" size="sm" className="flex-1">Add Note</Button>
              <Button variant="outline" size="sm" className="flex-1">Create Task</Button>
            </div>
          </div>
        )}
      </DetailsDrawer>
    </div>
  )
}
