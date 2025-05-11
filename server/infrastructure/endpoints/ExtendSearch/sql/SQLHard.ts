import pool from "@s/infrastructure/db/db"
import { toSQLWhere } from "@s/infrastructure/db/requests/SQLparsers"
import { toTS } from "@shared/MAPPERS"

type tagsTypes = {groups: string, id: number[]}[]

class SQLHard {
  async getUserTags(tags: string): Promise<tagsTypes> {
    const [keys, values] = toSQLgetUserTags(tags)
    const request = (await pool.query(`
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
    `, [...values])).rows

    console.log(request)
    
    return request
  }

  async getByTags(tags: tagsTypes, params: Record<string, string>, page: string, min_age: string, max_age: string) {
    const [values, and] = toSQLWhere(params, false)
    const conditions: string[] = []

    const ageMin = min_age && `f.age > ${min_age}`
    const ageMax = max_age && `f.age < ${max_age}`
    const ageFilter = [ageMin, ageMax].filter(Boolean).join(' AND ')

    if (tags.length > 0) conditions.push(toSQLgetByTags(tags))
    if (and.length > 0) conditions.push(and)
    if (ageFilter) conditions.push(ageFilter)

    const havingClause = conditions.length ? `HAVING ${conditions.join(' AND ')}` : ''

    const request = toTS(await pool.query(`
      SELECT
        f.*,
        json_agg(json_build_object('id', t.id, 'tag', t.tag)) AS tags
      FROM forms f
      LEFT JOIN user_tags ut ON ut.id = f.id
      LEFT JOIN tags t ON ut.tagid = t.id
      GROUP BY f.id
        ${havingClause}
    `, values))

    return request
  }
}

const toSQLgetByTags = (tags: tagsTypes): string => {
  return (tags.map((e, i) => `COUNT(DISTINCT CASE WHEN ut.tagid IN (${e.id.join(',')}) THEN ut.tagid END) > 0${tags.length === i + 1 ? '' : ' AND '}`)).join(' ')
}

const toSQLgetUserTags = (rawTags: string): [string[], string[]] => {
  const tags = rawTags.split(',').map(e => e.trim())
  
  const keys = tags.map((e, i) => `$${i + 1}`)
  return [keys, tags]
}

export default new SQLHard

// return await pool.query(`SELECT tags.id, tags.tag
//   FROM user_tags
//   LEFT JOIN tags ON user_tags.tagid = tags.id
//   WHERE USER_TAGS.ID = $1; `, [id]

// const toSQLgetUserTags = (rawTags: string): [string[], string[], string[]] => {
//   const tags = rawTags.split(',').map(e => e.trim())

//   const keys = tags.map((e, i) => `$${i + 1}`)
//   const sim = tags.map((e, i) => `similarity(tag, ${keys[i]})${i + 1 === keys.length ? '' : ','}` )
//   console.log(keys, sim)
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