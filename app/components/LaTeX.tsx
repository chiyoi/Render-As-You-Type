import { useState } from 'react'
import Latex from 'react-latex-next'
import { FontNotoSansMono } from '@/app/internal/fonts'
import { Flex, Heading, TextArea } from '@radix-ui/themes'

export default () => {
  const [formula, setFormula] = useState('')
  return (
    <Flex direction='column' m='3' gap='3' align='center' style={{ width: '80vw' }}>
      <Heading style={{ ...FontNotoSansMono }}>LaTeX</Heading>
      <TextArea size='3' placeholder='Input formula...' value={formula} style={{
        ...FontNotoSansMono,
        width: '100%',
      }} onChange={
        e => setFormula(e.target.value)
      } />
      <Latex>{formula}</Latex>
    </Flex>
  )
}
