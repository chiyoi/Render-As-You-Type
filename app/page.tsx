'use client'
import { useState } from 'react'
import Latex from 'react-latex-next'
import { Flex, Heading, TextArea } from '@radix-ui/themes'

export default function Page() {
  const [formula, setFormula] = useState('')
  return (
    <Flex mx='auto' align='center' mb='auto' gap='3' direction='column'>
      <Heading align='center'>LaTeX</Heading>
      <TextArea size='3' placeholder='Input formula...' value={formula} onChange={e => setFormula(e.target.value)} style={{ width: '50vw' }} />
      <Latex>{formula}</Latex>
    </Flex>
  )
}
