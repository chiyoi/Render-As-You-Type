'use client'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Card, Container, Tabs, Theme } from '@radix-ui/themes'

import { ToastProvider } from './common/toast'
import { ChildrenProps } from './common/props'
import Body from './common/Body'
import HomeLink from './common/HomeLink'

export const queryClient = new QueryClient()

export default ({ children }: ChildrenProps) => {
  return (
    <Body style={{ margin: 0 }}>
      <ThemeProvider attribute='class'>
        <Theme accentColor='pink' hasBackground={false}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              {children}
              <HomeLink title='neko03★moe' href='https://neko03.moe' />
            </ToastProvider>
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </Body>
  )
}
