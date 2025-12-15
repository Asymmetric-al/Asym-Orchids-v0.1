'use client'

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react'
import type { Role, User, Tenant } from './types'
import { ROLE_LABELS } from './roles'

interface MCContextValue {
  user: User | null
  tenant: Tenant | null
  role: Role
  setRole: (role: Role) => void
  isDevMode: boolean
  sidebarCollapsed: boolean
  setSidebarCollapsed: (collapsed: boolean) => void
}

const MCContext = createContext<MCContextValue | null>(null)

const STUB_TENANTS: Tenant[] = [
  { id: '1', name: 'Global Outreach', slug: 'global-outreach' },
  { id: '2', name: 'Mission Partners', slug: 'mission-partners' },
  { id: '3', name: 'Faith Forward', slug: 'faith-forward' },
]

const STUB_USER: User = {
  id: '1',
  email: 'admin@example.org',
  name: 'Admin User',
  role: 'admin',
  tenantId: '1',
}

export function MCProvider({ children }: { children: ReactNode }) {
  const [role, setRole] = useState<Role>('admin')
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false)
  const isDevMode = process.env.NODE_ENV === 'development'

  const user: User = { ...STUB_USER, role }
  const tenant = STUB_TENANTS[0]

  return (
    <MCContext.Provider
      value={{
        user,
        tenant,
        role,
        setRole,
        isDevMode,
        sidebarCollapsed,
        setSidebarCollapsed,
      }}
    >
      {children}
    </MCContext.Provider>
  )
}

export function useMC() {
  const ctx = useContext(MCContext)
  if (!ctx) throw new Error('useMC must be used within MCProvider')
  return ctx
}

export function useRole() {
  const { role, setRole, isDevMode } = useMC()
  return { role, setRole, isDevMode, roleLabel: ROLE_LABELS[role] }
}

export { STUB_TENANTS }
