import TYPES from "@app/server/config/containers/types";
import { ILogger } from "@app/server/infrastructure/helpers/logger/logger.controller";
import { DBType } from "@app/server/infrastructure/helpers/databases/postgres/config/db";
import { Message, MessageSchema } from "@app/types/gen/Users";
import { inject, injectable } from "inversify";
import { z } from "zod";

interface MessagesOutModuleRepo {
	getAllLastMessages: (id: number) => Promise<Message[]>;
}

@injectable()
class MessagesOutModule implements MessagesOutModuleRepo {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(TYPES.DataBase)
		private readonly db: DBType,
	) {}
	getAllLastMessages: MessagesOutModuleRepo["getAllLastMessages"] = async id => {
		const whenThenRaw = this.db.raw(
			`
      CASE 
        WHEN fromid = ? THEN toid
        ELSE fromid
      END
    `,
			[id],
		);

		const query = this.db
			.select(this.db.raw(`DISTINCT ON (${whenThenRaw}) *`))
			.from("messages")
			.where("toid", id)
			.orWhere("fromid", id)
			.orderByRaw(`${whenThenRaw}, id DESC`);

		this.logger.info({ allLast: query.toSQL().toNative() });

		const total = z.array(MessageSchema).parse(await query);

		return total;
	};
}

export default MessagesOutModule;

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
