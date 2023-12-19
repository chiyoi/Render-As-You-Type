'use client'
import { useState } from 'react'
import Latex from 'react-latex-next'
import { Flex, Heading, TextArea } from '@radix-ui/themes'

export default function Page() {
  const [formula, setFormula] = useState('')
  return (
    <Flex mx='auto' mb='auto' gap='2' direction='column' style={{ minWidth: '40vw' }}>
      <Heading align='center'>LaTeX</Heading>
      <TextArea placeholder='Input formula...' value={formula} onChange={e => setFormula(e.target.value)} />
      <Latex>{'$$' + formula + '$$'}</Latex>
    </Flex>
  )
}
