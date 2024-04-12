'use client'
import { useRef, useState } from 'react'
import { Heading, TextArea, Text, Avatar } from '@radix-ui/themes'

import { FontHachiMaruPop, FontNotoSansMono } from '../../common/fonts'

export default () => {
  const [repositoryBuffer, setRepositoryBuffer] = useState('')
  const [repository, setRepository] = useState('')
  let timer = useRef<ReturnType<typeof setTimeout>>()
  return (
    <>
      <Heading style={{ ...FontNotoSansMono }}>Github Card</Heading>
      <TextArea mt='3' size='3' placeholder='Input repository path...' value={repositoryBuffer} style={{
        ...FontNotoSansMono,
        width: '100%',
      }} onChange={e => {
        setRepositoryBuffer(e.target.value)
        clearTimeout(timer.current)
        timer.current = setTimeout(() => setRepository(e.target.value), 1000)
      }} />
      <Avatar mt='3' fallback={
        <Text color='pink' style={FontHachiMaruPop}>
          カード逃げた...
        </Text>
      } src={
        `https://opengraph.githubassets.com/5646866ce296c2c5516afb70c27af222ca848b52e20b39d0f652a107c9556dd6/${repository}`
      } style={{
        width: '50vw',
        height: '25vw',
      }} />
    </>
  )
}
