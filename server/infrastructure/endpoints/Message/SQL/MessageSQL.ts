import db from "@s/infrastructure/db/db"
import logger from "@s/logger"
import { MESSAGE_ON_PAGE } from "@shared/CONST"
import { Message, MessageSchema } from "@t/gen/Users"
import { z } from "zod"

class MessageSQL {
  async getMessage(frid: number, toid: number, cursor?: number): Promise<Message[]> {

    let subquery = db('messages')
      .select(
        db.raw(`CASE WHEN fromid = ? THEN true ELSE false END as isAuthor`, [frid]),
        '*'
      )
      .where(builder => {
        builder.where({fromid: frid, toid: toid})
          .orWhere({fromid: toid, toid: frid})
      })
      .orderBy('id', 'desc')
      .limit(MESSAGE_ON_PAGE)
    
    if (cursor) {
      subquery = subquery.where('id', '<', cursor)
    }
 
    const query = db.select('*').from(subquery).orderBy('id', 'asc')
    
    logger.info({SQL: query.toSQL().toNative()})
    
    const total = await query

    const parsed = z.array(MessageSchema).parse(total)

    logger.info({ГОТОВЫЙ_ЗАПРОС: total})

    return parsed
  }
}

export default new MessageSQL

    // const query = db.raw(`
    //   SELECT 
    //   CASE
    //     WHEN fromid = ? THEN true
    //     ELSE false
    //   END as isAuthor, 
    //   *
    //   FROM messages
    //   WHERE ((fromid = ? AND toid = ?) OR (fromid = ? AND toid = ?))
    //   AND id < ?
    //   ORDER BY id DESC
    //   LIMIT 3
    // `, [frid, frid, toid, toid, frid, cursor])