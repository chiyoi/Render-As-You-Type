'use client'
import { Flex, Tabs } from '@radix-ui/themes'
import LaTeX from '@/app/components/LaTeX'
import BlurHash from '@/app/components/BlurHash'

export default () => {
  return (
    <Flex mt='9' mx='auto' align='center' mb='auto' gap='3' direction='column'>
      <Tabs.Root defaultValue='blurhash'>
        <Tabs.List>
          <Tabs.Trigger value='latex'>LaTex</Tabs.Trigger>
          <Tabs.Trigger value='blurhash'>BlurHash</Tabs.Trigger>
        </Tabs.List>
        <Tabs.Content value="latex">
          <LaTeX />
        </Tabs.Content>
        <Tabs.Content value="blurhash">
          <BlurHash />
        </Tabs.Content>
      </Tabs.Root>
    </Flex>
  )
}
