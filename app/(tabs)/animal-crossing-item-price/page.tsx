'use client'
import { z } from 'zod'
import { useMemo, useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { Heading, Link, Text, TextArea } from '@radix-ui/themes'
import { toKatakana } from 'wanakana'

import { FontNotoSansMono } from '../../common/fonts'

export default () => {
  const [itemName, setItemName] = useState('')

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
      {errors.filter((x): x is Error => x !== null).map(error => (
        <Text as='div'>Error message: {error.message}</Text>
      ))}
    </>
  )
  if (!success) return (
    <Text as='div'>Loading...</Text>
  )
  return (
    <>
      <Heading style={{ ...FontNotoSansMono }}>Animal Crossing Item Price</Heading>
      <Text mt='3' size='1' as='div'>Check how much does it value for your recently got items. Data from <Link href='https://game8.jp/atsumare-doubutsunomori'>https://game8.jp/atsumare-doubutsunomori</Link>.</Text>
      <TextArea mt='3' size='3' placeholder='Input item name...' value={itemName} onChange={e => {
        setItemName(e.target.value)
      }} style={
        FontNotoSansMono
      } />
      <Text mt='3' as='div' style={FontNotoSansMono}>
        {itemName === '' ? (
          'Input item name...'
        ) : itemsFound.length === 0 ? (
          '(No result~)'
        ) : (itemsFound.map(
          item => <Text as='div'>{item.name}: {item.price}</Text>
        ))}
      </Text>
    </>
  )
}

const useQueryItems = (inputs: QueryItemsInput[]) => {
  let items: z.infer<typeof Item>[] = []
  const errors: (Error | null)[] = []
  let success = true
  for (const input of inputs) {
    const { data, error, isSuccess } = useQuery({
      queryKey: [input.pageID],
      queryFn: async () => {
        const response = await fetch(`/game8-proxy/${input.pageID}`)
        if (!response.ok) throw new Error(`Code ${response.status}`)
        const htmlString = await response.text()
        const parser = new DOMParser()
        const doc = parser.parseFromString(htmlString, 'text/html')
        return [...doc.getElementsByTagName('tr')]
          .map(a => Item.safeParse({
            name: a.querySelector('img')?.nextSibling?.textContent?.trim(),
            price: a.querySelector(`td:nth-child(${input.priceColumn})`)?.textContent
          }))
          .map(x => x.success && x.data)
          .filter((x): x is z.infer<typeof Item> => x !== false)
          .filter(x => x && /\d/.test(x.price))
      }
    })
    items = [...items, ...data ?? []]
    if (error !== null) errors.push(error)
    success = success && isSuccess
  }
  return { items, errors, success }
}

type QueryItemsInput = {
  pageID: string,
  priceColumn: number,
}

const Item = z.object({
  name: z.string().min(1),
  price: z.string(),
})
