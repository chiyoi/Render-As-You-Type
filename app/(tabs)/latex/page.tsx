'use client'
import { useState } from 'react'
import Latex from 'react-latex-next'
import { Text, Heading, TextArea } from '@radix-ui/themes'


export default () => {
  const [formula, setFormula] = useState('')
  return (
    <>
      <Heading>LaTeX</Heading>
      <TextArea autoFocus mt='3' size='3' placeholder='Input formula...' value={formula} onChange={
        e => setFormula(e.target.value)
      } />
      <Text mt='3'>
        <Latex>{formula}</Latex>
      </Text>
    </>
  )
}
