import db from "@s/infrastructure/db/db"
import logger from "@s/logger"
import { CARDS_ON_PAGE } from "@shared/CONST"
import { lnglatType } from "@t/gen/types"

type tagsTypes = {groups: string, id: number[]}[]

class SQLHard {
  getUserTags = async (tags: string): Promise<tagsTypes> => {
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

  getByTags = async (tags: tagsTypes, params: Record<string, string>, page: string, min_age: string, max_age: string, avatar: string, location: lnglatType | [null, null], max_distance: string) => {
    logger.info("GET BY TAGS")
    const and = toSQLWhere(params, false)
    const conditions: string[] = []

    logger.info({TAGS_TAGS: tags})

    const ageMin = min_age && `forms.age > ${min_age}`
    const ageMax = max_age && `forms.age < ${max_age}`
    const ageFilter = [ageMin, ageMax].filter(Boolean).join(' AND ')
    
    const havingMaxDistance = `(
    ST_Distance(
            location::geography,
            ST_SetSRID(ST_MakePoint(37.6173, 55.7558), 4326)::geography
        ) / 1000
    ) < ${max_distance}`

    if (max_distance && location[0] !== null && location[1] !== null) conditions.push(await havingMaxDistance)
    if (tags.length > 0) conditions.push(toSQLgetByTags(tags))
    if (and.length > 0) conditions.push(and)
    if (ageFilter) conditions.push(ageFilter)
    if (avatar === 'true') conditions.push('NOT forms.avatar IS NULL')

    const havingClause = conditions.length ? `${conditions.join(' AND ')}` : ''
    
    const offset = (Number(page) - 1) * CARDS_ON_PAGE

    logger.info({offset: offset === -1 ? 0 : offset, CARDS_ON_PAGE})
    
    const selectDistance = db.raw(`	ROUND(
          (ST_Distance(
            location::geography,
            ST_SetSRID(ST_MakePoint(?, ?), 4326)::geography
          ) / 1000)::numeric,
          2
        ) AS distance`, location!)

    const request = db('forms')
      .select(
        'forms.*',
        selectDistance,
        db.raw(`json_agg(json_build_object('id', tags.id, 'tag', tags.tag)) AS tags`)
      )
      .leftJoin('user_tags', 'user_tags.id', 'forms.id')
      .leftJoin('tags', 'user_tags.tagid', 'tags.id')
      .groupBy('forms.id')
      .havingRaw(havingClause)

      .offset(offset === -1 ? 0 : offset)
      .limit(CARDS_ON_PAGE)
    
      const pagesCount = db.countDistinct('forms.id')
        .from('forms')
        .leftJoin('user_tags', 'user_tags.id', 'forms.id')
        .leftJoin('tags', 'user_tags.tagid', 'tags.id')
        .whereRaw(havingClause)

    // logger.info({PAGES_SQL: pagesCount.toSQL().toNative()})
    // logger.info({PAGES_COUNT: await pagesCount})

    logger.info({DATA_RES: await request})
    logger.info({toNativeByTags: request.toSQL().toNative()})

    return {forms: await request, count: Math.ceil(Number((await pagesCount)[0].count) / CARDS_ON_PAGE)}
  }
}

const toSQLgetByTags = (tags: tagsTypes): string => {
  return (tags.map((e, i) => `COUNT(DISTINCT CASE WHEN user_tags.tagid IN (${e.id.join(',')}) THEN user_tags.tagid END) > 0${tags.length === i + 1 ? '' : ' AND '}`)).join(' ')
}

const toSQLgetUserTags = (rawTags: string): [string[], string[]] => {
  const tags = rawTags.split(',').map(e => e.trim())
  const keys = tags.map(() => '?')
  return [keys, tags]
}

const toSQLWhere = (props: Record<any, any>, isform?: boolean): string => {
  const keys = Object.keys(props).filter(e => props[e] !== '')
  const and = keys
    .map(e => `${isform ? `forms.` : ``}${e} = '${props[e]}'`)
    .join(' AND ')
  return and
}

// С ПЛЕЙСХОЛДЕРАМИ
// const toSQLWhere = (props: Record<any, any>, isform?: boolean): [any[], string] => {
//   const keys = Object.keys(props).filter(e => props[e] != '')
//   const values = Object.values(props).filter(e => e != '')
//   logger.info(keys.length === values.length)
//   const and = keys.map((e, i) => (`${isform ? `forms.` : ``}${e} = $${i + 1} and`)).join(' ').slice(0, -4)
//   return [values, and]
// }

// const toSQLgetUserTags = (rawTags: string): [string[], string[]] => {
//   const tags = rawTags.split(',').map(e => e.trim())
//   const keys = tags.map((e, i) => `$${i + 1}`)
//   return [keys, tags]
// }


export default new SQLHard

// return await pool.query(`SELECT tags.id, tags.tag
//   FROM user_tags
//   LEFT JOIN tags ON user_tags.tagid = tags.id
//   WHERE USER_TAGS.ID = $1; `, [id]

// const toSQLgetUserTags = (rawTags: string): [string[], string[], string[]] => {
//   const tags = rawTags.split(',').map(e => e.trim())

//   const keys = tags.map((e, i) => `$${i + 1}`)
//   const sim = tags.map((e, i) => `similarity(tag, ${keys[i]})${i + 1 === keys.length ? '' : ','}` )
//   logger.info(keys, sim)
//   return [keys, tags, sim]
// }

    // SELECT 
    //   f.*, 
    //   COUNT(DISTINCT matched.tagid) AS matched_count,
    //   COALESCE(
    //     json_agg(
    //       json_build_object('id', t.id, 'tag', t.tag)
    //     ) FILTER (WHERE t.id IS NOT NULL),
    //     '[]'
    //   ) AS tags
    // FROM forms f
    // LEFT JOIN user_tags ut ON ut.id = f.id
    // LEFT JOIN tags t ON ut.tagid = t.id
    // ${haveTags}
    // GROUP BY f.id
    // ${secondTags}
    // ORDER BY matched_count DESC;

      //     ${haveTags}
      // ${count > 0 ? 'AND' : ''}
      // ${haveParams}
      // ${count > 1 ? 'AND' : ''}
      // ${totalAge}