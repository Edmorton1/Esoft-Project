import { tables, Tables } from "@app/types/gen/types"
import { DBType } from "@app/server/infrastructure/helpers/databases/postgres/config/db"
import bcrypt from "bcrypt"
import { Form, LocationType } from "@app/types/gen/Users"
import { SALT } from "@app/shared/CONST"
import { inject, injectable } from "inversify"
import type { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller"
import TYPES from "@app/server/config/containers/types"
import { Knex } from "knex"
import { TablesPost } from "@app/server/types/types"
import SQLForm from "@app/server/infrastructure/helpers/databases/postgres/SQLform"
import Utils, { checkFirstType, getCheckWord, isLocationType } from "@app/server/infrastructure/helpers/databases/postgres/utils"

// const fieldsKey = (fields?: string) => `${fields ? '--fields: ' + fields : ''}`

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
    dto: Partial<Omit<Tables[T], "location"> & (T extends "forms" ? {location?: LocationType | Knex.Raw} : object)>,
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
    private readonly logger: ILogger,
    @inject(TYPES.DataBase)
    private readonly db: DBType,
    @inject(SQLForm)
    private readonly sqlForm: SQLForm,
    @inject(Utils)
    private readonly utils: Utils
  ) {}
  // get = async <T extends tables>(table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
  get: IORM['get'] = async <T extends tables>(table: T, fields?: string) => {
    this.logger.info("GET", 'fields', fields)
    this.logger.info("get", table, fields)

    // const key = `${table}${fieldsKey(fields)}`
    
    let query = this.db(table).select(this.utils.fieldsToArr(fields, table));

    if (table === 'forms') {
      this.logger.info({JUST_GET_FORM: table, fields})
      query = this.sqlForm.standartToForm(fields)
    }

    this.logger.info('fields in orm', fields)

    const total = await query
    return checkFirstType(total, table, fields)
  }
  // getById = async <T extends tables>(id: number | string, table: T, fields?: string, options?: Ioptions): Promise<Tables[T][]> => {
  getById: IORM['getById'] = async <T extends tables>(id: number | string, table: T, fields?: string) => {
    this.logger.info('GET BY ID')
    this.logger.info({table, fields}, "getById")

    // const key = `${table}-id-${id}${fieldsKey(fields)}`

    let query = this.db(table).select(this.utils.fieldsToArr(fields, table)).where('id', '=', id);
    
    if (table === 'forms') {
      this.logger.info("[FORMS]: ЗАПРОС К ФОРМЕ")
      const params = {id: Number(id)}

      query = this.sqlForm.requestToFormParams(params, fields)
      this.logger.info("TO NATIVE", query.toSQL().toNative())
    }

    this.logger.info('check type', query)
    const total = await query

    return checkFirstType(total, table, fields)
  }
  
  // ПОКА ОПЦИИ К ФОРМЕ НЕ РАБОТАЮТ
  getByParams: IORM['getByParams'] = async <T extends tables>(params: Partial<Tables[T]>, table: T, fields?: string, options?: Ioptions) => {
    this.logger.info("GET BY PARAMS")
    this.logger.info("getByParams", params, table, fields)

    // const key = `${table}-${Object.entries(params).flat().join("-")}${fieldsKey(fields)}`

    this.logger.info(params, 'params')

    let query = this.db(table).select(this.utils.fieldsToArr(fields, table)).where(params);

    if (table === 'forms') {
      query = this.sqlForm.requestToFormParams(params, fields)
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
    const total = await query

    return checkFirstType(total, table, fields)
  }

  // ПОКА БУДЕТ ТОЛЬКО К ФОРМЕ
  getManyParams: IORM['getManyParams'] = async (params, fields) => {
    // const parsedFields = fieldsToArr(fields, 'forms')
    const request = await this.sqlForm.requestToFormManyParams({name: "id", params}, fields).orderBy('id')
    
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
      const parsedKnex = this.db.raw(`ST_GeomFromText(?, 4326)`, [pointWKT])
      dto.location = parsedKnex
    }
    const parsedFields = this.utils.fieldsToArr(fields, table)

    const request = await this.db(table).insert(dto).returning(parsedFields)
    
    // logger.info({request, parsedFields})

    // cacheSet(table, request, "edit")
    checkFirstType(request, table, fields)

    return request
  }

  // ПОКА БУДЕТ ТОЛЬКО НА ТЭГАХ
  postArr: IORM['postArr'] = async (dto, table, removeOld = 0) => {

    if (removeOld > 0) {
      await this.db.delete().from('user_tags').where('id', '=', removeOld)
    }

    const request = await this.db(table).insert(dto).onConflict(Object.keys(dto[0])).merge().returning("*")
    // ПОТОМ ПРОВЕРИТЬ КЭШИ

    // cacheSet(table, request, "edit")

    return request
  }

  put: IORM['put'] = async (dto, id, table, userid, fields) => {
    this.logger.info({table, id, dto, method: "PUT"})

    const checkWord = getCheckWord(table)

    const parsedFields = this.utils.fieldsToArr(fields, table)

    const request = await this.db(table).where("id", '=', id).andWhere(checkWord, "=", userid).update(dto).returning(parsedFields)
    this.logger.info({request})

    // cacheSet(table, request, "edit")
    checkFirstType(request, table, fields)

    return request
  }

  delete: IORM['delete'] = async (id, table, userid) => {
    // logger.info("delete", id, table)

    const checkWord = getCheckWord(table)
    
    const query = this.db(table).where("id", "=", id).andWhere(checkWord, "=", userid).delete().returning("*")
    this.logger.info({DELETE_QUERY: query.toSQL().toNative()})
    const request = await query
    
    // cacheSet(table, request, 'delete')
    return request
  }
}

export default ORM