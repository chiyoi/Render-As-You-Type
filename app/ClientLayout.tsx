'use client'
import { ThemeProvider } from 'next-themes'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Container, Theme } from '@radix-ui/themes'

import { ChildrenProps } from '@/app/common/props'
import Body from '@/app/common/Body'
import { ToastProvider } from '@/app/common/toast'
import HomeLink from '@/app/common/HomeLink'

export const queryClient = new QueryClient()

export default ({ children }: ChildrenProps) => {
  return (
    <Body style={{ margin: 0 }}>
      <ThemeProvider attribute='class'>
        <Theme accentColor='pink' hasBackground={false}>
          <QueryClientProvider client={queryClient}>
            <ToastProvider>
              <Container pt='9' px='5' size='4'>
                {children}
              </Container>
              <HomeLink title='neko03★moe' href='https://neko03.moe' />
            </ToastProvider>
          </QueryClientProvider>
        </Theme>
      </ThemeProvider>
    </Body>
  )
}
