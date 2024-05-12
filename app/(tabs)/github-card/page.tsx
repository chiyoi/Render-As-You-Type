'use client'
import { Heading, TextArea, Text, Avatar } from '@radix-ui/themes'
import { HachiMaruPop } from '@/app/common/fonts'
import { useDelayedState } from '@/app/common/hooks'

export default () => {
  const [repositoryBuffer, repository, setRepository] = useDelayedState('', 1000)
  return (
    <>
      <Heading>Github Card</Heading>
      <TextArea autoFocus mt='3' size='3' placeholder='Input repository path...' value={repositoryBuffer} onChange={e => {
        setRepository(e.target.value)
      }} style={{
        width: '100%',
      }} />
      <Avatar mt='3' fallback={
        <Text color='pink' style={HachiMaruPop.style}>
          ERROR...
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
