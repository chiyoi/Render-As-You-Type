import Link from 'next/link'
import { Avatar, Flex, Text, Link as LinkText } from '@radix-ui/themes'
import { Blurhash } from 'react-blurhash'
import { FontNotoSansMono } from '@/app/internal/fonts'
import { AppLinkProps } from '@/app/internal/props'
import { styled } from '@stitches/react'

export default ({ avatar, title, href }: AppLinkProps) => (
  <LinkText asChild>
    <Link href={href} style={{ margin: 'auto' }}>
      <AppLinkFlex m='auto' p='3' gap='2' direction='column' justify='center' align='center'>
        <Avatar size='5' src={avatar.src} style={{
          overflow: 'hidden',
        }} fallback={(
          <Blurhash
            hash={avatar.blurhash}
            width='100%'
            height='100%'
            resolutionX={32}
            resolutionY={32}
          />
        )} />
        <Text style={{ ...FontNotoSansMono }}>{title}</Text>
      </AppLinkFlex>
    </Link>
  </LinkText>
)

const AppLinkFlex = styled(Flex, {
  '&:hover': {
    backgroundColor: 'var(--accent-4)',
    borderRadius: 'var(--radius-4)',
  }
})
