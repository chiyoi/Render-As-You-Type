'use client'
import { useState } from 'react'
import Latex from 'react-latex-next'
import { Flex, Heading, TextArea } from '@radix-ui/themes'
import { FontNotoSansMono } from '@/app/internal/fonts'

export default () => {
  const [formula, setFormula] = useState('')
  return (
    <Flex mt='9' mx='auto' align='center' mb='auto' gap='3' direction='column'>
      <Heading align='center' style={{ ...FontNotoSansMono }}>LaTeX</Heading>
      <TextArea size='3' placeholder='Input formula...' value={formula} onChange={
        e => setFormula(e.target.value)
      } style={{
        ...FontNotoSansMono,
        width: '50vw',
      }} />
      <Latex>{formula}</Latex>
    </Flex>
  )
}
