import { MCProvider } from '@/lib/mission-control/context'
import { AppShell } from '@/components/mission-control/app-shell/AppShell'

export default function MCLayout({ children }: { children: React.ReactNode }) {
  return (
    <MCProvider>
      <AppShell>{children}</AppShell>
    </MCProvider>
  )
}
