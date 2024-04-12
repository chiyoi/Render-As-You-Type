'use client'
import { Card, Container, TabNav } from '@radix-ui/themes'
import Link from 'next/link'

import { ChildrenProps } from '../common/props'
import { useMounted } from '../common/hooks'

export default ({ children }: ChildrenProps) => {
  return useMounted() && (
    <>
      <TabNav.Root>
        <TabNav.Link asChild active={location.pathname === '/latex'}>
          <Link href="/latex">
            LaTex
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={location.pathname === '/blurhash'}>
          <Link href="/blurhash">
            BlurHash
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={location.pathname === '/github-card'}>
          <Link href="/github-card">
            Github Card
          </Link>
        </TabNav.Link>
        <TabNav.Link asChild active={location.pathname === '/animal-crossing-item-price'}>
          <Link href="/animal-crossing-item-price">
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
