import pool from "@s/infrastructure/db/db"
import { toSQLWhere } from "@s/infrastructure/db/requests/SQLparsers"
import { toTS } from "@shared/MAPPERS"

class SQLHard {
  async getUserTags(tags: string): Promise<number[]> {
    const [keys, values, sim] = toSQLgetUserTags(tags)
    const request = toTS(await pool.query(`
      SELECT * FROM tags
      WHERE tag % ANY (ARRAY[${keys.join(', ')}])
      ORDER BY
          GREATEST(
              ${sim.join('')}
          ) DESC;
    `, [...values]))

    console.log(request)
    
    return request.map(e => e.id)
  }

  async getByTags(tags: number[], params: Record<string, string>) {
    const [values, and] = toSQLWhere(params, false, tags.length)
    // console.log(and)
    const keys = toSQLgetByTags(tags)

    const haveTags = keys.length > 0
      ? `LEFT JOIN user_tags matched ON matched.id = f.id AND matched.tagid IN (${keys})`
      : `LEFT JOIN user_tags matched ON matched.id = f.id`

    const secondTags = keys.length > 0
      ? `HAVING COUNT(DISTINCT matched.tagid) > 0 ${and ? 'and ' + and : ''}`
      : `HAVING COUNT(DISTINCT matched.tagid) > 0 ${and ? 'and ' + and : ''}`

    const request = toTS(await pool.query(`
    SELECT 
      f.*, 
      COUNT(DISTINCT matched.tagid) AS matched_count,
      COALESCE(
        json_agg(
          json_build_object('id', t.id, 'tag', t.tag)
        ) FILTER (WHERE t.id IS NOT NULL),
        '[]'
      ) AS tags
    FROM forms f
    LEFT JOIN user_tags ut ON ut.id = f.id
    LEFT JOIN tags t ON ut.tagid = t.id
    ${haveTags}
    GROUP BY f.id
    ${secondTags}
    ORDER BY matched_count DESC;
    `, [...tags, ...values]))
    return request
  }
}

const toSQLgetByTags = (tags: number[]) => {
  const keys = tags.map((e, i) => `$${i + 1}`)
  return keys
}

// toSQLwhereTags = ()

const toSQLgetUserTags = (rawTags: string): [string[], string[], string[]] => {
  const tags = rawTags.split(',').map(e => e.trim())

  const keys = tags.map((e, i) => `$${i + 1}`)
  const sim = tags.map((e, i) => `similarity(tag, ${keys[i]})${i + 1 === keys.length ? '' : ','}` )
  console.log(keys, sim)
  return [keys, tags, sim]
}

export default new SQLHard

// return await pool.query(`SELECT tags.id, tags.tag
//   FROM user_tags
//   LEFT JOIN tags ON user_tags.tagid = tags.id
//   WHERE USER_TAGS.ID = $1; `, [id]