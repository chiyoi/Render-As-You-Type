'use client'
import { useState } from 'react'
import Latex from 'react-latex-next'
import { Text, Heading, TextArea } from '@radix-ui/themes'

import { FontNotoSansMono } from '../../common/fonts'

export default () => {
  const [formula, setFormula] = useState('')
  return (
    <>
      <Heading style={{ ...FontNotoSansMono }}>LaTeX</Heading>
      <TextArea mt='3' size='3' placeholder='Input formula...' value={formula} onChange={
        e => setFormula(e.target.value)
      } style={
        FontNotoSansMono
      } />
      <Text mt='3'>
        <Latex>{formula}</Latex>
      </Text>
    </>
  )
}
