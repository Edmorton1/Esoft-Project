import { tables, Tables } from "@s/core/domain/types"
import { cacheEdit, cacheGet } from "@s/infrastructure/cache/redis"
import pool from "@s/infrastructure/db/db"
import { toArr, toTS } from "@shared/MAPPERS"
import bcrypt from "bcrypt"
import { checkForms } from "./ORMForms"
import { toSQLPost, toSQLPut, toSQLWhere } from "@s/infrastructure/db/requests/SQLparsers"
// interface CRUDRepositoryInterface {
//   get(table: tables): Promise<Tables[] | Tables>,
//   getById(id: string | number, table: tables): Promise<Tables>
//   post(dto: any, table: tables): Promise<Tables[] | Tables>,
//   put(dto: any, id: number | string, table: tables): Promise<Tables[] | Tables>,
//   delete(id: number | string, table: tables): Promise<Tables[] | Tables>
// }

interface SQLParams {
  offset: number,
  limit: number
}

const fieldsKey = (fields?: string, sqlparams?: string) => `${fields ? '--fields: ' + fields : ''}${sqlparams ? '--sqlparams: ' + sqlparams : ''}`
const fieldsSelect = (fields: string | undefined) => `${fields ? fields : '*'}`

class ORM {
  async get<T extends tables>(table: T, fields?: string, sqlparams?: string): Promise<Tables[T][]> {
    // console.log("get", table, fields, sqlparams)

    const sql = toArr(sqlparams) || ''

    const key = `${table}${fieldsKey(fields, sqlparams)}`

    const callback = checkForms(table, async () => toTS<T>(await pool.query(`SELECT ${fieldsSelect(fields)} FROM ${table} ${sql}`)), fields, undefined, undefined, sqlparams)
    return cacheGet(key, callback)
  }
  async getById<T extends tables>(id: number | string, table: T, fields?: string, sqlparams?: string): Promise<Tables[T][]> {
    // console.log("getById", table, fields, sqlparams)

    const sql = toArr(sqlparams) || ''
    const key = `${table}-id-${id}${fieldsKey(fields)}`

    const callback = checkForms(table, async () => toTS<T>(await pool.query(`SELECT ${fieldsSelect(fields)} FROM ${table} WHERE id = $1 ${sql}`, [id])), fields, id, undefined, sqlparams)
    return await cacheGet(key, callback)
  }
  
  async getByParams<T extends tables>(params: Partial<Tables[T]>, table: T, fields?: string, sqlparams?: string): Promise<Tables[T][]> {
    // console.log("getByParams", params, table, fields, sqlparams)

    const [values, and] = toSQLWhere(params)
    console.log("TOSQL", values, and)

    const sql = toArr(sqlparams) || ''
    const key = `${table}-${Object.entries(params).flat().join("-")}${fieldsKey(fields)}`

    // console.log(`SELECT ${fieldsSelect(fields)} FROM ${table} WHERE ${and} ${sql}`)
    const callback = checkForms(table, 
      async () => {
        try {
          return toTS<T>(await pool.query(`SELECT ${fieldsSelect(fields)} FROM ${table} WHERE ${and} ${sql}`, [...values]))
        } catch(err) {
          console.log(err)
          return []
        }
      }, fields, undefined, params, sqlparams)
    return cacheGet(key, callback)
  }

  async post<T extends tables>(dto: Partial<Tables[T]>, table: T, fields?: string): Promise<Tables[T][]> {
    // console.log("post", table, fields, dto)
    if ("password" in dto && typeof dto.password == "string") {
      const hashed = await bcrypt.hash(dto.password, 3)
      dto.password = hashed as Tables[T][keyof Tables[T]]
    }
    
    const [keys, values, dollars] = toSQLPost(dto)
    console.log(`INSERT INTO ${table} (${keys}) VALUES(${dollars}) RETURNING *`, values)
    const request =  toTS<T>(await pool.query(`INSERT INTO ${table} (${keys}) VALUES(${dollars}) RETURNING ${fieldsSelect(fields)}`, [...values]))

    cacheEdit(table, request)

    return request
  }

  async put<T extends tables>(dto: Partial<Tables[T]>, id: number | string, table: T): Promise<Tables[T][]> {
    // console.log("put", table, id, dto)
    const [values, dollars] = toSQLPut(dto)
    const request = toTS<T>(await pool.query(`UPDATE ${table} SET ${dollars} WHERE id = ${id} RETURNING *`, [...values]))

    cacheEdit(table, request)
    return request
  }

  async delete<T extends tables>(id: number | string, table: T): Promise<Tables[T][]> {
    // console.log("delete", id, table)
    const request = toTS<T>(await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]))
    
    cacheEdit(table, request, 'delete')
    return request
  }
}

export default new ORM