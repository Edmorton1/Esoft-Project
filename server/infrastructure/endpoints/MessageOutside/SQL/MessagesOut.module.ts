import TYPES from "@s/config/containers/types";
import { ILogger } from "@s/helpers/logger/logger.controller";
import db from "@s/infrastructure/db/db";
import { Message, MessageSchema } from "@t/gen/Users";
import { inject, injectable } from "inversify";
import { z } from "zod";

interface MessagesOutModuleRepo {
  getAllLastMessages: (id: number) => Promise<Message[]>
}

@injectable()
class MessagesOutModule implements MessagesOutModuleRepo {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
  ) {}
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

    this.logger.info({allLast: query.toSQL().toNative()})

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
