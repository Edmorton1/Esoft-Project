import db from "@s/infrastructure/db/db";
import { AllRowsFormShort } from "@s/infrastructure/db/requests/AllRowsFormWithoutLocation";
import logger from "@s/logger";
import { tables } from "@t/gen/types"
import { getSchemaByTable } from "@t/shared/sharedTypes"

export const fieldsToArr = (fields: string | undefined, table: tables) => {
  if (table === 'forms') {
    const parsed = fields?.trim()?.split(',').map(e => e.trim()) ?? [...AllRowsFormShort, 'location']
    const asd = parsed.map(item => item === 'location' ? db.raw(`jsonb_build_object(
      'lng', ST_X(location::geometry),
      'lat', ST_Y(location::geometry)
    ) AS location`) : item)
    logger.info({parsingFields: asd})
   return asd
  };
  const parsed = fields?.trim()?.split(',').map(e => e.trim()) ?? ['*']
  logger.info({parsingFields: parsed})
  return parsed
}

// ПУТСОЙ МАССИВ РАЗРЕШЁН
export const checkFirstType = <T extends Array<any>>(data: T, table: tables, fields?: string): T => {
  if (data.length > 0) {
    logger.info({data, table});
    getSchemaByTable(table, fields).parse(data[0])
  }
  return data
}