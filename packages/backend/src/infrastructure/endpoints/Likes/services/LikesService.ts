import { toSOCl } from "@app/shared/JSONParsers";
import { clientsType } from "@app/server/helpers/WebSocket/socket";
import ORM from "@app/server/infrastructure/db/SQL/ORM";
import LikesModule from "@app/server/infrastructure/endpoints/Likes/sql/Likes.module";
import TYPES from "@app/server/config/containers/types";
import { LikesDTO } from "@app/types/gen/dtoObjects";
import { lnglatType } from "@app/types/gen/types";
import { Form, FormSchema, Likes } from "@app/types/gen/Users";
import { inject, injectable } from "inversify";
import { z } from "zod";
import { ILogger } from "@app/server/helpers/logger/logger.controller";
import { FormWithCursorSchema } from "@app/server/infrastructure/endpoints/Likes/services/Schemas";

interface LikesServiceRepo {
  sendLike: (likesDTO: LikesDTO) => Promise<Likes>;
  sendDelete: (id: number, userid: number) => Promise<Likes | null>;
	likesGet: (userid: number, lnglat?: lnglatType, cursor?: number) => Promise<Form[]>;
  rejectLike: (userid: number, liked_userid: number) => Promise<boolean>
}

@injectable()
class LikesService implements LikesServiceRepo {
	constructor(
		@inject(TYPES.LoggerController)
		private readonly logger: ILogger,
		@inject(ORM)
		private readonly ORM: ORM,
		@inject(TYPES.clients)
		private readonly clients: clientsType,
		@inject(LikesModule)
		private readonly likesModule: LikesModule,
	) {}

	sendLike: LikesServiceRepo["sendLike"] = async likesDTO => {
		const [data] = await this.ORM.post(likesDTO, "likes");
		this.logger.info(this.clients.keys());
		const clientTo = this.clients.get(likesDTO.liked_userid);
		if (clientTo) {
			console.log("PARAMS BEFOR NAME", data.userid, data)
			const form = (await this.ORM.getById(data.userid, "forms", undefined))[0]
			clientTo?.send(toSOCl("like", {like: {id: data.id, userid: data.userid}, form}));
		}
		
		return data;
	};

	sendDelete: LikesServiceRepo["sendDelete"] = async (id, userid) => {
		const [data] = await this.ORM.delete(id, "likes", userid);

		if (!data) {
			return null;
		}

		const clientTo = this.clients.get(data.liked_userid);
		if (clientTo) {
			const {name} = (await this.ORM.getById(data.userid, "forms", "name"))[0]
			clientTo?.send(toSOCl("delete_like", {userid: data.userid, name}));
		}
		
    return data
	};

	likesGet: LikesServiceRepo["likesGet"] = async (userid, lnglat?, cursor?) => {
		const {json_agg} = (await this.likesModule.getLikedIds(userid))[0]

		this.logger.info({ json_agg: json_agg });

		if (!json_agg) {
			return []
		}

		const request = await this.likesModule.getManyByParam(
			"id",
			json_agg,
			userid,
			lnglat,
			cursor,
		);
		return z.array(FormWithCursorSchema).parse(request);
	};

  rejectLike: LikesServiceRepo['rejectLike'] = async (userid, liked_userid) => {
    this.logger.info({userid, liked_userid})
    const [offer] = await this.ORM.getByParams(
			{ userid: liked_userid, liked_userid: userid },
			"likes",
      "id"
		);

    this.logger.info({offer})

		if (!offer) {
			return false;
		}

		await this.ORM.delete(offer.id, "likes", liked_userid);
		
		const clientTo = this.clients.get(liked_userid);
		clientTo?.send(toSOCl("rejectLike", userid))

    return true;
  }
}

export default LikesService;
