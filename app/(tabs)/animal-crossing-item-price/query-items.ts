import { useQueryText } from '@/app/common/hooks'
import { z } from 'zod'

export const useQueryItems = (inputs: QueryItemsInput[]) => {
  let items: z.infer<typeof Item>[] = []
  const errors: (Error | null)[] = []
  let success = true
  for (const input of inputs) {
    const [data, status] = useQueryText(`/proxy/game8/${input.pageID}`)
    if (status === 'error')
      errors.push(data)
    else if (status === 'loading')
      success = false
    else {
      const parser = new DOMParser()
      const doc = parser.parseFromString(data, 'text/html')
      items = items.concat([...doc.getElementsByTagName('tr')]
        .map(a => Item.safeParse({
          name: a.querySelector('img')?.nextSibling?.textContent?.trim(),
          price: a.querySelector(`td:nth-child(${input.priceColumn})`)?.textContent
        }))
        .map(x => x.success && x.data)
        .filter((x): x is z.infer<typeof Item> => x !== false)
        .filter(x => x && /\d/.test(x.price))
      )
    }
  }
  return { items, errors, success }
}

export type QueryItemsInput = {
  pageID: string,
  priceColumn: number,
}

export const Item = z.object({
  name: z.string().min(1),
  price: z.string(),
})
