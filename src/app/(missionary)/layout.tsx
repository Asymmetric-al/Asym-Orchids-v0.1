import { AppShell } from '@/components/app-shell'

export default function MissionaryLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <AppShell role="missionary" tenantName="Orchids">
      {children}
    </AppShell>
  )
}