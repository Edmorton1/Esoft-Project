import db from "@s/infrastructure/db/db"
import logger from "@s/logger"
import { MessageStackInterface, MessageStackSchema } from "@t/gen/Schemas"
import { Message, MessageSchema } from "@t/gen/Users"
import { z } from "zod"

class MessageSQL {
  async getMessage(frid: number, toid: number): Promise<MessageStackInterface> {
    const query = db.raw(`
      SELECT json_build_object(
        'received', (
          SELECT json_agg(row_to_json(messages))
          FROM messages
          WHERE fromid = ? AND toid = ?
        ),
        'sent', (
          SELECT json_agg(row_to_json(messages))
          FROM messages
          WHERE fromid = ? AND toid = ?
        )
      ) as messages
    `, [toid, frid, frid, toid])
    
    logger.info({SQL: query.toSQL().toNative()})
    const total = (await query).rows[0].messages

    const parsed = MessageStackSchema.parse(total)

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