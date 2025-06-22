import db from "@s/infrastructure/db/db";
import logger from "@s/helpers/logger";
import { Message, MessageSchema } from "@t/gen/Users";
import { z } from "zod";

interface MessagesOutModuleRepo {
  getAllLastMessages: (id: number) => Promise<Message[]>
}

class MessagesOutModule implements MessagesOutModuleRepo {
  getAllLastMessages: MessagesOutModuleRepo['getAllLastMessages'] = async (id) => {
    const whenThenRaw = db.raw(`
      CASE 
        WHEN fromid = ? THEN toid
        ELSE fromid
      END
    `, [id]);

    const query = db
      .select(db.raw(`DISTINCT ON (${whenThenRaw}) *`))
      .from('messages')
      .where('toid', id).orWhere('fromid', id)
      .orderByRaw(`${whenThenRaw}, id DESC`);

    logger.info({allLast: query.toSQL().toNative()})

    const total = z.array(MessageSchema).parse(await query)

    return total
  }
}

export default MessagesOutModule

// SELECT DISTINCT ON (
//   CASE
//     WHEN fromid = 16 THEN toid
//     ELSE fromid
//   END
// ) *

// FROM messages
// WHERE toid = 16 OR fromid = 16

// ORDER BY
//   CASE
//     WHEN fromid = 16 THEN toid
//     ELSE fromid
//   END,
//   created_at DESC;

// -- LIMIT 1
