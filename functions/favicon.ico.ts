import { error } from 'itty-router'
import { Env } from '@/app/internal/env'

const key = 'Icons/op2.png'

export const onRequest: PagesFunction<Env> = async ({ env }) => {
  const item = await env.NEKO03_ASSETS.get(key)
  if (item === null) return error(404)
  const headers = new Headers()
  item.writeHttpMetadata(headers)
  return new Response(item.body, { headers })
}
