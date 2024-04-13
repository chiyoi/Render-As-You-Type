import { useQuery } from '@tanstack/react-query'
import { z } from 'zod'

export const useQueryItems = (inputs: QueryItemsInput[]) => {
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

export type QueryItemsInput = {
  pageID: string,
  priceColumn: number,
}


export const Item = z.object({
  name: z.string().min(1),
  price: z.string(),
})
