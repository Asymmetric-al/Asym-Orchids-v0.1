export const siteConfig = {
  name: 'Mission Control',
  description: 'The command center for mission-focused organizations',
  url: process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000',
  ogImage: '/og.png',
  links: {
    github: 'https://github.com/asymmetrical',
    docs: '/docs',
  },
} as const

export type SiteConfig = typeof siteConfig
