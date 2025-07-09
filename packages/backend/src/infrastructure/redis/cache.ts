import { redisClient } from "@app/server/infrastructure/redis/redis"
import logger from "@app/server/helpers/logger/logger"
import { frJSON, toJSON } from "@app/shared/MAPPERS"
import { tables } from "@app/types/gen/types"
import { Knex } from "knex"

export const setCache = async <T>(key: string, data: T): Promise<T> => {
  // FIXME: ДОБАВИТЬ КЭШ В БУДУЩЕМ
  // await redisClient.set(key, toJSON(data))

  // logger.info(data)
  return data
  
}

export const getCahce = async <T>(key: string): Promise<T | undefined> => {
  const raw = await redisClient.get(key)
  if (typeof raw === 'string') {
    return frJSON<T>(raw)
  } return undefined
}

export const cacheGet = async <T>(key: string, callback: Knex.QueryBuilder<any>): Promise<T> => {
  // logger.info ('SCANING REDIS', (await redis.scan(0, 'MATCH', `*149*`, 'COUNT', 1000))[1].filter(e => e.includes('forms') || e.includes('user_tags')))
  // if (key.includes('tokens')) {
  //   return await callback()
  // }
  const cache = await getCahce<T>(key)
  // logger.info(cache)

  if (cache) {
    return cache
  }

  const result = await callback
  // logger.info(result)
  await setCache(key, result)
  return result
}

// export const cacheSet = async (table: tables, request: Knex.QueryBuilder<any>, type: 'edit' | 'delete'): Promise<void> => {
export const cacheSet = async (table: tables, request: any, type: 'edit' | 'delete'): Promise<void> => {
  if ((request && request.length > 0 && Object.keys(request).length > 0)) {
    // FIXME: ДОБАВИТЬ КЭШ В БУДУЩЕМ
    
    // // logger.info('cache ------- ', table, request, type)
    // const searchTerms = Object.entries(request[0]).map(e => e.join('-'));
    // const dataDelete = (await redisClient.scan(0, 'MATCH', `${table}-*`, 'COUNT', 1000))[1].filter(key => searchTerms.some(term => key.includes(term)))
    // logger.info(dataDelete)
    // redisClient.del(table)
    // dataDelete.length > 0 && redisClient.del(dataDelete)
    // // if (type == 'edit' && (table !== 'forms' && table !== 'user_tags')) {    - не работает
    // if (type === 'edit') {
    //   const key = `${table}-id-${request[0].id}`
    //   setCache(key, request)
    // }
    // if (table === 'forms' || table === 'user_tags') {
    //   logger.info("УДАЛЕНИЕ ТЭГОВ", request[0].id)
    //   const bad = (await redisClient.scan(0, 'MATCH', `*${request[0].id}*`, 'COUNT', 1000))[1].filter(e => e.includes('forms') || e.includes('user_tags'))
    //   bad.forEach(async e => await redisClient.del(e))
    // }
  } else {
    logger.info(`КЭШ НЕ ЗАКЕШИРОВАН ПУСТ ${table} ${request} ${type}`)
    return
  }
}

