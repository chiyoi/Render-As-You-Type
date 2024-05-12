'use client'
import { useMemo } from 'react'
import { Avatar, Grid, Heading, IconButton, Text, TextField } from '@radix-ui/themes'
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'

import { useDelayedState, useFocus, useQueryText } from '@/app/common/hooks'
import { HachiMaruPop } from '@/app/common/fonts'

export default () => {
  const [queryBuffer, query, setQuery] = useDelayedState('', 1000)
  const [inputRef, focusInput] = useFocus()
  const clear = () => {
    setQuery('')
    focusInput()
  }

  const [data, status] = useQueryText(`/proxy/google/${query}`)
  const images = useMemo(() => {
    if (status !== 'success') return
    const parser = new DOMParser()
    const dom = parser.parseFromString(data, 'text/html')
    return [...dom.querySelectorAll('img')]
      .filter(x => x.src.startsWith('https'))
      .map(x => x.src)
  }, [data, status])

  if (status === 'error') return (
    <>
      <Text as='div'>Something bad happened. Refreshing the page might help.</Text>
      <Text as='div'>Error message: {data.message}</Text>
    </>
  )
  return (
    <>
      <Heading>Quick Look</Heading>
      <Text mt='3' size='1' as='div'>Got some unfamiliar words? Have a quick look by searching images on Google.</Text>
      <TextField.Root autoFocus ref={inputRef} mt='3' size='3' placeholder='Input query...' value={queryBuffer} onChange={e => {
        setQuery(e.target.value)
      }} onKeyDown={e => {
        if (e.key === 'Escape') clear()
      }}>
        <TextField.Slot>
          <MagnifyingGlassIcon />
        </TextField.Slot>
        <TextField.Slot>
          <IconButton size='2' variant='ghost' onClick={clear}>
            <Cross2Icon />
          </IconButton>
        </TextField.Slot>
      </TextField.Root>
      {status === 'success' ? (
        <Grid mt='3' columns='4' gap='1'>
          {images?.map(x => (
            <Avatar radius='small' src={x} fallback={
              <Text color='pink' style={HachiMaruPop.style}>
                Image Lost...
              </Text>
            } style={{
              width: 'max-content',
              height: 'max-content',
            }} />
          ))}
        </Grid>
      ) : (
        <Text mt='3' as='div'>Loading...</Text>
      )}
    </>
  )
}
