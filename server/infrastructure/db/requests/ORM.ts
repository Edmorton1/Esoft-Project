import { tables, Tables, TablesPost } from "@t/gen/types"
import { cacheEdit, cacheGet } from "@s/infrastructure/cache/redis"
import {db} from "@s/infrastructure/db/db"
import bcrypt from "bcrypt"
import { checkFirstType, fieldsToArr } from "@s/infrastructure/db/requests/utils"
import requestToForm from "@s/infrastructure/db/requests/formKNEX"
import { getSchemaByTable } from "@t/shared/sharedTypes"

interface SQLParams {
  offset: number,
  limit: number
}
// SQLParams - это limit offset
const fieldsKey = (fields?: string, sqlparams?: string) => `${fields ? '--fields: ' + fields : ''}${sqlparams ? '--sqlparams: ' + sqlparams : ''}`

class ORM {
  get = async <T extends tables>(table: T, fields?: string, sqlparams?: string): Promise<Tables[T][]> => {
    console.log("GET", 'fields', fields)
    console.log("get", table, fields, sqlparams)

    // const sql = toArr(sqlparams) || ''

    const key = `${table}${fieldsKey(fields, sqlparams)}`
    
    let callback = undefined;

    if (table === 'forms') {
      callback = async () => await requestToForm(fields)
    } else {
      callback = async () => await db(table)
    }

    console.log('fields in orm', fields)
    const total = await cacheGet(key, callback)
    return checkFirstType(total, table, fields)
  }
  getById = async <T extends tables>(id: number | string, table: T, fields?: string, sqlparams?: string): Promise<Tables[T][]> => {
    console.log("GET BY ID")
    console.log("getById", table, fields, sqlparams)

    // const sql = toArr(sqlparams) || ''
    const key = `${table}-id-${id}${fieldsKey(fields)}`

    let callback = undefined;
    
    if (table === 'forms') {
      const params = {id: Number(id)}
      callback = async () => await requestToForm(fields, params)
    } else {
      callback = async () => await db(table).select(fieldsToArr(fields)).where('id', '=', id)
    }

    console.log('check type', await cacheGet(key, callback), table)
    const total = await cacheGet(key, callback)

    return checkFirstType(total, table, fields)
  }
  
  getByParams = async <T extends tables>(params: Partial<Tables[T]>, table: T, fields?: string, sqlparams?: string): Promise<Tables[T][]> => {
    console.log("GET BY PARAMS")
    console.log("getByParams", params, table, fields, sqlparams)

    // const sql = toArr(sqlparams) || ''

    const key = `${table}-${Object.entries(params).flat().join("-")}${fieldsKey(fields)}`
    console.log(params, 'params')

    let callback = undefined;

    if (table === 'forms') {
      callback = async () => requestToForm(fields, params)
    } else {
      callback = async () => await db(table).select(fieldsToArr(fields)).where(params)
    }
    
    console.log('fields in orm', fields)
    const total = await cacheGet(key, callback)

    return checkFirstType(total, table, fields)
  }

  post = async <T extends tables>(dto: TablesPost[T], table: T, fields?: string): Promise<Tables[T][]> => {
    // console.log("post", table, fields, dto)
    if (typeof dto === 'object' && "password" in dto && typeof dto.password === "string") {
      const hashed = await bcrypt.hash(dto.password, 3)
      // dto.password = hashed as Tables[T][keyof Tables[T]]
      dto.password = hashed
    }
    
    const request = await db(table).insert(dto).returning(fieldsToArr(fields).length > 0 ? fieldsToArr(fields) : '*')

    cacheEdit(table, request)
    checkFirstType(request, table)

    return request
  }

  // ПОКА БУДЕТ ТОЛЬКО НА ТЭГАХ
  postArr = async <T extends tables>(dto: TablesPost[T][], table: T, onConflictDoNothing: boolean = false, fields?: string): Promise<Tables[T][]> => {

    const request = await db(table).insert(dto).onConflict(Object.keys(dto[0])).merge().returning("*")
    // ПОТОМ ПРОВЕРИТЬ КЭШИ

    cacheEdit(table, request)

    return request
  }

  put = async <T extends tables>(dto: Partial<Tables[T]>, id: number | string, table: T): Promise<Tables[T][]> => {
    // console.log("put", table, id, dto)

    const request = await db(table).where("id", '=', id).update(dto).returning("*")

    cacheEdit(table, request)
    checkFirstType(request, table)

    return request
  }

  delete = async <T extends tables>(id: number | string, table: T): Promise<Tables[T][]> => {
    // console.log("delete", id, table)

    const request = await db(table).where("id", "=", id).delete().returning("*")
    
    cacheEdit(table, request, 'delete')
    return request
  }
}

export default new ORM