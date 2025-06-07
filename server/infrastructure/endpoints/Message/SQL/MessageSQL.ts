import db from "@s/infrastructure/db/db"
import logger from "@s/logger"
import { Message, MessageSchema } from "@t/gen/Users"
import { z } from "zod"

class MessageSQL {
  async getMessage(frid: number, toid: number): Promise<Message[]> {
    const query = db.raw(`
      SELECT 
      CASE
        WHEN fromid = ? THEN true
        ELSE false
      END as isAuthor, 
      *
      FROM messages
      WHERE fromid = ? AND toid = ?
      OR fromid = ? AND toid = ?
      ORDER BY id DESC
    `, [frid, frid, toid, toid, frid])
    
    logger.info({SQL: query.toSQL().toNative()})
    
    const total = (await query).rows

    const parsed = z.array(MessageSchema).parse(total)

    return parsed
  }
}

export default new MessageSQL

// SELECT 
  // json_build_object(
	// 'received', (
	//   SELECT json_agg(row_to_json(messages))
	//   FROM messages
	//   WHERE fromid = 19 AND toid = 16
// 	),
// 	'sent', (
// 	  SELECT json_agg(row_to_json(messages))
// 	  FROM messages
// 	  WHERE fromid = 16 AND toid = 19
// 	)
//   );