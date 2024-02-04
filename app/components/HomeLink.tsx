import Link from 'next/link'
import { Avatar, Flex, Heading, Text } from '@radix-ui/themes'
import { Blurhash } from 'react-blurhash'
import { AppLinkProps } from '@/app/internal/props'
import { moe } from '@/app/internal/moe'
import { FontHachiMaruPop } from '@/app/internal/fonts'
import { styled } from '@stitches/react'

export default ({ title, href, avatar }: Omit<AppLinkProps, 'description'>) => (
  <Link href={href}>
    <HomeLinkFlex m='auto' p='1' gap='3' justify='center' align='center' style={{
      position: 'fixed',
      left: 5,
      top: 5,
      borderRadius: 5,
    }}>
      <Avatar src={avatar.src} radius='none' style={{
        width: 80,
        height: 40,
        overflow: 'hidden',
        maskImage: 'linear-gradient(transparent, black, transparent)',
        WebkitMaskImage: 'linear-gradient(transparent, black, transparent)',
      }} fallback={(
        <Blurhash width='100%' height='100%' resolutionX={32} resolutionY={32} hash={
          avatar.blurhash
        } />
      )} />
      <Heading style={{ position: 'relative', top: 5 }}>
        {moe(title).map((c, i) => (
          <Text key={i} size={c.char === '★' ? '1' : '6'} style={{
            ...FontHachiMaruPop,
            color: `var(--${c.color}-a8)`,
          }}>
            {c.char}
          </Text>
        ))}
      </Heading>
    </HomeLinkFlex>
  </Link>
)

const HomeLinkFlex = styled(Flex, {
  backgroundColor: 'var(--accent-a3)',
  '&:hover': {
    backgroundColor: 'var(--accent-a4)',
  },
  '&:active': {
    backgroundColor: 'var(--accent-a5)',
  },
})
