import db from "@s/infrastructure/db/db"
import { queryType, tagsTypes } from "@s/infrastructure/endpoints/ExtendSearch/middlewares/Schemas"
import SQLHelper from "@s/infrastructure/endpoints/ExtendSearch/SQL/SQLHelper"
import logger from "@s/helpers/logger"
import { CARDS_ON_PAGE } from "@shared/CONST"
import { Knex } from "knex"

type propsType = Omit<queryType, 'tags'> & {tags: tagsTypes}

class SQLHard {
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
  
  private buildConditions = ({tags, min_age, max_age, avatar, max_distance, name, params, distanceRaw}: propsType & {distanceRaw: Knex.Raw<any> | undefined}): (string | Knex.Raw<any>)[] => {
    const conditions: (string | Knex.Raw<any>)[] = []

    // FORM PARAMS
    const whereClause = SQLHelper.toSQLWhere(params)
    if (whereClause) conditions.push(whereClause)
    

    // if (params) conditions.push(toSQLWhere(params, false)) 

    //INAME
    if (name) conditions.push(db.raw(`name ILIKE '%${name}%'`))

    // AGE
    const ageMin = min_age && `forms.age >= ${min_age}`
    const ageMax = max_age && `forms.age <= ${max_age}`
    const ageFilter = [ageMin, ageMax].filter(Boolean).join(' AND ')
    if (ageFilter) conditions.push(ageFilter)

    // TAGS
    if (tags.length > 0) conditions.push(SQLHelper.toSQLgetByTags(tags))

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

  getByTags = async ({tags, page, min_age, max_age, avatar, location, max_distance, name, params}: propsType) => {
    const props = {tags, page, min_age, max_age, avatar, location, max_distance, name, params}
    logger.info("GET BY TAGS")

    const [distanceRaw, selectDistance] = this.buildLocation(location)

    const conditions = this.buildConditions({...props, distanceRaw})
    logger.info({CONDITOS: conditions})

    const havingClause = conditions.length > 0 ? `${conditions.join(' AND ')}` : ''
    
    const offset = (Number(page) - 1) * CARDS_ON_PAGE

    logger.info({offset: offset === -1 ? 0 : offset, CARDS_ON_PAGE})

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

    logger.info({TAGS_TAGS: tags})
        
    const subquery = this.buildQuery(havingClause)
      .select("forms.id")
        
    const pagesCount = db
      .count('* as count')
      .from(subquery.as('filtered_forms'));

    logger.info({PAGES_COUNT_SQL: pagesCount.toSQL().toNative()})
    logger.info({DATA_RES: await request})
    logger.info({toNativeByTags: request.toSQL().toNative()})

    return {forms: await request, count: Math.ceil(Number((await pagesCount)[0].count) / CARDS_ON_PAGE)}
  }
}

export default new SQLHard
