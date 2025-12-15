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

## Repo at a glance
- **App Router** (`src/app`): Route groups per product surface (mc, donor, missionary, auth, api). Use RSC by default; add `"use client"` only when hooks/refs are needed.
- **Mission Control feature** (`src/features/mission-control`): AppShell, context, tiles, patterns; exported via barrel for ergonomic imports.
- **Shared UI** (`src/components/ui`): shadcn/radix primitives. Extend via `class-variance-authority`; keep variants typed.
- **Shared components** (`src/components`): dashboard widgets, feed, mission-control shell pieces.
- **Config** (`src/config`): navigation, tiles, site metadata. Only config objects—no side effects.
- **Lib** (`src/lib`): utilities (`utils.ts` with `cn`), Supabase/Stripe clients, mission-control types/context helpers.
- **Providers** (`src/providers`): theme + query providers wired in `src/app/layout.tsx`.
- **Tests** (`tests/e2e`): Playwright suites (accessibility, performance, ui flows).

## Conventions (do this)
- **Imports**: Prefer barrel exports (`@/components/ui`, `@/features/mission-control`). Keep absolute alias `@/`.
- **Components**: Server-first. Mark client components explicitly. Co-locate feature UI with its feature.
- **Styling**: Tailwind + shadcn. No inline styles unless necessary. Use semantic text colors (`text-muted-foreground`, etc.).
- **Icons**: From `lucide-react`; map in `src/components/mission-control/icons.tsx` when used in navigation.
- **Forms**: `react-hook-form` + `zod` for schemas. Derive types via `z.infer<typeof schema>`.
- **Data**: Fetch with React Query in client components; keep keys typed/constants. Use Supabase client from `@/lib/supabase` on server or `@supabase/ssr` helpers on client.
- **Routing/links**: Use `next/link` for internal nav; avoid naked `<a>` for in-app routes.
- **Accessibility**: Favor Radix primitives; always pass `aria-*` labels on icon-only buttons; keep focus rings.

## UI / Design system notes
- Typography: Inter (`--font-inter`) + Geist Mono for code. Root body sets `font-sans antialiased`.
- Palette: Neutral/zinc base, subtle borders, low-elevation cards, soft hover/press states; dark mode via `class` strategy.
- Components: Cards with 12–16px padding, rounded corners, balanced white space; buttons use shadcn variants (`default`, `secondary`, `outline`, `ghost`).
- Motion: `tw-animate-css` + Tailwind animations used sparingly (fade/slide/scale). Avoid long durations; prefer 150–200ms.

## Data & state
- **QueryProvider** wraps app (TanStack Query). Prefer `useQuery` for fetch, `useMutation` for writes; handle `onError` with toasts.
- **Context**: Mission Control context (`src/lib/mission-control/context.tsx`) provides tenant/user/menu state to shell components.
- **Caching**: Keep stable query keys; colocate constants near feature modules.
- **Supabase**: Use server-side helpers in RSC when possible; client Supabase only in client components that need live interactivity.

## Local development runbook
1. `yarn install`
2. Copy `.env.local` (see Environment) and populate secrets (keep out of git).
3. `yarn dev` (Turbopack) — default ports 3000/3001 depending on running instance.
4. Quality gates: `yarn lint`, `yarn typecheck`, `yarn test:e2e` (or `yarn test:a11y`, `yarn test:perf`).

## Environment
Create `.env.local` with:
- Supabase: `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- Stripe: `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_SECRET_KEY`.
- Keep secrets out of version control. Restart dev server after changes.

## Testing & quality
- **Linting**: `yarn lint` (ESLint 9).
- **Types**: `yarn typecheck` (TS 5.9, `--noEmit`).
- **E2E**: `yarn test:e2e` (Playwright); optional `test:a11y`, `test:perf`, `test:e2e:ui` for inspector.
- **Monitoring**: Web vitals reporter is mounted (`WebVitalsReporter`). Sentry is configured (client/edge/server configs present).

## Performance & reliability
- Favor RSC for data-fetching pages; keep client components slim and memoized (`React.memo`, `useMemo`, `useCallback` for handlers).
- Code-split heavy visuals with `next/dynamic` + suspense (charts already dynamic).
- Avoid `Date.now()/Math.random()` in rendered output; derive deterministic values to prevent hydration drift.
- Keep effect usage minimal; prefer derived state. Remove unused `useEffect`/`useState`.

## Troubleshooting
- **Hydration mismatch (Radix IDs / aria-controls differing)**: Ensure no non-deterministic values in render paths, restart dev server after dependency upgrades, and clear `.next` if the tree changed. Keep Radix components rendered consistently between server/client and avoid conditional wrappers that change order on mount.
- **Auth redirect 307 on /mc**: Expected when unauthenticated; login to proceed.
- **500 from `/api/auth/demo-account`**: Indicates invalid JSON payload or missing env secrets; verify request body and Supabase keys.

## Deployment
- Build: `yarn build`; start: `yarn start`. Use Vercel/Next 15 defaults. Ensure env vars are configured in hosting provider.