import { error } from 'itty-router'

import { Env } from '@/functions/common/env'

export const onRequest: PagesFunction<Env> = async ({ next }) => {
  try {
    return await next()
  } catch (err) {
    if (err instanceof Error)
      return error(err)
    return error(new Error(`${err}`))
  }
}
