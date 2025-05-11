import { tables } from "@s/core/domain/types"
import { Form } from "@s/core/domain/Users"
import pool from "@s/infrastructure/db/db"
import { toSQLWhere } from "@s/infrastructure/db/requests/SQLparsers"
import { toTS } from "@shared/MAPPERS"

const getForm = async (fields?: string, id?: number | string, params?: Partial<Form>, sqlparams?: string): Promise<Form[]> => {
  fields = fields + ','
  function toFields() {
    if (fields) {
      if (fields.includes('tags')) {
        return ''
      } else {
        return 'forms.*, '
      }
    } else {
        return 'forms.*, '
    }
  }

  const [values, and] = toSQLWhere(params ?? {}, true)
  // fields = fields?.split(', ').filter(e => e != 'tags').map(e => `forms.${e}`).join(', ')
  // console.log(`ЗАПРОС ПОШЁЛ`, values, and, fields, id, params)
  console.log('ЗАПРОС НА ФОРМУ ',`
    SELECT 
      ${toFields()}
      json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags
    FROM forms
    LEFT JOIN user_tags ON forms.id = user_tags.id
    LEFT JOIN tags ON user_tags.tagid = tags.id
    ${id ? `WHERE forms.id = ${id}` : ``}
    ${params ? `WHERE ${and}` : ``}
    GROUP BY forms.id
    ${sqlparams || ''};
  `)
  const request = toTS<'forms'>(await pool.query(`
    SELECT 
      ${toFields()}
      json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags
    FROM forms
    LEFT JOIN user_tags ON forms.id = user_tags.id
    LEFT JOIN tags ON user_tags.tagid = tags.id
    ${id ? `WHERE forms.id = ${id}` : ``}
    ${params ? `WHERE ${and}` : ``}
    GROUP BY forms.id
    ${sqlparams || ''};
  `, params && [...values]))
  return request
}

export const checkForms = (table: tables, callback: () => any, fields?: string, id?: string | number, params?: Partial<Form>, sqlparams?: string) => {
  // console.log(table, fields, params)
  if (table === 'forms' && (!fields || fields?.includes("tags"))) {
    // console.log(table, fields, id, params)
    return () => getForm(fields, id, params, sqlparams)
  } else {
    // console.log(table, fields, id, params)
    return () => callback()
  }
}