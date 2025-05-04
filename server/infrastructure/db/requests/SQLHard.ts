import pool from "@s/infrastructure/db/db"

class SQLHard {
  async getUserTags(id: number | string) {
    return await pool.query(`SELECT tags.id, tags.tag
      FROM user_tags
      LEFT JOIN tags ON user_tags.tagid = tags.id
      WHERE USER_TAGS.ID = $1; `, [id]
    )
  }
}

export default SQLHard