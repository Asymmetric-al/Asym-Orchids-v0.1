import { AppShell } from '@/components/mission-control/app-shell/AppShell'
import { MCProvider } from '@/lib/mission-control/context'

export default function MissionControlLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <MCProvider>
      <AppShell>
        {children}
      </AppShell>
    </MCProvider>
  )
}
