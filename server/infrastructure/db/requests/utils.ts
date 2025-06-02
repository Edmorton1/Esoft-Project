import logger from "@s/logger";
import { tables } from "@t/gen/types"
import { getSchemaByTable } from "@t/shared/sharedTypes"

export const fieldsToArr = (fields: string | undefined) => fields?.trim()?.split(',').map(e => e.trim()) ?? []

// ПУТСОЙ МАССИВ РАЗРЕШЁН
export const checkFirstType = <T extends Array<any>>(data: T, table: tables, fields?: string): T => {
  if (data.length > 0) {
    logger.info({data, table});
    getSchemaByTable(table, fields).parse(data[0])
  }
  return data
}