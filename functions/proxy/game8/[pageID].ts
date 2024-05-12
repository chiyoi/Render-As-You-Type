import { Env } from '../../common/env'

const endpoint = 'https://game8.jp/atsumare-doubutsunomori'

export const onRequest: PagesFunction<Env> = async ({ params }) => {
  const { pageID } = params
  return fetch(`${endpoint}/${pageID}`)
}
