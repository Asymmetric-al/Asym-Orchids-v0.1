'use client'

import { memo } from 'react'
import Link from 'next/link'
import { ChevronRight } from 'lucide-react'
import { cn } from '@/lib/utils'

interface Breadcrumb {
  label: string
  href?: string
}

interface PageHeaderProps {
  title: string
  description?: string
  breadcrumbs?: Breadcrumb[]
  actions?: React.ReactNode
  className?: string
}

export const PageHeader = memo(function PageHeader({
  title,
  description,
  breadcrumbs,
  actions,
  className,
}: PageHeaderProps) {
  return (
    <header className={cn('border-b border-border bg-background px-6 py-4 lg:px-8', className)}>
      {breadcrumbs && breadcrumbs.length > 0 && (
        <nav className="mb-2 flex items-center text-sm text-muted-foreground">
          <Link href="/mc" className="hover:text-foreground transition-colors">
            Mission Control
          </Link>
          {breadcrumbs.map((crumb, i) => (
            <span key={i} className="flex items-center">
              <ChevronRight className="mx-2 h-4 w-4" />
              {crumb.href ? (
                <Link href={crumb.href} className="hover:text-foreground transition-colors">
                  {crumb.label}
                </Link>
              ) : (
                <span className="text-foreground">{crumb.label}</span>
              )}
            </span>
          ))}
        </nav>
      )}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
          {description && <p className="mt-1 text-sm text-muted-foreground">{description}</p>}
        </div>
        {actions && <div className="flex items-center gap-2">{actions}</div>}
      </div>
    </header>
  )
})
