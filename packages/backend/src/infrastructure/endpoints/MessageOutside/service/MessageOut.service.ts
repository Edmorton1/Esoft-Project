import TYPES from "@app/server/config/containers/types";
import { ILogger } from "@app/server/helpers/logger/logger.controller";
import ORM from "@app/server/infrastructure/db/SQL/ORM";
import MessagesOutModule from "@app/server/infrastructure/endpoints/MessageOutside/sql/MessagesOut.module";
import { MessageFormSchema, MessageFormType } from "@app/types/gen/Schemas";
import { inject, injectable } from "inversify";
import { z } from "zod";

@injectable()
class MessageOutService {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(MessagesOutModule)
		private readonly SQL: MessagesOutModule,
		@inject(ORM)
		private readonly ORM: ORM,
	) {}

	outsideMessages = async (id: number) => {
		const total: MessageFormType[] = [];

		const messages = await this.SQL.getAllLastMessages(id);
		const params = messages.map(e => {
			if (e.toid !== id) {
				return e.toid;
			} else if (e.fromid !== id) {
				return e.fromid;
			}
			return;
		});
		let forms;

		if (params.length > 0) {
			forms = await this.ORM.getManyParams(params, undefined);
		}

		for (let i = 0; i < params.length; i++) {
			total.push({ message: messages[i], form: forms![i] });
		}

		const arrZod = z.array(MessageFormSchema);
		const parsedTotal = arrZod.parse(total);

		this.logger.info({ request: messages });
    return parsedTotal
	};
}

export default MessageOutService;
