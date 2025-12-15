export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const { initSentry } = await import('./lib/monitoring/sentry')
    initSentry()
  }

  if (process.env.NEXT_RUNTIME === 'edge') {
    const { initSentry } = await import('./lib/monitoring/sentry')
    initSentry()
  }
}

export async function onRequestError(
  error: { digest: string } & Error,
  request: {
    path: string
    method: string
    headers: { [key: string]: string }
  },
  context: {
    routerKind: 'Pages Router' | 'App Router'
    routePath: string
    routeType: 'render' | 'route' | 'action' | 'middleware'
    renderSource?: 'react-server-components' | 'react-server-components-payload' | 'server-rendering'
    revalidateReason?: 'on-demand' | 'stale' | undefined
    renderType?: 'dynamic' | 'dynamic-resume'
  }
) {
  console.error('[Request Error]', {
    error: error.message,
    digest: error.digest,
    path: request.path,
    method: request.method,
    routerKind: context.routerKind,
    routePath: context.routePath,
    routeType: context.routeType,
  })

  if (process.env.NEXT_PUBLIC_SENTRY_DSN) {
    const Sentry = await import('@sentry/nextjs')
    Sentry.captureException(error, {
      extra: {
        path: request.path,
        method: request.method,
        routerKind: context.routerKind,
        routePath: context.routePath,
        routeType: context.routeType,
        renderSource: context.renderSource,
      },
    })
  }
}
