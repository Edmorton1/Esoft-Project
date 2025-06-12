import db from "@s/infrastructure/db/db"
import { queryType } from "@s/infrastructure/endpoints/ExtendSearch/middlewares/ExtendedSearchMiddle"
import logger from "@s/logger"
import { CARDS_ON_PAGE } from "@shared/CONST"
import { Knex } from "knex"

type tagsTypes = {groups: string, id: number[]}[]

class SQLHard {
  getUserTags = async (tags: string[]): Promise<tagsTypes> => {
    logger.info("GET USER TAGS")
    const [keys, values] = toSQLgetUserTags(tags)
    const sql = `
    WITH input_words AS (
      SELECT unnest(ARRAY[${keys.join(',')}]) AS word
    ),
    matched_tags AS (
      SELECT 
        iw.word AS groups,
        t.id,
        t.tag,
        similarity(t.tag, iw.word) AS sim
      FROM input_words iw
      JOIN tags t ON t.tag % iw.word
    )

    SELECT 
      groups,
      json_agg(id ORDER BY sim DESC) AS id
    FROM matched_tags
    GROUP BY groups;
    `

    const request = db.raw(sql, [...values])

    logger.info({toNativeUserTags: request.toSQL().toNative()})
    
    return (await request).rows
  }

    getByTags = async (props: Omit<queryType, 'tags'> & {tags: tagsTypes}) => {
    const {tags, page, min_age, max_age, avatar, location, max_distance, params} = props

    logger.info("GET BY TAGS")

    const and = params ? toSQLWhere(params, false) : ''
    const conditions: (string | Knex.Raw<any>)[] = []

    logger.info({TAGS_TAGS: tags})

    const ageMin = min_age && `forms.age >= ${min_age}`
    const ageMax = max_age && `forms.age <= ${max_age}`
    const ageFilter = [ageMin, ageMax].filter(Boolean).join(' AND ')

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

    let havingMaxDistance;
    if (distanceRaw && max_distance) {
      havingMaxDistance = db.raw(`(${distanceRaw.toQuery()}) <= ?`, [max_distance]);
      conditions.push(havingMaxDistance);
    }

    if (tags.length > 0) conditions.push(toSQLgetByTags(tags))
    if (and.length > 0) conditions.push(and)
    if (ageFilter) conditions.push(ageFilter)
    if (avatar === true) conditions.push('NOT forms.avatar IS NULL')

    const havingClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    
    const offset = (Number(page) - 1) * CARDS_ON_PAGE

    logger.info({offset: offset === -1 ? 0 : offset, CARDS_ON_PAGE})

    const baseSelect = [
      'forms.*',
      db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`)
    ]

    if (selectDistance) {
      baseSelect.push(selectDistance)
    };

    const request = db('forms')
      .select(...baseSelect)
      .leftJoin('user_tags', 'user_tags.id', 'forms.id')
      .leftJoin('tags', 'user_tags.tagid', 'tags.id')
      .groupBy('forms.id')
      .havingRaw(havingClause)

      .offset(offset === -1 ? 0 : offset)
      .limit(CARDS_ON_PAGE)
      
      const subquery = db('forms')
        .select('forms.id')
        .leftJoin('user_tags', 'user_tags.id', 'forms.id')
        .leftJoin('tags', 'user_tags.tagid', 'tags.id')
        .groupBy('forms.id')
        .havingRaw(havingClause);

      const pagesCount = db
        .count('* as count')
        .from(subquery.as('filtered_forms'));

    logger.info({PAGES_COUNT_SQL: pagesCount.toSQL().toNative()})
    logger.info({DATA_RES: await request})
    logger.info({toNativeByTags: request.toSQL().toNative()})

    return {forms: await request, count: Math.ceil(Number((await pagesCount)[0].count) / CARDS_ON_PAGE)}
  }
}

const toSQLgetByTags = (tags: tagsTypes): string => {
  return (tags.map((e, i) => `COUNT(DISTINCT CASE WHEN user_tags.tagid IN (${e.id.join(',')}) THEN user_tags.tagid END) > 0${tags.length === i + 1 ? '' : ' AND '}`)).join(' ')
}

const toSQLgetUserTags = (tags: string[]): [string[], string[]] => {
  const keys = tags.map(() => '?')
  return [keys, tags]
}

const toSQLWhere = (props: Record<any, any>, isform?: boolean): string => {
  const keys = Object.keys(props).filter(e => props[e] !== '' && props[e] !== undefined)
  const and = keys
    .map(e => `${isform ? `forms.` : ``}${e} = '${props[e]}'`)
    .join(' AND ')
  return and
}

export default new SQLHard
