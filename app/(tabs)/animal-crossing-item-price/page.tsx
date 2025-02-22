'use client'
import { useMemo, useState } from 'react'
import { Heading, IconButton, Link, Text, TextField } from '@radix-ui/themes'
import { Cross2Icon, MagnifyingGlassIcon } from '@radix-ui/react-icons'
import { toKatakana } from 'wanakana'

import { useFocus } from '@/app/common/hooks'
import { useQueryItems } from '@/app/(tabs)/animal-crossing-item-price/query-items'

export default () => {
  const [itemName, setItemName] = useState('')
  const [inputRef, focusInput] = useFocus()
  const clear = () => {
    setItemName('')
    focusInput()
  }

  const { items, errors, success } = useQueryItems([
    { pageID: '340694', priceColumn: 4 }, // うみのさち
    { pageID: '326139', priceColumn: 4 }, // さかな
    { pageID: '326138', priceColumn: 3 }, // むし
  ])

  const itemsFound = useMemo(
    () => items.filter(x => x.name.startsWith(toKatakana(itemName))),
    [itemName, items],
  )

  if (errors.some(error => error !== null)) return (
    <>
      <Text as='div'>Something bad happened. Refreshing the page might help.</Text>
      {errors.filter((x): x is Error => x !== null).map((error, i) => (
        <Text as='div'>Error {i + 1} message: {error.message}</Text>
      ))}
    </>
  )
  if (!success) return (
    <Text as='div'>Loading...</Text>
  )
  return (
    <>
      <Heading>Animal Crossing Item Price</Heading>
      <Text mt='3' size='1' as='div'>Check how much does it value for your recently got items. Data from <Link href='https://game8.jp/atsumare-doubutsunomori'>https://game8.jp/atsumare-doubutsunomori</Link>.</Text>
      <TextField.Root autoFocus ref={inputRef} mt='3' size='3' placeholder='Input item name...' value={itemName} onChange={
        e => setItemName(e.target.value)
      } onKeyDown={e => {
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
      <Text mt='3' as='div'>
        {itemName === '' ? (
          'Input item name...'
        ) : itemsFound.length === 0 ? (
          '(No result~)'
        ) : (itemsFound.map(item => (
          <Text as='div'>{item.name}: {item.price}</Text>
        )))}
      </Text>
    </>
  )
}
