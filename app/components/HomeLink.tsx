import Link from 'next/link'
import { styled } from '@stitches/react'
import { Flex, Heading, Text } from '@radix-ui/themes'
import { moe } from '@neko03/general/moe'
import { FontHachiMaruPop } from '../internal/fonts'

export default ({ title, href }: Props) => (
  <Link href={href}>
    <HomeLinkFlex m='auto' p='1' gap='3' justify='center' align='center' style={{
      position: 'fixed',
      left: 5,
      top: 5,
      borderRadius: 5,
    }}>
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

type Props = {
  title: string,
  href: string,
}
