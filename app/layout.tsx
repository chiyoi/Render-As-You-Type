import type { Metadata, Viewport } from 'next'
import '@radix-ui/themes/styles.css'
import 'katex/dist/katex.min.css'
import { ChildrenProps } from '@/app/internal/props'
import Body from '@/app/components/Body'

export const metadata: Metadata = {
  title: 'LaTeX',
  description: 'Render LaTeX on type.',
  icons: {
    icon: 'https://latex.neko03.moe/favicon.ico',
  },
}

export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FEF7FB' },
    { media: '(prefers-color-scheme: dark)', color: '#21121D' },
  ],
}

export default ({ children }: ChildrenProps) => (
  <html lang='en'>
    <Body style={{ margin: 0 }}>
      {children}
    </Body>
  </html>
)
