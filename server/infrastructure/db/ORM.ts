import { tables, Tables } from "@s/core/domain/types"
import { Form } from "@s/core/domain/Users"
import { cacheEdit, cacheGet, redis, setCache } from "@s/infrastructure/cache/redis"
import pool from "@s/infrastructure/db/db"
import { frJSON, toTS } from "@s/infrastructure/db/Mappers"
import bcrypt from "bcrypt"
// interface CRUDRepositoryInterface {
//   get(table: tables): Promise<Tables[] | Tables>,
//   getById(id: string | number, table: tables): Promise<Tables>
//   post(dto: any, table: tables): Promise<Tables[] | Tables>,
//   put(dto: any, id: number | string, table: tables): Promise<Tables[] | Tables>,
//   delete(id: number | string, table: tables): Promise<Tables[] | Tables>
// }

export class ORM {
  async get<T extends tables>(table: T): Promise<Tables[T][]> {
    const key = table
    const callback = async () => toTS<T>(await pool.query(`SELECT * FROM ${table}`))
    return cacheGet(key, callback)
  }
  async getById<T extends tables>(id: number | string, table: T): Promise<Tables[T][]> {
    const key = `${table}-id-${id}`
    const callback = async () => toTS<T>(await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]))
    return await cacheGet(key, callback)
  }
  
  async getByParams<T extends tables>(param: Partial<Tables[T]>, table: T): Promise<Tables[T][]> {
    // try {
    // console.log(param)
    const [values, and] = toSQLWhere(param)
    // console.log(`SELECT * FROM ${table} WHERE ${and}`, [...values])

    const key = `${table}-${Object.entries(param).flat().join("-")}`
    const callback = async () => {
      try {
        return toTS<T>(await pool.query(`SELECT * FROM ${table} WHERE ${and}`, [...values]))
      } catch(err) {
        console.error(err)
        return []
      }
    }
    return cacheGet(key, callback)
    // }
    // catch(err) {
    //   if (err.code === '22P02') {
    //     return []
    //   }
    // }
  }

  async post<T extends tables>(dto: Partial<Tables[T]>, table: T, SQLParam?: string): Promise<Tables[T][]> {
    if ("password" in dto && typeof dto.password == "string") {
      const hashed = await bcrypt.hash(dto.password, 3)
      dto.password = hashed as Tables[T][keyof Tables[T]]
    }
    // if (table === 'forms') {
    //   const request =  toTS<T>(await pool.query(`INSERT INTO ${table} (${keys}) VALUES(${dollars}) ${SQLParam ? SQLParam : ''} RETURNING *`, [...values]))
    // }

    // INSERT INTO forms (name, surname, sex, age, target, description, avatar, city, id, location) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10)  RETURNING * [
      // 'Коля',
      // 'Коля',
      // true,
      // 20,
      // 'Коля',
      // 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque illo voluptatibus distinctio inventore officiis quisquam aspernatur fuga voluptatum assumenda dicta similique maxime, quia vel dolore! Soluta error reprehenderit sint voluptatibus?',
      // {},
      // '',
      // 75,
      // { lng: 30.2713058, lat: 60.0449033 }
    // ]

//     INSERT INTO forms (name, surname, sex, age, target, description, avatar, city, id, location) values(
//       'Коля',
//       'Коля',
//       true,
//       20,
//       'Коля',
//       'Lorem',
//       null,
//       'takes',
//       75,
//       ST_SetSRID(ST_MakePoint(30.2713058, 60.0449033), 4326)
// )
    const [keys, values, dollars] = toSQLPost(dto)
    console.log(`INSERT INTO ${table} (${keys}) VALUES(${dollars}) ${SQLParam ? SQLParam : ''} RETURNING *`, values)
    const request =  toTS<T>(await pool.query(`INSERT INTO ${table} (${keys}) VALUES(${dollars}) ${SQLParam ? SQLParam : ''} RETURNING *`, [...values]))

    cacheEdit(table, request)

    return request
  }

  async put<T extends tables>(dto: Partial<Tables[T]>, id: number | string, table: T): Promise<Tables[T][]> {
    console.log(dto, id, table)
    const [values, dollars] = toSQLPut(dto)
    const request = toTS<T>(await pool.query(`UPDATE ${table} SET ${dollars} WHERE id = ${id} RETURNING *`, [...values]))

    cacheEdit(table, request)
    return request
  }

  async delete<T extends tables>(id: number | string, table: T): Promise<Tables[T][]> {
    console.log(id, table)
    const request = toTS<T>(await pool.query(`DELETE FROM ${table} WHERE id = $1 RETURNING *`, [id]))
    
    cacheEdit(table, request, 'delete')
    return request
  }
}

function toSQLPost(props: any) {
  const {location, ...data} = props

  const keys = Object.keys(data)
  const values = Object.values(data)
  const locationSQL = `ST_SetSRID(ST_MakePoint($${values.length + 1}, $${values.length + 2}), 4326)`
  if (location) {
    keys.push('location')
    values.push(location.lng, location.lat)
  }
  const dollars = keys.map((e, i) => `$${i + 1}`).join(', ')
  console.log(dollars)
  return [keys.join(', '), values, location ? dollars.slice(0, -3) + locationSQL : dollars]
}

function toSQLPut(props: any) {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const dollars = keys.map((e, i) => (`${e} = $${i + 1}`)).join(', ')
  return [values, dollars]
}

function toSQLWhere(props: any) {
  const keys = Object.keys(props)
  const values = Object.values(props)
  const and = keys.map((e, i) => (`${e} = $${i + 1} and`)).join(' ').slice(0, -4)
  return [values, and]
}

// async get<T extends tables>(table: T): Promise<Tables[T][]> {
//   return toTS(await pool.query(`SELECT * FROM ${table}`))
// }
// async getById<T extends tables>(id: number | string, table: T): Promise<Tables[T][]> {
//   return toTS(await pool.query(`SELECT * FROM ${table} WHERE id = $1`, [id]))
// }

// async getByParams<T extends tables>(param: Partial<Tables[T]>, table: T): Promise<Tables[T][]> {
//   // try {
//   // const keys = Object.keys(param)
//   // const values = Object.values(param)
//   // console.log(param, table)
//   const [values, and] = toSQLWhere(param)
//   console.log(`SELECT * FROM ${table} WHERE ${and}`, [...values])
//   return toTS(await pool.query(`SELECT * FROM ${table} WHERE ${and}`, [...values]))
//   // }
//   // catch(err) {
//   //   if (err.code === '22P02') {
//   //     return []
//   //   }
//   // }
// }