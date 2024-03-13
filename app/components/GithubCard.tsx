import { FontHachiMaruPop, FontNotoSansMono } from '@/app/internal/fonts'
import { Flex, Heading, TextArea, Text, Avatar } from '@radix-ui/themes'
import { useRef, useState } from 'react'

export default () => {
  const [repositoryBuffer, setRepositoryBuffer] = useState('')
  const [repository, setRepository] = useState('')
  let timer = useRef<ReturnType<typeof setTimeout>>()
  return (
    <Flex direction='column' m='3' gap='3' align='center' style={{ width: '80vw' }}>
      <Heading style={{ ...FontNotoSansMono }}>Github Card</Heading>
      <TextArea size='3' placeholder='Input repository path...' value={repositoryBuffer} style={{
        ...FontNotoSansMono,
        width: '100%',
      }} onChange={e => {
        setRepositoryBuffer(e.target.value)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setRepository(e.target.value), 1000)
      }} />
      <Avatar fallback={
        <Text color='pink' style={{
          ...FontHachiMaruPop,
          textTransform: 'none',
        }}>
          Cooling down...
        </Text>
      } src={
        `https://opengraph.githubassets.com/5646866ce296c2c5516afb70c27af222ca848b52e20b39d0f652a107c9556dd6/${repository}`
      } style={{
        width: '50vw',
        height: '25vw',
      }} />
    </Flex>
  )
}
