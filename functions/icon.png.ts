import { error } from 'itty-router'
import { Env } from './common/env'

const key = 'Icons/op2.png'

export const onRequest: PagesFunction<Env> = async ({ env }) => {
  const { assets } = env
  const item = await assets.get(key)
  if (item === null) return error(404)
  const headers = new Headers()
  item.writeHttpMetadata(headers)
  return new Response(item.body, { headers })
}
