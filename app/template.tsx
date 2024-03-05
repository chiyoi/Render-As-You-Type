'use client'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'
import { ToastProvider } from '@neko03/general/toast'
import { queryClient } from '@/app/internal/configurations'
import { ChildrenProps } from '@/app/internal/props'
import HomeLink from '@/app/components/HomeLink'

export default ({ children }: ChildrenProps) => {
  return (
    <ThemeProvider attribute='class'>
      <Theme accentColor='pink'>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            {children}
            <HomeLink title='neko03★moe' href='https://neko03.moe' />
          </ToastProvider>
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  )
}
