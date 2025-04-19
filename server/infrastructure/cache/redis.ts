import { frJSON, toJSON } from "@s/infrastructure/db/Mappers"
import Redis from "ioredis"

export const redis = new Redis({
  host: "127.0.0.1",
  port: 6379
})

redis.on('connect', () => console.log('REDIS CONNECT...'))

export const setCache = async <T>(key: string, data: T): Promise<T> => {
  await redis.set(key, toJSON(data))
  console.log('КЭШ УСТАНОВЛЕН')
  return data
  
}

export const getCahce = async <T>(key: string): Promise<T | null> => {
  console.log('КЭШ ПОЛУЧЕН')
  return frJSON<T>(await redis.get(key))
}


export const tryToTakeCache = async <T>(key: string, whatDoing: () => T): Promise<T> => {
  const cache = await getCahce<T>(key)

  if (cache) {
    return cache
  }

  const result = whatDoing()
  await setCache(key, result)
  return result
}
