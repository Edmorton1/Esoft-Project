import db from "@s/infrastructure/db/db"
import { queryType, tagsTypes } from "@s/infrastructure/endpoints/ExtendSearch/validation/ExtendedSearch.schemas"
import ExtendedSeacrhSQLhelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/ExtendedSeacrh.SQLhelper"
import { CARDS_ON_PAGE } from "@shared/CONST"
import { Knex } from "knex"
import { inject, injectable } from "inversify"
import { Form } from "@t/gen/Users"
import { ILogger } from "@s/helpers/logger/logger.controller"
import TYPES from "@s/config/containers/types"

type propsType = Omit<queryType, 'tags'> & {tags: tagsTypes}

interface ExtendedSearchRepo {
  getByTags: (props: propsType) => Promise<{ forms: Form[], count: number }>
}

@injectable()
class ExtendedSearchModule implements ExtendedSearchRepo{
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
    @inject(ExtendedSeacrhSQLhelper)
    private readonly ExtendedSeacrhSQLhelper: ExtendedSeacrhSQLhelper
  ) {}

  private buildLocation = (location: propsType['location']) => {
    // LOCATION
    let distanceRaw;
    if (location) {
      distanceRaw = db.raw(`
        ST_Distance(
          location::geography,
          ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
        ) / 1000
      `, location);
    }
    let selectDistance;
    if (distanceRaw) {
      selectDistance = db.raw(`ROUND((${distanceRaw.toQuery()})::numeric, 2) AS distance`);
    }
    
    return [distanceRaw, selectDistance]
  }

  private buildParams = (params: propsType['params']): Knex.Raw<any> | undefined => {
    if (params) {
      const filtered = Object.entries(params)
        .filter(([key, value]) => value !== undefined && value !== '');

      const values = filtered.map(([key, value]) => key === "city" ? `%${value}%` : value);
      const entries = filtered.map(([key, value]) => {
        this.logger.info({ FROM_ENTRIES: { key, value } });
        if (key === "city") {
          return `${key} ILIKE ?`
        }
        return `${key} = ?`;
      });

      const united_cond = entries.join(' AND ');

      this.logger.info({
        TOTAL_CONDITIONS: {
          conditions: united_cond,
          values,
        },
      });

      if (united_cond) {
        return db.raw(united_cond, values);
      }
    }

    return undefined
  }
  
  private buildConditions = ({tags, min_age, max_age, avatar, max_distance, name, params, distanceRaw}: propsType & {distanceRaw: Knex.Raw<any> | undefined}): (string | Knex.Raw<any>)[] => {
    const conditions: (string | Knex.Raw<any>)[] = []

    // FORM PARAMS
    const buildParams = this.buildParams(params)
    if (buildParams) conditions.push(buildParams)
    
    // if (params) conditions.push(toSQLWhere(params, false)) 

    //INAME
    if (name) conditions.push(db.raw(`name ILIKE '%${name}%'`))

    // AGE
    const ageMin = min_age && `forms.age >= ${min_age}`
    const ageMax = max_age && `forms.age <= ${max_age}`
    const ageFilter = [ageMin, ageMax].filter(Boolean).join(' AND ')
    if (ageFilter) conditions.push(ageFilter)

    // TAGS
    if (tags.length > 0) conditions.push(this.ExtendedSeacrhSQLhelper.toSQLgetByTags(tags))

    // AVATAR TOGGLE
    if (avatar === true) conditions.push('NOT forms.avatar IS NULL')

    // MAX DISTANCE
    let havingMaxDistance;
    if (distanceRaw && max_distance) {
      havingMaxDistance = db.raw(`(${distanceRaw.toQuery()}) <= ?`, [max_distance]);
      conditions.push(havingMaxDistance);
    }
    
    return conditions
  }

  private buildQuery = (havingClause: string) => {
    const query = db('forms')
      .leftJoin('user_tags', 'user_tags.id', 'forms.id')
      .leftJoin('tags', 'user_tags.tagid', 'tags.id')
      .groupBy('forms.id')
      .havingRaw(havingClause)

      return query
  }

  getByTags: ExtendedSearchRepo['getByTags'] = async ({tags, page, min_age, max_age, avatar, location, max_distance, name, params}) => {
    const props = {tags, page, min_age, max_age, avatar, location, max_distance, name, params}
    this.logger.info("GET BY TAGS")

    const [distanceRaw, selectDistance] = this.buildLocation(location)

    const conditions = this.buildConditions({...props, distanceRaw})
    this.logger.info({CONDITOS: conditions})

    const havingClause = conditions.length > 0 ? `${conditions.join(' AND ')}` : ''
    
    const offset = (Number(page) - 1) * CARDS_ON_PAGE

    this.logger.info({offset: offset === -1 ? 0 : offset, CARDS_ON_PAGE})

    // ФОРМИРОВАНИЕ SELECT
    const baseSelect = [
      'forms.*',
      db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`)
    ]
    if (selectDistance) {
      baseSelect.push(selectDistance)
    };

    // const query = this.buildQuery(havingClause)

    const request = this.buildQuery(havingClause)
      .select(...baseSelect)
      .offset(offset === -1 ? 0 : offset)
      .limit(CARDS_ON_PAGE)

    this.logger.info({TAGS_TAGS: tags})
        
    const subquery = this.buildQuery(havingClause)
      .select("forms.id")
        
    const pagesCount = db
      .count('* as count')
      .from(subquery.as('filtered_forms'));

    this.logger.info({PAGES_COUNT_SQL: pagesCount.toSQL().toNative()})
    this.logger.info({DATA_RES: await request})
    this.logger.info({toNativeByTags: request.toSQL().toNative()})

    return {forms: await request, count: Math.ceil(Number((await pagesCount)[0].count) / CARDS_ON_PAGE)}
  }
}

export default ExtendedSearchModule
