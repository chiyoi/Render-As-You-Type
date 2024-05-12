'use client'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { Card, TabNav } from '@radix-ui/themes'

import { ChildrenProps } from '@/app/common/props'


export default ({ children }: ChildrenProps) => {
  const pathname = usePathname()
  return (
    <>
      <TabNav.Root>
        <TabNav.Link asChild active={pathname === '/latex'}>
          <Link href='/latex'>
            LaTex
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/blurhash'}>
          <Link href='/blurhash'>
            BlurHash
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/github-card'}>
          <Link href='/github-card'>
            Github Card
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={pathname === '/animal-crossing-item-price'}>
          <Link href='/animal-crossing-item-price'>
            Animal Crossing Item Price
          </Link>
        </TabNav.Link>
      </TabNav.Root>
      <Card mt='3'>
        {children}
      </Card>
    </>
  )
}
