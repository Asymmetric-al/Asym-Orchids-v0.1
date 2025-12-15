import { MCProvider } from '@/lib/mission-control/context'
import { AppShell } from '@/components/mission-control/app-shell/AppShell'
import { ThemeProvider } from '@/providers/theme-provider'

export default function MissionControlLayout({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider
      attribute="class"
      defaultTheme="light"
      forcedTheme="light"
      enableSystem={false}
      disableTransitionOnChange
    >
      <MCProvider>
        <AppShell>{children}</AppShell>
      </MCProvider>
    </ThemeProvider>
  )
}