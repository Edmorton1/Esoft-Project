import { tables } from "@t/gen/types"
import { frJSON, toJSON } from "@shared/MAPPERS"
import Redis from "ioredis"

export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379
})

redis.on('connect', () => console.log('REDIS CONNECT...'))

export const setCache = async <T>(key: string, data: T): Promise<T> => {
  await redis.set(key, toJSON(data))
  // console.log(data)
  return data
  
}

export const getCahce = async <T>(key: string): Promise<T | undefined> => {
  const raw = await redis.get(key)
  if (typeof raw === 'string') {
    return frJSON<T>(raw)
  } return undefined
}


export const cacheGet = async <T>(key: string, callback: () => Promise<T>): Promise<T> => {
  // console.log ('SCANING REDIS', (await redis.scan(0, 'MATCH', `*149*`, 'COUNT', 1000))[1].filter(e => e.includes('forms') || e.includes('user_tags')))
  if (key.includes('tokens')) {
    return await callback()
  }
  const cache = await getCahce<T>(key)
  // console.log(cache)

  if (cache) {
    return cache
  }

  const result = await callback()
  // console.log(result)
  await setCache(key, result)
  return result
}

export const cacheEdit = async (table: tables, request: any, type: 'edit' | 'delete' = 'edit'): Promise<void> => {
  if (table != 'tokens' && (request && request.length > 0 && Object.keys(request).length > 0)) {
    // console.log('cache ------- ', table, request, type)
    const searchTerms = Object.entries(request[0]).map(e => e.join('-'));
    const dataDelete = (await redis.scan(0, 'MATCH', `${table}-*`, 'COUNT', 1000))[1].filter(key => searchTerms.some(term => key.includes(term)))
    console.log(dataDelete)
    redis.del(table)
    dataDelete.length > 0 && redis.del(dataDelete)
    // if (type == 'edit' && (table !== 'forms' && table !== 'user_tags')) {    - не работает
    if (type === 'edit') {
      const key = `${table}-id-${request[0].id}`
      setCache(key, request)
    }
    if (table === 'forms' || table === 'user_tags') {
      console.log("УДАЛЕНИЕ ТЭГОВ", request[0].id)
      const bad = (await redis.scan(0, 'MATCH', `*${request[0].id}*`, 'COUNT', 1000))[1].filter(e => e.includes('forms') || e.includes('user_tags'))
      bad.forEach(async e => await redis.del(e))
    }
  } else {
    console.log(`КЭШ НЕ ЗАКЕШИРОВАН ПУСТ ${table} ${request} ${type}`)
    return
  }
}
