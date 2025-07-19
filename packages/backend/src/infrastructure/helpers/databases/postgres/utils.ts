import { lnglatType, Tables, tables } from "@app/types/gen/types"
import type { Knex } from "knex";
import { z } from "zod";
import crypto from "crypto"
import { LocationType } from "@app/types/gen/Users";
import { inject, injectable } from "inversify";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import TYPES from "@app/server/config/containers/types";
import { DBType } from "@app/server/infrastructure/helpers/databases/postgres/config/db";
import { AllRowsFormShort } from "@app/server/infrastructure/helpers/databases/postgres/AllRowsFormWithoutLocation";
import { getSchemaByTable } from "@app/server/infrastructure/helpers/databases/postgres/sharedTypes";

type RawString = (string | Knex.Raw<any>)[]

@injectable()
class Utils {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
    @inject(TYPES.DataBase)
    private readonly db: DBType
  ) {}

  fieldsToArr = (fields: string | undefined, table: tables, includeTags: boolean = false, lnglat?: lnglatType): RawString => {
    this.logger.info({ЗАПРОС_НА_ПОЛЯ: fields})
    if (table === 'forms') {
      let parsed: RawString = fields?.trim()?.split(',').map(e => 'forms.' + e.trim()) ?? [...AllRowsFormShort.map(e => 'forms.' + e), 'forms.location', includeTags && 'forms.tags'].filter(e => e !== false)
      parsed = parsed.map(item => {
        if (item === 'forms.location') {
          return this.db.raw(`jsonb_build_object(
            'lng', ST_X(location::geometry),
            'lat', ST_Y(location::geometry)
          ) AS location`)
        } else if (item === 'forms.tags' && includeTags) {
          return this.db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`)
        } return item
      })

      if (lnglat) parsed.push(this.db.raw(`
        ROUND(
          (ST_Distance(
          location::geography,
          ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
          ) / 1000)::numeric,
          2
        ) AS distance`,
            lnglat,
      ))
      this.logger.info({parsingFields: parsed})
    return parsed
    };

    this.logger.info({BEFORE_PARSED: fields})
    // if (Array.isArray(fields)) {
    //   return fields
    // }
    
    const parsed = fields?.trim()?.split(',').map(e => e.trim()) ?? ['*']
    this.logger.info({parsingFieldsInUtils: parsed})
    return parsed
  }
}

// ПУТСОЙ МАССИВ РАЗРЕШЁН
export const checkFirstType = <T extends tables>(data: any, table: T, fields?: string): Tables[T][] => {
  if (data.length > 0) {
    // logger.info({data, table, fields});
    const schema = z.array(getSchemaByTable(table, fields))
    // logger.info({SCHEMA: schema})
    // logger.info({SCHEMA_PARSE: schema.parse(data)})
    return schema.parse(data)
  } else {
    return data
  }
}

export function randomCryptoString() {
  return crypto.randomBytes(32).toString("hex")
}

export const getCheckWord = (table: tables) => {
    let checkWord = "id"

    if (table === "messages") {
      checkWord = "fromid"
    } else if (table === "likes" || table === "posts") {
      checkWord = "userid"
    } else if (table === "tags") {
      checkWord = "id"
    }

  return checkWord
}

export function isLocationType(val: any): val is LocationType {
  if (typeof val === 'object' && typeof val.lat === 'number' && typeof val.lng === 'number') {
    return true
  } return false
}

export default Utils
