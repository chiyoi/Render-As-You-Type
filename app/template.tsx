'use client'
import { ThemeProvider } from 'next-themes'
import { QueryClientProvider } from '@tanstack/react-query'
import { Theme } from '@radix-ui/themes'
import { ToastProvider } from '@neko03/general/toast'
import HomeLink from '@neko03/general/components/HomeLink'
import { queryClient } from '@/app/internal/configurations'
import { ChildrenProps } from '@/app/internal/props'

export default ({ children }: ChildrenProps) => {
  return (
    <ThemeProvider attribute='class'>
      <Theme accentColor='pink'>
        <QueryClientProvider client={queryClient}>
          <ToastProvider>
            {children}
            <HomeLink title='neko03★moe' href='https://neko03.moe' avatar={{
              src: '/assets/Photos/cat_girl__cute__loli_1231998692.640x320.png',
              blurhash: 'e5L;5Uns4X1Z8@%Q%eNCrHRP06yC_2VXxn{gITPB0fnPDSxSDjfm9F', //cspell: disable-line
            }} />
          </ToastProvider>
        </QueryClientProvider>
      </Theme>
    </ThemeProvider>
  )
}
