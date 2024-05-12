import { StatusError, json } from 'itty-router'
import { z } from 'zod'

import { Env } from '@/functions/common/env'

const endpoint = 'https://serpapi.com/search?engine=google_images'

export const onRequest: PagesFunction<Env> = async ({ params }) => {
  const { query } = params
  const response = await fetch(`${endpoint}&q=${query}`)
  if (!response.ok)
    throw new StatusError(response.status, await response.text())
  return json(Response.parse(response.json())['images_results'].map(x => x.thumbnail).slice(0, 20))
}

const Response = z.object({
  'images_results': z.array(z.object({
    'thumbnail': z.string(),
  }))
})
