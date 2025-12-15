'use client'

import { useState } from 'react'
import { Building2, ChevronsUpDown, Check } from '../icons'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { useMC } from '@/lib/mission-control/context'
import type { Tenant } from '@/lib/mission-control/types'

const STUB_TENANTS: Tenant[] = [
  { id: '00000000-0000-0000-0000-000000000001', name: 'Orchids Platform', slug: 'orchids-platform' },
]

export function TenantSwitcher() {
  const [open, setOpen] = useState(false)
  const { tenant } = useMC()
  const [selectedTenant, setSelectedTenant] = useState(tenant)

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="h-9 w-48 justify-between"
        >
          <div className="flex items-center gap-2 truncate">
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="truncate">{selectedTenant?.name || 'Select tenant...'}</span>
          </div>
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-48 p-0">
        <Command>
          <CommandInput placeholder="Search tenant..." />
          <CommandList>
            <CommandEmpty>No tenant found.</CommandEmpty>
            <CommandGroup>
              {STUB_TENANTS.map((t: Tenant) => (
                <CommandItem
                  key={t.id}
                  onSelect={() => {
                    setSelectedTenant(t)
                    setOpen(false)
                  }}
                >
                  <Check
                    className={cn(
                      'mr-2 h-4 w-4',
                      selectedTenant?.id === t.id ? 'opacity-100' : 'opacity-0'
                    )}
                  />
                  {t.name}
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
