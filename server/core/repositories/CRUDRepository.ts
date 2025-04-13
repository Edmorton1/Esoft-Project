import { tables, Tables } from "@s/core/domain/types"
import pool from "@s/infrastructure/db/db"
import { toTS } from "@s/infrastructure/db/Mappers"
import bcrypt from "bcrypt"
// interface CRUDRepositoryInterface {
//   get(table: tables): Promise<Tables[] | Tables>,
//   getById(id: string | number, table: tables): Promise<Tables>
//   post(dto: any, table: tables): Promise<Tables[] | Tables>,
//   put(dto: any, id: number | string, table: tables): Promise<Tables[] | Tables>,
//   delete(id: number | string, table: tables): Promise<Tables[] | Tables>
// }

export class CRUDRepository {
  async get<T extends tables>(table: T): Promise<Tables[T]> {
    const request = toTS(await pool.query(`SELECT * FROM ${table}`))
    return request
  }
  async getById<T extends tables>(id: number | string, table: T): Promise<Tables[T]> {
    const request = toTS(await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]))
    return request
  }

  async getByParams<T extends tables>(param: Partial<Tables[T]>, table: T): Promise<Tables[T]> {
    // const keys = Object.keys(param)
    // const values = Object.values(param)
    const [values, asnwers] = toSQLWhere(param)
    const request = toTS(await pool.query(`SELECT * FROM ${table} WHERE ${asnwers}`, [...values]))
    return request
  }

  async post<T extends tables>(dto: Partial<Tables[T]>, table: T): Promise<Tables[T]> {
    if ("password" in dto && typeof dto.password == "string") {
      const hashed = await bcrypt.hash(dto.password, 3)
      dto.password = hashed as Tables[T][keyof Tables[T]]
    }
    const [keys, values, asnwers] = toSQLPost(dto)
    const request = toTS(await pool.query(`INSERT INTO ${table} (${keys}) VALUES(${asnwers}) RETURNING *`, [...values]))
    return request
  }

  async put<T extends tables>(dto: Partial<Tables[T]>, id: number | string, table: T): Promise<Tables[T]> {
    const [values, asnwers] = toSQLPut(dto)
    const request = toTS(await pool.query(`UPDATE ${table} SET ${asnwers} WHERE id = ${id} RETURNING *`, [...values]))
    return request
  }

  async delete<T extends tables>(id: number | string, table: T): Promise<Tables[T]> {
    console.log(id, table)
    const request = toTS(await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]))
    return request
  }
}

function toSQLPost(props: any) {
  const keys = Object.keys(props).join(', ')
  const values = Object.values(props)
  const asnwers = values.map((e, i) => `$${i + 1}`).join(', ')
  return [keys, values, asnwers]
}

function toSQLPut(props: any) {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const asnwers = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
  return [values, asnwers]
}

function toSQLWhere(props: any) {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const asnwers = keys.map((e, i) => (`${e} = $${i + 1} and`)).join(' ').slice(0, -4)
  return [values, asnwers]
}