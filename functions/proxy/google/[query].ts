import { Env } from '../../common/env'

const endpoint = 'https://www.google.com/search'

export const onRequest: PagesFunction<Env> = async ({ params }) => {
  const { query } = params
  return fetch(`${endpoint}?udm=2&q=${query}`)
}
