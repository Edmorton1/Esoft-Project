import { tables, Tables } from "@s/core/domain/types"
import pool from "@s/infrastructure/db/db"
import { toTS } from "@s/infrastructure/db/UserMapper"

interface CRUDRepositoryInterface {
  get(table: tables): Promise<Tables[]>,
  post(dto: Tables, table: tables): Promise<Tables[]>,
  put(dto: Tables, id: number | string, table: tables): Promise<Tables[]>,
  delete(id: number | string, table: tables): Promise<Tables[]>
}

export class CRUDRepository implements CRUDRepositoryInterface {
  async get(table: tables) {
    const request = toTS(await pool.query(`SELECT * FROM ${table}`))
    return request
  }

  async post(dto: Tables, table: tables) {
    const [keys, values, asnwers] = toSQLPost(dto)
    const request = toTS(await pool.query(`INSERT INTO ${table} (${keys}) VALUES(${asnwers}) RETURNING *`, [...values]))
    return request
  }

  async put(dto: Tables, id: number | string, table: tables) {
    const [values, asnwers] = toSQLPut(dto)
    const request = toTS(await pool.query(`UPDATE ${table} SET ${asnwers} WHERE id = ${id} RETURNING *`, [...values]))
    return request
  }

  async delete(id: number | string, table: tables) {
    const request = toTS(await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]))
    return request
  }
}

function toSQLPost(props: Tables) {
  const keys = Object.keys(props).join(', ')
  const values = Object.values(props)
  const asnwers = values.map((e, i) => `$${i + 1}`).join(', ')
  console.log(keys, values, asnwers)
  return [keys, values, asnwers]
}

function toSQLPut(props: Tables) {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const asnwers = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
  console.log(keys, values, asnwers)
  return [values, asnwers]
}