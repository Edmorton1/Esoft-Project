import { tables, Tables, TablesPost } from "@t/gen/types"
import { cacheEdit, cacheGet } from "@s/infrastructure/redis/cache"
import db from "@s/infrastructure/db/db"
import bcrypt from "bcrypt"
import { checkFirstType, fieldsToArr, getCheckWord } from "@s/infrastructure/db/SQL/utils"
import logger from "../../../helpers/logger"
import { Form } from "@t/gen/Users"
import { SALT } from "@shared/CONST"
import { requestToFormManyParams, requestToFormParams, standartToForm } from "@s/infrastructure/db/SQL/SQLform"

logger.info('asdsdadas')
const fieldsKey = (fields?: string) => `${fields ? '--fields: ' + fields : ''}`

// ПРИНИМАЕТ ТОЛЬКО ID
interface Ioptions {
  infinitPagination: {
    cursor: number
    limit: number
    orderBy: "asc" | "desc"
  }
}

class ORM {
  // get = async <T extends tables>(table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
  get = async <T extends tables>(table: T, fields?: string): Promise<Tables[T][]> => {
    logger.info("GET", 'fields', fields)
    logger.info("get", table, fields)

    const key = `${table}${fieldsKey(fields)}`
    
    let query = db(table).select(fieldsToArr(fields, table));

    if (table === 'forms') {
      query = standartToForm(fields)
    }

    logger.info('fields in orm', fields)

    const total = await cacheGet<Tables[T][]>(key, query)
    return checkFirstType(total, table, fields)
  }
  // getById = async <T extends tables>(id: number | string, table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
  getById = async <T extends tables>(id: number | string, table: T, fields?: string): Promise<Tables[T][]> => {
    logger.info('GET BY ID')
    logger.info({table, fields}, "getById")

    const key = `${table}-id-${id}${fieldsKey(fields)}`

    let query = db(table).select(fieldsToArr(fields, table)).where('id', '=', id);
    
    if (table === 'forms') {

      logger.info("[FORMS]: ЗАПРОС К ФОРМЕ")
      const params = {id: Number(id)}

      query = requestToFormParams(params, fields)
      logger.info("TO NATIVE", query.toSQL().toNative())
    }

    logger.info('check type', await cacheGet(key, query), table)
    const total = await cacheGet<Tables[T][]>(key, query)

    return checkFirstType(total, table, fields)
  }
  
  // ПОКА ОПЦИИ К ФОРМЕ НЕ РАБОТАЮТ
  getByParams = async <T extends tables>(params: Partial<Tables[T]>, table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
    logger.info("GET BY PARAMS")
    logger.info("getByParams", params, table, fields)

    const key = `${table}-${Object.entries(params).flat().join("-")}${fieldsKey(fields)}`

    logger.info(params, 'params')

    let query = db(table).select(fieldsToArr(fields, table)).where(params);

    if (table === 'forms') {
      query = requestToFormParams(params, fields)
    } else if (options?.infinitPagination && options?.infinitPagination.cursor >= 0 && options.infinitPagination.limit) {
      const settings = options.infinitPagination
      query = query
        .limit(settings.limit)
        .andWhere("id", settings.orderBy === "asc" ? ">" : "<", settings.cursor)
        .orderBy("id", settings.orderBy)
    }
    
    logger.info('fields in orm', fields)
    const total = await cacheGet<Tables[T][]>(key, query)

    return checkFirstType(total, table, fields)
  }

  // ПОКА БУДЕТ ТОЛЬКО К ФОРМЕ
  getManyParams = async (params: any[], fields?: string): Promise<Form[]> => {
    // const parsedFields = fieldsToArr(fields, 'forms')
    const request = await requestToFormManyParams({name: "id", params}, fields)
    
    return request
  }
  
  post = async <T extends tables>(dto: TablesPost[T], table: T, fields?: string): Promise<Tables[T][]> => {
    logger.info({table, fields, dto})
    
    if (typeof dto === 'object' && "password" in dto && typeof dto.password === "string") {
      const hashed = await bcrypt.hash(dto.password, SALT)
      // dto.password = hashed as Tables[T][keyof Tables[T]]
      dto.password = hashed
    }
    if (typeof dto === 'object' && 'location' in dto && typeof dto.location?.lat === 'number' && typeof dto.location?.lng === 'number') {
      const {lng, lat} = dto.location
      const pointWKT = `POINT(${lng} ${lat})`;
      const parsedKnex = db.raw(`ST_GeomFromText(?, 4326)`, [pointWKT])
      // СЮДА ПОТОМ ДОБАВИТЬ LOCATION PARSER
      //@ts-ignore
      dto.location = parsedKnex
    }
    const parsedFields = fieldsToArr(fields, table)

    const request = await db(table).insert(dto).returning(parsedFields)
    
    // logger.info({request, parsedFields})

    cacheEdit(table, request)
    checkFirstType(request, table, fields)

    return request
  }

  // ПОКА БУДЕТ ТОЛЬКО НА ТЭГАХ
  postArr = async <T extends tables>(dto: TablesPost[T][], table: T, removeOld: number = 0): Promise<Tables[T][]> => {

    if (removeOld > 0) {
      await db.delete().from('user_tags').where('id', '=', removeOld)
    }

    const request = await db(table).insert(dto).onConflict(Object.keys(dto[0])).merge().returning("*")
    // ПОТОМ ПРОВЕРИТЬ КЭШИ

    cacheEdit(table, request)

    return request
  }

  put = async <T extends tables>(dto: Partial<Tables[T]>, id: number | string, table: T, userid: number, fields?: string): Promise<Tables[T][]> => {
    logger.info({table, id, dto, method: "PUT"})

    const checkWord = getCheckWord(table)

    const parsedFields = fieldsToArr(fields, table)

    const request = await db(table).where("id", '=', id).andWhere(checkWord, "=", userid).update(dto).returning(parsedFields)
    logger.info({request})

    cacheEdit(table, request)
    checkFirstType(request, table, fields)

    return request
  }

  delete = async <T extends tables>(id: number | string, table: T, userid: number): Promise<Tables[T][]> => {
    // logger.info("delete", id, table)

    const checkWord = getCheckWord(table)
    
    const query = db(table).where("id", "=", id).andWhere(checkWord, "=", userid).delete().returning("*")
    logger.info({DELETE_QUERY: query.toSQL().toNative()})
    const request = await query
    
    cacheEdit(table, request, 'delete')
    return request
  }
}

export default ORM