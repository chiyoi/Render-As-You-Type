import Image from 'next/image'
import { FontHachiMaruPop, FontNotoSansMono } from '@/app/internal/fonts'
import { Flex, Heading, TextArea, Text } from '@radix-ui/themes'
import { useRef, useState } from 'react'

export default () => {
  const [repositoryBuffer, setRepositoryBuffer] = useState('')
  const [repository, setRepository] = useState('')
  const [loading, setLoading] = useState(true)
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
        timer.current = setTimeout(() => {
          setLoading(true)
          setRepository(e.target.value)
        }, 1000)
      }} />
      <Image width={1200} height={600} alt={repository} onLoad={() => {
        setLoading(false)
      }} src={
        `https://opengraph.githubassets.com/5646866ce296c2c5516afb70c27af222ca848b52e20b39d0f652a107c9556dd6/${repository}`
      } style={{
        width: '50vw',
        height: '25vw',
      }} />
      {loading && <Text color='pink' style={FontHachiMaruPop}>Loading...</Text>}
    </Flex>
  )
}
