# Mission Control Platform

A modern Next.js 15 application for mission-focused organizations. Built with React 19, Tailwind CSS 4, and shadcn/ui.

## Tech Stack

- **Framework:** Next.js 15 (App Router, Turbopack)
- **UI:** shadcn/ui + Tailwind CSS 4 + Radix UI
- **State:** React Query (TanStack Query)
- **Database:** Supabase (PostgreSQL)
- **Payments:** Stripe
- **Auth:** Supabase Auth
- **Charts:** Recharts
- **Forms:** React Hook Form + Zod

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── (api)/             # API routes
│   ├── mc/                # Mission Control dashboard routes
│   ├── auth/              # Authentication pages
│   ├── login/             # Login page
│   └── register/          # Register page
│
├── components/            # Shared UI components
│   ├── ui/               # shadcn/ui primitives (Button, Card, etc.)
│   ├── dashboard/        # Dashboard-specific components
│   └── feed/             # Social feed components
│
├── features/             # Feature-based modules (domain logic)
│   └── mission-control/  # MC feature module
│       ├── components/   # Feature-specific components
│       ├── context.tsx   # MC React context & hooks
│       └── index.ts      # Barrel exports
│
├── config/               # App configuration
│   ├── site.ts          # Site metadata
│   ├── navigation.ts    # Navigation config & role-based access
│   └── index.ts         # Barrel exports
│
├── hooks/                # Shared React hooks
│   ├── use-auth.ts      # Authentication hook
│   ├── use-mobile.ts    # Responsive hook
│   └── index.ts         # Barrel exports
│
├── lib/                  # Shared utilities & integrations
│   ├── supabase/        # Supabase client configuration
│   ├── utils.ts         # Utility functions (cn, etc.)
│   └── stripe.ts        # Stripe configuration
│
├── providers/           # React context providers
│   ├── query-provider.tsx
│   └── theme-provider.tsx
│
└── types/               # TypeScript type definitions
    ├── database.ts      # Database types
    └── index.ts         # Shared types & barrel exports
```

## Architecture Principles

### Feature-Based Organization

Domain logic is organized in `src/features/`. Each feature module contains:
- `components/` - Feature-specific React components
- `context.tsx` - React context, providers, and hooks
- `index.ts` - Clean barrel exports

### Component Hierarchy

1. **UI Primitives** (`src/components/ui/`) - shadcn/ui base components
2. **Shared Components** (`src/components/`) - Reusable across features
3. **Feature Components** (`src/features/*/components/`) - Feature-specific

### Import Conventions

```tsx
// Use barrel exports for cleaner imports
import { Button, Card, Input } from '@/components/ui'
import { MCProvider, useMC, AppShell } from '@/features/mission-control'
import { useAuth, useMobile } from '@/hooks'
import { cn } from '@/lib/utils'
import { siteConfig, navigation } from '@/config'
import type { User, Role } from '@/types'
```

## Getting Started

```bash
# Install dependencies
yarn install

# Run development server
yarn dev

# Type checking
yarn typecheck

# Linting
yarn lint
```

## Scripts

| Script | Description |
|--------|-------------|
| `dev` | Start dev server with Turbopack |
| `build` | Production build |
| `lint` | Run ESLint |
| `typecheck` | TypeScript type checking |
| `test:e2e` | Run Playwright E2E tests |

## Environment Variables

```env
# Supabase
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
SUPABASE_SERVICE_ROLE_KEY=

# Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=
STRIPE_SECRET_KEY=
```

## Key Routes

| Route | Description |
|-------|-------------|
| `/mc` | Mission Control dashboard |
| `/mc/crm` | People & Churches CRM |
| `/mc/contributions` | Contributions Hub |
| `/mc/email` | Email Studio |
| `/mc/reports` | Report Studio |
| `/mc/admin` | Admin settings |
