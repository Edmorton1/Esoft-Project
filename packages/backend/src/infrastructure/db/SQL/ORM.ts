import { tables, Tables } from "@app/types/gen/types"
import { cacheEdit, cacheGet } from "@app/server/infrastructure/redis/cache"
import db from "@app/server/infrastructure/db/db"
import bcrypt from "bcrypt"
import { checkFirstType, fieldsToArr, getCheckWord, isLocationType } from "@app/server/infrastructure/db/SQL/utils"
import { Form, LocationType } from "@app/types/gen/Users"
import { SALT } from "@app/shared/CONST"
import { requestToFormManyParams, requestToFormParams, standartToForm } from "@app/server/infrastructure/db/SQL/SQLform"
import { inject, injectable } from "inversify"
import { ILogger } from "@app/server/helpers/logger/logger.controller"
import TYPES from "@app/server/config/containers/types"
import { Knex } from "knex"
import { TablesPost } from "@app/server/types/types"

const fieldsKey = (fields?: string) => `${fields ? '--fields: ' + fields : ''}`

// ПРИНИМАЕТ ТОЛЬКО ID
interface Ioptions {
  infinitPagination: {
    cursor?: number
    limit: number
    orderBy: "asc" | "desc"
  }
}

export interface IORM {
  get: <T extends tables>(table: T, fields?: string) => Promise<Tables[T][]>;
  getById: <T extends tables>(id: number | string, table: T, fields?: string) => Promise<Tables[T][]>;
  getByParams: <T extends tables>(
    params: Partial<Tables[T]>,
    table: T,
    fields?: string,
    options?: Ioptions
  ) => Promise<Tables[T][]>;

  getManyParams: (params: any[], fields?: string) => Promise<Form[]>;

  post: <T extends tables>(dto: Omit<TablesPost[T], "location"> & (T extends "forms" ? {location?: LocationType | Knex.Raw} : object), table: T, fields?: string) => Promise<Tables[T][]>;
  postArr: <T extends tables>(dto: TablesPost[T][], table: T, removeOld?: number) => Promise<Tables[T][]>;

  put: <T extends tables>(
    dto: Partial<Omit<Tables[T], "location"> & (T extends "forms" ? {location?: Location | Knex.Raw} : object)>,
    id: number | string,
    table: T,
    userid: number,
    fields?: string
  ) => Promise<Tables[T][]>;

  delete: <T extends tables>(
    id: number | string,
    table: T,
    userid: number
  ) => Promise<Tables[T][]>;
}

@injectable()
class ORM implements IORM {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger
  ) {}
  // get = async <T extends tables>(table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
  get: IORM['get'] = async <T extends tables>(table: T, fields?: string) => {
    this.logger.info("GET", 'fields', fields)
    this.logger.info("get", table, fields)

    const key = `${table}${fieldsKey(fields)}`
    
    let query = db(table).select(fieldsToArr(fields, table));

    if (table === 'forms') {
      query = standartToForm(fields)
    }

    this.logger.info('fields in orm', fields)

    const total = await cacheGet<Tables[T][]>(key, query)
    return checkFirstType(total, table, fields)
  }
  // getById = async <T extends tables>(id: number | string, table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
  getById: IORM['getById'] = async <T extends tables>(id: number | string, table: T, fields?: string) => {
    this.logger.info('GET BY ID')
    this.logger.info({table, fields}, "getById")

    const key = `${table}-id-${id}${fieldsKey(fields)}`

    let query = db(table).select(fieldsToArr(fields, table)).where('id', '=', id);
    
    if (table === 'forms') {

      this.logger.info("[FORMS]: ЗАПРОС К ФОРМЕ")
      const params = {id: Number(id)}

      query = requestToFormParams(params, fields)
      this.logger.info("TO NATIVE", query.toSQL().toNative())
    }

    this.logger.info('check type', await cacheGet(key, query), table)
    const total = await cacheGet<Tables[T][]>(key, query)

    return checkFirstType(total, table, fields)
  }
  
  // ПОКА ОПЦИИ К ФОРМЕ НЕ РАБОТАЮТ
  getByParams: IORM['getByParams'] = async <T extends tables>(params: Partial<Tables[T]>, table: T, fields?: string, options?: Ioptions) => {
    this.logger.info("GET BY PARAMS")
    this.logger.info("getByParams", params, table, fields)

    const key = `${table}-${Object.entries(params).flat().join("-")}${fieldsKey(fields)}`

    this.logger.info(params, 'params')

    let query = db(table).select(fieldsToArr(fields, table)).where(params);

    if (table === 'forms') {
      query = requestToFormParams(params, fields)
    } else if (options?.infinitPagination && options.infinitPagination.limit) {
      const settings = options.infinitPagination
      query = query
        .limit(settings.limit)
        .andWhere(qb => {
          if (settings.cursor) qb.where("id", settings.orderBy === "asc" ? ">" : "<", settings.cursor)
        })
        .orderBy("id", settings.orderBy)
    }
    
    this.logger.info('fields in orm', fields)
    const total = await cacheGet<Tables[T][]>(key, query)

    return checkFirstType(total, table, fields)
  }

  // ПОКА БУДЕТ ТОЛЬКО К ФОРМЕ
  getManyParams: IORM['getManyParams'] = async (params, fields) => {
    // const parsedFields = fieldsToArr(fields, 'forms')
    const request = await requestToFormManyParams({name: "id", params}, fields)
    
    return request
  }
  
  post: IORM['post'] = async (dto, table, fields) => {
    this.logger.info({table, fields, dto})
    
    if (typeof dto === 'object' && "password" in dto && typeof dto.password === "string") {
      const hashed = await bcrypt.hash(dto.password, SALT)
      // dto.password = hashed as Tables[T][keyof Tables[T]]
      dto.password = hashed
    }

    if (typeof dto === 'object' && 'location' in dto && isLocationType(dto.location)) {
      const {lng, lat} = dto.location
      const pointWKT = `POINT(${lng} ${lat})`;
      const parsedKnex = db.raw(`ST_GeomFromText(?, 4326)`, [pointWKT])
      // FIXME: СЮДА ПОТОМ ДОБАВИТЬ LOCATION PARSER
      dto.location = parsedKnex
    }
    const parsedFields = fieldsToArr(fields, table)

    const request = await db(table).insert(dto).returning(parsedFields)
    
    // logger.info({request, parsedFields})

    cacheEdit(table, request)
    checkFirstType(request, table, fields)

    return request
  }

  // ПОКА БУДЕТ ТОЛЬКО НА ТЭГАХ
  postArr: IORM['postArr'] = async (dto, table, removeOld = 0) => {

    if (removeOld > 0) {
      await db.delete().from('user_tags').where('id', '=', removeOld)
    }

    const request = await db(table).insert(dto).onConflict(Object.keys(dto[0])).merge().returning("*")
    // ПОТОМ ПРОВЕРИТЬ КЭШИ

    cacheEdit(table, request)

    return request
  }

  put: IORM['put'] = async (dto, id, table, userid, fields) => {
    this.logger.info({table, id, dto, method: "PUT"})

    const checkWord = getCheckWord(table)

    const parsedFields = fieldsToArr(fields, table)

    const request = await db(table).where("id", '=', id).andWhere(checkWord, "=", userid).update(dto).returning(parsedFields)
    this.logger.info({request})

    cacheEdit(table, request)
    checkFirstType(request, table, fields)

    return request
  }

  delete: IORM['delete'] = async (id, table, userid) => {
    // logger.info("delete", id, table)

    const checkWord = getCheckWord(table)
    
    const query = db(table).where("id", "=", id).andWhere(checkWord, "=", userid).delete().returning("*")
    this.logger.info({DELETE_QUERY: query.toSQL().toNative()})
    const request = await query
    
    cacheEdit(table, request, 'delete')
    return request
  }
}

export default ORM