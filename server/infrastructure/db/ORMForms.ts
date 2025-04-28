import { tables } from "@s/core/domain/types"
import { Form } from "@s/core/domain/Users"
import pool from "@s/infrastructure/db/db"
import { toTS } from "@s/infrastructure/db/Mappers"
import { toSQLWhere } from "./ORM"

async function getForm(id?: number | string, params?: Partial<Form>): Promise<Form[]> {
  const [values, and] = toSQLWhere(params ?? {}, true)
  const request = toTS<'forms'>(await pool.query(`
    SELECT 
      forms.*, 
      COALESCE(
        json_agg(
          json_build_object('id', tags.id, 'name', tags.tag)
        ), '[]'
      ) AS tags
    FROM forms
    LEFT JOIN user_tags ON forms.id = user_tags.id
    LEFT JOIN tags ON user_tags.tagid = tags.id
    ${id ? `WHERE forms.id = ${id}` : ``}
    ${params ? `WHERE ${and}` : ``}
    GROUP BY forms.id;
  `, params && [...values]))
  return request
}

export function checkForms(table: tables, callback: () => any, id?: string | number, params?: Partial<Form>) {
  if (table === 'forms') {
    return () => getForm(id, params)
  } else {
    return () => callback()
  }
}