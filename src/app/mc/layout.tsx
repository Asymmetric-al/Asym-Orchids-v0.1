import { MCProvider, AppShell } from '@/features/mission-control'

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <MCProvider>
      <AppShell>{children}</AppShell>
    </MCProvider>
  )
}
