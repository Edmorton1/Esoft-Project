import db from "@s/infrastructure/db/db"
import { MESSAGE_ON_PAGE } from "@shared/CONST"
import { Message, MessageSchema } from "@t/gen/Users"
import { z } from "zod"
import { inject, injectable } from "inversify"
import { ILogger } from "@s/helpers/logger/logger.controller"
import TYPES from "@s/config/containers/types"

interface MessagesSQLRepo {
  getMessage: (frid: number, toid: number, cursor?: number) => Promise<Message[]>
}

@injectable()
class MessagesSQL implements MessagesSQLRepo {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
  ) {}
  getMessage: MessagesSQLRepo['getMessage'] = async (frid, toid, cursor) => {

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
    
    this.logger.info({SQL: query.toSQL().toNative()})
    
    const total = await query

    const parsed = z.array(MessageSchema).parse(total)

    this.logger.info({ГОТОВЫЙ_ЗАПРОС: total})

    return parsed
  }
}

export default MessagesSQL

    // const query = db.raw(`
      // SELECT 
      // CASE
      //   WHEN fromid = ? THEN true
      //   ELSE false
      // END as isAuthor, 
      // *
      // FROM messages
      // WHERE ((fromid = ? AND toid = ?) OR (fromid = ? AND toid = ?))
      // AND id < ?
      // ORDER BY id DESC
      // LIMIT 3
    // `, [frid, frid, toid, toid, frid, cursor])