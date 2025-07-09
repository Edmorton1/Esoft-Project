// import db from "@app/server/infrastructure/db/db"
import { MESSAGE_ON_PAGE } from "@app/shared/CONST"
import { Message, MessageSchema } from "@app/types/gen/Users"
import { z } from "zod"
import { inject, injectable } from "inversify"
import { ILogger } from "@app/server/helpers/logger/logger.controller"
import TYPES from "@app/server/config/containers/types"
import { DBType } from "@app/server/infrastructure/db/db"

interface MessagesSQLRepo {
  getMessage: (frid: number, toid: number, cursor?: number) => Promise<Message[]>
  checkMatch(userid: number, liked_userid: number): Promise<boolean>
}

@injectable()
class MessagesSQL implements MessagesSQLRepo {
  constructor (
    @inject(TYPES.LoggerController)
    private readonly logger: ILogger,
    @inject(TYPES.DataBase)
    private readonly db: DBType
  ) {}
  getMessage: MessagesSQLRepo['getMessage'] = async (frid, toid, cursor) => {

    let subquery = this.db('messages')
      .select(
        this.db.raw(`CASE WHEN fromid = ? THEN true ELSE false END as isAuthor`, [frid]),
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
 
    const query = this.db.select('*').from(subquery).orderBy('id', 'asc')
    
    this.logger.info({SQL: query.toSQL().toNative()})
    
    const total = await query

    const parsed = z.array(MessageSchema).parse(total)

    this.logger.info({ГОТОВЫЙ_ЗАПРОС: total})

    return parsed
  }

  checkMatch: MessagesSQLRepo['checkMatch'] = async (userid, liked_userid) => {
    const query = this.db("likes")
      .select(this.db.raw(`COUNT(*) = 2 AS is_match`))
      .where(qb => 
        qb.where("userid", "=", userid).andWhere("liked_userid", "=", liked_userid)
        .orWhere("userid", "=", liked_userid).andWhere("liked_userid", "=", userid)
      );

    this.logger.info({CHECK_MATCH_SQL: query.toSQL().toNative()})

    // const {is_match} = (await query)[0]
    const [{is_match}] = await query
    this.logger.info(is_match)
    return is_match
      // .whereAnd("liked_userid", "=", liked_userid)
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